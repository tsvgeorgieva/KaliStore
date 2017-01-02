import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {HaikuHttp} from './../service/http-client/haiku-http';
import {mappers} from './mappers';

const citiesKey = 'cities';
@inject(HaikuHttp)
export class CitiesRepository {
  constructor(http) {
    this.http = http;

    this.cities = localStorageManager.get(citiesKey);
    if (this.cities === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.getAll();
  }

  get(id) {
    return this.cities.find(c => c.id === id);
  }

  getAll() {
    return this.http.get('city/allCities').then(response => {
      this.cities = mappers.objToArray(response.city);
      localStorageManager.save(citiesKey, this.cities);
      return this.cities;
    });
  }
}
