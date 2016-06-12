System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, CopyButton;

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
      CopyButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(CopyButton, [{
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
            return 'Копирай';
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
            return 'btn-primary';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function CopyButton(element) {
          _classCallCheck(this, _CopyButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(CopyButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _CopyButton = CopyButton;
        CopyButton = inject(Element)(CopyButton) || CopyButton;
        CopyButton = customElement('copy-button')(CopyButton) || CopyButton;
        return CopyButton;
      })();

      _export('CopyButton', CopyButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvY29weS9jb3B5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxVQUFVOzs7Ozs7Ozs7O2lDQUpmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsZ0JBQVU7Ozs7OEJBQVYsVUFBVTs7dUJBQ3BCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsU0FBUzs7Ozs7dUJBQzFCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBUSxhQUFhOzs7OztBQUVuQixpQkFQQSxVQUFVLENBT1QsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOzs4QkFUVSxVQUFVOztpQkFXUix5QkFBRztBQUNkLGdCQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMsa0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtXQUNGOzs7MEJBZlUsVUFBVTtBQUFWLGtCQUFVLEdBRHRCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxVQUFVLEtBQVYsVUFBVTtBQUFWLGtCQUFVLEdBRnRCLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FFaEIsVUFBVSxLQUFWLFVBQVU7ZUFBVixVQUFVIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvY29weS9jb3B5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnY29weS1idXR0b24nKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBDb3B5QnV0dG9uIHtcclxuICBAYmluZGFibGUgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAYmluZGFibGUgb25DbGljayA9IG51bGw7XHJcbiAgQGJpbmRhYmxlIHRpdGxlID0gJ9Ca0L7Qv9C40YDQsNC5JztcclxuICBAYmluZGFibGUgbmFtZSA9ICcnO1xyXG4gIEBiaW5kYWJsZSB0eXBlID0gJ2J0bi1wcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
