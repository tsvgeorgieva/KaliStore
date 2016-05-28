import {AddProductToCartEvent} from 'events';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {ProductsRepository} from 'repository';

@inject(EventAggregator, ProductsRepository)
export class AllProducts {
  products = [];
  ratings = [5,4,3,2,1];

  constructor(eventAggregator, productsRepository) {
    this.eventAggregator = eventAggregator;
    this.productsRepository = productsRepository;
    this.products = this.productsRepository.getAll();
  }

  addToCart(product) {
    this.eventAggregator.publish(new AddProductToCartEvent(product, 1));
  }
}
