System.register(['./config', './logger', './session', './local-storage-manager', './http-client/http', './ws/hub-factory', './ws/ws', './http-client/http-client-messages', './event/user-logged-in-event', './event/user-logged-out-event', './authorize-steps'], function (_export) {
  'use strict';

  var Config;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    var config = new Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_logger) {
      _export('Logger', _logger.Logger);
    }, function (_session) {
      _export('Session', _session.Session);
    }, function (_localStorageManager) {
      _export('localStorageManager', _localStorageManager.localStorageManager);
    }, function (_httpClientHttp) {
      _export('Http', _httpClientHttp.Http);
    }, function (_wsHubFactory) {
      _export('HubFactory', _wsHubFactory.HubFactory);
    }, function (_wsWs) {
      _export('WS', _wsWs.WS);
    }, function (_httpClientHttpClientMessages) {
      _export('HttpRequestStartedMessage', _httpClientHttpClientMessages.HttpRequestStartedMessage);

      _export('HttpRequestFinishedMessage', _httpClientHttpClientMessages.HttpRequestFinishedMessage);

      _export('HttpBadRequestMessage', _httpClientHttpClientMessages.HttpBadRequestMessage);

      _export('HttpServerErrorRequestMessage', _httpClientHttpClientMessages.HttpServerErrorRequestMessage);

      _export('HttpSessionTimedOutMessage', _httpClientHttpClientMessages.HttpSessionTimedOutMessage);
    }, function (_eventUserLoggedInEvent) {
      _export('UserLoggedInEvent', _eventUserLoggedInEvent.UserLoggedInEvent);
    }, function (_eventUserLoggedOutEvent) {
      _export('UserLoggedOutEvent', _eventUserLoggedOutEvent.UserLoggedOutEvent);
    }, function (_authorizeSteps) {
      _export('AccessRightsAuthorizeStep', _authorizeSteps.AccessRightsAuthorizeStep);

      _export('RolesAuthorizeStep', _authorizeSteps.RolesAuthorizeStep);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWlCTyxXQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFO0FBQ2pELFFBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O0FBRTVCLFFBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsQUFBQyxLQUFLLFVBQVUsRUFBRTtBQUN6RSxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hCOztBQUVELFdBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0dBQ3hCOzs7O3VCQXpCTyxNQUFNOztnQ0FFTixNQUFNOztrQ0FDTixPQUFPOzswREFDUCxtQkFBbUI7O3NDQUNuQixJQUFJOzswQ0FDSixVQUFVOzswQkFDVixFQUFFOzt5RUFDRix5QkFBeUI7OzBFQUFFLDBCQUEwQjs7cUVBQzNELHFCQUFxQjs7NkVBQUUsNkJBQTZCOzswRUFDcEQsMEJBQTBCOzsyREFFcEIsaUJBQWlCOzs2REFDakIsa0JBQWtCOzsyREFFbEIseUJBQXlCOztvREFBRSxrQkFBa0IiLCJmaWxlIjoiZmVhdHVyZXMvc2VydmljZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5leHBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5leHBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XHJcbmV4cG9ydCB7bG9jYWxTdG9yYWdlTWFuYWdlcn0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLW1hbmFnZXInO1xyXG5leHBvcnQge0h0dHB9IGZyb20gJy4vaHR0cC1jbGllbnQvaHR0cCc7XHJcbmV4cG9ydCB7SHViRmFjdG9yeX0gZnJvbSAnLi93cy9odWItZmFjdG9yeSc7XHJcbmV4cG9ydCB7V1N9IGZyb20gJy4vd3Mvd3MnO1xyXG5leHBvcnQge0h0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UsIEh0dHBSZXF1ZXN0RmluaXNoZWRNZXNzYWdlLFxyXG4gIEh0dHBCYWRSZXF1ZXN0TWVzc2FnZSwgSHR0cFNlcnZlckVycm9yUmVxdWVzdE1lc3NhZ2UsXHJcbiAgSHR0cFNlc3Npb25UaW1lZE91dE1lc3NhZ2V9IGZyb20gJy4vaHR0cC1jbGllbnQvaHR0cC1jbGllbnQtbWVzc2FnZXMnO1xyXG5cclxuZXhwb3J0IHtVc2VyTG9nZ2VkSW5FdmVudH0gZnJvbSAnLi9ldmVudC91c2VyLWxvZ2dlZC1pbi1ldmVudCc7XHJcbmV4cG9ydCB7VXNlckxvZ2dlZE91dEV2ZW50fSBmcm9tICcuL2V2ZW50L3VzZXItbG9nZ2VkLW91dC1ldmVudCc7XHJcblxyXG5leHBvcnQge0FjY2Vzc1JpZ2h0c0F1dGhvcml6ZVN0ZXAsIFJvbGVzQXV0aG9yaXplU3RlcH0gZnJvbSAnLi9hdXRob3JpemUtc3RlcHMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhLCBjb25maWdDYWxsYmFjaykge1xyXG4gIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcclxuXHJcbiAgaWYgKGNvbmZpZ0NhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mKGNvbmZpZ0NhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgY29uZmlnQ2FsbGJhY2soY29uZmlnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWcubG9jYWxlKCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
