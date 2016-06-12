System.register([], function (_export) {
  'use strict';

  var SumFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      SumFormatValueConverter = (function () {
        function SumFormatValueConverter() {
          _classCallCheck(this, SumFormatValueConverter);
        }

        _createClass(SumFormatValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            if (value === undefined || value === null || value === '') {
              return;
            }

            return '' + value.amount.toLocaleString('bg-BG', {
              style: 'currency',
              currency: value.currency
            });
          }
        }]);

        return SumFormatValueConverter;
      })();

      _export('SumFormatValueConverter', SumFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc3VtLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSx1QkFBdUI7Ozs7Ozs7OztBQUF2Qiw2QkFBdUI7aUJBQXZCLHVCQUF1QjtnQ0FBdkIsdUJBQXVCOzs7cUJBQXZCLHVCQUF1Qjs7aUJBQzVCLGdCQUFDLEtBQUssRUFBRTtBQUNaLGdCQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3pELHFCQUFPO2FBQ1I7O0FBRUQsd0JBQVUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO0FBQzdDLG1CQUFLLEVBQUUsVUFBVTtBQUNqQixzQkFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2FBQ3pCLENBQUMsQ0FBRztXQUNOOzs7ZUFWVSx1QkFBdUIiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9zdW0tZm9ybWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFN1bUZvcm1hdFZhbHVlQ29udmVydGVyIHtcclxuICB0b1ZpZXcodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAke3ZhbHVlLmFtb3VudC50b0xvY2FsZVN0cmluZygnYmctQkcnLCB7XHJcbiAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxyXG4gICAgICBjdXJyZW5jeTogdmFsdWUuY3VycmVuY3lcclxuICAgIH0pfWA7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8ke3ZhbHVlLmN1cnJlbmN5fVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
