System.register([], function (_export) {
  "use strict";

  var Tokenizers;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      Tokenizers = (function () {
        function Tokenizers() {
          _classCallCheck(this, Tokenizers);
        }

        _createClass(Tokenizers, null, [{
          key: "whitespace",
          value: function whitespace(str) {
            str = str.toString();
            var regex = /\S+/g;
            return Tokenizers.matchRegex(str, regex);
          }
        }, {
          key: "nonword",
          value: function nonword(str) {
            str = str.toString();

            var regex = /[A-Za-z0-9_А-Яа-я]+/g;
            return Tokenizers.matchRegex(str, regex);
          }
        }, {
          key: "matchRegex",
          value: function matchRegex(str, regex) {
            var match = undefined;
            var matches = [];
            while ((match = regex.exec(str)) != null) {
              matches.push({
                value: match[0],
                position: match.index
              });
            }

            return matches;
          }
        }]);

        return Tokenizers;
      })();

      _export("Tokenizers", Tokenizers);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NlbGVjdDMvdG9rZW5pemVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSxVQUFVOzs7Ozs7Ozs7QUFBVixnQkFBVTtpQkFBVixVQUFVO2dDQUFWLFVBQVU7OztxQkFBVixVQUFVOztpQkFDSixvQkFBQyxHQUFHLEVBQUU7QUFDckIsZUFBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ25CLG1CQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1dBQzFDOzs7aUJBRWEsaUJBQUMsR0FBRyxFQUFFO0FBQ2xCLGVBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O0FBRXJCLGdCQUFJLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztBQUNuQyxtQkFBTyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztXQUMxQzs7O2lCQUVnQixvQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQzVCLGdCQUFJLEtBQUssWUFBQSxDQUFDO0FBQ1YsZ0JBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixtQkFBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLElBQUssSUFBSSxFQUFFO0FBQ3hDLHFCQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1gscUJBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2Ysd0JBQVEsRUFBRSxLQUFLLENBQUMsS0FBSztlQUN0QixDQUFDLENBQUM7YUFDSjs7QUFFRCxtQkFBTyxPQUFPLENBQUM7V0FDaEI7OztlQXpCVSxVQUFVIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL3NlbGVjdDMvdG9rZW5pemVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUb2tlbml6ZXJzIHtcclxuICBzdGF0aWMgd2hpdGVzcGFjZShzdHIpIHtcclxuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG4gICAgbGV0IHJlZ2V4ID0gL1xcUysvZztcclxuICAgIHJldHVybiBUb2tlbml6ZXJzLm1hdGNoUmVnZXgoc3RyLCByZWdleCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbm9ud29yZChzdHIpIHtcclxuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG4gICAgLy8gdG9kbzogZml4IGZvciBhbGwgbGV0dGVyc1xyXG4gICAgbGV0IHJlZ2V4ID0gL1tBLVphLXowLTlf0JAt0K/QsC3Rj10rL2c7XHJcbiAgICByZXR1cm4gVG9rZW5pemVycy5tYXRjaFJlZ2V4KHN0ciwgcmVnZXgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG1hdGNoUmVnZXgoc3RyLCByZWdleCkge1xyXG4gICAgbGV0IG1hdGNoO1xyXG4gICAgbGV0IG1hdGNoZXMgPSBbXTtcclxuICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKHN0cikpICE9IG51bGwpIHtcclxuICAgICAgbWF0Y2hlcy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogbWF0Y2hbMF0sXHJcbiAgICAgICAgcG9zaXRpb246IG1hdGNoLmluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXRjaGVzO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0T2JqVG9rZW5pemVyKHRva2VuaXplcikge1xyXG4gIC8vICByZXR1cm4gZnVuY3Rpb24gc2V0S2V5KGtleXMpIHtcclxuICAvLyAgICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAvLyAgICByZXR1cm4gZnVuY3Rpb24gdG9rZW5pemUobykge1xyXG4gIC8vICAgICAgdmFyIHRva2VucyA9IFtdO1xyXG4gIC8vICAgICAgXy5lYWNoKGtleXMsIGZ1bmN0aW9uKGspIHtcclxuICAvLyAgICAgICAgdG9rZW5zID0gdG9rZW5zLmNvbmNhdCh0b2tlbml6ZXIoXy50b1N0cihvW2tdKSkpO1xyXG4gIC8vICAgICAgfSk7XHJcbiAgLy8gICAgICByZXR1cm4gdG9rZW5zO1xyXG4gIC8vICAgIH07XHJcbiAgLy8gIH07XHJcbiAgLy99XHJcbn1cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
