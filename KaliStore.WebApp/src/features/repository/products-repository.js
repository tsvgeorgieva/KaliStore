import {localStorageManager} from 'service';

const productsKey = 'products';

export class ProductsRepository {
  constructor() {
    this.products = localStorageManager.get(productsKey);
    if (this.products === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.products = initialProducts;
    localStorageManager.save(productsKey, this.products);
  }

  get(id) {
    return this.products.find(p => p.id === id);
  }

  getAll() {
    return this.products;
  }

  getByQuery(query) {
    const lowerCaseQuery = query.toLocaleLowerCase();
    return this.products.filter(p => p.title.toLocaleLowerCase().indexOf(lowerCaseQuery) > -1);
  }

  getByCategory(categoryId) {
    return this.products.filter(p => p.category.id === categoryId);
  }
}

const initialProducts = [{
  id: 1,
  title: 'Пролетна картичка',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 10,
    currency: 'BGN'
  },
  rating: 4.1,
  materials: [{
    id: 1,
    name: 'Картон'
  }],
  size: '20см x 10см',
  picture: `assets/images/kartichka1.jpg`,
  category: {
    id: 1,
    name: 'Картички'
  },
  daysToMake: 2
}, {
  id: 2,
  title: 'Картичка с рози',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 10,
    currency: 'BGN'
  },
  rating: 4.7,
  materials: [{
    id: 1,
    name: 'Картон'
  }],
  size: '20см x 10см',
  picture: `assets/images/kartichka2.jpg`,
  category: {
    id: 1,
    name: 'Картички'
  },
  daysToMake: 2
}, {
  id: 3,
  title: 'Коледна картичка с елен',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 10,
    currency: 'BGN'
  },
  rating: 4.6,
  materials: [{
    id: 1,
    name: 'Картон'
  }, {
    id: 2,
    name: 'Брокат'
  }],
  size: '20см x 10см',
  picture: `assets/images/kartichka3.jpg`,
  category: {
    id: 1,
    name: 'Картички'
  },
  daysToMake: 2
}, {
  id: 4,
  title: 'Детска торта от картон',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 30,
    currency: 'BGN'
  },
  rating: 4.6,
  materials: [{
    id: 1,
    name: 'Картон'
  }, {
    id: 3,
    name: 'Стикери'
  }, {
    id: 4,
    name: 'Панделка'
  }],
  size: '40см x 40см x 20см',
  picture: `assets/images/torta.jpg`,
  category: {
    id: 2,
    name: 'Торти'
  },
  daysToMake: 5
}, {
  id: 5,
  title: 'Детска диадема',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 8,
    currency: 'BGN'
  },
  rating: 4.1,
  materials: [{
    id: 5,
    name: 'Мъниста'
  }, {
    id: 4,
    name: 'Панделка'
  }],
  size: 'стандартен',
  picture: `assets/images/diadema.jpg`,
  category: {
    id: 3,
    name: 'Аксесоари'
  },
  daysToMake: 3
}];
