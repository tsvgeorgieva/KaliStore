System.register([], function (_export) {
  'use strict';

  var ChildRouter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      ChildRouter = (function () {
        function ChildRouter(session) {
          _classCallCheck(this, ChildRouter);

          this.session = session;
          this.navModel = {};
        }

        _createClass(ChildRouter, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map(this.navModel);
            config.mapUnknownRoutes('not-found', 'not-found');
            this.router = router;
          }
        }, {
          key: 'checkAccess',
          value: function checkAccess(navModel) {
            if (navModel.config.accessRight) {
              return this.session.userHasAccessRight(navModel.config.accessRight);
            }

            return true;
          }
        }]);

        return ChildRouter;
      })();

      _export('ChildRouter', ChildRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvY2hpbGQtcm91dGVyL2NoaWxkLXJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSxXQUFXOzs7Ozs7Ozs7QUFBWCxpQkFBVztBQUNYLGlCQURBLFdBQVcsQ0FDVixPQUFPLEVBQUU7Z0NBRFYsV0FBVzs7QUFFcEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDcEI7O3FCQUpVLFdBQVc7O2lCQU1QLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2lCQUVVLHFCQUFDLFFBQVEsRUFBRTtBQUNwQixnQkFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUMvQixxQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckU7O0FBRUQsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztlQWxCVSxXQUFXIiwiZmlsZSI6ImxpYnMvY2hpbGQtcm91dGVyL2NoaWxkLXJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaGlsZFJvdXRlciB7XHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbikge1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHRoaXMubmF2TW9kZWwgPSB7fTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgY29uZmlnLm1hcCh0aGlzLm5hdk1vZGVsKTtcclxuICAgIGNvbmZpZy5tYXBVbmtub3duUm91dGVzKCdub3QtZm91bmQnLCAnbm90LWZvdW5kJyk7XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICB9XHJcblxyXG4gIGNoZWNrQWNjZXNzKG5hdk1vZGVsKSB7XHJcbiAgICBpZiAobmF2TW9kZWwuY29uZmlnLmFjY2Vzc1JpZ2h0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlckhhc0FjY2Vzc1JpZ2h0KG5hdk1vZGVsLmNvbmZpZy5hY2Nlc3NSaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
