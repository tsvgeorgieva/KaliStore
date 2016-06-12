System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, computedFrom, NavigationButton;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }],
    execute: function () {
      NavigationButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(NavigationButton, [{
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
          key: 'icon',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }, {
          key: 'selected',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function NavigationButton(element) {
          _classCallCheck(this, _NavigationButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'icon', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'selected', _instanceInitializers);

          this.element = element;
          this.element.style.display = 'inline-block';
        }

        _createDecoratedClass(NavigationButton, [{
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

        var _NavigationButton = NavigationButton;
        NavigationButton = inject(Element)(NavigationButton) || NavigationButton;
        NavigationButton = customElement('navigation-button')(NavigationButton) || NavigationButton;
        return NavigationButton;
      })();

      _export('NavigationButton', NavigationButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxREFJYSxnQkFBZ0I7Ozs7Ozs7Ozs7aUNBSnJCLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFRO3VDQUFFLFlBQVk7OztBQUl4QyxzQkFBZ0I7Ozs7OEJBQWhCLGdCQUFnQjs7dUJBQzFCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsRUFBRTs7Ozs7dUJBQ25CLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBWSxLQUFLOzs7OztBQUVmLGlCQVBBLGdCQUFnQixDQU9mLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1NBQzdDOzs4QkFWVSxnQkFBZ0I7O2lCQVlkLHlCQUFHO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDMUIscUJBQU87YUFDUjs7QUFFRCxnQkFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3RDLGtCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7V0FDRjs7O2dDQXBCVSxnQkFBZ0I7QUFBaEIsd0JBQWdCLEdBRDVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxnQkFBZ0IsS0FBaEIsZ0JBQWdCO0FBQWhCLHdCQUFnQixHQUY1QixhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FFdEIsZ0JBQWdCLEtBQWhCLGdCQUFnQjtlQUFoQixnQkFBZ0IiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGNvbXB1dGVkRnJvbX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGN1c3RvbUVsZW1lbnQoJ25hdmlnYXRpb24tYnV0dG9uJylcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkJ1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSB0aXRsZSA9ICcnO1xyXG4gIEBiaW5kYWJsZSBpY29uID0gJyc7XHJcbiAgQGJpbmRhYmxlIHNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gIH1cclxuXHJcbiAgYnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
