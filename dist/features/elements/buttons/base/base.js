System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, BaseButton;

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
      BaseButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(BaseButton, [{
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
            return '';
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
          key: 'icon',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
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

        function BaseButton(element) {
          _classCallCheck(this, _BaseButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'icon', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          this.element = element;
          this.element.style.display = 'inline-block';
        }

        _createDecoratedClass(BaseButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (this.disabled === true) {
              return;
            }

            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _BaseButton = BaseButton;
        BaseButton = inject(Element)(BaseButton) || BaseButton;
        BaseButton = customElement('base-button')(BaseButton) || BaseButton;
        return BaseButton;
      })();

      _export('BaseButton', BaseButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvYmFzZS9iYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxVQUFVOzs7Ozs7Ozs7O2lDQUpmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsZ0JBQVU7Ozs7OEJBQVYsVUFBVTs7dUJBQ3BCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsRUFBRTs7Ozs7dUJBQ25CLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBUSxJQUFJOzs7Ozt1QkFDcEIsUUFBUTs7bUJBQVEsYUFBYTs7Ozs7QUFFbkIsaUJBUkEsVUFBVSxDQVFULE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7U0FDN0M7OzhCQVhVLFVBQVU7O2lCQWFSLHlCQUFHO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDMUIscUJBQU87YUFDUjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3RDLGtCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7V0FDRjs7OzBCQXJCVSxVQUFVO0FBQVYsa0JBQVUsR0FEdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFVBQVUsS0FBVixVQUFVO0FBQVYsa0JBQVUsR0FGdEIsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUVoQixVQUFVLEtBQVYsVUFBVTtlQUFWLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9iYXNlL2Jhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdiYXNlLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIEJhc2VCdXR0b24ge1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvbkNsaWNrID0gbnVsbDtcclxuICBAYmluZGFibGUgdGl0bGUgPSAnJztcclxuICBAYmluZGFibGUgbmFtZSA9ICcnO1xyXG4gIEBiaW5kYWJsZSBpY29uID0gbnVsbDtcclxuICBAYmluZGFibGUgdHlwZSA9ICdidG4tZGVmYXVsdCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gIH1cclxuXHJcbiAgYnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
