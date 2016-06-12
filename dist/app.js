System.register(['moment', 'moment/locale/bg', 'aurelia-i18n', 'service', 'aurelia-framework', 'aurelia-event-aggregator', './routes-config', 'dialog'], function (_export) {
  'use strict';

  var moment, I18N, AccessRightsAuthorizeStep, HttpRequestStartedMessage, HttpRequestFinishedMessage, HttpBadRequestMessage, HttpServerErrorRequestMessage, inject, EventAggregator, RoutesConfig, DialogService, App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }, function (_momentLocaleBg) {}, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_service) {
      AccessRightsAuthorizeStep = _service.AccessRightsAuthorizeStep;
      HttpRequestStartedMessage = _service.HttpRequestStartedMessage;
      HttpRequestFinishedMessage = _service.HttpRequestFinishedMessage;
      HttpBadRequestMessage = _service.HttpBadRequestMessage;
      HttpServerErrorRequestMessage = _service.HttpServerErrorRequestMessage;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_routesConfig) {
      RoutesConfig = _routesConfig.RoutesConfig;
    }, function (_dialog) {
      DialogService = _dialog.DialogService;
    }],
    execute: function () {
      App = (function () {
        function App(i18n, routesConfig, eventAggregator, dialogService) {
          _classCallCheck(this, _App);

          this.i18n = i18n;
          this.routesConfig = routesConfig;
          this.dialogService = dialogService;
          moment.locale('bg');

          this.showLoadingMask = false;
          eventAggregator.subscribe(HttpRequestStartedMessage, (function () {
            this.showLoadingMask = true;
          }).bind(this));

          eventAggregator.subscribe(HttpRequestFinishedMessage, (function () {
            this.showLoadingMask = false;
          }).bind(this));
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = this.i18n.tr('config.pageTitle');
            config.addPipelineStep('authorize', AccessRightsAuthorizeStep);
            config.map(this.routesConfig.getRoutes());
            config.mapUnknownRoutes('./not-found', 'not-found');

            this.router = router;
          }
        }]);

        var _App = App;
        App = inject(I18N, RoutesConfig, EventAggregator, DialogService)(App) || App;
        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a05BZWEsR0FBRzs7Ozs7Ozs7OzswQkFiUixJQUFJOzsyQ0FDSix5QkFBeUI7MkNBSXpCLHlCQUF5Qjs0Q0FBRSwwQkFBMEI7dUNBQzNELHFCQUFxQjsrQ0FBRSw2QkFBNkI7O2lDQUo5QyxNQUFNOztnREFFTixlQUFlOzttQ0FJZixZQUFZOzs4QkFFWixhQUFhOzs7QUFHUixTQUFHO0FBQ0gsaUJBREEsR0FBRyxDQUNGLElBQUksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRTs7O0FBQzlELGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ2pDLGNBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ25DLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwQixjQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUM3Qix5QkFBZSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBLFlBQVc7QUFDOUQsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1dBQzdCLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFZCx5QkFBZSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxDQUFBLFlBQVk7QUFDaEUsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1dBQzlCLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNmOztxQkFmVSxHQUFHOztpQkFpQkMseUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUU5QixrQkFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELGtCQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQy9ELGtCQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUMxQyxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFcEQsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7bUJBekJVLEdBQUc7QUFBSCxXQUFHLEdBRGYsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUM5QyxHQUFHLEtBQUgsR0FBRztlQUFILEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvYmcnO1xyXG5pbXBvcnQge0kxOE59IGZyb20gJ2F1cmVsaWEtaTE4bic7XHJcbmltcG9ydCB7QWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcH0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHtIdHRwUmVxdWVzdFN0YXJ0ZWRNZXNzYWdlLCBIdHRwUmVxdWVzdEZpbmlzaGVkTWVzc2FnZSxcclxuICBIdHRwQmFkUmVxdWVzdE1lc3NhZ2UsIEh0dHBTZXJ2ZXJFcnJvclJlcXVlc3RNZXNzYWdlfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7Um91dGVzQ29uZmlnfSBmcm9tICcuL3JvdXRlcy1jb25maWcnO1xyXG5cclxuaW1wb3J0IHtEaWFsb2dTZXJ2aWNlfSBmcm9tICdkaWFsb2cnO1xyXG5cclxuQGluamVjdChJMThOLCBSb3V0ZXNDb25maWcsIEV2ZW50QWdncmVnYXRvciwgRGlhbG9nU2VydmljZSlcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgY29uc3RydWN0b3IoaTE4biwgcm91dGVzQ29uZmlnLCBldmVudEFnZ3JlZ2F0b3IsIGRpYWxvZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMuaTE4biA9IGkxOG47XHJcbiAgICB0aGlzLnJvdXRlc0NvbmZpZyA9IHJvdXRlc0NvbmZpZztcclxuICAgIHRoaXMuZGlhbG9nU2VydmljZSA9IGRpYWxvZ1NlcnZpY2U7XHJcbiAgICBtb21lbnQubG9jYWxlKCdiZycpO1xyXG5cclxuICAgIHRoaXMuc2hvd0xvYWRpbmdNYXNrID0gZmFsc2U7XHJcbiAgICBldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlKEh0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnNob3dMb2FkaW5nTWFzayA9IHRydWU7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIGV2ZW50QWdncmVnYXRvci5zdWJzY3JpYmUoSHR0cFJlcXVlc3RGaW5pc2hlZE1lc3NhZ2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zaG93TG9hZGluZ01hc2sgPSBmYWxzZTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuICAgIC8vY29uZmlnLm9wdGlvbnMucHVzaFN0YXRlID0gdHJ1ZTtcclxuICAgIGNvbmZpZy50aXRsZSA9IHRoaXMuaTE4bi50cignY29uZmlnLnBhZ2VUaXRsZScpO1xyXG4gICAgY29uZmlnLmFkZFBpcGVsaW5lU3RlcCgnYXV0aG9yaXplJywgQWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCk7XHJcbiAgICBjb25maWcubWFwKHRoaXMucm91dGVzQ29uZmlnLmdldFJvdXRlcygpKTtcclxuICAgIGNvbmZpZy5tYXBVbmtub3duUm91dGVzKCcuL25vdC1mb3VuZCcsICdub3QtZm91bmQnKTtcclxuXHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
