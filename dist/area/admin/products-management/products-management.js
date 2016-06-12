System.register(['aurelia-framework', 'aurelia-i18n', 'repository', 'dialog', './edit-product-dialog/edit-product-dialog', 'models'], function (_export) {
  'use strict';

  var inject, I18N, ProductsRepository, CategoriesRepository, DialogService, EditProductDialog, Product, ProductsManagement;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_repository) {
      ProductsRepository = _repository.ProductsRepository;
      CategoriesRepository = _repository.CategoriesRepository;
    }, function (_dialog) {
      DialogService = _dialog.DialogService;
    }, function (_editProductDialogEditProductDialog) {
      EditProductDialog = _editProductDialogEditProductDialog.EditProductDialog;
    }, function (_models) {
      Product = _models.Product;
    }],
    execute: function () {
      ProductsManagement = (function () {
        function ProductsManagement(i18n, productsRepository, categoriesRepository, dialogService) {
          _classCallCheck(this, _ProductsManagement);

          this.products = [];
          this.categories = [];

          this.i18n = i18n;
          this.productsRepository = productsRepository;
          this.categoriesRepository = categoriesRepository;
          this.dialogService = dialogService;

          this.products = this.productsRepository.getAll();
          this.categories = this.categoriesRepository.getAll().slice();
          this.categories.unshift({ id: undefined, name: this.i18n.tr('admin.productsManagement.allCategories') });

          window.products = this.products;
        }

        _createClass(ProductsManagement, [{
          key: 'editProduct',
          value: function editProduct(product) {
            var _this = this;

            this.dialogService.openDialog({
              viewModel: EditProductDialog,
              model: new Product(product).getCopy(),
              centerHorizontalOnly: true
            }).then(function (result) {
              if (!result.wasCancelled) {
                _this.productsRepository.edit(result.output);
                _this.products = _this.productsRepository.getAll();
              }
            });
          }
        }]);

        var _ProductsManagement = ProductsManagement;
        ProductsManagement = inject(I18N, ProductsRepository, CategoriesRepository, DialogService)(ProductsManagement) || ProductsManagement;
        return ProductsManagement;
      })();

      _export('ProductsManagement', ProductsManagement);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvYWRtaW4vcHJvZHVjdHMtbWFuYWdlbWVudC9wcm9kdWN0cy1tYW5hZ2VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5R0FRYSxrQkFBa0I7Ozs7Ozs7O2lDQVJ2QixNQUFNOzswQkFDTixJQUFJOzt1Q0FDSixrQkFBa0I7eUNBQUUsb0JBQW9COzs4QkFDeEMsYUFBYTs7OERBQ2IsaUJBQWlCOzt3QkFDakIsT0FBTzs7O0FBR0Ysd0JBQWtCO0FBSWxCLGlCQUpBLGtCQUFrQixDQUlqQixJQUFJLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFOzs7ZUFIM0UsUUFBUSxHQUFHLEVBQUU7ZUFDYixVQUFVLEdBQUcsRUFBRTs7QUFHYixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDN0MsY0FBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ2pELGNBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOztBQUVuQyxjQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNqRCxjQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUM3RCxjQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDLEVBQUMsQ0FBQyxDQUFDOztBQUV2RyxnQkFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2pDOztxQkFmVSxrQkFBa0I7O2lCQWlCbEIscUJBQUMsT0FBTyxFQUFFOzs7QUFDbkIsZ0JBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0FBQzVCLHVCQUFTLEVBQUUsaUJBQWlCO0FBQzVCLG1CQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO0FBQ3JDLGtDQUFvQixFQUFFLElBQUk7YUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUNsQixrQkFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDeEIsc0JBQUssa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxzQkFBSyxRQUFRLEdBQUcsTUFBSyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztlQUNsRDthQUNGLENBQUMsQ0FBQztXQUNKOzs7a0NBNUJVLGtCQUFrQjtBQUFsQiwwQkFBa0IsR0FEOUIsTUFBTSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FDekQsa0JBQWtCLEtBQWxCLGtCQUFrQjtlQUFsQixrQkFBa0IiLCJmaWxlIjoiYXJlYS9hZG1pbi9wcm9kdWN0cy1tYW5hZ2VtZW50L3Byb2R1Y3RzLW1hbmFnZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge0kxOE59IGZyb20gJ2F1cmVsaWEtaTE4bic7XHJcbmltcG9ydCB7UHJvZHVjdHNSZXBvc2l0b3J5LCBDYXRlZ29yaWVzUmVwb3NpdG9yeX0gZnJvbSAncmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7RGlhbG9nU2VydmljZX0gZnJvbSAnZGlhbG9nJztcclxuaW1wb3J0IHtFZGl0UHJvZHVjdERpYWxvZ30gZnJvbSAnLi9lZGl0LXByb2R1Y3QtZGlhbG9nL2VkaXQtcHJvZHVjdC1kaWFsb2cnO1xyXG5pbXBvcnQge1Byb2R1Y3R9IGZyb20gJ21vZGVscyc7XHJcblxyXG5AaW5qZWN0KEkxOE4sIFByb2R1Y3RzUmVwb3NpdG9yeSwgQ2F0ZWdvcmllc1JlcG9zaXRvcnksIERpYWxvZ1NlcnZpY2UpXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c01hbmFnZW1lbnQge1xyXG4gIHByb2R1Y3RzID0gW107XHJcbiAgY2F0ZWdvcmllcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihpMThuLCBwcm9kdWN0c1JlcG9zaXRvcnksIGNhdGVnb3JpZXNSZXBvc2l0b3J5LCBkaWFsb2dTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xyXG4gICAgdGhpcy5wcm9kdWN0c1JlcG9zaXRvcnkgPSBwcm9kdWN0c1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNSZXBvc2l0b3J5ID0gY2F0ZWdvcmllc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2UgPSBkaWFsb2dTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzUmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcmllc1JlcG9zaXRvcnkuZ2V0QWxsKCkuc2xpY2UoKTtcclxuICAgIHRoaXMuY2F0ZWdvcmllcy51bnNoaWZ0KHtpZDogdW5kZWZpbmVkLCBuYW1lOiB0aGlzLmkxOG4udHIoJ2FkbWluLnByb2R1Y3RzTWFuYWdlbWVudC5hbGxDYXRlZ29yaWVzJyl9KTtcclxuXHJcbiAgICB3aW5kb3cucHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzO1xyXG4gIH1cclxuXHJcbiAgZWRpdFByb2R1Y3QocHJvZHVjdCkge1xyXG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coe1xyXG4gICAgICB2aWV3TW9kZWw6IEVkaXRQcm9kdWN0RGlhbG9nLFxyXG4gICAgICBtb2RlbDogbmV3IFByb2R1Y3QocHJvZHVjdCkuZ2V0Q29weSgpLFxyXG4gICAgICBjZW50ZXJIb3Jpem9udGFsT25seTogdHJ1ZVxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICghcmVzdWx0Lndhc0NhbmNlbGxlZCkge1xyXG4gICAgICAgIHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5LmVkaXQocmVzdWx0Lm91dHB1dCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMucHJvZHVjdHNSZXBvc2l0b3J5LmdldEFsbCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
