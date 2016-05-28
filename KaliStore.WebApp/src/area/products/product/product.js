export class Product {
  activate(routeParams) {
    this.productId = routeParams.productId;
  }

  addToCart(product) {
    this.eventAggregator.publish(new AddProductToCartEvent(product, 1));
  }
}
