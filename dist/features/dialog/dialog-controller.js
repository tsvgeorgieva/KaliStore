System.register(['./lifecycle'], function (_export) {
  'use strict';

  var invokeLifecycle, DialogController, DialogResult;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_lifecycle) {
      invokeLifecycle = _lifecycle.invokeLifecycle;
    }],
    execute: function () {
      DialogController = (function () {
        function DialogController(renderer, settings, resolve, reject) {
          _classCallCheck(this, DialogController);

          this._renderer = renderer;
          this.settings = settings;
          this._resolve = resolve;
          this._reject = reject;
        }

        _createClass(DialogController, [{
          key: 'ok',
          value: function ok(result) {
            return this.close(true, result);
          }
        }, {
          key: 'cancel',
          value: function cancel(result) {
            this.close(false, result);
          }
        }, {
          key: 'error',
          value: function error(message) {
            var _this = this;

            return invokeLifecycle(this.viewModel, 'deactivate').then(function () {
              return _this._renderer.hideDialog(_this).then(function () {
                return _this._renderer.destroyDialogHost(_this).then(function () {
                  _this.controller.unbind();
                  _this._reject(message);
                });
              });
            });
          }
        }, {
          key: 'close',
          value: function close(ok, result) {
            var _this2 = this;

            var returnResult = new DialogResult(!ok, result);
            return invokeLifecycle(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
              if (canDeactivate) {
                return invokeLifecycle(_this2.viewModel, 'deactivate').then(function () {
                  return _this2._renderer.hideDialog(_this2).then(function () {
                    return _this2._renderer.destroyDialogHost(_this2).then(function () {
                      _this2.controller.unbind();
                      _this2._resolve(returnResult);
                    });
                  });
                });
              }
            });
          }
        }]);

        return DialogController;
      })();

      _export('DialogController', DialogController);

      DialogResult = function DialogResult(cancelled, result) {
        _classCallCheck(this, DialogResult);

        this.wasCancelled = false;

        this.wasCancelled = cancelled;
        this.output = result;
      };
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUJBRWEsZ0JBQWdCLEVBNEN2QixZQUFZOzs7Ozs7OzttQ0E5Q1YsZUFBZTs7O0FBRVYsc0JBQWdCO0FBQ2hCLGlCQURBLGdCQUFnQixDQUNmLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtnQ0FEdEMsZ0JBQWdCOztBQUV6QixjQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUMxQixjQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixjQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUN4QixjQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN2Qjs7cUJBTlUsZ0JBQWdCOztpQkFRekIsWUFBQyxNQUFNLEVBQUU7QUFDVCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztXQUNqQzs7O2lCQUVLLGdCQUFDLE1BQU0sRUFBRTtBQUNiLGdCQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztXQUMzQjs7O2lCQUVJLGVBQUMsT0FBTyxFQUFFOzs7QUFDYixtQkFBTyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUM5RCxxQkFBTyxNQUFLLFNBQVMsQ0FBQyxVQUFVLE9BQU0sQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNoRCx1QkFBTyxNQUFLLFNBQVMsQ0FBQyxpQkFBaUIsT0FBTSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ3ZELHdCQUFLLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6Qix3QkFBSyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZCLENBQUMsQ0FBQztlQUNKLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztXQUNKOzs7aUJBRUksZUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFOzs7QUFDaEIsZ0JBQUksWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELG1CQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLGFBQWEsRUFBSTtBQUM1RSxrQkFBSSxhQUFhLEVBQUU7QUFDakIsdUJBQU8sZUFBZSxDQUFDLE9BQUssU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQzlELHlCQUFPLE9BQUssU0FBUyxDQUFDLFVBQVUsUUFBTSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ2hELDJCQUFPLE9BQUssU0FBUyxDQUFDLGlCQUFpQixRQUFNLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDdkQsNkJBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3pCLDZCQUFLLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDN0IsQ0FBQyxDQUFDO21CQUNKLENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7ZUFDSjthQUNGLENBQUMsQ0FBQztXQUNKOzs7ZUF6Q1UsZ0JBQWdCOzs7OztBQTRDdkIsa0JBQVksR0FHTCxTQUhQLFlBQVksQ0FHSixTQUFTLEVBQUUsTUFBTSxFQUFFOzhCQUgzQixZQUFZOzthQUNoQixZQUFZLEdBQUcsS0FBSzs7QUFHbEIsWUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDOUIsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEIiLCJmaWxlIjoiZmVhdHVyZXMvZGlhbG9nL2RpYWxvZy1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbnZva2VMaWZlY3ljbGV9IGZyb20gJy4vbGlmZWN5Y2xlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcihyZW5kZXJlciwgc2V0dGluZ3MsIHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xyXG4gIH1cclxuXHJcbiAgb2socmVzdWx0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9zZSh0cnVlLCByZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKHJlc3VsdCkge1xyXG4gICAgdGhpcy5jbG9zZShmYWxzZSwgcmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGVycm9yKG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiBpbnZva2VMaWZlY3ljbGUodGhpcy52aWV3TW9kZWwsICdkZWFjdGl2YXRlJykudGhlbigoKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5oaWRlRGlhbG9nKHRoaXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5kZXN0cm95RGlhbG9nSG9zdCh0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY29udHJvbGxlci51bmJpbmQoKTtcclxuICAgICAgICAgIHRoaXMuX3JlamVjdChtZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKG9rLCByZXN1bHQpIHtcclxuICAgIGxldCByZXR1cm5SZXN1bHQgPSBuZXcgRGlhbG9nUmVzdWx0KCFvaywgcmVzdWx0KTtcclxuICAgIHJldHVybiBpbnZva2VMaWZlY3ljbGUodGhpcy52aWV3TW9kZWwsICdjYW5EZWFjdGl2YXRlJykudGhlbihjYW5EZWFjdGl2YXRlID0+IHtcclxuICAgICAgaWYgKGNhbkRlYWN0aXZhdGUpIHtcclxuICAgICAgICByZXR1cm4gaW52b2tlTGlmZWN5Y2xlKHRoaXMudmlld01vZGVsLCAnZGVhY3RpdmF0ZScpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLmhpZGVEaWFsb2codGhpcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5kZXN0cm95RGlhbG9nSG9zdCh0aGlzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIudW5iaW5kKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZShyZXR1cm5SZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIERpYWxvZ1Jlc3VsdCB7XHJcbiAgd2FzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgb3V0cHV0O1xyXG4gIGNvbnN0cnVjdG9yKGNhbmNlbGxlZCwgcmVzdWx0KSB7XHJcbiAgICB0aGlzLndhc0NhbmNlbGxlZCA9IGNhbmNlbGxlZDtcclxuICAgIHRoaXMub3V0cHV0ID0gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
