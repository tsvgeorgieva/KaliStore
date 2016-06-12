System.register(['libs/child-router/child-router', 'service', 'aurelia-framework', 'aurelia-i18n'], function (_export) {
  'use strict';

  var ChildRouter, Session, inject, useView, I18N, ProductsIndex;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_libsChildRouterChildRouter) {
      ChildRouter = _libsChildRouterChildRouter.ChildRouter;
    }, function (_service) {
      Session = _service.Session;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }],
    execute: function () {
      ProductsIndex = (function (_ChildRouter) {
        _inherits(ProductsIndex, _ChildRouter);

        function ProductsIndex(session, i18n) {
          _classCallCheck(this, _ProductsIndex);

          _get(Object.getPrototypeOf(_ProductsIndex.prototype), 'constructor', this).call(this, session);
          this.i18n = i18n;
          this.navModel = [{
            route: '',
            redirect: 'all-products'
          }, {
            route: ['all-products', 'search/:searchQuery', 'category/:categoryId'],
            name: 'all-products',
            moduleId: './all-products/all-products',
            title: this.i18n.tr('products.allProducts'),
            nav: false
          }, {
            route: ':productId',
            name: 'product',
            moduleId: './product/product',
            title: this.i18n.tr('products.detailsForProduct')
          }];
        }

        var _ProductsIndex = ProductsIndex;
        ProductsIndex = useView('libs/child-router/null-router.html')(ProductsIndex) || ProductsIndex;
        ProductsIndex = inject(Session, I18N)(ProductsIndex) || ProductsIndex;
        return ProductsIndex;
      })(ChildRouter);

      _export('ProductsIndex', ProductsIndex);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvcHJvZHVjdHMvcHJvZHVjdHMtaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21EQVFhLGFBQWE7Ozs7Ozs7Ozs7Z0RBUmxCLFdBQVc7O3lCQUNYLE9BQU87O2lDQUNQLE1BQU07a0NBQUUsT0FBTzs7MEJBQ2YsSUFBSTs7O0FBS0MsbUJBQWE7a0JBQWIsYUFBYTs7QUFDYixpQkFEQSxhQUFhLENBQ1osT0FBTyxFQUFFLElBQUksRUFBRTs7O0FBQ3pCLGdHQUFNLE9BQU8sRUFBRTtBQUNmLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQztBQUNmLGlCQUFLLEVBQUUsRUFBRTtBQUNULG9CQUFRLEVBQUUsY0FBYztXQUN6QixFQUFFO0FBQ0QsaUJBQUssRUFBRSxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsQ0FBQztBQUN0RSxnQkFBSSxFQUFFLGNBQWM7QUFDcEIsb0JBQVEsRUFBRSw2QkFBNkI7QUFDdkMsaUJBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztBQUMzQyxlQUFHLEVBQUUsS0FBSztXQUNYLEVBQUU7QUFDRCxpQkFBSyxFQUFFLFlBQVk7QUFDbkIsZ0JBQUksRUFBRSxTQUFTO0FBQ2Ysb0JBQVEsRUFBRSxtQkFBbUI7QUFDN0IsaUJBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztXQUNsRCxDQUFDLENBQUM7U0FDSjs7NkJBbkJVLGFBQWE7QUFBYixxQkFBYSxHQUR6QixPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FDakMsYUFBYSxLQUFiLGFBQWE7QUFBYixxQkFBYSxHQUh6QixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUdULGFBQWEsS0FBYixhQUFhO2VBQWIsYUFBYTtTQUFTLFdBQVciLCJmaWxlIjoiYXJlYS9wcm9kdWN0cy9wcm9kdWN0cy1pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hpbGRSb3V0ZXJ9IGZyb20gJ2xpYnMvY2hpbGQtcm91dGVyL2NoaWxkLXJvdXRlcic7XHJcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCB7aW5qZWN0LCB1c2VWaWV3fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgSTE4TilcclxuLy9AdXNlVmlldygnbGlicy9jaGlsZC1yb3V0ZXIvdGFicy1yb3V0ZXIuaHRtbCcpXHJcbkB1c2VWaWV3KCdsaWJzL2NoaWxkLXJvdXRlci9udWxsLXJvdXRlci5odG1sJylcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzSW5kZXggZXh0ZW5kcyBDaGlsZFJvdXRlciB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgaTE4bikge1xyXG4gICAgc3VwZXIoc2Vzc2lvbik7XHJcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xyXG4gICAgdGhpcy5uYXZNb2RlbCA9IFt7XHJcbiAgICAgIHJvdXRlOiAnJyxcclxuICAgICAgcmVkaXJlY3Q6ICdhbGwtcHJvZHVjdHMnXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiBbJ2FsbC1wcm9kdWN0cycsICdzZWFyY2gvOnNlYXJjaFF1ZXJ5JywgJ2NhdGVnb3J5LzpjYXRlZ29yeUlkJ10sXHJcbiAgICAgIG5hbWU6ICdhbGwtcHJvZHVjdHMnLFxyXG4gICAgICBtb2R1bGVJZDogJy4vYWxsLXByb2R1Y3RzL2FsbC1wcm9kdWN0cycsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmkxOG4udHIoJ3Byb2R1Y3RzLmFsbFByb2R1Y3RzJyksXHJcbiAgICAgIG5hdjogZmFsc2VcclxuICAgIH0sIHtcclxuICAgICAgcm91dGU6ICc6cHJvZHVjdElkJyxcclxuICAgICAgbmFtZTogJ3Byb2R1Y3QnLFxyXG4gICAgICBtb2R1bGVJZDogJy4vcHJvZHVjdC9wcm9kdWN0JyxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cigncHJvZHVjdHMuZGV0YWlsc0ZvclByb2R1Y3QnKVxyXG4gICAgfV07XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
