System.register(['libs/child-router/child-router', 'service', 'aurelia-framework', 'aurelia-i18n'], function (_export) {
  'use strict';

  var ChildRouter, Session, inject, useView, I18N, AdminIndex;

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
      AdminIndex = (function (_ChildRouter) {
        _inherits(AdminIndex, _ChildRouter);

        function AdminIndex(session, i18n) {
          _classCallCheck(this, _AdminIndex);

          _get(Object.getPrototypeOf(_AdminIndex.prototype), 'constructor', this).call(this, session);
          this.i18n = i18n;
          this.navModel = [{
            route: '',
            redirect: 'users-management'
          }, {
            route: 'users-management',
            name: 'users-management',
            moduleId: './users-management/users-management',
            title: this.i18n.tr('admin.usersManagement.title'),
            nav: true
          }, {
            route: 'products-management',
            name: 'products-management',
            moduleId: './products-management/products-management',
            title: this.i18n.tr('admin.productsManagement.title'),
            nav: true
          }, {
            route: 'categories-management',
            name: 'categories-management',
            moduleId: './categories-management/categories-management',
            title: this.i18n.tr('admin.categoriesManagement.title'),
            nav: true
          }, {
            route: 'materials-management',
            name: 'materials-management',
            moduleId: './materials-management/materials-management',
            title: this.i18n.tr('admin.materialsManagement.title'),
            nav: true
          }];
        }

        var _AdminIndex = AdminIndex;
        AdminIndex = useView('libs/child-router/navbar-router.html')(AdminIndex) || AdminIndex;
        AdminIndex = inject(Session, I18N)(AdminIndex) || AdminIndex;
        return AdminIndex;
      })(ChildRouter);

      _export('AdminIndex', AdminIndex);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvYWRtaW4vYWRtaW4taW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21EQU9hLFVBQVU7Ozs7Ozs7Ozs7Z0RBUGYsV0FBVzs7eUJBQ1gsT0FBTzs7aUNBQ1AsTUFBTTtrQ0FBRSxPQUFPOzswQkFDZixJQUFJOzs7QUFJQyxnQkFBVTtrQkFBVixVQUFVOztBQUNWLGlCQURBLFVBQVUsQ0FDVCxPQUFPLEVBQUUsSUFBSSxFQUFFOzs7QUFDekIsNkZBQU0sT0FBTyxFQUFFO0FBQ2YsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsY0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO0FBQ2YsaUJBQUssRUFBRSxFQUFFO0FBQ1Qsb0JBQVEsRUFBRSxrQkFBa0I7V0FDN0IsRUFBRTtBQUNELGlCQUFLLEVBQUUsa0JBQWtCO0FBQ3pCLGdCQUFJLEVBQUUsa0JBQWtCO0FBQ3hCLG9CQUFRLEVBQUUscUNBQXFDO0FBQy9DLGlCQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUM7QUFDbEQsZUFBRyxFQUFFLElBQUk7V0FDVixFQUFFO0FBQ0QsaUJBQUssRUFBRSxxQkFBcUI7QUFDNUIsZ0JBQUksRUFBRSxxQkFBcUI7QUFDM0Isb0JBQVEsRUFBRSwyQ0FBMkM7QUFDckQsaUJBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztBQUNyRCxlQUFHLEVBQUUsSUFBSTtXQUNWLEVBQUU7QUFDRCxpQkFBSyxFQUFFLHVCQUF1QjtBQUM5QixnQkFBSSxFQUFFLHVCQUF1QjtBQUM3QixvQkFBUSxFQUFFLCtDQUErQztBQUN6RCxpQkFBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO0FBQ3ZELGVBQUcsRUFBRSxJQUFJO1dBQ1YsRUFBRTtBQUNELGlCQUFLLEVBQUUsc0JBQXNCO0FBQzdCLGdCQUFJLEVBQUUsc0JBQXNCO0FBQzVCLG9CQUFRLEVBQUUsNkNBQTZDO0FBQ3ZELGlCQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUNBQWlDLENBQUM7QUFDdEQsZUFBRyxFQUFFLElBQUk7V0FDVixDQUFDLENBQUM7U0FDSjs7MEJBaENVLFVBQVU7QUFBVixrQkFBVSxHQUR0QixPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FDbkMsVUFBVSxLQUFWLFVBQVU7QUFBVixrQkFBVSxHQUZ0QixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUVULFVBQVUsS0FBVixVQUFVO2VBQVYsVUFBVTtTQUFTLFdBQVciLCJmaWxlIjoiYXJlYS9hZG1pbi9hZG1pbi1pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hpbGRSb3V0ZXJ9IGZyb20gJ2xpYnMvY2hpbGQtcm91dGVyL2NoaWxkLXJvdXRlcic7XHJcbmltcG9ydCB7U2Vzc2lvbn0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCB7aW5qZWN0LCB1c2VWaWV3fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgSTE4TilcclxuQHVzZVZpZXcoJ2xpYnMvY2hpbGQtcm91dGVyL25hdmJhci1yb3V0ZXIuaHRtbCcpXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkluZGV4IGV4dGVuZHMgQ2hpbGRSb3V0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGkxOG4pIHtcclxuICAgIHN1cGVyKHNlc3Npb24pO1xyXG4gICAgdGhpcy5pMThuID0gaTE4bjtcclxuICAgIHRoaXMubmF2TW9kZWwgPSBbe1xyXG4gICAgICByb3V0ZTogJycsXHJcbiAgICAgIHJlZGlyZWN0OiAndXNlcnMtbWFuYWdlbWVudCdcclxuICAgIH0sIHtcclxuICAgICAgcm91dGU6ICd1c2Vycy1tYW5hZ2VtZW50JyxcclxuICAgICAgbmFtZTogJ3VzZXJzLW1hbmFnZW1lbnQnLFxyXG4gICAgICBtb2R1bGVJZDogJy4vdXNlcnMtbWFuYWdlbWVudC91c2Vycy1tYW5hZ2VtZW50JyxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cignYWRtaW4udXNlcnNNYW5hZ2VtZW50LnRpdGxlJyksXHJcbiAgICAgIG5hdjogdHJ1ZVxyXG4gICAgfSwge1xyXG4gICAgICByb3V0ZTogJ3Byb2R1Y3RzLW1hbmFnZW1lbnQnLFxyXG4gICAgICBuYW1lOiAncHJvZHVjdHMtbWFuYWdlbWVudCcsXHJcbiAgICAgIG1vZHVsZUlkOiAnLi9wcm9kdWN0cy1tYW5hZ2VtZW50L3Byb2R1Y3RzLW1hbmFnZW1lbnQnLFxyXG4gICAgICB0aXRsZTogdGhpcy5pMThuLnRyKCdhZG1pbi5wcm9kdWN0c01hbmFnZW1lbnQudGl0bGUnKSxcclxuICAgICAgbmF2OiB0cnVlXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAnY2F0ZWdvcmllcy1tYW5hZ2VtZW50JyxcclxuICAgICAgbmFtZTogJ2NhdGVnb3JpZXMtbWFuYWdlbWVudCcsXHJcbiAgICAgIG1vZHVsZUlkOiAnLi9jYXRlZ29yaWVzLW1hbmFnZW1lbnQvY2F0ZWdvcmllcy1tYW5hZ2VtZW50JyxcclxuICAgICAgdGl0bGU6IHRoaXMuaTE4bi50cignYWRtaW4uY2F0ZWdvcmllc01hbmFnZW1lbnQudGl0bGUnKSxcclxuICAgICAgbmF2OiB0cnVlXHJcbiAgICB9LCB7XHJcbiAgICAgIHJvdXRlOiAnbWF0ZXJpYWxzLW1hbmFnZW1lbnQnLFxyXG4gICAgICBuYW1lOiAnbWF0ZXJpYWxzLW1hbmFnZW1lbnQnLFxyXG4gICAgICBtb2R1bGVJZDogJy4vbWF0ZXJpYWxzLW1hbmFnZW1lbnQvbWF0ZXJpYWxzLW1hbmFnZW1lbnQnLFxyXG4gICAgICB0aXRsZTogdGhpcy5pMThuLnRyKCdhZG1pbi5tYXRlcmlhbHNNYW5hZ2VtZW50LnRpdGxlJyksXHJcbiAgICAgIG5hdjogdHJ1ZVxyXG4gICAgfV07XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
