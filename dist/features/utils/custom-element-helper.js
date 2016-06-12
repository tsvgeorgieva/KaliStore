System.register([], function (_export) {
  'use strict';

  var customElementHelper;
  return {
    setters: [],
    execute: function () {
      customElementHelper = {
        dispatchEvent: function dispatchEvent(element, eventName, data) {
          var changeEvent = undefined;
          if (window.CustomEvent) {
            changeEvent = new CustomEvent(eventName, {
              detail: data,
              bubbles: true
            });
          } else {
            changeEvent = document.createEvent('CustomEvent');
            changeEvent.initCustomEvent(eventName, true, true, data);
          }

          element.dispatchEvent(changeEvent);
        },
        getAureliaViewModels: function getAureliaViewModels(element, selector) {
          return Array.from(element.getElementsByTagName(selector)).map(function (el) {
            if (el.au && el.au.controller) {
              return el.au.controller.viewModel;
            } else {
              throw new Error('Not an aurelia view model!');
            }
          });
        },
        debounce: function debounce(func, wait) {
          var timeout;

          return function () {
            var context = this,
                args = arguments;

            var later = function later() {
              timeout = null;
              func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        }
      };

      _export('customElementHelper', customElementHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL2N1c3RvbS1lbGVtZW50LWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSxtQkFBbUI7Ozs7QUFBbkIseUJBQW1CLEdBQUc7QUFDakMscUJBQWEsRUFBQSx1QkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtBQUN0QyxjQUFJLFdBQVcsWUFBQSxDQUFDO0FBQ2hCLGNBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUN0Qix1QkFBVyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUN2QyxvQkFBTSxFQUFFLElBQUk7QUFDWixxQkFBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7V0FDSixNQUFNO0FBQ0wsdUJBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xELHVCQUFXLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1dBQzFEOztBQUVELGlCQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3BDO0FBQ0QsNEJBQW9CLEVBQUEsOEJBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUN0QyxpQkFBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUUsRUFBSTtBQUNsRSxnQkFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO0FBQzdCLHFCQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQzthQUNuQyxNQUFNO0FBQ0wsb0JBQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUMvQztXQUNGLENBQUMsQ0FBQztTQUNKO0FBQ0QsZ0JBQVEsRUFBQSxrQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ25CLGNBQUksT0FBTyxDQUFDOztBQUdaLGlCQUFPLFlBQVc7QUFDaEIsZ0JBQUksT0FBTyxHQUFHLElBQUk7Z0JBQ2hCLElBQUksR0FBRyxTQUFTLENBQUM7O0FBR25CLGdCQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssR0FBYztBQUNyQixxQkFBTyxHQUFHLElBQUksQ0FBQztBQUNmLGtCQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQixDQUFDOztBQUdGLHdCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsbUJBQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1dBQ25DLENBQUM7U0FDSDtPQUNGIiwiZmlsZSI6ImZlYXR1cmVzL3V0aWxzL2N1c3RvbS1lbGVtZW50LWhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjdXN0b21FbGVtZW50SGVscGVyID0ge1xyXG4gIGRpc3BhdGNoRXZlbnQoZWxlbWVudCwgZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICBsZXQgY2hhbmdlRXZlbnQ7XHJcbiAgICBpZiAod2luZG93LkN1c3RvbUV2ZW50KSB7XHJcbiAgICAgIGNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xyXG4gICAgICAgIGRldGFpbDogZGF0YSxcclxuICAgICAgICBidWJibGVzOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hhbmdlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgY2hhbmdlRXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcclxuICB9LFxyXG4gIGdldEF1cmVsaWFWaWV3TW9kZWxzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSkubWFwKGVsID0+IHtcclxuICAgICAgaWYgKGVsLmF1ICYmIGVsLmF1LmNvbnRyb2xsZXIpIHtcclxuICAgICAgICByZXR1cm4gZWwuYXUuY29udHJvbGxlci52aWV3TW9kZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYW4gYXVyZWxpYSB2aWV3IG1vZGVsIScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcclxuICAgIHZhciB0aW1lb3V0O1xyXG5cclxuICAgIC8vIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxyXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgICAvLyBudWxscyBvdXQgdGltZXIgYW5kIGNhbGxzIG9yaWdpbmFsIGZ1bmN0aW9uXHJcbiAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyByZXN0YXJ0IHRoZSB0aW1lciB0byBjYWxsIGxhc3QgZnVuY3Rpb25cclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
