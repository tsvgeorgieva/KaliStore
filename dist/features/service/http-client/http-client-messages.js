System.register([], function (_export) {
  "use strict";

  var HttpRequestStartedMessage, HttpRequestFinishedMessage, HttpBadRequestMessage, HttpServerErrorRequestMessage, HttpSessionTimedOutMessage;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      HttpRequestStartedMessage = function HttpRequestStartedMessage() {
        _classCallCheck(this, HttpRequestStartedMessage);
      };

      _export("HttpRequestStartedMessage", HttpRequestStartedMessage);

      HttpRequestFinishedMessage = function HttpRequestFinishedMessage() {
        _classCallCheck(this, HttpRequestFinishedMessage);
      };

      _export("HttpRequestFinishedMessage", HttpRequestFinishedMessage);

      HttpBadRequestMessage = function HttpBadRequestMessage(error) {
        _classCallCheck(this, HttpBadRequestMessage);

        this.error = error;
      };

      _export("HttpBadRequestMessage", HttpBadRequestMessage);

      HttpServerErrorRequestMessage = function HttpServerErrorRequestMessage(errors) {
        _classCallCheck(this, HttpServerErrorRequestMessage);

        this.errors = errors;
      };

      _export("HttpServerErrorRequestMessage", HttpServerErrorRequestMessage);

      HttpSessionTimedOutMessage = function HttpSessionTimedOutMessage() {
        _classCallCheck(this, HttpSessionTimedOutMessage);
      };

      _export("HttpSessionTimedOutMessage", HttpSessionTimedOutMessage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvaHR0cC1jbGllbnQvaHR0cC1jbGllbnQtbWVzc2FnZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BQWEseUJBQXlCLEVBR3pCLDBCQUEwQixFQUcxQixxQkFBcUIsRUFNckIsNkJBQTZCLEVBTTdCLDBCQUEwQjs7Ozs7OztBQWxCMUIsK0JBQXlCLFlBQXpCLHlCQUF5Qjs4QkFBekIseUJBQXlCOzs7OztBQUd6QixnQ0FBMEIsWUFBMUIsMEJBQTBCOzhCQUExQiwwQkFBMEI7Ozs7O0FBRzFCLDJCQUFxQixHQUNyQixTQURBLHFCQUFxQixDQUNwQixLQUFLLEVBQUU7OEJBRFIscUJBQXFCOztBQUU5QixZQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztPQUNwQjs7OztBQUdVLG1DQUE2QixHQUM3QixTQURBLDZCQUE2QixDQUM1QixNQUFNLEVBQUU7OEJBRFQsNkJBQTZCOztBQUV0QyxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztPQUN0Qjs7OztBQUdVLGdDQUEwQixZQUExQiwwQkFBMEI7OEJBQTFCLDBCQUEwQiIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2h0dHAtY2xpZW50L2h0dHAtY2xpZW50LW1lc3NhZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0U3RhcnRlZE1lc3NhZ2Uge1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3RGaW5pc2hlZE1lc3NhZ2Uge1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cEJhZFJlcXVlc3RNZXNzYWdlIHtcclxuICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBTZXJ2ZXJFcnJvclJlcXVlc3RNZXNzYWdlIHtcclxuICBjb25zdHJ1Y3RvcihlcnJvcnMpIHtcclxuICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBTZXNzaW9uVGltZWRPdXRNZXNzYWdlIHtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
