System.register(['moment'], function (_export) {
  'use strict';

  var moment, DateTimeFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      DateTimeFormatValueConverter = (function () {
        function DateTimeFormatValueConverter() {
          _classCallCheck(this, DateTimeFormatValueConverter);
        }

        _createClass(DateTimeFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            if (format) {
              return moment(value).format(format);
            }
            return value ? moment(value).format('LLL') : '';
          }
        }]);

        return DateTimeFormatValueConverter;
      })();

      _export('DateTimeFormatValueConverter', DateTimeFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZGF0ZS10aW1lLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FFYSw0QkFBNEI7Ozs7Ozs7Ozs7O0FBQTVCLGtDQUE0QjtpQkFBNUIsNEJBQTRCO2dDQUE1Qiw0QkFBNEI7OztxQkFBNUIsNEJBQTRCOztpQkFDakMsZ0JBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxNQUFNLEVBQUU7QUFDVixxQkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO0FBQ0QsbUJBQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1dBQ2pEOzs7ZUFOVSw0QkFBNEIiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9kYXRlLXRpbWUtZm9ybWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lRm9ybWF0VmFsdWVDb252ZXJ0ZXIge1xyXG4gIHRvVmlldyh2YWx1ZSwgZm9ybWF0KSB7XHJcbiAgICBpZiAoZm9ybWF0KSB7XHJcbiAgICAgIHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gbW9tZW50KHZhbHVlKS5mb3JtYXQoJ0xMTCcpIDogJyc7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
