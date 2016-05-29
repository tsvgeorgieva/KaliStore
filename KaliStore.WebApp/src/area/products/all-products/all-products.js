import {inject} from 'aurelia-framework';
import {ProductsRepository} from 'repository';

@inject(ProductsRepository)
export class AllProducts {
  products = [];
  

  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  activate(routeParams) {
    this.searchQuery = routeParams.searchQuery;
    this.categoryId = routeParams.categoryId;

    if (this.searchQuery) {
      this.products = this.productsRepository.getByQuery(this.searchQuery);
    } else if (this.categoryId !== undefined && this.categoryId !== '') {
      this.categoryId = parseInt(this.categoryId);
      this.products = this.productsRepository.getByCategory(this.categoryId);
    } else {
      this.products = this.productsRepository.getAll();
    }
  }
}
