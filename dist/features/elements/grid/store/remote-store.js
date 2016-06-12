System.register(['./base-store'], function (_export) {
  'use strict';

  var BaseStore, RemoteStore;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_baseStore) {
      BaseStore = _baseStore.BaseStore;
    }],
    execute: function () {
      RemoteStore = (function (_BaseStore) {
        _inherits(RemoteStore, _BaseStore);

        function RemoteStore(read, settings) {
          _classCallCheck(this, RemoteStore);

          _get(Object.getPrototypeOf(RemoteStore.prototype), 'constructor', this).call(this, settings);

          this.read = read;
          if (typeof read !== 'function') {
            throw new Error('Argument Exception: "read" must be a function for loading data returning promise!');
          }
        }

        _createClass(RemoteStore, [{
          key: 'getFiltersValuesAsQueryString',
          value: function getFiltersValuesAsQueryString() {
            var filters = [];
            for (var i = this.columnDefinitions.length - 1; i >= 0; i--) {
              var col = this.columnDefinitions[i];
              var filterQueryString = col.getQueryString();
              if (filterQueryString !== undefined) {
                filters.push(filterQueryString);
              }
            }

            return filters;
          }
        }, {
          key: 'getFiltersValues',
          value: function getFiltersValues() {
            var filters = [];
            for (var i = this.columnDefinitions.length - 1; i >= 0; i--) {
              var col = this.columnDefinitions[i];
              filters = filters.concat(col.getFilterValue());
            }

            return filters;
          }
        }, {
          key: 'getSorters',
          value: function getSorters() {
            return this.sortProcessingOrder.map(function (sorter) {
              return {
                name: sorter.name,
                value: sorter.value
              };
            });
          }
        }, {
          key: 'getData',
          value: function getData() {
            var _this = this;

            var queryValues = {
              filters: this.getFiltersValues(),
              paging: {
                page: this.page,
                count: window.Number(this.pageSize, 10)
              },
              sorters: this.getSorters()
            };

            return this.read(queryValues).then(function (result) {
              _this.data = result.data;
              _this.count = result.count;
              _this.updatePager();

              return _this.data;
            });
          }
        }]);

        return RemoteStore;
      })(BaseStore);

      _export('RemoteStore', RemoteStore);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvcmVtb3RlLXN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQkFFYSxXQUFXOzs7Ozs7Ozs7Ozs7NkJBRmhCLFNBQVM7OztBQUVKLGlCQUFXO2tCQUFYLFdBQVc7O0FBQ1gsaUJBREEsV0FBVyxDQUNWLElBQUksRUFBRSxRQUFRLEVBQUU7Z0NBRGpCLFdBQVc7O0FBRXBCLHFDQUZTLFdBQVcsNkNBRWQsUUFBUSxFQUFFOztBQUVoQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUM5QixrQkFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1dBQ3RHO1NBQ0Y7O3FCQVJVLFdBQVc7O2lCQVVPLHlDQUFHO0FBQzlCLGdCQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsaUJBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzRCxrQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLGtCQUFJLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3QyxrQkFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUU7QUFDbkMsdUJBQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztlQUNqQzthQUNGOztBQUVELG1CQUFPLE9BQU8sQ0FBQztXQUNoQjs7O2lCQUVlLDRCQUFHO0FBQ2pCLGdCQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsaUJBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzRCxrQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLHFCQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzthQUNoRDs7QUFFRCxtQkFBTyxPQUFPLENBQUM7V0FDaEI7OztpQkFFUyxzQkFBRztBQUNYLG1CQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDNUMscUJBQU87QUFDTCxvQkFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO0FBQ2pCLHFCQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7ZUFDcEIsQ0FBQzthQUNILENBQUMsQ0FBQztXQUNKOzs7aUJBRU0sbUJBQUc7OztBQUNSLGdCQUFNLFdBQVcsR0FBRztBQUNsQixxQkFBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUNoQyxvQkFBTSxFQUFFO0FBQ04sb0JBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNmLHFCQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztlQUN4QztBQUNELHFCQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTthQUMzQixDQUFDOztBQUVGLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzNDLG9CQUFLLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3hCLG9CQUFLLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQzFCLG9CQUFLLFdBQVcsRUFBRSxDQUFDOztBQUVuQixxQkFBUSxNQUFLLElBQUksQ0FBRTthQUNwQixDQUFDLENBQUM7V0FDSjs7O2VBM0RVLFdBQVc7U0FBUyxTQUFTIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvcmVtb3RlLXN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlU3RvcmV9IGZyb20gJy4vYmFzZS1zdG9yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVtb3RlU3RvcmUgZXh0ZW5kcyBCYXNlU3RvcmUge1xyXG4gIGNvbnN0cnVjdG9yKHJlYWQsIHNldHRpbmdzKSB7XHJcbiAgICBzdXBlcihzZXR0aW5ncyk7XHJcblxyXG4gICAgdGhpcy5yZWFkID0gcmVhZDtcclxuICAgIGlmICh0eXBlb2YgcmVhZCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IEV4Y2VwdGlvbjogXCJyZWFkXCIgbXVzdCBiZSBhIGZ1bmN0aW9uIGZvciBsb2FkaW5nIGRhdGEgcmV0dXJuaW5nIHByb21pc2UhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJzVmFsdWVzQXNRdWVyeVN0cmluZygpIHtcclxuICAgIHZhciBmaWx0ZXJzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jb2x1bW5EZWZpbml0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBsZXQgY29sID0gdGhpcy5jb2x1bW5EZWZpbml0aW9uc1tpXTtcclxuICAgICAgbGV0IGZpbHRlclF1ZXJ5U3RyaW5nID0gY29sLmdldFF1ZXJ5U3RyaW5nKCk7XHJcbiAgICAgIGlmIChmaWx0ZXJRdWVyeVN0cmluZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZmlsdGVycy5wdXNoKGZpbHRlclF1ZXJ5U3RyaW5nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyc1ZhbHVlcygpIHtcclxuICAgIGxldCBmaWx0ZXJzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jb2x1bW5EZWZpbml0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBsZXQgY29sID0gdGhpcy5jb2x1bW5EZWZpbml0aW9uc1tpXTtcclxuICAgICAgZmlsdGVycyA9IGZpbHRlcnMuY29uY2F0KGNvbC5nZXRGaWx0ZXJWYWx1ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVycztcclxuICB9XHJcblxyXG4gIGdldFNvcnRlcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3J0UHJvY2Vzc2luZ09yZGVyLm1hcChzb3J0ZXIgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IHNvcnRlci5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiBzb3J0ZXIudmFsdWVcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5VmFsdWVzID0ge1xyXG4gICAgICBmaWx0ZXJzOiB0aGlzLmdldEZpbHRlcnNWYWx1ZXMoKSxcclxuICAgICAgcGFnaW5nOiB7XHJcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxyXG4gICAgICAgIGNvdW50OiB3aW5kb3cuTnVtYmVyKHRoaXMucGFnZVNpemUsIDEwKVxyXG4gICAgICB9LFxyXG4gICAgICBzb3J0ZXJzOiB0aGlzLmdldFNvcnRlcnMoKVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZWFkKHF1ZXJ5VmFsdWVzKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICB0aGlzLmNvdW50ID0gcmVzdWx0LmNvdW50O1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhZ2VyKCk7XHJcblxyXG4gICAgICByZXR1cm4gKHRoaXMuZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
