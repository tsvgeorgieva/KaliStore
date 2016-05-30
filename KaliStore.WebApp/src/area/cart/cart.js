import {inject} from 'aurelia-framework';
import {ProductsRepository} from 'repository';
import {CartRepository} from 'repository';

@inject(CartRepository, ProductsRepository)
export class Cart {
  constructor(cartRepository, productsRepository) {
    this.cartRepository = cartRepository;
    this.productsRepository = productsRepository;
    this.cart = this.cartRepository.getAll();
    this.loadProducts();
  }
  
  loadProducts() {
    this.cartProducts = Object.keys(this.cart).map(k => {
      return {product: this.productsRepository.get(parseInt(k)), quantity: this.cart[k]}
    });
  }
}
