System.register(['./local-store', './remote-store'], function (_export) {
  'use strict';

  var LocalStore, RemoteStore, StoreManager;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_localStore) {
      LocalStore = _localStore.LocalStore;
    }, function (_remoteStore) {
      RemoteStore = _remoteStore.RemoteStore;
    }],
    execute: function () {
      StoreManager = (function () {
        function StoreManager(grid) {
          _classCallCheck(this, StoreManager);

          this.dataStore = this._getDataStore(grid);
        }

        _createClass(StoreManager, [{
          key: 'getDataStore',
          value: function getDataStore() {
            return this.dataStore;
          }
        }, {
          key: '_subscribeToDataCollectionChanges',
          value: function _subscribeToDataCollectionChanges(grid) {
            this.dataCollectionSubscription = grid.bindingEngine.collectionObserver(grid.data).subscribe(function (collectionChangeInfo) {
              grid.refresh();
            });
          }
        }, {
          key: '_getDataStore',
          value: function _getDataStore(grid) {
            var _this = this;

            var settings = {
              sortable: grid.sortable,
              filterable: grid.filterable,
              columnDefinitions: grid.columns,
              pageable: grid.pageable,
              pageSize: grid.pageSize,
              page: grid.page
            };
            var dataStore = undefined;
            if (grid.data !== null) {
              dataStore = new LocalStore(grid.data, settings);

              this._subscribeToDataCollectionChanges(grid);
              this.dataPropertySubscription = grid.bindingEngine.propertyObserver(grid, 'data').subscribe(function (newItems, oldItems) {
                _this.dataCollectionSubscription.dispose();
                _this._subscribeToDataCollectionChanges(grid);
                dataStore.refresh(newItems);
                grid.refresh();
              });
            } else {
              dataStore = new RemoteStore(grid.read, settings);
            }

            return dataStore;
          }
        }, {
          key: 'unsubscribe',
          value: function unsubscribe() {
            if (this.dataPropertySubscription !== undefined) {
              this.dataPropertySubscription.dispose();
            }

            if (this.dataCollectionSubscription !== undefined) {
              this.dataCollectionSubscription.dispose();
            }
          }
        }]);

        return StoreManager;
      })();

      _export('StoreManager', StoreManager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvc3RvcmUvc3RvcmUtbWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7K0JBR2EsWUFBWTs7Ozs7Ozs7K0JBSGpCLFVBQVU7O2lDQUNWLFdBQVc7OztBQUVOLGtCQUFZO0FBQ1osaUJBREEsWUFBWSxDQUNYLElBQUksRUFBRTtnQ0FEUCxZQUFZOztBQUdyQixjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7O3FCQUpVLFlBQVk7O2lCQU1YLHdCQUFHO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztXQUN2Qjs7O2lCQUVnQywyQ0FBQyxJQUFJLEVBQUU7QUFDdEMsZ0JBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUNqRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzdCLFNBQVMsQ0FBQyxVQUFBLG9CQUFvQixFQUFJO0FBQ2pDLGtCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEIsQ0FBQyxDQUFDO1dBQ047OztpQkFFWSx1QkFBQyxJQUFJLEVBQUU7OztBQUNsQixnQkFBTSxRQUFRLEdBQUc7QUFDZixzQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLHdCQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7QUFDM0IsK0JBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDL0Isc0JBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtBQUN2QixzQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLGtCQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEIsQ0FBQztBQUNGLGdCQUFJLFNBQVMsWUFBQSxDQUFDO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDdEIsdUJBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxrQkFBSSxDQUFDLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLGtCQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDL0MsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUM5QixTQUFTLENBQUMsVUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFLO0FBQ2pDLHNCQUFLLDBCQUEwQixDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFDLHNCQUFLLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLHlCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLG9CQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7ZUFDaEIsQ0FBQyxDQUFDO2FBQ04sTUFBTTtBQUNMLHVCQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNsRDs7QUFFRCxtQkFBTyxTQUFTLENBQUM7V0FDbEI7OztpQkFFVSx1QkFBRztBQUNaLGdCQUFJLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7QUFDL0Msa0JBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6Qzs7QUFFRCxnQkFBSSxJQUFJLENBQUMsMEJBQTBCLEtBQUssU0FBUyxFQUFFO0FBQ2pELGtCQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDM0M7V0FDRjs7O2VBdkRVLFlBQVkiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvZ3JpZC9zdG9yZS9zdG9yZS1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhbFN0b3JlfSBmcm9tICcuL2xvY2FsLXN0b3JlJztcclxuaW1wb3J0IHtSZW1vdGVTdG9yZX0gZnJvbSAnLi9yZW1vdGUtc3RvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JlTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZ3JpZCkge1xyXG4gICAgLy90aGlzLmdyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5kYXRhU3RvcmUgPSB0aGlzLl9nZXREYXRhU3RvcmUoZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRhU3RvcmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhU3RvcmU7XHJcbiAgfVxyXG5cclxuICBfc3Vic2NyaWJlVG9EYXRhQ29sbGVjdGlvbkNoYW5nZXMoZ3JpZCkge1xyXG4gICAgdGhpcy5kYXRhQ29sbGVjdGlvblN1YnNjcmlwdGlvbiA9IGdyaWQuYmluZGluZ0VuZ2luZVxyXG4gICAgICAuY29sbGVjdGlvbk9ic2VydmVyKGdyaWQuZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShjb2xsZWN0aW9uQ2hhbmdlSW5mbyA9PiB7XHJcbiAgICAgICAgZ3JpZC5yZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2dldERhdGFTdG9yZShncmlkKSB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgc29ydGFibGU6IGdyaWQuc29ydGFibGUsXHJcbiAgICAgIGZpbHRlcmFibGU6IGdyaWQuZmlsdGVyYWJsZSxcclxuICAgICAgY29sdW1uRGVmaW5pdGlvbnM6IGdyaWQuY29sdW1ucyxcclxuICAgICAgcGFnZWFibGU6IGdyaWQucGFnZWFibGUsXHJcbiAgICAgIHBhZ2VTaXplOiBncmlkLnBhZ2VTaXplLFxyXG4gICAgICBwYWdlOiBncmlkLnBhZ2VcclxuICAgIH07XHJcbiAgICBsZXQgZGF0YVN0b3JlO1xyXG4gICAgaWYgKGdyaWQuZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICBkYXRhU3RvcmUgPSBuZXcgTG9jYWxTdG9yZShncmlkLmRhdGEsIHNldHRpbmdzKTtcclxuICAgICAgLy8gdG9kbzogdW5zdWJzY3JpYmUhISEhXHJcbiAgICAgIHRoaXMuX3N1YnNjcmliZVRvRGF0YUNvbGxlY3Rpb25DaGFuZ2VzKGdyaWQpO1xyXG4gICAgICB0aGlzLmRhdGFQcm9wZXJ0eVN1YnNjcmlwdGlvbiA9IGdyaWQuYmluZGluZ0VuZ2luZVxyXG4gICAgICAgIC5wcm9wZXJ0eU9ic2VydmVyKGdyaWQsICdkYXRhJylcclxuICAgICAgICAuc3Vic2NyaWJlKChuZXdJdGVtcywgb2xkSXRlbXMpID0+IHtcclxuICAgICAgICAgIHRoaXMuZGF0YUNvbGxlY3Rpb25TdWJzY3JpcHRpb24uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgdGhpcy5fc3Vic2NyaWJlVG9EYXRhQ29sbGVjdGlvbkNoYW5nZXMoZ3JpZCk7XHJcbiAgICAgICAgICBkYXRhU3RvcmUucmVmcmVzaChuZXdJdGVtcyk7XHJcbiAgICAgICAgICBncmlkLnJlZnJlc2goKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFTdG9yZSA9IG5ldyBSZW1vdGVTdG9yZShncmlkLnJlYWQsIHNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YVN0b3JlO1xyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmUoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhUHJvcGVydHlTdWJzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRhdGFQcm9wZXJ0eVN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YUNvbGxlY3Rpb25TdWJzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRhdGFDb2xsZWN0aW9uU3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
