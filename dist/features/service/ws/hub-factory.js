System.register(['aurelia-framework', 'jquery', 'aurelia-event-aggregator', '../http-client/http-client-messages', '../config', 'service'], function (_export) {
  'use strict';

  var inject, computedFrom, $, EventAggregator, HttpRequestStartedMessage, HttpRequestFinishedMessage, HttpBadRequestMessage, HttpServerErrorRequestMessage, HttpSessionTimedOutMessage, Config, Logger, HubFactory;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_httpClientHttpClientMessages) {
      HttpRequestStartedMessage = _httpClientHttpClientMessages.HttpRequestStartedMessage;
      HttpRequestFinishedMessage = _httpClientHttpClientMessages.HttpRequestFinishedMessage;
      HttpBadRequestMessage = _httpClientHttpClientMessages.HttpBadRequestMessage;
      HttpServerErrorRequestMessage = _httpClientHttpClientMessages.HttpServerErrorRequestMessage;
      HttpSessionTimedOutMessage = _httpClientHttpClientMessages.HttpSessionTimedOutMessage;
    }, function (_config) {
      Config = _config.Config;
    }, function (_service) {
      Logger = _service.Logger;
    }],
    execute: function () {
      HubFactory = (function () {
        function HubFactory(eventAggregator, logger) {
          var _this = this;

          _classCallCheck(this, _HubFactory);

          this.eventAggregator = eventAggregator;
          this.logger = logger;

          this.hubMap = new Map();
          this.hubNotDispatchingEventsMap = new Map();

          this.isConnected = false;

          this.url = Config.wsOpts.hubHost + Config.wsOpts.hubHostSuffix;
          this.transport = Config.wsOpts.transport;
          Config.wsOpts.hubs.forEach(function (hubName) {
            return _this.registerHub(hubName);
          });

          this.getHub(hub.usersSessionManagementHub).subscribe('x', function (x) {
            console.log('fuck off');
          });
        }

        _createClass(HubFactory, [{
          key: 'connect',
          value: function connect(authToken) {
            var _this2 = this;

            $.connection.hub.stop();
            $.connection.hub.qs = { auth_token: authToken };
            $.connection.hub.url = this.url;
            $.connection.hub.logging = true;
            var conn = $.connection.hub.start({
              transport: this.transport
            }).done(function () {
              _this2.isConnected = true;
              $.connection.hub.log('My id: ' + $.connection.hub.id);
            }).fail(function (error) {
              _this2.logger.error('Connection failed!');
              if (error.context.status === 401) {
                _this2.eventAggregator.publish(new HttpSessionTimedOutMessage());
              }
            });

            return new Promise(function (resolve, reject) {
              conn.done(resolve);
              conn.fail(reject);
            });
          }
        }, {
          key: 'disconnect',
          value: function disconnect() {
            $.connection.hub.stop();
          }
        }, {
          key: 'registerHub',
          value: function registerHub(hubName, subscriptions) {
            if (this.isConnected) {
              throw new Error('Hubs must be registered before connection!');
            }

            var proxyHub = $.connection[hubName];
            if (proxyHub === undefined) {
              throw new Error('Argument Exception. There is no hub with name: ' + hubName);
            }

            Object.assign(proxyHub.client, subscriptions || {});

            this.hubMap.set(hubName, this._createHub(proxyHub, true));
            this.hubNotDispatchingEventsMap.set(hubName, this._createHub(proxyHub, false));
          }
        }, {
          key: '_createHub',
          value: function _createHub(proxyHub, dispatchEvents) {
            var _this3 = this;

            var proxyHubFunctions = Object.keys(proxyHub.server);
            var hub = proxyHubFunctions.reduce(function (acc, funcName) {
              acc[funcName] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                if (dispatchEvents) {
                  _this3.eventAggregator.publish(new HttpRequestStartedMessage());
                }

                var proxyPromise = proxyHub.server[funcName].apply(null, args);
                var promise = new Promise(function (resolve, reject) {
                  proxyPromise.done(resolve);
                  proxyPromise.fail(reject);
                }).then(function (response) {
                  if (dispatchEvents) {
                    _this3.eventAggregator.publish(new HttpRequestFinishedMessage());
                  }

                  return response;
                });

                promise['catch'](function (error) {
                  _this3._errorHandler.bind(error, dispatchEvents);
                });

                return promise;
              };

              return acc;
            }, {});

            hub.subscribe = function (name, callback) {
              proxyHub.on(name, callback);
            };

            hub.unsubscribe = function (name, callback) {
              proxyHub.off(name);
            };

            return hub;
          }
        }, {
          key: 'getHub',
          value: function getHub(hubName, opts) {
            var doNotDispatchEvents = opts && opts.dispatchEvents === false;
            var hub = undefined;
            if (doNotDispatchEvents) {
              hub = this.hubNotDispatchingEventsMap.get(hubName);
            } else {
              hub = this.hubMap.get(hubName);
            }

            if (hub === undefined) {
              throw new Error('Argument Exception. There is no hub with name: ' + hubName);
            }

            return hub;
          }
        }, {
          key: '_errorHandler',
          value: function _errorHandler(error, dispatchEvents) {
            if (dispatchEvents) {
              this.eventAggregator.publish(new HttpRequestFinishedMessage());
            }

            this.eventAggregator.publish(new HttpBadRequestMessage(error.message));
          }
        }]);

        var _HubFactory = HubFactory;
        HubFactory = inject(EventAggregator, Logger)(HubFactory) || HubFactory;
        return HubFactory;
      })();

      _export('HubFactory', HubFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2Uvd3MvaHViLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3lNQWlCYSxVQUFVOzs7Ozs7OztpQ0FqQmYsTUFBTTt1Q0FBRSxZQUFZOzs7O2dEQUtwQixlQUFlOztnRUFFckIseUJBQXlCO2lFQUFFLDBCQUEwQjs0REFDckQscUJBQXFCO29FQUFFLDZCQUE2QjtpRUFDcEQsMEJBQTBCOzt1QkFHcEIsTUFBTTs7d0JBRU4sTUFBTTs7O0FBR0QsZ0JBQVU7QUFDVixpQkFEQSxVQUFVLENBQ1QsZUFBZSxFQUFFLE1BQU0sRUFBRTs7Ozs7QUFDbkMsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdkMsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBR3JCLGNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN4QixjQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFNUMsY0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O0FBRXpCLGNBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDL0QsY0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUN6QyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTzttQkFBSSxNQUFLLFdBQVcsQ0FBQyxPQUFPLENBQUM7V0FBQSxDQUFDLENBQUM7O0FBR2pFLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFBLENBQUMsRUFBSTtBQUM3RCxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztXQUN6QixDQUFDLENBQUM7U0FDSjs7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QyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQ3BCLGdCQUFNLG1CQUFtQixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQztBQUNsRSxnQkFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLGdCQUFJLG1CQUFtQixFQUFFO0FBQ3ZCLGlCQUFHLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwRCxNQUFNO0FBQ0wsaUJBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQzs7QUFFRCxnQkFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3JCLG9CQUFNLElBQUksS0FBSyxxREFBbUQsT0FBTyxDQUFHLENBQUM7YUFDOUU7O0FBRUQsbUJBQU8sR0FBRyxDQUFDO1dBQ1o7OztpQkFHWSx1QkFBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO0FBQ25DLGdCQUFJLGNBQWMsRUFBRTtBQUVsQixrQkFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDLENBQUM7YUFDaEU7O0FBRUQsZ0JBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQXFCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7V0FHeEU7OzswQkF0SVUsVUFBVTtBQUFWLGtCQUFVLEdBRHRCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQ25CLFVBQVUsS0FBVixVQUFVO2VBQVYsVUFBVSIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL3dzL2h1Yi1mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGNvbXB1dGVkRnJvbX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG4vLyBJTVBPUlRBTlQhIG5lZWRzIHRvIGJlIHVuY29tbWVudGVkIGlmIHVzZWQhXHJcbi8vaW1wb3J0ICdsaWJzL2pxdWVyeS5zaWduYWxSJztcclxuLy9pbXBvcnQgJ2xpYnMvaHVicyc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UsIEh0dHBSZXF1ZXN0RmluaXNoZWRNZXNzYWdlLFxyXG4gIEh0dHBCYWRSZXF1ZXN0TWVzc2FnZSwgSHR0cFNlcnZlckVycm9yUmVxdWVzdE1lc3NhZ2UsXHJcbiAgSHR0cFNlc3Npb25UaW1lZE91dE1lc3NhZ2VcclxufSBmcm9tICcuLi9odHRwLWNsaWVudC9odHRwLWNsaWVudC1tZXNzYWdlcyc7XHJcblxyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yLCBMb2dnZXIpXHJcbmV4cG9ydCBjbGFzcyBIdWJGYWN0b3J5IHtcclxuICBjb25zdHJ1Y3RvcihldmVudEFnZ3JlZ2F0b3IsIGxvZ2dlcikge1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IgPSBldmVudEFnZ3JlZ2F0b3I7XHJcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuXHJcbiAgICAvLyB0b2RvOiBsb3cgcHJpb3JpdHk6IG9wdGltaXplXHJcbiAgICB0aGlzLmh1Yk1hcCA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMuaHViTm90RGlzcGF0Y2hpbmdFdmVudHNNYXAgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXJsID0gQ29uZmlnLndzT3B0cy5odWJIb3N0ICsgQ29uZmlnLndzT3B0cy5odWJIb3N0U3VmZml4O1xyXG4gICAgdGhpcy50cmFuc3BvcnQgPSBDb25maWcud3NPcHRzLnRyYW5zcG9ydDtcclxuICAgIENvbmZpZy53c09wdHMuaHVicy5mb3JFYWNoKGh1Yk5hbWUgPT4gdGhpcy5yZWdpc3Rlckh1YihodWJOYW1lKSk7XHJcblxyXG4gICAgLy8gdG9kbzogcmVtb3ZlISBiZSBhd2FyZSB0aGF0IG9uQ29ubmVjdGVkIGNhbGxiYWNrIHdvbid0IGJlIGZpcmVkIGF0IGh1YlxyXG4gICAgdGhpcy5nZXRIdWIoaHViLnVzZXJzU2Vzc2lvbk1hbmFnZW1lbnRIdWIpLnN1YnNjcmliZSgneCcsIHggPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnZnVjayBvZmYnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdChhdXRoVG9rZW4pIHtcclxuICAgICQuY29ubmVjdGlvbi5odWIuc3RvcCgpO1xyXG4gICAgJC5jb25uZWN0aW9uLmh1Yi5xcyA9IHsgYXV0aF90b2tlbjogYXV0aFRva2VufTtcclxuICAgICQuY29ubmVjdGlvbi5odWIudXJsID0gdGhpcy51cmw7XHJcbiAgICAkLmNvbm5lY3Rpb24uaHViLmxvZ2dpbmcgPSB0cnVlO1xyXG4gICAgY29uc3QgY29ubiA9ICQuY29ubmVjdGlvbi5odWIuc3RhcnQoe1xyXG4gICAgICB0cmFuc3BvcnQ6IHRoaXMudHJhbnNwb3J0XHJcbiAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICQuY29ubmVjdGlvbi5odWIubG9nKCdNeSBpZDogJyArICQuY29ubmVjdGlvbi5odWIuaWQpO1xyXG4gICAgfSkuZmFpbChlcnJvciA9PiB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdDb25uZWN0aW9uIGZhaWxlZCEnKTtcclxuICAgICAgaWYgKGVycm9yLmNvbnRleHQuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBIdHRwU2Vzc2lvblRpbWVkT3V0TWVzc2FnZSgpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBjb25uLmRvbmUocmVzb2x2ZSk7XHJcbiAgICAgIGNvbm4uZmFpbChyZWplY3QpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgJC5jb25uZWN0aW9uLmh1Yi5zdG9wKCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlckh1YihodWJOYW1lLCBzdWJzY3JpcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0h1YnMgbXVzdCBiZSByZWdpc3RlcmVkIGJlZm9yZSBjb25uZWN0aW9uIScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb3h5SHViID0gJC5jb25uZWN0aW9uW2h1Yk5hbWVdO1xyXG4gICAgaWYgKHByb3h5SHViID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBcmd1bWVudCBFeGNlcHRpb24uIFRoZXJlIGlzIG5vIGh1YiB3aXRoIG5hbWU6ICR7aHViTmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHByb3h5SHViLmNsaWVudCwgc3Vic2NyaXB0aW9ucyB8fCB7fSk7XHJcblxyXG4gICAgdGhpcy5odWJNYXAuc2V0KGh1Yk5hbWUsIHRoaXMuX2NyZWF0ZUh1Yihwcm94eUh1YiwgdHJ1ZSkpO1xyXG4gICAgdGhpcy5odWJOb3REaXNwYXRjaGluZ0V2ZW50c01hcC5zZXQoaHViTmFtZSwgdGhpcy5fY3JlYXRlSHViKHByb3h5SHViLCBmYWxzZSkpO1xyXG4gIH1cclxuXHJcbiAgX2NyZWF0ZUh1Yihwcm94eUh1YiwgZGlzcGF0Y2hFdmVudHMpIHtcclxuICAgIGNvbnN0IHByb3h5SHViRnVuY3Rpb25zID0gT2JqZWN0LmtleXMocHJveHlIdWIuc2VydmVyKTtcclxuICAgIGNvbnN0IGh1YiA9IHByb3h5SHViRnVuY3Rpb25zLnJlZHVjZSgoYWNjLCBmdW5jTmFtZSkgPT4ge1xyXG4gICAgICBhY2NbZnVuY05hbWVdID0gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBpZiAoZGlzcGF0Y2hFdmVudHMpIHtcclxuICAgICAgICAgIC8vIHRvZG86IGNyZWF0ZSBzZXBhcmF0ZSBldmVudFxyXG4gICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgSHR0cFJlcXVlc3RTdGFydGVkTWVzc2FnZSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb3h5UHJvbWlzZSA9IHByb3h5SHViLnNlcnZlcltmdW5jTmFtZV0uYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgcHJveHlQcm9taXNlLmRvbmUocmVzb2x2ZSk7XHJcbiAgICAgICAgICBwcm94eVByb21pc2UuZmFpbChyZWplY3QpO1xyXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgaWYgKGRpc3BhdGNoRXZlbnRzKSB7XHJcbiAgICAgICAgICAgIC8vIHRvZG86IGNyZWF0ZSBzZXBhcmF0ZSBldmVudFxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBIdHRwUmVxdWVzdEZpbmlzaGVkTWVzc2FnZSgpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb21pc2UuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVyLmJpbmQoZXJyb3IsIGRpc3BhdGNoRXZlbnRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG5cclxuXHJcbiAgICBodWIuc3Vic2NyaWJlID0gKG5hbWUsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgIHByb3h5SHViLm9uKG5hbWUsIGNhbGxiYWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgaHViLnVuc3Vic2NyaWJlID0gKG5hbWUsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgIHByb3h5SHViLm9mZihuYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGh1YjtcclxuICB9XHJcblxyXG4gIGdldEh1YihodWJOYW1lLCBvcHRzKSB7XHJcbiAgICBjb25zdCBkb05vdERpc3BhdGNoRXZlbnRzID0gb3B0cyAmJiBvcHRzLmRpc3BhdGNoRXZlbnRzID09PSBmYWxzZTtcclxuICAgIGxldCBodWI7XHJcbiAgICBpZiAoZG9Ob3REaXNwYXRjaEV2ZW50cykge1xyXG4gICAgICBodWIgPSB0aGlzLmh1Yk5vdERpc3BhdGNoaW5nRXZlbnRzTWFwLmdldChodWJOYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGh1YiA9IHRoaXMuaHViTWFwLmdldChodWJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaHViID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBcmd1bWVudCBFeGNlcHRpb24uIFRoZXJlIGlzIG5vIGh1YiB3aXRoIG5hbWU6ICR7aHViTmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaHViO1xyXG4gIH1cclxuXHJcblxyXG4gIF9lcnJvckhhbmRsZXIoZXJyb3IsIGRpc3BhdGNoRXZlbnRzKSB7XHJcbiAgICBpZiAoZGlzcGF0Y2hFdmVudHMpIHtcclxuICAgICAgLy8gdG9kbzogY3JlYXRlIHNlcGFyYXRlIGV2ZW50XHJcbiAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEh0dHBSZXF1ZXN0RmluaXNoZWRNZXNzYWdlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEh0dHBCYWRSZXF1ZXN0TWVzc2FnZShlcnJvci5tZXNzYWdlKSk7XHJcbiAgICAvL3RoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2gobmV3IEh0dHBTZXJ2ZXJFcnJvclJlcXVlc3RNZXNzYWdlKGVycm9ycykpO1xyXG4gICAgLy90aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBIdHRwU2Vzc2lvblRpbWVkT3V0TWVzc2FnZSgpKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
