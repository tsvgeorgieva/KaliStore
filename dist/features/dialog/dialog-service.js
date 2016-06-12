System.register(['aurelia-metadata', 'aurelia-framework', './dialog-controller', './dialog-renderer', './lifecycle', './dialog-options'], function (_export) {
  'use strict';

  var Origin, Container, CompositionEngine, inject, DialogController, DialogRenderer, invokeLifecycle, DialogOptions, DialogService;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function (_aureliaFramework) {
      Container = _aureliaFramework.Container;
      CompositionEngine = _aureliaFramework.CompositionEngine;
      inject = _aureliaFramework.inject;
    }, function (_dialogController) {
      DialogController = _dialogController.DialogController;
    }, function (_dialogRenderer) {
      DialogRenderer = _dialogRenderer.DialogRenderer;
    }, function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }, function (_dialogOptions) {
      DialogOptions = _dialogOptions.DialogOptions;
    }],
    execute: function () {
      DialogService = (function () {
        function DialogService(container, compositionEngine, renderer) {
          _classCallCheck(this, _DialogService);

          this.container = container;
          this.compositionEngine = compositionEngine;
          this.renderer = renderer;
        }

        _createClass(DialogService, [{
          key: '_getViewModel',
          value: function _getViewModel(instruction) {
            if (typeof instruction.viewModel === 'function') {
              instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
            }

            if (typeof instruction.viewModel === 'string') {
              return this.compositionEngine.ensureViewModel(instruction);
            }

            return Promise.resolve(instruction);
          }
        }, {
          key: 'openDialog',
          value: function openDialog(settings) {
            var defaultSettings = {
              lock: true
            };

            var options = Object.assign({}, defaultSettings, settings);
            options.isModal = false;

            return this._open(options);
          }
        }, {
          key: 'openModalDialog',
          value: function openModalDialog(settings) {
            var defaultSettings = {
              lock: true
            };

            var options = Object.assign({}, defaultSettings, settings);
            options.isModal = true;

            return this._open(options);
          }
        }, {
          key: 'openConfirmDeleteDialog',
          value: function openConfirmDeleteDialog(opts) {
            opts = opts || {};

            var defaultOptions = {
              title: 'Внимание!',
              msg: '',
              icon: 'fa-trash-o',
              okBtnClass: 'btn-danger',
              okBtnText: 'Изтрий',
              cancelBtnText: 'Отказ',
              showCancelButton: true
            };

            var options = Object.assign({}, defaultOptions, opts);

            return this.openConfirmDialog(options);
          }
        }, {
          key: 'openConfirmDialog',
          value: function openConfirmDialog(opts) {
            opts = opts || {};

            if (!opts.msg) {
              throw new Error('Argument Exception. Message is not defined.');
            }

            var defaultOptions = {
              title: 'Внимание!',
              msg: '',
              icon: '',
              okBtnClass: 'btn-secondary',
              okBtnText: 'Oк',
              cancelBtnText: 'Отказ',
              showCancelButton: true
            };

            var options = Object.assign({}, defaultOptions, opts);

            var defaultSettings = {
              viewModel: DialogOptions,
              model: options
            };

            var settings = Object.assign({}, opts, defaultSettings);

            return this.openModalDialog(settings).then(function (result) {
              return new Promise(function (resolve, reject) {
                if (!result.wasCancelled) {
                  resolve(result.output || true);
                } else {
                  resolve(result.output || false);
                }
              });
            });
          }
        }, {
          key: 'hasOpenDialogs',
          value: function hasOpenDialogs() {
            return document.body.classList.contains('ai-dialog-open');
          }
        }, {
          key: '_open',
          value: function _open(settings) {
            var _this = this;

            var _settings = Object.assign({}, this.renderer.defaultSettings, settings);

            return new Promise(function (resolve, reject) {
              var childContainer = _this.container.createChild();
              var dialogController = new DialogController(_this.renderer, _settings, resolve, reject);
              var instruction = {
                viewModel: _settings.viewModel,
                container: _this.container,
                childContainer: childContainer,
                model: _settings.model
              };

              childContainer.registerInstance(DialogController, dialogController);

              return _this._getViewModel(instruction).then(function (returnedInstruction) {
                dialogController.viewModel = returnedInstruction.viewModel;

                return invokeLifecycle(returnedInstruction.viewModel, 'canActivate', _settings.model).then(function (canActivate) {
                  if (canActivate) {
                    return _this.compositionEngine.createController(returnedInstruction).then(function (controller) {
                      dialogController.controller = controller;
                      dialogController.view = controller.view;
                      controller.automate();

                      return _this.renderer.createDialogHost(dialogController).then(function () {
                        return _this.renderer.showDialog(dialogController);
                      });
                    });
                  }
                });
              });
            });
          }
        }]);

        var _DialogService = DialogService;
        DialogService = inject(Container, CompositionEngine, DialogRenderer)(DialogService) || DialogService;
        return DialogService;
      })();

      _export('DialogService', DialogService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0hBU2EsYUFBYTs7Ozs7Ozs7Z0NBUmxCLE1BQU07O29DQUNOLFNBQVM7NENBQUUsaUJBQWlCO2lDQUFFLE1BQU07OzJDQUNwQyxnQkFBZ0I7O3VDQUNoQixjQUFjOzttQ0FDZCxlQUFlOztxQ0FDZixhQUFhOzs7QUFHUixtQkFBYTtBQUNiLGlCQURBLGFBQWEsQ0FDWixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFOzs7QUFDbEQsY0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsY0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFCOztxQkFMVSxhQUFhOztpQkFPWCx1QkFBQyxXQUFXLEVBQUU7QUFDekIsZ0JBQUksT0FBTyxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUMvQyx5QkFBVyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDcEU7O0FBRUQsZ0JBQUksT0FBTyxXQUFXLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUM3QyxxQkFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVEOztBQUVELG1CQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDckM7OztpQkFFUyxvQkFBQyxRQUFRLEVBQUU7QUFDbkIsZ0JBQU0sZUFBZSxHQUFHO0FBQ3RCLGtCQUFJLEVBQUUsSUFBSTthQUNYLENBQUM7O0FBRUYsZ0JBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzRCxtQkFBTyxDQUFDLE9B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Q2pFLCtCQUFPLE1BQUssUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3VCQUNuRCxDQUFDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO21CQUNKO2lCQUNGLENBQUMsQ0FBQztlQUNKLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztXQUNKOzs7NkJBeElVLGFBQWE7QUFBYixxQkFBYSxHQUR6QixNQUFNLENBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUN4QyxhQUFhLEtBQWIsYUFBYTtlQUFiLGFBQWEiLCJmaWxlIjoiZmVhdHVyZXMvZGlhbG9nL2RpYWxvZy1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdG9kbzogZ2V0IE9yaWdpbiBmcm9tIGF1cmVsaWEtZnJhbWV3b3JrIGFuZCBqc3BtIHVuaW5zdGFsbCBhdXJlbGlhLW1ldGFkYXRhXHJcbmltcG9ydCB7T3JpZ2lufSBmcm9tICdhdXJlbGlhLW1ldGFkYXRhJztcclxuaW1wb3J0IHtDb250YWluZXIsIENvbXBvc2l0aW9uRW5naW5lLCBpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtEaWFsb2dDb250cm9sbGVyfSBmcm9tICcuL2RpYWxvZy1jb250cm9sbGVyJztcclxuaW1wb3J0IHtEaWFsb2dSZW5kZXJlcn0gZnJvbSAnLi9kaWFsb2ctcmVuZGVyZXInO1xyXG5pbXBvcnQge2ludm9rZUxpZmVjeWNsZX0gZnJvbSAnLi9saWZlY3ljbGUnO1xyXG5pbXBvcnQge0RpYWxvZ09wdGlvbnN9IGZyb20gJy4vZGlhbG9nLW9wdGlvbnMnO1xyXG5cclxuQGluamVjdChDb250YWluZXIsIENvbXBvc2l0aW9uRW5naW5lLCBEaWFsb2dSZW5kZXJlcilcclxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lciwgY29tcG9zaXRpb25FbmdpbmUsIHJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIHRoaXMuY29tcG9zaXRpb25FbmdpbmUgPSBjb21wb3NpdGlvbkVuZ2luZTtcclxuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICB9XHJcblxyXG4gIF9nZXRWaWV3TW9kZWwoaW5zdHJ1Y3Rpb24pIHtcclxuICAgIGlmICh0eXBlb2YgaW5zdHJ1Y3Rpb24udmlld01vZGVsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGluc3RydWN0aW9uLnZpZXdNb2RlbCA9IE9yaWdpbi5nZXQoaW5zdHJ1Y3Rpb24udmlld01vZGVsKS5tb2R1bGVJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGluc3RydWN0aW9uLnZpZXdNb2RlbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tcG9zaXRpb25FbmdpbmUuZW5zdXJlVmlld01vZGVsKGluc3RydWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluc3RydWN0aW9uKTtcclxuICB9XHJcblxyXG4gIG9wZW5EaWFsb2coc2V0dGluZ3MpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgICAgbG9jazogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xyXG4gICAgb3B0aW9ucy5pc01vZGFsID0gZmFsc2U7IC8vIGV4cGxpY2l0bHkgaGFyZC1jb2RlZFxyXG5cclxuICAgIHJldHVybiB0aGlzLl9vcGVuKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsRGlhbG9nKHNldHRpbmdzKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7XHJcbiAgICAgIGxvY2s6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuICAgIG9wdGlvbnMuaXNNb2RhbCA9IHRydWU7IC8vIGV4cGxpY2l0bHkgaGFyZC1jb2RlZFxyXG5cclxuICAgIHJldHVybiB0aGlzLl9vcGVuKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgb3BlbkNvbmZpcm1EZWxldGVEaWFsb2cob3B0cykge1xyXG4gICAgb3B0cyA9IG9wdHMgfHwge307XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiAn0JLQvdC40LzQsNC90LjQtSEnLFxyXG4gICAgICBtc2c6ICcnLFxyXG4gICAgICBpY29uOiAnZmEtdHJhc2gtbycsXHJcbiAgICAgIG9rQnRuQ2xhc3M6ICdidG4tZGFuZ2VyJyxcclxuICAgICAgb2tCdG5UZXh0OiAn0JjQt9GC0YDQuNC5JyxcclxuICAgICAgY2FuY2VsQnRuVGV4dDogJ9Ce0YLQutCw0LcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdHMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm9wZW5Db25maXJtRGlhbG9nKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgb3BlbkNvbmZpcm1EaWFsb2cob3B0cykge1xyXG4gICAgb3B0cyA9IG9wdHMgfHwge307XHJcblxyXG4gICAgaWYgKCFvcHRzLm1zZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IEV4Y2VwdGlvbi4gTWVzc2FnZSBpcyBub3QgZGVmaW5lZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvcHRpb25zIGZvciBEaWFsb2dPcHRpb25zXHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6ICfQktC90LjQvNCw0L3QuNC1IScsXHJcbiAgICAgIG1zZzogJycsXHJcbiAgICAgIGljb246ICcnLFxyXG4gICAgICBva0J0bkNsYXNzOiAnYnRuLXNlY29uZGFyeScsXHJcbiAgICAgIG9rQnRuVGV4dDogJ0/QuicsXHJcbiAgICAgIGNhbmNlbEJ0blRleHQ6ICfQntGC0LrQsNC3JyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9ICBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0cyk7XHJcblxyXG4gICAgLy8gc2V0dGluZ3MgZm9yIERpYWxvZ1JlbmRlcmVyXHJcbiAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7XHJcbiAgICAgIHZpZXdNb2RlbDogRGlhbG9nT3B0aW9ucyxcclxuICAgICAgbW9kZWw6IG9wdGlvbnNcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cywgZGVmYXVsdFNldHRpbmdzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5vcGVuTW9kYWxEaWFsb2coc2V0dGluZ3MpLnRoZW4ocmVzdWx0ID0+XHJcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAoIXJlc3VsdC53YXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0Lm91dHB1dCB8fCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQub3V0cHV0IHx8IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcblxyXG4gIGhhc09wZW5EaWFsb2dzKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhaS1kaWFsb2ctb3BlbicpO1xyXG4gIH1cclxuXHJcbiAgX29wZW4oc2V0dGluZ3MpIHtcclxuICAgIGxldCBfc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJlbmRlcmVyLmRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBjaGlsZENvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNoaWxkKCk7XHJcbiAgICAgIGxldCBkaWFsb2dDb250cm9sbGVyID0gbmV3IERpYWxvZ0NvbnRyb2xsZXIodGhpcy5yZW5kZXJlciwgX3NldHRpbmdzLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSB7XHJcbiAgICAgICAgdmlld01vZGVsOiBfc2V0dGluZ3Mudmlld01vZGVsLFxyXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXHJcbiAgICAgICAgY2hpbGRDb250YWluZXI6IGNoaWxkQ29udGFpbmVyLFxyXG4gICAgICAgIG1vZGVsOiBfc2V0dGluZ3MubW9kZWxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNoaWxkQ29udGFpbmVyLnJlZ2lzdGVySW5zdGFuY2UoRGlhbG9nQ29udHJvbGxlciwgZGlhbG9nQ29udHJvbGxlcik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fZ2V0Vmlld01vZGVsKGluc3RydWN0aW9uKS50aGVuKHJldHVybmVkSW5zdHJ1Y3Rpb24gPT4ge1xyXG4gICAgICAgIGRpYWxvZ0NvbnRyb2xsZXIudmlld01vZGVsID0gcmV0dXJuZWRJbnN0cnVjdGlvbi52aWV3TW9kZWw7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnZva2VMaWZlY3ljbGUocmV0dXJuZWRJbnN0cnVjdGlvbi52aWV3TW9kZWwsICdjYW5BY3RpdmF0ZScsIF9zZXR0aW5ncy5tb2RlbCkudGhlbihjYW5BY3RpdmF0ZSA9PiB7XHJcbiAgICAgICAgICBpZiAoY2FuQWN0aXZhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9zaXRpb25FbmdpbmUuY3JlYXRlQ29udHJvbGxlcihyZXR1cm5lZEluc3RydWN0aW9uKS50aGVuKGNvbnRyb2xsZXIgPT4ge1xyXG4gICAgICAgICAgICAgIGRpYWxvZ0NvbnRyb2xsZXIuY29udHJvbGxlciA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgICAgICAgZGlhbG9nQ29udHJvbGxlci52aWV3ID0gY29udHJvbGxlci52aWV3O1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuYXV0b21hdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY3JlYXRlRGlhbG9nSG9zdChkaWFsb2dDb250cm9sbGVyKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnNob3dEaWFsb2coZGlhbG9nQ29udHJvbGxlcik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
