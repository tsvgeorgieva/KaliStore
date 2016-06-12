System.register(['aurelia-framework', './dialog-controller'], function (_export) {
  'use strict';

  var customElement, bindable, DialogController, AiDialogFooter;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }, function (_dialogController) {
      DialogController = _dialogController.DialogController;
    }],
    execute: function () {
      AiDialogFooter = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(AiDialogFooter, [{
          key: 'buttons',
          decorators: [bindable],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }, {
          key: 'useDefaultButtons',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }], [{
          key: 'inject',
          value: [DialogController],
          enumerable: true
        }], _instanceInitializers);

        function AiDialogFooter(controller) {
          _classCallCheck(this, _AiDialogFooter);

          _defineDecoratedPropertyDescriptor(this, 'buttons', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'useDefaultButtons', _instanceInitializers);

          this.controller = controller;
        }

        _createDecoratedClass(AiDialogFooter, [{
          key: 'close',
          value: function close(buttonValue) {
            if (AiDialogFooter.isCancelButton(buttonValue)) {
              this.controller.cancel(buttonValue);
            } else {
              this.controller.ok(buttonValue);
            }
          }
        }, {
          key: 'useDefaultButtonsChanged',
          value: function useDefaultButtonsChanged(newValue) {
            if (newValue) {
              this.buttons = ['Cancel', 'Ok'];
            }
          }
        }], [{
          key: 'isCancelButton',
          value: function isCancelButton(value) {
            return value === 'Cancel';
          }
        }], _instanceInitializers);

        var _AiDialogFooter = AiDialogFooter;
        AiDialogFooter = customElement('ai-dialog-footer')(AiDialogFooter) || AiDialogFooter;
        return AiDialogFooter;
      })();

      _export('AiDialogFooter', AiDialogFooter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9haS1kaWFsb2ctZm9vdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpREFJYSxjQUFjOzs7Ozs7Ozs7O3dDQUpuQixhQUFhO21DQUFFLFFBQVE7OzJDQUN2QixnQkFBZ0I7OztBQUdYLG9CQUFjOzs7OzhCQUFkLGNBQWM7O3VCQUd4QixRQUFROzttQkFBVyxFQUFFOzs7Ozt1QkFDckIsUUFBUTs7bUJBQXFCLEtBQUs7Ozs7O2lCQUhuQixDQUFDLGdCQUFnQixDQUFDOzs7O0FBS3ZCLGlCQU5BLGNBQWMsQ0FNYixVQUFVLEVBQUU7Ozs7Ozs7QUFDdEIsY0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7U0FDOUI7OzhCQVJVLGNBQWM7O2lCQVVwQixlQUFDLFdBQVcsRUFBRTtBQUNqQixnQkFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQzlDLGtCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNyQyxNQUFNO0FBQ0wsa0JBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2pDO1dBQ0Y7OztpQkFFdUIsa0NBQUMsUUFBUSxFQUFFO0FBQ2pDLGdCQUFJLFFBQVEsRUFBRTtBQUNaLGtCQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1dBQ0Y7OztpQkFFb0Isd0JBQUMsS0FBSyxFQUFFO0FBQzNCLG1CQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7V0FDM0I7Ozs4QkExQlUsY0FBYztBQUFkLHNCQUFjLEdBRDFCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUNyQixjQUFjLEtBQWQsY0FBYztlQUFkLGNBQWMiLCJmaWxlIjoiZmVhdHVyZXMvZGlhbG9nL2FpLWRpYWxvZy1mb290ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSAnLi9kaWFsb2ctY29udHJvbGxlcic7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnYWktZGlhbG9nLWZvb3RlcicpXHJcbmV4cG9ydCBjbGFzcyBBaURpYWxvZ0Zvb3RlciB7XHJcbiAgc3RhdGljIGluamVjdCA9IFtEaWFsb2dDb250cm9sbGVyXTtcclxuXHJcbiAgQGJpbmRhYmxlIGJ1dHRvbnMgPSBbXTtcclxuICBAYmluZGFibGUgdXNlRGVmYXVsdEJ1dHRvbnMgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xyXG4gICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGNsb3NlKGJ1dHRvblZhbHVlKSB7XHJcbiAgICBpZiAoQWlEaWFsb2dGb290ZXIuaXNDYW5jZWxCdXR0b24oYnV0dG9uVmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbGxlci5jYW5jZWwoYnV0dG9uVmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250cm9sbGVyLm9rKGJ1dHRvblZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVzZURlZmF1bHRCdXR0b25zQ2hhbmdlZChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYnV0dG9ucyA9IFsnQ2FuY2VsJywgJ09rJ107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNDYW5jZWxCdXR0b24odmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZSA9PT0gJ0NhbmNlbCc7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
