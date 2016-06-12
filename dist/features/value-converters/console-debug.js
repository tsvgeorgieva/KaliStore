System.register([], function (_export) {
  'use strict';

  var ConsoleDebugValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      ConsoleDebugValueConverter = (function () {
        function ConsoleDebugValueConverter() {
          _classCallCheck(this, ConsoleDebugValueConverter);
        }

        _createClass(ConsoleDebugValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            console.log('Converter toView:   ', value);
            return value;
          }
        }, {
          key: 'fromView',
          value: function fromView(value) {
            console.log('Converter fromView: ', value);
            return value;
          }
        }]);

        return ConsoleDebugValueConverter;
      })();

      _export('ConsoleDebugValueConverter', ConsoleDebugValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvY29uc29sZS1kZWJ1Zy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSwwQkFBMEI7Ozs7Ozs7OztBQUExQixnQ0FBMEI7aUJBQTFCLDBCQUEwQjtnQ0FBMUIsMEJBQTBCOzs7cUJBQTFCLDBCQUEwQjs7aUJBQy9CLGdCQUFDLEtBQUssRUFBRTtBQUNaLG1CQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNDLG1CQUFPLEtBQUssQ0FBQztXQUNkOzs7aUJBRU8sa0JBQUMsS0FBSyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0MsbUJBQU8sS0FBSyxDQUFDO1dBQ2Q7OztlQVRVLDBCQUEwQiIsImZpbGUiOiJmZWF0dXJlcy92YWx1ZS1jb252ZXJ0ZXJzL2NvbnNvbGUtZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29uc29sZURlYnVnVmFsdWVDb252ZXJ0ZXIge1xyXG4gIHRvVmlldyh2YWx1ZSkge1xyXG4gICAgY29uc29sZS5sb2coJ0NvbnZlcnRlciB0b1ZpZXc6ICAgJywgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZnJvbVZpZXcodmFsdWUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdDb252ZXJ0ZXIgZnJvbVZpZXc6ICcsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
