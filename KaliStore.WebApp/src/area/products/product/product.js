import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ProductsRepository, CartRepository} from 'repository';
import {AddProductToCartEvent} from 'events';

@inject(EventAggregator, ProductsRepository, CartRepository)
export class Product {
  similarProducts = [];

  constructor(eventAggregator, productsRepository, cartRepository) {
    this.eventAggregator = eventAggregator;
    this.productsRepository = productsRepository;
    this.cartRepository = cartRepository;
  }
  
  activate(routeParams) {
    this.product = this.productsRepository.get(parseInt(routeParams.productId));
    this.product.materialsList = this.product.materials.map(m => m.name).join(', ');
    this.setSimilarProducts();
  }

  addToCart() {
    this.cartRepository.add(this.product.id, 1);
    this.eventAggregator.publish(new AddProductToCartEvent(this.product, 1));
  }

  setSimilarProducts() {
    this.similarProducts = this.productsRepository.getByCategory(this.product.category.id).filter(p => p.id !== this.product.id);
  }
}
