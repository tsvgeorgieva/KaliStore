System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, DownloadButton;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      DownloadButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(DownloadButton, [{
          key: 'disabled',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'onClick',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'title',
          decorators: [bindable],
          initializer: function initializer() {
            return 'Свали';
          },
          enumerable: true
        }, {
          key: 'name',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }], null, _instanceInitializers);

        function DownloadButton(element) {
          _classCallCheck(this, _DownloadButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(DownloadButton, [{
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }
          }
        }], null, _instanceInitializers);

        var _DownloadButton = DownloadButton;
        DownloadButton = inject(Element)(DownloadButton) || DownloadButton;
        DownloadButton = customElement('download-button')(DownloadButton) || DownloadButton;
        return DownloadButton;
      })();

      _export('DownloadButton', DownloadButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvZG93bmxvYWQvZG93bmxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUlhLGNBQWM7Ozs7Ozs7Ozs7aUNBSm5CLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsb0JBQWM7Ozs7OEJBQWQsY0FBYzs7dUJBQ3hCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVMsT0FBTzs7Ozs7dUJBQ3hCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O0FBRVIsaUJBTkEsY0FBYyxDQU1iLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVJVLGNBQWM7O2lCQVVaLHlCQUFHO0FBQ2QsZ0JBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxrQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1dBQ0Y7Ozs4QkFkVSxjQUFjO0FBQWQsc0JBQWMsR0FEMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILGNBQWMsS0FBZCxjQUFjO0FBQWQsc0JBQWMsR0FGMUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBRXBCLGNBQWMsS0FBZCxjQUFjO2VBQWQsY0FBYyIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9idXR0b25zL2Rvd25sb2FkL2Rvd25sb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnZG93bmxvYWQtYnV0dG9uJylcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgRG93bmxvYWRCdXR0b24ge1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvbkNsaWNrID0gbnVsbDtcclxuICBAYmluZGFibGUgdGl0bGUgPSAn0KHQstCw0LvQuCc7XHJcbiAgQGJpbmRhYmxlIG5hbWUgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9uQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
