import {inject} from 'aurelia-framework';
import {Session} from 'service';
import {OrdersRepository} from 'repository';

@inject(Session, OrdersRepository)
export class MyOrders {
  constructor(session, ordersRepository) {
    this.session = session;
    this.ordersRepository = ordersRepository;
    this.loadCurrentUserOrders();
  }
  
  loadCurrentUserOrders() {
    this.ordersRepository.getByUserId(this.session.getUserId()).then(orders => {
      this.orders = orders;
    });
  }
}
