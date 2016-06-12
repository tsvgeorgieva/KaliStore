System.register(['moment'], function (_export) {
  'use strict';

  var moment, ShortDateTimeFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      ShortDateTimeFormatValueConverter = (function () {
        function ShortDateTimeFormatValueConverter() {
          _classCallCheck(this, ShortDateTimeFormatValueConverter);
        }

        _createClass(ShortDateTimeFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            if (format) {
              return moment(value).format(format);
            }
            return value ? moment(value).format('DD.MM.YYYY HH:mm') : '';
          }
        }]);

        return ShortDateTimeFormatValueConverter;
      })();

      _export('ShortDateTimeFormatValueConverter', ShortDateTimeFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc2hvcnQtZGF0ZS10aW1lLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FFYSxpQ0FBaUM7Ozs7Ozs7Ozs7O0FBQWpDLHVDQUFpQztpQkFBakMsaUNBQWlDO2dDQUFqQyxpQ0FBaUM7OztxQkFBakMsaUNBQWlDOztpQkFDdEMsZ0JBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxNQUFNLEVBQUU7QUFDVixxQkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO0FBQ0QsbUJBQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUM7V0FDOUQ7OztlQU5VLGlDQUFpQyIsImZpbGUiOiJmZWF0dXJlcy92YWx1ZS1jb252ZXJ0ZXJzL3Nob3J0LWRhdGUtdGltZS1mb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hvcnREYXRlVGltZUZvcm1hdFZhbHVlQ29udmVydGVyIHtcclxuICB0b1ZpZXcodmFsdWUsIGZvcm1hdCkge1xyXG4gICAgaWYgKGZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSA/IG1vbWVudCh2YWx1ZSkuZm9ybWF0KCdERC5NTS5ZWVlZIEhIOm1tJykgOiAnJztcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
