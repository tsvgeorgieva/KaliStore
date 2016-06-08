import {inject} from 'aurelia-framework';
import {CitiesRepository} from 'repository';

@inject(CitiesRepository)
export class Checkout {
  checkoutStep = 1;
  cities = [];

  constructor(citiesRepository) {
    this.citiesRepository = citiesRepository;

    this.cities = this.citiesRepository.getAll();
  }
}
