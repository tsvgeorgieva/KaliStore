System.register([], function (_export) {
  'use strict';

  var Timespan;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Timespan = (function () {
        function Timespan(timespan) {
          _classCallCheck(this, Timespan);

          var hours = 0;
          var minutes = 0;
          if (typeof timespan === 'string') {
            var fragments = timespan.split(':');
            if (fragments.length >= 2) {
              hours = parseInt(fragments[0], 10);
              minutes = parseInt(fragments[1], 10);

              if (hours < 0 || hours > 23) {
                hours = 0;
              }

              if (minutes < 0 || minutes > 59) {
                minutes = 0;
              }
            }
          } else if (timespan.constructor.name === 'Moment') {
            hours = timespan.hours();
            minutes = timespan.minutes();
          }

          this.hours = hours;
          this.minutes = minutes;
        }

        _createClass(Timespan, [{
          key: 'toString',
          value: function toString() {
            var result = '';
            if (this.hours < 10) {
              result += '0';
            }

            result += this.hours + ':';

            if (this.minutes < 10) {
              result += '0';
            }

            result += this.minutes;

            return result;
          }
        }, {
          key: 'equals',
          value: function equals(other) {
            if (other === undefined || other === null) {
              return false;
            }

            return this.hours === other.hours && this.minutes === other.minutes;
          }
        }]);

        return Timespan;
      })();

      _export('Timespan', Timespan);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL3RpbWVzcGFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLFFBQVE7Ozs7Ozs7OztBQUFSLGNBQVE7QUFDUixpQkFEQSxRQUFRLENBQ1AsUUFBUSxFQUFFO2dDQURYLFFBQVE7O0FBRWpCLGNBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLGNBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQixjQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUNoQyxnQkFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQyxnQkFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUN6QixtQkFBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMscUJBQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVyQyxrQkFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7QUFDM0IscUJBQUssR0FBRyxDQUFDLENBQUM7ZUFDWDs7QUFFRCxrQkFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7QUFDL0IsdUJBQU8sR0FBRyxDQUFDLENBQUM7ZUFDYjthQUNGO1dBQ0YsTUFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUNqRCxpQkFBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN6QixtQkFBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztXQUM5Qjs7QUFFRCxjQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7cUJBekJVLFFBQVE7O2lCQTJCWCxvQkFBRztBQUNULGdCQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUU7QUFDbkIsb0JBQU0sSUFBSSxHQUFHLENBQUM7YUFDZjs7QUFFRCxrQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOztBQUUzQixnQkFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRTtBQUNyQixvQkFBTSxJQUFJLEdBQUcsQ0FBQzthQUNmOztBQUVELGtCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQzs7QUFFdkIsbUJBQU8sTUFBTSxDQUFDO1dBQ2Y7OztpQkFFSyxnQkFBQyxLQUFLLEVBQUU7QUFDWixnQkFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7QUFDekMscUJBQU8sS0FBSyxDQUFDO2FBQ2Q7O0FBRUQsbUJBQVEsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBRTtXQUN2RTs7O2VBbERVLFFBQVEiLCJmaWxlIjoiZmVhdHVyZXMvdXRpbHMvdGltZXNwYW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGltZXNwYW4ge1xyXG4gIGNvbnN0cnVjdG9yKHRpbWVzcGFuKSB7XHJcbiAgICBsZXQgaG91cnMgPSAwO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiB0aW1lc3BhbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgbGV0IGZyYWdtZW50cyA9IHRpbWVzcGFuLnNwbGl0KCc6Jyk7XHJcbiAgICAgIGlmIChmcmFnbWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBob3VycyA9IHBhcnNlSW50KGZyYWdtZW50c1swXSwgMTApO1xyXG4gICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludChmcmFnbWVudHNbMV0sIDEwKTtcclxuXHJcbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XHJcbiAgICAgICAgICBob3VycyA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XHJcbiAgICAgICAgICBtaW51dGVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGltZXNwYW4uY29uc3RydWN0b3IubmFtZSA9PT0gJ01vbWVudCcpIHtcclxuICAgICAgaG91cnMgPSB0aW1lc3Bhbi5ob3VycygpO1xyXG4gICAgICBtaW51dGVzID0gdGltZXNwYW4ubWludXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaG91cnMgPSBob3VycztcclxuICAgIHRoaXMubWludXRlcyA9IG1pbnV0ZXM7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgIGlmICh0aGlzLmhvdXJzIDwgMTApIHtcclxuICAgICAgcmVzdWx0ICs9ICcwJztcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHQgKz0gdGhpcy5ob3VycyArICc6JztcclxuXHJcbiAgICBpZiAodGhpcy5taW51dGVzIDwgMTApIHtcclxuICAgICAgcmVzdWx0ICs9ICcwJztcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHQgKz0gdGhpcy5taW51dGVzO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBlcXVhbHMob3RoZXIpIHtcclxuICAgIGlmIChvdGhlciA9PT0gdW5kZWZpbmVkIHx8IG90aGVyID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHRoaXMuaG91cnMgPT09IG90aGVyLmhvdXJzICYmIHRoaXMubWludXRlcyA9PT0gb3RoZXIubWludXRlcyk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
