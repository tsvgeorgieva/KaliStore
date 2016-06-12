System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, CancelButton;

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
      CancelButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(CancelButton, [{
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
            return 'Отмяна';
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

        function CancelButton(element) {
          _classCallCheck(this, _CancelButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(CancelButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _CancelButton = CancelButton;
        CancelButton = inject(Element)(CancelButton) || CancelButton;
        CancelButton = customElement('cancel-button')(CancelButton) || CancelButton;
        return CancelButton;
      })();

      _export('CancelButton', CancelButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvY2FuY2VsL2NhbmNlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBSWEsWUFBWTs7Ozs7Ozs7OztpQ0FKakIsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7OztBQUkxQixrQkFBWTs7Ozs4QkFBWixZQUFZOzt1QkFDdEIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFXLElBQUk7Ozs7O3VCQUN2QixRQUFROzttQkFBUyxRQUFROzs7Ozt1QkFDekIsUUFBUTs7bUJBQVEsRUFBRTs7Ozs7QUFFUixpQkFOQSxZQUFZLENBTVgsT0FBTyxFQUFFOzs7Ozs7Ozs7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7OEJBUlUsWUFBWTs7aUJBVVYseUJBQUc7QUFDZCxnQkFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3RDLGtCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7V0FDRjs7OzRCQWRVLFlBQVk7QUFBWixvQkFBWSxHQUR4QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ0gsWUFBWSxLQUFaLFlBQVk7QUFBWixvQkFBWSxHQUZ4QixhQUFhLENBQUMsZUFBZSxDQUFDLENBRWxCLFlBQVksS0FBWixZQUFZO2VBQVosWUFBWSIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9idXR0b25zL2NhbmNlbC9jYW5jZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdjYW5jZWwtYnV0dG9uJylcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgQ2FuY2VsQnV0dG9uIHtcclxuICBAYmluZGFibGUgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAYmluZGFibGUgb25DbGljayA9IG51bGw7XHJcbiAgQGJpbmRhYmxlIHRpdGxlID0gJ9Ce0YLQvNGP0L3QsCc7XHJcbiAgQGJpbmRhYmxlIG5hbWUgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
