import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {ProductsRepository, CartRepository, ReviewsRepository} from 'repository';
import {AddProductToCartEvent} from 'events';
import {Session} from 'service';

@inject(EventAggregator, ProductsRepository, CartRepository, ReviewsRepository, Session, I18N)
export class Product {
  similarProducts = [];
  review = {rating: 0, user: {}};
  currentUser = {};
  reviews = [];
  showAddReviewForm = false;

  constructor(eventAggregator, productsRepository, cartRepository, reviewsRepository, session, i18n) {
    this.eventAggregator = eventAggregator;
    this.productsRepository = productsRepository;
    this.cartRepository = cartRepository;
    this.reviewsRepository = reviewsRepository;
    this.session = session;
    this.i18n = i18n;

    this.currentUser = this.session.isUserLoggedIn() ? this.session.getUser() : {};
  }

  activate(routeParams) {
    return this.productsRepository.get(parseInt(routeParams.productId)).then(product => {
      this.product = product;
      this.product.materialsList = this.product.materials.map(m => m.name).join(', ');
      this.product.categoriesList = this.product.categories.map(c => c.name).join(', ');
      this.setSimilarProducts();
      this.reviewsRepository.getAllForProduct(this.product.id).then(reviews => {
        this.reviews = reviews;
      });
    });
  }

  addToCart() {
    this.cartRepository.add(this.product.id, 1);
    this.eventAggregator.publish(new AddProductToCartEvent(this.product, 1));
  }

  setSimilarProducts() {
    // todo: fix this.product.categories[0]
    this.productsRepository.getByCategory(this.product.categories[0].id).then(products => {
      this.similarProducts = products.filter(p => p.id !== this.product.id);
    });
  }

  rate(rateValue) {
    this.review.rating = rateValue;
  }

  saveReview() {
    this.review.user = {
      id: this.currentUser.id || -1,
      fullName: this.review.user.fullName || this.currentUser.fullName || this.i18n.tr('reviews.anonymous')
    };
    this.review.product = {id: this.product.id};

    this.reviewsRepository.save(this.review).then(() => {
      this.review = {rating: 0};
      this.reviewsRepository.getAllForProduct(this.product.id).then(reviews => {
        this.reviews = reviews;
      });
      //this.product.rating = this.reviewsRepository.getRatingForProduct(this.product.id);

      this.showAddReviewForm = false;
    });
  }

  addReviewClick() {
    this.showAddReviewForm = true;
  }
}
