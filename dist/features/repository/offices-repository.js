System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, officesKey, OfficesRepository, initialOffices;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      officesKey = 'offices';

      OfficesRepository = (function () {
        function OfficesRepository() {
          _classCallCheck(this, OfficesRepository);

          this.offices = localStorageManager.get(officesKey);
          if (this.offices === undefined) {
            this.initialize();
          }
        }

        _createClass(OfficesRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.offices = initialOffices;

            localStorageManager.save(officesKey, this.offices);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.offices.find(function (c) {
              return c.id === id;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.offices;
          }
        }]);

        return OfficesRepository;
      })();

      _export('OfficesRepository', OfficesRepository);

      initialOffices = [{ id: 1, name: "Econt офис 1" }, { id: 2, name: "Econt офис 2" }, { id: 3, name: "Econt офис 3" }, { id: 4, name: "Speedy офис 1" }, { id: 5, name: "Speedy офис 1" }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvb2ZmaWNlcy1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzsyQkFFTSxVQUFVLEVBRUgsaUJBQWlCLEVBdUJ4QixjQUFjOzs7Ozs7OztxQ0EzQlosbUJBQW1COzs7QUFFckIsZ0JBQVUsR0FBRyxTQUFTOztBQUVmLHVCQUFpQjtBQUNqQixpQkFEQSxpQkFBaUIsR0FDZDtnQ0FESCxpQkFBaUI7O0FBRTFCLGNBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25ELGNBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7QUFDOUIsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjtTQUNGOztxQkFOVSxpQkFBaUI7O2lCQVFsQixzQkFBRztBQUNYLGdCQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzs7QUFFOUIsK0JBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7V0FDcEQ7OztpQkFFRSxhQUFDLEVBQUUsRUFBRTtBQUNOLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7YUFBQSxDQUFDLENBQUM7V0FDNUM7OztpQkFFSyxrQkFBRztBQUNQLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7V0FDckI7OztlQXBCVSxpQkFBaUI7Ozs7O0FBdUJ4QixvQkFBYyxHQUFHLENBQ3JCLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLEVBQzdCLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLEVBQzdCLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLEVBQzdCLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLEVBQzlCLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQy9CIiwiZmlsZSI6ImZlYXR1cmVzL3JlcG9zaXRvcnkvb2ZmaWNlcy1yZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmNvbnN0IG9mZmljZXNLZXkgPSAnb2ZmaWNlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlc1JlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5vZmZpY2VzID0gbG9jYWxTdG9yYWdlTWFuYWdlci5nZXQob2ZmaWNlc0tleSk7XHJcbiAgICBpZiAodGhpcy5vZmZpY2VzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5vZmZpY2VzID0gaW5pdGlhbE9mZmljZXM7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKG9mZmljZXNLZXksIHRoaXMub2ZmaWNlcyk7XHJcbiAgfVxyXG5cclxuICBnZXQoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLm9mZmljZXMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLm9mZmljZXM7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsT2ZmaWNlcyA9IFtcclxuICB7aWQ6IDEsIG5hbWU6IFwiRWNvbnQg0L7RhNC40YEgMVwifSxcclxuICB7aWQ6IDIsIG5hbWU6IFwiRWNvbnQg0L7RhNC40YEgMlwifSxcclxuICB7aWQ6IDMsIG5hbWU6IFwiRWNvbnQg0L7RhNC40YEgM1wifSxcclxuICB7aWQ6IDQsIG5hbWU6IFwiU3BlZWR5INC+0YTQuNGBIDFcIn0sXHJcbiAge2lkOiA1LCBuYW1lOiBcIlNwZWVkeSDQvtGE0LjRgSAxXCJ9XHJcbl07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
