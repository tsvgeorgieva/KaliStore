System.register(['moment'], function (_export) {
  'use strict';

  var moment, ShortDateFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      ShortDateFormatValueConverter = (function () {
        function ShortDateFormatValueConverter() {
          _classCallCheck(this, ShortDateFormatValueConverter);
        }

        _createClass(ShortDateFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            if (format) {
              return moment(value).format(format);
            }
            return value ? moment(value).format('L') : '';
          }
        }]);

        return ShortDateFormatValueConverter;
      })();

      _export('ShortDateFormatValueConverter', ShortDateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc2hvcnQtZGF0ZS1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2NBRWEsNkJBQTZCOzs7Ozs7Ozs7OztBQUE3QixtQ0FBNkI7aUJBQTdCLDZCQUE2QjtnQ0FBN0IsNkJBQTZCOzs7cUJBQTdCLDZCQUE2Qjs7aUJBQ2xDLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsZ0JBQUksTUFBTSxFQUFFO0FBQ1YscUJBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQztBQUNELG1CQUFPLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztXQUMvQzs7O2VBTlUsNkJBQTZCIiwiZmlsZSI6ImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc2hvcnQtZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hvcnREYXRlRm9ybWF0VmFsdWVDb252ZXJ0ZXIge1xyXG4gIHRvVmlldyh2YWx1ZSwgZm9ybWF0KSB7XHJcbiAgICBpZiAoZm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gbW9tZW50KHZhbHVlKS5mb3JtYXQoJ0wnKSA6ICcnO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
