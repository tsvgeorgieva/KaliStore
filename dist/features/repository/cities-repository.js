System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, citiesKey, CitiesRepository, initialCities;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      citiesKey = 'cities';

      CitiesRepository = (function () {
        function CitiesRepository() {
          _classCallCheck(this, CitiesRepository);

          this.cities = localStorageManager.get(citiesKey);
          if (this.cities === undefined) {
            this.initialize();
          }
        }

        _createClass(CitiesRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.cities = initialCities;

            localStorageManager.save(citiesKey, this.cities);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.cities.find(function (c) {
              return c.id === id;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.cities;
          }
        }]);

        return CitiesRepository;
      })();

      _export('CitiesRepository', CitiesRepository);

      initialCities = [{ id: 1, name: "София" }, { id: 2, name: "Пловдив" }, { id: 3, name: "Варна" }, { id: 4, name: "Бургас" }, { id: 5, name: "Плевен" }, { id: 6, name: "Стара Загора" }, { id: 7, name: "Шумен" }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvY2l0aWVzLXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVNLFNBQVMsRUFFRixnQkFBZ0IsRUF1QnZCLGFBQWE7Ozs7Ozs7O3FDQTNCWCxtQkFBbUI7OztBQUVyQixlQUFTLEdBQUcsUUFBUTs7QUFFYixzQkFBZ0I7QUFDaEIsaUJBREEsZ0JBQWdCLEdBQ2I7Z0NBREgsZ0JBQWdCOztBQUV6QixjQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRCxjQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQzdCLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7U0FDRjs7cUJBTlUsZ0JBQWdCOztpQkFRakIsc0JBQUc7QUFDWCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7O0FBRTVCLCtCQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1dBQ2xEOzs7aUJBRUUsYUFBQyxFQUFFLEVBQUU7QUFDTixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7cUJBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO2FBQUEsQ0FBQyxDQUFDO1dBQzNDOzs7aUJBRUssa0JBQUc7QUFDUCxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1dBQ3BCOzs7ZUFwQlUsZ0JBQWdCOzs7OztBQXVCdkIsbUJBQWEsR0FBRyxDQUNwQixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUN0QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxFQUN4QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUN0QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUN2QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUN2QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxFQUM3QixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUN2QiIsImZpbGUiOiJmZWF0dXJlcy9yZXBvc2l0b3J5L2NpdGllcy1yZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmNvbnN0IGNpdGllc0tleSA9ICdjaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENpdGllc1JlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jaXRpZXMgPSBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChjaXRpZXNLZXkpO1xyXG4gICAgaWYgKHRoaXMuY2l0aWVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5jaXRpZXMgPSBpbml0aWFsQ2l0aWVzO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShjaXRpZXNLZXksIHRoaXMuY2l0aWVzKTtcclxuICB9XHJcblxyXG4gIGdldChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2l0aWVzLmZpbmQoYyA9PiBjLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaXRpZXM7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsQ2l0aWVzID0gW1xyXG4gIHtpZDogMSwgbmFtZTogXCLQodC+0YTQuNGPXCJ9LFxyXG4gIHtpZDogMiwgbmFtZTogXCLQn9C70L7QstC00LjQslwifSxcclxuICB7aWQ6IDMsIG5hbWU6IFwi0JLQsNGA0L3QsFwifSxcclxuICB7aWQ6IDQsIG5hbWU6IFwi0JHRg9GA0LPQsNGBXCJ9LFxyXG4gIHtpZDogNSwgbmFtZTogXCLQn9C70LXQstC10L1cIn0sXHJcbiAge2lkOiA2LCBuYW1lOiBcItCh0YLQsNGA0LAg0JfQsNCz0L7RgNCwXCJ9LFxyXG4gIHtpZDogNywgbmFtZTogXCLQqNGD0LzQtdC9XCJ9XHJcbl07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
