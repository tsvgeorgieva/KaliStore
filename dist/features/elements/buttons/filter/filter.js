System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, FilterButton;

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
      FilterButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(FilterButton, [{
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
          key: 'isActive',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function FilterButton(element) {
          _classCallCheck(this, _FilterButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'isActive', _instanceInitializers);

          this.name = '';
          this.type = 'btn-default';

          this.element = element;
        }

        _createDecoratedClass(FilterButton, [{
          key: 'bind',
          value: function bind() {
            if (this.isActive) {
              this._activateFilter();
            } else {
              this._deactivateFilter();
            }
          }
        }, {
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }

            this._toggleFilter();
          }
        }, {
          key: '_toggleFilter',
          value: function _toggleFilter() {
            if (this.isActive) {
              this._deactivateFilter();
            } else {
              this._activateFilter();
            }
          }
        }, {
          key: '_activateFilter',
          value: function _activateFilter() {
            this.isActive = true;
            this.name = 'Скрий филтър';
            this.type = 'btn-success';
          }
        }, {
          key: '_deactivateFilter',
          value: function _deactivateFilter() {
            this.isActive = false;
            this.name = 'Покажи филтър';
            this.type = 'btn-default';
          }
        }], null, _instanceInitializers);

        var _FilterButton = FilterButton;
        FilterButton = inject(Element)(FilterButton) || FilterButton;
        FilterButton = customElement('filter-button')(FilterButton) || FilterButton;
        return FilterButton;
      })();

      _export('FilterButton', FilterButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvZmlsdGVyL2ZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBSWEsWUFBWTs7Ozs7Ozs7OztpQ0FKakIsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7OztBQUkxQixrQkFBWTs7Ozs4QkFBWixZQUFZOzt1QkFDdEIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFXLElBQUk7Ozs7O3VCQUN2QixRQUFROzs7OztBQUlFLGlCQVBBLFlBQVksQ0FPWCxPQUFPLEVBQUU7Ozs7Ozs7OztlQUhyQixJQUFJLEdBQUcsRUFBRTtlQUNULElBQUksR0FBRyxhQUFhOztBQUdsQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7OEJBVFUsWUFBWTs7aUJBV25CLGdCQUFHO0FBQ0wsZ0JBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNqQixrQkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCLE1BQU07QUFDTCxrQkFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUI7V0FDRjs7O2lCQUVZLHlCQUFHO0FBQ2QsZ0JBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCOztBQUVELGdCQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7V0FDdEI7OztpQkFFWSx5QkFBRztBQUNkLGdCQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDakIsa0JBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCLE1BQU07QUFDTCxrQkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCO1dBQ0Y7OztpQkFFYywyQkFBRztBQUNoQixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO0FBQzNCLGdCQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztXQUMzQjs7O2lCQUVnQiw2QkFBRztBQUNsQixnQkFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO0FBQzVCLGdCQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztXQUMzQjs7OzRCQTdDVSxZQUFZO0FBQVosb0JBQVksR0FEeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFlBQVksS0FBWixZQUFZO0FBQVosb0JBQVksR0FGeEIsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUVsQixZQUFZLEtBQVosWUFBWTtlQUFaLFlBQVkiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYnV0dG9ucy9maWx0ZXIvZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnZmlsdGVyLWJ1dHRvbicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIEZpbHRlckJ1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBpc0FjdGl2ZTtcclxuICBuYW1lID0gJyc7XHJcbiAgdHlwZSA9ICdidG4tZGVmYXVsdCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBiaW5kKCkge1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5fYWN0aXZhdGVGaWx0ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2RlYWN0aXZhdGVGaWx0ZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90b2dnbGVGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVGaWx0ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLl9kZWFjdGl2YXRlRmlsdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9hY3RpdmF0ZUZpbHRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2FjdGl2YXRlRmlsdGVyKCkge1xyXG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm5hbWUgPSAn0KHQutGA0LjQuSDRhNC40LvRgtGK0YAnO1xyXG4gICAgdGhpcy50eXBlID0gJ2J0bi1zdWNjZXNzJztcclxuICB9XHJcblxyXG4gIF9kZWFjdGl2YXRlRmlsdGVyKCkge1xyXG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5uYW1lID0gJ9Cf0L7QutCw0LbQuCDRhNC40LvRgtGK0YAnO1xyXG4gICAgdGhpcy50eXBlID0gJ2J0bi1kZWZhdWx0JztcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
