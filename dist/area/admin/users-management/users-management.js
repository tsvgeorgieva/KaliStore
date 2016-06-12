System.register(['aurelia-framework', 'aurelia-i18n', 'service', 'models', 'repository'], function (_export) {
  'use strict';

  var inject, I18N, Session, Logger, User, UsersRepository, UsersManagement;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_service) {
      Session = _service.Session;
      Logger = _service.Logger;
    }, function (_models) {
      User = _models.User;
    }, function (_repository) {
      UsersRepository = _repository.UsersRepository;
    }],
    execute: function () {
      UsersManagement = (function () {
        function UsersManagement(session, logger, i18n, usersRepository) {
          _classCallCheck(this, _UsersManagement);

          this.users = [];

          this.session = session;
          this.logger = logger;
          this.i18n = i18n;
          this.usersRepository = usersRepository;

          this.users = this.usersRepository.getAll().map(function (u) {
            return new User(u);
          });
        }

        _createClass(UsersManagement, [{
          key: 'block',
          value: function block(user) {
            user.isBlocked = true;
            this.usersRepository.block(user.id);
          }
        }, {
          key: 'unblock',
          value: function unblock(user) {
            user.isBlocked = false;
            this.usersRepository.unblock(user.id);
          }
        }]);

        var _UsersManagement = UsersManagement;
        UsersManagement = inject(Session, Logger, I18N, UsersRepository)(UsersManagement) || UsersManagement;
        return UsersManagement;
      })();

      _export('UsersManagement', UsersManagement);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvYWRtaW4vdXNlcnMtbWFuYWdlbWVudC91c2Vycy1tYW5hZ2VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0REFPYSxlQUFlOzs7Ozs7OztpQ0FQcEIsTUFBTTs7MEJBQ04sSUFBSTs7eUJBQ0osT0FBTzt3QkFBRSxNQUFNOztxQkFDZixJQUFJOztvQ0FDSixlQUFlOzs7QUFHVixxQkFBZTtBQUdmLGlCQUhBLGVBQWUsQ0FHZCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUU7OztlQUZwRCxLQUFLLEdBQUcsRUFBRTs7QUFHUixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQzs7QUFFdkMsY0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7bUJBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1dBQUEsQ0FBQyxDQUFDO1NBQ2xFOztxQkFWVSxlQUFlOztpQkFZckIsZUFBQyxJQUFJLEVBQUM7QUFDVCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUNyQzs7O2lCQUVNLGlCQUFDLElBQUksRUFBQztBQUNYLGdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2QixnQkFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1dBQ3ZDOzs7K0JBcEJVLGVBQWU7QUFBZix1QkFBZSxHQUQzQixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQ2xDLGVBQWUsS0FBZixlQUFlO2VBQWYsZUFBZSIsImZpbGUiOiJhcmVhL2FkbWluL3VzZXJzLW1hbmFnZW1lbnQvdXNlcnMtbWFuYWdlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7STE4Tn0gZnJvbSAnYXVyZWxpYS1pMThuJztcclxuaW1wb3J0IHtTZXNzaW9uLCBMb2dnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ21vZGVscyc7XHJcbmltcG9ydCB7VXNlcnNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBJMThOLCBVc2Vyc1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBVc2Vyc01hbmFnZW1lbnQge1xyXG4gIHVzZXJzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlciwgaTE4biwgdXNlcnNSZXBvc2l0b3J5KSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xyXG4gICAgdGhpcy51c2Vyc1JlcG9zaXRvcnkgPSB1c2Vyc1JlcG9zaXRvcnk7XHJcblxyXG4gICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnNSZXBvc2l0b3J5LmdldEFsbCgpLm1hcCh1ID0+IG5ldyBVc2VyKHUpKTtcclxuICB9XHJcbiAgXHJcbiAgYmxvY2sodXNlcil7XHJcbiAgICB1c2VyLmlzQmxvY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLnVzZXJzUmVwb3NpdG9yeS5ibG9jayh1c2VyLmlkKTtcclxuICB9XHJcblxyXG4gIHVuYmxvY2sodXNlcil7XHJcbiAgICB1c2VyLmlzQmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy51c2Vyc1JlcG9zaXRvcnkudW5ibG9jayh1c2VyLmlkKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
