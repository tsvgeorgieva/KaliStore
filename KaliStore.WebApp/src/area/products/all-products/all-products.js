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
      this.productsRepository.getByQuery(this.searchQuery).then(products => {
        this.products = products;
      });
    } else if (this.categoryId !== undefined && this.categoryId !== '') {
      this.categoryId = parseInt(this.categoryId);
      this.productsRepository.getByCategory(this.categoryId).then(products => {
        this.products = products;
      });
    } else {
      this.productsRepository.getRecommendationsByRating().then(products => {
        this.products = products;
      });
    }
  }
}
