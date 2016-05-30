import {LocalStorageManager} from 'service';
import {inject} from 'aurelia-framework';

@inject(LocalStorageManager)
export class CategoriesRepository {
  constructor(localStorageManager) {
    this.localStorageManager = localStorageManager;
    this.categories = this.localStorageManager.get('categories');
    if (this.categories === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.categories = initialCategories;

    this.localStorageManager.save('categories', this.categories);
  }

  get(id) {
    return this.categories.find(c => c.id === id);
  }

  getAll() {
    return this.categories;
  }
}

const initialCategories = [{
  id: 1,
  title: 'Картички'
}, {
  id: 2,
  title: 'Торти'
}, {
  id: 3,
  title: 'Аксесоари'
}];
