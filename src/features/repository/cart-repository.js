import {localStorageManager} from 'service';

const cartKey = 'cart';

export class CartRepository {
  constructor() {
    this.cart = localStorageManager.get(cartKey) || {};
  }

  add(productId, quantity) {
    if (this.cart[productId] !== undefined) {
      this.cart[productId] += quantity;
    } else {
      this.cart[productId] = quantity;
    }
    localStorageManager.save(cartKey, this.cart);
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
    localStorageManager.save(cartKey, this.cart);
  }

  getAll() {
    return this.cart;
  }

  empty() {
    localStorageManager.clear(cartKey);
    this.cart = {};
  }
}
