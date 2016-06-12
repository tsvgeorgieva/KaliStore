System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, LoadingMask;

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
      LoadingMask = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(LoadingMask, [{
          key: 'title',
          decorators: [bindable],
          initializer: function initializer() {
            return 'Зареждане';
          },
          enumerable: true
        }, {
          key: 'showMask',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function LoadingMask(element) {
          _classCallCheck(this, _LoadingMask);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showMask', _instanceInitializers);

          this.element = element;

          this.titleStyleObject = {
            color: '#ffffff',
            opacity: 1,
            fontSize: '2.5em'
          };
        }

        _createDecoratedClass(LoadingMask, [{
          key: 'attached',
          value: function attached() {
            this.spinnerElement = this.element.children[0];
          }
        }, {
          key: 'showMaskChanged',
          value: function showMaskChanged(newValue, oldValue) {
            if (newValue === true) {
              this._showLoadingMask();
            } else {
              this._hideLoadingMask();
            }
          }
        }, {
          key: '_showLoadingMask',
          value: function _showLoadingMask() {
            this.spinnerElement.style.display = 'block';
          }
        }, {
          key: '_hideLoadingMask',
          value: function _hideLoadingMask() {
            this.spinnerElement.style.display = 'none';
          }
        }], null, _instanceInitializers);

        var _LoadingMask = LoadingMask;
        LoadingMask = inject(Element)(LoadingMask) || LoadingMask;
        LoadingMask = customElement('loading-mask')(LoadingMask) || LoadingMask;
        return LoadingMask;
      })();

      _export('LoadingMask', LoadingMask);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2xvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUlhLFdBQVc7Ozs7Ozs7Ozs7aUNBSmhCLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsaUJBQVc7Ozs7OEJBQVgsV0FBVzs7dUJBQ3JCLFFBQVE7O21CQUFTLFdBQVc7Ozs7O3VCQUM1QixRQUFROzttQkFBWSxLQUFLOzs7OztBQUVmLGlCQUpBLFdBQVcsQ0FJVixPQUFPLEVBQUU7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0FBRXZCLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRztBQUN0QixpQkFBSyxFQUFFLFNBQVM7QUFDaEIsbUJBQU8sRUFBRSxDQUFDO0FBQ1Ysb0JBQVEsRUFBRSxPQUFPO1dBQ2xCLENBQUM7U0FDSDs7OEJBWlUsV0FBVzs7aUJBY2Qsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNoRDs7O2lCQUVjLHlCQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDbEMsZ0JBQUksUUFBUSxLQUFLLElBQUksRUFBRTtBQUNyQixrQkFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekIsTUFBTTtBQUNMLGtCQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtXQUNGOzs7aUJBRWUsNEJBQUc7QUFDakIsZ0JBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7V0FDN0M7OztpQkFFZSw0QkFBRztBQUNqQixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztXQUM1Qzs7OzJCQWhDVSxXQUFXO0FBQVgsbUJBQVcsR0FEdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFdBQVcsS0FBWCxXQUFXO0FBQVgsbUJBQVcsR0FGdkIsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUVqQixXQUFXLEtBQVgsV0FBVztlQUFYLFdBQVciLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvbG9hZGluZy1tYXNrL2xvYWRpbmctbWFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGN1c3RvbUVsZW1lbnQoJ2xvYWRpbmctbWFzaycpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIExvYWRpbmdNYXNrIHtcclxuICBAYmluZGFibGUgdGl0bGUgPSAn0JfQsNGA0LXQttC00LDQvdC1JztcclxuICBAYmluZGFibGUgc2hvd01hc2sgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHJcbiAgICB0aGlzLnRpdGxlU3R5bGVPYmplY3QgPSB7XHJcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIGZvbnRTaXplOiAnMi41ZW0nXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICB0aGlzLnNwaW5uZXJFbGVtZW50ID0gdGhpcy5lbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gIH1cclxuXHJcbiAgc2hvd01hc2tDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dMb2FkaW5nTWFzaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGlkZUxvYWRpbmdNYXNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd0xvYWRpbmdNYXNrKCkge1xyXG4gICAgdGhpcy5zcGlubmVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9XHJcblxyXG4gIF9oaWRlTG9hZGluZ01hc2soKSB7XHJcbiAgICB0aGlzLnNwaW5uZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
