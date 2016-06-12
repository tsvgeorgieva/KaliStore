System.register(['aurelia-framework', './dialog-controller'], function (_export) {
  'use strict';

  var customElement, DialogController, AiDialogHeader;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
    }, function (_dialogController) {
      DialogController = _dialogController.DialogController;
    }],
    execute: function () {
      AiDialogHeader = (function () {
        _createClass(AiDialogHeader, null, [{
          key: 'inject',
          value: [DialogController],
          enumerable: true
        }]);

        function AiDialogHeader(controller) {
          _classCallCheck(this, _AiDialogHeader);

          this.controller = controller;
        }

        var _AiDialogHeader = AiDialogHeader;
        AiDialogHeader = customElement('ai-dialog-header')(AiDialogHeader) || AiDialogHeader;
        return AiDialogHeader;
      })();

      _export('AiDialogHeader', AiDialogHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9haS1kaWFsb2ctaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxjQUFjOzs7Ozs7Ozt3Q0FKbkIsYUFBYTs7MkNBQ2IsZ0JBQWdCOzs7QUFHWCxvQkFBYztxQkFBZCxjQUFjOztpQkFDVCxDQUFDLGdCQUFnQixDQUFDOzs7O0FBRXZCLGlCQUhBLGNBQWMsQ0FHYixVQUFVLEVBQUU7OztBQUN0QixjQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUM5Qjs7OEJBTFUsY0FBYztBQUFkLHNCQUFjLEdBRDFCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUNyQixjQUFjLEtBQWQsY0FBYztlQUFkLGNBQWMiLCJmaWxlIjoiZmVhdHVyZXMvZGlhbG9nL2FpLWRpYWxvZy1oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnR9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtEaWFsb2dDb250cm9sbGVyfSBmcm9tICcuL2RpYWxvZy1jb250cm9sbGVyJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdhaS1kaWFsb2ctaGVhZGVyJylcclxuZXhwb3J0IGNsYXNzIEFpRGlhbG9nSGVhZGVyIHtcclxuICBzdGF0aWMgaW5qZWN0ID0gW0RpYWxvZ0NvbnRyb2xsZXJdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
