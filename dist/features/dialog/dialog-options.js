System.register(['./dialog-controller', 'aurelia-framework'], function (_export) {
    'use strict';

    var DialogController, inject, DialogOptions;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_dialogController) {
            DialogController = _dialogController.DialogController;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            DialogOptions = (function () {
                function DialogOptions(controller) {
                    _classCallCheck(this, _DialogOptions);

                    this.controller = controller;
                }

                _createClass(DialogOptions, [{
                    key: 'activate',
                    value: function activate(opts) {
                        opts = opts || {};

                        this.title = opts.title;
                        this.msg = opts.msg;

                        this.okBtnType = opts.okBtnClass;
                        this.okBtnText = opts.okBtnText;

                        this.cancelBtnText = opts.cancelBtnText;
                        this.showCancelButton = opts.showCancelButton;

                        this.viewModel = opts.viewModel;
                        this.model = opts.model;

                        this.icon = opts.icon;
                    }
                }]);

                var _DialogOptions = DialogOptions;
                DialogOptions = inject(DialogController)(DialogOptions) || DialogOptions;
                return DialogOptions;
            })();

            _export('DialogOptions', DialogOptions);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctb3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0NBSWEsYUFBYTs7Ozs7Ozs7aURBSmxCLGdCQUFnQjs7dUNBQ2hCLE1BQU07OztBQUdELHlCQUFhO0FBQ2IseUJBREEsYUFBYSxDQUNaLFVBQVUsRUFBRTs7O0FBQ3RCLHdCQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztpQkFDOUI7OzZCQUhVLGFBQWE7OzJCQUtoQixrQkFBQyxJQUFJLEVBQUU7QUFDYiw0QkFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O0FBRWxCLDRCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsNEJBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7QUFFcEIsNEJBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNqQyw0QkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOztBQUVoQyw0QkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ3hDLDRCQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDOztBQUU5Qyw0QkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2hDLDRCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O0FBRXhCLDRCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQ3ZCOzs7cUNBckJVLGFBQWE7QUFBYiw2QkFBYSxHQUR6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FDWixhQUFhLEtBQWIsYUFBYTt1QkFBYixhQUFhIiwiZmlsZSI6ImZlYXR1cmVzL2RpYWxvZy9kaWFsb2ctb3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSAnLi9kaWFsb2ctY29udHJvbGxlcic7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AaW5qZWN0KERpYWxvZ0NvbnRyb2xsZXIpXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dPcHRpb25zIHtcclxuICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgYWN0aXZhdGUob3B0cykge1xyXG4gICAgb3B0cyA9IG9wdHMgfHwge307XHJcblxyXG4gICAgdGhpcy50aXRsZSA9IG9wdHMudGl0bGU7XHJcbiAgICB0aGlzLm1zZyA9IG9wdHMubXNnO1xyXG5cclxuICAgIHRoaXMub2tCdG5UeXBlID0gb3B0cy5va0J0bkNsYXNzO1xyXG4gICAgdGhpcy5va0J0blRleHQgPSBvcHRzLm9rQnRuVGV4dDtcclxuXHJcbiAgICB0aGlzLmNhbmNlbEJ0blRleHQgPSBvcHRzLmNhbmNlbEJ0blRleHQ7XHJcbiAgICB0aGlzLnNob3dDYW5jZWxCdXR0b24gPSBvcHRzLnNob3dDYW5jZWxCdXR0b247XHJcblxyXG4gICAgdGhpcy52aWV3TW9kZWwgPSBvcHRzLnZpZXdNb2RlbDtcclxuICAgIHRoaXMubW9kZWwgPSBvcHRzLm1vZGVsO1xyXG5cclxuICAgIHRoaXMuaWNvbiA9IG9wdHMuaWNvbjtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
