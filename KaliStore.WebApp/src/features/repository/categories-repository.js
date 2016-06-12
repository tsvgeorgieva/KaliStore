import {localStorageManager} from 'service';

export class CategoriesRepository {
  constructor() {
    this.categories = localStorageManager.get('categories');
    if (this.categories === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.categories = initialCategories;

    localStorageManager.save('categories', this.categories);
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
  name: 'Картички'
}, {
  id: 2,
  name: 'Торти'
}, {
  id: 3,
  name: 'Аксесоари'
}];
