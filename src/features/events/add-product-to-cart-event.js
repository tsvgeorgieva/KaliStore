export class AddProductToCartEvent {
  constructor(product, quantity){
    this.product = product;
    this.quantity = quantity;
  }
}
