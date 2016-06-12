System.register(['aurelia-framework', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, customElementHelper, Rating;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Rating = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Rating, [{
          key: 'rating',
          decorators: [bindable],
          initializer: function initializer() {
            return 0;
          },
          enumerable: true
        }, {
          key: 'readonly',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'options',
          decorators: [bindable],
          initializer: function initializer() {
            return {};
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Rating(element) {
          _classCallCheck(this, _Rating);

          _defineDecoratedPropertyDescriptor(this, 'rating', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'readonly', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);

          this.defaultOptions = {
            maxRating: 5,
            minRating: 1
          };
          this.ratings = [];

          this.element = element;
        }

        _createDecoratedClass(Rating, [{
          key: 'bind',
          value: function bind() {
            this.options = Object.assign({}, this.defaultOptions, this.options);
            this.ratings = Rating.getReverseArray(this.options.minRating, this.options.maxRating);
          }
        }, {
          key: 'rate',
          value: function rate(rateValue) {
            if (this.readonly === false) {
              customElementHelper.dispatchEvent(this.element, 'rate', {
                rateValue: rateValue
              });
            }
          }
        }], [{
          key: 'getReverseArray',
          value: function getReverseArray(min, max) {
            var ratings = [];
            for (var i = max; i >= min; i--) {
              ratings.push(i);
            }

            return ratings;
          }
        }], _instanceInitializers);

        var _Rating = Rating;
        Rating = inject(Element)(Rating) || Rating;
        Rating = customElement('rating')(Rating) || Rating;
        return Rating;
      })();

      _export('Rating', Rating);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3JhdGluZy9yYXRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzREQUthLE1BQU07Ozs7Ozs7Ozs7aUNBTFgsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7O21DQUMvQixtQkFBbUI7OztBQUlkLFlBQU07Ozs7OEJBQU4sTUFBTTs7dUJBQ2hCLFFBQVE7O21CQUFVLENBQUM7Ozs7O3VCQUNuQixRQUFROzttQkFBWSxLQUFLOzs7Ozt1QkFDekIsUUFBUTs7bUJBQVcsRUFBRTs7Ozs7QUFTWCxpQkFaQSxNQUFNLENBWUwsT0FBTyxFQUFFOzs7Ozs7Ozs7ZUFQckIsY0FBYyxHQUFHO0FBQ2YscUJBQVMsRUFBRSxDQUFDO0FBQ1oscUJBQVMsRUFBRSxDQUFDO1dBQ2I7ZUFFRCxPQUFPLEdBQUcsRUFBRTs7QUFHVixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7OEJBZFUsTUFBTTs7aUJBZ0JiLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEUsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1dBQ3ZGOzs7aUJBRUcsY0FBQyxTQUFTLEVBQUU7QUFDZCxnQkFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtBQUMzQixpQ0FBbUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDdEQseUJBQVMsRUFBRSxTQUFTO2VBQ3JCLENBQUMsQ0FBQzthQUNKO1dBQ0Y7OztpQkFFcUIseUJBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvQixnQkFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLGlCQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9CLHFCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pCOztBQUVELG1CQUFPLE9BQU8sQ0FBQztXQUNoQjs7O3NCQXBDVSxNQUFNO0FBQU4sY0FBTSxHQURsQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ0gsTUFBTSxLQUFOLE1BQU07QUFBTixjQUFNLEdBRmxCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FFWCxNQUFNLEtBQU4sTUFBTTtlQUFOLE1BQU0iLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvcmF0aW5nL3JhdGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge2N1c3RvbUVsZW1lbnRIZWxwZXJ9IGZyb20gJ3V0aWxzJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdyYXRpbmcnKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBSYXRpbmcge1xyXG4gIEBiaW5kYWJsZSByYXRpbmcgPSAwO1xyXG4gIEBiaW5kYWJsZSByZWFkb25seSA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvcHRpb25zID0ge307XHJcbiAgXHJcbiAgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBtYXhSYXRpbmc6IDUsXHJcbiAgICBtaW5SYXRpbmc6IDFcclxuICB9O1xyXG5cclxuICByYXRpbmdzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBiaW5kKCkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMucmF0aW5ncyA9IFJhdGluZy5nZXRSZXZlcnNlQXJyYXkodGhpcy5vcHRpb25zLm1pblJhdGluZywgdGhpcy5vcHRpb25zLm1heFJhdGluZyk7XHJcbiAgfVxyXG5cclxuICByYXRlKHJhdGVWYWx1ZSkge1xyXG4gICAgaWYgKHRoaXMucmVhZG9ubHkgPT09IGZhbHNlKSB7XHJcbiAgICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsICdyYXRlJywge1xyXG4gICAgICAgIHJhdGVWYWx1ZTogcmF0ZVZhbHVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldFJldmVyc2VBcnJheShtaW4sIG1heCkge1xyXG4gICAgbGV0IHJhdGluZ3MgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSBtYXg7IGkgPj0gbWluOyBpLS0pIHtcclxuICAgICAgcmF0aW5ncy5wdXNoKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByYXRpbmdzO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
