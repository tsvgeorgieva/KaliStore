System.register(['aurelia-framework', 'jquery', 'Eonasdan/bootstrap-datetimepicker', 'moment', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, bindingMode, $, moment, Timespan, customElementHelper, Timepicker;

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
      Timespan = _utils.Timespan;
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Timepicker = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Timepicker, [{
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
        }], null, _instanceInitializers);

        function Timepicker(element) {
          _classCallCheck(this, _Timepicker);

          _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'readonly', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(Timepicker, [{
          key: 'bind',
          value: function bind() {
            var _this = this;

            var defaultOpts = {
              format: 'HH:mm',
              icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
              }
            };

            var div = this.element.firstElementChild;
            var input = div.firstElementChild;
            this.$element = $(div);
            this.options = this.options || {};
            if (this.options.format !== undefined) {
              delete this.options.format;
            }

            var options = $.extend({}, defaultOpts, this.options);
            this.datepicker = this.$element.datetimepicker(options);
            this.datepicker.on('dp.change', function (ev) {
              var el = _this.element;
              var elVal = input.value;
              if (elVal === '') {
                _this.value = undefined;
                customElementHelper.dispatchEvent(el, 'change', {
                  value: _this.value,
                  element: el
                });
              } else {
                var newTimespan = new Timespan(elVal);
                var areSame = newTimespan.equals(_this.value);
                if (!areSame) {
                  _this.value = newTimespan;
                  customElementHelper.dispatchEvent(el, 'change', {
                    value: _this.value,
                    element: el
                  });
                }
              }
            });

            this.valueChanged(this.value);
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue, oldValue) {
            if (newValue === null || newValue === undefined || newValue === false) {
              var input = this.element.firstElementChild.firstElementChild;
              input.value = '';
              return;
            }

            if (newValue.constructor.name !== 'Timespan') {
              throw new Error('This has to be Timespan type.');
            }

            var areSame = newValue.equals(oldValue);
            if (areSame) {
              return;
            }

            var timeAsMoment = moment(newValue.toString(), 'HH:mm');
            this.$element.data('DateTimePicker').date(timeAsMoment);
          }
        }], null, _instanceInitializers);

        var _Timepicker = Timepicker;
        Timepicker = inject(Element)(Timepicker) || Timepicker;
        Timepicker = customElement('timepicker')(Timepicker) || Timepicker;
        return Timepicker;
      })();

      _export('Timepicker', Timepicker);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZXBpY2tlci90aW1lcGlja2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4RkFTYSxVQUFVOzs7Ozs7Ozs7O2lDQVRmLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFRO3NDQUFFLFdBQVc7Ozs7Ozt3QkFJNUMsUUFBUTttQ0FDUixtQkFBbUI7OztBQUlkLGdCQUFVOzs7OzhCQUFWLFVBQVU7O3VCQUNwQixRQUFRLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFDLENBQUM7O21CQUFTLElBQUk7Ozs7O3VCQUMvRCxRQUFROzttQkFBVyxJQUFJOzs7Ozt1QkFDdkIsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFZLEtBQUs7Ozs7O0FBRWYsaUJBTkEsVUFBVSxDQU1ULE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzhCQVJVLFVBQVU7O2lCQVVqQixnQkFBRzs7O0FBQ0wsZ0JBQU0sV0FBVyxHQUFHO0FBQ2xCLG9CQUFNLEVBQUUsT0FBTztBQUNmLG1CQUFLLEVBQUU7QUFDTCxvQkFBSSxFQUFFLGVBQWU7QUFDckIsb0JBQUksRUFBRSxnQkFBZ0I7QUFDdEIsa0JBQUUsRUFBRSxrQkFBa0I7QUFDdEIsb0JBQUksRUFBRSxvQkFBb0I7QUFDMUIsd0JBQVEsRUFBRSxvQkFBb0I7QUFDOUIsb0JBQUksRUFBRSxxQkFBcUI7QUFDM0IscUJBQUssRUFBRSxrQkFBa0I7QUFDekIscUJBQUssRUFBRSxhQUFhO0FBQ3BCLHFCQUFLLEVBQUUsYUFBYTtlQUNyQjthQUNGLENBQUM7O0FBRUYsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDekMsZ0JBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUNsQyxnQkFBSSxD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LXRpbWUtcGlja2VyL3RpbWVwaWNrZXIvdGltZXBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdFb25hc2Rhbi9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7VGltZXNwYW59IGZyb20gJ3V0aWxzJztcclxuaW1wb3J0IHtjdXN0b21FbGVtZW50SGVscGVyfSBmcm9tICd1dGlscyc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgndGltZXBpY2tlcicpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXIge1xyXG4gIEBiaW5kYWJsZSh7ZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXl9KSB2YWx1ZSA9IG51bGw7XHJcbiAgQGJpbmRhYmxlIG9wdGlvbnMgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSByZWFkb25seSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgYmluZCgpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRzID0ge1xyXG4gICAgICBmb3JtYXQ6ICdISDptbScsXHJcbiAgICAgIGljb25zOiB7XHJcbiAgICAgICAgdGltZTogJ2ZhIGZhLWNsb2NrLW8nLFxyXG4gICAgICAgIGRhdGU6ICdmYSBmYS1jYWxlbmRhcicsXHJcbiAgICAgICAgdXA6ICdmYSBmYS1jaGV2cm9uLXVwJyxcclxuICAgICAgICBkb3duOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcclxuICAgICAgICBwcmV2aW91czogJ2ZhIGZhLWNoZXZyb24tbGVmdCcsXHJcbiAgICAgICAgbmV4dDogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxyXG4gICAgICAgIHRvZGF5OiAnZmEgZmEtY3Jvc3NoYWlycycsXHJcbiAgICAgICAgY2xlYXI6ICdmYSBmYS10cmFzaCcsXHJcbiAgICAgICAgY2xvc2U6ICdmYSBmYS10aW1lcydcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGl2ID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgbGV0IGlucHV0ID0gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgdGhpcy4kZWxlbWVudCA9ICQoZGl2KTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVsZXRlIHRoaXMub3B0aW9ucy5mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdHMsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLmRhdGVwaWNrZXIgPSB0aGlzLiRlbGVtZW50LmRhdGV0aW1lcGlja2VyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5kYXRlcGlja2VyLm9uKCdkcC5jaGFuZ2UnLCAoZXYpID0+IHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICAgIGxldCBlbFZhbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICBpZiAoZWxWYWwgPT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQoZWwsICdjaGFuZ2UnLCB7XHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgIGVsZW1lbnQ6IGVsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG5ld1RpbWVzcGFuID0gbmV3IFRpbWVzcGFuKGVsVmFsKTtcclxuICAgICAgICBjb25zdCBhcmVTYW1lID0gbmV3VGltZXNwYW4uZXF1YWxzKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGlmICghYXJlU2FtZSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1RpbWVzcGFuO1xyXG4gICAgICAgICAgY3VzdG9tRWxlbWVudEhlbHBlci5kaXNwYXRjaEV2ZW50KGVsLCAnY2hhbmdlJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgZWxlbWVudDogZWxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICBpZiAobmV3VmFsdWUgPT09IG51bGwgfHwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBuZXdWYWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgbGV0IGlucHV0ID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdUaW1lc3BhbicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGhhcyB0byBiZSBUaW1lc3BhbiB0eXBlLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFyZVNhbWUgPSBuZXdWYWx1ZS5lcXVhbHMob2xkVmFsdWUpO1xyXG4gICAgaWYgKGFyZVNhbWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aW1lQXNNb21lbnQgPSBtb21lbnQobmV3VmFsdWUudG9TdHJpbmcoKSwgJ0hIOm1tJyk7XHJcbiAgICB0aGlzLiRlbGVtZW50LmRhdGEoJ0RhdGVUaW1lUGlja2VyJykuZGF0ZSh0aW1lQXNNb21lbnQpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
