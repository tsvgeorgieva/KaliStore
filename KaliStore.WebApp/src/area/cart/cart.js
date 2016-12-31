import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProductsRepository, CartRepository} from 'repository';
import {AddProductToCartEvent, RemoveProductFromCartEvent} from 'events';

@inject(EventAggregator, CartRepository, ProductsRepository)
export class Cart {
  totalPrice = {};

  constructor(eventAggregator, cartRepository, productsRepository) {
    this.eventAggregator = eventAggregator;
    this.cartRepository = cartRepository;
    this.productsRepository = productsRepository;
    this.cart = this.cartRepository.getAll();
    this.loadProducts();
  }

  loadProducts() {
    var productIds = Object.keys(this.cart).map(k => parseInt(k));
    this.productsRepository.getByIds(productIds).then(products => {
      this.products = products;
      this._loadProducts();
    })

  }

  _loadProducts() {
    this.cartProducts = Object.keys(this.cart).map(k => {
      return {product: this.products.find(p => p.id === parseInt(k)), quantity: this.cart[k]}
    });
    this.calculateTotalPrice();
  }

  removeProduct(cartProduct) {
    this.cartRepository.remove(cartProduct.product.id);
    this._loadProducts();
    this.eventAggregator.publish(new RemoveProductFromCartEvent(cartProduct.product, cartProduct.quantity));
  }

  changeProductQuantity(cartProduct) {
    const oldQuantity = this.cart[cartProduct.product.id];
    const newQuantity = parseInt(cartProduct.quantity);
    if (oldQuantity > newQuantity) {
      this.cartRepository.remove(cartProduct.product.id, oldQuantity - newQuantity);
      this.eventAggregator.publish(new RemoveProductFromCartEvent(cartProduct.product, oldQuantity - newQuantity));
    } else if (oldQuantity < newQuantity) {
      this.cartRepository.add(cartProduct.product.id, newQuantity - oldQuantity);
      this.eventAggregator.publish(new AddProductToCartEvent(cartProduct.product, newQuantity - oldQuantity));
    }

    this._loadProducts();
  }

  calculateTotalPrice() {
    this.totalPrice = {
      amount: this.cartProducts.reduce((total, cartProduct) => total + (cartProduct.quantity * cartProduct.product.price.amount), 0),
      currency: 'BGN'
    };
  }
}
