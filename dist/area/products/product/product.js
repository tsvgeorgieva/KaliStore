System.register(['aurelia-event-aggregator', 'aurelia-framework', 'aurelia-i18n', 'repository', 'events', 'service'], function (_export) {
  'use strict';

  var EventAggregator, inject, I18N, ProductsRepository, CartRepository, ReviewsRepository, UsersRepository, AddProductToCartEvent, Session, Product;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_repository) {
      ProductsRepository = _repository.ProductsRepository;
      CartRepository = _repository.CartRepository;
      ReviewsRepository = _repository.ReviewsRepository;
      UsersRepository = _repository.UsersRepository;
    }, function (_events) {
      AddProductToCartEvent = _events.AddProductToCartEvent;
    }, function (_service) {
      Session = _service.Session;
    }],
    execute: function () {
      Product = (function () {
        function Product(eventAggregator, productsRepository, cartRepository, reviewsRepository, usersRepository, session, i18n) {
          _classCallCheck(this, _Product);

          this.similarProducts = [];
          this.review = { rating: 0 };
          this.currentUser = {};
          this.reviews = [];
          this.showAddReviewForm = false;

          this.eventAggregator = eventAggregator;
          this.productsRepository = productsRepository;
          this.cartRepository = cartRepository;
          this.reviewsRepository = reviewsRepository;
          this.usersRepository = usersRepository;
          this.session = session;
          this.i18n = i18n;

          this.currentUser = this.session.isUserLoggedIn() ? this.usersRepository.get(this.session.getUserId()) : {};
        }

        _createClass(Product, [{
          key: 'activate',
          value: function activate(routeParams) {
            this.product = this.productsRepository.get(parseInt(routeParams.productId));
            this.product.materialsList = this.product.materials.map(function (m) {
              return m.name;
            }).join(', ');
            this.setSimilarProducts();
            this.reviews = this.reviewsRepository.getAllForProduct(this.product.id);
          }
        }, {
          key: 'addToCart',
          value: function addToCart() {
            this.cartRepository.add(this.product.id, 1);
            this.eventAggregator.publish(new AddProductToCartEvent(this.product, 1));
          }
        }, {
          key: 'setSimilarProducts',
          value: function setSimilarProducts() {
            var _this = this;

            this.similarProducts = this.productsRepository.getByCategory(this.product.category.id).filter(function (p) {
              return p.id !== _this.product.id;
            });
          }
        }, {
          key: 'rate',
          value: function rate(rateValue) {
            this.review.rating = rateValue;
          }
        }, {
          key: 'saveReview',
          value: function saveReview() {
            this.review.userId = this.currentUser.id || -1;
            this.review.userName = this.review.userName || this.currentUser.fullName || this.i18n.tr('reviews.anonymous');
            this.review.productId = this.product.id;

            this.reviewsRepository.save(this.review);

            this.review = { rating: 0 };
            this.reviews = this.reviewsRepository.getAllForProduct(this.product.id);
            this.product.rating = this.reviewsRepository.getRatingForProduct(this.product.id);

            this.showAddReviewForm = false;
          }
        }, {
          key: 'addReviewClick',
          value: function addReviewClick() {
            this.showAddReviewForm = true;
          }
        }]);

        var _Product = Product;
        Product = inject(EventAggregator, ProductsRepository, CartRepository, ReviewsRepository, UsersRepository, Session, I18N)(Product) || Product;
        return Product;
      })();

      _export('Product', Product);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvcHJvZHVjdHMvcHJvZHVjdC9wcm9kdWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2SUFRYSxPQUFPOzs7Ozs7OztnREFSWixlQUFlOztpQ0FDZixNQUFNOzswQkFDTixJQUFJOzt1Q0FDSixrQkFBa0I7bUNBQUUsY0FBYztzQ0FBRSxpQkFBaUI7b0NBQUUsZUFBZTs7c0NBQ3RFLHFCQUFxQjs7eUJBQ3JCLE9BQU87OztBQUdGLGFBQU87QUFPUCxpQkFQQSxPQUFPLENBT04sZUFBZSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTs7O2VBTnBILGVBQWUsR0FBRyxFQUFFO2VBQ3BCLE1BQU0sR0FBRyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUM7ZUFDcEIsV0FBVyxHQUFHLEVBQUU7ZUFDaEIsT0FBTyxHQUFHLEVBQUU7ZUFDWixpQkFBaUIsR0FBRyxLQUFLOztBQUd2QixjQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxjQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDN0MsY0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDckMsY0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixjQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM1Rzs7cUJBakJVLE9BQU87O2lCQW1CVixrQkFBQyxXQUFXLEVBQUU7QUFD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aW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtJMThOfSBmcm9tICdhdXJlbGlhLWkxOG4nO1xuaW1wb3J0IHtQcm9kdWN0c1JlcG9zaXRvcnksIENhcnRSZXBvc2l0b3J5LCBSZXZpZXdzUmVwb3NpdG9yeSwgVXNlcnNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcbmltcG9ydCB7QWRkUHJvZHVjdFRvQ2FydEV2ZW50fSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICdzZXJ2aWNlJztcblxuQGluamVjdChFdmVudEFnZ3JlZ2F0b3IsIFByb2R1Y3RzUmVwb3NpdG9yeSwgQ2FydFJlcG9zaXRvcnksIFJldmlld3NSZXBvc2l0b3J5LCBVc2Vyc1JlcG9zaXRvcnksIFNlc3Npb24sIEkxOE4pXG5leHBvcnQgY2xhc3MgUHJvZHVjdCB7XG4gIHNpbWlsYXJQcm9kdWN0cyA9IFtdO1xuICByZXZpZXcgPSB7cmF0aW5nOiAwfTtcbiAgY3VycmVudFVzZXIgPSB7fTtcbiAgcmV2aWV3cyA9IFtdO1xuICBzaG93QWRkUmV2aWV3Rm9ybSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50QWdncmVnYXRvciwgcHJvZHVjdHNSZXBvc2l0b3J5LCBjYXJ0UmVwb3NpdG9yeSwgcmV2aWV3c1JlcG9zaXRvcnksIHVzZXJzUmVwb3NpdG9yeSwgc2Vzc2lvbiwgaTE4bikge1xuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xuICAgIHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5ID0gcHJvZHVjdHNSZXBvc2l0b3J5O1xuICAgIHRoaXMuY2FydFJlcG9zaXRvcnkgPSBjYXJ0UmVwb3NpdG9yeTtcbiAgICB0aGlzLnJldmlld3NSZXBvc2l0b3J5ID0gcmV2aWV3c1JlcG9zaXRvcnk7XG4gICAgdGhpcy51c2Vyc1JlcG9zaXRvcnkgPSB1c2Vyc1JlcG9zaXRvcnk7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xuXG4gICAgdGhpcy5jdXJyZW50VXNlciA9IHRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpID8gdGhpcy51c2Vyc1JlcG9zaXRvcnkuZ2V0KHRoaXMuc2Vzc2lvbi5nZXRVc2VySWQoKSkgOiB7fTtcbiAgfVxuXG4gIGFjdGl2YXRlKHJvdXRlUGFyYW1zKSB7XG4gICAgdGhpcy5wcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1JlcG9zaXRvcnkuZ2V0KHBhcnNlSW50KHJvdXRlUGFyYW1zLnByb2R1Y3RJZCkpO1xuICAgIHRoaXMucHJvZHVjdC5tYXRlcmlhbHNMaXN0ID0gdGhpcy5wcm9kdWN0Lm1hdGVyaWFscy5tYXAobSA9PiBtLm5hbWUpLmpvaW4oJywgJyk7XG4gICAgdGhpcy5zZXRTaW1pbGFyUHJvZHVjdHMoKTtcbiAgICB0aGlzLnJldmlld3MgPSB0aGlzLnJldmlld3NSZXBvc2l0b3J5LmdldEFsbEZvclByb2R1Y3QodGhpcy5wcm9kdWN0LmlkKTtcbiAgfVxuXG4gIGFkZFRvQ2FydCgpIHtcbiAgICB0aGlzLmNhcnRSZXBvc2l0b3J5LmFkZCh0aGlzLnByb2R1Y3QuaWQsIDEpO1xuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEFkZFByb2R1Y3RUb0NhcnRFdmVudCh0aGlzLnByb2R1Y3QsIDEpKTtcbiAgfVxuXG4gIHNldFNpbWlsYXJQcm9kdWN0cygpIHtcbiAgICB0aGlzLnNpbWlsYXJQcm9kdWN0cyA9IHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5LmdldEJ5Q2F0ZWdvcnkodGhpcy5wcm9kdWN0LmNhdGVnb3J5LmlkKS5maWx0ZXIocCA9PiBwLmlkICE9PSB0aGlzLnByb2R1Y3QuaWQpO1xuICB9XG5cbiAgcmF0ZShyYXRlVmFsdWUpIHtcbiAgICB0aGlzLnJldmlldy5yYXRpbmcgPSByYXRlVmFsdWU7XG4gIH1cblxuICBzYXZlUmV2aWV3KCkge1xuICAgIHRoaXMucmV2aWV3LnVzZXJJZCA9IHRoaXMuY3VycmVudFVzZXIuaWQgfHwgLTE7XG4gICAgdGhpcy5yZXZpZXcudXNlck5hbWUgPSB0aGlzLnJldmlldy51c2VyTmFtZSB8fCB0aGlzLmN1cnJlbnRVc2VyLmZ1bGxOYW1lIHx8IHRoaXMuaTE4bi50cigncmV2aWV3cy5hbm9ueW1vdXMnKTtcbiAgICB0aGlzLnJldmlldy5wcm9kdWN0SWQgPSB0aGlzLnByb2R1Y3QuaWQ7XG4gICAgXG4gICAgdGhpcy5yZXZpZXdzUmVwb3NpdG9yeS5zYXZlKHRoaXMucmV2aWV3KTtcblxuICAgIHRoaXMucmV2aWV3ID0ge3JhdGluZzogMH07XG4gICAgdGhpcy5yZXZpZXdzID0gdGhpcy5yZXZpZXdzUmVwb3NpdG9yeS5nZXRBbGxGb3JQcm9kdWN0KHRoaXMucHJvZHVjdC5pZCk7XG4gICAgdGhpcy5wcm9kdWN0LnJhdGluZyA9IHRoaXMucmV2aWV3c1JlcG9zaXRvcnkuZ2V0UmF0aW5nRm9yUHJvZHVjdCh0aGlzLnByb2R1Y3QuaWQpO1xuXG4gICAgdGhpcy5zaG93QWRkUmV2aWV3Rm9ybSA9IGZhbHNlO1xuXG4gIH1cblxuICBhZGRSZXZpZXdDbGljaygpIHtcbiAgICB0aGlzLnNob3dBZGRSZXZpZXdGb3JtID0gdHJ1ZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
