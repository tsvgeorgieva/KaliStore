System.register(['aurelia-framework', 'aurelia-event-aggregator', '../http-client/http-client-messages', '../config', 'service'], function (_export) {
  'use strict';

  var inject, EventAggregator, HttpRequestStartedMessage, HttpRequestFinishedMessage, HttpBadRequestMessage, HttpServerErrorRequestMessage, HttpSessionTimedOutMessage, Config, Logger, WS;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
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
      WS = (function () {
        function WS(eventAggregator, logger) {
          _classCallCheck(this, _WS);

          this.eventAggregator = eventAggregator;
          this.logger = logger;

          this.isConnected = false;

          this.url = Config.wsOpts.hubHost + Config.wsOpts.hubHostSuffix;
        }

        _createClass(WS, [{
          key: 'connect',
          value: function connect(authToken) {
            var _this = this;

            if (this.isConnected) {
              throw new Error('You must disconnect first!');
            }

            var promise = new Promise(function (resolve, reject) {
              _this._connect(0, resolve, reject);
            });

            return promise;
          }
        }, {
          key: 'disconnect',
          value: function disconnect() {}
        }, {
          key: '_connect',
          value: function _connect(attempt, resolve, reject) {
            var _this2 = this;

            var connectionAttempt = attempt;
            var socket = new WebSocket(this.url);

            socket.onmessage = function (event) {
              console.log(event);
              var data = JSON.parse(event.data);
              console.log(data.text);
            };

            socket.onopen = function () {
              connectionAttempt = 1;
              socket.send('subscribe');
              resolve(socket);
            };

            socket.onclose = function () {
              if (connectionAttempt <= 3) {
                console.warn('WARNING: Lost server connection, attempting to reconnect. Attempt number ' + connectionAttempt);
                window.setTimeout(function () {
                  _this2._connect(connectionAttempt + 1);
                }, 5000);
              } else {
                console.warn('The connection with the server was lost.');
              }
            };
          }
        }]);

        var _WS = WS;
        WS = inject(EventAggregator, Logger)(WS) || WS;
        return WS;
      })();

      _export('WS', WS);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2Uvd3Mvd3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dMQWFhLEVBQUU7Ozs7Ozs7O2lDQWJQLE1BQU07O2dEQUNOLGVBQWU7O2dFQUVyQix5QkFBeUI7aUVBQUUsMEJBQTBCOzREQUNyRCxxQkFBcUI7b0VBQUUsNkJBQTZCO2lFQUNwRCwwQkFBMEI7O3VCQUdwQixNQUFNOzt3QkFFTixNQUFNOzs7QUFHRCxRQUFFO0FBQ0YsaUJBREEsRUFBRSxDQUNELGVBQWUsRUFBRSxNQUFNLEVBQUU7OztBQUNuQyxjQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsY0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O0FBRXpCLGNBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDaEU7O3FCQVJVLEVBQUU7O2lCQVVOLGlCQUFDLFNBQVMsRUFBRTs7O0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDcEIsb0JBQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUMvQzs7QUFFRCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQzdDLG9CQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ25DLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxPQUFPLENBQUM7V0FDaEI7OztpQkFFUyxzQkFBRyxFQUNaOzs7aUJBRU8sa0JBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7OztBQUNqQyxnQkFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7QUFDaEMsZ0JBQUksTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckMsa0JBQU0sQ0FBQyxTQUFTLEdBQUcsVUFBQyxLQUFLLEVBQUs7QUFDNUIscUJBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsa0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLHFCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QixDQUFDOztBQUVGLGtCQUFNLENBQUMsTUFBTSxHQUFHLFlBQU07QUFDcEIsK0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLG9CQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pCLHFCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakIsQ0FBQzs7QUFFRixrQkFBTSxDQUFDLE9BQU8sR0FBRyxZQUFNO0FBQ3JCLGtCQUFJLGlCQUFpQixJQUFJLENBQUMsRUFBRTtBQUMxQix1QkFBTyxDQUFDLElBQUksQ0FBQywyRUFBMkUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzlHLHNCQUFNLENBQUMsVUFBVSxDQUFDLFlBQU07QUFDdEIseUJBQUssUUFBUSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN0QyxFQUFFLElBQUksQ0FBQyxDQUFDO2VBQ1YsTUFBTTtBQUNMLHVCQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7ZUFDMUQ7YUFDRixDQUFDO1dBQ0g7OztrQkFuRFUsRUFBRTtBQUFGLFVBQUUsR0FEZCxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUNuQixFQUFFLEtBQUYsRUFBRTtlQUFGLEVBQUUiLCJmaWxlIjoiZmVhdHVyZXMvc2VydmljZS93cy93cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1xyXG4gIEh0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2UsIEh0dHBSZXF1ZXN0RmluaXNoZWRNZXNzYWdlLFxyXG4gIEh0dHBCYWRSZXF1ZXN0TWVzc2FnZSwgSHR0cFNlcnZlckVycm9yUmVxdWVzdE1lc3NhZ2UsXHJcbiAgSHR0cFNlc3Npb25UaW1lZE91dE1lc3NhZ2VcclxufSBmcm9tICcuLi9odHRwLWNsaWVudC9odHRwLWNsaWVudC1tZXNzYWdlcyc7XHJcblxyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yLCBMb2dnZXIpXHJcbmV4cG9ydCBjbGFzcyBXUyB7XHJcbiAgY29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yLCBsb2dnZXIpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcblxyXG4gICAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXJsID0gQ29uZmlnLndzT3B0cy5odWJIb3N0ICsgQ29uZmlnLndzT3B0cy5odWJIb3N0U3VmZml4O1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdChhdXRoVG9rZW4pIHtcclxuICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgZGlzY29ubmVjdCBmaXJzdCEnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fY29ubmVjdCgwLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0KCkge1xyXG4gIH1cclxuXHJcbiAgX2Nvbm5lY3QoYXR0ZW1wdCwgcmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB2YXIgY29ubmVjdGlvbkF0dGVtcHQgPSBhdHRlbXB0O1xyXG4gICAgdmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmwpO1xyXG5cclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEudGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgIGNvbm5lY3Rpb25BdHRlbXB0ID0gMTtcclxuICAgICAgc29ja2V0LnNlbmQoJ3N1YnNjcmliZScpO1xyXG4gICAgICByZXNvbHZlKHNvY2tldCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNvY2tldC5vbmNsb3NlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoY29ubmVjdGlvbkF0dGVtcHQgPD0gMykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogTG9zdCBzZXJ2ZXIgY29ubmVjdGlvbiwgYXR0ZW1wdGluZyB0byByZWNvbm5lY3QuIEF0dGVtcHQgbnVtYmVyICcgKyBjb25uZWN0aW9uQXR0ZW1wdCk7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fY29ubmVjdChjb25uZWN0aW9uQXR0ZW1wdCArIDEpO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyIHdhcyBsb3N0LicpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
