System.register(['aurelia-framework', 'aurelia-event-aggregator', 'repository', 'events'], function (_export) {
  'use strict';

  var inject, EventAggregator, ProductsRepository, CartRepository, AddProductToCartEvent, RemoveProductFromCartEvent, Cart;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_repository) {
      ProductsRepository = _repository.ProductsRepository;
      CartRepository = _repository.CartRepository;
    }, function (_events) {
      AddProductToCartEvent = _events.AddProductToCartEvent;
      RemoveProductFromCartEvent = _events.RemoveProductFromCartEvent;
    }],
    execute: function () {
      Cart = (function () {
        function Cart(eventAggregator, cartRepository, productsRepository) {
          _classCallCheck(this, _Cart);

          this.totalPrice = {};

          this.eventAggregator = eventAggregator;
          this.cartRepository = cartRepository;
          this.productsRepository = productsRepository;
          this.cart = this.cartRepository.getAll();
          this.loadProducts();
          this.calculateTotalPrice();
        }

        _createClass(Cart, [{
          key: 'loadProducts',
          value: function loadProducts() {
            var _this = this;

            this.cartProducts = Object.keys(this.cart).map(function (k) {
              return { product: _this.productsRepository.get(parseInt(k)), quantity: _this.cart[k] };
            });
          }
        }, {
          key: 'removeProduct',
          value: function removeProduct(cartProduct) {
            this.cartRepository.remove(cartProduct.product.id);
            this.loadProducts();
            this.calculateTotalPrice();
            this.eventAggregator.publish(new RemoveProductFromCartEvent(cartProduct.product, cartProduct.quantity));
          }
        }, {
          key: 'changeProductQuantity',
          value: function changeProductQuantity(cartProduct) {
            var oldQuantity = this.cart[cartProduct.product.id];
            var newQuantity = parseInt(cartProduct.quantity);
            if (oldQuantity > newQuantity) {
              this.cartRepository.remove(cartProduct.product.id, oldQuantity - newQuantity);
              this.eventAggregator.publish(new RemoveProductFromCartEvent(cartProduct.product, oldQuantity - newQuantity));
            } else if (oldQuantity < newQuantity) {
              this.cartRepository.add(cartProduct.product.id, newQuantity - oldQuantity);
              this.eventAggregator.publish(new AddProductToCartEvent(cartProduct.product, newQuantity - oldQuantity));
            }
            this.loadProducts();
            this.calculateTotalPrice();
          }
        }, {
          key: 'calculateTotalPrice',
          value: function calculateTotalPrice() {
            this.totalPrice = {
              amount: this.cartProducts.reduce(function (total, cartProduct) {
                return total + cartProduct.quantity * cartProduct.product.price.amount;
              }, 0),
              currency: 'BGN'
            };
          }
        }]);

        var _Cart = Cart;
        Cart = inject(EventAggregator, CartRepository, ProductsRepository)(Cart) || Cart;
        return Cart;
      })();

      _export('Cart', Cart);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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SSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUUsV0FBVzt1QkFBSyxLQUFLLEdBQUksV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEFBQUM7ZUFBQSxFQUFFLENBQUMsQ0FBQztBQUM5SCxzQkFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQztXQUNIOzs7b0JBNUNVLElBQUk7QUFBSixZQUFJLEdBRGhCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQy9DLElBQUksS0FBSixJQUFJO2VBQUosSUFBSSIsImZpbGUiOiJhcmVhL2NhcnQvY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1Byb2R1Y3RzUmVwb3NpdG9yeSwgQ2FydFJlcG9zaXRvcnl9IGZyb20gJ3JlcG9zaXRvcnknO1xyXG5pbXBvcnQge0FkZFByb2R1Y3RUb0NhcnRFdmVudCwgUmVtb3ZlUHJvZHVjdEZyb21DYXJ0RXZlbnR9IGZyb20gJ2V2ZW50cyc7XHJcblxyXG5AaW5qZWN0KEV2ZW50QWdncmVnYXRvciwgQ2FydFJlcG9zaXRvcnksIFByb2R1Y3RzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIENhcnQge1xyXG4gIHRvdGFsUHJpY2UgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yLCBjYXJ0UmVwb3NpdG9yeSwgcHJvZHVjdHNSZXBvc2l0b3J5KSB7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvciA9IGV2ZW50QWdncmVnYXRvcjtcclxuICAgIHRoaXMuY2FydFJlcG9zaXRvcnkgPSBjYXJ0UmVwb3NpdG9yeTtcclxuICAgIHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5ID0gcHJvZHVjdHNSZXBvc2l0b3J5O1xyXG4gICAgdGhpcy5jYXJ0ID0gdGhpcy5jYXJ0UmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICAgIHRoaXMubG9hZFByb2R1Y3RzKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcclxuICB9XHJcbiAgXHJcbiAgbG9hZFByb2R1Y3RzKCkge1xyXG4gICAgdGhpcy5jYXJ0UHJvZHVjdHMgPSBPYmplY3Qua2V5cyh0aGlzLmNhcnQpLm1hcChrID0+IHtcclxuICAgICAgcmV0dXJuIHtwcm9kdWN0OiB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXQocGFyc2VJbnQoaykpLCBxdWFudGl0eTogdGhpcy5jYXJ0W2tdfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVQcm9kdWN0KGNhcnRQcm9kdWN0KSB7XHJcbiAgICB0aGlzLmNhcnRSZXBvc2l0b3J5LnJlbW92ZShjYXJ0UHJvZHVjdC5wcm9kdWN0LmlkKTtcclxuICAgIHRoaXMubG9hZFByb2R1Y3RzKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IFJlbW92ZVByb2R1Y3RGcm9tQ2FydEV2ZW50KGNhcnRQcm9kdWN0LnByb2R1Y3QsIGNhcnRQcm9kdWN0LnF1YW50aXR5KSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VQcm9kdWN0UXVhbnRpdHkoY2FydFByb2R1Y3QpIHtcclxuICAgIGNvbnN0IG9sZFF1YW50aXR5ID0gdGhpcy5jYXJ0W2NhcnRQcm9kdWN0LnByb2R1Y3QuaWRdO1xyXG4gICAgY29uc3QgbmV3UXVhbnRpdHkgPSBwYXJzZUludChjYXJ0UHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICBpZiAob2xkUXVhbnRpdHkgPiBuZXdRdWFudGl0eSkge1xyXG4gICAgICB0aGlzLmNhcnRSZXBvc2l0b3J5LnJlbW92ZShjYXJ0UHJvZHVjdC5wcm9kdWN0LmlkLCBvbGRRdWFudGl0eSAtIG5ld1F1YW50aXR5KTtcclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgUmVtb3ZlUHJvZHVjdEZyb21DYXJ0RXZlbnQoY2FydFByb2R1Y3QucHJvZHVjdCwgb2xkUXVhbnRpdHkgLSBuZXdRdWFudGl0eSkpO1xyXG4gICAgfSBlbHNlIGlmIChvbGRRdWFudGl0eSA8IG5ld1F1YW50aXR5KSB7XHJcbiAgICAgIHRoaXMuY2FydFJlcG9zaXRvcnkuYWRkKGNhcnRQcm9kdWN0LnByb2R1Y3QuaWQsIG5ld1F1YW50aXR5IC0gb2xkUXVhbnRpdHkpO1xyXG4gICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBBZGRQcm9kdWN0VG9DYXJ0RXZlbnQoY2FydFByb2R1Y3QucHJvZHVjdCwgbmV3UXVhbnRpdHkgLSBvbGRRdWFudGl0eSkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkUHJvZHVjdHMoKTtcclxuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlVG90YWxQcmljZSgpIHtcclxuICAgIHRoaXMudG90YWxQcmljZSA9IHtcclxuICAgICAgYW1vdW50OiB0aGlzLmNhcnRQcm9kdWN0cy5yZWR1Y2UoKHRvdGFsLCBjYXJ0UHJvZHVjdCkgPT4gdG90YWwgKyAoY2FydFByb2R1Y3QucXVhbnRpdHkgKiBjYXJ0UHJvZHVjdC5wcm9kdWN0LnByaWNlLmFtb3VudCksIDApLFxyXG4gICAgICBjdXJyZW5jeTogJ0JHTidcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
