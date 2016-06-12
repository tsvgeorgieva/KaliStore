System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customElement, bindable, Tab;

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
      Tab = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Tab, [{
          key: 'name',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'badge',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'active',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'headingStyleObject',
          decorators: [bindable],
          initializer: function initializer() {
            return {};
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Tab(element) {
          _classCallCheck(this, _Tab);

          _defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'badge', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'active', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'headingStyleObject', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(Tab, [{
          key: 'attached',
          value: function attached() {}
        }, {
          key: 'bind',
          value: function bind() {}
        }, {
          key: 'setInnerScroll',
          value: function setInnerScroll() {
            this.element.style.height = '100%';
            this.element.style['overflow-y'] = 'auto';
            this.element.style.display = 'block';
          }
        }, {
          key: 'show',
          value: function show() {
            this.active = true;
            this.element.classList.remove('aurelia-hide');
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.element.classList.add('aurelia-hide');
            this.active = false;
          }
        }], null, _instanceInitializers);

        var _Tab = Tab;
        Tab = inject(Element)(Tab) || Tab;
        Tab = customElement('tab')(Tab) || Tab;
        return Tab;
      })();

      _export('Tab', Tab);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RhYnMvdGFiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FJYSxHQUFHOzs7Ozs7Ozs7O2lDQUpSLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFROzs7QUFJMUIsU0FBRzs7Ozs4QkFBSCxHQUFHOzt1QkFDYixRQUFROzs7Ozt1QkFDUixRQUFROzs7Ozt1QkFDUixRQUFROzttQkFBVSxLQUFLOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQXNCLEVBQUU7Ozs7O0FBRXRCLGlCQU5BLEdBQUcsQ0FNRixPQUFPLEVBQUU7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOzs4QkFSVSxHQUFHOztpQkFVTixvQkFBRyxFQUNWOzs7aUJBRUcsZ0JBQUcsRUFRTjs7O2lCQUVhLDBCQUFHO0FBQ2YsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDbkMsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMxQyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztXQUN0Qzs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLGdCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7V0FDL0M7OztpQkFFRyxnQkFBRztBQUNMLGdCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDM0MsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1dBQ3JCOzs7bUJBckNVLEdBQUc7QUFBSCxXQUFHLEdBRGYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILEdBQUcsS0FBSCxHQUFHO0FBQUgsV0FBRyxHQUZmLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FFUixHQUFHLEtBQUgsR0FBRztlQUFILEdBQUciLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvdGFicy90YWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCd0YWInKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBUYWIge1xyXG4gIEBiaW5kYWJsZSBuYW1lO1xyXG4gIEBiaW5kYWJsZSBiYWRnZTtcclxuICBAYmluZGFibGUgYWN0aXZlID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIGhlYWRpbmdTdHlsZU9iamVjdCA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgfVxyXG5cclxuICBiaW5kKCkge1xyXG4gICAgLypcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgICAqL1xyXG4gIH1cclxuXHJcbiAgc2V0SW5uZXJTY3JvbGwoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlWydvdmVyZmxvdy15J10gPSAnYXV0byc7XHJcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2F1cmVsaWEtaGlkZScpO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhdXJlbGlhLWhpZGUnKTtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
