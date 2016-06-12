System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, cartKey, CartRepository;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      cartKey = 'cart';

      CartRepository = (function () {
        function CartRepository() {
          _classCallCheck(this, CartRepository);

          this.cart = localStorageManager.get(cartKey) || {};
        }

        _createClass(CartRepository, [{
          key: 'add',
          value: function add(productId, quantity) {
            if (this.cart[productId] !== undefined) {
              this.cart[productId] += quantity;
            } else {
              this.cart[productId] = quantity;
            }
            localStorageManager.save(cartKey, this.cart);
          }
        }, {
          key: 'remove',
          value: function remove(productId, quantity) {
            if (quantity !== undefined) {
              this.cart[productId] -= quantity;
              if (this.cart[productId] <= 0) {
                delete this.cart[productId];
              }
            } else {
              delete this.cart[productId];
            }
            localStorageManager.save(cartKey, this.cart);
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.cart;
          }
        }, {
          key: 'empty',
          value: function empty() {
            localStorageManager.clear(cartKey);
            this.cart = {};
          }
        }]);

        return CartRepository;
      })();

      _export('CartRepository', CartRepository);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvY2FydC1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzsyQkFFTSxPQUFPLEVBRUEsY0FBYzs7Ozs7Ozs7cUNBSm5CLG1CQUFtQjs7O0FBRXJCLGFBQU8sR0FBRyxNQUFNOztBQUVULG9CQUFjO0FBQ2QsaUJBREEsY0FBYyxHQUNYO2dDQURILGNBQWM7O0FBRXZCLGNBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwRDs7cUJBSFUsY0FBYzs7aUJBS3RCLGFBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUN2QixnQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUM7YUFDbEMsTUFBTTtBQUNMLGtCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQzthQUNqQztBQUNELCtCQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzlDOzs7aUJBRUssZ0JBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUMxQixnQkFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0FBQzFCLGtCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztBQUNqQyxrQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3Qix1QkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2VBQzdCO2FBQ0YsTUFBTTtBQUNMLHFCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7QUFDRCwrQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUM5Qzs7O2lCQUVLLGtCQUFHO0FBQ1AsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztXQUNsQjs7O2lCQUVJLGlCQUFHO0FBQ04sK0JBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLGdCQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztXQUNoQjs7O2VBakNVLGNBQWMiLCJmaWxlIjoiZmVhdHVyZXMvcmVwb3NpdG9yeS9jYXJ0LXJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2xvY2FsU3RvcmFnZU1hbmFnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5cclxuY29uc3QgY2FydEtleSA9ICdjYXJ0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJ0UmVwb3NpdG9yeSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhcnQgPSBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChjYXJ0S2V5KSB8fCB7fTtcclxuICB9XHJcblxyXG4gIGFkZChwcm9kdWN0SWQsIHF1YW50aXR5KSB7XHJcbiAgICBpZiAodGhpcy5jYXJ0W3Byb2R1Y3RJZF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNhcnRbcHJvZHVjdElkXSArPSBxdWFudGl0eTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FydFtwcm9kdWN0SWRdID0gcXVhbnRpdHk7XHJcbiAgICB9XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUoY2FydEtleSwgdGhpcy5jYXJ0KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShwcm9kdWN0SWQsIHF1YW50aXR5KSB7XHJcbiAgICBpZiAocXVhbnRpdHkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNhcnRbcHJvZHVjdElkXSAtPSBxdWFudGl0eTtcclxuICAgICAgaWYgKHRoaXMuY2FydFtwcm9kdWN0SWRdIDw9IDApIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jYXJ0W3Byb2R1Y3RJZF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLmNhcnRbcHJvZHVjdElkXTtcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShjYXJ0S2V5LCB0aGlzLmNhcnQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FydDtcclxuICB9XHJcblxyXG4gIGVtcHR5KCkge1xyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5jbGVhcihjYXJ0S2V5KTtcclxuICAgIHRoaXMuY2FydCA9IHt9O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
