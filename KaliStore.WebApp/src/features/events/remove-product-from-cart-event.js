export class RemoveProductFromCartEvent {
  constructor(product, quantity){
    this.product = product;
    this.quantity = quantity;
  }
}
