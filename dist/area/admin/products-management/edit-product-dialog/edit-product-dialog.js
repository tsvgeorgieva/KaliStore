System.register(['aurelia-framework', 'dialog', 'repository', 'models'], function (_export) {
  'use strict';

  var inject, bindable, DialogController, MaterialsRepository, CategoriesRepository, Product, EditProductDialog;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_dialog) {
      DialogController = _dialog.DialogController;
    }, function (_repository) {
      MaterialsRepository = _repository.MaterialsRepository;
      CategoriesRepository = _repository.CategoriesRepository;
    }, function (_models) {
      Product = _models.Product;
    }],
    execute: function () {
      EditProductDialog = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(EditProductDialog, [{
          key: 'selectedPictures',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function EditProductDialog(dialogController, materialsRepository, categoriesRepository) {
          _classCallCheck(this, _EditProductDialog);

          _defineDecoratedPropertyDescriptor(this, 'selectedPictures', _instanceInitializers);

          this.currencies = ['BGN', 'EUR', 'USD'];

          this.dialogController = dialogController;
          this.materialsRepository = materialsRepository;
          this.categoriesRepository = categoriesRepository;

          this.materials = this.materialsRepository.getAll();
          this.categories = this.categoriesRepository.getAll();
        }

        _createDecoratedClass(EditProductDialog, [{
          key: 'activate',
          value: function activate(productData) {
            this.product = new Product(productData);
            this.product.materialsIds = this.product.materials.map(function (m) {
              return m.id.toString();
            });
            this.product.category = this.categoriesRepository.get(this.product.category.id);

            window.product = this.product;
          }
        }, {
          key: 'save',
          value: function save() {
            var _this = this;

            var productData = this.product.getCopy();
            productData.materials = this.product.materialsIds.map(function (mId) {
              return _this.materialsRepository.get(parseInt(mId));
            });
            productData.price.amount = parseFloat(productData.price.amount);
            productData.daysToMake = parseFloat(productData.daysToMake);
            this.dialogController.ok(productData);
          }
        }, {
          key: 'cancel',
          value: function cancel() {
            this.dialogController.cancel();
          }
        }, {
          key: 'selectedPicturesChanged',
          value: function selectedPicturesChanged() {
            this.product.pictures = this._fileListToArray(this.selectedPictures);
          }
        }, {
          key: 'deletePicture',
          value: function deletePicture(index) {
            this.product.pictures.splice(index, 1);
          }
        }, {
          key: 'deleteFirstPicture',
          value: function deleteFirstPicture() {}
        }, {
          key: '_fileListToArray',
          value: function _fileListToArray(fileList) {
            var files = [];
            if (!fileList) {
              return files;
            }
            for (var i = 0; i < fileList.length; i++) {
              files.push(fileList.item(i));
            }
            return files;
          }
        }], null, _instanceInitializers);

        var _EditProductDialog = EditProductDialog;
        EditProductDialog = inject(DialogController, MaterialsRepository, CategoriesRepository)(EditProductDialog) || EditProductDialog;
        return EditProductDialog;
      })();

      _export('EditProductDialog', EditProductDialog);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvYWRtaW4vcHJvZHVjdHMtbWFuYWdlbWVudC9lZGl0LXByb2R1Y3QtZGlhbG9nL2VkaXQtcHJvZHVjdC1kaWFsb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhGQU1hLGlCQUFpQjs7Ozs7Ozs7OztpQ0FOdEIsTUFBTTttQ0FBRSxRQUFROztpQ0FDaEIsZ0JBQWdCOzt3Q0FDaEIsbUJBQW1CO3lDQUFFLG9CQUFvQjs7d0JBQ3pDLE9BQU87OztBQUdGLHVCQUFpQjs7Ozs4QkFBakIsaUJBQWlCOzt1QkFDM0IsUUFBUTs7Ozs7QUFJRSxpQkFMQSxpQkFBaUIsQ0FLaEIsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUU7Ozs7O2VBRnpFLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDOztBQUdoQyxjQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDekMsY0FBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQy9DLGNBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQzs7QUFFakQsY0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkQsY0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEQ7OzhCQVpVLGlCQUFpQjs7aUJBY3BCLGtCQUFDLFdBQVcsRUFBRTtBQUNwQixnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4QyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTthQUFBLENBQUMsQ0FBQztBQUM3RSxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFHaEYsa0JBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUMvQjs7O2lCQUVHLGdCQUFHOzs7QUFDTCxnQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQyx1QkFBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO3FCQUN2RCxNQUFLLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBQSxDQUM1QyxDQUFDO0FBQ0YsdUJBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hFLHVCQUFXLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUQsZ0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDdkM7OztpQkFFSyxrQkFBRztBQUNQLGdCQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7V0FDaEM7OztpQkFFc0IsbUNBQUc7QUFDeEIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztXQUN0RTs7O2lCQUVZLHVCQUFDLEtBQUssRUFBQztBQUNsQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztXQUN4Qzs7O2lCQUVpQiw4QkFBRSxFQUVuQjs7O2lCQUVlLDBCQUFDLFFBQVEsRUFBRTtBQUN6QixnQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsZ0JBQUksQ0FBQyxRQUFRLEVBQUU7QUFDYixxQkFBTyxLQUFLLENBQUM7YUFDZDtBQUNELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QyxtQkFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7QUFDRCxtQkFBTyxLQUFLLENBQUM7V0FDZDs7O2lDQTFEVSxpQkFBaUI7QUFBakIseUJBQWlCLEdBRDdCLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUN2RCxpQkFBaUIsS0FBakIsaUJBQWlCO2VBQWpCLGlCQUFpQiIsImZpbGUiOiJhcmVhL2FkbWluL3Byb2R1Y3RzLW1hbmFnZW1lbnQvZWRpdC1wcm9kdWN0LWRpYWxvZy9lZGl0LXByb2R1Y3QtZGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSAnZGlhbG9nJztcclxuaW1wb3J0IHtNYXRlcmlhbHNSZXBvc2l0b3J5LCBDYXRlZ29yaWVzUmVwb3NpdG9yeX0gZnJvbSAncmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7UHJvZHVjdH0gZnJvbSAnbW9kZWxzJztcclxuXHJcbkBpbmplY3QoRGlhbG9nQ29udHJvbGxlciwgTWF0ZXJpYWxzUmVwb3NpdG9yeSwgQ2F0ZWdvcmllc1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBFZGl0UHJvZHVjdERpYWxvZyB7XHJcbiAgQGJpbmRhYmxlIHNlbGVjdGVkUGljdHVyZXM7XHJcbiAgXHJcbiAgY3VycmVuY2llcyA9IFsnQkdOJywgJ0VVUicsICdVU0QnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoZGlhbG9nQ29udHJvbGxlciwgbWF0ZXJpYWxzUmVwb3NpdG9yeSwgY2F0ZWdvcmllc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuZGlhbG9nQ29udHJvbGxlciA9IGRpYWxvZ0NvbnRyb2xsZXI7XHJcbiAgICB0aGlzLm1hdGVyaWFsc1JlcG9zaXRvcnkgPSBtYXRlcmlhbHNSZXBvc2l0b3J5O1xyXG4gICAgdGhpcy5jYXRlZ29yaWVzUmVwb3NpdG9yeSA9IGNhdGVnb3JpZXNSZXBvc2l0b3J5O1xyXG5cclxuICAgIHRoaXMubWF0ZXJpYWxzID0gdGhpcy5tYXRlcmlhbHNSZXBvc2l0b3J5LmdldEFsbCgpO1xyXG4gICAgdGhpcy5jYXRlZ29yaWVzID0gdGhpcy5jYXRlZ29yaWVzUmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICB9XHJcblxyXG4gIGFjdGl2YXRlKHByb2R1Y3REYXRhKSB7XHJcbiAgICB0aGlzLnByb2R1Y3QgPSBuZXcgUHJvZHVjdChwcm9kdWN0RGF0YSk7XHJcbiAgICB0aGlzLnByb2R1Y3QubWF0ZXJpYWxzSWRzID0gdGhpcy5wcm9kdWN0Lm1hdGVyaWFscy5tYXAobSA9PiBtLmlkLnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5wcm9kdWN0LmNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yaWVzUmVwb3NpdG9yeS5nZXQodGhpcy5wcm9kdWN0LmNhdGVnb3J5LmlkKTtcclxuICAgIFxyXG4gICAgLy90b2RvOiByZW1vdmUgdGhpc1xyXG4gICAgd2luZG93LnByb2R1Y3QgPSB0aGlzLnByb2R1Y3Q7XHJcbiAgfVxyXG4gIFxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCBwcm9kdWN0RGF0YSA9IHRoaXMucHJvZHVjdC5nZXRDb3B5KCk7XHJcbiAgICBwcm9kdWN0RGF0YS5tYXRlcmlhbHMgPSB0aGlzLnByb2R1Y3QubWF0ZXJpYWxzSWRzLm1hcChtSWQgPT5cclxuICAgICAgdGhpcy5tYXRlcmlhbHNSZXBvc2l0b3J5LmdldChwYXJzZUludChtSWQpKVxyXG4gICAgKTtcclxuICAgIHByb2R1Y3REYXRhLnByaWNlLmFtb3VudCA9IHBhcnNlRmxvYXQocHJvZHVjdERhdGEucHJpY2UuYW1vdW50KTtcclxuICAgIHByb2R1Y3REYXRhLmRheXNUb01ha2UgPSBwYXJzZUZsb2F0KHByb2R1Y3REYXRhLmRheXNUb01ha2UpO1xyXG4gICAgdGhpcy5kaWFsb2dDb250cm9sbGVyLm9rKHByb2R1Y3REYXRhKTtcclxuICB9XHJcbiAgXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgdGhpcy5kaWFsb2dDb250cm9sbGVyLmNhbmNlbCgpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0ZWRQaWN0dXJlc0NoYW5nZWQoKSB7XHJcbiAgICB0aGlzLnByb2R1Y3QucGljdHVyZXMgPSB0aGlzLl9maWxlTGlzdFRvQXJyYXkodGhpcy5zZWxlY3RlZFBpY3R1cmVzKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVBpY3R1cmUoaW5kZXgpe1xyXG4gICAgdGhpcy5wcm9kdWN0LnBpY3R1cmVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaXJzdFBpY3R1cmUoKXtcclxuICAgIC8vIHRvZG86XHJcbiAgfVxyXG5cclxuICBfZmlsZUxpc3RUb0FycmF5KGZpbGVMaXN0KSB7XHJcbiAgICBsZXQgZmlsZXMgPSBbXTtcclxuICAgIGlmICghZmlsZUxpc3QpIHtcclxuICAgICAgcmV0dXJuIGZpbGVzO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmaWxlcy5wdXNoKGZpbGVMaXN0Lml0ZW0oaSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVzO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
