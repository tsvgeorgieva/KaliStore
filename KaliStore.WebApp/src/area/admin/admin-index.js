import {ChildRouter} from 'libs/child-router/child-router';
import {Session} from 'service';
import {inject, useView} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(Session, I18N)
@useView('libs/child-router/navbar-router.html')
//@useView('libs/child-router/null-router.html')
export class AdminIndex extends ChildRouter {
  constructor(session, i18n) {
    super(session);
    this.i18n = i18n;
    this.navModel = [{
      route: '',
      redirect: 'users-management'
    }, {
      route: 'users-management',
      name: 'users-management',
      moduleId: './users-management/users-management',
      title: this.i18n.tr('admin.usersManagement.title'),
      nav: true
    }, {
      route: 'categories-management',
      name: 'categories-management',
      moduleId: './categories-management/categories-management',
      title: this.i18n.tr('admin.categoriesManagement.title'),
      nav: true
    }, {
      route: 'materials-management',
      name: 'materials-management',
      moduleId: './materials-management/materials-management',
      title: this.i18n.tr('admin.materialsManagement.title'),
      nav: true
    }];
  }
}
