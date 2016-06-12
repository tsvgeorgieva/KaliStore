System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, CheckButton;

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
      CheckButton = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(CheckButton, [{
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
          key: 'isActive',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
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

        function CheckButton(element) {
          _classCallCheck(this, _CheckButton);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'onClick', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'isActive', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          this.icon = '';
          this.type = 'btn-default';

          this.element = element;
        }

        _createDecoratedClass(CheckButton, [{
          key: 'bind',
          value: function bind() {
            if (this.isActive) {
              this._check();
            } else {
              this._uncheck();
            }
          }
        }, {
          key: 'buttonClicked',
          value: function buttonClicked() {
            if (typeof this.onClick === 'function') {
              this.onClick();
            }

            this._toggle();
          }
        }, {
          key: '_toggle',
          value: function _toggle() {
            if (this.isActive) {
              this._uncheck();
            } else {
              this._check();
            }
          }
        }, {
          key: '_check',
          value: function _check() {
            this.isActive = true;
            this.icon = 'fa-check-square-o';
          }
        }, {
          key: '_uncheck',
          value: function _uncheck() {
            this.isActive = false;
            this.icon = 'fa-square-o';
          }
        }], null, _instanceInitializers);

        var _CheckButton = CheckButton;
        CheckButton = inject(Element)(CheckButton) || CheckButton;
        CheckButton = customElement('check-button')(CheckButton) || CheckButton;
        return CheckButton;
      })();

      _export('CheckButton', CheckButton);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvY2hlY2svY2hlY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUlhLFdBQVc7Ozs7Ozs7Ozs7aUNBSmhCLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsaUJBQVc7Ozs7OEJBQVgsV0FBVzs7dUJBQ3JCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O0FBS1IsaUJBVEEsV0FBVyxDQVNWLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7ZUFIckIsSUFBSSxHQUFHLEVBQUU7ZUFDVCxJQUFJLEdBQUcsYUFBYTs7QUFHbEIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVhVLFdBQVc7O2lCQWFsQixnQkFBRztBQUNMLGdCQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDakIsa0JBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmLE1BQU07QUFDTCxrQkFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1dBQ0Y7OztpQkFFWSx5QkFBRztBQUNkLGdCQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDdEMsa0JBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjs7QUFFRCxnQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1dBQ2hCOzs7aUJBRU0sbUJBQUc7QUFDUixnQkFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2pCLGtCQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakIsTUFBTTtBQUNMLGtCQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtXQUNGOzs7aUJBRUssa0JBQUc7QUFDUCxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7V0FDakM7OztpQkFFTyxvQkFBRztBQUNULGdCQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN0QixnQkFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7V0FDM0I7OzsyQkE3Q1UsV0FBVztBQUFYLG1CQUFXLEdBRHZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxXQUFXLEtBQVgsV0FBVztBQUFYLG1CQUFXLEdBRnZCLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FFakIsV0FBVyxLQUFYLFdBQVc7ZUFBWCxXQUFXIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2J1dHRvbnMvY2hlY2svY2hlY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdjaGVjay1idXR0b24nKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBDaGVja0J1dHRvbiB7XHJcbiAgQGJpbmRhYmxlIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIG9uQ2xpY2sgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBuYW1lID0gJyc7XHJcblxyXG4gIGljb24gPSAnJztcclxuICB0eXBlID0gJ2J0bi1kZWZhdWx0JztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJpbmQoKSB7XHJcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLl9jaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fdW5jaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3RvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuX3VuY2hlY2soKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2hlY2soKSB7XHJcbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuaWNvbiA9ICdmYS1jaGVjay1zcXVhcmUtbyc7XHJcbiAgfVxyXG5cclxuICBfdW5jaGVjaygpIHtcclxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuaWNvbiA9ICdmYS1zcXVhcmUtbyc7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
