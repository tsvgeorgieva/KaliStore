System.register(['aurelia-http-client', 'jquery', 'aurelia-framework', 'aurelia-event-aggregator', './http-client-messages', '../session', '../logger', '../locale', '../config'], function (_export) {
  'use strict';

  var HttpClient, $, inject, EventAggregator, HttpRequestStartedMessage, HttpRequestFinishedMessage, HttpBadRequestMessage, HttpServerErrorRequestMessage, HttpSessionTimedOutMessage, Session, Logger, Locale, Config, Http;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_httpClientMessages) {
      HttpRequestStartedMessage = _httpClientMessages.HttpRequestStartedMessage;
      HttpRequestFinishedMessage = _httpClientMessages.HttpRequestFinishedMessage;
      HttpBadRequestMessage = _httpClientMessages.HttpBadRequestMessage;
      HttpServerErrorRequestMessage = _httpClientMessages.HttpServerErrorRequestMessage;
      HttpSessionTimedOutMessage = _httpClientMessages.HttpSessionTimedOutMessage;
    }, function (_session) {
      Session = _session.Session;
    }, function (_logger) {
      Logger = _logger.Logger;
    }, function (_locale) {
      Locale = _locale.Locale;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      Http = (function () {
        function Http(session, logger, eventAggregator) {
          _classCallCheck(this, _Http);

          this.session = session;
          this.logger = logger;
          this.authHttp = undefined;
          this.locale = Locale.Repository['default'];
          this.eventAggregator = eventAggregator;

          this.host = Config.httpOpts.serviceHost;
          this.origin = this.host + Config.httpOpts.serviceApiPrefix;
          this.authOrigin = Config.httpOpts.authHost;
          this.hosts = Config.httpOpts.hosts || {};

          this.loadingMaskDelay = Config.httpOpts.loadingMaskDelay || 1000;
          this.requestTimeout = Config.httpOpts.requestTimeout;

          if (this.session.userRemembered()) {
            this.initAuthHttp(this.session.rememberedToken());
          }
        }

        _createClass(Http, [{
          key: '_showLoadingMask',
          value: function _showLoadingMask() {
            this.eventAggregator.publish(new HttpRequestStartedMessage());
          }
        }, {
          key: '_hideLoadingMask',
          value: function _hideLoadingMask() {
            this.eventAggregator.publish(new HttpRequestFinishedMessage());
          }
        }, {
          key: 'get',
          value: function get(url, data, opts) {
            var _this = this;

            this._showLoadingMask();
            var urlWithProps = url;
            if (data !== undefined) {
              var props = Object.keys(data).map(function (key) {
                var d = data[key];
                if (Array.isArray(d)) {
                  return d.map(function (value) {
                    return '' + key + '=' + value;
                  }).join('&');
                } else {
                  return '' + key + '=' + data[key];
                }
              }).join('&');

              urlWithProps += '?' + props;
            }
            var promise = this.authHttp.get(urlWithProps).then(function (response) {
              _this._hideLoadingMask();
              if (opts && opts.raw === true) {
                return response.response;
              } else {
                return JSON.parse(response.response);
              }
            });
            promise['catch'](this.errorHandler.bind(this));
            return promise;
          }
        }, {
          key: 'post',
          value: function post(url) {
            var _this2 = this;

            var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this._showLoadingMask();
            var promise = this.authHttp.post(url, content).then(function (response) {
              _this2._hideLoadingMask();
              if (response.response !== '') {
                return JSON.parse(response.response);
              }
            });
            promise['catch'](this.errorHandler.bind(this));

            return promise;
          }
        }, {
          key: 'put',
          value: function put(url) {
            var _this3 = this;

            var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this._showLoadingMask();
            var promise = this.authHttp.put(url, content).then(function (response) {
              return _this3._hideLoadingMask();
            });
            promise['catch'](this.errorHandler.bind(this));
            return promise;
          }
        }, {
          key: 'delete',
          value: function _delete(url) {
            var _this4 = this;

            var promise = this.authHttp['delete'](url).then(function (response) {
              return _this4._hideLoadingMask();
            });
            promise['catch'](this.errorHandler.bind(this));
            return promise;
          }
        }, {
          key: 'multipartFormPost',
          value: function multipartFormPost(url, data) {
            var requestUrl = this.origin + url;
            return this.multipartForm(requestUrl, data, 'POST');
          }
        }, {
          key: 'multipartFormPut',
          value: function multipartFormPut(url, data) {
            var requestUrl = this.origin + url;
            return this.multipartForm(requestUrl, data, 'PUT');
          }
        }, {
          key: 'multipartForm',
          value: function multipartForm(url, data, method) {
            this._showLoadingMask();
            var self = this;
            var req = $.ajax({
              url: url,
              data: data,
              processData: false,
              contentType: false,
              type: method,
              headers: {
                'Authorization': 'Bearer ' + this.token
              }
            });

            return new Promise(function (resolve, reject) {
              req.done(resolve);
              req.fail(reject);
              self._hideLoadingMask();
            })['catch'](this.errorHandler.bind(this));
          }
        }, {
          key: 'postDownloadFile',
          value: function postDownloadFile(url, data) {
            return this.downloadFile(url, 'POST', data);
          }
        }, {
          key: 'getDownloadFile',
          value: function getDownloadFile(url) {
            return this.downloadFile(url, 'GET');
          }
        }, {
          key: 'downloadFile',
          value: function downloadFile(url, method, data) {
            var _this5 = this;

            this._showLoadingMask();
            var urlAddress = this.origin + url;
            var authHeaderValue = 'Bearer ' + this.token;
            var promise = new Promise(function (resolve, reject) {
              var xmlhttp = new XMLHttpRequest();
              xmlhttp.open(method, urlAddress, true);
              xmlhttp.timeout = _this5.requestTimeout;
              xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              xmlhttp.setRequestHeader('Authorization', authHeaderValue);
              xmlhttp.responseType = 'blob';

              xmlhttp.onload = function (oEvent) {
                if (this.status !== 200) {
                  reject({ statusCode: this.status });
                  return;
                }

                var blob = xmlhttp.response;
                var windowUrl = window.URL || window.webkitURL;
                var url = windowUrl.createObjectURL(blob);
                var filename = this.getResponseHeader('Content-Disposition').match(/^attachment; filename=(.+)/)[1];

                var anchor = $('<a></a>');
                anchor.prop('href', url);
                anchor.prop('download', filename);
                $('body').append(anchor);
                anchor.get(0).click();
                windowUrl.revokeObjectURL(url);
                anchor.remove();
              };

              xmlhttp.ontimeout = function () {
                reject({ timeout: true });
              };

              xmlhttp.addEventListener('error', function () {
                reject();
              });
              xmlhttp.addEventListener('load', function () {
                resolve();
                _this5._hideLoadingMask();
              });
              if (method === 'GET') {
                xmlhttp.send();
              } else if (method === 'POST') {
                xmlhttp.send(JSON.stringify(data));
              } else {
                throw new Error('Unsuported method call!');
              }
            });

            promise['catch'](this.errorHandler.bind(this));
            return promise;
          }
        }, {
          key: 'loginBasicAuth',
          value: function loginBasicAuth(email, pass) {
            var client = new HttpClient();
            var encodedData = window.btoa(email + ':' + pass);
            var promise = client.createRequest('token').asGet().withBaseUrl(this.authOrigin).withHeader('Authorization', 'Basic ' + encodedData).send();
            promise.then(this.loginHandle.bind(this));
            promise['catch'](this.errorHandler.bind(this));

            return promise;
          }
        }, {
          key: 'loginResourceOwner',
          value: function loginResourceOwner(email, pass, clientId) {
            var _this6 = this;

            this._showLoadingMask();
            var data = {
              grant_type: 'password',
              client_id: clientId,
              username: email,
              password: pass
            };

            var client = new HttpClient().configure(function (x) {
              x.withBaseUrl(_this6.authOrigin);
              x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
            });

            var promise = client.post('token', $.param(data));
            promise.then(this.loginHandle.bind(this));
            promise['catch'](this.errorHandler.bind(this));

            return promise;
          }
        }, {
          key: 'initAuthHttp',
          value: function initAuthHttp(token) {
            var _this7 = this;

            this.token = token;
            this.authHttp = new HttpClient().configure(function (x) {
              x.withBaseUrl(_this7.origin);
              x.withHeader('Authorization', 'Bearer ' + _this7.token);
              x.withHeader('Content-Type', 'application/json');
              x.withHeader('Accept', '*/*');
            });
          }
        }, {
          key: 'getAuthHttpFor',
          value: function getAuthHttpFor(hostName) {
            var _this8 = this;

            var authHttp = new HttpClient().configure(function (x) {
              x.withBaseUrl(_this8.hosts[hostName]);
              x.withHeader('Authorization', 'Bearer ' + _this8.token);
              x.withHeader('Content-Type', 'application/json');
              x.withHeader('Accept', '*/*');
            });

            return authHttp;
          }
        }, {
          key: '_convertToArray',
          value: function _convertToArray(value) {
            var result = value || [];
            if (typeof result === 'string') {
              return result.split(',');
            }

            return result;
          }
        }, {
          key: 'loginHandle',
          value: function loginHandle(response) {
            this._hideLoadingMask();
            var data = JSON.parse(response.response);
            var token = data.access_token;
            this.initAuthHttp(token);

            var claims = data.userClaims || [];
            if (typeof claims === 'string') {
              claims = JSON.parse(claims);
            }

            this.session.loginUser({
              token: token,
              userName: data.userName || 'please give me a name!',
              userClaims: claims,
              userRoles: this._convertToArray(data.userRoles),
              userAccessRights: this._convertToArray(data.userAccessRights)
            });
          }
        }, {
          key: 'errorHandler',
          value: function errorHandler(response) {
            this._hideLoadingMask();

            if (response.statusCode === 400) {
              var error = JSON.parse(response.response);
              this.eventAggregator.publish(new HttpBadRequestMessage(error.message));
            } else if (response.statusCode === 418) {
              var errors = JSON.parse(response.response);
              this.eventAggregator.publish(new HttpServerErrorRequestMessage(errors));
            } else if (response.statusCode === 401) {
              this.eventAggregator.publish(new HttpSessionTimedOutMessage());
              this.logger.warn(this.locale.translate('sessionTimedOut'));
            } else if (response.statusCode === 403) {
              this.logger.warn(this.locale.translate('accessDenied'));
            } else if (response.statusCode === 500) {
              this.logger.error(this.locale.translate('internalServerError'));
            } else if (response.timeout === true) {
              this.logger.error(this.locale.translate('requestTimeout'));
            } else {
              this.logger.error(this.locale.translate('errorHappend'));
            }
          }
        }]);

        var _Http = Http;
        Http = inject(Session, Logger, EventAggregator)(Http) || Http;
        return Http;
      })();

      _export('Http', Http);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvaHR0cC1jbGllbnQvaHR0cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d05BZWEsSUFBSTs7Ozs7Ozs7c0NBZFQsVUFBVTs7OztpQ0FFVixNQUFNOztnREFDTixlQUFlOztzREFDZix5QkFBeUI7dURBQUUsMEJBQTBCO2tEQUMzRCxxQkFBcUI7MERBQUUsNkJBQTZCO3VEQUNwRCwwQkFBMEI7O3lCQUVwQixPQUFPOzt1QkFDUCxNQUFNOzt1QkFDTixNQUFNOzt1QkFDTixNQUFNOzs7QUFHRCxVQUFJO0FBQ0osaUJBREEsSUFBSSxDQUNILE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFOzs7QUFDNUMsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDMUIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxXQUFRLENBQUM7QUFDeEMsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7O0FBRXZDLGNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDeEMsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7QUFDM0QsY0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUMzQyxjQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7QUFFekMsY0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDO0FBQ2pFLGNBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFj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LENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDNUQsTUFBTTtBQUNMLGtCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1dBQ0Y7OztvQkFqU1UsSUFBSTtBQUFKLFlBQUksR0FEaEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQzVCLElBQUksS0FBSixJQUFJO2VBQUosSUFBSSIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2h0dHAtY2xpZW50L2h0dHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2RvOiBtaWdyYXRlIHRvIGF1cmVsaWEtZmV0Y2gtY2xpZW50XHJcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge0h0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UsIEh0dHBSZXF1ZXN0RmluaXNoZWRNZXNzYWdlLFxyXG4gIEh0dHBCYWRSZXF1ZXN0TWVzc2FnZSwgSHR0cFNlcnZlckVycm9yUmVxdWVzdE1lc3NhZ2UsXHJcbiAgSHR0cFNlc3Npb25UaW1lZE91dE1lc3NhZ2V9IGZyb20gJy4vaHR0cC1jbGllbnQtbWVzc2FnZXMnO1xyXG5cclxuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuLi9zZXNzaW9uJztcclxuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL2xvZ2dlcic7XHJcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuLi9sb2NhbGUnO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgTG9nZ2VyLCBFdmVudEFnZ3JlZ2F0b3IpXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBsb2dnZXIsIGV2ZW50QWdncmVnYXRvcikge1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgdGhpcy5hdXRoSHR0cCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xyXG5cclxuICAgIHRoaXMuaG9zdCA9IENvbmZpZy5odHRwT3B0cy5zZXJ2aWNlSG9zdDtcclxuICAgIHRoaXMub3JpZ2luID0gdGhpcy5ob3N0ICsgQ29uZmlnLmh0dHBPcHRzLnNlcnZpY2VBcGlQcmVmaXg7XHJcbiAgICB0aGlzLmF1dGhPcmlnaW4gPSBDb25maWcuaHR0cE9wdHMuYXV0aEhvc3Q7XHJcbiAgICB0aGlzLmhvc3RzID0gQ29uZmlnLmh0dHBPcHRzLmhvc3RzIHx8IHt9O1xyXG4gICAgLy8gdG9kbzogdGhpcyBpcyB1bnVzZWRcclxuICAgIHRoaXMubG9hZGluZ01hc2tEZWxheSA9IENvbmZpZy5odHRwT3B0cy5sb2FkaW5nTWFza0RlbGF5IHx8IDEwMDA7XHJcbiAgICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gQ29uZmlnLmh0dHBPcHRzLnJlcXVlc3RUaW1lb3V0O1xyXG5cclxuICAgIGlmICh0aGlzLnNlc3Npb24udXNlclJlbWVtYmVyZWQoKSkge1xyXG4gICAgICB0aGlzLmluaXRBdXRoSHR0cCh0aGlzLnNlc3Npb24ucmVtZW1iZXJlZFRva2VuKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dMb2FkaW5nTWFzaygpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEh0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UoKSk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUxvYWRpbmdNYXNrKCkge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgSHR0cFJlcXVlc3RGaW5pc2hlZE1lc3NhZ2UoKSk7XHJcbiAgfVxyXG5cclxuICBnZXQodXJsLCBkYXRhLCBvcHRzKSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGxldCB1cmxXaXRoUHJvcHMgPSB1cmw7XHJcbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBsZXQgZCA9IGRhdGFba2V5XTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGQubWFwKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICcnICsga2V5ICsgJz0nICsgdmFsdWU7XHJcbiAgICAgICAgICB9KS5qb2luKCcmJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAnJyArIGtleSArICc9JyArIGRhdGFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmpvaW4oJyYnKTtcclxuXHJcbiAgICAgIHVybFdpdGhQcm9wcyArPSAnPycgKyBwcm9wcztcclxuICAgIH1cclxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLmdldCh1cmxXaXRoUHJvcHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgICAgaWYgKG9wdHMgJiYgb3B0cy5yYXcgPT09IHRydWUpe1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgcG9zdCh1cmwsIGNvbnRlbnQgPSB7fSkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5hdXRoSHR0cC5wb3N0KHVybCwgY29udGVudCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2UgIT09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHV0KHVybCwgY29udGVudCA9IHt9KSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmF1dGhIdHRwLnB1dCh1cmwsIGNvbnRlbnQpLnRoZW4ocmVzcG9uc2UgPT4gdGhpcy5faGlkZUxvYWRpbmdNYXNrKCkpO1xyXG4gICAgcHJvbWlzZS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHVybCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYXV0aEh0dHAuZGVsZXRlKHVybCkudGhlbihyZXNwb25zZSA9PiB0aGlzLl9oaWRlTG9hZGluZ01hc2soKSk7XHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBhcnRGb3JtUG9zdCh1cmwsIGRhdGEpIHtcclxuICAgIGxldCByZXF1ZXN0VXJsID0gdGhpcy5vcmlnaW4gKyB1cmw7XHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBhcnRGb3JtKHJlcXVlc3RVcmwsIGRhdGEsICdQT1NUJyk7XHJcbiAgfVxyXG5cclxuICBtdWx0aXBhcnRGb3JtUHV0KHVybCwgZGF0YSkge1xyXG4gICAgbGV0IHJlcXVlc3RVcmwgPSB0aGlzLm9yaWdpbiArIHVybDtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGFydEZvcm0ocmVxdWVzdFVybCwgZGF0YSwgJ1BVVCcpO1xyXG4gIH1cclxuXHJcbiAgbXVsdGlwYXJ0Rm9ybSh1cmwsIGRhdGEsIG1ldGhvZCkge1xyXG4gICAgdGhpcy5fc2hvd0xvYWRpbmdNYXNrKCk7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgcmVxID0gJC5hamF4KHtcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBtZXRob2QsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW5cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICByZXEuZG9uZShyZXNvbHZlKTtcclxuICAgICAgcmVxLmZhaWwocmVqZWN0KTtcclxuICAgICAgc2VsZi5faGlkZUxvYWRpbmdNYXNrKCk7XHJcbiAgICB9KS5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHBvc3REb3dubG9hZEZpbGUodXJsLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUodXJsLCAnUE9TVCcsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RG93bmxvYWRGaWxlKHVybCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHVybCwgJ0dFVCcpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWRGaWxlKHVybCwgbWV0aG9kLCBkYXRhKSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGNvbnN0IHVybEFkZHJlc3MgPSB0aGlzLm9yaWdpbiArIHVybDtcclxuICAgIGNvbnN0IGF1dGhIZWFkZXJWYWx1ZSA9IGBCZWFyZXIgJHt0aGlzLnRva2VufWA7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhtbGh0dHAub3BlbihtZXRob2QsIHVybEFkZHJlc3MsIHRydWUpO1xyXG4gICAgICB4bWxodHRwLnRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xyXG4gICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcclxuICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYXV0aEhlYWRlclZhbHVlKTtcclxuICAgICAgeG1saHR0cC5yZXNwb25zZVR5cGUgPSAnYmxvYic7XHJcblxyXG4gICAgICB4bWxodHRwLm9ubG9hZCA9IGZ1bmN0aW9uKG9FdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICByZWplY3Qoe3N0YXR1c0NvZGU6IHRoaXMuc3RhdHVzfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBibG9iID0geG1saHR0cC5yZXNwb25zZTtcclxuICAgICAgICBjb25zdCB3aW5kb3dVcmwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbiAgICAgICAgY29uc3QgdXJsID0gd2luZG93VXJsLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtRGlzcG9zaXRpb24nKS5tYXRjaCgvXmF0dGFjaG1lbnQ7IGZpbGVuYW1lPSguKykvKVsxXTtcclxuXHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gJCgnPGE+PC9hPicpO1xyXG4gICAgICAgIGFuY2hvci5wcm9wKCdocmVmJywgdXJsKTtcclxuICAgICAgICBhbmNob3IucHJvcCgnZG93bmxvYWQnLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChhbmNob3IpO1xyXG4gICAgICAgIGFuY2hvci5nZXQoMCkuY2xpY2soKTtcclxuICAgICAgICB3aW5kb3dVcmwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICAgICAgYW5jaG9yLnJlbW92ZSgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgeG1saHR0cC5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3Qoe3RpbWVvdXQ6IHRydWV9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHhtbGh0dHAuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB4bWxodHRwLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX2hpZGVMb2FkaW5nTWFzaygpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgICB4bWxodHRwLnNlbmQoKTtcclxuICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdQT1NUJykge1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cG9ydGVkIG1ldGhvZCBjYWxsIScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBsb2dpbkJhc2ljQXV0aChlbWFpbCwgcGFzcykge1xyXG4gICAgbGV0IGNsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XHJcbiAgICBsZXQgZW5jb2RlZERhdGEgPSB3aW5kb3cuYnRvYShlbWFpbCArICc6JyArIHBhc3MpO1xyXG4gICAgbGV0IHByb21pc2UgPSBjbGllbnQuY3JlYXRlUmVxdWVzdCgndG9rZW4nKVxyXG4gICAgICAuYXNHZXQoKVxyXG4gICAgICAud2l0aEJhc2VVcmwodGhpcy5hdXRoT3JpZ2luKVxyXG4gICAgICAud2l0aEhlYWRlcignQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgZW5jb2RlZERhdGEpXHJcbiAgICAgIC5zZW5kKCk7XHJcbiAgICBwcm9taXNlLnRoZW4odGhpcy5sb2dpbkhhbmRsZS5iaW5kKHRoaXMpKTtcclxuICAgIHByb21pc2UuY2F0Y2godGhpcy5lcnJvckhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBsb2dpblJlc291cmNlT3duZXIoZW1haWwsIHBhc3MsIGNsaWVudElkKSB7XHJcbiAgICB0aGlzLl9zaG93TG9hZGluZ01hc2soKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBncmFudF90eXBlOiAncGFzc3dvcmQnLFxyXG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxyXG4gICAgICB1c2VybmFtZTogZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkOiBwYXNzXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCgpXHJcbiAgICAgIC5jb25maWd1cmUoeCA9PiB7XHJcbiAgICAgICAgeC53aXRoQmFzZVVybCh0aGlzLmF1dGhPcmlnaW4pO1xyXG4gICAgICAgIHgud2l0aEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyB0b2RvOiByZWZhY3RvciBvdXQgJC5wYXJhbVxyXG4gICAgY29uc3QgcHJvbWlzZSA9IGNsaWVudC5wb3N0KCd0b2tlbicsICQucGFyYW0oZGF0YSkpO1xyXG4gICAgcHJvbWlzZS50aGVuKHRoaXMubG9naW5IYW5kbGUuYmluZCh0aGlzKSk7XHJcbiAgICBwcm9taXNlLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgaW5pdEF1dGhIdHRwKHRva2VuKSB7XHJcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XHJcbiAgICB0aGlzLmF1dGhIdHRwID0gbmV3IEh0dHBDbGllbnQoKS5jb25maWd1cmUoeCA9PiB7XHJcbiAgICAgIHgud2l0aEJhc2VVcmwodGhpcy5vcmlnaW4pO1xyXG4gICAgICB4LndpdGhIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy50b2tlbn1gKTtcclxuICAgICAgeC53aXRoSGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICB4LndpdGhIZWFkZXIoJ0FjY2VwdCcsICcqLyonKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXV0aEh0dHBGb3IoaG9zdE5hbWUpIHtcclxuICAgIGxldCBhdXRoSHR0cCA9IG5ldyBIdHRwQ2xpZW50KCkuY29uZmlndXJlKHggPT4ge1xyXG4gICAgICB4LndpdGhCYXNlVXJsKHRoaXMuaG9zdHNbaG9zdE5hbWVdKTtcclxuICAgICAgeC53aXRoSGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMudG9rZW59YCk7XHJcbiAgICAgIHgud2l0aEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgeC53aXRoSGVhZGVyKCdBY2NlcHQnLCAnKi8qJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gYXV0aEh0dHA7XHJcbiAgfVxyXG5cclxuICBfY29udmVydFRvQXJyYXkodmFsdWUpIHtcclxuICAgIGxldCByZXN1bHQgPSB2YWx1ZSB8fCBbXTtcclxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnNwbGl0KCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGxvZ2luSGFuZGxlKHJlc3BvbnNlKSB7XHJcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgIGxldCB0b2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xyXG4gICAgdGhpcy5pbml0QXV0aEh0dHAodG9rZW4pO1xyXG5cclxuICAgIGxldCBjbGFpbXMgPSBkYXRhLnVzZXJDbGFpbXMgfHwgW107XHJcbiAgICBpZiAodHlwZW9mIGNsYWltcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgY2xhaW1zID0gSlNPTi5wYXJzZShjbGFpbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2Vzc2lvbi5sb2dpblVzZXIoe1xyXG4gICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgIHVzZXJOYW1lOiBkYXRhLnVzZXJOYW1lIHx8ICdwbGVhc2UgZ2l2ZSBtZSBhIG5hbWUhJyxcclxuICAgICAgdXNlckNsYWltczogY2xhaW1zLFxyXG4gICAgICB1c2VyUm9sZXM6IHRoaXMuX2NvbnZlcnRUb0FycmF5KGRhdGEudXNlclJvbGVzKSxcclxuICAgICAgdXNlckFjY2Vzc1JpZ2h0czogdGhpcy5fY29udmVydFRvQXJyYXkoZGF0YS51c2VyQWNjZXNzUmlnaHRzKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiB1c2UgYXMgaW4gYXVyZWxpYS12YWxpZGF0aW9uXHJcbiAgZXJyb3JIYW5kbGVyKHJlc3BvbnNlKSB7XHJcbiAgICB0aGlzLl9oaWRlTG9hZGluZ01hc2soKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZSk7XHJcbiAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEh0dHBCYWRSZXF1ZXN0TWVzc2FnZShlcnJvci5tZXNzYWdlKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQxOCkge1xyXG4gICAgICBjb25zdCBlcnJvcnMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgSHR0cFNlcnZlckVycm9yUmVxdWVzdE1lc3NhZ2UoZXJyb3JzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMSkge1xyXG4gICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBIdHRwU2Vzc2lvblRpbWVkT3V0TWVzc2FnZSgpKTtcclxuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ3Nlc3Npb25UaW1lZE91dCcpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAzKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5sb2NhbGUudHJhbnNsYXRlKCdhY2Nlc3NEZW5pZWQnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDUwMCkge1xyXG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcih0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2ludGVybmFsU2VydmVyRXJyb3InKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnRpbWVvdXQgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGhpcy5sb2NhbGUudHJhbnNsYXRlKCdyZXF1ZXN0VGltZW91dCcpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnZXJyb3JIYXBwZW5kJykpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
