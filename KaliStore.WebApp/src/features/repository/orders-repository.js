import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {HaikuHttp} from './../service/http-client/haiku-http';
import {mappers} from './mappers';
const ordersKey = 'orders';

@inject(HaikuHttp)
export class OrdersRepository {
  lastId = 0;

  constructor(http) {
    this.http = http;

    this.orders = localStorageManager.get(ordersKey);
    if (this.orders === undefined) {
      this.initialize();
    }

    this.lastId = this.orders.length;
  }

  initialize() {
    this.orders = initialOrders;

    localStorageManager.save(ordersKey, this.orders);
  }

  get(id) {
    return this.orders.find(o => o.id === id);
  }

  getByUserId(userId){
    return this.orders.filter(o => o.user.id === userId);
  }

  getAll() {
    return this.orders;
  }

  save(order) {
    return this.http.post('order/create', {order: order});
  }
}

const initialOrders = [{
  id: 1,
  user: {
    id: 1,
    userName: 'pesho',
    fullName: 'Pesho Peshev',
    city: {
      id: 1,
      name: 'София'
    },
    address: 'ул. Пършевица 5',
    phone: '2873278',
    email: 'pesho@abv.bg'
  },
  delivery: {
    city: {
      id: 2,
      name: 'Пловдив'
    },
    address: 'ул. Някоя си 72',
    client: {
      name: 'Иван Пешев',
      phoneNumber: '0988855'
    }
  },
  products: [{
      product: {
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
          title: 'Картички'
        },
        daysToMake: 2
      },
      quantity: 2
    }, {
      product: {
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
          title: 'Картички'
        },
        daysToMake: 2
      },
      quantity: 1
    }
  ],
  totalPrice: {
    amount: 33.70,
    currency: 'BGN'
  },
  status: 4
}, {
  id: 2,
  user: {
    id: 1,
    userName: 'pesho',
    fullName: 'Pesho Peshev',
    city: {
      id: 1,
      name: 'София'
    },
    address: 'ул. Пършевица 5',
    phone: '2873278',
    email: 'pesho@abv.bg'
  },
  delivery: {
    city: {
      id: 2,
      name: 'Пловдив'
    },
    address: 'ул. Някоя си 72',
    client: {
      name: 'Иван Пешев',
      phoneNumber: '0988855'
    }
  },
  products: [{
    product: {
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
        title: 'Аксесоари'
      },
      daysToMake: 3
    },
    quantity: 1
  }
  ],
  totalPrice: {
    amount: 11.70,
    currency: 'BGN'
  },
  status: 3
}];
