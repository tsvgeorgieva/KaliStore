System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var ViewSlot, currentZIndex, transitionEvent, globalSettings, DialogRenderer;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function getNextZIndex() {
    return ++currentZIndex;
  }

  return {
    setters: [function (_aureliaFramework) {
      ViewSlot = _aureliaFramework.ViewSlot;
    }],
    execute: function () {
      currentZIndex = 1040;

      transitionEvent = (function () {
        var t = undefined;
        var el = document.createElement('fakeelement');

        var transitions = {
          'transition': 'transitionend',
          'OTransition': 'oTransitionEnd',
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
          if (el.style[t] !== undefined) {
            return transitions[t];
          }
        }
      })();

      globalSettings = {
        lock: true,
        centerHorizontalOnly: false,
        isDraggable: true
      };

      _export('globalSettings', globalSettings);

      DialogRenderer = (function () {
        function DialogRenderer() {
          var _this = this;

          _classCallCheck(this, DialogRenderer);

          this.defaultSettings = globalSettings;

          this.dialogControllers = [];
          document.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
              var _top = _this.dialogControllers[_this.dialogControllers.length - 1];
              if (_top && _top.settings.lock !== true) {
                _top.cancel();
              }
            }
          });
        }

        _createClass(DialogRenderer, [{
          key: 'createDialogHost',
          value: function createDialogHost(dialogController) {
            var _this2 = this;

            var settings = dialogController.settings;
            var body = document.body;
            var modalOverlay = undefined;
            var documentMouseMoveListener = undefined;
            var documentMouseUpListener = undefined;

            if (settings.isModal) {
              modalOverlay = document.createElement('ai-dialog-overlay');
              modalOverlay.style.zIndex = getNextZIndex();
              document.body.appendChild(modalOverlay);
            }

            var modalContainer = document.createElement('ai-dialog-container');
            modalContainer.style.zIndex = getNextZIndex();
            document.body.appendChild(modalContainer);

            dialogController.slot = new ViewSlot(modalContainer, true);
            dialogController.slot.add(dialogController.view);

            dialogController.showDialog = function () {
              _this2.dialogControllers.push(dialogController);

              dialogController.slot.attached();
              dialogController.centerDialog();

              if (settings.isModal) {
                modalOverlay.onclick = function () {
                  if (!settings.lock) {
                    dialogController.cancel();
                  } else {
                    return false;
                  }
                };
              }

              modalContainer.onmousedown = (function (event) {
                modalContainer.style.zIndex = getNextZIndex();
              }).bind(_this2);

              if (settings.isDraggable === true) {
                var modalHeader = modalContainer.firstElementChild.firstElementChild;
                modalHeader.classList.add('draggable');
                modalHeader.onmousedown = (function (event) {
                  modalContainer.classList.add('dragging');
                  event.preventDefault();
                }).bind(_this2);

                _this2.previousMouseEvent = undefined;

                documentMouseMoveListener = (function (event) {
                  var dragging = modalContainer.classList.contains('dragging');
                  if (dragging) {
                    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
                    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

                    var modalContainerRect = modalContainer.getBoundingClientRect();
                    var topPosition = modalContainerRect.top;
                    var leftPosition = modalContainerRect.left;
                    var bottomPosition = topPosition + modalContainerRect.height;
                    var rightPosition = leftPosition + modalContainerRect.width;

                    var movementX = event.movementX || (_this2.previousMouseEvent !== undefined ? event.screenX - _this2.previousMouseEvent.screenX : 0);
                    var movementY = event.movementY || (_this2.previousMouseEvent !== undefined ? event.screenY - _this2.previousMouseEvent.screenY : 0);

                    var topPositionToBe = topPosition + movementY;
                    var leftPositionToBe = leftPosition + movementX;
                    var bottomPositionToBe = bottomPosition + movementY;
                    var rightPositionToBe = rightPosition + movementX;

                    var stopDragging = false;

                    if (bottomPosition > windowHeight || bottomPositionToBe > windowHeight) {
                      topPositionToBe = windowHeight - modalContainerRect.height;
                      stopDragging = true;
                    }

                    if (topPosition < 0 || topPositionToBe < 0) {
                      topPositionToBe = 0;
                      stopDragging = true;
                    }

                    if (leftPosition < 0 || leftPositionToBe < 0) {
                      leftPositionToBe = 0;
                      stopDragging = true;
                    }

                    if (rightPosition > windowWidth || rightPositionToBe > windowWidth) {
                      leftPositionToBe = windowWidth - modalContainerRect.width;
                      stopDragging = true;
                    }

                    modalContainer.style.top = topPositionToBe + 'px';
                    modalContainer.style.left = leftPositionToBe + 'px';
                    _this2.previousMouseEvent = event;

                    if (stopDragging) {
                      modalContainer.classList.remove('dragging');
                      _this2.previousMouseEvent = undefined;
                    }
                  }
                }).bind(_this2);

                document.addEventListener('mousemove', documentMouseMoveListener);

                documentMouseUpListener = (function () {
                  modalContainer.classList.remove('dragging');
                  _this2.previousMouseEvent = undefined;
                }).bind(_this2);

                document.addEventListener('mouseup', documentMouseUpListener);
              }

              return new Promise(function (resolve) {
                modalContainer.addEventListener(transitionEvent, onTransitionEnd);

                function onTransitionEnd(e) {
                  if (e.target !== modalContainer) {
                    return;
                  }
                  modalContainer.removeEventListener(transitionEvent, onTransitionEnd);
                  resolve();
                }

                if (settings.isModal) {
                  modalOverlay.classList.add('active');
                }
                modalContainer.classList.add('active');
                body.classList.add('ai-dialog-open');
              });
            };

            dialogController.hideDialog = function () {
              var i = _this2.dialogControllers.indexOf(dialogController);
              if (i !== -1) {
                _this2.dialogControllers.splice(i, 1);
              }

              return new Promise(function (resolve) {
                modalContainer.addEventListener(transitionEvent, onTransitionEnd);

                function onTransitionEnd() {
                  modalContainer.removeEventListener(transitionEvent, onTransitionEnd);
                  resolve();
                }

                if (settings.isModal) {
                  modalOverlay.classList.remove('active');
                }

                modalContainer.classList.remove('active');

                if (_this2.dialogControllers.length === 0) {
                  body.classList.remove('ai-dialog-open');
                }
              });
            };

            dialogController.destroyDialogHost = function () {
              if (settings.isModal) {
                document.body.removeChild(modalOverlay);
              }
              document.body.removeChild(modalContainer);
              if (settings.isDraggable) {
                document.removeEventListener('mousemove', documentMouseMoveListener);
                document.removeEventListener('mouseup', documentMouseUpListener);
              }

              dialogController.slot.detached();
              return Promise.resolve();
            };

            dialogController.centerDialog = function () {
              var child = modalContainer.children[0];

              modalContainer.style.width = child.offsetWidth + 10 + 'px';

              var modalContainerHeight = child.offsetHeight + 10;

              var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
              modalContainer.style.left = Math.max((vw - modalContainer.offsetWidth) / 2, 0) + 'px';

              if (!settings.centerHorizontalOnly) {
                var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                modalContainer.style.top = Math.max((vh - modalContainerHeight) / 2, 30) + 'px';
              } else {
                modalContainer.style.top = '5px';
              }
            };

            return Promise.resolve();
          }
        }, {
          key: 'showDialog',
          value: function showDialog(dialogController) {
            return dialogController.showDialog();
          }
        }, {
          key: 'hideDialog',
          value: function hideDialog(dialogController) {
            return dialogController.hideDialog();
          }
        }, {
          key: 'destroyDialogHost',
          value: function destroyDialogHost(dialogController) {
            return dialogController.destroyDialogHost();
          }
        }]);

        return DialogRenderer;
      })();

      _export('DialogRenderer', DialogRenderer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctcmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dCQUVJLGFBQWEsRUFDYixlQUFlLEVBc0JSLGNBQWMsRUFNWixjQUFjOzs7Ozs7QUFWM0IsV0FBUyxhQUFhLEdBQUc7QUFDdkIsV0FBTyxFQUFFLGFBQWEsQ0FBQztHQUN4Qjs7OzttQ0F2Qk8sUUFBUTs7O0FBRVosbUJBQWEsR0FBRyxJQUFJOztBQUNwQixxQkFBZSxHQUFHLENBQUMsWUFBWTtBQUNqQyxZQUFJLENBQUMsWUFBQSxDQUFDO0FBQ04sWUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFL0MsWUFBSSxXQUFXLEdBQUc7QUFDaEIsc0JBQVksRUFBRSxlQUFlO0FBQzdCLHVCQUFhLEVBQUUsZ0JBQWdCO0FBQy9CLHlCQUFlLEVBQUUsZUFBZTtBQUNoQyw0QkFBa0IsRUFBRSxxQkFBcUI7U0FDMUMsQ0FBQzs7QUFFRixhQUFLLENBQUMsSUFBSSxXQUFXLEVBQUU7QUFDckIsY0FBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUM3QixtQkFBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDdkI7U0FDRjtPQUNGLENBQUEsRUFBRzs7QUFNTyxvQkFBYyxHQUFHO0FBQzFCLFlBQUksRUFBRSxJQUFJO0FBQ1YsNEJBQW9CLEVBQUUsS0FBSztBQUMzQixtQkFBVyxFQUFFLElBQUk7T0FDbEI7Ozs7QUFFWSxvQkFBYztBQUdkLGlCQUhBLGNBQWMsR0FHWDs7O2dDQUhILGNBQWM7O2VBQ3pCLGVBQWUsR0FBRyxjQUFjOztBQUc5QixjQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLGtCQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RDLGdCQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxF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QixtQkFBTyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUN0Qzs7O2lCQUVTLG9CQUFDLGdCQUFnQixFQUFFO0FBQzNCLG1CQUFPLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQ3RDOzs7aUJBRWdCLDJCQUFDLGdCQUFnQixFQUFFO0FBQ2xDLG1CQUFPLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUM7V0FDN0M7OztlQTdOVSxjQUFjIiwiZmlsZSI6ImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZXdTbG90fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5sZXQgY3VycmVudFpJbmRleCA9IDEwNDA7XHJcbmxldCB0cmFuc2l0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gIGxldCB0O1xyXG4gIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XHJcblxyXG4gIGxldCB0cmFuc2l0aW9ucyA9IHtcclxuICAgICd0cmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgJ09UcmFuc2l0aW9uJzogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICdNb3pUcmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCdcclxuICB9O1xyXG5cclxuICBmb3IgKHQgaW4gdHJhbnNpdGlvbnMpIHtcclxuICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0WkluZGV4KCkge1xyXG4gIHJldHVybiArK2N1cnJlbnRaSW5kZXg7XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgZ2xvYmFsU2V0dGluZ3MgPSB7XHJcbiAgbG9jazogdHJ1ZSxcclxuICBjZW50ZXJIb3Jpem9udGFsT25seTogZmFsc2UsXHJcbiAgaXNEcmFnZ2FibGU6IHRydWVcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dSZW5kZXJlciB7XHJcbiAgZGVmYXVsdFNldHRpbmdzID0gZ2xvYmFsU2V0dGluZ3M7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5kaWFsb2dDb250cm9sbGVycyA9IFtdO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5kaWFsb2dDb250cm9sbGVyc1t0aGlzLmRpYWxvZ0NvbnRyb2xsZXJzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICh0b3AgJiYgdG9wLnNldHRpbmdzLmxvY2sgIT09IHRydWUpIHtcclxuICAgICAgICAgIHRvcC5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGlhbG9nSG9zdChkaWFsb2dDb250cm9sbGVyKSB7XHJcbiAgICBsZXQgc2V0dGluZ3MgPSBkaWFsb2dDb250cm9sbGVyLnNldHRpbmdzO1xyXG4gICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgbGV0IG1vZGFsT3ZlcmxheSA9IHVuZGVmaW5lZDtcclxuICAgIGxldCBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gICAgbGV0IGRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5pc01vZGFsKSB7XHJcbiAgICAgIG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FpLWRpYWxvZy1vdmVybGF5Jyk7XHJcbiAgICAgIG1vZGFsT3ZlcmxheS5zdHlsZS56SW5kZXggPSBnZXROZXh0WkluZGV4KCk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxPdmVybGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhaS1kaWFsb2ctY29udGFpbmVyJyk7XHJcbiAgICBtb2RhbENvbnRhaW5lci5zdHlsZS56SW5kZXggPSBnZXROZXh0WkluZGV4KCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsQ29udGFpbmVyKTtcclxuXHJcbiAgICBkaWFsb2dDb250cm9sbGVyLnNsb3QgPSBuZXcgVmlld1Nsb3QobW9kYWxDb250YWluZXIsIHRydWUpO1xyXG4gICAgZGlhbG9nQ29udHJvbGxlci5zbG90LmFkZChkaWFsb2dDb250cm9sbGVyLnZpZXcpO1xyXG5cclxuICAgIGRpYWxvZ0NvbnRyb2xsZXIuc2hvd0RpYWxvZyA9ICgpID0+IHtcclxuICAgICAgdGhpcy5kaWFsb2dDb250cm9sbGVycy5wdXNoKGRpYWxvZ0NvbnRyb2xsZXIpO1xyXG5cclxuICAgICAgZGlhbG9nQ29udHJvbGxlci5zbG90LmF0dGFjaGVkKCk7XHJcbiAgICAgIGRpYWxvZ0NvbnRyb2xsZXIuY2VudGVyRGlhbG9nKCk7XHJcblxyXG4gICAgICBpZiAoc2V0dGluZ3MuaXNNb2RhbCkge1xyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5sb2NrKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRyb2xsZXIuY2FuY2VsKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbW9kYWxDb250YWluZXIub25tb3VzZWRvd24gPSAoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUuekluZGV4ID0gZ2V0TmV4dFpJbmRleCgpO1xyXG4gICAgICB9KS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgaWYgKHNldHRpbmdzLmlzRHJhZ2dhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgbW9kYWxIZWFkZXIgPSBtb2RhbENvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICBtb2RhbEhlYWRlci5jbGFzc0xpc3QuYWRkKCdkcmFnZ2FibGUnKTtcclxuICAgICAgICBtb2RhbEhlYWRlci5vbm1vdXNlZG93biA9ICgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXNNb3VzZUV2ZW50ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRyYWdnaW5nID0gbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcmFnZ2luZycpO1xyXG4gICAgICAgICAgaWYgKGRyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsQ29udGFpbmVyUmVjdCA9IG1vZGFsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCB0b3BQb3NpdGlvbiA9IG1vZGFsQ29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRQb3NpdGlvbiA9IG1vZGFsQ29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICBjb25zdCBib3R0b21Qb3NpdGlvbiA9IHRvcFBvc2l0aW9uICsgbW9kYWxDb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRQb3NpdGlvbiA9IGxlZnRQb3NpdGlvbiArIG1vZGFsQ29udGFpbmVyUmVjdC53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vdmVtZW50WCA9IGV2ZW50Lm1vdmVtZW50WCB8fCAodGhpcy5wcmV2aW91c01vdXNlRXZlbnQgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnNjcmVlblggLSB0aGlzLnByZXZpb3VzTW91c2VFdmVudC5zY3JlZW5YIDogMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdmVtZW50WSA9IGV2ZW50Lm1vdmVtZW50WSB8fCAodGhpcy5wcmV2aW91c01vdXNlRXZlbnQgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnNjcmVlblkgLSB0aGlzLnByZXZpb3VzTW91c2VFdmVudC5zY3JlZW5ZIDogMCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9wUG9zaXRpb25Ub0JlID0gdG9wUG9zaXRpb24gKyBtb3ZlbWVudFk7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0UG9zaXRpb25Ub0JlID0gbGVmdFBvc2l0aW9uICsgbW92ZW1lbnRYO1xyXG4gICAgICAgICAgICBsZXQgYm90dG9tUG9zaXRpb25Ub0JlID0gYm90dG9tUG9zaXRpb24gKyBtb3ZlbWVudFk7XHJcbiAgICAgICAgICAgIGxldCByaWdodFBvc2l0aW9uVG9CZSA9IHJpZ2h0UG9zaXRpb24gKyBtb3ZlbWVudFg7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RvcERyYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZGlhbG9nIGlzIG91dCBvZiBzY3JlZW4gb3Igd2lsbCBtb3ZlIG91dCBvZiBzY3JlZW4sIHBsYWNlIGl0IG9uIHRoZSBlZGdlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgaWYgKGJvdHRvbVBvc2l0aW9uID4gd2luZG93SGVpZ2h0IHx8IGJvdHRvbVBvc2l0aW9uVG9CZSA+IHdpbmRvd0hlaWdodCkge1xyXG4gICAgICAgICAgICAgIHRvcFBvc2l0aW9uVG9CZSA9IHdpbmRvd0hlaWdodCAtIG1vZGFsQ29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgc3RvcERyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvcFBvc2l0aW9uIDwgMCB8fCB0b3BQb3NpdGlvblRvQmUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgdG9wUG9zaXRpb25Ub0JlID0gMDtcclxuICAgICAgICAgICAgICBzdG9wRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGVmdFBvc2l0aW9uIDwgMCB8fCBsZWZ0UG9zaXRpb25Ub0JlIDwgMCkge1xyXG4gICAgICAgICAgICAgIGxlZnRQb3NpdGlvblRvQmUgPSAwO1xyXG4gICAgICAgICAgICAgIHN0b3BEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyaWdodFBvc2l0aW9uID4gd2luZG93V2lkdGggfHwgcmlnaHRQb3NpdGlvblRvQmUgPiB3aW5kb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgIGxlZnRQb3NpdGlvblRvQmUgPSB3aW5kb3dXaWR0aCAtIG1vZGFsQ29udGFpbmVyUmVjdC53aWR0aDtcclxuICAgICAgICAgICAgICBzdG9wRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtb2RhbENvbnRhaW5lci5zdHlsZS50b3AgPSB0b3BQb3NpdGlvblRvQmUgKyAncHgnO1xyXG4gICAgICAgICAgICBtb2RhbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdFBvc2l0aW9uVG9CZSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNNb3VzZUV2ZW50ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RvcERyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzTW91c2VFdmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xyXG5cclxuICAgICAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9ICgoKSA9PiB7XHJcbiAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xyXG4gICAgICAgICAgdGhpcy5wcmV2aW91c01vdXNlRXZlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgbW9kYWxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsIG9uVHJhbnNpdGlvbkVuZCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XHJcbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IG1vZGFsQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG1vZGFsQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBvblRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmlzTW9kYWwpIHtcclxuICAgICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdhaS1kaWFsb2ctb3BlbicpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZGlhbG9nQ29udHJvbGxlci5oaWRlRGlhbG9nID0gKCkgPT4ge1xyXG4gICAgICBsZXQgaSA9IHRoaXMuZGlhbG9nQ29udHJvbGxlcnMuaW5kZXhPZihkaWFsb2dDb250cm9sbGVyKTtcclxuICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsb2dDb250cm9sbGVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIG1vZGFsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBvblRyYW5zaXRpb25FbmQpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICAgICAgICBtb2RhbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCwgb25UcmFuc2l0aW9uRW5kKTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5pc01vZGFsKSB7XHJcbiAgICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nQ29udHJvbGxlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2FpLWRpYWxvZy1vcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZGlhbG9nQ29udHJvbGxlci5kZXN0cm95RGlhbG9nSG9zdCA9ICgpID0+IHtcclxuICAgICAgaWYgKHNldHRpbmdzLmlzTW9kYWwpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vZGFsT3ZlcmxheSk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChtb2RhbENvbnRhaW5lcik7XHJcbiAgICAgIGlmIChzZXR0aW5ncy5pc0RyYWdnYWJsZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRpYWxvZ0NvbnRyb2xsZXIuc2xvdC5kZXRhY2hlZCgpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRpYWxvZ0NvbnRyb2xsZXIuY2VudGVyRGlhbG9nID0gKCkgPT4ge1xyXG4gICAgICBsZXQgY2hpbGQgPSBtb2RhbENvbnRhaW5lci5jaGlsZHJlblswXTtcclxuXHJcbiAgICAgIG1vZGFsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGggKyAxMCArICdweCc7XHJcbiAgICAgIC8vbW9kYWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY2hpbGQub2Zmc2V0SGVpZ2h0ICsgMjAgKyAncHgnO1xyXG4gICAgICBjb25zdCBtb2RhbENvbnRhaW5lckhlaWdodCA9IGNoaWxkLm9mZnNldEhlaWdodCArIDEwO1xyXG5cclxuICAgICAgbGV0IHZ3ID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcclxuICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUubGVmdCA9IE1hdGgubWF4KCh2dyAtIG1vZGFsQ29udGFpbmVyLm9mZnNldFdpZHRoKSAvIDIsIDApICsgJ3B4JztcclxuXHJcbiAgICAgIGlmICghc2V0dGluZ3MuY2VudGVySG9yaXpvbnRhbE9ubHkpIHtcclxuICAgICAgICBsZXQgdmggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XHJcbiAgICAgICAgLy8gTGVmdCBhdCBsZWFzdCAzMHB4IGZyb20gdGhlIHRvcFxyXG4gICAgICAgIC8vbW9kYWxDb250YWluZXIuc3R5bGUudG9wID0gTWF0aC5tYXgoKHZoIC0gbW9kYWxDb250YWluZXIub2Zmc2V0SGVpZ2h0KSAvIDIsIDMwKSArICdweCc7XHJcbiAgICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUudG9wID0gTWF0aC5tYXgoKHZoIC0gbW9kYWxDb250YWluZXJIZWlnaHQpIC8gMiwgMzApICsgJ3B4JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtb2RhbENvbnRhaW5lci5zdHlsZS50b3AgPSAnNXB4JztcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfVxyXG5cclxuICBzaG93RGlhbG9nKGRpYWxvZ0NvbnRyb2xsZXIpIHtcclxuICAgIHJldHVybiBkaWFsb2dDb250cm9sbGVyLnNob3dEaWFsb2coKTtcclxuICB9XHJcblxyXG4gIGhpZGVEaWFsb2coZGlhbG9nQ29udHJvbGxlcikge1xyXG4gICAgcmV0dXJuIGRpYWxvZ0NvbnRyb2xsZXIuaGlkZURpYWxvZygpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveURpYWxvZ0hvc3QoZGlhbG9nQ29udHJvbGxlcikge1xyXG4gICAgcmV0dXJuIGRpYWxvZ0NvbnRyb2xsZXIuZGVzdHJveURpYWxvZ0hvc3QoKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
