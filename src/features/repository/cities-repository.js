import {localStorageManager} from 'service';

const citiesKey = 'cities';

export class CitiesRepository {
  constructor() {
    this.cities = localStorageManager.get(citiesKey);
    if (this.cities === undefined) {
      this.initialize();
    }
  }

  initialize() {
    this.cities = initialCities;

    localStorageManager.save(citiesKey, this.cities);
  }

  get(id) {
    return this.cities.find(c => c.id === id);
  }

  getAll() {
    return this.cities;
  }
}

const initialCities = [
  {id: 1, name: "София"},
  {id: 2, name: "Пловдив"},
  {id: 3, name: "Варна"},
  {id: 4, name: "Бургас"},
  {id: 5, name: "Плевен"},
  {id: 6, name: "Стара Загора"},
  {id: 7, name: "Шумен"}
];
