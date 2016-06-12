System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var customAttribute, AttachFocus;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      customAttribute = _aureliaFramework.customAttribute;
    }],
    execute: function () {
      AttachFocus = (function () {
        _createClass(AttachFocus, null, [{
          key: 'inject',
          value: [Element],
          enumerable: true
        }]);

        function AttachFocus(element) {
          _classCallCheck(this, _AttachFocus);

          this.element = element;
        }

        _createClass(AttachFocus, [{
          key: 'attached',
          value: function attached() {
            this.element.focus();
          }
        }]);

        var _AttachFocus = AttachFocus;
        AttachFocus = customAttribute('attach-focus')(AttachFocus) || AttachFocus;
        return AttachFocus;
      })();

      _export('AttachFocus', AttachFocus);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9hdHRhY2gtZm9jdXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VCQUdhLFdBQVc7Ozs7Ozs7OzBDQUhoQixlQUFlOzs7QUFHVixpQkFBVztxQkFBWCxXQUFXOztpQkFDTixDQUFDLE9BQU8sQ0FBQzs7OztBQUVkLGlCQUhBLFdBQVcsQ0FHVixPQUFPLEVBQUU7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7cUJBTFUsV0FBVzs7aUJBT2Qsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztXQUN0Qjs7OzJCQVRVLFdBQVc7QUFBWCxtQkFBVyxHQUR2QixlQUFlLENBQUMsY0FBYyxDQUFDLENBQ25CLFdBQVcsS0FBWCxXQUFXO2VBQVgsV0FBVyIsImZpbGUiOiJmZWF0dXJlcy9kaWFsb2cvYXR0YWNoLWZvY3VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjdXN0b21BdHRyaWJ1dGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoJ2F0dGFjaC1mb2N1cycpXHJcbmV4cG9ydCBjbGFzcyBBdHRhY2hGb2N1cyB7XHJcbiAgc3RhdGljIGluamVjdCA9IFtFbGVtZW50XTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
