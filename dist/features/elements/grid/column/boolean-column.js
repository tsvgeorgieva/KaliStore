System.register(['./base-column'], function (_export) {
  'use strict';

  var BaseColumn, BooleanColumn;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseColumn) {
      BaseColumn = _baseColumn.BaseColumn;
    }],
    execute: function () {
      BooleanColumn = (function (_BaseColumn) {
        _inherits(BooleanColumn, _BaseColumn);

        function BooleanColumn(config, template, grid, columnId) {
          _classCallCheck(this, BooleanColumn);

          _get(Object.getPrototypeOf(BooleanColumn.prototype), 'constructor', this).call(this, config, template, grid, columnId);

          switch (config['filter-value']) {
            case 'true':
              this.filterValue = true;
              break;
            case 'false':
              this.filterValue = false;
              break;
            default:
              this.filterValue = undefined;
          }

          if (this.filterValue === undefined) {
            var viewModelPropertyName = config['filter-value.bind'];
            if (viewModelPropertyName !== undefined) {
              this.filterValue = this.subscribe(viewModelPropertyName, 'filterValue');
            }
          }

          this._setFilterValues();
        }

        _createClass(BooleanColumn, [{
          key: '_setFilterValues',
          value: function _setFilterValues() {
            if (this.filterValue === true) {
              this.trueFilter = true;
              this.falseFilter = false;
            } else if (this.filterValue === false) {
              this.trueFilter = false;
              this.falseFilter = true;
            } else {
              this.trueFilter = true;
              this.falseFilter = true;
            }
          }
        }, {
          key: 'setColumnProperty',
          value: function setColumnProperty(columnPropertyName, newValue) {
            this[columnPropertyName] = newValue;
            this._setFilterValues();
            this.updateFilter();
          }
        }, {
          key: 'trueFilterToggle',
          value: function trueFilterToggle() {
            if (this.falseFilter) {
              this.trueFilter = !this.trueFilter;
              this.updateFilter();
            }
          }
        }, {
          key: 'falseFilterToggle',
          value: function falseFilterToggle() {
            if (this.trueFilter) {
              this.falseFilter = !this.falseFilter;
              this.updateFilter();
            }
          }
        }, {
          key: 'updateFilter',
          value: function updateFilter() {
            if (this.trueFilter && this.falseFilter) {
              this.filterValue = undefined;
            } else if (this.trueFilter) {
              this.filterValue = true;
            } else if (this.falseFilter) {
              this.filterValue = false;
            }

            this.grid.updateFilters();
          }
        }, {
          key: 'hasFilterValue',
          value: function hasFilterValue() {
            return this.filterValue !== undefined;
          }
        }, {
          key: 'matchFilter',
          value: function matchFilter(filteredValue) {
            if (filteredValue === undefined) {
              throw new Error('Filtered value can\'t be undefined!');
            }

            if (this.hasFilterValue()) {
              return filteredValue === this.filterValue;
            }

            return true;
          }
        }, {
          key: 'getFilterValue',
          value: function getFilterValue() {
            if (this.filterValue !== undefined) {
              var result = [{
                name: this.field,
                value: this.filterValue,
                type: '=',
                valueType: 'boolean'
              }];

              return result;
            }

            return [];
          }
        }, {
          key: 'compare',
          value: function compare(x, y) {
            if (this.isSortDirectionDesc()) {
              return x === y ? 0 : x ? -1 : 1;
            } else {
              return x === y ? 0 : x ? 1 : -1;
            }
          }
        }]);

        return BooleanColumn;
      })(BaseColumn);

      _export('BooleanColumn', BooleanColumn);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2Jvb2xlYW4tY29sdW1uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFFYSxhQUFhOzs7Ozs7Ozs7Ozs7K0JBRmxCLFVBQVU7OztBQUVMLG1CQUFhO2tCQUFiLGFBQWE7O0FBQ2IsaUJBREEsYUFBYSxDQUNaLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQ0FEbkMsYUFBYTs7QUFFdEIscUNBRlMsYUFBYSw2Q0FFaEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFOztBQUV4QyxrQkFBUSxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzlCLGlCQUFLLE1BQU07QUFDVCxrQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDeEIsb0JBQU07QUFBQSxBQUNSLGlCQUFLLE9BQU87QUFDVixrQkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDekIsb0JBQU07QUFBQSxBQUNSO0FBQ0Usa0JBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQUEsV0FDOUI7O0FBRUQsY0FBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUNsQyxnQkFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMxRCxnQkFBSSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7QUFDdkMsa0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN6RTtXQUNGOztBQUVELGNBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCOztxQkF2QlUsYUFBYTs7aUJBeUJSLDRCQUFHO0FBQ2pCLGdCQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO0FBQzdCLGtCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixrQkFBSSxDQUFDLFdBQVcs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ZXMvZWxlbWVudHMvZ3JpZC9jb2x1bW4vYm9vbGVhbi1jb2x1bW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VDb2x1bW59IGZyb20gJy4vYmFzZS1jb2x1bW4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb2xlYW5Db2x1bW4gZXh0ZW5kcyBCYXNlQ29sdW1uIHtcclxuICBjb25zdHJ1Y3Rvcihjb25maWcsIHRlbXBsYXRlLCBncmlkLCBjb2x1bW5JZCkge1xyXG4gICAgc3VwZXIoY29uZmlnLCB0ZW1wbGF0ZSwgZ3JpZCwgY29sdW1uSWQpO1xyXG5cclxuICAgIHN3aXRjaCAoY29uZmlnWydmaWx0ZXItdmFsdWUnXSkge1xyXG4gICAgY2FzZSAndHJ1ZSc6XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB0cnVlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ZhbHNlJzpcclxuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB2aWV3TW9kZWxQcm9wZXJ0eU5hbWUgPSBjb25maWdbJ2ZpbHRlci12YWx1ZS5iaW5kJ107XHJcbiAgICAgIGlmICh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB0aGlzLnN1YnNjcmliZSh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUsICdmaWx0ZXJWYWx1ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2V0RmlsdGVyVmFsdWVzKCk7XHJcbiAgfVxyXG5cclxuICBfc2V0RmlsdGVyVmFsdWVzKCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy50cnVlRmlsdGVyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5mYWxzZUZpbHRlciA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnRydWVGaWx0ZXIgPSBmYWxzZTtcclxuICAgICAgdGhpcy5mYWxzZUZpbHRlciA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRydWVGaWx0ZXIgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZhbHNlRmlsdGVyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldENvbHVtblByb3BlcnR5KGNvbHVtblByb3BlcnR5TmFtZSwgbmV3VmFsdWUpIHtcclxuICAgIHRoaXNbY29sdW1uUHJvcGVydHlOYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5fc2V0RmlsdGVyVmFsdWVzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlcigpO1xyXG4gIH1cclxuXHJcbiAgdHJ1ZUZpbHRlclRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLmZhbHNlRmlsdGVyKSB7XHJcbiAgICAgIHRoaXMudHJ1ZUZpbHRlciA9ICF0aGlzLnRydWVGaWx0ZXI7XHJcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmYWxzZUZpbHRlclRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLnRydWVGaWx0ZXIpIHtcclxuICAgICAgdGhpcy5mYWxzZUZpbHRlciA9ICF0aGlzLmZhbHNlRmlsdGVyO1xyXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRmlsdGVyKCkge1xyXG4gICAgaWYgKHRoaXMudHJ1ZUZpbHRlciAmJiB0aGlzLmZhbHNlRmlsdGVyKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJ1ZUZpbHRlcikge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5mYWxzZUZpbHRlcikge1xyXG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkLnVwZGF0ZUZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIGhhc0ZpbHRlclZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyVmFsdWUgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG1hdGNoRmlsdGVyKGZpbHRlcmVkVmFsdWUpIHtcclxuICAgIGlmIChmaWx0ZXJlZFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaWx0ZXJlZCB2YWx1ZSBjYW5cXCd0IGJlIHVuZGVmaW5lZCEnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oYXNGaWx0ZXJWYWx1ZSgpKSB7XHJcbiAgICAgIHJldHVybiBmaWx0ZXJlZFZhbHVlID09PSB0aGlzLmZpbHRlclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyVmFsdWUoKSB7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBbe1xyXG4gICAgICAgIG5hbWU6IHRoaXMuZmllbGQsXHJcbiAgICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyVmFsdWUsXHJcbiAgICAgICAgdHlwZTogJz0nLFxyXG4gICAgICAgIHZhbHVlVHlwZTogJ2Jvb2xlYW4nXHJcbiAgICAgIH1dO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBjb21wYXJlKHgsIHkpIHtcclxuICAgIGlmICh0aGlzLmlzU29ydERpcmVjdGlvbkRlc2MoKSkge1xyXG4gICAgICByZXR1cm4gKHggPT09IHkpID8gMCA6IHggPyAtMSA6IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHggPT09IHkpID8gMCA6IHggPyAxIDogLTE7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
