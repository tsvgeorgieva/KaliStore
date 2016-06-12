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
            return 'Отпечатай';
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

        function SaveButton(element) {
          _classCallCheck(this, _SaveButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

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
        SaveButton = customElement('print-button')(SaveButton) || SaveButton;
        return SaveButton;
      })();

      _export('SaveButton', SaveButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvcHJpbnQvcHJpbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUlhLFVBQVU7Ozs7Ozs7Ozs7aUNBSmYsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7OztBQUkxQixnQkFBVTs7Ozs4QkFBVixVQUFVOzt1QkFDcEIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFXLElBQUk7Ozs7O3VCQUN2QixRQUFROzttQkFBUyxXQUFXOzs7Ozt1QkFDNUIsUUFBUTs7bUJBQVEsRUFBRTs7Ozs7QUFFUixpQkFOQSxVQUFVLENBTVQsT0FBTyxFQUFFOzs7Ozs7Ozs7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7OEJBUlUsVUFBVTs7aUJBVVIseUJBQUc7QUFDZCxnQkFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3RDLGtCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7V0FDRjs7OzBCQWRVLFVBQVU7QUFBVixrQkFBVSxHQUR0QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ0gsVUFBVSxLQUFWLFVBQVU7QUFBVixrQkFBVSxHQUZ0QixhQUFhLENBQUMsY0FBYyxDQUFDLENBRWpCLFVBQVUsS0FBVixVQUFVO2VBQVYsVUFBVSIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9idXR0b25zL3ByaW50L3ByaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgncHJpbnQtYnV0dG9uJylcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgU2F2ZUJ1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSB0aXRsZSA9ICfQntGC0L/QtdGH0LDRgtCw0LknO1xyXG4gIEBiaW5kYWJsZSBuYW1lID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBidXR0b25DbGlja2VkKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
