System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, Popover;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      Popover = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Popover, [{
          key: 'title',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'placement',
          decorators: [bindable],
          initializer: function initializer() {
            return 'bottom';
          },
          enumerable: true
        }, {
          key: 'trigger',
          decorators: [bindable],
          initializer: function initializer() {
            return 'hover';
          },
          enumerable: true
        }, {
          key: 'ancestorLevels',
          decorators: [bindable],
          initializer: function initializer() {
            return 1;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Popover(element) {
          _classCallCheck(this, _Popover);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'placement', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'trigger', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'ancestorLevels', _instanceInitializers);

          this.element = element;
          this.isParentInitialized = false;
          this.isPopoverInitialized = false;

          this._trigger = this.trigger;
        }

        _createDecoratedClass(Popover, [{
          key: '_getAncestor',
          value: function _getAncestor() {
            var ancestor = this.element.parentElement;

            for (var i = 1; i < this.ancestorLevels; i++) {
              ancestor = ancestor.parentElement;
            }

            return ancestor;
          }
        }, {
          key: 'attached',
          value: function attached() {
            var ancestor = this._getAncestor();
            this.$parentElement = $(ancestor);
            this.isParentInitialized = true;

            this.checkPlacement();
            this._reinit();
          }
        }, {
          key: 'detached',
          value: function detached() {
            this._dispose();
          }
        }, {
          key: 'titleChanged',
          value: function titleChanged(newValue, oldValue) {
            this._reinit();
          }
        }, {
          key: 'placementChanged',
          value: function placementChanged(newValue, oldValue) {
            this.checkPlacement();
            this._reinit();
          }
        }, {
          key: 'triggerChanged',
          value: function triggerChanged(newValue, oldValue) {
            this.checkTrigger();

            this._trigger = this.trigger === 'insideClick' ? 'manual' : this.trigger;

            this._reinit();
          }
        }, {
          key: '_reinit',
          value: function _reinit() {
            if (this.isParentInitialized) {
              if (this.isPopoverInitialized) {
                this._dispose();
              }

              this._init();
              this.isPopoverInitialized = true;
            }
          }
        }, {
          key: '_init',
          value: function _init() {
            var _this = this;

            if (this.trigger === 'insideClick') {
              this.$parentElement.on('click', function () {
                _this.$parentElement.popover('toggle');
              });

              this.element.onclick = function () {
                _this.$parentElement.popover('hide');
              };
            } else {
              this.$parentElement.off('click');
              this.element.onclick = null;
            }

            this.$parentElement.popover(this._getOptions());

            this.$parentElement.popover('show');
            this.$parentElement.popover('hide');
          }
        }, {
          key: '_dispose',
          value: function _dispose() {
            this.$parentElement.popover('dispose');
          }
        }, {
          key: '_getOptions',
          value: function _getOptions() {
            return {
              content: this.element,
              title: this.title || '',
              placement: this.placement,
              trigger: this._trigger,
              container: 'body',
              html: true,
              template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + (this.title ? '<h3 class="popover-title"></h3>' : '') + (this.element.children.length > 0 ? '<div class="popover-content"></div>' : '') + '</div>'
            };
          }
        }, {
          key: 'checkPlacement',
          value: function checkPlacement() {
            switch (this.placement) {
              case 'top':
              case 'bottom':
              case 'left':
              case 'right':
                break;
              default:
                throw new Error('Invalid value for popover placement: ' + this.placement);
            }
          }
        }, {
          key: 'checkTrigger',
          value: function checkTrigger() {
            switch (this.trigger) {
              case 'click':
              case 'hover':
              case 'focus':
              case 'insideClick':
                break;
              default:
                throw new Error('Invalid value for popover trigger: ' + this.trigger);
            }
          }
        }], null, _instanceInitializers);

        var _Popover = Popover;
        Popover = inject(Element)(Popover) || Popover;
        Popover = customElement('popover')(Popover) || Popover;
        return Popover;
      })();

      _export('Popover', Popover);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3BvcG92ZXIvcG9wb3Zlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBSWEsT0FBTzs7Ozs7Ozs7OztpQ0FKWixNQUFNO3dDQUFFLGFBQWE7bUNBQUUsUUFBUTs7O0FBSTFCLGFBQU87Ozs7OEJBQVAsT0FBTzs7dUJBQ2pCLFFBQVE7Ozs7O3VCQUNSLFFBQVE7O21CQUFhLFFBQVE7Ozs7O3VCQUM3QixRQUFROzttQkFBVyxPQUFPOzs7Ozt1QkFDMUIsUUFBUTs7bUJBQWtCLENBQUM7Ozs7O0FBRWpCLGlCQU5BLE9BQU8sQ0FNTixPQUFPLEVBQUU7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDakMsY0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQzs7QUFFbEMsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzlCOzs4QkFaVSxPQUFPOztpQkFjTix3QkFBRztBQUNiLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7QUFFMUMsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLHNCQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQzthQUNuQzs7QUFFRCxtQkFBTyxRQUFRLENBQUM7V0FDakI7OztpQkFFTyxvQkFBRztBQUNULGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDbkMsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDOztBQUVoQyxnQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLGdC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Q1osbUJBQUssT0FBTztBQUVWLHNCQUFNO0FBQUEsQUFDUjtBQUNFLHNCQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUFBLGFBQzNFO1dBQ0Y7OztpQkFFVyx3QkFBRztBQUNiLG9CQUFRLElBQUksQ0FBQyxPQUFPO0FBQ3BCLG1CQUFLLE9BQU8sQ0FBQztBQUNiLG1CQUFLLE9BQU8sQ0FBQztBQUNiLG1CQUFLLE9BQU8sQ0FBQztBQUNiLG1CQUFLLGFBQWE7QUFDaEIsc0JBQU07QUFBQSxBQUNSO0FBQ0Usc0JBQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQUEsYUFDdkU7V0FDRjs7O3VCQWhJVSxPQUFPO0FBQVAsZUFBTyxHQURuQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ0gsT0FBTyxLQUFQLE9BQU87QUFBUCxlQUFPLEdBRm5CLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FFWixPQUFPLEtBQVAsT0FBTztlQUFQLE9BQU8iLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvcG9wb3Zlci9wb3BvdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgncG9wb3ZlcicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIFBvcG92ZXIge1xyXG4gIEBiaW5kYWJsZSB0aXRsZTtcclxuICBAYmluZGFibGUgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XHJcbiAgQGJpbmRhYmxlIHRyaWdnZXIgPSAnaG92ZXInO1xyXG4gIEBiaW5kYWJsZSBhbmNlc3RvckxldmVscyA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLmlzUGFyZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNQb3BvdmVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl90cmlnZ2VyID0gdGhpcy50cmlnZ2VyO1xyXG4gIH1cclxuXHJcbiAgX2dldEFuY2VzdG9yKCkge1xyXG4gICAgbGV0IGFuY2VzdG9yID0gdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmFuY2VzdG9yTGV2ZWxzOyBpKyspIHtcclxuICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbmNlc3RvcjtcclxuICB9XHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgbGV0IGFuY2VzdG9yID0gdGhpcy5fZ2V0QW5jZXN0b3IoKTtcclxuICAgIHRoaXMuJHBhcmVudEVsZW1lbnQgPSAkKGFuY2VzdG9yKTtcclxuICAgIHRoaXMuaXNQYXJlbnRJbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jaGVja1BsYWNlbWVudCgpO1xyXG4gICAgdGhpcy5fcmVpbml0KCk7XHJcbiAgfVxyXG5cclxuICBkZXRhY2hlZCgpIHtcclxuICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIHRpdGxlQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIHRoaXMuX3JlaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VtZW50Q2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tQbGFjZW1lbnQoKTtcclxuICAgIHRoaXMuX3JlaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgdHJpZ2dlckNoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICB0aGlzLmNoZWNrVHJpZ2dlcigpO1xyXG5cclxuICAgIHRoaXMuX3RyaWdnZXIgPSB0aGlzLnRyaWdnZXIgPT09ICdpbnNpZGVDbGljaycgPyAnbWFudWFsJyA6IHRoaXMudHJpZ2dlcjtcclxuXHJcbiAgICB0aGlzLl9yZWluaXQoKTtcclxuICB9XHJcblxyXG4gIF9yZWluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5pc1BhcmVudEluaXRpYWxpemVkKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzUG9wb3ZlckluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICAgIHRoaXMuaXNQb3BvdmVySW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2luaXQoKSB7XHJcbiAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaW5zaWRlQ2xpY2snKSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudEVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJHBhcmVudEVsZW1lbnQucG9wb3ZlcigndG9nZ2xlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50Lm9uY2xpY2sgPSAoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJHBhcmVudEVsZW1lbnQucG9wb3ZlcignaGlkZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudEVsZW1lbnQub2ZmKCdjbGljaycpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQub25jbGljayA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kcGFyZW50RWxlbWVudC5wb3BvdmVyKHRoaXMuX2dldE9wdGlvbnMoKSk7XHJcblxyXG4gICAgdGhpcy4kcGFyZW50RWxlbWVudC5wb3BvdmVyKCdzaG93Jyk7XHJcbiAgICB0aGlzLiRwYXJlbnRFbGVtZW50LnBvcG92ZXIoJ2hpZGUnKTtcclxuICB9XHJcblxyXG4gIF9kaXNwb3NlKCkge1xyXG4gICAgdGhpcy4kcGFyZW50RWxlbWVudC5wb3BvdmVyKCdkaXNwb3NlJyk7XHJcbiAgfVxyXG5cclxuICBfZ2V0T3B0aW9ucygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMuZWxlbWVudCxcclxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUgfHwgJycsXHJcbiAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgIHRyaWdnZXI6IHRoaXMuX3RyaWdnZXIsXHJcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBodG1sOiB0cnVlLFxyXG4gICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWFycm93XCI+PC9kaXY+JyArXHJcbiAgICAgICh0aGlzLnRpdGxlID8gJzxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIj48L2gzPicgOiAnJykgK1xyXG4gICAgICAodGhpcy5lbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDAgPyAnPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPjwvZGl2PicgOiAnJykgK1xyXG4gICAgICAnPC9kaXY+J1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNoZWNrUGxhY2VtZW50KCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xyXG4gICAgY2FzZSAndG9wJzpcclxuICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICBjYXNlICdsZWZ0JzpcclxuICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgLy9jYXNlICdhdXRvJzpcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHBvcG92ZXIgcGxhY2VtZW50OiAnICsgdGhpcy5wbGFjZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tUcmlnZ2VyKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnRyaWdnZXIpIHtcclxuICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgIGNhc2UgJ2hvdmVyJzpcclxuICAgIGNhc2UgJ2ZvY3VzJzpcclxuICAgIGNhc2UgJ2luc2lkZUNsaWNrJzpcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHBvcG92ZXIgdHJpZ2dlcjogJyArIHRoaXMudHJpZ2dlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
