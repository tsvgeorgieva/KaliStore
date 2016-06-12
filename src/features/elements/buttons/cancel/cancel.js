import {inject, customElement, bindable} from 'aurelia-framework';

@customElement('cancel-button')
@inject(Element)
export class CancelButton {
  @bindable disabled = false;
  @bindable onClick = null;
  @bindable title = 'Отмяна';
  @bindable name = '';

  constructor(element) {
    this.element = element;
  }

  buttonClicked() {
    if (typeof this.onClick === 'function') {
      this.onClick();
    }
  }
}

