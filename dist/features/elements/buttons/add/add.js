System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, AddButton;

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
      AddButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(AddButton, [{
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
            return 'Добавяне';
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
            return 'btn-default';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function AddButton(element) {
          _classCallCheck(this, _AddButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(AddButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _AddButton = AddButton;
        AddButton = inject(Element)(AddButton) || AddButton;
        AddButton = customElement('add-button')(AddButton) || AddButton;
        return AddButton;
      })();

      _export('AddButton', AddButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvYWRkL2FkZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBSWEsU0FBUzs7Ozs7Ozs7OztpQ0FKZCxNQUFNO3dDQUFFLGFBQWE7bUNBQUUsUUFBUTs7O0FBSTFCLGVBQVM7Ozs7OEJBQVQsU0FBUzs7dUJBQ25CLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsVUFBVTs7Ozs7dUJBQzNCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBTSxhQUFhOzs7OztBQUVqQixpQkFQQSxTQUFTLENBT1IsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOzs4QkFUVSxTQUFTOztpQkFXUCx5QkFBRztBQUNkLGdCQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMsa0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtXQUNGOzs7eUJBZlUsU0FBUztBQUFULGlCQUFTLEdBRHJCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxTQUFTLEtBQVQsU0FBUztBQUFULGlCQUFTLEdBRnJCLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FFZixTQUFTLEtBQVQsU0FBUztlQUFULFNBQVMiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9hZGQvYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnYWRkLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIEFkZEJ1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSB0aXRsZSA9ICfQlNC+0LHQsNCy0Y/QvdC1JztcclxuICBAYmluZGFibGUgbmFtZSA9ICcnO1xyXG4gIEBiaW5kYWJsZSB0eXBlPSdidG4tZGVmYXVsdCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBidXR0b25DbGlja2VkKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
