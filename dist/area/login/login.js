System.register(['aurelia-framework', 'aurelia-i18n', 'aurelia-router', 'service', 'repository', 'enum'], function (_export) {
  'use strict';

  var inject, I18N, Router, Session, Logger, UsersRepository, accessRight, Login;

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
    }, function (_repository) {
      UsersRepository = _repository.UsersRepository;
    }, function (_enum) {
      accessRight = _enum.accessRight;
    }],
    execute: function () {
      Login = (function () {
        function Login(session, logger, i18n, router, usersRepository) {
          _classCallCheck(this, _Login);

          this.session = session;
          this.logger = logger;
          this.i18n = i18n;
          this.router = router;
          this.usersRepository = usersRepository;
        }

        _createClass(Login, [{
          key: 'login',
          value: function login() {
            var user = this.usersRepository.getByUserName(this.userName);
            if (user !== undefined && user.isBlocked !== true && this.password === user.password) {
              this.session.loginUser(user.id);
              if (this.session.userHasAccessRight(accessRight.adminPanel)) {
                this.router.navigate('admin');
              } else {
                this.router.navigate('');
              }
            } else {
              this.logger.error(this.i18n.tr('login.loginUnsuccessful'));
            }
          }
        }]);

        var _Login = Login;
        Login = inject(Session, Logger, I18N, Router, UsersRepository)(Login) || Login;
        return Login;
      })();

      _export('Login', Login);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvbG9naW4vbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJFQVFhLEtBQUs7Ozs7Ozs7O2lDQVJWLE1BQU07OzBCQUNOLElBQUk7OzhCQUNKLE1BQU07O3lCQUNOLE9BQU87d0JBQUUsTUFBTTs7b0NBQ2YsZUFBZTs7MEJBQ2YsV0FBVzs7O0FBR04sV0FBSztBQUlMLGlCQUpBLEtBQUssQ0FJSixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFOzs7QUFDMUQsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7U0FDeEM7O3FCQVZVLEtBQUs7O2lCQVlYLGlCQUFHO0FBQ04sZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNwRixrQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLGtCQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzNELG9CQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztlQUMvQixNQUFNO0FBQ0wsb0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2VBQzFCO2FBQ0YsTUFBTTtBQUNMLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7YUFDNUQ7V0FDRjs7O3FCQXhCVSxLQUFLO0FBQUwsYUFBSyxHQURqQixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUMxQyxLQUFLLEtBQUwsS0FBSztlQUFMLEtBQUsiLCJmaWxlIjoiYXJlYS9sb2dpbi9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuaW1wb3J0IHtTZXNzaW9uLCBMb2dnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJzUmVwb3NpdG9yeX0gZnJvbSAncmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7YWNjZXNzUmlnaHR9IGZyb20gJ2VudW0nO1xyXG5cclxuQGluamVjdChTZXNzaW9uLCBMb2dnZXIsIEkxOE4sIFJvdXRlciwgVXNlcnNSZXBvc2l0b3J5KVxyXG5leHBvcnQgY2xhc3MgTG9naW4ge1xyXG4gIHVzZXJOYW1lO1xyXG4gIHBhc3N3b3JkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGkxOG4sIHJvdXRlciwgdXNlcnNSZXBvc2l0b3J5KSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xyXG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICB0aGlzLnVzZXJzUmVwb3NpdG9yeSA9IHVzZXJzUmVwb3NpdG9yeTtcclxuICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgbGV0IHVzZXIgPSB0aGlzLnVzZXJzUmVwb3NpdG9yeS5nZXRCeVVzZXJOYW1lKHRoaXMudXNlck5hbWUpO1xyXG4gICAgaWYgKHVzZXIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLmlzQmxvY2tlZCAhPT0gdHJ1ZSAmJiB0aGlzLnBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbi5sb2dpblVzZXIodXNlci5pZCk7XHJcbiAgICAgIGlmICh0aGlzLnNlc3Npb24udXNlckhhc0FjY2Vzc1JpZ2h0KGFjY2Vzc1JpZ2h0LmFkbWluUGFuZWwpKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJ2FkbWluJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJycpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmkxOG4udHIoJ2xvZ2luLmxvZ2luVW5zdWNjZXNzZnVsJykpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
