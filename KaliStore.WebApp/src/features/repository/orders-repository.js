import {localStorageManager} from 'service';

const ordersKey = 'orders';

export class OrdersRepository {
  lastId = 0;

  constructor() {
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
    return this.orders.find(o => o.user.id === userId);
  }

  getAll() {
    return this.orders;
  }

  save(order) {
    order.id = ++this.lastId;
    this.orders.push(order);

    localStorageManager.save(ordersKey, this.orders);
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
    city: 'Пловдив',
    address: 'ул. Някоя си 72',
    client: {
      name: 'Иван Пешев',
      phoneNumber: '0988855'
    }
  },
  products: {
    1: 2,
    3: 1
  },
  totalPrice: {
    amount: 33.70,
    currency: 'BGN'
  },
  status: 'Доставена'
}];
