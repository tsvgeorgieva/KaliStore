import {inject} from 'aurelia-framework';
import {ProductsRepository} from 'repository';

@inject(ProductsRepository)
export class AllProducts {
  products = [];
  ratings = [5,4,3,2,1];

  constructor(productsRepository) {
    this.productsRepository = productsRepository;
    this.products = this.productsRepository.getAll();
  }

}
