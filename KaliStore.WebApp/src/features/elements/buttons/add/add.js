import {inject, customElement, bindable} from 'aurelia-framework';

@customElement('add-button')
@inject(Element)
export class AddButton {
  @bindable disabled = false;
  @bindable onClick = null;
  @bindable title = 'Добавяне';
  @bindable name = '';
  @bindable type='btn-default';

  constructor(element) {
    this.element = element;
  }

  buttonClicked() {
    if (typeof this.onClick === 'function') {
      this.onClick();
    }
  }
}

