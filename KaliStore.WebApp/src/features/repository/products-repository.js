import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {MaterialsRepository} from './materials-repository';
import {CategoriesRepository} from './categories-repository';

const productsKey = 'products';

@inject(MaterialsRepository, CategoriesRepository)
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

  constructor(materialsRepository, categoriesRepository) {
    this.materialsRepository = materialsRepository;
    this.categoriesRepository = categoriesRepository;

    this.products = this._getAllFromLocalStorage();
    if (this.products.length === 0) {
      this._initialize();
    }
  }

  get(id) {
    return this.products.find(p => p.id === id);
  }

  getAll(copy = false) {
    if (copy) {
      return this._getAllFromLocalStorage();
    }

    return this.products;
  }

  getByQuery(query) {
    const lowerCaseQuery = query.toLocaleLowerCase();
    return this.products.filter(p => p.title.toLocaleLowerCase().indexOf(lowerCaseQuery) > -1);
  }

  getByCategory(categoryId) {
    return this.products.filter(p => p.category.id === categoryId);
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

  _initialize() {
    this.products = initialProducts.map(p => {
      p.materials = p.materials.map(m => this.materialsRepository.get(m.id));
      p.category = this.categoriesRepository.get(p.category.id);
      return p;
    });
    this._saveAllToLocalStorage();
  }

  _getAllFromLocalStorage() {
    return (localStorageManager.get(productsKey) || []).map(p => {
      p.materials = p.materials.map(m => this.materialsRepository.get(m.id));
      p.category = this.categoriesRepository.get(p.category.id);
      return p;
    });
  }

  _saveAllToLocalStorage() {
    localStorageManager.save(productsKey, this.products);
  }

  _editProperty(product, productData, property) {
    product[property] = productData[property] || product[property];
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
}, {
  id: 6,
  title: 'Ръчно изработена картонена торта',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 20,
    currency: 'BGN'
  },
  rating: 4.3,
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
  picture: `assets/images/torta2.jpg`,
  category: {
    id: 2,
    name: 'Торти'
  },
  daysToMake: 5
}, {
  id: 7,
  title: 'Огърлица със сърце',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 7,
    currency: 'BGN'
  },
  rating: 4.8,
  materials: [{
    id: 6,
    name: 'Въже'
  }, {
    id: 7,
    name: 'Висулка'
  }],
  size: 'стандартен',
  picture: `assets/images/gerdan.jpg`,
  category: {
    id: 3,
    name: 'Аксесоари'
  },
  daysToMake: 2
}, {
  id: 8,
  title: 'Гривна със сърце',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 7,
    currency: 'BGN'
  },
  rating: 4.8,
  materials: [{
    id: 5,
    name: 'Мъниста'
  }, {
    id: 7,
    name: 'Висулка'
  }],
  size: 'стандартен',
  picture: `assets/images/grivna.jpg`,
  category: {
    id: 3,
    name: 'Аксесоари'
  },
  daysToMake: 2
}, {
  id: 9,
  title: 'Обици',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: {
    amount: 8,
    currency: 'BGN'
  },
  rating: 5,
  materials: [{
    id: 6,
    name: 'Въже'
  }, {
    id: 7,
    name: 'Висулка'
  }],
  size: 'стандартен',
  picture: `assets/images/obici.jpg`,
  category: {
    id: 3,
    name: 'Аксесоари'
  },
  daysToMake: 3
}];
