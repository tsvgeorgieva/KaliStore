System.register([], function (_export) {
  "use strict";

  var BlobToUrlValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      BlobToUrlValueConverter = (function () {
        function BlobToUrlValueConverter() {
          _classCallCheck(this, BlobToUrlValueConverter);
        }

        _createClass(BlobToUrlValueConverter, [{
          key: "toView",
          value: function toView(blob) {
            return URL.createObjectURL(blob);
          }
        }]);

        return BlobToUrlValueConverter;
      })();

      _export("BlobToUrlValueConverter", BlobToUrlValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvYmxvYi10by11cmwtdmFsdWUtY29udmVydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLHVCQUF1Qjs7Ozs7Ozs7O0FBQXZCLDZCQUF1QjtpQkFBdkIsdUJBQXVCO2dDQUF2Qix1QkFBdUI7OztxQkFBdkIsdUJBQXVCOztpQkFDNUIsZ0JBQUMsSUFBSSxFQUFFO0FBQ1gsbUJBQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUNsQzs7O2VBSFUsdUJBQXVCIiwiZmlsZSI6ImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvYmxvYi10by11cmwtdmFsdWUtY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJsb2JUb1VybFZhbHVlQ29udmVydGVyIHtcclxuICB0b1ZpZXcoYmxvYikge1xyXG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
