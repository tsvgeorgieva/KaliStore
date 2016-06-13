System.register(['service', 'moment'], function (_export) {
  'use strict';

  var localStorageManager, moment, reviewsKey, ReviewsRepository, initialReviews;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }, function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      reviewsKey = 'reviews';

      ReviewsRepository = (function () {
        function ReviewsRepository() {
          _classCallCheck(this, ReviewsRepository);

          this.lastId = 0;

          this.reviews = localStorageManager.get(reviewsKey);
          if (this.reviews === undefined) {
            this.initialize();
          }
        }

        _createClass(ReviewsRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.reviews = initialReviews;
            this.lastId = this.reviews.length;
            localStorageManager.save(reviewsKey, this.reviews);
          }
        }, {
          key: 'save',
          value: function save(review) {
            review.id = ++this.lastId;
            review.dateTimeAdded = moment();
            this.reviews.push(review);
            localStorageManager.save(reviewsKey, this.reviews);
            return review.id;
          }
        }, {
          key: 'getRatingForProduct',
          value: function getRatingForProduct(productId) {
            var reviews = this.getAllForProduct(productId);
            return reviews.length === 0 ? 0 : reviews.reduce(function (sum, r) {
              return sum + r.rating;
            }, 0) / reviews.length;
          }
        }, {
          key: 'getAllForProduct',
          value: function getAllForProduct(productId) {
            return this.reviews.filter(function (r) {
              return r.productId === productId;
            }).sort(function (r1, r2) {
              return r1.dateTimeAdded < r2.dateTimeAdded;
            });
          }
        }]);

        return ReviewsRepository;
      })();

      _export('ReviewsRepository', ReviewsRepository);

      initialReviews = [{
        id: 1,
        productId: 1,
        text: "Много красива",
        userId: 1,
        rating: 5,
        userName: "Пешо",
        dateTimeAdded: moment([2016, 4, 2, 11, 23, 44])
      }, {
        id: 2,
        productId: 1,
        text: "Искам и аз! Страхотна е!",
        userId: -1,
        rating: 5,
        userName: "Галя",
        dateTimeAdded: moment([2016, 5, 12, 12, 34, 56])
      }, {
        id: 3,
        productId: 1,
        text: "Ужас...",
        userId: -1,
        rating: 1,
        dateTimeAdded: moment([2016, 5, 10, 8, 4, 56])
      }, {
        id: 4,
        productId: 2,
        text: "Много са скъпи! Иначе ми харесват...",
        userId: -1,
        rating: 2,
        userName: "Бедни сме",
        dateTimeAdded: moment([2016, 4, 1, 9, 9, 9])
      }, {
        id: 5,
        productId: 2,
        text: "Страхотно качество! Препоръчвам, заслужават си всяка стотинка.",
        userId: -1,
        rating: 5,
        userName: "Венета",
        dateTimeAdded: moment([2016, 4, 23, 18, 9, 0])
      }, {
        id: 6,
        productId: 2,
        text: "Бърза и качествена изработка. Препоръчвам!",
        userId: -1,
        rating: 5,
        userName: "Ангел",
        dateTimeAdded: moment([2016, 4, 17, 9, 9, 8])
      }, {
        id: 7,
        productId: 3,
        text: "Уааауууу уникат!",
        userId: 1,
        rating: 5,
        userName: "Петя",
        dateTimeAdded: moment([2016, 4, 12, 1, 2, 3])
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvcmV2aWV3cy1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzttQ0FHTSxVQUFVLEVBRUgsaUJBQWlCLEVBa0N4QixjQUFjOzs7Ozs7OztxQ0F2Q1osbUJBQW1COzs7OztBQUdyQixnQkFBVSxHQUFHLFNBQVM7O0FBRWYsdUJBQWlCO0FBR2pCLGlCQUhBLGlCQUFpQixHQUdkO2dDQUhILGlCQUFpQjs7ZUFDNUIsTUFBTSxHQUFHLENBQUM7O0FBR1IsY0FBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkQsY0FBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUM5QixnQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQ25CO1NBQ0Y7O3FCQVJVLGlCQUFpQjs7aUJBVWxCLHNCQUFHO0FBQ1gsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0FBQzlCLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2xDLCtCQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1dBQ3BEOzs7aUJBRUcsY0FBQyxNQUFNLEVBQUU7QUFDWCxrQkFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDMUIsa0JBQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDaEMsZ0JBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLCtCQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELG1CQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUM7V0FDbEI7OztpQkFFa0IsNkJBQUMsU0FBUyxFQUFFO0FBQzdCLGdCQUFNLE9BQU8sR0FB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Q0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO09BQzlDLEVBQUU7QUFDRCxVQUFFLEVBQUUsQ0FBQztBQUNMLGlCQUFTLEVBQUUsQ0FBQztBQUNaLFlBQUksRUFBRSxrQkFBa0I7QUFDeEIsY0FBTSxFQUFFLENBQUM7QUFDVCxjQUFNLEVBQUUsQ0FBQztBQUNULGdCQUFRLEVBQUUsTUFBTTtBQUNoQixxQkFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7T0FDOUMsQ0FDQSIsImZpbGUiOiJmZWF0dXJlcy9yZXBvc2l0b3J5L3Jldmlld3MtcmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bG9jYWxTdG9yYWdlTWFuYWdlcn0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IHJldmlld3NLZXkgPSAncmV2aWV3cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmV2aWV3c1JlcG9zaXRvcnkge1xyXG4gIGxhc3RJZCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXZpZXdzID0gbG9jYWxTdG9yYWdlTWFuYWdlci5nZXQocmV2aWV3c0tleSk7XHJcbiAgICBpZiAodGhpcy5yZXZpZXdzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5yZXZpZXdzID0gaW5pdGlhbFJldmlld3M7XHJcbiAgICB0aGlzLmxhc3RJZCA9IHRoaXMucmV2aWV3cy5sZW5ndGg7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUocmV2aWV3c0tleSwgdGhpcy5yZXZpZXdzKTtcclxuICB9XHJcblxyXG4gIHNhdmUocmV2aWV3KSB7XHJcbiAgICByZXZpZXcuaWQgPSArK3RoaXMubGFzdElkO1xyXG4gICAgcmV2aWV3LmRhdGVUaW1lQWRkZWQgPSBtb21lbnQoKTtcclxuICAgIHRoaXMucmV2aWV3cy5wdXNoKHJldmlldyk7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUocmV2aWV3c0tleSwgdGhpcy5yZXZpZXdzKTtcclxuICAgIHJldHVybiByZXZpZXcuaWQ7XHJcbiAgfVxyXG5cclxuICBnZXRSYXRpbmdGb3JQcm9kdWN0KHByb2R1Y3RJZCkge1xyXG4gICAgY29uc3QgcmV2aWV3cyA9IHRoaXMuZ2V0QWxsRm9yUHJvZHVjdChwcm9kdWN0SWQpO1xyXG4gICAgcmV0dXJuIHJldmlld3MubGVuZ3RoID09PSAwID8gMCA6IHJldmlld3MucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIucmF0aW5nLCAwKSAvIHJldmlld3MubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsRm9yUHJvZHVjdChwcm9kdWN0SWQpIHtcclxuICAgIHJldHVybiB0aGlzLnJldmlld3MuZmlsdGVyKHIgPT4gci5wcm9kdWN0SWQgPT09IHByb2R1Y3RJZCkuc29ydCgocjEsIHIyKSA9PiByMS5kYXRlVGltZUFkZGVkIDwgcjIuZGF0ZVRpbWVBZGRlZCk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsUmV2aWV3cyA9IFt7XHJcbiAgaWQ6IDEsXHJcbiAgcHJvZHVjdElkOiAxLFxyXG4gIHRleHQ6IFwi0JzQvdC+0LPQviDQutGA0LDRgdC40LLQsFwiLFxyXG4gIHVzZXJJZDogMSxcclxuICByYXRpbmc6IDUsXHJcbiAgdXNlck5hbWU6IFwi0J/QtdGI0L5cIixcclxuICBkYXRlVGltZUFkZGVkOiBtb21lbnQoWzIwMTYsIDQsIDIsIDExLCAyMywgNDRdKVxyXG59LCB7XHJcbiAgaWQ6IDIsXHJcbiAgcHJvZHVjdElkOiAxLFxyXG4gIHRleHQ6IFwi0JjRgdC60LDQvCDQuCDQsNC3ISDQodGC0YDQsNGF0L7RgtC90LAg0LUhXCIsXHJcbiAgdXNlcklkOiAtMSxcclxuICByYXRpbmc6IDUsXHJcbiAgdXNlck5hbWU6IFwi0JPQsNC70Y9cIixcclxuICBkYXRlVGltZUFkZGVkOiBtb21lbnQoWzIwMTYsIDUsIDEyLCAxMiwgMzQsIDU2XSlcclxufSwge1xyXG4gIGlkOiAzLFxyXG4gIHByb2R1Y3RJZDogMSxcclxuICB0ZXh0OiBcItCj0LbQsNGBLi4uXCIsXHJcbiAgdXNlcklkOiAtMSxcclxuICByYXRpbmc6IDEsXHJcbiAgZGF0ZVRpbWVBZGRlZDogbW9tZW50KFsyMDE2LCA1LCAxMCwgOCwgNCwgNTZdKVxyXG59LCB7XHJcbiAgaWQ6IDQsXHJcbiAgcHJvZHVjdElkOiAyLFxyXG4gIHRleHQ6IFwi0JzQvdC+0LPQviDRgdCwINGB0LrRitC/0LghINCY0L3QsNGH0LUg0LzQuCDRhdCw0YDQtdGB0LLQsNGCLi4uXCIsXHJcbiAgdXNlcklkOiAtMSxcclxuICByYXRpbmc6IDIsXHJcbiAgdXNlck5hbWU6IFwi0JHQtdC00L3QuCDRgdC80LVcIixcclxuICBkYXRlVGltZUFkZGVkOiBtb21lbnQoWzIwMTYsIDQsIDEsIDksIDksIDldKVxyXG59LCB7XHJcbiAgaWQ6IDUsXHJcbiAgcHJvZHVjdElkOiAyLFxyXG4gIHRleHQ6IFwi0KHRgtGA0LDRhdC+0YLQvdC+INC60LDRh9C10YHRgtCy0L4hINCf0YDQtdC/0L7RgNGK0YfQstCw0LwsINC30LDRgdC70YPQttCw0LLQsNGCINGB0Lgg0LLRgdGP0LrQsCDRgdGC0L7RgtC40L3QutCwLlwiLFxyXG4gIHVzZXJJZDogLTEsXHJcbiAgcmF0aW5nOiA1LFxyXG4gIHVzZXJOYW1lOiBcItCS0LXQvdC10YLQsFwiLFxyXG4gIGRhdGVUaW1lQWRkZWQ6IG1vbWVudChbMjAxNiwgNCwgMjMsIDE4LCA5LCAwXSlcclxufSwge1xyXG4gIGlkOiA2LFxyXG4gIHByb2R1Y3RJZDogMixcclxuICB0ZXh0OiBcItCR0YrRgNC30LAg0Lgg0LrQsNGH0LXRgdGC0LLQtdC90LAg0LjQt9GA0LDQsdC+0YLQutCwLiDQn9GA0LXQv9C+0YDRitGH0LLQsNC8IVwiLFxyXG4gIHVzZXJJZDogLTEsXHJcbiAgcmF0aW5nOiA1LFxyXG4gIHVzZXJOYW1lOiBcItCQ0L3Qs9C10LtcIixcclxuICBkYXRlVGltZUFkZGVkOiBtb21lbnQoWzIwMTYsIDQsIDE3LCA5LCA5LCA4XSlcclxufSwge1xyXG4gIGlkOiA3LFxyXG4gIHByb2R1Y3RJZDogMyxcclxuICB0ZXh0OiBcItCj0LDQsNCw0YPRg9GD0YMg0YPQvdC40LrQsNGCIVwiLFxyXG4gIHVzZXJJZDogMSxcclxuICByYXRpbmc6IDUsXHJcbiAgdXNlck5hbWU6IFwi0J/QtdGC0Y9cIixcclxuICBkYXRlVGltZUFkZGVkOiBtb21lbnQoWzIwMTYsIDQsIDEyLCAxLCAyLCAzXSlcclxufVxyXG5dO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
