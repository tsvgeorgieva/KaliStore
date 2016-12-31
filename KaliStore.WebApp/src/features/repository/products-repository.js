import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {HaikuHttp} from './../service/http-client/haiku-http';
import {ReviewsRepository} from './reviews-repository';
import {mappers} from './mappers';

const productsKey = 'products';

@inject(ReviewsRepository, HaikuHttp)
export class ProductsRepository {
  editableProperties = [
    'title',
    'description',
    'price',
    'rating',
    'materials',
    'size',
    'picture',
    'category',
    'daysToMake'
  ];

  constructor(reviewsRepository, haikuHttp) {
    this.reviewsRepository = reviewsRepository;
    this.http = haikuHttp;

    this.products = [];
  }

  get(id) {
    return this.http.get('catalog/productById', {productId: id})
      .then(x => this._parseResponse(x)[0])
      .catch(x => console.log(x));
  }

  getAll(copy = false) {
    return this.http.get('catalog/allProducts')
      .then(x => this._parseResponse(x))
      .catch(x => console.log(x));
  }

  getByQuery(query) {
    const lowerCaseQuery = query.toLocaleLowerCase();
    return this.http.get('catalog/productsByQuery', {query: lowerCaseQuery})
      .then(x => this._parseResponse(x))
      .catch(x => console.log(x));
  }

  getByCategory(categoryId) {
    return this.http.get('catalog/productsByCategory', {categoryId: categoryId})
      .then(x => this._parseResponse(x))
      .catch(x => console.log(x));
  }

  save(productData) {
    const product = {};
    product.id = ++this.lastId;
    this.editableProperties.forEach(property => this._editProperty(product, productData, property));
    this.products.push(product);
    this._saveAllToLocalStorage();
    return product.id;
  }

  edit(productData) {
    const product = this.get(productData.id);
    this.editableProperties.forEach(property => this._editProperty(product, productData, property));
    this._saveAllToLocalStorage();
  }

  _saveAllToLocalStorage() {
    localStorageManager.save(productsKey, this.products);
  }

  _editProperty(product, productData, property) {
    product[property] = productData[property] || product[property];
  }

  _parseResponse(response){
    response.product = mappers.objToArray(response.product);
    response.product = response.product.map(p => {
      p.categories = mappers.objToArray(p.categories);
      p.materials = mappers.objToArray(p.materials);
      p.price = mappers.amountToPrice(p.price);
      p.rating = this.reviewsRepository.getRatingForProduct(p.id);
      return p;
    });

    return response.product;
  }
}
