System.register(['bluebird'], function (_export) {
  'use strict';

  var Promise;

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function fakeQuery(subject) {
    var events = {};

    if (subject && subject === subject.window) {
      return {
        0: subject,
        load: function load(handler) {
          return subject.addEventListener('load', handler, false);
        },
        bind: function bind(event, handler) {
          return subject.addEventListener(event, handler, false);
        },
        unbind: function unbind(event, handler) {
          return subject.removeEventListener(event, handler, false);
        }
      };
    }

    return {
      0: subject,
      unbind: function unbind(event, handler) {
        var handlers = events[event] || [];

        if (handler) {
          var idx = handlers.indexOf(handler);
          if (idx !== -1) handlers.splice(idx, 1);
        } else {
          handlers = [];
        }

        events[event] = handlers;
      },
      bind: function bind(event, handler) {
        var current = events[event] || [];
        events[event] = current.concat(handler);
      },
      triggerHandler: function triggerHandler(event, args) {
        var handlers = events[event] || [];
        handlers.forEach(function (fn) {
          return fn.call.apply(fn, [{ type: event }].concat(_toConsumableArray(args)));
        });
      }
    };
  }

  return {
    setters: [function (_bluebird) {
      Promise = _bluebird['default'];
    }],
    execute: function () {
      window.jQuery = Object.assign(fakeQuery, {
        noop: function noop() {},
        isFunction: function isFunction(o) {
          return typeof o === 'function';
        },
        isArray: function isArray(arr) {
          return Array.isArray(arr);
        },
        type: function type(obj) {
          return typeof obj;
        },
        trim: function trim(str) {
          return str && str.trim();
        },
        extend: function extend() {
          return Object.assign.apply(Object, arguments);
        },
        each: function each(arr, cb) {
          return arr.forEach(function (v, i) {
            return cb(i, v);
          });
        },
        isEmptyObject: function isEmptyObject(obj) {
          return !obj || Object.keys(obj).length === 0;
        },
        makeArray: function makeArray(arr) {
          return [].slice.call(arr, 0);
        },
        Deferred: function Deferred() {
          var resolve, reject;
          var _promise = new Promise(function () {
            resolve = arguments[0];
            reject = arguments[1];
          });

          return { resolve: resolve, reject: reject, promise: function promise() {
              return _promise;
            } };
        },
        support: {
          cors: 'withCredentials' in new XMLHttpRequest()
        }
      });
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvalF1ZXJ5LXN0dWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTtBQUMxQixRQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0FBRWhCLFFBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQ3pDLGFBQU87QUFDTCxTQUFDLEVBQUUsT0FBTztBQUNWLFlBQUksRUFBRSxjQUFDLE9BQU87aUJBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO1NBQUE7QUFDbEUsWUFBSSxFQUFFLGNBQUMsS0FBSyxFQUFFLE9BQU87aUJBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO1NBQUE7QUFDeEUsY0FBTSxFQUFFLGdCQUFDLEtBQUssRUFBRSxPQUFPO2lCQUFJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztTQUFBO09BQzlFLENBQUM7S0FDSDs7QUFFRCxXQUFPO0FBQ0wsT0FBQyxFQUFFLE9BQU87QUFDVixZQUFNLEVBQUEsZ0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUNyQixZQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVuQyxZQUFJLE9BQU8sRUFBRTtBQUNYLGNBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsY0FBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekMsTUFBTTtBQUNMLGtCQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7O0FBRUQsY0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQztPQUMxQjtBQUNELFVBQUksRUFBQSxjQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDbkIsWUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQyxjQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUN6QztBQUNELG9CQUFjLEVBQUEsd0JBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUMxQixZQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25DLGdCQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtpQkFBSSxFQUFFLENBQUMsSUFBSSxNQUFBLENBQVAsRUFBRSxHQUFNLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyw0QkFBSyxJQUFJLEdBQUM7U0FBQSxDQUFDLENBQUM7T0FDekQ7S0FDRixDQUFDO0dBQ0g7Ozs7Ozs7QUFFRCxZQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO0FBRXZDLFlBQUksRUFBQSxnQkFBRyxFQUNOO0FBQ0Qsa0JBQVUsRUFBRSxvQkFBQSxDQUFDO2lCQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVU7U0FBQTtBQUN4QyxlQUFPLEVBQUUsaUJBQUEsR0FBRztpQkFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUFBO0FBQ2xDLFlBQUksRUFBRSxjQUFBLEdBQUc7aUJBQUksT0FBTyxHQUFHO1NBQUE7QUFDdkIsWUFBSSxFQUFFLGNBQUEsR0FBRztpQkFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtTQUFBO0FBQzlCLGNBQU0sRUFBRTtpQkFBYSxNQUFNLENBQUMsTUFBTSxNQUFBLENBQWIsTUFBTSxZQUFnQjtTQUFBO0FBQzNDLFlBQUksRUFBRSxjQUFDLEdBQUcsRUFBRSxFQUFFO2lCQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzttQkFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztXQUFBLENBQUM7U0FBQTtBQUNqRCxxQkFBYSxFQUFFLHVCQUFBLEdBQUc7aUJBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztTQUFBO0FBQzNELGlCQUFTLEVBQUUsbUJBQUEsR0FBRztpQkFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQUE7QUFDdkMsZ0JBQVEsRUFBQSxvQkFBRztBQUNULGNBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUNwQixjQUFJLFFBQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFXO0FBQ25DLG1CQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGtCQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxpQkFBTyxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxPQUFPLEVBQUU7cUJBQUssUUFBTzthQUFBLEVBQUMsQ0FBQztTQUNqRDtBQUNELGVBQU8sRUFBRTtBQUNQLGNBQUksRUFBRyxpQkFBaUIsSUFBSSxJQUFJLGNBQWMsRUFBRSxBQUFDO1NBQ2xEO09BQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3NlcnZpY2UvalF1ZXJ5LXN0dWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCBhamF4IGZyb20gJy4vYWpheCc7XHJcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcclxuXHJcbmZ1bmN0aW9uIGZha2VRdWVyeShzdWJqZWN0KSB7XHJcbiAgbGV0IGV2ZW50cyA9IHt9O1xyXG5cclxuICBpZiAoc3ViamVjdCAmJiBzdWJqZWN0ID09PSBzdWJqZWN0LndpbmRvdykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgMDogc3ViamVjdCxcclxuICAgICAgbG9hZDogKGhhbmRsZXIpPT4gc3ViamVjdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlciwgZmFsc2UpLFxyXG4gICAgICBiaW5kOiAoZXZlbnQsIGhhbmRsZXIpPT4gc3ViamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSksXHJcbiAgICAgIHVuYmluZDogKGV2ZW50LCBoYW5kbGVyKT0+IHN1YmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIDA6IHN1YmplY3QsXHJcbiAgICB1bmJpbmQoZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgICAgbGV0IGhhbmRsZXJzID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcclxuXHJcbiAgICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgICAgbGV0IGlkeCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XHJcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIGhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZXJzID0gW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV2ZW50c1tldmVudF0gPSBoYW5kbGVycztcclxuICAgIH0sXHJcbiAgICBiaW5kKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcclxuICAgICAgZXZlbnRzW2V2ZW50XSA9IGN1cnJlbnQuY29uY2F0KGhhbmRsZXIpO1xyXG4gICAgfSxcclxuICAgIHRyaWdnZXJIYW5kbGVyKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgIGxldCBoYW5kbGVycyA9IGV2ZW50c1tldmVudF0gfHwgW107XHJcbiAgICAgIGhhbmRsZXJzLmZvckVhY2goZm4gPT4gZm4uY2FsbCh7dHlwZTogZXZlbnR9LCAuLi5hcmdzKSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxud2luZG93LmpRdWVyeSA9IE9iamVjdC5hc3NpZ24oZmFrZVF1ZXJ5LCB7XHJcbiAgLy9hamF4LFxyXG4gIG5vb3AoKSB7XHJcbiAgfSxcclxuICBpc0Z1bmN0aW9uOiBvID0+IHR5cGVvZiBvID09PSAnZnVuY3Rpb24nLFxyXG4gIGlzQXJyYXk6IGFyciA9PiBBcnJheS5pc0FycmF5KGFyciksXHJcbiAgdHlwZTogb2JqID0+IHR5cGVvZiBvYmosXHJcbiAgdHJpbTogc3RyID0+IHN0ciAmJiBzdHIudHJpbSgpLFxyXG4gIGV4dGVuZDogKC4uLmFyZ3MpID0+IE9iamVjdC5hc3NpZ24oLi4uYXJncyksXHJcbiAgZWFjaDogKGFyciwgY2IpID0+IGFyci5mb3JFYWNoKCh2LCBpKT0+IGNiKGksIHYpKSxcclxuICBpc0VtcHR5T2JqZWN0OiBvYmogPT4gIW9iaiB8fCBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCxcclxuICBtYWtlQXJyYXk6IGFyciA9PiBbXS5zbGljZS5jYWxsKGFyciwgMCksXHJcbiAgRGVmZXJyZWQoKSB7XHJcbiAgICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xyXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbigpIHtcclxuICAgICAgcmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgcmVqZWN0ID0gYXJndW1lbnRzWzFdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtyZXNvbHZlLCByZWplY3QsIHByb21pc2U6ICgpPT4gcHJvbWlzZX07XHJcbiAgfSxcclxuICBzdXBwb3J0OiB7XHJcbiAgICBjb3JzOiAoJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCkpXHJcbiAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
