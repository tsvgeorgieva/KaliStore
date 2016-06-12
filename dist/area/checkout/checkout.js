System.register(['aurelia-framework', 'aurelia-i18n', 'aurelia-router', 'service', 'aurelia-event-aggregator', 'repository', 'events'], function (_export) {
  'use strict';

  var inject, I18N, Router, Logger, Session, localStorageManager, EventAggregator, CitiesRepository, OfficesRepository, CartRepository, ProductsRepository, OrdersRepository, UsersRepository, OrderComplete, Checkout;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_service) {
      Logger = _service.Logger;
      Session = _service.Session;
      localStorageManager = _service.localStorageManager;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_repository) {
      CitiesRepository = _repository.CitiesRepository;
      OfficesRepository = _repository.OfficesRepository;
      CartRepository = _repository.CartRepository;
      ProductsRepository = _repository.ProductsRepository;
      OrdersRepository = _repository.OrdersRepository;
      UsersRepository = _repository.UsersRepository;
    }, function (_events) {
      OrderComplete = _events.OrderComplete;
    }],
    execute: function () {
      Checkout = (function () {
        function Checkout(i18n, router, logger, session, eventAggregator, citiesRepository, officesRepository, cartRepository, productsRepository, ordersRepository, usersRepository) {
          _classCallCheck(this, _Checkout);

          this.currentCheckoutStep = 1;
          this.differentShipmentAddress = false;
          this.cities = [];
          this.offices = [];
          this.userInfo = {};
          this.differentShipmentInfo = {};
          this.officeInfo = {};
          this.deliveryInfo = {};
          this.paymentInfo = {};

          this.citiesRepository = citiesRepository;
          this.officesRepository = officesRepository;
          this.cartRepository = cartRepository;
          this.productsRepository = productsRepository;
          this.ordersRepository = ordersRepository;
          this.usersRepository = usersRepository;
          this.i18n = i18n;
          this.router = router;
          this.logger = logger;
          this.session = session;
          this.eventAggregator = eventAggregator;

          if (this.session.isUserLoggedIn()) {
            var currentUser = this.usersRepository.get(this.session.getUserId());
            this.userInfo = {
              fullName: currentUser.fullName,
              email: currentUser.email,
              phoneNumber: currentUser.phone,
              city: currentUser.city,
              address: currentUser.address
            };
          }

          this.cities = this.citiesRepository.getAll();
          this.offices = this.officesRepository.getAll();
          this.cart = this.cartRepository.getAll();
          this.loadProducts();
          this.calculatePrices();

          this.deliveryPrice = {
            amount: 3.70,
            currency: 'BGN'
          };
        }

        _createClass(Checkout, [{
          key: 'loadProducts',
          value: function loadProducts() {
            var _this = this;

            this.cartProducts = Object.keys(this.cart).map(function (k) {
              return { product: _this.productsRepository.get(parseInt(k)), quantity: _this.cart[k] };
            });
          }
        }, {
          key: 'calculatePrices',
          value: function calculatePrices() {
            this.totalProductsPrice = {
              amount: this.cartProducts.reduce(function (total, cartProduct) {
                return total + cartProduct.quantity * cartProduct.product.price.amount;
              }, 0),
              currency: 'BGN'
            };
            this.deliveryPrice = {
              amount: 3.70,
              currency: 'BGN'
            };
            this.totalPrice = {
              amount: this.totalProductsPrice.amount + this.deliveryPrice.amount,
              currency: 'BGN'
            };
          }
        }, {
          key: 'proceed',
          value: function proceed() {
            this.currentCheckoutStep = 2;

            if (this.toAddress) {
              this.deliveryInfo.type = this.i18n.tr('checkout.deliveryInfo.toAddress');
              this.deliveryInfo.client = {};
              if (this.differentShipmentAddress) {
                this.deliveryInfo.city = this.differentShipmentInfo.city;
                this.deliveryInfo.address = this.differentShipmentInfo.address;
                this.deliveryInfo.client.name = this.differentShipmentInfo.clientName;
                this.deliveryInfo.client.phoneNumber = this.differentShipmentInfo.phoneNumber;
              } else {
                this.deliveryInfo.city = this.userInfo.city;
                this.deliveryInfo.address = this.userInfo.address;
                this.deliveryInfo.client.name = this.userInfo.fullName;
                this.deliveryInfo.client.phoneNumber = this.userInfo.phoneNumber;
              }
            } else if (this.toAddress === false) {
              this.deliveryInfo.type = this.i18n.tr('checkout.deliveryInfo.toOffice');
              this.deliveryInfo.city = this.officeInfo.city;
              this.deliveryInfo.address = this.officeInfo.office.name;
              this.deliveryInfo.client.name = this.userInfo.fullName;
              this.deliveryInfo.client.phoneNumber = this.userInfo.phoneNumber;
            }

            if (this.paymentAtDelivery) {
              this.paymentInfo.method = this.i18n.tr('checkout.paymentInfo.atDelivery.title');
              this.paymentInfo.description = this.i18n.tr('checkout.paymentInfo.atDelivery.description');
            } else if (this.paymentAtDelivery === false) {
              this.paymentInfo.method = this.i18n.tr('checkout.paymentInfo.withCard.title');
              this.paymentInfo.description = this.i18n.tr('checkout.paymentInfo.withCard.description');
            }
          }
        }, {
          key: 'back',
          value: function back() {
            this.currentCheckoutStep = 1;
          }
        }, {
          key: 'order',
          value: function order() {
            if (this.session.isUserLoggedIn()) {
              this.userInfo.id = this.session.getUserId();
              this.userInfo.userName = this.session.getUserName();
            } else {
              this.userInfo.id = "-1";
              this.userInfo.userName = "anonymous";
            }

            var order = {
              user: this.userInfo,
              delivery: this.deliveryInfo,
              products: this.cartProducts,
              totalPrice: this.totalPrice,
              status: 1
            };
            if (this.paymentAtDelivery) {
              this.ordersRepository.save(order);

              this.logger.success(this.i18n.tr('order.successful'));
              this.router.navigate('');
              this.cartRepository.empty();
              this.eventAggregator.publish(new OrderComplete({}));
            } else if (this.paymentAtDelivery === false) {
              localStorageManager.save("currentOrder", order);

              this.router.navigate('#/payment');
            }
          }
        }]);

        var _Checkout = Checkout;
        Checkout = inject(I18N, Router, Logger, Session, EventAggregator, CitiesRepository, OfficesRepository, CartRepository, ProductsRepository, OrdersRepository, UsersRepository)(Checkout) || Checkout;
        return Checkout;
      })();

      _export('Checkout', Checkout);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvY2hlY2tvdXQvY2hlY2tvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhNQWdCYSxRQUFROzs7Ozs7OztpQ0FoQmIsTUFBTTs7MEJBQ04sSUFBSTs7OEJBQ0osTUFBTTs7d0JBQ04sTUFBTTt5QkFBRSxPQUFPO3FDQUFFLG1CQUFtQjs7Z0RBQ3BDLGVBQWU7O3FDQUVyQixnQkFBZ0I7c0NBQ2hCLGlCQUFpQjttQ0FDakIsY0FBYzt1Q0FDZCxrQkFBa0I7cUNBQ2xCLGdCQUFnQjtvQ0FDaEIsZUFBZTs7OEJBRVQsYUFBYTs7O0FBR1IsY0FBUTtBQWFSLGlCQWJBLFFBQVEsQ0FhUCxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUU7OztlQVp4SyxtQkFBbUIsR0FBRyxDQUFDO2VBQ3ZCLHdCQUF3QixHQUFHLEtBQUs7ZUFHaEMsTUFBTSxHQUFHLEVBQUU7ZUFDWCxPQUFPLEdBQUcsRUFBRTtlQUNaLFFBQVEsR0FBRyxFQUFFO2VBQ2IscUJBQXFCLEdBQUcsRUFBRTtlQUMxQixVQUFVLEdBQUcsRUFBRTtlQUNmLFlBQVksR0FBRyxFQUFFO2VBQ2pCLFdBQVcsR0FBRyxFQUFFOztBQUdkLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN6QyxjQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFDM0MsY0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDckMsY0FBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzdDLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN6QyxjQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLENB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USIsImZpbGUiOiJhcmVhL2NoZWNrb3V0L2NoZWNrb3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtJMThOfSBmcm9tICdhdXJlbGlhLWkxOG4nO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge0xvZ2dlciwgU2Vzc2lvbiwgbG9jYWxTdG9yYWdlTWFuYWdlcn0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1xyXG4gIENpdGllc1JlcG9zaXRvcnksXHJcbiAgT2ZmaWNlc1JlcG9zaXRvcnksXHJcbiAgQ2FydFJlcG9zaXRvcnksXHJcbiAgUHJvZHVjdHNSZXBvc2l0b3J5LFxyXG4gIE9yZGVyc1JlcG9zaXRvcnksXHJcbiAgVXNlcnNSZXBvc2l0b3J5XHJcbn0gZnJvbSAncmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7T3JkZXJDb21wbGV0ZX0gZnJvbSAnZXZlbnRzJztcclxuXHJcbkBpbmplY3QoSTE4TiwgUm91dGVyLCBMb2dnZXIsIFNlc3Npb24sIEV2ZW50QWdncmVnYXRvciwgQ2l0aWVzUmVwb3NpdG9yeSwgT2ZmaWNlc1JlcG9zaXRvcnksIENhcnRSZXBvc2l0b3J5LCBQcm9kdWN0c1JlcG9zaXRvcnksIE9yZGVyc1JlcG9zaXRvcnksIFVzZXJzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIENoZWNrb3V0IHtcclxuICBjdXJyZW50Q2hlY2tvdXRTdGVwID0gMTtcclxuICBkaWZmZXJlbnRTaGlwbWVudEFkZHJlc3MgPSBmYWxzZTtcclxuICB0b0FkZHJlc3M7XHJcbiAgcGF5bWVudEF0RGVsaXZlcnk7XHJcbiAgY2l0aWVzID0gW107XHJcbiAgb2ZmaWNlcyA9IFtdO1xyXG4gIHVzZXJJbmZvID0ge307XHJcbiAgZGlmZmVyZW50U2hpcG1lbnRJbmZvID0ge307XHJcbiAgb2ZmaWNlSW5mbyA9IHt9O1xyXG4gIGRlbGl2ZXJ5SW5mbyA9IHt9O1xyXG4gIHBheW1lbnRJbmZvID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKGkxOG4sIHJvdXRlciwgbG9nZ2VyLCBzZXNzaW9uLCBldmVudEFnZ3JlZ2F0b3IsIGNpdGllc1JlcG9zaXRvcnksIG9mZmljZXNSZXBvc2l0b3J5LCBjYXJ0UmVwb3NpdG9yeSwgcHJvZHVjdHNSZXBvc2l0b3J5LCBvcmRlcnNSZXBvc2l0b3J5LCB1c2Vyc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuY2l0aWVzUmVwb3NpdG9yeSA9IGNpdGllc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLm9mZmljZXNSZXBvc2l0b3J5ID0gb2ZmaWNlc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmNhcnRSZXBvc2l0b3J5ID0gY2FydFJlcG9zaXRvcnk7XHJcbiAgICB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeSA9IHByb2R1Y3RzUmVwb3NpdG9yeTtcclxuICAgIHRoaXMub3JkZXJzUmVwb3NpdG9yeSA9IG9yZGVyc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLnVzZXJzUmVwb3NpdG9yeSA9IHVzZXJzUmVwb3NpdG9yeTtcclxuICAgIHRoaXMuaTE4biA9IGkxOG47XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIGlmICh0aGlzLnNlc3Npb24uaXNVc2VyTG9nZ2VkSW4oKSkge1xyXG4gICAgICBjb25zdCBjdXJyZW50VXNlciA9IHRoaXMudXNlcnNSZXBvc2l0b3J5LmdldCh0aGlzLnNlc3Npb24uZ2V0VXNlcklkKCkpO1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0ge1xyXG4gICAgICAgIGZ1bGxOYW1lOiBjdXJyZW50VXNlci5mdWxsTmFtZSxcclxuICAgICAgICBlbWFpbDogY3VycmVudFVzZXIuZW1haWwsXHJcbiAgICAgICAgcGhvbmVOdW1iZXI6IGN1cnJlbnRVc2VyLnBob25lLFxyXG4gICAgICAgIGNpdHk6IGN1cnJlbnRVc2VyLmNpdHksXHJcbiAgICAgICAgYWRkcmVzczogY3VycmVudFVzZXIuYWRkcmVzc1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2l0aWVzID0gdGhpcy5jaXRpZXNSZXBvc2l0b3J5LmdldEFsbCgpO1xyXG4gICAgdGhpcy5vZmZpY2VzID0gdGhpcy5vZmZpY2VzUmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICAgIHRoaXMuY2FydCA9IHRoaXMuY2FydFJlcG9zaXRvcnkuZ2V0QWxsKCk7XHJcbiAgICB0aGlzLmxvYWRQcm9kdWN0cygpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVQcmljZXMoKTtcclxuXHJcbiAgICB0aGlzLmRlbGl2ZXJ5UHJpY2UgPSB7XHJcbiAgICAgIGFtb3VudDogMy43MCxcclxuICAgICAgY3VycmVuY3k6ICdCR04nXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbG9hZFByb2R1Y3RzKCkge1xyXG4gICAgdGhpcy5jYXJ0UHJvZHVjdHMgPSBPYmplY3Qua2V5cyh0aGlzLmNhcnQpLm1hcChrID0+IHtcclxuICAgICAgcmV0dXJuIHtwcm9kdWN0OiB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXQocGFyc2VJbnQoaykpLCBxdWFudGl0eTogdGhpcy5jYXJ0W2tdfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQcmljZXMoKSB7XHJcbiAgICB0aGlzLnRvdGFsUHJvZHVjdHNQcmljZSA9IHtcclxuICAgICAgYW1vdW50OiB0aGlzLmNhcnRQcm9kdWN0cy5yZWR1Y2UoKHRvdGFsLCBjYXJ0UHJvZHVjdCkgPT4gdG90YWwgKyAoY2FydFByb2R1Y3QucXVhbnRpdHkgKiBjYXJ0UHJvZHVjdC5wcm9kdWN0LnByaWNlLmFtb3VudCksIDApLFxyXG4gICAgICBjdXJyZW5jeTogJ0JHTidcclxuICAgIH07XHJcbiAgICB0aGlzLmRlbGl2ZXJ5UHJpY2UgPSB7XHJcbiAgICAgIGFtb3VudDogMy43MCxcclxuICAgICAgY3VycmVuY3k6ICdCR04nXHJcbiAgICB9O1xyXG4gICAgdGhpcy50b3RhbFByaWNlID0ge1xyXG4gICAgICBhbW91bnQ6IHRoaXMudG90YWxQcm9kdWN0c1ByaWNlLmFtb3VudCArIHRoaXMuZGVsaXZlcnlQcmljZS5hbW91bnQsXHJcbiAgICAgIGN1cnJlbmN5OiAnQkdOJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByb2NlZWQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRDaGVja291dFN0ZXAgPSAyO1xyXG5cclxuICAgIGlmICh0aGlzLnRvQWRkcmVzcykge1xyXG4gICAgICB0aGlzLmRlbGl2ZXJ5SW5mby50eXBlID0gdGhpcy5pMThuLnRyKCdjaGVja291dC5kZWxpdmVyeUluZm8udG9BZGRyZXNzJyk7XHJcbiAgICAgIHRoaXMuZGVsaXZlcnlJbmZvLmNsaWVudCA9IHt9O1xyXG4gICAgICBpZiAodGhpcy5kaWZmZXJlbnRTaGlwbWVudEFkZHJlc3MpIHtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5jaXR5ID0gdGhpcy5kaWZmZXJlbnRTaGlwbWVudEluZm8uY2l0eTtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5hZGRyZXNzID0gdGhpcy5kaWZmZXJlbnRTaGlwbWVudEluZm8uYWRkcmVzcztcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5jbGllbnQubmFtZSA9IHRoaXMuZGlmZmVyZW50U2hpcG1lbnRJbmZvLmNsaWVudE5hbWU7XHJcbiAgICAgICAgdGhpcy5kZWxpdmVyeUluZm8uY2xpZW50LnBob25lTnVtYmVyID0gdGhpcy5kaWZmZXJlbnRTaGlwbWVudEluZm8ucGhvbmVOdW1iZXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kZWxpdmVyeUluZm8uY2l0eSA9IHRoaXMudXNlckluZm8uY2l0eTtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5hZGRyZXNzID0gdGhpcy51c2VySW5mby5hZGRyZXNzO1xyXG4gICAgICAgIHRoaXMuZGVsaXZlcnlJbmZvLmNsaWVudC5uYW1lID0gdGhpcy51c2VySW5mby5mdWxsTmFtZTtcclxuICAgICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5jbGllbnQucGhvbmVOdW1iZXIgPSB0aGlzLnVzZXJJbmZvLnBob25lTnVtYmVyO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9BZGRyZXNzID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmRlbGl2ZXJ5SW5mby50eXBlID0gdGhpcy5pMThuLnRyKCdjaGVja291dC5kZWxpdmVyeUluZm8udG9PZmZpY2UnKTtcclxuICAgICAgdGhpcy5kZWxpdmVyeUluZm8uY2l0eSA9IHRoaXMub2ZmaWNlSW5mby5jaXR5O1xyXG4gICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5hZGRyZXNzID0gdGhpcy5vZmZpY2VJbmZvLm9mZmljZS5uYW1lO1xyXG4gICAgICB0aGlzLmRlbGl2ZXJ5SW5mby5jbGllbnQubmFtZSA9IHRoaXMudXNlckluZm8uZnVsbE5hbWU7XHJcbiAgICAgIHRoaXMuZGVsaXZlcnlJbmZvLmNsaWVudC5waG9uZU51bWJlciA9IHRoaXMudXNlckluZm8ucGhvbmVOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGF5bWVudEF0RGVsaXZlcnkpIHtcclxuICAgICAgdGhpcy5wYXltZW50SW5mby5tZXRob2QgPSB0aGlzLmkxOG4udHIoJ2NoZWNrb3V0LnBheW1lbnRJbmZvLmF0RGVsaXZlcnkudGl0bGUnKTtcclxuICAgICAgdGhpcy5wYXltZW50SW5mby5kZXNjcmlwdGlvbiA9IHRoaXMuaTE4bi50cignY2hlY2tvdXQucGF5bWVudEluZm8uYXREZWxpdmVyeS5kZXNjcmlwdGlvbicpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBheW1lbnRBdERlbGl2ZXJ5ID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnBheW1lbnRJbmZvLm1ldGhvZCA9IHRoaXMuaTE4bi50cignY2hlY2tvdXQucGF5bWVudEluZm8ud2l0aENhcmQudGl0bGUnKTtcclxuICAgICAgdGhpcy5wYXltZW50SW5mby5kZXNjcmlwdGlvbiA9IHRoaXMuaTE4bi50cignY2hlY2tvdXQucGF5bWVudEluZm8ud2l0aENhcmQuZGVzY3JpcHRpb24nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJhY2soKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRDaGVja291dFN0ZXAgPSAxO1xyXG4gIH1cclxuXHJcbiAgb3JkZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zZXNzaW9uLmlzVXNlckxvZ2dlZEluKCkpIHtcclxuICAgICAgdGhpcy51c2VySW5mby5pZCA9IHRoaXMuc2Vzc2lvbi5nZXRVc2VySWQoKTtcclxuICAgICAgdGhpcy51c2VySW5mby51c2VyTmFtZSA9IHRoaXMuc2Vzc2lvbi5nZXRVc2VyTmFtZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51c2VySW5mby5pZCA9IFwiLTFcIjtcclxuICAgICAgdGhpcy51c2VySW5mby51c2VyTmFtZSA9IFwiYW5vbnltb3VzXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3JkZXIgPSB7XHJcbiAgICAgIHVzZXI6IHRoaXMudXNlckluZm8sXHJcbiAgICAgIGRlbGl2ZXJ5OiB0aGlzLmRlbGl2ZXJ5SW5mbyxcclxuICAgICAgcHJvZHVjdHM6IHRoaXMuY2FydFByb2R1Y3RzLFxyXG4gICAgICB0b3RhbFByaWNlOiB0aGlzLnRvdGFsUHJpY2UsXHJcbiAgICAgIHN0YXR1czogMVxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLnBheW1lbnRBdERlbGl2ZXJ5KSB7XHJcbiAgICAgIHRoaXMub3JkZXJzUmVwb3NpdG9yeS5zYXZlKG9yZGVyKTtcclxuXHJcbiAgICAgIHRoaXMubG9nZ2VyLnN1Y2Nlc3ModGhpcy5pMThuLnRyKCdvcmRlci5zdWNjZXNzZnVsJykpO1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnJyk7XHJcbiAgICAgIHRoaXMuY2FydFJlcG9zaXRvcnkuZW1wdHkoKTtcclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgT3JkZXJDb21wbGV0ZSh7fSkpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBheW1lbnRBdERlbGl2ZXJ5ID09PSBmYWxzZSkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUoXCJjdXJyZW50T3JkZXJcIiwgb3JkZXIpO1xyXG5cclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJyMvcGF5bWVudCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
