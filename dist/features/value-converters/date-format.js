System.register(['moment'], function (_export) {
  'use strict';

  var moment, DateFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      DateFormatValueConverter = (function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        _createClass(DateFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            if (format) {
              return moment(value).format(format);
            }
            return value ? moment(value).format('L') : '';
          }
        }]);

        return DateFormatValueConverter;
      })();

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZGF0ZS1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2NBRWEsd0JBQXdCOzs7Ozs7Ozs7OztBQUF4Qiw4QkFBd0I7aUJBQXhCLHdCQUF3QjtnQ0FBeEIsd0JBQXdCOzs7cUJBQXhCLHdCQUF3Qjs7aUJBQzdCLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsZ0JBQUksTUFBTSxFQUFFO0FBQ1YscUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQztBQUNELG1CQUFPLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztXQUMvQzs7O2VBTlUsd0JBQXdCIiwiZmlsZSI6ImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFZhbHVlQ29udmVydGVyIHtcclxuICB0b1ZpZXcodmFsdWUsIGZvcm1hdCkge1xyXG4gICAgaWYgKGZvcm1hdCkge1xyXG4gICAgICByZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSA/IG1vbWVudCh2YWx1ZSkuZm9ybWF0KCdMJykgOiAnJztcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
