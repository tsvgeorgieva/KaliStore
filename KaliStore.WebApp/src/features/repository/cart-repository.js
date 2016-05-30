import {LocalStorageManager} from 'service';
import {inject} from 'aurelia-framework';

const cartKey = 'cart';

@inject(LocalStorageManager)
export class CartRepository {
  constructor(localStorageManager) {
    this.localStorageManager = localStorageManager;
    this.cart = this.localStorageManager.get(cartKey) || {};
  }

  add(productId, quantity) {
    if (this.cart[productId] !== undefined) {
      this.cart[productId] += quantity;
    } else {
      this.cart[productId] = quantity;
    }
    this.localStorageManager.save(cartKey, this.cart);
  }

  remove(productId, quantity) {
    if (quantity !== undefined) {
      this.cart[productId] -= quantity;
      if (this.cart[productId] <= 0) {
        delete this.cart[productId];
      }
    } else {
      delete this.cart[productId];
    }
    this.localStorageManager.save(cartKey, this.cart);
  }

  getAll() {
    return this.cart;
  }
}
