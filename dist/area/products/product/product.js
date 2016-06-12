System.register(['aurelia-event-aggregator', 'aurelia-framework', 'repository', 'events'], function (_export) {
  'use strict';

  var EventAggregator, inject, ProductsRepository, CartRepository, AddProductToCartEvent, Product;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_repository) {
      ProductsRepository = _repository.ProductsRepository;
      CartRepository = _repository.CartRepository;
    }, function (_events) {
      AddProductToCartEvent = _events.AddProductToCartEvent;
    }],
    execute: function () {
      Product = (function () {
        function Product(eventAggregator, productsRepository, cartRepository) {
          _classCallCheck(this, _Product);

          this.similarProducts = [];

          this.eventAggregator = eventAggregator;
          this.productsRepository = productsRepository;
          this.cartRepository = cartRepository;
        }

        _createClass(Product, [{
          key: 'activate',
          value: function activate(routeParams) {
            this.product = this.productsRepository.get(parseInt(routeParams.productId));
            this.product.materialsList = this.product.materials.map(function (m) {
              return m.name;
            }).join(', ');
            this.setSimilarProducts();
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
        }]);

        var _Product = Product;
        Product = inject(EventAggregator, ProductsRepository, CartRepository)(Product) || Product;
        return Product;
      })();

      _export('Product', Product);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvcHJvZHVjdHMvcHJvZHVjdC9wcm9kdWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzswRkFNYSxPQUFPOzs7Ozs7OztnREFOWixlQUFlOztpQ0FDZixNQUFNOzt1Q0FDTixrQkFBa0I7bUNBQUUsY0FBYzs7c0NBQ2xDLHFCQUFxQjs7O0FBR2hCLGFBQU87QUFHUCxpQkFIQSxPQUFPLENBR04sZUFBZSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRTs7O2VBRmpFLGVBQWUsR0FBRyxFQUFFOztBQUdsQixjQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxjQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDN0MsY0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7U0FDdEM7O3FCQVBVLE9BQU87O2lCQVNWLGtCQUFDLFdBQVcsRUFBRTtBQUNwQixnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUM1RSxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsSUFBSTthQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEYsZ0JBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1dBQzNCOzs7aUJBRVEscUJBQUc7QUFDVixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUMsZ0JBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQzFFOzs7aUJBRWlCLDhCQUFHOzs7QUFDbkIsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDO3FCQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBSyxPQUFPLENBQUMsRUFBRTthQUFBLENBQUMsQ0FBQztXQUM5SDs7O3VCQXRCVSxPQUFPO0FBQVAsZUFBTyxHQURuQixNQUFNLENBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxDQUMvQyxPQUFPLEtBQVAsT0FBTztlQUFQLE9BQU8iLCJmaWxlIjoiYXJlYS9wcm9kdWN0cy9wcm9kdWN0L3Byb2R1Y3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtQcm9kdWN0c1JlcG9zaXRvcnksIENhcnRSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuaW1wb3J0IHtBZGRQcm9kdWN0VG9DYXJ0RXZlbnR9IGZyb20gJ2V2ZW50cyc7XHJcblxyXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvciwgUHJvZHVjdHNSZXBvc2l0b3J5LCBDYXJ0UmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3Qge1xyXG4gIHNpbWlsYXJQcm9kdWN0cyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudEFnZ3JlZ2F0b3IsIHByb2R1Y3RzUmVwb3NpdG9yeSwgY2FydFJlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5wcm9kdWN0c1JlcG9zaXRvcnkgPSBwcm9kdWN0c1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmNhcnRSZXBvc2l0b3J5ID0gY2FydFJlcG9zaXRvcnk7XHJcbiAgfVxyXG4gIFxyXG4gIGFjdGl2YXRlKHJvdXRlUGFyYW1zKSB7XHJcbiAgICB0aGlzLnByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXQocGFyc2VJbnQocm91dGVQYXJhbXMucHJvZHVjdElkKSk7XHJcbiAgICB0aGlzLnByb2R1Y3QubWF0ZXJpYWxzTGlzdCA9IHRoaXMucHJvZHVjdC5tYXRlcmlhbHMubWFwKG0gPT4gbS5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgdGhpcy5zZXRTaW1pbGFyUHJvZHVjdHMoKTtcclxuICB9XHJcblxyXG4gIGFkZFRvQ2FydCgpIHtcclxuICAgIHRoaXMuY2FydFJlcG9zaXRvcnkuYWRkKHRoaXMucHJvZHVjdC5pZCwgMSk7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBBZGRQcm9kdWN0VG9DYXJ0RXZlbnQodGhpcy5wcm9kdWN0LCAxKSk7XHJcbiAgfVxyXG5cclxuICBzZXRTaW1pbGFyUHJvZHVjdHMoKSB7XHJcbiAgICB0aGlzLnNpbWlsYXJQcm9kdWN0cyA9IHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5LmdldEJ5Q2F0ZWdvcnkodGhpcy5wcm9kdWN0LmNhdGVnb3J5LmlkKS5maWx0ZXIocCA9PiBwLmlkICE9PSB0aGlzLnByb2R1Y3QuaWQpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
