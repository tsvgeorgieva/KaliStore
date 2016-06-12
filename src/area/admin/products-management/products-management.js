import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {ProductsRepository, CategoriesRepository} from 'repository';
import {DialogService} from 'dialog';
import {EditProductDialog} from './edit-product-dialog/edit-product-dialog';
import {Product} from 'models';

@inject(I18N, ProductsRepository, CategoriesRepository, DialogService)
export class ProductsManagement {
  products = [];
  categories = [];

  constructor(i18n, productsRepository, categoriesRepository, dialogService) {
    this.i18n = i18n;
    this.productsRepository = productsRepository;
    this.categoriesRepository = categoriesRepository;
    this.dialogService = dialogService;

    this.products = this.productsRepository.getAll();
    this.categories = this.categoriesRepository.getAll().slice();
    this.categories.unshift({id: undefined, name: this.i18n.tr('admin.productsManagement.allCategories')});

    window.products = this.products;
  }

  editProduct(product) {
    this.dialogService.openDialog({
      viewModel: EditProductDialog,
      model: new Product(product).getCopy(),
      centerHorizontalOnly: true
    }).then((result) => {
      if (!result.wasCancelled) {
        this.productsRepository.edit(result.output);
        this.products = this.productsRepository.getAll();
      }
    });
  }
}
