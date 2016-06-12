System.register(['./base-store'], function (_export) {
  'use strict';

  var BaseStore, LocalStore;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseStore) {
      BaseStore = _baseStore.BaseStore;
    }],
    execute: function () {
      LocalStore = (function (_BaseStore) {
        _inherits(LocalStore, _BaseStore);

        function LocalStore(data, settings) {
          _classCallCheck(this, LocalStore);

          _get(Object.getPrototypeOf(LocalStore.prototype), 'constructor', this).call(this, settings);
          this.data = data;
        }

        _createClass(LocalStore, [{
          key: 'applySort',
          value: function applySort(data) {
            var columnDefinitions = this.sortProcessingOrder.map(function (sort) {
              return sort.column;
            });

            if (columnDefinitions.length > 0) {
              data = data.sort(function (a, b) {
                return columnDefinitions.map(function (column) {
                  var propName = column.getFieldName();
                  return column.compare(a[propName], b[propName]);
                }).reduce(function firstNonZeroValue(p, n) {
                  return p ? p : n;
                }, 0);
              });
            }

            return data;
          }
        }, {
          key: 'applyFilter',
          value: function applyFilter(data) {
            var _this = this;

            return data.filter(function (row) {
              var include = true;

              for (var i = _this.columnDefinitions.length - 1; i >= 0; i--) {
                var col = _this.columnDefinitions[i];
                if (col.hasFilter() === false) {
                  continue;
                }

                var applyFilterAgainstValue = _this._getItemColValue(row, col.getFieldName());
                if (col.matchFilter(applyFilterAgainstValue) === false) {
                  include = false;
                  break;
                }
              }

              return include;
            });
          }
        }, {
          key: '_getItemColValue',
          value: function _getItemColValue(row, fieldName) {
            var fields = fieldName.split('.');
            var value = row;
            while (fields.length > 0) {
              value = value[fields.shift()];
            }
            return value;
          }
        }, {
          key: 'applyPagination',
          value: function applyPagination(data) {
            var start = (Number(this.page) - 1) * Number(this.pageSize);
            data = data.slice(start, start + Number(this.pageSize));

            return data;
          }
        }, {
          key: 'filterAndSortPage',
          value: function filterAndSortPage(data) {
            var tempData = data;

            if (this.isFilterable()) {
              tempData = this.applyFilter(tempData);
            }

            if (this.isSortable()) {
              tempData = this.applySort(tempData);
            }

            if (this.isPageable()) {
              tempData = this.applyPagination(tempData);
            }

            return tempData;
          }
        }, {
          key: 'refresh',
          value: function refresh(newData) {
            this.data = newData;
          }
        }, {
          key: 'getData',
          value: function getData() {
            var data = this.filterAndSortPage(this.data);
            this.count = this.data.length;
            this.updatePager();
            return new Promise(function (resolve, reject) {
              resolve(data);
            });
          }
        }]);

        return LocalStore;
      })(BaseStore);

      _export('LocalStore', LocalStore);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvbG9jYWwtc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUVhLFVBQVU7Ozs7Ozs7Ozs7Ozs2QkFGZixTQUFTOzs7QUFFSixnQkFBVTtrQkFBVixVQUFVOztBQUVWLGlCQUZBLFVBQVUsQ0FFVCxJQUFJLEVBQUUsUUFBUSxFQUFFO2dDQUZqQixVQUFVOztBQUduQixxQ0FIUyxVQUFVLDZDQUdiLFFBQVEsRUFBRTtBQUNoQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjs7cUJBTFUsVUFBVTs7aUJBT1osbUJBQUMsSUFBSSxFQUFFO0FBQ2QsZ0JBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksRUFBSTtBQUMzRCxxQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3BCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLGtCQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLEVBQUs7QUFDekIsdUJBQU8saUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ3JDLHNCQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDckMseUJBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2pELENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3pDLHlCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDO2VBQ1AsQ0FBQyxDQUFDO2FBQ0o7O0FBRUQsbUJBQU8sSUFBSSxDQUFD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QVU7U0FBUyxTQUFTIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvbG9jYWwtc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VTdG9yZX0gZnJvbSAnLi9iYXNlLXN0b3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlIGV4dGVuZHMgQmFzZVN0b3JlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YSwgc2V0dGluZ3MpIHtcclxuICAgIHN1cGVyKHNldHRpbmdzKTtcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBhcHBseVNvcnQoZGF0YSkge1xyXG4gICAgbGV0IGNvbHVtbkRlZmluaXRpb25zID0gdGhpcy5zb3J0UHJvY2Vzc2luZ09yZGVyLm1hcChzb3J0ID0+IHtcclxuICAgICAgcmV0dXJuIHNvcnQuY29sdW1uO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgZGF0YSA9IGRhdGEuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb2x1bW5EZWZpbml0aW9ucy5tYXAoY29sdW1uID0+IHtcclxuICAgICAgICAgIGxldCBwcm9wTmFtZSA9IGNvbHVtbi5nZXRGaWVsZE5hbWUoKTtcclxuICAgICAgICAgIHJldHVybiBjb2x1bW4uY29tcGFyZShhW3Byb3BOYW1lXSwgYltwcm9wTmFtZV0pO1xyXG4gICAgICAgIH0pLnJlZHVjZShmdW5jdGlvbiBmaXJzdE5vblplcm9WYWx1ZShwLCBuKSB7XHJcbiAgICAgICAgICByZXR1cm4gcCA/IHAgOiBuO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVyKGRhdGEpIHtcclxuICAgIHJldHVybiBkYXRhLmZpbHRlcigocm93KSA9PiB7XHJcbiAgICAgIGxldCBpbmNsdWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNvbHVtbkRlZmluaXRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgbGV0IGNvbCA9IHRoaXMuY29sdW1uRGVmaW5pdGlvbnNbaV07XHJcbiAgICAgICAgaWYgKGNvbC5oYXNGaWx0ZXIoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFwcGx5RmlsdGVyQWdhaW5zdFZhbHVlID0gdGhpcy5fZ2V0SXRlbUNvbFZhbHVlKHJvdywgY29sLmdldEZpZWxkTmFtZSgpKTtcclxuICAgICAgICBpZiAoY29sLm1hdGNoRmlsdGVyKGFwcGx5RmlsdGVyQWdhaW5zdFZhbHVlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGluY2x1ZGUgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGluY2x1ZGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9nZXRJdGVtQ29sVmFsdWUocm93LCBmaWVsZE5hbWUpe1xyXG4gICAgbGV0IGZpZWxkcyA9IGZpZWxkTmFtZS5zcGxpdCgnLicpO1xyXG4gICAgbGV0IHZhbHVlID0gcm93O1xyXG4gICAgd2hpbGUoZmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZHMuc2hpZnQoKV1cclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFwcGx5UGFnaW5hdGlvbihkYXRhKSB7XHJcbiAgICBsZXQgc3RhcnQgPSAoTnVtYmVyKHRoaXMucGFnZSkgLSAxKSAqIE51bWJlcih0aGlzLnBhZ2VTaXplKTtcclxuICAgIGRhdGEgPSBkYXRhLnNsaWNlKHN0YXJ0LCBzdGFydCArIE51bWJlcih0aGlzLnBhZ2VTaXplKSk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJBbmRTb3J0UGFnZShkYXRhKSB7XHJcbiAgICBsZXQgdGVtcERhdGEgPSBkYXRhO1xyXG5cclxuICAgIGlmICh0aGlzLmlzRmlsdGVyYWJsZSgpKSB7XHJcbiAgICAgIHRlbXBEYXRhID0gdGhpcy5hcHBseUZpbHRlcih0ZW1wRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTb3J0YWJsZSgpKSB7XHJcbiAgICAgIHRlbXBEYXRhID0gdGhpcy5hcHBseVNvcnQodGVtcERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRvZG86IGRvZXMgdGhpcyBuZWVkcyB0byBiZSBoZXJlP1xyXG4gICAgaWYgKHRoaXMuaXNQYWdlYWJsZSgpKSB7XHJcbiAgICAgIHRlbXBEYXRhID0gdGhpcy5hcHBseVBhZ2luYXRpb24odGVtcERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZW1wRGF0YTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2gobmV3RGF0YSkge1xyXG4gICAgdGhpcy5kYXRhID0gbmV3RGF0YTtcclxuICB9XHJcblxyXG4gIGdldERhdGEoKSB7XHJcbiAgICBsZXQgZGF0YSA9IHRoaXMuZmlsdGVyQW5kU29ydFBhZ2UodGhpcy5kYXRhKTtcclxuICAgIHRoaXMuY291bnQgPSB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgdGhpcy51cGRhdGVQYWdlcigpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
