export class Payment {
  months = [];
  years = [];
  card = {};

  constructor() {
    this.months = [{id: 1, name: "01"}, {id: 2, name: "02"}, {id: 3, name: "03"},
                  {id: 4, name: "04"}, {id: 5, name: "05"}, {id: 6, name: "06"},
                  {id: 7, name: "07"}, {id: 8, name: "08"}, {id: 9, name: "09"},
                  {id: 10, name: "10"}, {id: 11, name: "11"}, {id: 12, name: "12"}];
    this.years = [{id: 2016, name: 2016}, {id: 2017, name: 2017}, {id: 2018, name: 2018},
                  {id: 2019, name: 2019}, {id: 2020, name: 2020}, {id: 2021, name: 2021},
                  {id: 2022, name: 2022}, {id: 2023, name: 2023}, {id: 2024, name: 2024}, {id: 2025, name: 2025}];
  }
}
