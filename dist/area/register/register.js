System.register(['aurelia-framework', 'aurelia-i18n', 'aurelia-router', 'service', 'models', 'repository'], function (_export) {
  'use strict';

  var inject, I18N, Router, Session, Logger, User, CitiesRepository, UsersRepository, Register;

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
      Register = (function () {
        function Register(session, logger, i18n, router, citiesRepository, usersRepository) {
          _classCallCheck(this, _Register);

          this.cities = [];

          this.session = session;
          this.logger = logger;
          this.i18n = i18n;
          this.router = router;
          this.citiesRepository = citiesRepository;
          this.usersRepository = usersRepository;

          this.user = new User();
          this.cities = this.citiesRepository.getAll();
        }

        _createClass(Register, [{
          key: 'register',
          value: function register() {
            if (!this.user.password || !this.user.userName) {
              this.logger.error(this.i18n.tr('register.fillAllRequiredFields'));
              return;
            }

            var sameUser = this.usersRepository.getByUserName(this.user.userName);
            if (sameUser !== undefined) {
              this.logger.error(this.i18n.tr('register.userNameTaken'));
              return;
            }

            if (this.user.password !== this.confirmPassword) {
              this.logger.error(this.i18n.tr('register.passwordsDoNotMatch'));
              return;
            }

            this.user.id = this.usersRepository.save(this.user.getData());
            this.session.loginUser(this.user.id);
            this.router.navigate('');
          }
        }]);

        var _Register = Register;
        Register = inject(Session, Logger, I18N, Router, CitiesRepository, UsersRepository)(Register) || Register;
        return Register;
      })();

      _export('Register', Register);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvcmVnaXN0ZXIvcmVnaXN0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NGQVFhLFFBQVE7Ozs7Ozs7O2lDQVJiLE1BQU07OzBCQUNOLElBQUk7OzhCQUNKLE1BQU07O3lCQUNOLE9BQU87d0JBQUUsTUFBTTs7cUJBQ2YsSUFBSTs7cUNBQ0osZ0JBQWdCO29DQUFFLGVBQWU7OztBQUc1QixjQUFRO0FBS1IsaUJBTEEsUUFBUSxDQUtQLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUU7OztlQUg5RSxNQUFNLEdBQUcsRUFBRTs7QUFJVCxjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDekMsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7O0FBRXZDLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM5Qzs7cUJBZlUsUUFBUTs7aUJBaUJYLG9CQUFHO0FBQ1QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQzlDLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7QUFDbEUscUJBQU87YUFDUjs7QUFFRCxnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0FBQzFCLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7QUFDMUQscUJBQU87YUFDUjs7QUFFRCxnQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQy9DLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7QUFDaEUscUJBQU87YUFDUjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQzlELGdCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUMxQjs7O3dCQXJDVSxRQUFRO0FBQVIsZ0JBQVEsR0FEcEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FDNUQsUUFBUSxLQUFSLFFBQVE7ZUFBUixRQUFRIiwiZmlsZSI6ImFyZWEvcmVnaXN0ZXIvcmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge0kxOE59IGZyb20gJ2F1cmVsaWEtaTE4bic7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7U2Vzc2lvbiwgTG9nZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuaW1wb3J0IHtVc2VyfSBmcm9tICdtb2RlbHMnO1xyXG5pbXBvcnQge0NpdGllc1JlcG9zaXRvcnksIFVzZXJzUmVwb3NpdG9yeX0gZnJvbSAncmVwb3NpdG9yeSc7XHJcblxyXG5AaW5qZWN0KFNlc3Npb24sIExvZ2dlciwgSTE4TiwgUm91dGVyLCBDaXRpZXNSZXBvc2l0b3J5LCBVc2Vyc1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlciB7XHJcbiAgY29uZmlybVBhc3N3b3JkO1xyXG4gIGNpdGllcyA9IFtdO1xyXG4gIHVzZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlciwgaTE4biwgcm91dGVyLCBjaXRpZXNSZXBvc2l0b3J5LCB1c2Vyc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XHJcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgIHRoaXMuaTE4biA9IGkxOG47XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgIHRoaXMuY2l0aWVzUmVwb3NpdG9yeSA9IGNpdGllc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLnVzZXJzUmVwb3NpdG9yeSA9IHVzZXJzUmVwb3NpdG9yeTtcclxuXHJcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgdGhpcy5jaXRpZXMgPSB0aGlzLmNpdGllc1JlcG9zaXRvcnkuZ2V0QWxsKCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlcigpIHtcclxuICAgIGlmICghdGhpcy51c2VyLnBhc3N3b3JkIHx8ICF0aGlzLnVzZXIudXNlck5hbWUpIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5pMThuLnRyKCdyZWdpc3Rlci5maWxsQWxsUmVxdWlyZWRGaWVsZHMnKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2FtZVVzZXIgPSB0aGlzLnVzZXJzUmVwb3NpdG9yeS5nZXRCeVVzZXJOYW1lKHRoaXMudXNlci51c2VyTmFtZSk7XHJcbiAgICBpZiAoc2FtZVVzZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmkxOG4udHIoJ3JlZ2lzdGVyLnVzZXJOYW1lVGFrZW4nKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy51c2VyLnBhc3N3b3JkICE9PSB0aGlzLmNvbmZpcm1QYXNzd29yZCkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmkxOG4udHIoJ3JlZ2lzdGVyLnBhc3N3b3Jkc0RvTm90TWF0Y2gnKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVzZXIuaWQgPSB0aGlzLnVzZXJzUmVwb3NpdG9yeS5zYXZlKHRoaXMudXNlci5nZXREYXRhKCkpO1xyXG4gICAgdGhpcy5zZXNzaW9uLmxvZ2luVXNlcih0aGlzLnVzZXIuaWQpO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJycpO1xyXG4gIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
