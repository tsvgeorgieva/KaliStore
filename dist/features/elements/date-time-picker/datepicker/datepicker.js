System.register(['aurelia-framework', 'jquery', 'Eonasdan/bootstrap-datetimepicker', 'moment', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, bindingMode, $, moment, customElementHelper, Datepicker;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_EonasdanBootstrapDatetimepicker) {}, function (_moment) {
      moment = _moment['default'];
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Datepicker = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Datepicker, [{
          key: 'value',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'options',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'disabled',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'readonly',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'icon',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Datepicker(element) {
          _classCallCheck(this, _Datepicker);

          _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'readonly', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'icon', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(Datepicker, [{
          key: 'bind',
          value: function bind() {
            var _this = this;

            var defaultOpts = {
              collapse: false,
              useCurrent: false,
              calendarWeeks: true,
              debug: false,
              locale: moment.locale(),
              format: 'L'
            };

            if (this.icon) {
              defaultOpts.icons = {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
              };
            }

            if (this.icon) {
              var div = this.element.firstElementChild;
              this.$element = $(div);
            } else {
              var div = this.element.children[1].firstElementChild;
              this.$element = $(div);
            }

            this.options = this.options || {};
            if (this.options.format !== undefined) {
              delete this.options.format;
            }
            this.options = $.extend({}, defaultOpts, this.options);

            this.datepicker = this.$element.datetimepicker(this.options);

            this.datepicker.on('dp.change', function (event) {
              var value = event.date;
              var el = _this.element;
              customElementHelper.dispatchEvent(el, 'change', {
                value: value,
                element: el
              });

              _this.value = value;
            });

            this.valueChanged(this.value);
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue, oldValue) {
            if (newValue === null || newValue === undefined || newValue === false || newValue.isValid() !== true) {
              var input = this.element.firstElementChild.firstElementChild;
              input.value = '';
              return;
            }

            if (newValue.isSame(oldValue) && oldValue !== undefined) {
              return;
            }

            this.$element.data('DateTimePicker').date(newValue);
          }
        }], null, _instanceInitializers);

        var _Datepicker = Datepicker;
        Datepicker = inject(Element)(Datepicker) || Datepicker;
        Datepicker = customElement('datepicker')(Datepicker) || Datepicker;
        return Datepicker;
      })();

      _export('Datepicker', Datepicker);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvRkFRYSxVQUFVOzs7Ozs7Ozs7O2lDQVJmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFRO3NDQUFFLFdBQVc7Ozs7OzttQ0FJNUMsbUJBQW1COzs7QUFJZCxnQkFBVTs7Ozs4QkFBVixVQUFVOzt1QkFDcEIsUUFBUSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBQyxDQUFDOzttQkFBUyxJQUFJOzs7Ozt1QkFDL0QsUUFBUTs7bUJBQVcsSUFBSTs7Ozs7dUJBQ3ZCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBWSxLQUFLOzs7Ozt1QkFDekIsUUFBUTs7bUJBQVEsSUFBSTs7Ozs7QUFFVixpQkFQQSxVQUFVLENBT1QsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOzs4QkFUVSxVQUFVOztpQkFXakIsZ0JBQUc7OztBQUNMLGdCQUFJLFdBQVcsR0FBRztBQUNoQixzQkFBUSxFQUFFLEtBQUs7QUFDZix3QkFBVSxFQUFFLEtBQUs7QUFDakIsMkJBQWEsRUFBRSxJQUFJO0FBQ25CLG1CQUFLLEVBQUUsS0FBSztBQUNaLG9CQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUN2QixvQkFBTSxFQUFFLEdBQUc7YUFDWixDQUFDOztBQUVGLGdCQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDYix5QkFBVyxDQUFDLEtBQUssR0FBRztBQUNsQixvQkFBSSxFQUFFLGVBQWU7QUFDckIsb0JBQUksRUFBRSxnQkFBZ0I7QUFDdEIsa0JBQUUsRUFBRSxrQkFBa0I7QUFDdEIsb0JBQUksRUFBRSxvQkFBb0I7QUFDMUIsd0JBQVEsRUFBRSxvQkFBb0I7QUFDOUIsb0JBQUksRUFBRSxxQkFBcUI7QUFDM0IscUJBQUssRUFBRSxrQkFBa0I7QUFDekIscUJBQUssRUFBRSxhQUFhO0FBQ3BCLHFCQUFLLEVBQUUsYUFBYTtlQUNyQixDQUFDO2FBQ0g7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNiLGtCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQ3pDLGtCQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QixNQUFNO0FBQ0wsa0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0FBQ3JELGtCQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4Qjs7QUFFRCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNsQyxnQkFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDckMscUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDNUI7QUFDRCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUV2RCxnQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdELGdCQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDekMsa0JBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDekIsa0JBQU0sRUFBRSxHQUFHLE1BQUssT0FBTyxDQUFDO0FBQ3hCLGlDQUFtQixDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO0FBQzlDLHFCQUFLLEVBQUUsS0FBSztBQUNaLHVCQUFPLEVBQUUsRUFBRTtlQUNaLENBQUMsQ0FBQzs7QUFFSCxvQkFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3BCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDL0I7OztpQkFFVyxzQkFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQy9CLGdCQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDcEcsa0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUM7QUFDN0QsbUJBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLHFCQUFPO2FBQ1I7O0FBRUQsZ0JBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0FBQ3ZELHFCQUFPO2FBQ1I7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1dBQ3JEOzs7MEJBN0VVLFVBQVU7QUFBVixrQkFBVSxHQUR0QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQ0gsVUFBVSxLQUFWLFVBQVU7QUFBVixrQkFBVSxHQUZ0QixhQUFhLENBQUMsWUFBWSxDQUFDLENBRWYsVUFBVSxLQUFWLFVBQVU7ZUFBVixVQUFVIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ0VvbmFzZGFuL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlcic7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHtjdXN0b21FbGVtZW50SGVscGVyfSBmcm9tICd1dGlscyc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnZGF0ZXBpY2tlcicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIERhdGVwaWNrZXIge1xyXG4gIEBiaW5kYWJsZSh7ZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXl9KSB2YWx1ZSA9IG51bGw7XHJcbiAgQGJpbmRhYmxlIG9wdGlvbnMgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSByZWFkb25seSA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBpY29uID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGJpbmQoKSB7XHJcbiAgICBsZXQgZGVmYXVsdE9wdHMgPSB7XHJcbiAgICAgIGNvbGxhcHNlOiBmYWxzZSxcclxuICAgICAgdXNlQ3VycmVudDogZmFsc2UsXHJcbiAgICAgIGNhbGVuZGFyV2Vla3M6IHRydWUsXHJcbiAgICAgIGRlYnVnOiBmYWxzZSxcclxuICAgICAgbG9jYWxlOiBtb21lbnQubG9jYWxlKCksXHJcbiAgICAgIGZvcm1hdDogJ0wnXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmljb24pIHtcclxuICAgICAgZGVmYXVsdE9wdHMuaWNvbnMgPSB7XHJcbiAgICAgICAgdGltZTogJ2ZhIGZhLWNsb2NrLW8nLFxyXG4gICAgICAgIGRhdGU6ICdmYSBmYS1jYWxlbmRhcicsXHJcbiAgICAgICAgdXA6ICdmYSBmYS1jaGV2cm9uLXVwJyxcclxuICAgICAgICBkb3duOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcclxuICAgICAgICBwcmV2aW91czogJ2ZhIGZhLWNoZXZyb24tbGVmdCcsXHJcbiAgICAgICAgbmV4dDogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxyXG4gICAgICAgIHRvZGF5OiAnZmEgZmEtY3Jvc3NoYWlycycsXHJcbiAgICAgICAgY2xlYXI6ICdmYSBmYS10cmFzaCcsXHJcbiAgICAgICAgY2xvc2U6ICdmYSBmYS10aW1lcydcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pY29uKSB7XHJcbiAgICAgIGxldCBkaXYgPSB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgIHRoaXMuJGVsZW1lbnQgPSAkKGRpdik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZGl2ID0gdGhpcy5lbGVtZW50LmNoaWxkcmVuWzFdLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICB0aGlzLiRlbGVtZW50ID0gJChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5mb3JtYXQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdHMsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5kYXRlcGlja2VyID0gdGhpcy4kZWxlbWVudC5kYXRldGltZXBpY2tlcih0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuZGF0ZXBpY2tlci5vbignZHAuY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGF0ZTtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudChlbCwgJ2NoYW5nZScsIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgZWxlbWVudDogZWxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIGlmIChuZXdWYWx1ZSA9PT0gbnVsbCB8fCBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IG5ld1ZhbHVlID09PSBmYWxzZSB8fCBuZXdWYWx1ZS5pc1ZhbGlkKCkgIT09IHRydWUpIHtcclxuICAgICAgbGV0IGlucHV0ID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlLmlzU2FtZShvbGRWYWx1ZSkgJiYgb2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kZWxlbWVudC5kYXRhKCdEYXRlVGltZVBpY2tlcicpLmRhdGUobmV3VmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
