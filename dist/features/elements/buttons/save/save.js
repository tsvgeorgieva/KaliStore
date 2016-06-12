System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, SaveButton;

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
      SaveButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(SaveButton, [{
          key: 'disabled',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'onClick',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'title',
          decorators: [bindable],
          initializer: function initializer() {
            return 'Съхрани';
          },
          enumerable: true
        }, {
          key: 'name',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }, {
          key: 'type',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function SaveButton(element) {
          _classCallCheck(this, _SaveButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(SaveButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _SaveButton = SaveButton;
        SaveButton = inject(Element)(SaveButton) || SaveButton;
        SaveButton = customElement('save-button')(SaveButton) || SaveButton;
        return SaveButton;
      })();

      _export('SaveButton', SaveButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvc2F2ZS9zYXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxVQUFVOzs7Ozs7Ozs7O2lDQUpmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsZ0JBQVU7Ozs7OEJBQVYsVUFBVTs7dUJBQ3BCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsU0FBUzs7Ozs7dUJBQzFCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBUSxFQUFFOzs7OztBQUVSLGlCQVBBLFVBQVUsQ0FPVCxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVRVLFVBQVU7O2lCQVdSLHlCQUFHO0FBQ2QsZ0JBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1dBQ0Y7OzswQkFmVSxVQUFVO0FBQVYsa0JBQVUsR0FEdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFVBQVUsS0FBVixVQUFVO0FBQVYsa0JBQVUsR0FGdEIsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUVoQixVQUFVLEtBQVYsVUFBVTtlQUFWLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9zYXZlL3NhdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdzYXZlLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIFNhdmVCdXR0b24ge1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvbkNsaWNrID0gbnVsbDtcclxuICBAYmluZGFibGUgdGl0bGUgPSAn0KHRitGF0YDQsNC90LgnO1xyXG4gIEBiaW5kYWJsZSBuYW1lID0gJyc7XHJcbiAgQGJpbmRhYmxlIHR5cGUgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
