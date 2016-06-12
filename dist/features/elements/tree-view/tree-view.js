System.register(['aurelia-framework', './list-item', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, ViewResources, bindable, BindingEngine, ListItem, customElementHelper, TreeView;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  function processData(data, filterFunc) {
    var listItems = data.map(function (d) {
      return new ListItem(d, { filter: filterFunc });
    });
    return flatten(listItems);
  }

  function flatten(arr) {
    return arr.reduce(function (acc, listItem) {
      acc = acc.concat(listItem);
      if (listItem.hasChildren) {
        acc = acc.concat(flatten(listItem.getChildren()));
      }

      return acc;
    }, []);
  }
  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      ViewResources = _aureliaFramework.ViewResources;
      bindable = _aureliaFramework.bindable;
      BindingEngine = _aureliaFramework.BindingEngine;
    }, function (_listItem) {
      ListItem = _listItem.ListItem;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      TreeView = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(TreeView, [{
          key: 'data',
          decorators: [bindable],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }, {
          key: 'filterFunc',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'filter',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'selectedItem',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function TreeView(element, viewResources, bindingEngine) {
          _classCallCheck(this, _TreeView);

          _defineDecoratedPropertyDescriptor(this, 'data', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'filterFunc', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'filter', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'selectedItem', _instanceInitializers);

          this.element = element;
          this.viewResources = viewResources;
          this.bindingEngine = bindingEngine;
        }

        _createDecoratedClass(TreeView, [{
          key: 'created',
          value: function created(owningView, myView) {}
        }, {
          key: '_subscribeToDataCollectionChanges',
          value: function _subscribeToDataCollectionChanges() {
            var _this = this;

            this.dataCollectionSubscription = this.bindingEngine.collectionObserver(this.data).subscribe(function (collectionChangeInfo) {
              _this.refresh();
            });
          }
        }, {
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
            var _this2 = this;

            this._subscribeToDataCollectionChanges();
            this.dataPropertySubscription = this.bindingEngine.propertyObserver(this, 'data').subscribe(function (newItems, oldItems) {
              _this2.dataCollectionSubscription.dispose();
              _this2._subscribeToDataCollectionChanges();
              _this2.refresh();
            });

            this.refresh();

            if (this.filter === true) {
              this.filterChanged(this.filter);
            }

            if (this.selectedItem) {
              this.selectedItemChanged(this.selectedItem);
            }
          }
        }, {
          key: 'attached',
          value: function attached() {}
        }, {
          key: 'detached',
          value: function detached() {}
        }, {
          key: 'unbind',
          value: function unbind() {
            this.dataPropertySubscription.dispose();
            this.dataCollectionSubscription.dispose();
          }
        }, {
          key: 'filterFuncChanged',
          value: function filterFuncChanged(newFunc, oldFunc) {
            this.treeData.forEach(function (li) {
              return li.filter = newFunc;
            });
            if (this.filter === true) {
              this.filterChanged(this.filter);
            }
          }
        }, {
          key: 'filterChanged',
          value: function filterChanged(newValue, oldValue) {
            if (newValue !== oldValue) {
              if (newValue) {
                this.treeData.forEach(function (li) {
                  return li.applyFilter();
                });
              } else {
                this.treeData.forEach(function (li) {
                  return li.clearFilter();
                });
              }
            }
          }
        }, {
          key: 'selectedItemChanged',
          value: function selectedItemChanged(newValue, oldValue) {
            if (newValue) {
              if (newValue !== oldValue) {
                var listItem = this.listItemMap.get(newValue);
                if (listItem) {
                  this.listItemClicked(listItem);
                }
              }
            } else {
              if (this.currentSelectedListItem) {
                this.currentSelectedListItem.setSelectedStatus(false);
              }
            }
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            var _this3 = this;

            this.treeData = processData(this.data, this.filterFunc);
            this.listItemMap = new WeakMap();
            this.treeData.forEach(function (li) {
              return _this3.listItemMap.set(li.item, li);
            });
          }
        }, {
          key: 'listItemClicked',
          value: function listItemClicked(listItem) {
            customElementHelper.dispatchEvent(this.element, 'select', {
              $item: listItem.item
            });

            if (this.currentSelectedListItem) {
              this.currentSelectedListItem.setSelectedStatus(false);
            }

            listItem.setSelectedStatus(true);
            this.currentSelectedListItem = listItem;
          }
        }], null, _instanceInitializers);

        var _TreeView = TreeView;
        TreeView = inject(Element, ViewResources, BindingEngine)(TreeView) || TreeView;
        TreeView = customElement('tree-view')(TreeView) || TreeView;
        return TreeView;
      })();

      _export('TreeView', TreeView);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RyZWUtdmlldy90cmVlLXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O29HQU9hLFFBQVE7Ozs7Ozs7O0FBMEdyQixXQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO0FBQ3JDLFFBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2FBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ3JFLFdBQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzNCOztBQUVELFdBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNwQixXQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFLO0FBQ25DLFNBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLFVBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtBQUN4QixXQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUNuRDs7QUFFRCxhQUFPLEdBQUcsQ0FBQztLQUNaLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDUjs7O2lDQS9ITyxNQUFNO3dDQUFFLGFBQWE7d0NBQUUsYUFBYTttQ0FBRSxRQUFRO3dDQUFFLGFBQWE7OzJCQUM3RCxRQUFROzttQ0FDUixtQkFBbUI7OztBQUtkLGNBQVE7Ozs7OEJBQVIsUUFBUTs7dUJBQ2xCLFFBQVE7O21CQUFRLEVBQUU7Ozs7O3VCQUNsQixRQUFROzttQkFBYyxJQUFJOzs7Ozt1QkFDMUIsUUFBUTs7bUJBQVUsS0FBSzs7Ozs7dUJBQ3ZCLFFBQVE7Ozs7O0FBRUUsaUJBTkEsUUFBUSxDQU1QLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFOzs7Ozs7Ozs7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dGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgVmlld1Jlc291cmNlcywgYmluZGFibGUsIEJpbmRpbmdFbmdpbmV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtMaXN0SXRlbX0gZnJvbSAnLi9saXN0LWl0ZW0nO1xyXG5pbXBvcnQge2N1c3RvbUVsZW1lbnRIZWxwZXJ9IGZyb20gJ3V0aWxzJztcclxuXHJcblxyXG5AY3VzdG9tRWxlbWVudCgndHJlZS12aWV3JylcclxuQGluamVjdChFbGVtZW50LCBWaWV3UmVzb3VyY2VzLCBCaW5kaW5nRW5naW5lKVxyXG5leHBvcnQgY2xhc3MgVHJlZVZpZXcge1xyXG4gIEBiaW5kYWJsZSBkYXRhID0gW107XHJcbiAgQGJpbmRhYmxlIGZpbHRlckZ1bmMgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBmaWx0ZXIgPSBmYWxzZTtcclxuICBAYmluZGFibGUgc2VsZWN0ZWRJdGVtO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCB2aWV3UmVzb3VyY2VzLCBiaW5kaW5nRW5naW5lKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy52aWV3UmVzb3VyY2VzID0gdmlld1Jlc291cmNlcztcclxuICAgIHRoaXMuYmluZGluZ0VuZ2luZSA9IGJpbmRpbmdFbmdpbmU7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVkKG93bmluZ1ZpZXcsIG15Vmlldykge31cclxuXHJcbiAgLy8gdG9kbzogbWFrZSB0aGlzIHdvcmtcclxuICBfc3Vic2NyaWJlVG9EYXRhQ29sbGVjdGlvbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmRhdGFDb2xsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5iaW5kaW5nRW5naW5lXHJcbiAgICAgIC5jb2xsZWN0aW9uT2JzZXJ2ZXIodGhpcy5kYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKGNvbGxlY3Rpb25DaGFuZ2VJbmZvID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kKGJpbmRpbmdDb250ZXh0LCBvdmVycmlkZUNvbnRleHQpIHtcclxuICAgIHRoaXMuX3N1YnNjcmliZVRvRGF0YUNvbGxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICB0aGlzLmRhdGFQcm9wZXJ0eVN1YnNjcmlwdGlvbiA9IHRoaXMuYmluZGluZ0VuZ2luZVxyXG4gICAgICAucHJvcGVydHlPYnNlcnZlcih0aGlzLCAnZGF0YScpXHJcbiAgICAgIC5zdWJzY3JpYmUoKG5ld0l0ZW1zLCBvbGRJdGVtcykgPT4ge1xyXG4gICAgICAgIHRoaXMuZGF0YUNvbGxlY3Rpb25TdWJzY3JpcHRpb24uZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZVRvRGF0YUNvbGxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG5cclxuICAgIGlmICh0aGlzLmZpbHRlciA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmZpbHRlckNoYW5nZWQodGhpcy5maWx0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbUNoYW5nZWQodGhpcy5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoZWQoKSB7fVxyXG5cclxuICBkZXRhY2hlZCgpIHt9XHJcblxyXG4gIHVuYmluZCgpIHtcclxuICAgIHRoaXMuZGF0YVByb3BlcnR5U3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZGF0YUNvbGxlY3Rpb25TdWJzY3JpcHRpb24uZGlzcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyRnVuY0NoYW5nZWQobmV3RnVuYywgb2xkRnVuYykge1xyXG4gICAgdGhpcy50cmVlRGF0YS5mb3JFYWNoKGxpID0+IGxpLmZpbHRlciA9IG5ld0Z1bmMpO1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyQ2hhbmdlZCh0aGlzLmZpbHRlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xyXG4gICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnRyZWVEYXRhLmZvckVhY2gobGkgPT4gbGkuYXBwbHlGaWx0ZXIoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy50cmVlRGF0YS5mb3JFYWNoKGxpID0+IGxpLmNsZWFyRmlsdGVyKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3RlZEl0ZW1DaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcclxuICAgICAgICBsZXQgbGlzdEl0ZW0gPSB0aGlzLmxpc3RJdGVtTWFwLmdldChuZXdWYWx1ZSk7XHJcbiAgICAgICAgaWYgKGxpc3RJdGVtKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3RJdGVtQ2xpY2tlZChsaXN0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2VsZWN0ZWRMaXN0SXRlbSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkTGlzdEl0ZW0uc2V0U2VsZWN0ZWRTdGF0dXMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKCkge1xyXG4gICAgdGhpcy50cmVlRGF0YSA9IHByb2Nlc3NEYXRhKHRoaXMuZGF0YSwgdGhpcy5maWx0ZXJGdW5jKTtcclxuICAgIHRoaXMubGlzdEl0ZW1NYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4gICAgdGhpcy50cmVlRGF0YS5mb3JFYWNoKGxpID0+IHRoaXMubGlzdEl0ZW1NYXAuc2V0KGxpLml0ZW0sIGxpKSk7XHJcbiAgfVxyXG5cclxuICBsaXN0SXRlbUNsaWNrZWQobGlzdEl0ZW0pIHtcclxuICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsICdzZWxlY3QnLCB7XHJcbiAgICAgICRpdGVtOiBsaXN0SXRlbS5pdGVtXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50U2VsZWN0ZWRMaXN0SXRlbSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZExpc3RJdGVtLnNldFNlbGVjdGVkU3RhdHVzKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0SXRlbS5zZXRTZWxlY3RlZFN0YXR1cyh0cnVlKTtcclxuICAgIHRoaXMuY3VycmVudFNlbGVjdGVkTGlzdEl0ZW0gPSBsaXN0SXRlbTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzRGF0YShkYXRhLCBmaWx0ZXJGdW5jKSB7XHJcbiAgbGV0IGxpc3RJdGVtcyA9IGRhdGEubWFwKGQgPT4gbmV3IExpc3RJdGVtKGQsIHtmaWx0ZXI6IGZpbHRlckZ1bmN9KSk7XHJcbiAgcmV0dXJuIGZsYXR0ZW4obGlzdEl0ZW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmxhdHRlbihhcnIpIHtcclxuICByZXR1cm4gYXJyLnJlZHVjZSgoYWNjLCBsaXN0SXRlbSkgPT4ge1xyXG4gICAgYWNjID0gYWNjLmNvbmNhdChsaXN0SXRlbSk7XHJcbiAgICBpZiAobGlzdEl0ZW0uaGFzQ2hpbGRyZW4pIHtcclxuICAgICAgYWNjID0gYWNjLmNvbmNhdChmbGF0dGVuKGxpc3RJdGVtLmdldENoaWxkcmVuKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIFtdKTtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
