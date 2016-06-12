System.register(['aurelia-framework', 'aurelia-i18n', 'aurelia-router', 'service', 'models', 'repository'], function (_export) {
  'use strict';

  var inject, I18N, Router, Session, Logger, User, CitiesRepository, UsersRepository, UserProfile;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_service) {
      Session = _service.Session;
      Logger = _service.Logger;
    }, function (_models) {
      User = _models.User;
    }, function (_repository) {
      CitiesRepository = _repository.CitiesRepository;
      UsersRepository = _repository.UsersRepository;
    }],
    execute: function () {
      UserProfile = (function () {
        function UserProfile(session, logger, i18n, router, citiesRepository, usersRepository) {
          _classCallCheck(this, _UserProfile);

          this.cities = [];

          this.session = session;
          this.logger = logger;
          this.i18n = i18n;
          this.citiesRepository = citiesRepository;
          this.usersRepository = usersRepository;

          this.user = new User(this.usersRepository.get(this.session.getUserId()));
          this.cities = this.citiesRepository.getAll();
        }

        _createClass(UserProfile, [{
          key: 'save',
          value: function save() {
            this.user.id = this.usersRepository.edit(this.user.getData());
          }
        }]);

        var _UserProfile = UserProfile;
        UserProfile = inject(Session, Logger, I18N, Router, CitiesRepository, UsersRepository)(UserProfile) || UserProfile;
        return UserProfile;
      })();

      _export('UserProfile', UserProfile);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0ZBUWEsV0FBVzs7Ozs7Ozs7aUNBUmhCLE1BQU07OzBCQUNOLElBQUk7OzhCQUNKLE1BQU07O3lCQUNOLE9BQU87d0JBQUUsTUFBTTs7cUJBQ2YsSUFBSTs7cUNBQ0osZ0JBQWdCO29DQUFFLGVBQWU7OztBQUc1QixpQkFBVztBQUtYLGlCQUxBLFdBQVcsQ0FLVixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFOzs7ZUFIOUUsTUFBTSxHQUFHLEVBQUU7O0FBSVQsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsY0FBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ3pDLGNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDOztBQUV2QyxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLGNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlDOztxQkFkVSxXQUFXOztpQkFnQmxCLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztXQUMvRDs7OzJCQWxCVSxXQUFXO0FBQVgsbUJBQVcsR0FEdkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FDNUQsV0FBVyxLQUFYLFdBQVc7ZUFBWCxXQUFXIiwiZmlsZSI6ImFyZWEvdXNlci1wcm9maWxlL3VzZXItcHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuaW1wb3J0IHtTZXNzaW9uLCBMb2dnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ21vZGVscyc7XHJcbmltcG9ydCB7Q2l0aWVzUmVwb3NpdG9yeSwgVXNlcnNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBJMThOLCBSb3V0ZXIsIENpdGllc1JlcG9zaXRvcnksIFVzZXJzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlIHtcclxuICBjb25maXJtUGFzc3dvcmQ7XHJcbiAgY2l0aWVzID0gW107XHJcbiAgdXNlcjtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyLCBpMThuLCByb3V0ZXIsIGNpdGllc1JlcG9zaXRvcnksIHVzZXJzUmVwb3NpdG9yeSkge1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgdGhpcy5pMThuID0gaTE4bjtcclxuICAgIHRoaXMuY2l0aWVzUmVwb3NpdG9yeSA9IGNpdGllc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLnVzZXJzUmVwb3NpdG9yeSA9IHVzZXJzUmVwb3NpdG9yeTtcclxuXHJcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcih0aGlzLnVzZXJzUmVwb3NpdG9yeS5nZXQodGhpcy5zZXNzaW9uLmdldFVzZXJJZCgpKSk7XHJcbiAgICB0aGlzLmNpdGllcyA9IHRoaXMuY2l0aWVzUmVwb3NpdG9yeS5nZXRBbGwoKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICB0aGlzLnVzZXIuaWQgPSB0aGlzLnVzZXJzUmVwb3NpdG9yeS5lZGl0KHRoaXMudXNlci5nZXREYXRhKCkpO1xyXG4gIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
