import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {HaikuHttp} from './../service/http-client/haiku-http';
import {mappers} from './mappers';

const officesKey = 'offices';

@inject(HaikuHttp)
export class OfficesRepository {
  constructor(http) {
    this.http = http;

    this.offices = localStorageManager.get(officesKey);
    if (this.offices === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.getAll();
  }

  get(id) {
    return this.offices.find(c => c.id === id);
  }

  getAll() {
    return this.http.get('office/allOffices').then(response => {
      this.offices = mappers.objToArray(response.office);
      localStorageManager.save(officesKey, this.offices);
      return this.offices;
    });
  }
}
