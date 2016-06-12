System.register(['aurelia-i18n', 'aurelia-framework', 'enum'], function (_export) {
  'use strict';

  var I18N, inject, accessRight, RoutesConfig;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_enum) {
      accessRight = _enum.accessRight;
    }],
    execute: function () {
      RoutesConfig = (function () {
        function RoutesConfig(i18n) {
          _classCallCheck(this, _RoutesConfig);

          this.i18n = i18n;
        }

        _createClass(RoutesConfig, [{
          key: 'getRoutes',
          value: function getRoutes() {
            return [{
              route: '',
              redirect: 'products'
            }, {
              route: 'products',
              name: 'products',
              moduleId: './area/products/products-index',
              nav: true,
              title: this.i18n.tr('home.title')
            }, {
              route: 'about-us',
              name: 'about-us',
              moduleId: './area/about-us/about-us',
              nav: true,
              title: this.i18n.tr('aboutUs.title')
            }, {
              route: 'contacts',
              name: 'contacts',
              moduleId: './area/contacts/contacts',
              nav: true,
              title: this.i18n.tr('contacts.title')
            }, {
              route: 'login',
              name: 'login',
              moduleId: './area/login/login',
              nav: false,
              title: this.i18n.tr('login.title')
            }, {
              route: 'register',
              name: 'register',
              moduleId: './area/register/register',
              nav: false,
              title: this.i18n.tr('register.title')
            }, {
              route: 'cart',
              name: 'cart',
              moduleId: './area/cart/cart',
              nav: false,
              title: this.i18n.tr('cart.title')
            }, {
              route: 'profile',
              name: 'profile',
              moduleId: './area/user-profile/user-profile',
              nav: false,
              title: this.i18n.tr('userProfile.title'),
              accessRight: accessRight.userProfile
            }, {
              route: 'checkout',
              name: 'checkout',
              moduleId: './area/checkout/checkout',
              nav: false,
              title: this.i18n.tr('checkout.title')
            }, {
              route: 'payment',
              name: 'payment',
              moduleId: './area/payment/payment',
              nav: false,
              title: this.i18n.tr('payment.title')
            }, {
              route: 'my-orders',
              name: 'my-orders',
              moduleId: './area/my-orders/my-orders',
              nav: false,
              title: this.i18n.tr('myOrders.title'),
              accessRight: accessRight.userProfile
            }, {
              route: 'admin',
              name: 'admin',
              moduleId: './area/admin/admin-index',
              nav: false,
              title: this.i18n.tr('admin.title'),
              accessRight: accessRight.adminPanel
            }];
          }
        }]);

        var _RoutesConfig = RoutesConfig;
        RoutesConfig = inject(I18N)(RoutesConfig) || RoutesConfig;
        return RoutesConfig;
      })();

      _export('RoutesConfig', RoutesConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQUthLFlBQVk7Ozs7Ozs7OzBCQUxqQixJQUFJOztpQ0FDSixNQUFNOzswQkFDTixXQUFXOzs7QUFHTixrQkFBWTtBQUNaLGlCQURBLFlBQVksQ0FDWCxJQUFJLEVBQUU7OztBQUNoQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjs7cUJBSFUsWUFBWTs7aUJBS2QscUJBQUc7QUFDVixtQkFBTyxDQUFDO0FBQ04sbUJBQUssRUFBRSxFQUFFO0FBQ1Qsc0JBQVEsRUFBRSxVQUFVO2FBQ3JCLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFVBQVU7QUFDakIsa0JBQUksRUFBRSxVQUFVO0FBQ2hCLHNCQUFRLEVBQUUsZ0NBQWdDO0FBQzFDLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ2xDLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFVBQVU7QUFDakIsa0JBQUksRUFBRSxVQUFVO0FBQ2hCLHNCQUFRLEVBQUUsMEJBQTBCO0FBQ3BDLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQ3JDLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFVBQVU7QUFDakIsa0JBQUksRUFBRSxVQUFVO0FBQ2hCLHNCQUFRLEVBQUUsMEJBQTBCO0FBQ3BDLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDdEMsRUFBRTtBQUNELG1CQUFLLEVBQUUsT0FBTztBQUNkLGtCQUFJLEVBQUUsT0FBTztBQUNiLHNCQUFRLEVBQUUsb0JBQW9CO0FBQzlCLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ25DLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFVBQVU7QUFDakIsa0JBQUksRUFBRSxVQUFVO0FBQ2hCLHNCQUFRLEVBQUUsMEJBQTBCO0FBQ3BDLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDdEMsRUFBRTtBQUNELG1CQUFLLEVBQUUsTUFBTTtBQUNiLGtCQUFJLEVBQUUsTUFBTTtBQUNaLHNCQUFRLEVBQUUsa0JBQWtCO0FBQzVCLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ2xDLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFNBQVM7QUFDaEIsa0JBQUksRUFBRSxTQUFTO0FBQ2Ysc0JBQVEsRUFBRSxrQ0FBa0M7QUFDNUMsaUJBQUcsRUFBRSxLQUFLO0FBQ1YsbUJBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztBQUN4Qyx5QkFBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO2FBQ3JDLEVBQUU7QUFDRCxtQkFBSyxFQUFFLFVBQVU7QUFDakIsa0JBQUksRUFBRSxVQUFVO0FBQ2hCLHNCQUFRLEVBQUUsMEJBQTBCO0FBQ3BDLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDdEMsRUFBRTtBQUNELG1CQUFLLEVBQUUsU0FBUztBQUNoQixrQkFBSSxFQUFFLFNBQVM7QUFDZixzQkFBUSxFQUFFLHdCQUF3QjtBQUNsQyxpQkFBRyxFQUFFLEtBQUs7QUFDVixtQkFBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQzthQUNyQyxFQUFFO0FBQ0QsbUJBQUssRUFBRSxXQUFXO0FBQ2xCLGtCQUFJLEVBQUUsV0FBVztBQUNqQixzQkFBUSxFQUFFLDRCQUE0QjtBQUN0QyxpQkFBRyxFQUFFLEtBQUs7QUFDVixtQkFBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0FBQ3JDLHlCQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7YUFDckMsRUFBRTtBQUNELG1CQUFLLEVBQUUsT0FBTztBQUNkLGtCQUFJLEVBQUUsT0FBTztBQUNiLHNCQUFRLEVBQUUsMEJBQTBCO0FBQ3BDLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO0FBQ2xDLHlCQUFXLEVBQUUsV0FBVyxDQUFDLFVBQVU7YUFDcEMsQ0FBQyxDQUFDO1dBQ0o7Ozs0QkEvRVUsWUFBWTtBQUFaLG9CQUFZLEdBRHhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FDQSxZQUFZLEtBQVosWUFBWTtlQUFaLFlBQVkiLCJmaWxlIjoicm91dGVzLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHthY2Nlc3NSaWdodH0gZnJvbSAnZW51bSc7XHJcblxyXG5AaW5qZWN0KEkxOE4pXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZXNDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKGkxOG4pIHtcclxuICAgIHRoaXMuaTE4biA9IGkxOG47XHJcbiAgfVxyXG5cclxuICBnZXRSb3V0ZXMoKSB7XHJcbiAgICByZXR1cm4gW3tcclxuICAgICAgcm91dGU6ICcnLFxyXG4gICAgICByZWRpcmVjdDogJ3Byb2R1Y3RzJ1xyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ3Byb2R1Y3RzJyxcclxuICAgICAgbmFtZTogJ3Byb2R1Y3RzJyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvcHJvZHVjdHMvcHJvZHVjdHMtaW5kZXgnLFxyXG4gICAgICBuYXY6IHRydWUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4udHIoJ2hvbWUudGl0bGUnKVxyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ2Fib3V0LXVzJyxcclxuICAgICAgbmFtZTogJ2Fib3V0LXVzJyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvYWJvdXQtdXMvYWJvdXQtdXMnLFxyXG4gICAgICBuYXY6IHRydWUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4udHIoJ2Fib3V0VXMudGl0bGUnKVxyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ2NvbnRhY3RzJyxcclxuICAgICAgbmFtZTogJ2NvbnRhY3RzJyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvY29udGFjdHMvY29udGFjdHMnLFxyXG4gICAgICBuYXY6IHRydWUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4udHIoJ2NvbnRhY3RzLnRpdGxlJylcclxuICAgIH0sIHtcclxuICAgICAgcm91dGU6ICdsb2dpbicsXHJcbiAgICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgICAgIG1vZHVsZUlkOiAnLi9hcmVhL2xvZ2luL2xvZ2luJyxcclxuICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cignbG9naW4udGl0bGUnKVxyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ3JlZ2lzdGVyJyxcclxuICAgICAgbmFtZTogJ3JlZ2lzdGVyJyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvcmVnaXN0ZXIvcmVnaXN0ZXInLFxyXG4gICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5pMThuLnRyKCdyZWdpc3Rlci50aXRsZScpXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAnY2FydCcsXHJcbiAgICAgIG5hbWU6ICdjYXJ0JyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvY2FydC9jYXJ0JyxcclxuICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cignY2FydC50aXRsZScpXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAncHJvZmlsZScsXHJcbiAgICAgIG5hbWU6ICdwcm9maWxlJyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZScsXHJcbiAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4udHIoJ3VzZXJQcm9maWxlLnRpdGxlJyksXHJcbiAgICAgIGFjY2Vzc1JpZ2h0OiBhY2Nlc3NSaWdodC51c2VyUHJvZmlsZVxyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ2NoZWNrb3V0JyxcclxuICAgICAgbmFtZTogJ2NoZWNrb3V0JyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvY2hlY2tvdXQvY2hlY2tvdXQnLFxyXG4gICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5pMThuLnRyKCdjaGVja291dC50aXRsZScpXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAncGF5bWVudCcsXHJcbiAgICAgIG5hbWU6ICdwYXltZW50JyxcclxuICAgICAgbW9kdWxlSWQ6ICcuL2FyZWEvcGF5bWVudC9wYXltZW50JyxcclxuICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cigncGF5bWVudC50aXRsZScpXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAnbXktb3JkZXJzJyxcclxuICAgICAgbmFtZTogJ215LW9yZGVycycsXHJcbiAgICAgIG1vZHVsZUlkOiAnLi9hcmVhL215LW9yZGVycy9teS1vcmRlcnMnLFxyXG4gICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5pMThuLnRyKCdteU9yZGVycy50aXRsZScpLFxyXG4gICAgICBhY2Nlc3NSaWdodDogYWNjZXNzUmlnaHQudXNlclByb2ZpbGVcclxuICAgIH0sIHtcclxuICAgICAgcm91dGU6ICdhZG1pbicsXHJcbiAgICAgIG5hbWU6ICdhZG1pbicsXHJcbiAgICAgIG1vZHVsZUlkOiAnLi9hcmVhL2FkbWluL2FkbWluLWluZGV4JyxcclxuICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cignYWRtaW4udGl0bGUnKSxcclxuICAgICAgYWNjZXNzUmlnaHQ6IGFjY2Vzc1JpZ2h0LmFkbWluUGFuZWxcclxuICAgIH1dO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
