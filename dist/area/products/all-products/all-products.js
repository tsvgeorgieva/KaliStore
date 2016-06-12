System.register(['aurelia-framework', 'repository'], function (_export) {
  'use strict';

  var inject, ProductsRepository, AllProducts;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_repository) {
      ProductsRepository = _repository.ProductsRepository;
    }],
    execute: function () {
      AllProducts = (function () {
        function AllProducts(productsRepository) {
          _classCallCheck(this, _AllProducts);

          this.products = [];

          this.productsRepository = productsRepository;
        }

        _createClass(AllProducts, [{
          key: 'activate',
          value: function activate(routeParams) {
            this.searchQuery = routeParams.searchQuery;
            this.categoryId = routeParams.categoryId;

            if (this.searchQuery) {
              this.products = this.productsRepository.getByQuery(this.searchQuery);
            } else if (this.categoryId !== undefined && this.categoryId !== '') {
              this.categoryId = parseInt(this.categoryId);
              this.products = this.productsRepository.getByCategory(this.categoryId);
            } else {
              this.products = this.productsRepository.getAll();
            }
          }
        }]);

        var _AllProducts = AllProducts;
        AllProducts = inject(ProductsRepository)(AllProducts) || AllProducts;
        return AllProducts;
      })();

      _export('AllProducts', AllProducts);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvcHJvZHVjdHMvYWxsLXByb2R1Y3RzL2FsbC1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0NBSWEsV0FBVzs7Ozs7Ozs7aUNBSmhCLE1BQU07O3VDQUNOLGtCQUFrQjs7O0FBR2IsaUJBQVc7QUFHWCxpQkFIQSxXQUFXLENBR1Ysa0JBQWtCLEVBQUU7OztlQUZoQyxRQUFRLEdBQUcsRUFBRTs7QUFHWCxjQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7U0FDOUM7O3FCQUxVLFdBQVc7O2lCQU9kLGtCQUFDLFdBQVcsRUFBRTtBQUNwQixnQkFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0FBQzNDLGdCQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7O0FBRXpDLGdCQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDcEIsa0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEUsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO0FBQ2xFLGtCQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUMsa0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEUsTUFBTTtBQUNMLGtCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNsRDtXQUNGOzs7MkJBbkJVLFdBQVc7QUFBWCxtQkFBVyxHQUR2QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FDZCxXQUFXLEtBQVgsV0FBVztlQUFYLFdBQVciLCJmaWxlIjoiYXJlYS9wcm9kdWN0cy9hbGwtcHJvZHVjdHMvYWxsLXByb2R1Y3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtQcm9kdWN0c1JlcG9zaXRvcnl9IGZyb20gJ3JlcG9zaXRvcnknO1xyXG5cclxuQGluamVjdChQcm9kdWN0c1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBBbGxQcm9kdWN0cyB7XHJcbiAgcHJvZHVjdHMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvZHVjdHNSZXBvc2l0b3J5KSB7XHJcbiAgICB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeSA9IHByb2R1Y3RzUmVwb3NpdG9yeTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKHJvdXRlUGFyYW1zKSB7XHJcbiAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcm91dGVQYXJhbXMuc2VhcmNoUXVlcnk7XHJcbiAgICB0aGlzLmNhdGVnb3J5SWQgPSByb3V0ZVBhcmFtcy5jYXRlZ29yeUlkO1xyXG5cclxuICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5KSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXRCeVF1ZXJ5KHRoaXMuc2VhcmNoUXVlcnkpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmNhdGVnb3J5SWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNhdGVnb3J5SWQgIT09ICcnKSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlJZCA9IHBhcnNlSW50KHRoaXMuY2F0ZWdvcnlJZCk7XHJcbiAgICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXRCeUNhdGVnb3J5KHRoaXMuY2F0ZWdvcnlJZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5wcm9kdWN0c1JlcG9zaXRvcnkuZ2V0QWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
