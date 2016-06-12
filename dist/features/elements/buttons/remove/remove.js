System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, RemoveButton;

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
      RemoveButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(RemoveButton, [{
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
            return 'Премахни';
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

        function RemoveButton(element) {
          _classCallCheck(this, _RemoveButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(RemoveButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _RemoveButton = RemoveButton;
        RemoveButton = inject(Element)(RemoveButton) || RemoveButton;
        RemoveButton = customElement('remove-button')(RemoveButton) || RemoveButton;
        return RemoveButton;
      })();

      _export('RemoveButton', RemoveButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvcmVtb3ZlL3JlbW92ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBSWEsWUFBWTs7Ozs7Ozs7OztpQ0FKakIsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7OztBQUkxQixrQkFBWTs7Ozs4QkFBWixZQUFZOzt1QkFDdEIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFXLElBQUk7Ozs7O3VCQUN2QixRQUFROzttQkFBUyxVQUFVOzs7Ozt1QkFDM0IsUUFBUTs7bUJBQVEsRUFBRTs7Ozs7dUJBQ2xCLFFBQVE7O21CQUFRLGFBQWE7Ozs7O0FBRW5CLGlCQVBBLFlBQVksQ0FPWCxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVRVLFlBQVk7O2lCQVdWLHlCQUFHO0FBQ2QsZ0JBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1dBQ0Y7Ozs0QkFmVSxZQUFZO0FBQVosb0JBQVksR0FEeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFlBQVksS0FBWixZQUFZO0FBQVosb0JBQVksR0FGeEIsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUVsQixZQUFZLEtBQVosWUFBWTtlQUFaLFlBQVkiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9yZW1vdmUvcmVtb3ZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgncmVtb3ZlLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIFJlbW92ZUJ1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSB0aXRsZSA9ICfQn9GA0LXQvNCw0YXQvdC4JztcclxuICBAYmluZGFibGUgbmFtZSA9ICcnO1xyXG4gIEBiaW5kYWJsZSB0eXBlID0gJ2J0bi1kZWZhdWx0JztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
