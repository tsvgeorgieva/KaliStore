System.register(['./base-column', 'moment'], function (_export) {
  'use strict';

  var BaseColumn, moment, DateColumn;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseColumn) {
      BaseColumn = _baseColumn.BaseColumn;
    }, function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      DateColumn = (function (_BaseColumn) {
        _inherits(DateColumn, _BaseColumn);

        function DateColumn(config, template, grid, columnId) {
          _classCallCheck(this, DateColumn);

          _get(Object.getPrototypeOf(DateColumn.prototype), 'constructor', this).call(this, config, template, grid, columnId);

          this.filterValueFrom = this._setFilterDateValue('from') || this._subscribe('from.bind', 'filterValueFrom');
          this.filterValueTo = this._setFilterDateValue('to') || this._subscribe('to.bind', 'filterValueTo');
        }

        _createClass(DateColumn, [{
          key: '_subscribe',
          value: function _subscribe(propName, columnPropertyName) {
            var viewModelPropertyName = this.config[propName];
            if (viewModelPropertyName === undefined) {
              return viewModelPropertyName;
            }

            var value = this.subscribe(viewModelPropertyName, columnPropertyName);

            return this._getMomentValue(value);
          }
        }, {
          key: 'setColumnProperty',
          value: function setColumnProperty(propertyName, newValue) {
            this[propertyName] = this._getMomentValue(newValue);
          }
        }, {
          key: '_getMomentValue',
          value: function _getMomentValue(value, throwErrorIfNotValidDate) {
            if (value === undefined) {
              if (throwErrorIfNotValidDate) {
                throw new Error('Argument exception! Value is not defined!');
              } else {
                return null;
              }
            }

            var date = value && value.constructor.name === 'Moment' ? value : moment(value);

            if (date.isValid() === false) {
              if (throwErrorIfNotValidDate) {
                throw new Error('Argument exception! Value: "' + value + '" is not a valid moment() argument!');
              } else {
                return null;
              }
            }

            return date;
          }
        }, {
          key: '_setFilterDateValue',
          value: function _setFilterDateValue(propName) {
            var value = this.config[propName];
            if (value !== undefined) {
              return this._getMomentValue(value);
            }

            return value;
          }
        }, {
          key: 'hasFilterValue',
          value: function hasFilterValue() {
            return this.filterValueFrom || this.filterValueTo;
          }
        }, {
          key: 'matchFilter',
          value: function matchFilter(filteredValue) {
            if (filteredValue === undefined) {
              throw new Error('Filtered value can\'t be undefined!');
            }

            var isAfter = undefined,
                isBefore = undefined;
            if (this.filterValueFrom && this.filterValueTo) {
              isAfter = this.filterValueFrom.isBefore(filteredValue);
              isBefore = this.filterValueTo.isAfter(filteredValue);
              return isAfter && isBefore;
            }

            if (this.filterValueFrom) {
              isAfter = this.filterValueFrom.isBefore(filteredValue);
              return isAfter;
            }

            if (this.filterValueTo) {
              isBefore = this.filterValueTo.isAfter(filteredValue);
              return isBefore;
            }

            return true;
          }
        }, {
          key: 'getFilterValue',
          value: function getFilterValue() {
            if (this.filterValueFrom && this.filterValueTo) {
              return [{
                name: this.field + 'From',
                value: this.filterValueFrom.format('YYYY-MM-DD'),
                type: '>',
                valueType: 'date'
              }, {
                name: this.field + 'To',
                value: this.filterValueTo.format('YYYY-MM-DD'),
                type: '<',
                valueType: 'date'
              }];
            } else if (this.filterValueFrom) {
              return [{
                name: this.field + 'From',
                value: this.filterValueFrom.format('YYYY-MM-DD'),
                type: '>',
                valueType: 'date'
              }];
            } else if (this.filterValueTo) {
              return [{
                name: this.field + 'To',
                value: this.filterValueTo.format('YYYY-MM-DD'),
                type: '<',
                valueType: 'date'
              }];
            }

            return [];
          }
        }, {
          key: 'compare',
          value: function compare(first, second) {
            var result = undefined;
            if (first.isAfter(second)) {
              result = 1;
            } else if (second.isAfter(first)) {
              result = -1;
            } else {
              result = 0;
            }

            if (this.isSortDirectionDesc()) {
              result *= -1;
            }

            return result;
          }
        }]);

        return DateColumn;
      })(BaseColumn);

      _export('DateColumn', DateColumn);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2RhdGUtY29sdW1uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzswQkFHYSxVQUFVOzs7Ozs7Ozs7Ozs7K0JBSGYsVUFBVTs7Ozs7QUFHTCxnQkFBVTtrQkFBVixVQUFVOztBQUNWLGlCQURBLFVBQVUsQ0FDVCxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0NBRG5DLFVBQVU7O0FBRW5CLHFDQUZTLFVBQVUsNkNBRWIsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOztBQUV4QyxjQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNHLGNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ3BHOztxQkFOVSxVQUFVOztpQkFRWCxvQkFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7QUFDdkMsZ0JBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRCxnQkFBSSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7QUFDdkMscUJBQU8scUJBQXFCLENBQUM7YUFDOUI7O0FBRUQsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7QUFFeEUsbUJBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUNwQzs7O2lCQUVnQiwyQkFBQyxZQUFZLEVBQUUsUUFBUSxFQUFFO0FBQ3hDLGdCQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FB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ZUFBZSxFQUFFO0FBQy9CLHFCQUFPLENBQUM7QUFDTixvQkFBSSxFQUFLLElBQUksQ0FBQyxLQUFLLFNBQU07QUFDekIscUJBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDaEQsb0JBQUksRUFBRSxHQUFHO0FBQ1QseUJBQVMsRUFBRSxNQUFNO2VBQ2xCLENBQUMsQ0FBQzthQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQzdCLHFCQUFPLENBQUM7QUFDTixvQkFBSSxFQUFLLElBQUksQ0FBQyxLQUFLLE9BQUk7QUFDdkIscUJBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDOUMsb0JBQUksRUFBRSxHQUFHO0FBQ1QseUJBQVMsRUFBRSxNQUFNO2VBQ2xCLENBQUMsQ0FBQzthQUNKOztBQUVELG1CQUFPLEVBQUUsQ0FBQztXQUNYOzs7aUJBRU0saUJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNyQixnQkFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLGdCQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDekIsb0JBQU0sR0FBRyxDQUFDLENBQUM7YUFDWixNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNoQyxvQkFBTSxHQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2QsTUFBTTtBQUNMLG9CQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ1o7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7QUFDOUIsb0JBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNkOztBQUVELG1CQUFPLE1BQU0sQ0FBQztXQUNmOzs7ZUFsSVUsVUFBVTtTQUFTLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvZ3JpZC9jb2x1bW4vZGF0ZS1jb2x1bW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb2x1bW59IGZyb20gJy4vYmFzZS1jb2x1bW4nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZUNvbHVtbiBleHRlbmRzIEJhc2VDb2x1bW4ge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgdGVtcGxhdGUsIGdyaWQsIGNvbHVtbklkKSB7XHJcbiAgICBzdXBlcihjb25maWcsIHRlbXBsYXRlLCBncmlkLCBjb2x1bW5JZCk7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJWYWx1ZUZyb20gPSB0aGlzLl9zZXRGaWx0ZXJEYXRlVmFsdWUoJ2Zyb20nKSB8fCB0aGlzLl9zdWJzY3JpYmUoJ2Zyb20uYmluZCcsICdmaWx0ZXJWYWx1ZUZyb20nKTtcclxuICAgIHRoaXMuZmlsdGVyVmFsdWVUbyA9IHRoaXMuX3NldEZpbHRlckRhdGVWYWx1ZSgndG8nKSB8fCB0aGlzLl9zdWJzY3JpYmUoJ3RvLmJpbmQnLCAnZmlsdGVyVmFsdWVUbycpO1xyXG4gIH1cclxuXHJcbiAgX3N1YnNjcmliZShwcm9wTmFtZSwgY29sdW1uUHJvcGVydHlOYW1lKSB7XHJcbiAgICBsZXQgdmlld01vZGVsUHJvcGVydHlOYW1lID0gdGhpcy5jb25maWdbcHJvcE5hbWVdO1xyXG4gICAgaWYgKHZpZXdNb2RlbFByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB2aWV3TW9kZWxQcm9wZXJ0eU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnN1YnNjcmliZSh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUsIGNvbHVtblByb3BlcnR5TmFtZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2dldE1vbWVudFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNldENvbHVtblByb3BlcnR5KHByb3BlcnR5TmFtZSwgbmV3VmFsdWUpIHtcclxuICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHRoaXMuX2dldE1vbWVudFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcblxyXG4gIF9nZXRNb21lbnRWYWx1ZSh2YWx1ZSwgdGhyb3dFcnJvcklmTm90VmFsaWREYXRlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhyb3dFcnJvcklmTm90VmFsaWREYXRlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBleGNlcHRpb24hIFZhbHVlIGlzIG5vdCBkZWZpbmVkIScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdNb21lbnQnID8gdmFsdWUgOiBtb21lbnQodmFsdWUpO1xyXG5cclxuICAgIGlmIChkYXRlLmlzVmFsaWQoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgaWYgKHRocm93RXJyb3JJZk5vdFZhbGlkRGF0ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQXJndW1lbnQgZXhjZXB0aW9uISBWYWx1ZTogXCIke3ZhbHVlfVwiIGlzIG5vdCBhIHZhbGlkIG1vbWVudCgpIGFyZ3VtZW50IWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG5cclxuICBfc2V0RmlsdGVyRGF0ZVZhbHVlKHByb3BOYW1lKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29uZmlnW3Byb3BOYW1lXTtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9nZXRNb21lbnRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgaGFzRmlsdGVyVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZUZyb20gfHwgdGhpcy5maWx0ZXJWYWx1ZVRvO1xyXG4gIH1cclxuXHJcbiAgbWF0Y2hGaWx0ZXIoZmlsdGVyZWRWYWx1ZSkge1xyXG4gICAgaWYgKGZpbHRlcmVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbHRlcmVkIHZhbHVlIGNhblxcJ3QgYmUgdW5kZWZpbmVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpc0FmdGVyLCBpc0JlZm9yZTtcclxuICAgIGlmICh0aGlzLmZpbHRlclZhbHVlRnJvbSAmJiB0aGlzLmZpbHRlclZhbHVlVG8pIHtcclxuICAgICAgaXNBZnRlciA9IHRoaXMuZmlsdGVyVmFsdWVGcm9tLmlzQmVmb3JlKGZpbHRlcmVkVmFsdWUpO1xyXG4gICAgICBpc0JlZm9yZSA9IHRoaXMuZmlsdGVyVmFsdWVUby5pc0FmdGVyKGZpbHRlcmVkVmFsdWUpO1xyXG4gICAgICByZXR1cm4gaXNBZnRlciAmJiBpc0JlZm9yZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZUZyb20pIHtcclxuICAgICAgaXNBZnRlciA9IHRoaXMuZmlsdGVyVmFsdWVGcm9tLmlzQmVmb3JlKGZpbHRlcmVkVmFsdWUpO1xyXG4gICAgICByZXR1cm4gaXNBZnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRvKSB7XHJcbiAgICAgIGlzQmVmb3JlID0gdGhpcy5maWx0ZXJWYWx1ZVRvLmlzQWZ0ZXIoZmlsdGVyZWRWYWx1ZSk7XHJcbiAgICAgIHJldHVybiBpc0JlZm9yZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlclZhbHVlKCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVGcm9tICYmIHRoaXMuZmlsdGVyVmFsdWVUbykge1xyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICBuYW1lOiBgJHt0aGlzLmZpZWxkfUZyb21gLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlRnJvbS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcclxuICAgICAgICB0eXBlOiAnPicsXHJcbiAgICAgICAgdmFsdWVUeXBlOiAnZGF0ZSdcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6IGAke3RoaXMuZmllbGR9VG9gLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlVG8uZm9ybWF0KCdZWVlZLU1NLUREJyksXHJcbiAgICAgICAgdHlwZTogJzwnLFxyXG4gICAgICAgIHZhbHVlVHlwZTogJ2RhdGUnXHJcbiAgICAgIH1dO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclZhbHVlRnJvbSkge1xyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICBuYW1lOiBgJHt0aGlzLmZpZWxkfUZyb21gLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlRnJvbS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcclxuICAgICAgICB0eXBlOiAnPicsXHJcbiAgICAgICAgdmFsdWVUeXBlOiAnZGF0ZSdcclxuICAgICAgfV07XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyVmFsdWVUbykge1xyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICBuYW1lOiBgJHt0aGlzLmZpZWxkfVRvYCxcclxuICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZVRvLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxyXG4gICAgICAgIHR5cGU6ICc8JyxcclxuICAgICAgICB2YWx1ZVR5cGU6ICdkYXRlJ1xyXG4gICAgICB9XTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBjb21wYXJlKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIGxldCByZXN1bHQ7XHJcbiAgICBpZiAoZmlyc3QuaXNBZnRlcihzZWNvbmQpKSB7XHJcbiAgICAgIHJlc3VsdCA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKHNlY29uZC5pc0FmdGVyKGZpcnN0KSkge1xyXG4gICAgICByZXN1bHQgPSAgLTE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzU29ydERpcmVjdGlvbkRlc2MoKSkge1xyXG4gICAgICByZXN1bHQgKj0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
