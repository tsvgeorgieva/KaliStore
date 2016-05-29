import {ChildRouter} from 'libs/child-router/child-router';
import {Session} from 'service';
import {inject, useView} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(Session, I18N)
//@useView('libs/child-router/tabs-router.html')
@useView('libs/child-router/null-router.html')
export class ProductsIndex extends ChildRouter {
  constructor(session, i18n) {
    super(session);
    this.i18n = i18n;
    this.navModel = [{
      route: '',
      redirect: 'all-products'
    }, {
      route: ['all-products', 'all-products/:searchQuery'],
      name: 'all-products',
      moduleId: './all-products/all-products',
      nav: false
    }, {
      route: ':productId',
      name: 'product',
      moduleId: './product/product'
    }];
  }
}
