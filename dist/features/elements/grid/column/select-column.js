System.register(['./base-column'], function (_export) {
  'use strict';

  var BaseColumn, SelectColumn;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseColumn) {
      BaseColumn = _baseColumn.BaseColumn;
    }],
    execute: function () {
      SelectColumn = (function (_BaseColumn) {
        _inherits(SelectColumn, _BaseColumn);

        function SelectColumn(config, template, grid, columnId) {
          _classCallCheck(this, SelectColumn);

          _get(Object.getPrototypeOf(SelectColumn.prototype), 'constructor', this).call(this, config, template, grid, columnId);

          this.filterValue = config['filter-value'];
          if (this.filterValue === undefined) {
            var viewModelPropertyName = config['filter-value.bind'];
            if (viewModelPropertyName !== undefined) {
              this.filterValue = this.subscribe(viewModelPropertyName, 'filterValue');
            } else {
              this.filterValue = undefined;
            }
          }

          var viewModelItemsPropertyName = config['filter-items.bind'];
          if (viewModelItemsPropertyName === undefined) {
            throw new Error('Argument Exception! ViewModel has to define "filter-items.bind" value!');
          }

          this.items = this.subscribe(viewModelItemsPropertyName, 'items');
        }

        _createClass(SelectColumn, [{
          key: 'hasFilterValue',
          value: function hasFilterValue() {
            return this.filterValue !== undefined;
          }
        }, {
          key: 'matchFilter',
          value: function matchFilter(valueToFilter) {
            if (valueToFilter === undefined) {
              throw new Error('Value to filter can\'t be undefined!');
            }

            if (this.hasFilterValue()) {
              return this.filterValue === valueToFilter;
            }

            return true;
          }
        }, {
          key: 'getFilterValue',
          value: function getFilterValue() {
            if (this.hasFilterValue()) {
              var result = [{
                name: this.field,
                value: this.filterValue,
                valueType: 'select'
              }];

              return result;
            }

            return [];
          }
        }, {
          key: 'compare',
          value: function compare(first, second) {
            var result = undefined;
            if (first > second) {
              result = 1;
            } else if (first < second) {
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

        return SelectColumn;
      })(BaseColumn);

      _export('SelectColumn', SelectColumn);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL3NlbGVjdC1jb2x1bW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQUdhLFlBQVk7Ozs7Ozs7Ozs7OzsrQkFIakIsVUFBVTs7O0FBR0wsa0JBQVk7a0JBQVosWUFBWTs7QUFDWixpQkFEQSxZQUFZLENBQ1gsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dDQURuQyxZQUFZOztBQUVyQixxQ0FGUyxZQUFZLDZDQUVmLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs7QUFFeEMsY0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDMUMsY0FBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUNsQyxnQkFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMxRCxnQkFBSSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7QUFDdkMsa0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN6RSxNQUFNO0FBQ0wsa0JBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO2FBQzlCO1dBQ0Y7O0FBRUQsY0FBTSwwQkFBMEIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMvRCxjQUFJLDBCQUEwQixLQUFLLFNBQVMsRUFBRTtBQUM1QyxrQkFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1dBQzNGOztBQUVELGNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRTs7cUJBcEJVLFlBQVk7O2lCQXNCVCwwQkFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDO1dBQ3ZDOzs7aUJBRVUscUJBQUMsYUFBYSxFQUFFO0FBQ3pCLGdCQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7QUFDL0Isb0JBQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQzthQUN6RDs7QUFFRCxnQkFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDekIscUJBQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxhQUFhLENBQUM7YUFDM0M7O0FBR0QsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFFYSwwQkFBRztBQUNmLGdCQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUN6QixrQkFBSSxNQUFNLEdBQUcsQ0FBQztBQUNaLG9CQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDaEIscUJBQUssRUFBRSxJQUFJLENBQUMsV0FBVztBQUN2Qix5QkFBUyxFQUFFLFFBQVE7ZUFDcEIsQ0FBQyxDQUFDOztBQUVILHFCQUFPLE1BQU0sQ0FBQzthQUNmOztBQUVELG1CQUFPLEVBQUUsQ0FBQztXQUNYOzs7aUJBRU0saUJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNyQixnQkFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLGdCQUFJLEtBQUssR0FBRyxNQUFNLEVBQUU7QUFDbEIsb0JBQU0sR0FBRyxDQUFDLENBQUM7YUFDWixNQUFNLElBQUksS0FBSyxHQUFHLE1BQU0sRUFBRTtBQUN6QixvQkFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2IsTUFBTTtBQUNMLG9CQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ1o7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7QUFDOUIsb0JBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNkOztBQUVELG1CQUFPLE1BQU0sQ0FBQztXQUNmOzs7ZUFwRVUsWUFBWTtTQUFTLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvZ3JpZC9jb2x1bW4vc2VsZWN0LWNvbHVtbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbHVtbn0gZnJvbSAnLi9iYXNlLWNvbHVtbic7XHJcblxyXG4vLyB0b2RvOiBpbXBsZW1lbnRcclxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbHVtbiBleHRlbmRzIEJhc2VDb2x1bW4ge1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgdGVtcGxhdGUsIGdyaWQsIGNvbHVtbklkKSB7XHJcbiAgICBzdXBlcihjb25maWcsIHRlbXBsYXRlLCBncmlkLCBjb2x1bW5JZCk7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGNvbmZpZ1snZmlsdGVyLXZhbHVlJ107XHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHZpZXdNb2RlbFByb3BlcnR5TmFtZSA9IGNvbmZpZ1snZmlsdGVyLXZhbHVlLmJpbmQnXTtcclxuICAgICAgaWYgKHZpZXdNb2RlbFByb3BlcnR5TmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHRoaXMuc3Vic2NyaWJlKHZpZXdNb2RlbFByb3BlcnR5TmFtZSwgJ2ZpbHRlclZhbHVlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXdNb2RlbEl0ZW1zUHJvcGVydHlOYW1lID0gY29uZmlnWydmaWx0ZXItaXRlbXMuYmluZCddO1xyXG4gICAgaWYgKHZpZXdNb2RlbEl0ZW1zUHJvcGVydHlOYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBFeGNlcHRpb24hIFZpZXdNb2RlbCBoYXMgdG8gZGVmaW5lIFwiZmlsdGVyLWl0ZW1zLmJpbmRcIiB2YWx1ZSEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5zdWJzY3JpYmUodmlld01vZGVsSXRlbXNQcm9wZXJ0eU5hbWUsICdpdGVtcycpO1xyXG4gIH1cclxuXHJcbiAgaGFzRmlsdGVyVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgbWF0Y2hGaWx0ZXIodmFsdWVUb0ZpbHRlcikge1xyXG4gICAgaWYgKHZhbHVlVG9GaWx0ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHRvIGZpbHRlciBjYW5cXCd0IGJlIHVuZGVmaW5lZCEnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oYXNGaWx0ZXJWYWx1ZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlclZhbHVlID09PSB2YWx1ZVRvRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5vIGZpbHRlciB2YWx1ZSAtPiBtYXRjaCBldmVyeXRoaW5nXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlclZhbHVlKCkge1xyXG4gICAgaWYgKHRoaXMuaGFzRmlsdGVyVmFsdWUoKSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW3tcclxuICAgICAgICBuYW1lOiB0aGlzLmZpZWxkLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlLFxyXG4gICAgICAgIHZhbHVlVHlwZTogJ3NlbGVjdCdcclxuICAgICAgfV07XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmUoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGlmIChmaXJzdCA+IHNlY29uZCkge1xyXG4gICAgICByZXN1bHQgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChmaXJzdCA8IHNlY29uZCkge1xyXG4gICAgICByZXN1bHQgPSAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTb3J0RGlyZWN0aW9uRGVzYygpKSB7XHJcbiAgICAgIHJlc3VsdCAqPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
