System.register([], function (_export) {
  'use strict';

  var BaseColumn;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      BaseColumn = (function () {
        function BaseColumn(config, template, grid, columnId) {
          _classCallCheck(this, BaseColumn);

          this.specialColumns = {
            heading: true,
            nosort: true,
            filter: true,
            grid: true
          };

          this._subscriptions = [];
          this.config = config;
          this.template = template;
          this.field = config.field;
          this.grid = grid;
          this.id = columnId;

          this.heading = config.heading;
          if (this.heading === undefined) {
            var viewModelPropertyName = config['heading.bind'];
            if (viewModelPropertyName !== undefined) {
              this.heading = this.subscribe(viewModelPropertyName, 'heading');
            } else {
              this.heading = '';
            }
          }

          this.sort = config.nosort === undefined;
          this.filter = config.filter || false;

          if (!this.field && (this.sort || this.filter)) {
            throw new Error('field is required');
          }

          this.filterValue = config['filter-value'] || '';
        }

        _createClass(BaseColumn, [{
          key: 'hasFilter',
          value: function hasFilter() {
            return this.filter;
          }
        }, {
          key: 'hasFilterValue',
          value: function hasFilterValue() {
            throw new Error('Unimplemented method!');
          }
        }, {
          key: 'matchFilter',
          value: function matchFilter(filteredValue) {
            throw new Error('Unimplemented method!');
          }
        }, {
          key: 'getFilterValue',
          value: function getFilterValue() {
            throw new Error('Unimplemented method!');
          }
        }, {
          key: 'compare',
          value: function compare(first, second) {
            throw new Error('Unimplemented method!');
          }
        }, {
          key: 'createDOMElement',
          value: function createDOMElement() {
            var td = document.createElement('td');
            td.innerHTML = this.template;

            for (var prop in this.config) {
              if (this.config.hasOwnProperty(prop) && this.specialColumns[prop] === undefined) {
                td.setAttribute(prop, this.config[prop]);
              }
            }

            return td;
          }
        }, {
          key: 'getFieldName',
          value: function getFieldName() {
            return this.field;
          }
        }, {
          key: 'changeDirectionSort',
          value: function changeDirectionSort() {
            switch (this.sortDirection) {
              case 'asc':
                this.sortDirection = 'desc';
                break;
              case 'desc':
                this.sortDirection = undefined;
                break;
              default:
                this.sortDirection = 'asc';
                break;
            }

            this.grid.changeSort({
              name: this.field,
              value: this.sortDirection,
              column: this
            });
          }
        }, {
          key: 'setSortDirection',
          value: function setSortDirection(sortDirection) {
            this.sortDirection = sortDirection;
            var sort = {
              name: this.field,
              value: this.sortDirection,
              column: this
            };

            return sort;
          }
        }, {
          key: 'isSortDirectionDesc',
          value: function isSortDirectionDesc() {
            return this.sortDirection === 'desc';
          }
        }, {
          key: 'updateFilter',
          value: function updateFilter() {
            this.grid.updateFilters();
          }
        }, {
          key: '_updateViewModelOnPropertyChange',
          value: function _updateViewModelOnPropertyChange(viewModel, viewModelPropertyName, columnPropertyName) {
            var viewModelPropertyNameTokens = viewModelPropertyName.split('.');
            var subscription = undefined;
            if (viewModelPropertyNameTokens.length > 1) {
              subscription = this.grid.bindingEngine.propertyObserver(this, columnPropertyName).subscribe(function (newValue, oldValue) {
                var obj = viewModel;
                var i = undefined;
                for (i = 0; i < viewModelPropertyNameTokens.length - 1; i += 1) {
                  obj = obj[viewModelPropertyNameTokens[i]];
                }

                obj[viewModelPropertyNameTokens[i]] = newValue;
              });
            } else {
              subscription = this.grid.bindingEngine.propertyObserver(this, columnPropertyName).subscribe(function (newValue, oldValue) {
                viewModel[viewModelPropertyName] = newValue;
              });
            }

            this._subscriptions.push(subscription);
          }
        }, {
          key: 'subscribe',
          value: function subscribe(viewModelPropertyName, columnPropertyName) {
            var _this = this;

            if (viewModelPropertyName === undefined) {
              throw new Error('Argument exception! Argument "viewModelProperty" can\'t be empty!');
            }

            var viewModel = this.grid.parent;
            var viewModelPropertyNameTokens = viewModelPropertyName.split('.');
            var subscription = undefined,
                value = undefined;
            if (viewModelPropertyNameTokens.length > 1) {
              value = viewModelPropertyNameTokens.reduce(function (obj, token) {
                return obj = obj[token];
              }, viewModel);

              subscription = this.grid.bindingEngine.expressionObserver(viewModel, viewModelPropertyName).subscribe(function (newValue, oldValue) {
                _this.setColumnProperty(columnPropertyName, newValue);
              });
            } else {
              value = viewModel[viewModelPropertyName];
              subscription = this.grid.bindingEngine.propertyObserver(viewModel, viewModelPropertyName).subscribe(function (newValue, oldValue) {
                _this.setColumnProperty(columnPropertyName, newValue);
              });
            }

            this._subscriptions.push(subscription);
            this._updateViewModelOnPropertyChange(viewModel, viewModelPropertyName, columnPropertyName);

            return value;
          }
        }, {
          key: 'setColumnProperty',
          value: function setColumnProperty(columnPropertyName, newValue) {
            this[columnPropertyName] = newValue;
            this.updateFilter();
          }
        }, {
          key: 'unsubscribe',
          value: function unsubscribe() {
            this._subscriptions.forEach(function (s) {
              return s.dispose();
            });
          }
        }]);

        return BaseColumn;
      })();

      _export('BaseColumn', BaseColumn);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2Jhc2UtY29sdW1uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLFVBQVU7Ozs7Ozs7OztBQUFWLGdCQUFVO0FBUVYsaUJBUkEsVUFBVSxDQVFULE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQ0FSbkMsVUFBVTs7ZUFDckIsY0FBYyxHQUFHO0FBQ2YsbUJBQU8sRUFBRSxJQUFJO0FBQ2Isa0JBQU0sRUFBRSxJQUFJO0FBQ1osa0JBQU0sRUFBRSxJQUFJO0FBQ1osZ0JBQUksRUFBRSxJQUFJO1dBQ1g7O0FBR0MsY0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsY0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQzFCLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDOztBQUVuQixjQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDOUIsY0FBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUM5QixnQkFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckQsZ0JBQUkscUJBQXFCLEtBQUssU0FBUyxFQUFFO0FBQ3ZDLGtCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDakUsTUFBTTtBQUNMLGtCQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNuQjtXQUNGOztBQUVELGNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDeEMsY0FB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QUM7O0FBRTVGLG1CQUFPLEtBQUssQ0FBQztXQUNkOzs7aUJBRWdCLDJCQUFDLGtCQUFrQixFQUFFLFFBQVEsRUFBRTtBQUM5QyxnQkFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQ3BDLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7V0FDckI7OztpQkFFVSx1QkFBRztBQUNaLGdCQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7cUJBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTthQUFBLENBQUMsQ0FBQztXQUMvQzs7O2VBakxVLFVBQVUiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvZ3JpZC9jb2x1bW4vYmFzZS1jb2x1bW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmFzZUNvbHVtbiB7XHJcbiAgc3BlY2lhbENvbHVtbnMgPSB7XHJcbiAgICBoZWFkaW5nOiB0cnVlLFxyXG4gICAgbm9zb3J0OiB0cnVlLFxyXG4gICAgZmlsdGVyOiB0cnVlLFxyXG4gICAgZ3JpZDogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgdGVtcGxhdGUsIGdyaWQsIGNvbHVtbklkKSB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XHJcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIHRoaXMuZmllbGQgPSBjb25maWcuZmllbGQ7XHJcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5pZCA9IGNvbHVtbklkO1xyXG5cclxuICAgIHRoaXMuaGVhZGluZyA9IGNvbmZpZy5oZWFkaW5nO1xyXG4gICAgaWYgKHRoaXMuaGVhZGluZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHZpZXdNb2RlbFByb3BlcnR5TmFtZSA9IGNvbmZpZ1snaGVhZGluZy5iaW5kJ107XHJcbiAgICAgIGlmICh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGluZyA9IHRoaXMuc3Vic2NyaWJlKHZpZXdNb2RlbFByb3BlcnR5TmFtZSwgJ2hlYWRpbmcnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhlYWRpbmcgPSAnJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ydCA9IGNvbmZpZy5ub3NvcnQgPT09IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZmlsdGVyID0gY29uZmlnLmZpbHRlciB8fCBmYWxzZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZmllbGQgJiYgKHRoaXMuc29ydCB8fCB0aGlzLmZpbHRlcikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWVsZCBpcyByZXF1aXJlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBjb25maWdbJ2ZpbHRlci12YWx1ZSddIHx8ICcnO1xyXG4gIH1cclxuXHJcbiAgaGFzRmlsdGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgaGFzRmlsdGVyVmFsdWUoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuaW1wbGVtZW50ZWQgbWV0aG9kIScpO1xyXG4gIH1cclxuXHJcbiAgbWF0Y2hGaWx0ZXIoZmlsdGVyZWRWYWx1ZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkIG1ldGhvZCEnKTtcclxuICB9XHJcblxyXG4gIGdldEZpbHRlclZhbHVlKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkIG1ldGhvZCEnKTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmUoZmlyc3QsIHNlY29uZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkIG1ldGhvZCEnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURPTUVsZW1lbnQoKSB7XHJcbiAgICBsZXQgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgdGQuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZTtcclxuXHJcbiAgICAvLyBTZXQgYXR0cmlidXRlc1xyXG4gICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdGhpcy5zcGVjaWFsQ29sdW1uc1twcm9wXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGQuc2V0QXR0cmlidXRlKHByb3AsIHRoaXMuY29uZmlnW3Byb3BdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZDtcclxuICB9XHJcblxyXG4gIGdldEZpZWxkTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpZWxkO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlRGlyZWN0aW9uU29ydCgpIHtcclxuICAgIHN3aXRjaCAodGhpcy5zb3J0RGlyZWN0aW9uKSB7XHJcbiAgICBjYXNlICdhc2MnOlxyXG4gICAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSAnZGVzYyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZGVzYyc6XHJcbiAgICAgIHRoaXMuc29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSAnYXNjJztcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkLmNoYW5nZVNvcnQoe1xyXG4gICAgICBuYW1lOiB0aGlzLmZpZWxkLFxyXG4gICAgICB2YWx1ZTogdGhpcy5zb3J0RGlyZWN0aW9uLFxyXG4gICAgICBjb2x1bW46IHRoaXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0U29ydERpcmVjdGlvbihzb3J0RGlyZWN0aW9uKSB7XHJcbiAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSBzb3J0RGlyZWN0aW9uO1xyXG4gICAgbGV0IHNvcnQgPSB7XHJcbiAgICAgIG5hbWU6IHRoaXMuZmllbGQsXHJcbiAgICAgIHZhbHVlOiB0aGlzLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgIGNvbHVtbjogdGhpc1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gc29ydDtcclxuICB9XHJcblxyXG4gIGlzU29ydERpcmVjdGlvbkRlc2MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3J0RGlyZWN0aW9uID09PSAnZGVzYyc7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXIoKSB7XHJcbiAgICB0aGlzLmdyaWQudXBkYXRlRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgX3VwZGF0ZVZpZXdNb2RlbE9uUHJvcGVydHlDaGFuZ2Uodmlld01vZGVsLCB2aWV3TW9kZWxQcm9wZXJ0eU5hbWUsIGNvbHVtblByb3BlcnR5TmFtZSkge1xyXG4gICAgY29uc3Qgdmlld01vZGVsUHJvcGVydHlOYW1lVG9rZW5zID0gdmlld01vZGVsUHJvcGVydHlOYW1lLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgc3Vic2NyaXB0aW9uO1xyXG4gICAgaWYgKHZpZXdNb2RlbFByb3BlcnR5TmFtZVRva2Vucy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuZ3JpZC5iaW5kaW5nRW5naW5lXHJcbiAgICAgICAgLnByb3BlcnR5T2JzZXJ2ZXIodGhpcywgY29sdW1uUHJvcGVydHlOYW1lKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IG9iaiA9IHZpZXdNb2RlbDtcclxuICAgICAgICAgIGxldCBpO1xyXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZpZXdNb2RlbFByb3BlcnR5TmFtZVRva2Vucy5sZW5ndGggLSAxOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgb2JqID0gb2JqW3ZpZXdNb2RlbFByb3BlcnR5TmFtZVRva2Vuc1tpXV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb2JqW3ZpZXdNb2RlbFByb3BlcnR5TmFtZVRva2Vuc1tpXV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuZ3JpZC5iaW5kaW5nRW5naW5lXHJcbiAgICAgICAgLnByb3BlcnR5T2JzZXJ2ZXIodGhpcywgY29sdW1uUHJvcGVydHlOYW1lKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdmlld01vZGVsW3ZpZXdNb2RlbFByb3BlcnR5TmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZSh2aWV3TW9kZWxQcm9wZXJ0eU5hbWUsIGNvbHVtblByb3BlcnR5TmFtZSkge1xyXG4gICAgaWYgKHZpZXdNb2RlbFByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgZXhjZXB0aW9uISBBcmd1bWVudCBcInZpZXdNb2RlbFByb3BlcnR5XCIgY2FuXFwndCBiZSBlbXB0eSEnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3TW9kZWwgPSB0aGlzLmdyaWQucGFyZW50O1xyXG4gICAgY29uc3Qgdmlld01vZGVsUHJvcGVydHlOYW1lVG9rZW5zID0gdmlld01vZGVsUHJvcGVydHlOYW1lLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgc3Vic2NyaXB0aW9uLCB2YWx1ZTtcclxuICAgIGlmICh2aWV3TW9kZWxQcm9wZXJ0eU5hbWVUb2tlbnMubGVuZ3RoID4gMSkge1xyXG4gICAgICB2YWx1ZSA9IHZpZXdNb2RlbFByb3BlcnR5TmFtZVRva2Vucy5yZWR1Y2UoKG9iaiwgdG9rZW4pID0+IG9iaiA9IG9ialt0b2tlbl0sIHZpZXdNb2RlbCk7XHJcblxyXG4gICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLmdyaWQuYmluZGluZ0VuZ2luZVxyXG4gICAgICAgIC5leHByZXNzaW9uT2JzZXJ2ZXIodmlld01vZGVsLCB2aWV3TW9kZWxQcm9wZXJ0eU5hbWUpXHJcbiAgICAgICAgLnN1YnNjcmliZSgobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNldENvbHVtblByb3BlcnR5KGNvbHVtblByb3BlcnR5TmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2aWV3TW9kZWxbdmlld01vZGVsUHJvcGVydHlOYW1lXTtcclxuICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5ncmlkLmJpbmRpbmdFbmdpbmVcclxuICAgICAgICAucHJvcGVydHlPYnNlcnZlcih2aWV3TW9kZWwsIHZpZXdNb2RlbFByb3BlcnR5TmFtZSlcclxuICAgICAgICAuc3Vic2NyaWJlKChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2V0Q29sdW1uUHJvcGVydHkoY29sdW1uUHJvcGVydHlOYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XHJcbiAgICB0aGlzLl91cGRhdGVWaWV3TW9kZWxPblByb3BlcnR5Q2hhbmdlKHZpZXdNb2RlbCwgdmlld01vZGVsUHJvcGVydHlOYW1lLCBjb2x1bW5Qcm9wZXJ0eU5hbWUpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldENvbHVtblByb3BlcnR5KGNvbHVtblByb3BlcnR5TmFtZSwgbmV3VmFsdWUpIHtcclxuICAgIHRoaXNbY29sdW1uUHJvcGVydHlOYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy5kaXNwb3NlKCkpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
