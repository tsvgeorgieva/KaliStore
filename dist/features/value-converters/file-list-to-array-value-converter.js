System.register([], function (_export) {
  "use strict";

  var FileListToArrayValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      FileListToArrayValueConverter = (function () {
        function FileListToArrayValueConverter() {
          _classCallCheck(this, FileListToArrayValueConverter);
        }

        _createClass(FileListToArrayValueConverter, [{
          key: "toView",
          value: function toView(fileList) {
            var files = [];
            if (!fileList) {
              return files;
            }
            for (var i = 0; i < fileList.length; i++) {
              files.push(fileList.item(i));
            }
            return files;
          }
        }]);

        return FileListToArrayValueConverter;
      })();

      _export("FileListToArrayValueConverter", FileListToArrayValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZmlsZS1saXN0LXRvLWFycmF5LXZhbHVlLWNvbnZlcnRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSw2QkFBNkI7Ozs7Ozs7OztBQUE3QixtQ0FBNkI7aUJBQTdCLDZCQUE2QjtnQ0FBN0IsNkJBQTZCOzs7cUJBQTdCLDZCQUE2Qjs7aUJBQ2xDLGdCQUFDLFFBQVEsRUFBRTtBQUNmLGdCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixnQkFBSSxDQUFDLFFBQVEsRUFBRTtBQUNiLHFCQUFPLEtBQUssQ0FBQzthQUNkO0FBQ0QsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hDLG1CQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtBQUNELG1CQUFPLEtBQUssQ0FBQztXQUNkOzs7ZUFWVSw2QkFBNkIiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9maWxlLWxpc3QtdG8tYXJyYXktdmFsdWUtY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEZpbGVMaXN0VG9BcnJheVZhbHVlQ29udmVydGVyIHtcclxuICB0b1ZpZXcoZmlsZUxpc3QpIHtcclxuICAgIGxldCBmaWxlcyA9IFtdO1xyXG4gICAgaWYgKCFmaWxlTGlzdCkge1xyXG4gICAgICByZXR1cm4gZmlsZXM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZpbGVzLnB1c2goZmlsZUxpc3QuaXRlbShpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZXM7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
