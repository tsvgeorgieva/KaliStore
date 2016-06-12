System.register(['aurelia-framework', './proccess-user-template', '../column/column-definition-factory', '../store/store-manager', 'utils'], function (_export) {
  'use strict';

  var customElement, TaskQueue, useView, bindable, inject, BindingEngine, processContent, TargetInstruction, ViewCompiler, ViewSlot, ViewResources, Container, bindingMode, processUserTemplate, ColumnDefinitionFactory, StoreManager, customElementHelper, Grid;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      TaskQueue = _aureliaFramework.TaskQueue;
      useView = _aureliaFramework.useView;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      BindingEngine = _aureliaFramework.BindingEngine;
      processContent = _aureliaFramework.processContent;
      TargetInstruction = _aureliaFramework.TargetInstruction;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      ViewResources = _aureliaFramework.ViewResources;
      Container = _aureliaFramework.Container;
      bindingMode = _aureliaFramework.bindingMode;
    }, function (_proccessUserTemplate) {
      processUserTemplate = _proccessUserTemplate.processUserTemplate;
    }, function (_columnColumnDefinitionFactory) {
      ColumnDefinitionFactory = _columnColumnDefinitionFactory.ColumnDefinitionFactory;
    }, function (_storeStoreManager) {
      StoreManager = _storeStoreManager.StoreManager;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Grid = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Grid, [{
          key: 'height',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'showFilters',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'filterable',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'filterDebounce',
          decorators: [bindable],
          initializer: function initializer() {
            return 500;
          },
          enumerable: true
        }, {
          key: 'sortable',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'sortOptions',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: function initializer() {
            return undefined;
          },
          enumerable: true
        }, {
          key: 'showColumnHeaders',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'columnsMetadata',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'selection',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'selectedItem',
          decorators: [bindable],
          initializer: function initializer() {
            return undefined;
          },
          enumerable: true
        }, {
          key: 'noRowsMessage',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }, {
          key: 'read',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'data',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'autoLoad',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'loadingMessage',
          decorators: [bindable],
          initializer: function initializer() {
            return 'Loading...';
          },
          enumerable: true
        }, {
          key: 'pageable',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'pageSize',
          decorators: [bindable],
          initializer: function initializer() {
            return 10;
          },
          enumerable: true
        }, {
          key: 'pagerSize',
          decorators: [bindable],
          initializer: function initializer() {
            return 10;
          },
          enumerable: true
        }, {
          key: 'page',
          decorators: [bindable],
          initializer: function initializer() {
            return 1;
          },
          enumerable: true
        }, {
          key: 'showFirstLastButtons',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'showJumpButtons',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'showPageSizeBox',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'showPagingSummary',
          decorators: [bindable],
          initializer: function initializer() {
            return true;
          },
          enumerable: true
        }, {
          key: 'pageSizes',
          decorators: [bindable],
          initializer: function initializer() {
            return [10, 25, 50];
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Grid(element, vc, vr, container, targetInstruction, bindingEngine, taskQueue) {
          _classCallCheck(this, _Grid);

          _defineDecoratedPropertyDescriptor(this, 'height', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showFilters', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'filterable', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'filterDebounce', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'sortable', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'sortOptions', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showColumnHeaders', _instanceInitializers);

          this.columnHeaders = [];
          this.columns = [];

          _defineDecoratedPropertyDescriptor(this, 'columnsMetadata', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'selection', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'selectedItem', _instanceInitializers);

          this.lastSelectedItem = undefined;
          this.isSingleSelect = true;
          this.isWithDeselect = true;

          _defineDecoratedPropertyDescriptor(this, 'noRowsMessage', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'read', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'data', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'autoLoad', _instanceInitializers);

          this.loading = false;

          _defineDecoratedPropertyDescriptor(this, 'loadingMessage', _instanceInitializers);

          this.rowData = [];

          _defineDecoratedPropertyDescriptor(this, 'pageable', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'pageSize', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'pagerSize', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'page', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showFirstLastButtons', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showJumpButtons', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showPageSizeBox', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showPagingSummary', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'pageSizes', _instanceInitializers);

          this.unbinding = false;
          this.scrollBarWidth = 16;

          this.element = element;

          this.viewCompiler = vc;
          this.viewResources = vr;
          this.container = container;
          this.bindingEngine = bindingEngine;
          this.taskQueue = taskQueue;
          var gridDefinition = targetInstruction.behaviorInstructions[0].gridDefinition;
          this.rowAttrs = gridDefinition.rowAttrs;
          this.columnDefinitionFactory = new ColumnDefinitionFactory(gridDefinition, this);
          this.pageable = gridDefinition.paginationAttrs;
        }

        _createDecoratedClass(Grid, [{
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
            var _this = this;

            this.parent = bindingContext;

            if (this.columnsMetadata === null) {
              this.columns = this.columnDefinitionFactory.create();
            } else {
              this.columns = this.columnDefinitionFactory.create(this.columnsMetadata);
            }

            this.storeManager = new StoreManager(this);

            if (this.sortOptions !== undefined) {
              (function () {
                var maxColumnId = _this.columns[_this.columns.length - 1].id;

                _this.sortOptions.forEach(function (sortOption) {
                  var isValidColumnId = sortOption.columnId >= 1 && sortOption.columnId <= maxColumnId;
                  if (isValidColumnId === false) {
                    throw new Error('Invalid column id: ' + sortOption.columnId + '. Column Id should be an integer number between 1 and ' + maxColumnId + '.');
                  }

                  var isValidSortDirection = sortOption.sortDirection === 'asc' || sortOption.sortDirection === 'desc';
                  if (isValidSortDirection === false) {
                    throw new Error('Invalid sort direction: \'' + sortOption.sortDirection + '\'. Sort direction should be one of the following: \'asc\', \'desc\' or undefined.');
                  }
                });

                var sorts = _this.sortOptions.map(function (sortOption) {
                  var column = _this.columns[sortOption.columnId - 1];
                  var sort = column.setSortDirection(sortOption.sortDirection);

                  return sort;
                });

                _this.storeManager.getDataStore().applySortOptions(sorts);
              })();
            }

            this.resizeListener = (function () {
              if (_this.height === 'auto') {
                _this.syncGridHeight();
              }

              _this.syncColumnHeadersWithColumns();
            }).bind(this);
            window.addEventListener('resize', this.resizeListener);

            var tbody = this.element.querySelector('table>tbody');
            this.viewSlot = new ViewSlot(tbody, true, this);

            var row = tbody.querySelector('tr');
            this._addRowAttributes(row);

            this.rowTemplate = document.createDocumentFragment();
            this.rowTemplate.appendChild(row);

            this._buildTemplates(bindingContext, overrideContext);

            if (this.selection !== false) {
              if (this.selection.indexOf('noDeselect') > -1) {
                this.isWithDeselect = false;
              }
              if (this.selection.indexOf('multiselect') > -1) {
                this.isSingleSelect = false;
              }
            }

            this.selectedItemChanged(this.selectedItem);
          }
        }, {
          key: 'attached',
          value: function attached() {
            this.canLoadData = true;
            this._height = this.height;
            if (this.height === 'auto') {
              this.syncGridHeight();
            }

            this.heightChanged();

            if (this.autoLoad) {
              this.refresh();
            }

            if (this.pageable === true) {
              this.storeManager.getDataStore().setPager(this.pager);
            }
          }
        }, {
          key: '_addRowAttributes',
          value: function _addRowAttributes(row) {
            row.setAttribute('repeat.for', '$item of rowData');

            for (var prop in this.rowAttrs) {
              if (this.rowAttrs.hasOwnProperty(prop)) {
                row.setAttribute(prop, this.rowAttrs[prop]);
              }
            }
          }
        }, {
          key: '_buildTemplates',
          value: function _buildTemplates(bindingContext, overrideContext) {
            var _this2 = this;

            var rowTemplate = this.rowTemplate.cloneNode(true);
            var row = rowTemplate.querySelector('tr');

            this.columns.map(function (c) {
              return c.createDOMElement();
            }).forEach(row.appendChild.bind(row));

            var overrideBindingContext = {
              bindingContext: this,
              parentOverrideContext: {
                bindingContext: bindingContext,
                parentOverrideContext: overrideContext
              }
            };

            var view = this.viewCompiler.compile(rowTemplate, this.viewResources).create(this.container);
            view.bind(this, overrideBindingContext);

            var removeResponse = this.viewSlot.removeAll();
            if (removeResponse instanceof Promise) {
              removeResponse.then(function () {
                return _this2.viewSlot.add(view);
              });
            }

            this.viewSlot.add(view);
            this.viewSlot.attached();

            this.noRowsMessageChanged();
          }
        }, {
          key: 'unbind',
          value: function unbind() {
            this.unbinding = true;
            window.removeEventListener('resize', this.resizeListener);
            this.columns.forEach(function (c) {
              return c.unsubscribe();
            });
            this.storeManager.unsubscribe();
          }
        }, {
          key: 'call',
          value: function call(funcName) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
              params[_key2 - 1] = arguments[_key2];
            }

            this.parent[funcName].apply(this.parent, params);
          }
        }, {
          key: 'changeSort',
          value: function changeSort(sort) {
            var sortOrder = this.storeManager.getDataStore().changeSortProcessingOrder(sort);
            this.sortOptions = sortOrder.map(function (sort) {
              var sortOption = {
                columnId: sort.column.id,
                sortDirection: sort.value
              };
              return sortOption;
            });

            this.refresh();
          }
        }, {
          key: 'debounce',
          value: function debounce(func, wait) {
            var timeout;

            return function () {
              var context = this,
                  args = arguments;

              var later = function later() {
                timeout = null;
                func.apply(context, args);
              };

              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
            };
          }
        }, {
          key: 'updateFilters',
          value: function updateFilters() {
            if (!this.debouncedUpdateFilters) {
              this.debouncedUpdateFilters = this.debounce(this.refresh, this.filterDebounce || 100);
            }

            this.debouncedUpdateFilters();
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            var _this3 = this;

            if (this.canLoadData === true) {
              this.loading = true;
              this.storeManager.getDataStore().getData().then(function (data) {
                _this3.rowData = data;
                _this3.loading = false;

                _this3.taskQueue.queueTask(function () {
                  return _this3.syncColumnHeadersWithColumns();
                });
              });
            }
          }
        }, {
          key: 'checkData',
          value: function checkData(data) {
            var _this4 = this;

            data.forEach(function (d) {
              _this4.columns.forEach(function (c) {
                var propName = c.getFieldName();
                if (d[propName] === undefined) {
                  console.error(d, c);
                  throw new Error('Data must have property named: ' + propName);
                }
              });
            });
          }
        }, {
          key: 'rowClicked',
          value: function rowClicked($item) {
            if (this.selection !== false) {
              if ($item._selected === true && this.isWithDeselect) {
                this.deselectRow($item);
              } else {
                this.selectRow($item);
              }
            }
          }
        }, {
          key: 'selectRow',
          value: function selectRow($item, noEventNeeded) {
            if (!$item.id) {
              return;
            }

            if ($item === this.lastSelectedItem && !this.isWithDeselect) {
              return;
            }

            if (this.isSingleSelect && this.lastSelectedItem !== undefined) {
              this.deselectRow(this.lastSelectedItem, noEventNeeded);
            }

            $item._selected = true;
            this.lastSelectedItem = $item;

            if (noEventNeeded !== true) {
              customElementHelper.dispatchEvent(this.element, 'select-grid-row', {
                $item: $item
              });
            }
          }
        }, {
          key: 'deselectRow',
          value: function deselectRow($item, noEventNeeded) {
            if (!$item.id) {
              return;
            }

            $item._selected = false;

            if (noEventNeeded !== true && this.isWithDeselect) {
              customElementHelper.dispatchEvent(this.element, 'deselect-grid-row', {
                $item: $item
              });
            }
          }
        }, {
          key: 'selectedItemChanged',
          value: function selectedItemChanged(newValue, oldValue) {
            var _this5 = this;

            if (newValue === oldValue) {
              return;
            }

            if (newValue && newValue.id) {
              if (newValue !== this.lastSelectedItem) {
                this.selectRow(newValue, true);

                this.taskQueue.queueMicroTask((function () {
                  var row = _this5.element.querySelector('tr.table-info');
                  if (row !== null) {
                    row.scrollIntoView();
                  }
                }).bind(this));
              } else {}
            } else {
                if (this.lastSelectedItem !== undefined) {
                  this.deselectRow(this.lastSelectedItem, true);
                }
              }
          }
        }, {
          key: 'pageChanged',
          value: function pageChanged(page, oldValue) {
            if (page !== oldValue) {
              this.page = Number(page);
              this.storeManager.getDataStore().setPage(page);
              this.refresh();
            }
          }
        }, {
          key: 'pageSizeChanged',
          value: function pageSizeChanged(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.storeManager.getDataStore().setPageSize(newValue);
              this.pageChanged(1);
            }
          }
        }, {
          key: 'noRowsMessageChanged',
          value: function noRowsMessageChanged() {
            this.showNoRowsMessage = this.noRowsMessage !== '';
          }
        }, {
          key: 'heightChanged',
          value: function heightChanged() {
            var cont = this.element.querySelector('.grid-content-container');

            if (this.height === 'auto' || window.isNaN(window.Number(this._height)) === false) {
              cont.setAttribute('style', 'height: ' + this._height + 'px');
            } else {
              cont.removeAttribute('style');
            }
          }
        }, {
          key: 'syncGridHeight',
          value: function syncGridHeight() {
            if (this.height === 'auto') {
              this.element.style.overflowY = 'hidden';
            }

            var headerTable = this.element.querySelector('table.grid-header-table');
            var headerHeight = headerTable.offsetHeight;
            var gridFooter = this.element.querySelector('grid-footer-container');
            var gridFooterHeight = 0;
            if (gridFooter !== null) {
              gridFooterHeight = gridFooter.offsetHeight;
            }

            var gridContainerTopAndBottomBorderWidth = 2;

            this._height = this.element.parentElement.clientHeight - headerHeight - gridFooterHeight - gridContainerTopAndBottomBorderWidth;
            this.heightChanged();
          }
        }, {
          key: 'syncColumnHeadersWithColumns',
          value: function syncColumnHeadersWithColumns() {
            var headers = this.element.querySelectorAll('table>thead>tr:first-child>th');
            var filters = this.element.querySelectorAll('table>thead>tr:last-child>th');
            var cells = this.element.querySelectorAll('table>tbody>tr:first-child>td');
            var isOverflowing = this.isBodyOverflowing();

            this._syncHeadersAndCellsMinWidth(headers, filters, cells, isOverflowing);

            for (var i = 0; i < 5; i++) {
              this._syncHeadersAndCellsWidth(headers, filters, cells, isOverflowing);
            }
          }
        }, {
          key: '_syncHeadersAndCellsMinWidth',
          value: function _syncHeadersAndCellsMinWidth(headers, filters, cells, isOverflowing) {
            for (var i = 0; i < headers.length; i++) {
              var header = headers[i];
              var filter = filters[i];
              var cell = cells[i];

              if (cell && header && filter) {
                var columnMinWidth = cell.getAttribute('min-width');
                if (columnMinWidth) {
                  columnMinWidth = parseInt(columnMinWidth);

                  var headerMinWidth = columnMinWidth;
                  if (i === headers.length - 1 && isOverflowing) {
                    headerMinWidth += this.scrollBarWidth;
                  }

                  if (cell.offsetWidth < columnMinWidth || header.offsetWidth < headerMinWidth || filter.offsetWidth < headerMinWidth) {
                    header.style.minWidth = headerMinWidth + 'px';
                    filter.style.minWidth = headerMinWidth + 'px';
                    cell.style.minWidth = columnMinWidth + 'px';
                  }
                }
              }
            }
          }
        }, {
          key: '_syncHeadersAndCellsWidth',
          value: function _syncHeadersAndCellsWidth(headers, filters, cells, isOverflowing) {
            for (var i = 0; i < headers.length; i++) {
              var header = headers[i];
              var filter = filters[i];
              var cell = cells[i];

              if (cell && header && filter) {
                var columnWidth = cell.getAttribute('width');
                if (columnWidth) {
                  columnWidth = parseInt(columnWidth);
                } else {
                  columnWidth = cell.offsetWidth;
                }

                var headerWidth = columnWidth;
                if (i === headers.length - 1 && isOverflowing) {
                  headerWidth += this.scrollBarWidth;
                }

                header.style.width = headerWidth + 'px';
                filter.style.width = headerWidth + 'px';
                cell.style.width = columnWidth + 'px';
              }
            }
          }
        }, {
          key: 'isBodyOverflowing',
          value: function isBodyOverflowing() {
            var body = this.element.querySelector('.grid-content-container');
            return body.offsetHeight < body.scrollHeight || body.offsetWidth < body.scrollWidth;
          }
        }], null, _instanceInitializers);

        var _Grid = Grid;
        Grid = inject(Element, ViewCompiler, ViewResources, Container, TargetInstruction, BindingEngine, TaskQueue)(Grid) || Grid;
        Grid = processContent(processUserTemplate)(Grid) || Grid;
        Grid = customElement('grid')(Grid) || Grid;
        return Grid;
      })();

      _export('Grid', Grid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvZ3JpZC9ncmlkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2UEFXYSxJQUFJOzs7Ozs7Ozs7O3dDQVhULGFBQWE7b0NBQUUsU0FBUztrQ0FBRSxPQUFPO21DQUFFLFFBQVE7aUNBQUUsTUFBTTt3Q0FBRSxhQUFhO3lDQUN4RSxjQUFjOzRDQUFFLGlCQUFpQjt1Q0FBRSxZQUFZO21DQUFFLFFBQVE7d0NBQUUsYUFBYTtvQ0FDeEUsU0FBUztzQ0FBRSxXQUFXOztrREFDaEIsbUJBQW1COzsrREFDbkIsdUJBQXVCOzt3Q0FDdkIsWUFBWTs7bUNBQ1osbUJBQW1COzs7QUFLZCxVQUFJOzs7OzhCQUFKLElBQUk7O3VCQUdkLFFBQVE7O21CQUFVLElBQUk7Ozs7O3VCQUd0QixRQUFROzttQkFBZSxLQUFLOzs7Ozt1QkFDNUIsUUFBUTs7bUJBQWMsSUFBSTs7Ozs7dUJBQzFCLFFBQVE7O21CQUFrQixHQUFHOzs7Ozt1QkFHN0IsUUFBUTs7bUJBQVksSUFBSTs7Ozs7dUJBQ3hCLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7bUJBQWUsU0FBUzs7Ozs7dUJBRzFFLFFBQVE7O21CQUFxQixJQUFJOzs7Ozt1QkFHakMsUUFBUTs7bUJBQW1CLElBQUk7Ozs7O3VCQUcvQixRQUFROzttQkFBYSxLQUFLOzs7Ozt1QkFDMUIsUUFBUTs7bUJBQWdCLFNBQVM7Ozs7O3VCQU1qQyxRQUFROzttQkFBaUIsRUFBRTs7Ozs7dUJBRzNCLFFBQVE7O21CQUFRLElBQUk7Ozs7O3VCQUNwQixRQUFROzttQkFBUSxJQUFJOzs7Ozt1QkFDcEIsUUFBUTs7bUJBQVksSUFBSTs7Ozs7dUJBRXhCLFFBQVE7O21CQUFrQixZQUFZOzs7Ozt1QkFJdEMsUUFBUTs7bUJBQVksS0FBSzs7Ozs7dUJBQ3pCLFFBQVE7O21CQUFZLEVBQUU7Ozs7O3VCQUN0QixRQUFROzttQkFBYSxFQUFFOzs7Ozt1QkFD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QUFJLENBQUMsV0FBVyxDQUFDO2lCQUNoQzs7QUFFRCxvQkFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQzlCLG9CQUFJLEFBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFLLGFBQWEsRUFBRTtBQUMvQyw2QkFBVyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7aUJBQ3BDOztBQUdELHNCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBTSxXQUFXLE9BQUksQ0FBQztBQUN4QyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQU0sV0FBVyxPQUFJLENBQUM7QUFDeEMsb0JBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFNLFdBQVcsT0FBSSxDQUFDO2VBQ3ZDO2FBQ0Y7V0FDRjs7O2lCQUVnQiw2QkFBRztBQUNsQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUNqRSxtQkFBTyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1dBQ3JGOzs7b0JBdGVVLElBQUk7QUFBSixZQUFJLEdBRGhCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUN4RixJQUFJLEtBQUosSUFBSTtBQUFKLFlBQUksR0FGaEIsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBRXZCLElBQUksS0FBSixJQUFJO0FBQUosWUFBSSxHQUhoQixhQUFhLENBQUMsTUFBTSxDQUFDLENBR1QsSUFBSSxLQUFKLElBQUk7ZUFBSixJQUFJIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvZ3JpZC9ncmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjdXN0b21FbGVtZW50LCBUYXNrUXVldWUsIHVzZVZpZXcsIGJpbmRhYmxlLCBpbmplY3QsIEJpbmRpbmdFbmdpbmUsXHJcbiAgcHJvY2Vzc0NvbnRlbnQsIFRhcmdldEluc3RydWN0aW9uLCBWaWV3Q29tcGlsZXIsIFZpZXdTbG90LCBWaWV3UmVzb3VyY2VzLFxyXG4gIENvbnRhaW5lciwgYmluZGluZ01vZGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtwcm9jZXNzVXNlclRlbXBsYXRlfSBmcm9tICcuL3Byb2NjZXNzLXVzZXItdGVtcGxhdGUnO1xyXG5pbXBvcnQge0NvbHVtbkRlZmluaXRpb25GYWN0b3J5fSBmcm9tICcuLi9jb2x1bW4vY29sdW1uLWRlZmluaXRpb24tZmFjdG9yeSc7XHJcbmltcG9ydCB7U3RvcmVNYW5hZ2VyfSBmcm9tICcuLi9zdG9yZS9zdG9yZS1tYW5hZ2VyJztcclxuaW1wb3J0IHtjdXN0b21FbGVtZW50SGVscGVyfSBmcm9tICd1dGlscyc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnZ3JpZCcpXHJcbkBwcm9jZXNzQ29udGVudChwcm9jZXNzVXNlclRlbXBsYXRlKVxyXG5AaW5qZWN0KEVsZW1lbnQsIFZpZXdDb21waWxlciwgVmlld1Jlc291cmNlcywgQ29udGFpbmVyLCBUYXJnZXRJbnN0cnVjdGlvbiwgQmluZGluZ0VuZ2luZSwgVGFza1F1ZXVlKVxyXG5leHBvcnQgY2xhc3MgR3JpZCB7XHJcblxyXG4gIC8qID09IFN0eWxpbmcgPT0gKi9cclxuICBAYmluZGFibGUgaGVpZ2h0ID0gbnVsbDtcclxuXHJcbiAgLy8gRmlsdGVyaW5nXHJcbiAgQGJpbmRhYmxlIHNob3dGaWx0ZXJzID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIGZpbHRlcmFibGUgPSB0cnVlO1xyXG4gIEBiaW5kYWJsZSBmaWx0ZXJEZWJvdW5jZSA9IDUwMDtcclxuXHJcbiAgLy8gU29ydGluYXRpb25cclxuICBAYmluZGFibGUgc29ydGFibGUgPSB0cnVlO1xyXG4gIEBiaW5kYWJsZSh7ZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXl9KSBzb3J0T3B0aW9ucyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgLy8gQ29sdW1uIGRlZnNcclxuICBAYmluZGFibGUgc2hvd0NvbHVtbkhlYWRlcnMgPSB0cnVlO1xyXG4gIGNvbHVtbkhlYWRlcnMgPSBbXTtcclxuICBjb2x1bW5zID0gW107XHJcbiAgQGJpbmRhYmxlIGNvbHVtbnNNZXRhZGF0YSA9IG51bGw7XHJcblxyXG4gIC8vIFNlbGVjdGlvblxyXG4gIEBiaW5kYWJsZSBzZWxlY3Rpb24gPSBmYWxzZTsgLy8gc2luZ2xlLXdpdGhEZXNlbGVjdCB8fCBzaW5nbGUtbm9EZXNlbGVjdCB8fCBtdWx0aXNlbGVjdC13aXRoRGVzZWxlY3QgfHwgbXVsdGlzZWxlY3Qtbm9EZXNlbGVjdFxyXG4gIEBiaW5kYWJsZSBzZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgbGFzdFNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICBpc1NpbmdsZVNlbGVjdCA9IHRydWU7XHJcbiAgaXNXaXRoRGVzZWxlY3QgPSB0cnVlO1xyXG5cclxuICAvLyBNaXNjXHJcbiAgQGJpbmRhYmxlIG5vUm93c01lc3NhZ2UgPSAnJztcclxuXHJcbiAgLy8gRGF0YSAuLi4uXHJcbiAgQGJpbmRhYmxlIHJlYWQgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBkYXRhID0gbnVsbDtcclxuICBAYmluZGFibGUgYXV0b0xvYWQgPSB0cnVlO1xyXG4gIGxvYWRpbmcgPSBmYWxzZTtcclxuICBAYmluZGFibGUgbG9hZGluZ01lc3NhZ2UgPSAnTG9hZGluZy4uLic7XHJcbiAgcm93RGF0YSA9IFtdO1xyXG5cclxuICAvLyBQYWdpbmF0aW9uXHJcbiAgQGJpbmRhYmxlIHBhZ2VhYmxlID0gZmFsc2U7XHJcbiAgQGJpbmRhYmxlIHBhZ2VTaXplID0gMTA7XHJcbiAgQGJpbmRhYmxlIHBhZ2VyU2l6ZSA9IDEwO1xyXG4gIEBiaW5kYWJsZSBwYWdlID0gMTtcclxuICBAYmluZGFibGUgc2hvd0ZpcnN0TGFzdEJ1dHRvbnMgPSB0cnVlO1xyXG4gIEBiaW5kYWJsZSBzaG93SnVtcEJ1dHRvbnMgPSB0cnVlO1xyXG4gIEBiaW5kYWJsZSBzaG93UGFnZVNpemVCb3ggPSB0cnVlO1xyXG4gIEBiaW5kYWJsZSBzaG93UGFnaW5nU3VtbWFyeSA9IHRydWU7XHJcbiAgQGJpbmRhYmxlIHBhZ2VTaXplcyA9IFsxMCwgMjUsIDUwXTtcclxuXHJcblxyXG4gIC8vIFN1YnNjcmlwdGlvbiBoYW5kbGluZ1xyXG4gIHVuYmluZGluZyA9IGZhbHNlO1xyXG5cclxuICAvLyBWaXN1YWxcclxuICAvLyBUT0RPOiBjYWxjIHNjcm9sbGJhciB3aWR0aCB1c2luZyBicm93c2VyXHJcbiAgc2Nyb2xsQmFyV2lkdGggPSAxNjtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgdmMsIHZyLCBjb250YWluZXIsIHRhcmdldEluc3RydWN0aW9uLCBiaW5kaW5nRW5naW5lLCB0YXNrUXVldWUpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAvLyBTZXJ2aWNlc1xyXG4gICAgdGhpcy52aWV3Q29tcGlsZXIgPSB2YztcclxuICAgIHRoaXMudmlld1Jlc291cmNlcyA9IHZyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICB0aGlzLmJpbmRpbmdFbmdpbmUgPSBiaW5kaW5nRW5naW5lO1xyXG4gICAgdGhpcy50YXNrUXVldWUgPSB0YXNrUXVldWU7XHJcbiAgICBjb25zdCBncmlkRGVmaW5pdGlvbiA9IHRhcmdldEluc3RydWN0aW9uLmJlaGF2aW9ySW5zdHJ1Y3Rpb25zWzBdLmdyaWREZWZpbml0aW9uO1xyXG4gICAgdGhpcy5yb3dBdHRycyA9IGdyaWREZWZpbml0aW9uLnJvd0F0dHJzO1xyXG4gICAgdGhpcy5jb2x1bW5EZWZpbml0aW9uRmFjdG9yeSA9IG5ldyBDb2x1bW5EZWZpbml0aW9uRmFjdG9yeShncmlkRGVmaW5pdGlvbiwgdGhpcyk7XHJcbiAgICB0aGlzLnBhZ2VhYmxlID0gZ3JpZERlZmluaXRpb24ucGFnaW5hdGlvbkF0dHJzO1xyXG4gIH1cclxuXHJcbiAgYmluZChiaW5kaW5nQ29udGV4dCwgb3ZlcnJpZGVDb250ZXh0KSB7XHJcbiAgICB0aGlzLnBhcmVudCA9IGJpbmRpbmdDb250ZXh0O1xyXG5cclxuICAgIGlmICh0aGlzLmNvbHVtbnNNZXRhZGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLmNvbHVtbkRlZmluaXRpb25GYWN0b3J5LmNyZWF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5jb2x1bW5EZWZpbml0aW9uRmFjdG9yeS5jcmVhdGUodGhpcy5jb2x1bW5zTWV0YWRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcmVNYW5hZ2VyID0gbmV3IFN0b3JlTWFuYWdlcih0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5zb3J0T3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBtYXhDb2x1bW5JZCA9IHRoaXMuY29sdW1uc1t0aGlzLmNvbHVtbnMubGVuZ3RoIC0gMV0uaWQ7XHJcbiAgICAgIC8vIGFzc2VydCBzb3J0IG9wdGlvbnMgY29udHJhY3RcclxuICAgICAgdGhpcy5zb3J0T3B0aW9ucy5mb3JFYWNoKHNvcnRPcHRpb24gPT4ge1xyXG4gICAgICAgIGxldCBpc1ZhbGlkQ29sdW1uSWQgPSBzb3J0T3B0aW9uLmNvbHVtbklkID49IDEgJiYgc29ydE9wdGlvbi5jb2x1bW5JZCA8PSBtYXhDb2x1bW5JZDtcclxuICAgICAgICBpZiAoaXNWYWxpZENvbHVtbklkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNvbHVtbiBpZDogJHtzb3J0T3B0aW9uLmNvbHVtbklkfS4gQ29sdW1uIElkIHNob3VsZCBiZSBhbiBpbnRlZ2VyIG51bWJlciBiZXR3ZWVuIDEgYW5kICR7bWF4Q29sdW1uSWR9LmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWRTb3J0RGlyZWN0aW9uID0gc29ydE9wdGlvbi5zb3J0RGlyZWN0aW9uID09PSAnYXNjJyB8fCBzb3J0T3B0aW9uLnNvcnREaXJlY3Rpb24gPT09ICdkZXNjJztcclxuICAgICAgICBpZiAoaXNWYWxpZFNvcnREaXJlY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc29ydCBkaXJlY3Rpb246ICcke3NvcnRPcHRpb24uc29ydERpcmVjdGlvbn0nLiBTb3J0IGRpcmVjdGlvbiBzaG91bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6ICdhc2MnLCAnZGVzYycgb3IgdW5kZWZpbmVkLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBBcHBseSBzb3J0IG9wdGlvbnMgKGNhY2hlZClcclxuICAgICAgbGV0IHNvcnRzID0gdGhpcy5zb3J0T3B0aW9ucy5tYXAoc29ydE9wdGlvbiA9PiB7XHJcbiAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1uc1tzb3J0T3B0aW9uLmNvbHVtbklkIC0gMV07XHJcbiAgICAgICAgbGV0IHNvcnQgPSBjb2x1bW4uc2V0U29ydERpcmVjdGlvbihzb3J0T3B0aW9uLnNvcnREaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gc29ydDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnN0b3JlTWFuYWdlci5nZXREYXRhU3RvcmUoKS5hcHBseVNvcnRPcHRpb25zKHNvcnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaXN0ZW4gZm9yIHdpbmRvdyByZXNpemUgc28gd2UgY2FuIHJlLWZsb3cgdGhlIGdyaWQgbGF5b3V0XHJcbiAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGVpZ2h0ID09PSAnYXV0bycpIHtcclxuICAgICAgICB0aGlzLnN5bmNHcmlkSGVpZ2h0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc3luY0NvbHVtbkhlYWRlcnNXaXRoQ29sdW1ucygpO1xyXG4gICAgfSkuYmluZCh0aGlzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcclxuXHJcblxyXG4gICAgLy8gVGhlIHRhYmxlIGJvZHkgZWxlbWVudCB3aWxsIGhvc3QgdGhlIHJvd3NcclxuICAgIHZhciB0Ym9keSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZT50Ym9keScpO1xyXG4gICAgdGhpcy52aWV3U2xvdCA9IG5ldyBWaWV3U2xvdCh0Ym9keSwgdHJ1ZSwgdGhpcyk7XHJcblxyXG4gICAgLy8gR2V0IHRoZSByb3cgdGVtcGxhdGUgdG9vIGFuZCBhZGQgYSByZXBlYXRlclxyXG4gICAgdmFyIHJvdyA9IHRib2R5LnF1ZXJ5U2VsZWN0b3IoJ3RyJyk7XHJcbiAgICB0aGlzLl9hZGRSb3dBdHRyaWJ1dGVzKHJvdyk7XHJcblxyXG4gICAgdGhpcy5yb3dUZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIHRoaXMucm93VGVtcGxhdGUuYXBwZW5kQ2hpbGQocm93KTtcclxuXHJcbiAgICB0aGlzLl9idWlsZFRlbXBsYXRlcyhiaW5kaW5nQ29udGV4dCwgb3ZlcnJpZGVDb250ZXh0KTtcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5pbmRleE9mKCdub0Rlc2VsZWN0JykgPiAtMSkge1xyXG4gICAgICAgIHRoaXMuaXNXaXRoRGVzZWxlY3QgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZWxlY3Rpb24uaW5kZXhPZignbXVsdGlzZWxlY3QnKSA+IC0xKSB7XHJcbiAgICAgICAgdGhpcy5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1DaGFuZ2VkKHRoaXMuc2VsZWN0ZWRJdGVtKTtcclxuICB9XHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgdGhpcy5jYW5Mb2FkRGF0YSA9IHRydWU7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIGlmICh0aGlzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgIHRoaXMuc3luY0dyaWRIZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodENoYW5nZWQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvTG9hZCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYWdlYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0b3JlTWFuYWdlci5nZXREYXRhU3RvcmUoKS5zZXRQYWdlcih0aGlzLnBhZ2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9hZGRSb3dBdHRyaWJ1dGVzKHJvdykge1xyXG4gICAgcm93LnNldEF0dHJpYnV0ZSgncmVwZWF0LmZvcicsICckaXRlbSBvZiByb3dEYXRhJyk7XHJcbiAgICAvLyBDb3B5IGFueSB1c2VyIHNwZWNpZmllZCByb3cgYXR0cmlidXRlcyB0byB0aGUgcm93IHRlbXBsYXRlXHJcbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMucm93QXR0cnMpIHtcclxuICAgICAgaWYgKHRoaXMucm93QXR0cnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICByb3cuc2V0QXR0cmlidXRlKHByb3AsIHRoaXMucm93QXR0cnNbcHJvcF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfYnVpbGRUZW1wbGF0ZXMoYmluZGluZ0NvbnRleHQsIG92ZXJyaWRlQ29udGV4dCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgZnJhZ21lbnQgd2Ugd2lsbCBtYW5pcHVsYXRlIHRoZSBET00gaW5cclxuICAgIGxldCByb3dUZW1wbGF0ZSA9IHRoaXMucm93VGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgbGV0IHJvdyA9IHJvd1RlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJ3RyJyk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRoZSBjb2x1bW5zXHJcbiAgICB0aGlzLmNvbHVtbnNcclxuICAgICAgLm1hcChjID0+IGMuY3JlYXRlRE9NRWxlbWVudCgpKVxyXG4gICAgICAuZm9yRWFjaChyb3cuYXBwZW5kQ2hpbGQuYmluZChyb3cpKTtcclxuXHJcbiAgICBsZXQgb3ZlcnJpZGVCaW5kaW5nQ29udGV4dCA9IHtcclxuICAgICAgYmluZGluZ0NvbnRleHQ6IHRoaXMsXHJcbiAgICAgIHBhcmVudE92ZXJyaWRlQ29udGV4dDoge1xyXG4gICAgICAgIGJpbmRpbmdDb250ZXh0OiBiaW5kaW5nQ29udGV4dCxcclxuICAgICAgICBwYXJlbnRPdmVycmlkZUNvbnRleHQ6IG92ZXJyaWRlQ29udGV4dFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5vdyBjb21waWxlIHRoZSByb3cgdGVtcGxhdGVcclxuICAgIGxldCB2aWV3ID0gdGhpcy52aWV3Q29tcGlsZXIuY29tcGlsZShyb3dUZW1wbGF0ZSwgdGhpcy52aWV3UmVzb3VyY2VzKS5jcmVhdGUodGhpcy5jb250YWluZXIpO1xyXG4gICAgdmlldy5iaW5kKHRoaXMsIG92ZXJyaWRlQmluZGluZ0NvbnRleHQpO1xyXG5cclxuICAgIC8vIGJhc2VkIG9uIHZpZXdTbG90LnN3YXAoKSBmcm9tIHRlbXBsYXRpbmcgMC4xNi4wXHJcbiAgICBsZXQgcmVtb3ZlUmVzcG9uc2UgPSB0aGlzLnZpZXdTbG90LnJlbW92ZUFsbCgpO1xyXG4gICAgaWYgKHJlbW92ZVJlc3BvbnNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICByZW1vdmVSZXNwb25zZS50aGVuKCgpID0+IHRoaXMudmlld1Nsb3QuYWRkKHZpZXcpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpZXdTbG90LmFkZCh2aWV3KTtcclxuICAgIHRoaXMudmlld1Nsb3QuYXR0YWNoZWQoKTtcclxuXHJcbiAgICAvLyBIQUNLOiB3aHkgaXMgdGhlIGNoYW5nZSBoYW5kbGVyIG5vdCBmaXJpbmcgZm9yIG5vUm93c01lc3NhZ2U/XHJcbiAgICB0aGlzLm5vUm93c01lc3NhZ2VDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICB1bmJpbmQoKSB7XHJcbiAgICB0aGlzLnVuYmluZGluZyA9IHRydWU7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XHJcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjID0+IGMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnN0b3JlTWFuYWdlci51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gY2FsbCBmdW5jdGlvbiBmcm9tIHBhcmVudCBjb250ZXh0IHdoZXJlIGdyaWQgaXMgY29tcG9zZWRcclxuICBjYWxsKGZ1bmNOYW1lLCAuLi5wYXJhbXMpIHtcclxuICAgIHRoaXMucGFyZW50W2Z1bmNOYW1lXS5hcHBseSh0aGlzLnBhcmVudCwgcGFyYW1zKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVNvcnQoc29ydCkge1xyXG4gICAgbGV0IHNvcnRPcmRlciA9IHRoaXMuc3RvcmVNYW5hZ2VyLmdldERhdGFTdG9yZSgpLmNoYW5nZVNvcnRQcm9jZXNzaW5nT3JkZXIoc29ydCk7XHJcbiAgICB0aGlzLnNvcnRPcHRpb25zID0gc29ydE9yZGVyLm1hcChzb3J0ID0+IHtcclxuICAgICAgbGV0IHNvcnRPcHRpb24gPSB7XHJcbiAgICAgICAgY29sdW1uSWQ6IHNvcnQuY29sdW1uLmlkLFxyXG4gICAgICAgIHNvcnREaXJlY3Rpb246IHNvcnQudmFsdWVcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIHNvcnRPcHRpb247XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG5cclxuICAvLyB0b2RvOiB1c2UgY3VzdG9ubSBlbGVtZW50IHV0aWxzXHJcbiAgZGVib3VuY2UoZnVuYywgd2FpdCkge1xyXG4gICAgdmFyIHRpbWVvdXQ7XHJcblxyXG4gICAgLy8gdGhlIGRlYm91bmNlZCBmdW5jdGlvblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsXHJcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAgIC8vIG51bGxzIG91dCB0aW1lciBhbmQgY2FsbHMgb3JpZ2luYWwgZnVuY3Rpb25cclxuICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIHJlc3RhcnQgdGhlIHRpbWVyIHRvIGNhbGwgbGFzdCBmdW5jdGlvblxyXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXJzKCkge1xyXG4gICAgLy8gRGVib3VuY2VcclxuICAgIGlmICghdGhpcy5kZWJvdW5jZWRVcGRhdGVGaWx0ZXJzKSB7XHJcbiAgICAgIHRoaXMuZGVib3VuY2VkVXBkYXRlRmlsdGVycyA9IHRoaXMuZGVib3VuY2UodGhpcy5yZWZyZXNoLCB0aGlzLmZpbHRlckRlYm91bmNlIHx8IDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWJvdW5jZWRVcGRhdGVGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKiA9PT0gRGF0YSA9PT0gKi9cclxuICByZWZyZXNoKCkge1xyXG4gICAgaWYgKHRoaXMuY2FuTG9hZERhdGEgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdG9yZU1hbmFnZXIuZ2V0RGF0YVN0b3JlKCkuZ2V0RGF0YSgpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgLy8gdG9kbzogZW5hYmxlIGNhc2UgZm9yIGVtcHR5IGNvbHVtbj9cclxuICAgICAgICAvL3RoaXMuY2hlY2tEYXRhKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICB0aGlzLnJvd0RhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRhc2tRdWV1ZS5xdWV1ZVRhc2soKCkgPT4gdGhpcy5zeW5jQ29sdW1uSGVhZGVyc1dpdGhDb2x1bW5zKCkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrRGF0YShkYXRhKSB7XHJcbiAgICBkYXRhLmZvckVhY2goZCA9PiB7XHJcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgIGxldCBwcm9wTmFtZSA9IGMuZ2V0RmllbGROYW1lKCk7XHJcbiAgICAgICAgaWYgKGRbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZCwgYyk7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERhdGEgbXVzdCBoYXZlIHByb3BlcnR5IG5hbWVkOiAke3Byb3BOYW1lfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qID09PSBDaGFuZ2UgaGFuZGxlcnMgPT09ICovXHJcbiAgcm93Q2xpY2tlZCgkaXRlbSkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uICE9PSBmYWxzZSkge1xyXG4gICAgICBpZiAoJGl0ZW0uX3NlbGVjdGVkID09PSB0cnVlICYmIHRoaXMuaXNXaXRoRGVzZWxlY3QpIHtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0Um93KCRpdGVtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFJvdygkaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdFJvdygkaXRlbSwgbm9FdmVudE5lZWRlZCkge1xyXG4gICAgaWYgKCEkaXRlbS5pZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRpdGVtID09PSB0aGlzLmxhc3RTZWxlY3RlZEl0ZW0gJiYgIXRoaXMuaXNXaXRoRGVzZWxlY3QpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0ICYmIHRoaXMubGFzdFNlbGVjdGVkSXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZGVzZWxlY3RSb3codGhpcy5sYXN0U2VsZWN0ZWRJdGVtLCBub0V2ZW50TmVlZGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAkaXRlbS5fc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5sYXN0U2VsZWN0ZWRJdGVtID0gJGl0ZW07XHJcblxyXG4gICAgaWYgKG5vRXZlbnROZWVkZWQgIT09IHRydWUpIHtcclxuICAgICAgY3VzdG9tRWxlbWVudEhlbHBlci5kaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgJ3NlbGVjdC1ncmlkLXJvdycsIHtcclxuICAgICAgICAkaXRlbTogJGl0ZW1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXNlbGVjdFJvdygkaXRlbSwgbm9FdmVudE5lZWRlZCkge1xyXG4gICAgaWYgKCEkaXRlbS5pZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGl0ZW0uX3NlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKG5vRXZlbnROZWVkZWQgIT09IHRydWUgJiYgdGhpcy5pc1dpdGhEZXNlbGVjdCkge1xyXG4gICAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCAnZGVzZWxlY3QtZ3JpZC1yb3cnLCB7XHJcbiAgICAgICAgJGl0ZW06ICRpdGVtXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0ZWRJdGVtQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIC8vIHRvZG86IGZpeCBmb3IgbXVsdGlzZWxlY3RcclxuICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5pZCkge1xyXG4gICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMubGFzdFNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Um93KG5ld1ZhbHVlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrUXVldWUucXVldWVNaWNyb1Rhc2soKCgpID0+IHtcclxuICAgICAgICAgIGxldCByb3cgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndHIudGFibGUtaW5mbycpO1xyXG4gICAgICAgICAgaWYgKHJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByb3cuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyByb3cgaXMgYWxyZWFkeSBjbGlja2VkXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmxhc3RTZWxlY3RlZEl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3RSb3codGhpcy5sYXN0U2VsZWN0ZWRJdGVtLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFnZUNoYW5nZWQocGFnZSwgb2xkVmFsdWUpIHtcclxuICAgIGlmIChwYWdlICE9PSBvbGRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnBhZ2UgPSBOdW1iZXIocGFnZSk7XHJcbiAgICAgIHRoaXMuc3RvcmVNYW5hZ2VyLmdldERhdGFTdG9yZSgpLnNldFBhZ2UocGFnZSk7XHJcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFnZVNpemVDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnN0b3JlTWFuYWdlci5nZXREYXRhU3RvcmUoKS5zZXRQYWdlU2l6ZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMucGFnZUNoYW5nZWQoMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBub1Jvd3NNZXNzYWdlQ2hhbmdlZCgpIHtcclxuICAgIHRoaXMuc2hvd05vUm93c01lc3NhZ2UgPSB0aGlzLm5vUm93c01lc3NhZ2UgIT09ICcnO1xyXG4gIH1cclxuXHJcbiAgaGVpZ2h0Q2hhbmdlZCgpIHtcclxuICAgIHZhciBjb250ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLWNvbnRlbnQtY29udGFpbmVyJyk7XHJcblxyXG4gICAgaWYgKHRoaXMuaGVpZ2h0ID09PSAnYXV0bycgfHwgd2luZG93LmlzTmFOKHdpbmRvdy5OdW1iZXIodGhpcy5faGVpZ2h0KSkgPT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7dGhpcy5faGVpZ2h0fXB4YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb250LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qID09PSBWaXN1YWwgPT09ICovXHJcbiAgc3luY0dyaWRIZWlnaHQoKSB7XHJcbiAgICBpZiAodGhpcy5oZWlnaHQgPT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGVhZGVyVGFibGUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUuZ3JpZC1oZWFkZXItdGFibGUnKTtcclxuICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGhlYWRlclRhYmxlLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IGdyaWRGb290ZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignZ3JpZC1mb290ZXItY29udGFpbmVyJyk7XHJcbiAgICBsZXQgZ3JpZEZvb3RlckhlaWdodCA9IDA7XHJcbiAgICBpZiAoZ3JpZEZvb3RlciAhPT0gbnVsbCkge1xyXG4gICAgICBncmlkRm9vdGVySGVpZ2h0ID0gZ3JpZEZvb3Rlci5vZmZzZXRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ3JpZENvbnRhaW5lclRvcEFuZEJvdHRvbUJvcmRlcldpZHRoID0gMjtcclxuICAgIC8vIHRvZG86IGZpeCAtIGVycm9yIGluIGJ1aWxkXHJcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBncmlkRm9vdGVySGVpZ2h0IC0gZ3JpZENvbnRhaW5lclRvcEFuZEJvdHRvbUJvcmRlcldpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHRDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBzeW5jQ29sdW1uSGVhZGVyc1dpdGhDb2x1bW5zKCkge1xyXG4gICAgLy8gdG9kbzogZmluZCBpZiB0aGVyZSBpcyBuZWVkIGZvciBmaWx0ZXJzIHRvIGJlIHN5bmNlZCB0b29cclxuICAgIGxldCBoZWFkZXJzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlPnRoZWFkPnRyOmZpcnN0LWNoaWxkPnRoJyk7XHJcbiAgICBsZXQgZmlsdGVycyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZT50aGVhZD50cjpsYXN0LWNoaWxkPnRoJyk7XHJcbiAgICBsZXQgY2VsbHMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGU+dGJvZHk+dHI6Zmlyc3QtY2hpbGQ+dGQnKTsgLy8gZmlyc3Qgcm93IGlzIGVub3VnaFxyXG4gICAgbGV0IGlzT3ZlcmZsb3dpbmcgPSB0aGlzLmlzQm9keU92ZXJmbG93aW5nKCk7XHJcblxyXG4gICAgLy8gc2V0IGluaXRpYWxseSB0aGUgbWluLXdpZHRoIGF0dHJpYnV0ZSB0byBib3RoIHRhYmxlc1xyXG4gICAgdGhpcy5fc3luY0hlYWRlcnNBbmRDZWxsc01pbldpZHRoKGhlYWRlcnMsIGZpbHRlcnMsIGNlbGxzLCBpc092ZXJmbG93aW5nKTtcclxuXHJcbiAgICAvLyB0b2RvOiByZW1vdmUgdGhpcyBoYWNrIGlmIHBvc3NpYmxlXHJcbiAgICAvLyBydW4gYWxnb3JpdGhtIGZvciBzeW5jaW5nIDUgdGltZXMuLi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3N5bmNIZWFkZXJzQW5kQ2VsbHNXaWR0aChoZWFkZXJzLCBmaWx0ZXJzLCBjZWxscywgaXNPdmVyZmxvd2luZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3luY0hlYWRlcnNBbmRDZWxsc01pbldpZHRoKGhlYWRlcnMsIGZpbHRlcnMsIGNlbGxzLCBpc092ZXJmbG93aW5nKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGhlYWRlciA9IGhlYWRlcnNbaV07XHJcbiAgICAgIGxldCBmaWx0ZXIgPSBmaWx0ZXJzW2ldO1xyXG4gICAgICBsZXQgY2VsbCA9IGNlbGxzW2ldO1xyXG5cclxuICAgICAgaWYgKGNlbGwgJiYgaGVhZGVyICYmIGZpbHRlcikge1xyXG4gICAgICAgIGxldCBjb2x1bW5NaW5XaWR0aCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdtaW4td2lkdGgnKTsvLyB8fCBjZWxsLmdldEF0dHJpYnV0ZSgnd2lkdGgnKTtcclxuICAgICAgICBpZiAoY29sdW1uTWluV2lkdGgpIHtcclxuICAgICAgICAgIGNvbHVtbk1pbldpZHRoID0gcGFyc2VJbnQoY29sdW1uTWluV2lkdGgpO1xyXG5cclxuICAgICAgICAgIGxldCBoZWFkZXJNaW5XaWR0aCA9IGNvbHVtbk1pbldpZHRoO1xyXG4gICAgICAgICAgaWYgKChpID09PSBoZWFkZXJzLmxlbmd0aCAtIDEpICYmIGlzT3ZlcmZsb3dpbmcpIHtcclxuICAgICAgICAgICAgaGVhZGVyTWluV2lkdGggKz0gdGhpcy5zY3JvbGxCYXJXaWR0aDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY2VsbC5vZmZzZXRXaWR0aCA8IGNvbHVtbk1pbldpZHRoIHx8IGhlYWRlci5vZmZzZXRXaWR0aCA8IGhlYWRlck1pbldpZHRoIHx8IGZpbHRlci5vZmZzZXRXaWR0aCA8IGhlYWRlck1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5zdHlsZS5taW5XaWR0aCA9IGAke2hlYWRlck1pbldpZHRofXB4YDtcclxuICAgICAgICAgICAgZmlsdGVyLnN0eWxlLm1pbldpZHRoID0gYCR7aGVhZGVyTWluV2lkdGh9cHhgO1xyXG4gICAgICAgICAgICBjZWxsLnN0eWxlLm1pbldpZHRoID0gYCR7Y29sdW1uTWluV2lkdGh9cHhgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N5bmNIZWFkZXJzQW5kQ2VsbHNXaWR0aChoZWFkZXJzLCBmaWx0ZXJzLCBjZWxscywgaXNPdmVyZmxvd2luZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBoZWFkZXIgPSBoZWFkZXJzW2ldO1xyXG4gICAgICBsZXQgZmlsdGVyID0gZmlsdGVyc1tpXTtcclxuICAgICAgbGV0IGNlbGwgPSBjZWxsc1tpXTtcclxuXHJcbiAgICAgIGlmIChjZWxsICYmIGhlYWRlciAmJiBmaWx0ZXIpIHtcclxuICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBjZWxsLmdldEF0dHJpYnV0ZSgnd2lkdGgnKTtcclxuICAgICAgICBpZiAoY29sdW1uV2lkdGgpIHtcclxuICAgICAgICAgIGNvbHVtbldpZHRoID0gcGFyc2VJbnQoY29sdW1uV2lkdGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2x1bW5XaWR0aCA9IGNlbGwub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGVhZGVyV2lkdGggPSBjb2x1bW5XaWR0aDtcclxuICAgICAgICBpZiAoKGkgPT09IGhlYWRlcnMubGVuZ3RoIC0gMSkgJiYgaXNPdmVyZmxvd2luZykge1xyXG4gICAgICAgICAgaGVhZGVyV2lkdGggKz0gdGhpcy5zY3JvbGxCYXJXaWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ha2UgdGhlIGhlYWRlciB0aGUgc2FtZSB3aWR0aCBhcyB0aGUgY2VsbC4uLlxyXG4gICAgICAgIGhlYWRlci5zdHlsZS53aWR0aCA9IGAke2hlYWRlcldpZHRofXB4YDtcclxuICAgICAgICBmaWx0ZXIuc3R5bGUud2lkdGggPSBgJHtoZWFkZXJXaWR0aH1weGA7XHJcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGAke2NvbHVtbldpZHRofXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNCb2R5T3ZlcmZsb3dpbmcoKSB7XHJcbiAgICB2YXIgYm9keSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1jb250ZW50LWNvbnRhaW5lcicpO1xyXG4gICAgcmV0dXJuIGJvZHkub2Zmc2V0SGVpZ2h0IDwgYm9keS5zY3JvbGxIZWlnaHQgfHwgYm9keS5vZmZzZXRXaWR0aCA8IGJvZHkuc2Nyb2xsV2lkdGg7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
