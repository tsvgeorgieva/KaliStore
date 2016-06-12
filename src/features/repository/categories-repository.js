import {localStorageManager} from 'service';

const categoriesKey = 'categories';

export class CategoriesRepository {
  constructor() {
    this.categories = localStorageManager.get(categoriesKey);
    if (this.categories === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.categories = initialCategories;

    localStorageManager.save(categoriesKey, this.categories);
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
