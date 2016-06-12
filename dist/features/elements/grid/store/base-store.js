System.register([], function (_export) {
  'use strict';

  var BaseStore;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      BaseStore = (function () {
        function BaseStore(settings) {
          _classCallCheck(this, BaseStore);

          this.sortProcessingOrder = [];

          this.sortable = settings.sortable;
          this.filterable = settings.filterable;
          this.columnDefinitions = settings.columnDefinitions;
          this.pageable = settings.pageable;
          this.pageSize = settings.pageSize;
          this.page = settings.page;
          this.firstVisibleItem = 0;
          this.lastVisibleItem = 0;

          if (this.columnDefinitions === undefined) {
            throw new Error('Argument Exception: "columnDefinitions" setting must be deffined!');
          }
        }

        _createClass(BaseStore, [{
          key: 'refresh',
          value: function refresh() {
            throw new Error('Not implemented method!');
          }
        }, {
          key: 'getData',
          value: function getData() {
            throw new Error('Not implemented method!');
          }
        }, {
          key: 'isFilterable',
          value: function isFilterable() {
            return this.filterable;
          }
        }, {
          key: 'isSortable',
          value: function isSortable() {
            return this.sortable;
          }
        }, {
          key: 'isPageable',
          value: function isPageable() {
            return this.pageable;
          }
        }, {
          key: 'setPage',
          value: function setPage(page) {
            this.page = page;
          }
        }, {
          key: 'setPageSize',
          value: function setPageSize(pageSize) {
            this.pageSize = pageSize;
          }
        }, {
          key: 'updatePager',
          value: function updatePager() {
            if (this.pager) {
              this.pager.update(this.page, Number(this.pageSize), this.count);
            }

            this.firstVisibleItem = (this.page - 1) * Number(this.pageSize) + 1;
            this.lastVisibleItem = Math.min(this.page * Number(this.pageSize), this.count);
          }
        }, {
          key: 'setPager',
          value: function setPager(pager) {
            this.pager = pager;
            this.updatePager();
          }
        }, {
          key: 'changeSortProcessingOrder',
          value: function changeSortProcessingOrder(sort) {
            var index = this.sortProcessingOrder.findIndex(function (el, index) {
              if (el.column === sort.column) {
                return true;
              }

              return false;
            });

            if (index > -1) {
              this.sortProcessingOrder.splice(index, 1);
            }

            if (sort.value !== undefined) {
              this.sortProcessingOrder.push(sort);
            }

            return this.sortProcessingOrder;
          }
        }, {
          key: 'applySortOptions',
          value: function applySortOptions(sorts) {
            var _this = this;

            this.sortProcessingOrder = [];
            sorts.forEach(function (sort) {
              return _this.changeSortProcessingOrder(sort);
            });
          }
        }]);

        return BaseStore;
      })();

      _export('BaseStore', BaseStore);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvYmFzZS1zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFBYSxTQUFTOzs7Ozs7Ozs7QUFBVCxlQUFTO0FBR1QsaUJBSEEsU0FBUyxDQUdSLFFBQVEsRUFBRTtnQ0FIWCxTQUFTOztlQUNwQixtQkFBbUIsR0FBRyxFQUFFOztBQUd0QixjQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDbEMsY0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0FBQ3RDLGNBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7QUFDcEQsY0FBSSxDQUFDLFFBQVEsR0FBSSxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ25DLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUNsQyxjQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDMUIsY0FBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUMxQixjQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQzs7QUFHekIsY0FBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxFQUFFO0FBQ3hDLGtCQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7V0FDdEY7U0FDRjs7cUJBakJVLFNBQVM7O2lCQW1CYixtQkFBRztBQUNSLGtCQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7V0FDNUM7OztpQkFFTSxtQkFBRztBQUNSLGtCQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7V0FDNUM7OztpQkFFVyx3QkFBRztBQUNiLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7V0FDeEI7OztpQkFFUyxzQkFBRztBQUNYLG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7V0FDdEI7OztpQkFFUyxzQkFBRztBQUNYLG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7V0FDdEI7OztpQkFFTSxpQkFBQyxJQUFJLEVBQUU7QUFDWixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7V0FDbEI7OztpQkFFVSxxQkFBQyxRQUFRLEVBQUU7QUFDcEIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1dBQzFCOzs7aUJBRVUsdUJBQUc7QUFDWixnQkFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2Qsa0JBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakU7O0FBRUQsZ0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEUsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxBQUFDLElBQUksQ0FBQyxJQUFJLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDbEY7OztpQkFFTyxrQkFBQyxLQUFLLEVBQUU7QUFDZCxnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjs7O2lCQUd3QixtQ0FBQyxJQUFJLEVBQUU7QUFDOUIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFLO0FBQzVELGtCQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM3Qix1QkFBTyxJQUFJLENBQUM7ZUFDYjs7QUFFRCxxQkFBTyxLQUFLLENBQUM7YUFDZCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2Qsa0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzNDOztBQUVELGdCQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQzVCLGtCQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDOztBQUVELG1CQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztXQUNqQzs7O2lCQUVlLDBCQUFDLEtBQUssRUFBRTs7O0FBQ3RCLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBQzlCLGlCQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtxQkFBSSxNQUFLLHlCQUF5QixDQUFDLElBQUksQ0FBQzthQUFBLENBQUMsQ0FBQztXQUM3RDs7O2VBckZVLFNBQVMiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvZ3JpZC9zdG9yZS9iYXNlLXN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJhc2VTdG9yZSB7XHJcbiAgc29ydFByb2Nlc3NpbmdPcmRlciA9IFtdOyAvLyBSZXByZXNlbnRzIHdoaWNoIG9yZGVyIHRvIGFwcGx5IHNvcnRzIHRvIGVhY2ggY29sdW1uXHJcblxyXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XHJcbiAgICB0aGlzLnNvcnRhYmxlID0gc2V0dGluZ3Muc29ydGFibGU7XHJcbiAgICB0aGlzLmZpbHRlcmFibGUgPSBzZXR0aW5ncy5maWx0ZXJhYmxlO1xyXG4gICAgdGhpcy5jb2x1bW5EZWZpbml0aW9ucyA9IHNldHRpbmdzLmNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgdGhpcy5wYWdlYWJsZSA9ICBzZXR0aW5ncy5wYWdlYWJsZTtcclxuICAgIHRoaXMucGFnZVNpemUgPSBzZXR0aW5ncy5wYWdlU2l6ZTtcclxuICAgIHRoaXMucGFnZSA9IHNldHRpbmdzLnBhZ2U7XHJcbiAgICB0aGlzLmZpcnN0VmlzaWJsZUl0ZW0gPSAwO1xyXG4gICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW0gPSAwO1xyXG5cclxuICAgIC8vIHRvZG86IG1ha2Ugc3VyZSB0aGF0IGl0IGlzIGFycmF5IGFuZCBoYXMgcHJvcGVyIGJhc2UgY2xhc3NcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZmluaXRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBFeGNlcHRpb246IFwiY29sdW1uRGVmaW5pdGlvbnNcIiBzZXR0aW5nIG11c3QgYmUgZGVmZmluZWQhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgbWV0aG9kIScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIG1ldGhvZCEnKTtcclxuICB9XHJcblxyXG4gIGlzRmlsdGVyYWJsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlcmFibGU7XHJcbiAgfVxyXG5cclxuICBpc1NvcnRhYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc29ydGFibGU7XHJcbiAgfVxyXG5cclxuICBpc1BhZ2VhYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZWFibGU7XHJcbiAgfVxyXG5cclxuICBzZXRQYWdlKHBhZ2UpIHtcclxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbiAgfVxyXG5cclxuICBzZXRQYWdlU2l6ZShwYWdlU2l6ZSkge1xyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGFnZXIoKSB7XHJcbiAgICBpZiAodGhpcy5wYWdlcikge1xyXG4gICAgICB0aGlzLnBhZ2VyLnVwZGF0ZSh0aGlzLnBhZ2UsIE51bWJlcih0aGlzLnBhZ2VTaXplKSwgdGhpcy5jb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maXJzdFZpc2libGVJdGVtID0gKHRoaXMucGFnZSAtIDEpICogTnVtYmVyKHRoaXMucGFnZVNpemUpICsgMTtcclxuICAgIHRoaXMubGFzdFZpc2libGVJdGVtID0gTWF0aC5taW4oKHRoaXMucGFnZSkgKiBOdW1iZXIodGhpcy5wYWdlU2l6ZSksIHRoaXMuY291bnQpO1xyXG4gIH1cclxuXHJcbiAgc2V0UGFnZXIocGFnZXIpIHtcclxuICAgIHRoaXMucGFnZXIgPSBwYWdlcjtcclxuICAgIHRoaXMudXBkYXRlUGFnZXIoKTtcclxuICB9XHJcblxyXG5cclxuICBjaGFuZ2VTb3J0UHJvY2Vzc2luZ09yZGVyKHNvcnQpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuc29ydFByb2Nlc3NpbmdPcmRlci5maW5kSW5kZXgoKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY29sdW1uID09PSBzb3J0LmNvbHVtbikge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICB0aGlzLnNvcnRQcm9jZXNzaW5nT3JkZXIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc29ydC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc29ydFByb2Nlc3NpbmdPcmRlci5wdXNoKHNvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNvcnRQcm9jZXNzaW5nT3JkZXI7XHJcbiAgfVxyXG5cclxuICBhcHBseVNvcnRPcHRpb25zKHNvcnRzKSB7XHJcbiAgICB0aGlzLnNvcnRQcm9jZXNzaW5nT3JkZXIgPSBbXTtcclxuICAgIHNvcnRzLmZvckVhY2goc29ydCA9PiB0aGlzLmNoYW5nZVNvcnRQcm9jZXNzaW5nT3JkZXIoc29ydCkpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
