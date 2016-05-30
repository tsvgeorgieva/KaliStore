import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ProductsRepository} from 'repository';
import {AddProductToCartEvent} from 'events';

@inject(EventAggregator, ProductsRepository)
export class Product {
  constructor(eventAggregator, productsRepository) {
    this.eventAggregator = eventAggregator;
    this.productsRepository = productsRepository;
  }
  
  activate(routeParams) {
    this.product = this.productsRepository.get(parseInt(routeParams.productId));
    this.product.materialsList = this.product.materials.map(m => m.name).join(', ');
    this.setSimilarProducts();
  }

  addToCart() {
    this.eventAggregator.publish(new AddProductToCartEvent(this.product, 1));
  }

  setSimilarProducts() {
    this.similarProducts = this.productsRepository.getByCategory(this.product.category.id).filter(p => p.id !== this.product.id);
  }
}
