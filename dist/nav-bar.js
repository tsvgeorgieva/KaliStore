System.register(['aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator', 'service', 'events', 'repository', 'enum'], function (_export) {
  'use strict';

  var bindable, inject, Router, EventAggregator, Session, HttpSessionTimedOutMessage, localStorageManager, AddProductToCartEvent, RemoveProductFromCartEvent, OrderComplete, CategoriesRepository, CartRepository, ProductsRepository, accessRight, NavBar;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_service) {
      Session = _service.Session;
      HttpSessionTimedOutMessage = _service.HttpSessionTimedOutMessage;
      localStorageManager = _service.localStorageManager;
    }, function (_events) {
      AddProductToCartEvent = _events.AddProductToCartEvent;
      RemoveProductFromCartEvent = _events.RemoveProductFromCartEvent;
      OrderComplete = _events.OrderComplete;
    }, function (_repository) {
      CategoriesRepository = _repository.CategoriesRepository;
      CartRepository = _repository.CartRepository;
      ProductsRepository = _repository.ProductsRepository;
    }, function (_enum) {
      accessRight = _enum.accessRight;
    }],
    execute: function () {
      NavBar = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(NavBar, [{
          key: 'router',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function NavBar(session, eventAggregator, router, categoriesRepository, cartRepository, productsRepository) {
          var _this = this;

          _classCallCheck(this, _NavBar);

          _defineDecoratedPropertyDescriptor(this, 'router', _instanceInitializers);

          this.categories = [];
          this.searchQuery = '';
          this.cartProducts = [];
          this.cartProductsCount = 0;

          this.session = session;
          this.router = router;
          this.categoriesRepository = categoriesRepository;
          this.cartRepository = cartRepository;
          this.productsRepository = productsRepository;

          this.categories = this.categoriesRepository.getAll();

          this.loadCartProducts();

          eventAggregator.subscribe(HttpSessionTimedOutMessage, function () {
            return _this.logout();
          });

          eventAggregator.subscribe(AddProductToCartEvent, function (event) {
            _this.loadCartProducts();
          });

          eventAggregator.subscribe(RemoveProductFromCartEvent, function () {
            _this.loadCartProducts();
          });

          eventAggregator.subscribe(OrderComplete, function () {
            _this.loadCartProducts();
          });

          eventAggregator.subscribe('router:navigation:complete', function () {
            _this.checkIfInAdminPanel();
          });

          window.navBar = this;
        }

        _createDecoratedClass(NavBar, [{
          key: 'checkIfInAdminPanel',
          value: function checkIfInAdminPanel() {
            this.isInAdminPanel = this.router.currentInstruction.config.name === 'admin';
          }
        }, {
          key: 'search',
          value: function search() {
            this.router.navigate('#/products/search/' + this.searchQuery);
          }
        }, {
          key: 'hoverSettings',
          value: function hoverSettings(isHovered) {
            this.hovered = isHovered;
          }
        }, {
          key: 'checkAccess',
          value: function checkAccess(navModel) {
            if (navModel.config.accessRight) {
              return this.session.userHasAccessRight(navModel.config.accessRight);
            }

            return true;
          }
        }, {
          key: 'logout',
          value: function logout() {
            this.session.logoutUser();
            this.router.navigate('login');
          }
        }, {
          key: 'loadCartProducts',
          value: function loadCartProducts() {
            var _this2 = this;

            var cart = this.cartRepository.getAll();
            this.cartProducts = Object.keys(cart).map(function (k) {
              return { product: _this2.productsRepository.get(parseInt(k)), quantity: cart[k] };
            });
            this.cartProductsCount = this.cartProducts.reduce(function (sum, cartProduct) {
              return sum + cartProduct.quantity;
            }, 0);
          }
        }, {
          key: 'isUserLoggedIn',
          get: function get() {
            return this.session.isLoggedIn === true;
          }
        }, {
          key: 'userName',
          get: function get() {
            return this.session.getUserName();
          }
        }, {
          key: 'isUserAdmin',
          get: function get() {
            return this.session.userHasAccessRight(accessRight.adminPanel);
          }
        }], null, _instanceInitializers);

        var _NavBar = NavBar;
        NavBar = inject(Session, EventAggregator, Router, CategoriesRepository, CartRepository, ProductsRepository)(NavBar) || NavBar;
        return NavBar;
      })();

      _export('NavBar', NavBar);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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cm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1Nlc3Npb24sIEh0dHBTZXNzaW9uVGltZWRPdXRNZXNzYWdlLCBsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuaW1wb3J0IHtBZGRQcm9kdWN0VG9DYXJ0RXZlbnQsIFJlbW92ZVByb2R1Y3RGcm9tQ2FydEV2ZW50LCBPcmRlckNvbXBsZXRlfSBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQge0NhdGVnb3JpZXNSZXBvc2l0b3J5LCBDYXJ0UmVwb3NpdG9yeSwgUHJvZHVjdHNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuaW1wb3J0IHthY2Nlc3NSaWdodH0gZnJvbSAnZW51bSc7XHJcblxyXG5AaW5qZWN0KFNlc3Npb24sIEV2ZW50QWdncmVnYXRvciwgUm91dGVyLCBDYXRlZ29yaWVzUmVwb3NpdG9yeSwgQ2FydFJlcG9zaXRvcnksIFByb2R1Y3RzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIE5hdkJhciB7XHJcbiAgQGJpbmRhYmxlIHJvdXRlciA9IG51bGw7XHJcbiAgY2F0ZWdvcmllcyA9IFtdO1xyXG4gIHNlYXJjaFF1ZXJ5ID0gJyc7XHJcbiAgY2FydFByb2R1Y3RzID0gW107XHJcbiAgY2FydFByb2R1Y3RzQ291bnQgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBldmVudEFnZ3JlZ2F0b3IsIHJvdXRlciwgY2F0ZWdvcmllc1JlcG9zaXRvcnksIGNhcnRSZXBvc2l0b3J5LCBwcm9kdWN0c1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgIHRoaXMuY2F0ZWdvcmllc1JlcG9zaXRvcnkgPSBjYXRlZ29yaWVzUmVwb3NpdG9yeTtcclxuICAgIHRoaXMuY2FydFJlcG9zaXRvcnkgPSBjYXJ0UmVwb3NpdG9yeTtcclxuICAgIHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5ID0gcHJvZHVjdHNSZXBvc2l0b3J5O1xyXG5cclxuICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcmllc1JlcG9zaXRvcnkuZ2V0QWxsKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkQ2FydFByb2R1Y3RzKCk7XHJcblxyXG4gICAgZXZlbnRBZ2dyZWdhdG9yLnN1YnNjcmliZShIdHRwU2Vzc2lvblRpbWVkT3V0TWVzc2FnZSwgKCkgPT4gdGhpcy5sb2dvdXQoKSk7XHJcblxyXG4gICAgZXZlbnRBZ2dyZWdhdG9yLnN1YnNjcmliZShBZGRQcm9kdWN0VG9DYXJ0RXZlbnQsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmxvYWRDYXJ0UHJvZHVjdHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoUmVtb3ZlUHJvZHVjdEZyb21DYXJ0RXZlbnQsICgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkQ2FydFByb2R1Y3RzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKE9yZGVyQ29tcGxldGUsICgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkQ2FydFByb2R1Y3RzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKCdyb3V0ZXI6bmF2aWdhdGlvbjpjb21wbGV0ZScsICgpID0+IHtcclxuICAgICAgdGhpcy5jaGVja0lmSW5BZG1pblBhbmVsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cubmF2QmFyID0gdGhpcztcclxuICB9XHJcblxyXG4gIGdldCBpc1VzZXJMb2dnZWRJbigpIHtcclxuICAgIHJldHVybiB0aGlzLnNlc3Npb24uaXNMb2dnZWRJbiA9PT0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldCB1c2VyTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ2V0VXNlck5hbWUoKTtcclxuICB9XHJcblxyXG4gIGdldCBpc1VzZXJBZG1pbigpIHtcclxuICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0FjY2Vzc1JpZ2h0KGFjY2Vzc1JpZ2h0LmFkbWluUGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJZkluQWRtaW5QYW5lbCgpe1xyXG4gICAgLy8gRklYTUU6IGh1Z2UgaGFjay4uLlxyXG4gICAgdGhpcy5pc0luQWRtaW5QYW5lbCA9IHRoaXMucm91dGVyLmN1cnJlbnRJbnN0cnVjdGlvbi5jb25maWcubmFtZSA9PT0gJ2FkbWluJztcclxuICB9XHJcblxyXG4gIHNlYXJjaCgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCcjL3Byb2R1Y3RzL3NlYXJjaC8nICsgdGhpcy5zZWFyY2hRdWVyeSk7XHJcbiAgfVxyXG5cclxuICBob3ZlclNldHRpbmdzKGlzSG92ZXJlZCkge1xyXG4gICAgdGhpcy5ob3ZlcmVkID0gaXNIb3ZlcmVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBY2Nlc3MobmF2TW9kZWwpIHtcclxuICAgIGlmIChuYXZNb2RlbC5jb25maWcuYWNjZXNzUmlnaHQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi51c2VySGFzQWNjZXNzUmlnaHQobmF2TW9kZWwuY29uZmlnLmFjY2Vzc1JpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMuc2Vzc2lvbi5sb2dvdXRVc2VyKCk7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnbG9naW4nKTtcclxuICB9XHJcblxyXG4gIGxvYWRDYXJ0UHJvZHVjdHMoKSB7XHJcbiAgICBjb25zdCBjYXJ0ID0gdGhpcy5jYXJ0UmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICAgIHRoaXMuY2FydFByb2R1Y3RzID0gT2JqZWN0LmtleXMoY2FydCkubWFwKGsgPT4ge1xyXG4gICAgICByZXR1cm4ge3Byb2R1Y3Q6IHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5LmdldChwYXJzZUludChrKSksIHF1YW50aXR5OiBjYXJ0W2tdfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhcnRQcm9kdWN0c0NvdW50ID0gdGhpcy5jYXJ0UHJvZHVjdHMucmVkdWNlKChzdW0sIGNhcnRQcm9kdWN0KSA9PiBzdW0gKyBjYXJ0UHJvZHVjdC5xdWFudGl0eSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
