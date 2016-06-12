import {inject, customElement, bindable} from 'aurelia-framework';
import {customElementHelper} from 'utils';

@customElement('rating')
@inject(Element)
export class Rating {
  @bindable rating = 0;
  @bindable readonly = false;
  @bindable options = {};
  
  defaultOptions = {
    maxRating: 5,
    minRating: 1
  };

  ratings = [];

  constructor(element) {
    this.element = element;
  }

  bind() {
    this.options = Object.assign({}, this.defaultOptions, this.options);
    this.ratings = Rating.getReverseArray(this.options.minRating, this.options.maxRating);
  }

  rate(rateValue) {
    if (this.readonly === false) {
      customElementHelper.dispatchEvent(this.element, 'rate', {
        rateValue: rateValue
      });
    }
  }

  static getReverseArray(min, max) {
    let ratings = [];
    for (let i = max; i >= min; i--) {
      ratings.push(i);
    }

    return ratings;
  }
}
