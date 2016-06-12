System.register(['./base-column'], function (_export) {
  'use strict';

  var BaseColumn, InputColumn;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseColumn) {
      BaseColumn = _baseColumn.BaseColumn;
    }],
    execute: function () {
      InputColumn = (function (_BaseColumn) {
        _inherits(InputColumn, _BaseColumn);

        function InputColumn(config, template, grid, columnId) {
          _classCallCheck(this, InputColumn);

          _get(Object.getPrototypeOf(InputColumn.prototype), 'constructor', this).call(this, config, template, grid, columnId);

          this.filterValue = config['filter-value'];
          if (this.filterValue === undefined) {
            var viewModelPropertyName = config['filter-value.bind'];
            if (viewModelPropertyName !== undefined) {
              this.filterValue = this.subscribe(viewModelPropertyName, 'filterValue');
            } else {
              this.filterValue = '';
            }
          }
        }

        _createClass(InputColumn, [{
          key: 'hasFilterValue',
          value: function hasFilterValue() {
            return this.filterValue !== '' && this.filterValue !== undefined;
          }
        }, {
          key: 'matchFilter',
          value: function matchFilter(filteredValue) {
            if (filteredValue === undefined) {
              throw new Error('Filtered value can\'t be undefined!');
            }

            if (this.hasFilterValue()) {
              return filteredValue.toString().toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
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
                valueType: 'string'
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

        return InputColumn;
      })(BaseColumn);

      _export('InputColumn', InputColumn);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2lucHV0LWNvbHVtbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBRWEsV0FBVzs7Ozs7Ozs7Ozs7OytCQUZoQixVQUFVOzs7QUFFTCxpQkFBVztrQkFBWCxXQUFXOztBQUNYLGlCQURBLFdBQVcsQ0FDVixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0NBRG5DLFdBQVc7O0FBRXBCLHFDQUZTLFdBQVcsNkNBRWQsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOztBQUV4QyxjQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQyxjQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO0FBQ2xDLGdCQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtBQUN2QyxrQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3pFLE1BQU07QUFDTCxrQkFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7YUFDdkI7V0FDRjtTQUNGOztxQkFiVSxXQUFXOztpQkFlUiwwQkFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDO1dBQ2xFOzs7aUJBRVUscUJBQUMsYUFBYSxFQUFFO0FBQ3pCLGdCQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7QUFDL0Isb0JBQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUN4RDs7QUFFRCxnQkFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDekIscUJBQU8sYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2pEOztBQUdELG1CQUFPLElBQUksQ0FBQztXQUNiOzs7aUJBRWEsMEJBQUc7QUFDZixnQkFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDekIsa0JBQUksTUFBTSxHQUFHLENBQUM7QUFDWixvQkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2hCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDdkIseUJBQVMsRUFBRSxRQUFRO2VBQ3BCLENBQUMsQ0FBQzs7QUFFSCxxQkFBTyxNQUFNLENBQUM7YUFDZjs7QUFFRCxtQkFBTyxFQUFFLENBQUM7V0FDWDs7O2lCQUVNLGlCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDckIsZ0JBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxnQkFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFO0FBQ2xCLG9CQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ1osTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLEVBQUU7QUFDekIsb0JBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNiLE1BQU07QUFDTCxvQkFBTSxHQUFHLENBQUMsQ0FBQzthQUNaOztBQUVELGdCQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO0FBQzlCLG9CQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDZDs7QUFFRCxtQkFBTyxNQUFNLENBQUM7V0FDZjs7O2VBOURVLFdBQVc7U0FBUyxVQUFVIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2lucHV0LWNvbHVtbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbHVtbn0gZnJvbSAnLi9iYXNlLWNvbHVtbic7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRDb2x1bW4gZXh0ZW5kcyBCYXNlQ29sdW1uIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIHRlbXBsYXRlLCBncmlkLCBjb2x1bW5JZCkge1xyXG4gICAgc3VwZXIoY29uZmlnLCB0ZW1wbGF0ZSwgZ3JpZCwgY29sdW1uSWQpO1xyXG5cclxuICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBjb25maWdbJ2ZpbHRlci12YWx1ZSddO1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB2aWV3TW9kZWxQcm9wZXJ0eU5hbWUgPSBjb25maWdbJ2ZpbHRlci12YWx1ZS5iaW5kJ107XHJcbiAgICAgIGlmICh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB0aGlzLnN1YnNjcmliZSh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUsICdmaWx0ZXJWYWx1ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzRmlsdGVyVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZSAhPT0gJycgJiYgdGhpcy5maWx0ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgbWF0Y2hGaWx0ZXIoZmlsdGVyZWRWYWx1ZSkge1xyXG4gICAgaWYgKGZpbHRlcmVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbHRlcmVkIHZhbHVlIGNhblxcJ3QgYmUgdW5kZWZpbmVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhhc0ZpbHRlclZhbHVlKCkpIHtcclxuICAgICAgcmV0dXJuIGZpbHRlcmVkVmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLmluZGV4T2YodGhpcy5maWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5vIGZpbHRlciB2YWx1ZSAtPiBtYXRjaCBldmVyeXRoaW5nXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlclZhbHVlKCkge1xyXG4gICAgaWYgKHRoaXMuaGFzRmlsdGVyVmFsdWUoKSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gW3tcclxuICAgICAgICBuYW1lOiB0aGlzLmZpZWxkLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlLFxyXG4gICAgICAgIHZhbHVlVHlwZTogJ3N0cmluZydcclxuICAgICAgfV07XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmUoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGlmIChmaXJzdCA+IHNlY29uZCkge1xyXG4gICAgICByZXN1bHQgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChmaXJzdCA8IHNlY29uZCkge1xyXG4gICAgICByZXN1bHQgPSAtMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTb3J0RGlyZWN0aW9uRGVzYygpKSB7XHJcbiAgICAgIHJlc3VsdCAqPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
