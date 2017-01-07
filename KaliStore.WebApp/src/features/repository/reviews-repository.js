import {inject} from 'aurelia-framework';
import moment from 'moment';
import {HaikuHttp} from './../service/http-client/haiku-http';
import {mappers} from './mappers';

@inject(HaikuHttp)
export class ReviewsRepository {
  constructor(http) {
    this.http = http;
  }

  save(review) {
    review.creationDate = moment().format();
    return this.http.post('review/create', {review: review});
  }

  getAllForProduct(productId) {
    return this.http.get('review/allForProduct', {productId: productId}).then(response => {
      var reviews = mappers.objToArray(response.review).map(r => {
        r.dateTimeAdded = moment(r.creationDate);
        r.userName = r.user.username;
        return r;
      }).sort((r1, r2) => r1.dateTimeAdded < r2.dateTimeAdded);
      return reviews;
    });
  }
}
