import {localStorageManager} from 'service';

const officesKey = 'offices';

export class OfficesRepository {
  constructor() {
    this.offices = localStorageManager.get(officesKey);
    if (this.offices === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.offices = initialOffices;

    localStorageManager.save(officesKey, this.offices);
  }

  get(id) {
    return this.offices.find(c => c.id === id);
  }

  getAll() {
    return this.offices;
  }
}

const initialOffices = [
  {id: 1, name: "Econt офис 1"},
  {id: 2, name: "Econt офис 2"},
  {id: 3, name: "Econt офис 3"},
  {id: 4, name: "Speedy офис 1"},
  {id: 5, name: "Speedy офис 1"}
];
