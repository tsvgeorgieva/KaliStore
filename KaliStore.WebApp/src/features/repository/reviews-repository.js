import {localStorageManager} from 'service';
import moment from 'moment';

const reviewsKey = 'reviews';

export class ReviewsRepository {
  lastId = 0;

  constructor() {
    this.reviews = localStorageManager.get(reviewsKey);
    if (this.reviews === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.reviews = initialReviews;
    this.lastId = this.reviews.length;
    localStorageManager.save(reviewsKey, this.reviews);
  }

  save(review) {
    review.id = ++this.lastId;
    review.dateTimeAdded = moment();
    this.reviews.push(review);
    localStorageManager.save(reviewsKey, this.reviews);
    return review.id;
  }

  getRatingForProduct(productId) {
    const reviews = this.getAllForProduct(productId);
    return reviews.length === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }

  getAllForProduct(productId) {
    return this.reviews.filter(r => r.productId === productId).sort((r1, r2) => r1.dateTimeAdded < r2.dateTimeAdded);
  }
}

const initialReviews = [{
  id: 1,
  productId: 1,
  text: "Много красива",
  userId: 1,
  rating: 5,
  userName: "Пешо",
  dateTimeAdded: moment([2016, 4, 2, 11, 23, 44])
}, {
  id: 2,
  productId: 1,
  text: "Искам и аз! Страхотна е!",
  userId: -1,
  rating: 5,
  userName: "Галя",
  dateTimeAdded: moment([2016, 5, 12, 12, 34, 56])
}, {
  id: 3,
  productId: 1,
  text: "Ужас...",
  userId: -1,
  rating: 1,
  dateTimeAdded: moment([2016, 5, 10, 8, 4, 56])
}, {
  id: 4,
  productId: 2,
  text: "Много са скъпи! Иначе ми харесват...",
  userId: -1,
  rating: 2,
  userName: "Бедни сме",
  dateTimeAdded: moment([2016, 4, 1, 9, 9, 9])
}, {
  id: 5,
  productId: 2,
  text: "Страхотно качество! Препоръчвам, заслужават си всяка стотинка.",
  userId: -1,
  rating: 5,
  userName: "Венета",
  dateTimeAdded: moment([2016, 4, 23, 18, 9, 0])
}, {
  id: 6,
  productId: 2,
  text: "Бърза и качествена изработка. Препоръчвам!",
  userId: -1,
  rating: 5,
  userName: "Ангел",
  dateTimeAdded: moment([2016, 4, 17, 9, 9, 8])
}, {
  id: 7,
  productId: 3,
  text: "Уааауууу уникат!",
  userId: 1,
  rating: 5,
  userName: "Петя",
  dateTimeAdded: moment([2016, 4, 12, 1, 2, 3])
}
];
