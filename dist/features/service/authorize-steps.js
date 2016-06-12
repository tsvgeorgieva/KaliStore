System.register(['aurelia-framework', './session', './logger', './locale', './config', 'aurelia-router'], function (_export) {
  'use strict';

  var inject, Session, Logger, Locale, Config, Redirect, BaseAuthorizeStep, RolesAuthorizeStep, AccessRightsAuthorizeStep;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_session) {
      Session = _session.Session;
    }, function (_logger) {
      Logger = _logger.Logger;
    }, function (_locale) {
      Locale = _locale.Locale;
    }, function (_config) {
      Config = _config.Config;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }],
    execute: function () {
      BaseAuthorizeStep = (function () {
        function BaseAuthorizeStep(session, logger) {
          _classCallCheck(this, BaseAuthorizeStep);

          this.session = session;
          this.logger = logger;
          this.locale = Locale.Repository['default'];
          this.loginRoute = Config.routerAuthStepOpts.loginRoute;
        }

        _createClass(BaseAuthorizeStep, [{
          key: 'run',
          value: function run(navigationInstruction, next) {

            var canAccess = this.authorize(navigationInstruction);
            if (canAccess === false) {
              this.logger.error(this.locale.translate('notAuthorized'));
              return next.cancel(new Redirect(''));
            }

            return next();
          }
        }, {
          key: 'authorize',
          value: function authorize(navigationInstruction) {
            if (navigationInstruction.parentInstruction === null) {
              return this.canAccess(navigationInstruction);
            } else {
              var canAccess = this.canAccess(navigationInstruction);
              if (canAccess) {
                return this.authorize(navigationInstruction.parentInstruction);
              } else {
                return false;
              }
            }
          }
        }, {
          key: 'canAccess',
          value: function canAccess() {}
        }]);

        return BaseAuthorizeStep;
      })();

      RolesAuthorizeStep = (function (_BaseAuthorizeStep) {
        _inherits(RolesAuthorizeStep, _BaseAuthorizeStep);

        function RolesAuthorizeStep(session, logger) {
          _classCallCheck(this, _RolesAuthorizeStep);

          _get(Object.getPrototypeOf(_RolesAuthorizeStep.prototype), 'constructor', this).call(this, session, logger);
        }

        _createClass(RolesAuthorizeStep, [{
          key: 'canAccess',
          value: function canAccess(navigationInstruction) {
            if (navigationInstruction.config.roles) {
              return this.session.userHasAtLeastOneRole(navigationInstruction.config.roles);
            }

            return true;
          }
        }]);

        var _RolesAuthorizeStep = RolesAuthorizeStep;
        RolesAuthorizeStep = inject(Session, Logger)(RolesAuthorizeStep) || RolesAuthorizeStep;
        return RolesAuthorizeStep;
      })(BaseAuthorizeStep);

      _export('RolesAuthorizeStep', RolesAuthorizeStep);

      AccessRightsAuthorizeStep = (function (_BaseAuthorizeStep2) {
        _inherits(AccessRightsAuthorizeStep, _BaseAuthorizeStep2);

        function AccessRightsAuthorizeStep(session, logger) {
          _classCallCheck(this, _AccessRightsAuthorizeStep);

          _get(Object.getPrototypeOf(_AccessRightsAuthorizeStep.prototype), 'constructor', this).call(this, session, logger);
        }

        _createClass(AccessRightsAuthorizeStep, [{
          key: 'canAccess',
          value: function canAccess(navigationInstruction) {
            if (navigationInstruction.config.accessRight) {
              return this.session.userHasAccessRight(navigationInstruction.config.accessRight);
            }

            return true;
          }
        }]);

        var _AccessRightsAuthorizeStep = AccessRightsAuthorizeStep;
        AccessRightsAuthorizeStep = inject(Session, Logger)(AccessRightsAuthorizeStep) || AccessRightsAuthorizeStep;
        return AccessRightsAuthorizeStep;
      })(BaseAuthorizeStep);

      _export('AccessRightsAuthorizeStep', AccessRightsAuthorizeStep);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvYXV0aG9yaXplLXN0ZXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5REFXTSxpQkFBaUIsRUEyQ1Ysa0JBQWtCLEVBZ0JsQix5QkFBeUI7Ozs7Ozs7Ozs7OztpQ0FuRTlCLE1BQU07O3lCQUNOLE9BQU87O3VCQUNQLE1BQU07O3VCQUNOLE1BQU07O3VCQUNOLE1BQU07O2dDQUNOLFFBQVE7OztBQUdWLHVCQUFpQjtBQUNWLGlCQURQLGlCQUFpQixDQUNULE9BQU8sRUFBRSxNQUFNLEVBQUU7Z0NBRHpCLGlCQUFpQjs7QUFFbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxXQUFRLENBQUM7QUFDeEMsY0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1NBQ3hEOztxQkFORyxpQkFBaUI7O2lCQVFsQixhQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRTs7QUFNL0IsZ0JBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN0RCxnQkFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQzFELHFCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0Qzs7QUFFRCxtQkFBTyxJQUFJLEVBQUUsQ0FBQztXQUNmOzs7aUJBRVEsbUJBQUMscUJBQXFCLEVBQUU7QUFDL0IsZ0JBQUkscUJBQXFCLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO0FBQ3BELHFCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5QyxNQUFNO0FBQ0wsa0JBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN0RCxrQkFBSSxTQUFTLEVBQUU7QUFDYix1QkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7ZUFDaEUsTUFBTTtBQUNMLHVCQUFPLEtBQUssQ0FBQztlQUNkO2FBQ0Y7V0FDRjs7O2lCQUVRLHFCQUFHLEVBRVg7OztlQXRDRyxpQkFBaUI7OztBQTJDVix3QkFBa0I7a0JBQWxCLGtCQUFrQjs7QUFDbEIsaUJBREEsa0JBQWtCLENBQ2pCLE9BQU8sRUFBRSxNQUFNLEVBQUU7OztBQUMzQixxR0FBTSxPQUFPLEVBQUUsTUFBTSxFQUFFO1NBQ3hCOztxQkFIVSxrQkFBa0I7O2lCQUtwQixtQkFBQyxxQkFBcUIsRUFBRTtBQUMvQixnQkFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3RDLHFCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9FOztBQUVELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7a0NBWFUsa0JBQWtCO0FBQWxCLDBCQUFrQixHQUQ5QixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUNYLGtCQUFrQixLQUFsQixrQkFBa0I7ZUFBbEIsa0JBQWtCO1NBQVMsaUJBQWlCOzs7O0FBZ0I1QywrQkFBeUI7a0JBQXpCLHlCQUF5Qjs7QUFDekIsaUJBREEseUJBQXlCLENBQ3hCLE9BQU8sRUFBRSxNQUFNLEVBQUU7OztBQUMzQiw0R0FBTSxPQUFPLEVBQUUsTUFBTSxFQUFFO1NBQ3hCOztxQkFIVSx5QkFBeUI7O2lCQUszQixtQkFBQyxxQkFBcUIsRUFBRTtBQUMvQixnQkFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzVDLHFCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2xGOztBQUVELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7eUNBWFUseUJBQXlCO0FBQXpCLGlDQUF5QixHQURyQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUNYLHlCQUF5QixLQUF6Qix5QkFBeUI7ZUFBekIseUJBQXlCO1NBQVMsaUJBQWlCIiwiZmlsZSI6ImZlYXR1cmVzL3NlcnZpY2UvYXV0aG9yaXplLXN0ZXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXHJcbiAqL1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuL2xvY2FsZSc7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuXHJcblxyXG5jbGFzcyBCYXNlQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbiwgbG9nZ2VyKSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XHJcbiAgICB0aGlzLmxvZ2luUm91dGUgPSBDb25maWcucm91dGVyQXV0aFN0ZXBPcHRzLmxvZ2luUm91dGU7XHJcbiAgfVxyXG5cclxuICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uLCBuZXh0KSB7XHJcbiAgICAvLyBpZiAoIXRoaXMuc2Vzc2lvbi5pc1VzZXJMb2dnZWRJbigpICYmIG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm91dGUgIT09IHRoaXMubG9naW5Sb3V0ZSkge1xyXG4gICAgLy8gICB0aGlzLmxvZ2dlci53YXJuKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgncGxlYXNlTG9naW4nKSk7XHJcbiAgICAvLyAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodGhpcy5sb2dpblJvdXRlKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgbGV0IGNhbkFjY2VzcyA9IHRoaXMuYXV0aG9yaXplKG5hdmlnYXRpb25JbnN0cnVjdGlvbik7XHJcbiAgICBpZiAoY2FuQWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ25vdEF1dGhvcml6ZWQnKSk7XHJcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QoJycpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgYXV0aG9yaXplKG5hdmlnYXRpb25JbnN0cnVjdGlvbikge1xyXG4gICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5wYXJlbnRJbnN0cnVjdGlvbiA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBjYW5BY2Nlc3MgPSB0aGlzLmNhbkFjY2VzcyhuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pO1xyXG4gICAgICBpZiAoY2FuQWNjZXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aG9yaXplKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5wYXJlbnRJbnN0cnVjdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5BY2Nlc3MoKSB7XHJcblxyXG4gIH1cclxufVxyXG5cclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxyXG5leHBvcnQgY2xhc3MgUm9sZXNBdXRob3JpemVTdGVwIGV4dGVuZHMgQmFzZUF1dGhvcml6ZVN0ZXAge1xyXG4gIGNvbnN0cnVjdG9yKHNlc3Npb24sIGxvZ2dlcikge1xyXG4gICAgc3VwZXIoc2Vzc2lvbiwgbG9nZ2VyKTtcclxuICB9XHJcblxyXG4gIGNhbkFjY2VzcyhuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24pIHtcclxuICAgIGlmIChuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24uY29uZmlnLnJvbGVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0F0TGVhc3RPbmVSb2xlKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5jb25maWcucm9sZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyKVxyXG5leHBvcnQgY2xhc3MgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCBleHRlbmRzIEJhc2VBdXRob3JpemVTdGVwIHtcclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIpIHtcclxuICAgIHN1cGVyKHNlc3Npb24sIGxvZ2dlcik7XHJcbiAgfVxyXG5cclxuICBjYW5BY2Nlc3MobmF2aWdhdGlvbkluc3RydWN0aW9uKSB7XHJcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmNvbmZpZy5hY2Nlc3NSaWdodCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnVzZXJIYXNBY2Nlc3NSaWdodChuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24uY29uZmlnLmFjY2Vzc1JpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
