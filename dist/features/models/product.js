System.register([], function (_export) {
  "use strict";

  var Product;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      Product = (function () {
        function Product(data) {
          _classCallCheck(this, Product);

          data = data || {};
          this.id = data.id;
          this.title = data.title;
          this.description = data.description;
          this.price = data.price;
          this.rating = data.rating || 0;
          this.materials = data.materials || [];
          this.size = data.size;
          this.picture = data.picture;
          this.pictures = data.pictures || [];
          this.category = data.category;
          this.daysToMake = data.daysToMake;
        }

        _createClass(Product, [{
          key: "getData",
          value: function getData() {
            return {
              id: this.id,
              title: this.title,
              description: this.description,
              price: this.price,
              rating: this.rating,
              materials: this.materials,
              size: this.size,
              picture: this.picture,
              pictures: this.pictures,
              category: this.category,
              daysToMake: this.daysToMake
            };
          }
        }, {
          key: "getCopy",
          value: function getCopy() {
            return JSON.parse(JSON.stringify(this.getData()));
          }
        }]);

        return Product;
      })();

      _export("Product", Product);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL21vZGVscy9wcm9kdWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLE9BQU87Ozs7Ozs7OztBQUFQLGFBQU87QUFDUCxpQkFEQSxPQUFPLENBQ04sSUFBSSxFQUFDO2dDQUROLE9BQU87O0FBRWhCLGNBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ2xCLGNBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNsQixjQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsY0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ3BDLGNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN4QixjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQy9CLGNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7QUFDdEMsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3RCLGNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM1QixjQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0FBQ3BDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM5QixjQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FFbkM7O3FCQWZVLE9BQU87O2lCQWlCWCxtQkFBRTtBQUNQLG1CQUFPO0FBQ0wsZ0JBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNYLG1CQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDakIseUJBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztBQUM3QixtQkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2pCLG9CQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDbkIsdUJBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztBQUN6QixrQkFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ2YscUJBQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUNyQixzQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLHNCQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7QUFDdkIsd0JBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTthQUM1QixDQUFDO1dBQ0g7OztpQkFFTSxtQkFBRztBQUNSLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ25EOzs7ZUFuQ1UsT0FBTyIsImZpbGUiOiJmZWF0dXJlcy9tb2RlbHMvcHJvZHVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQcm9kdWN0e1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpe1xyXG4gICAgZGF0YSA9IGRhdGEgfHwge307XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLnByaWNlID0gZGF0YS5wcmljZTtcclxuICAgIHRoaXMucmF0aW5nID0gZGF0YS5yYXRpbmcgfHwgMDtcclxuICAgIHRoaXMubWF0ZXJpYWxzID0gZGF0YS5tYXRlcmlhbHMgfHwgW107XHJcbiAgICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XHJcbiAgICB0aGlzLnBpY3R1cmUgPSBkYXRhLnBpY3R1cmU7XHJcbiAgICB0aGlzLnBpY3R1cmVzID0gZGF0YS5waWN0dXJlcyB8fCBbXTtcclxuICAgIHRoaXMuY2F0ZWdvcnkgPSBkYXRhLmNhdGVnb3J5O1xyXG4gICAgdGhpcy5kYXlzVG9NYWtlID0gZGF0YS5kYXlzVG9NYWtlO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBnZXREYXRhKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICBwcmljZTogdGhpcy5wcmljZSxcclxuICAgICAgcmF0aW5nOiB0aGlzLnJhdGluZyxcclxuICAgICAgbWF0ZXJpYWxzOiB0aGlzLm1hdGVyaWFscyxcclxuICAgICAgc2l6ZTogdGhpcy5zaXplLFxyXG4gICAgICBwaWN0dXJlOiB0aGlzLnBpY3R1cmUsXHJcbiAgICAgIHBpY3R1cmVzOiB0aGlzLnBpY3R1cmVzLFxyXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcclxuICAgICAgZGF5c1RvTWFrZTogdGhpcy5kYXlzVG9NYWtlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29weSgpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0RGF0YSgpKSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
