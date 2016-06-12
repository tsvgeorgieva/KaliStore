System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, InfoButton;

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
      InfoButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(InfoButton, [{
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
            return 'Информация';
          },
          enumerable: true
        }, {
          key: 'name',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function InfoButton(element) {
          _classCallCheck(this, _InfoButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(InfoButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _InfoButton = InfoButton;
        InfoButton = inject(Element)(InfoButton) || InfoButton;
        InfoButton = customElement('info-button')(InfoButton) || InfoButton;
        return InfoButton;
      })();

      _export('InfoButton', InfoButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvaW5mby9pbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxVQUFVOzs7Ozs7Ozs7O2lDQUpmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsZ0JBQVU7Ozs7OEJBQVYsVUFBVTs7dUJBQ3BCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsWUFBWTs7Ozs7dUJBQzdCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O0FBRVIsaUJBTkEsVUFBVSxDQU1ULE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVJVLFVBQVU7O2lCQVVSLHlCQUFHO0FBQ2QsZ0JBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1dBQ0Y7OzswQkFkVSxVQUFVO0FBQVYsa0JBQVUsR0FEdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFVBQVUsS0FBVixVQUFVO0FBQVYsa0JBQVUsR0FGdEIsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUVoQixVQUFVLEtBQVYsVUFBVTtlQUFWLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9pbmZvL2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdpbmZvLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIEluZm9CdXR0b24ge1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvbkNsaWNrID0gbnVsbDtcclxuICBAYmluZGFibGUgdGl0bGUgPSAn0JjQvdGE0L7RgNC80LDRhtC40Y8nO1xyXG4gIEBiaW5kYWJsZSBuYW1lID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBidXR0b25DbGlja2VkKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
