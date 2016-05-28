import {AddProductToCartEvent} from 'events';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class AllProducts {
  products = [];
  ratings = [5,4,3,2,1];

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.products = this.generateProducts(5);
  }

  addToCart(product) {
    this.eventAggregator.publish(new AddProductToCartEvent(product, 1));
  }
  

  // =========Mocks==========
  generateProducts(count = 10) {
    let products = [];
    let materials = ["Картон", "Сатенена панделка", "Стъкло"];
    let pics = ["kartichka1", "kartichka2", "kartichka3", "torta", "diadema"];
    for (let i = 1; i <= count; i++) {
      products.push({
        id: i,
        title: "Продукт " + i,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: {
          amount: this.getRandom(15, 1),
          currency: 'BGN'
        },
        rating: this.getRandom(5, 3.5),
        material: materials[this.getIntRandom(materials.length - 1, 0)],
        size: "10см x 10см",
        picture: `assets/images/${pics[i - 1]}.jpg`
      });
    }

    return products;
  }

  getRandom(max, min) {
    return min +  (max - min) * Math.random();
  }

  getIntRandom(max, min) {
    return Math.floor(this.getRandom(max, min));
  }
}
