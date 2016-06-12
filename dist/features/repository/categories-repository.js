System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, categoriesKey, CategoriesRepository, initialCategories;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      categoriesKey = 'categories';

      CategoriesRepository = (function () {
        function CategoriesRepository() {
          _classCallCheck(this, CategoriesRepository);

          this.categories = localStorageManager.get(categoriesKey);
          if (this.categories === undefined) {
            this.initialize();
          }
        }

        _createClass(CategoriesRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.categories = initialCategories;

            localStorageManager.save(categoriesKey, this.categories);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.categories.find(function (c) {
              return c.id === id;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.categories;
          }
        }]);

        return CategoriesRepository;
      })();

      _export('CategoriesRepository', CategoriesRepository);

      initialCategories = [{
        id: 1,
        name: 'Картички'
      }, {
        id: 2,
        name: 'Торти'
      }, {
        id: 3,
        name: 'Аксесоари'
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvY2F0ZWdvcmllcy1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzsyQkFFTSxhQUFhLEVBRU4sb0JBQW9CLEVBdUIzQixpQkFBaUI7Ozs7Ozs7O3FDQTNCZixtQkFBbUI7OztBQUVyQixtQkFBYSxHQUFHLFlBQVk7O0FBRXJCLDBCQUFvQjtBQUNwQixpQkFEQSxvQkFBb0IsR0FDakI7Z0NBREgsb0JBQW9COztBQUU3QixjQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6RCxjQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO0FBQ2pDLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7U0FDRjs7cUJBTlUsb0JBQW9COztpQkFRckIsc0JBQUc7QUFDWCxnQkFBSSxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQzs7QUFFcEMsK0JBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7V0FDMUQ7OztpQkFFRSxhQUFDLEVBQUUsRUFBRTtBQUNOLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7YUFBQSxDQUFDLENBQUM7V0FDL0M7OztpQkFFSyxrQkFBRztBQUNQLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7V0FDeEI7OztlQXBCVSxvQkFBb0I7Ozs7O0FBdUIzQix1QkFBaUIsR0FBRyxDQUFDO0FBQ3pCLFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFVBQVU7T0FDakIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLE9BQU87T0FDZCxFQUFFO0FBQ0QsVUFBRSxFQUFFLENBQUM7QUFDTCxZQUFJLEVBQUUsV0FBVztPQUNsQixDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3JlcG9zaXRvcnkvY2F0ZWdvcmllcy1yZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmNvbnN0IGNhdGVnb3JpZXNLZXkgPSAnY2F0ZWdvcmllcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcmllc1JlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jYXRlZ29yaWVzID0gbG9jYWxTdG9yYWdlTWFuYWdlci5nZXQoY2F0ZWdvcmllc0tleSk7XHJcbiAgICBpZiAodGhpcy5jYXRlZ29yaWVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5jYXRlZ29yaWVzID0gaW5pdGlhbENhdGVnb3JpZXM7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKGNhdGVnb3JpZXNLZXksIHRoaXMuY2F0ZWdvcmllcyk7XHJcbiAgfVxyXG5cclxuICBnZXQoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmNhdGVnb3JpZXMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNhdGVnb3JpZXM7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsQ2F0ZWdvcmllcyA9IFt7XHJcbiAgaWQ6IDEsXHJcbiAgbmFtZTogJ9Ca0LDRgNGC0LjRh9C60LgnXHJcbn0sIHtcclxuICBpZDogMixcclxuICBuYW1lOiAn0KLQvtGA0YLQuCdcclxufSwge1xyXG4gIGlkOiAzLFxyXG4gIG5hbWU6ICfQkNC60YHQtdGB0L7QsNGA0LgnXHJcbn1dO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
