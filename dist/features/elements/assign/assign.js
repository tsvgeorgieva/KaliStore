System.register(['aurelia-framework', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, computedFrom, bindingMode, BindingEngine, customElementHelper, Assign;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
      bindingMode = _aureliaFramework.bindingMode;
      BindingEngine = _aureliaFramework.BindingEngine;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Assign = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Assign, [{
          key: 'leftItems',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }, {
          key: 'rightItems',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }, {
          key: 'leftHeading',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'rightHeading',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'selectedItem',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: '_selectedItem',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function Assign(element, bindingEngine) {
          _classCallCheck(this, _Assign);

          _defineDecoratedPropertyDescriptor(this, 'leftItems', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'rightItems', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'leftHeading', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'rightHeading', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'selectedItem', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, '_selectedItem', _instanceInitializers);

          this.element = element;
          this.bindingEngine = bindingEngine;

          this.moveLeftDisabled = true;
          this.moveRightDisabled = true;

          this._selectedItem = null;
        }

        _createDecoratedClass(Assign, [{
          key: 'unbind',
          value: function unbind() {
            this._unsubscribe(this.leftItemsCollectionSubscription);
            this._unsubscribe(this.rightItemsCollectionSubscription);
          }
        }, {
          key: 'recalculateMoveLeftRightDisabled',
          value: function recalculateMoveLeftRightDisabled() {
            this.moveRightDisabled = this.leftItems.indexOf(this._selectedItem) === -1;
            this.moveLeftDisabled = this.rightItems.indexOf(this._selectedItem) === -1;
          }
        }, {
          key: 'selectedItemChanged',
          value: function selectedItemChanged(newValue, oldValue) {
            if (newValue === oldValue) {
              return;
            }

            if (newValue && newValue.id) {
              this.select(this.selectedItem);
            } else {
              this.deselect(this._selectedItem, true);
            }
          }
        }, {
          key: '_selectedItemChanged',
          value: function _selectedItemChanged() {
            this.recalculateMoveLeftRightDisabled();
          }
        }, {
          key: 'leftItemsChanged',
          value: function leftItemsChanged() {
            if (!(this.leftItems instanceof Array)) {
              this.leftItems = [];
            }
            this._subscribeToLeftItemsCollectionChanges();
            this.recalculateMoveLeftRightDisabled();
          }
        }, {
          key: 'rightItemsChanged',
          value: function rightItemsChanged() {
            if (!(this.rightItems instanceof Array)) {
              this.rightItems = [];
            }
            this._subscribeToRightItemsCollectionChanges();
            this.recalculateMoveLeftRightDisabled();
          }
        }, {
          key: 'select',
          value: function select(item, noEventNeeded) {
            this._selectedItem = item;

            if (noEventNeeded !== true) {
              customElementHelper.dispatchEvent(this.element, 'select-assign-item', {
                item: item
              });
            }
          }
        }, {
          key: 'deselect',
          value: function deselect(item, noEventNeeded) {
            this._selectedItem = null;

            if (noEventNeeded !== true) {
              customElementHelper.dispatchEvent(this.element, 'deselect-assign-item', {
                item: item
              });
            }
          }
        }, {
          key: 'moveLeft',
          value: function moveLeft() {
            var fromCollection = this.rightItems;
            var toCollection = this.leftItems;

            var item = this._remove(fromCollection, this._selectedItem);
            this._add(toCollection, item);

            customElementHelper.dispatchEvent(this.element, 'move-left-click', {
              item: this._selectedItem
            });

            this._selectedItem = undefined;
          }
        }, {
          key: 'moveRight',
          value: function moveRight() {
            var fromCollection = this.leftItems;
            var toCollection = this.rightItems;

            var item = this._remove(fromCollection, this._selectedItem);
            this._add(toCollection, item);

            customElementHelper.dispatchEvent(this.element, 'move-right-click', {
              item: this._selectedItem
            });

            this._selectedItem = undefined;
          }
        }, {
          key: 'moveAllLeft',
          value: function moveAllLeft() {
            var allItems = this.leftItems.concat(this.rightItems);

            this._selectedItem = undefined;

            this.leftItems = allItems;
            this.rightItems = [];

            customElementHelper.dispatchEvent(this.element, 'move-all-left-click', {});
          }
        }, {
          key: 'moveAllRight',
          value: function moveAllRight() {
            var allItems = this.leftItems.concat(this.rightItems);

            this._selectedItem = undefined;

            this.rightItems = allItems;
            this.leftItems = [];

            customElementHelper.dispatchEvent(this.element, 'move-all-right-click', {});
          }
        }, {
          key: '_add',
          value: function _add(toContainer, item) {
            toContainer.push(item);
          }
        }, {
          key: '_remove',
          value: function _remove(fromContainer, item) {
            var index = fromContainer.findIndex(function (i) {
              return i === item;
            });

            var removedItem = undefined;
            if (index > -1) {
              removedItem = fromContainer.splice(index, 1);
            }

            return removedItem[0];
          }
        }, {
          key: '_subscribeToLeftItemsCollectionChanges',
          value: function _subscribeToLeftItemsCollectionChanges() {
            var _this = this;

            this._unsubscribe(this.leftItemsCollectionSubscription);

            this.leftItemsCollectionSubscription = this.bindingEngine.collectionObserver(this.leftItems).subscribe(function (items) {
              _this.recalculateMoveLeftRightDisabled();
            });
          }
        }, {
          key: '_subscribeToRightItemsCollectionChanges',
          value: function _subscribeToRightItemsCollectionChanges() {
            var _this2 = this;

            this._unsubscribe(this.rightItemsCollectionSubscription);

            this.rightItemsCollectionSubscription = this.bindingEngine.collectionObserver(this.rightItems).subscribe(function (items) {
              _this2.recalculateMoveLeftRightDisabled();
            });
          }
        }, {
          key: '_unsubscribe',
          value: function _unsubscribe(subscription) {
            if (subscription !== undefined) {
              subscription.dispose();
            }
          }
        }], null, _instanceInitializers);

        var _Assign = Assign;
        Assign = inject(Element, BindingEngine)(Assign) || Assign;
        Assign = customElement('assign')(Assign) || Assign;
        return Assign;
      })();

      _export('Assign', Assign);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2Fzc2lnbi9hc3NpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NHQUthLE1BQU07Ozs7Ozs7Ozs7aUNBTFgsTUFBTTt3Q0FBRSxhQUFhO21DQUFFLFFBQVE7dUNBQUUsWUFBWTtzQ0FBRSxXQUFXO3dDQUFFLGFBQWE7O21DQUN6RSxtQkFBbUI7OztBQUlkLFlBQU07Ozs7OEJBQU4sTUFBTTs7dUJBQ2hCLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7bUJBQWEsRUFBRTs7Ozs7dUJBQ2pFLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7bUJBQWMsRUFBRTs7Ozs7dUJBQ2xFLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O0FBRUUsaUJBUkEsTUFBTSxDQVFMLE9BQU8sRUFBRSxhQUFhLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQUNsQyxjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixjQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzs7QUFFbkMsY0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUM3QixjQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDOztBQUU5QixjQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjs7OEJBaEJVLE1BQU07O2lCQWtCWCxrQkFBRztBQUNQLGdCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3hELGdCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1dBQzFEOzs7aUJBRStCLDRDQUFHO0FBQ2pDLGdCQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFB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bEIsTUFBTSxLQUFOLE1BQU07QUFBTixjQUFNLEdBRmxCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FFWCxNQUFNLEtBQU4sTUFBTTtlQUFOLE1BQU0iLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvYXNzaWduL2Fzc2lnbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgY29tcHV0ZWRGcm9tLCBiaW5kaW5nTW9kZSwgQmluZGluZ0VuZ2luZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge2N1c3RvbUVsZW1lbnRIZWxwZXJ9IGZyb20gJ3V0aWxzJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdhc3NpZ24nKVxyXG5AaW5qZWN0KEVsZW1lbnQsIEJpbmRpbmdFbmdpbmUpXHJcbmV4cG9ydCBjbGFzcyBBc3NpZ24ge1xyXG4gIEBiaW5kYWJsZSh7ZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXl9KSBsZWZ0SXRlbXMgPSBbXTtcclxuICBAYmluZGFibGUoe2RlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5fSkgcmlnaHRJdGVtcyA9IFtdO1xyXG4gIEBiaW5kYWJsZSBsZWZ0SGVhZGluZztcclxuICBAYmluZGFibGUgcmlnaHRIZWFkaW5nO1xyXG4gIEBiaW5kYWJsZSBzZWxlY3RlZEl0ZW07IC8vIGZvciBzeW5jaW5nIGFzc2lnbiB3aXRoIG91dHNpZGUgd29ybGRcclxuICBAYmluZGFibGUgX3NlbGVjdGVkSXRlbTsgLy8gZm9yIHN5bmNpbmcgb3V0c2lkZSB3b3JsZCB3aXRoIGFzc2lnbiAodmlhIGV2ZW50cylcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgYmluZGluZ0VuZ2luZSkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMuYmluZGluZ0VuZ2luZSA9IGJpbmRpbmdFbmdpbmU7XHJcblxyXG4gICAgdGhpcy5tb3ZlTGVmdERpc2FibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMubW92ZVJpZ2h0RGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICB1bmJpbmQoKSB7XHJcbiAgICB0aGlzLl91bnN1YnNjcmliZSh0aGlzLmxlZnRJdGVtc0NvbGxlY3Rpb25TdWJzY3JpcHRpb24pO1xyXG4gICAgdGhpcy5fdW5zdWJzY3JpYmUodGhpcy5yaWdodEl0ZW1zQ29sbGVjdGlvblN1YnNjcmlwdGlvbik7XHJcbiAgfVxyXG5cclxuICByZWNhbGN1bGF0ZU1vdmVMZWZ0UmlnaHREaXNhYmxlZCgpIHtcclxuICAgIHRoaXMubW92ZVJpZ2h0RGlzYWJsZWQgPSB0aGlzLmxlZnRJdGVtcy5pbmRleE9mKHRoaXMuX3NlbGVjdGVkSXRlbSkgPT09IC0xO1xyXG4gICAgdGhpcy5tb3ZlTGVmdERpc2FibGVkID0gdGhpcy5yaWdodEl0ZW1zLmluZGV4T2YodGhpcy5fc2VsZWN0ZWRJdGVtKSA9PT0gLTE7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RlZEl0ZW1DaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlICYmIG5ld1ZhbHVlLmlkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuc2VsZWN0ZWRJdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVzZWxlY3QodGhpcy5fc2VsZWN0ZWRJdGVtLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zZWxlY3RlZEl0ZW1DaGFuZ2VkKCkge1xyXG4gICAgdGhpcy5yZWNhbGN1bGF0ZU1vdmVMZWZ0UmlnaHREaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgbGVmdEl0ZW1zQ2hhbmdlZCgpIHtcclxuICAgIGlmICghKHRoaXMubGVmdEl0ZW1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMubGVmdEl0ZW1zID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdWJzY3JpYmVUb0xlZnRJdGVtc0NvbGxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlTW92ZUxlZnRSaWdodERpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICByaWdodEl0ZW1zQ2hhbmdlZCgpIHtcclxuICAgIGlmICghKHRoaXMucmlnaHRJdGVtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLnJpZ2h0SXRlbXMgPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1YnNjcmliZVRvUmlnaHRJdGVtc0NvbGxlY3Rpb25DaGFuZ2VzKCk7XHJcbiAgICB0aGlzLnJlY2FsY3VsYXRlTW92ZUxlZnRSaWdodERpc2FibGVkKCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaXRlbSwgbm9FdmVudE5lZWRlZCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuXHJcbiAgICBpZiAobm9FdmVudE5lZWRlZCAhPT0gdHJ1ZSkge1xyXG4gICAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCAnc2VsZWN0LWFzc2lnbi1pdGVtJywge1xyXG4gICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXNlbGVjdChpdGVtLCBub0V2ZW50TmVlZGVkKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBudWxsO1xyXG5cclxuICAgIGlmIChub0V2ZW50TmVlZGVkICE9PSB0cnVlKSB7XHJcbiAgICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsICdkZXNlbGVjdC1hc3NpZ24taXRlbScsIHtcclxuICAgICAgICBpdGVtOiBpdGVtXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZUxlZnQoKSB7XHJcbiAgICBsZXQgZnJvbUNvbGxlY3Rpb24gPSB0aGlzLnJpZ2h0SXRlbXM7XHJcbiAgICBsZXQgdG9Db2xsZWN0aW9uID0gdGhpcy5sZWZ0SXRlbXM7XHJcblxyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLl9yZW1vdmUoZnJvbUNvbGxlY3Rpb24sIHRoaXMuX3NlbGVjdGVkSXRlbSk7XHJcbiAgICB0aGlzLl9hZGQodG9Db2xsZWN0aW9uLCBpdGVtKTtcclxuXHJcbiAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCAnbW92ZS1sZWZ0LWNsaWNrJywge1xyXG4gICAgICBpdGVtOiB0aGlzLl9zZWxlY3RlZEl0ZW1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG1vdmVSaWdodCgpIHtcclxuICAgIGxldCBmcm9tQ29sbGVjdGlvbiA9IHRoaXMubGVmdEl0ZW1zO1xyXG4gICAgbGV0IHRvQ29sbGVjdGlvbiA9IHRoaXMucmlnaHRJdGVtcztcclxuXHJcbiAgICBsZXQgaXRlbSA9IHRoaXMuX3JlbW92ZShmcm9tQ29sbGVjdGlvbiwgdGhpcy5fc2VsZWN0ZWRJdGVtKTtcclxuICAgIHRoaXMuX2FkZCh0b0NvbGxlY3Rpb24sIGl0ZW0pO1xyXG5cclxuICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsICdtb3ZlLXJpZ2h0LWNsaWNrJywge1xyXG4gICAgICBpdGVtOiB0aGlzLl9zZWxlY3RlZEl0ZW1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG1vdmVBbGxMZWZ0KCkge1xyXG4gICAgbGV0IGFsbEl0ZW1zID0gdGhpcy5sZWZ0SXRlbXMuY29uY2F0KHRoaXMucmlnaHRJdGVtcyk7XHJcblxyXG5cclxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICB0aGlzLmxlZnRJdGVtcyA9IGFsbEl0ZW1zO1xyXG4gICAgdGhpcy5yaWdodEl0ZW1zID0gW107XHJcblxyXG4gICAgY3VzdG9tRWxlbWVudEhlbHBlci5kaXNwYXRjaEV2ZW50KHRoaXMuZWxlbWVudCwgJ21vdmUtYWxsLWxlZnQtY2xpY2snLCB7fSk7XHJcbiAgfVxyXG5cclxuICBtb3ZlQWxsUmlnaHQoKSB7XHJcbiAgICBsZXQgYWxsSXRlbXMgPSB0aGlzLmxlZnRJdGVtcy5jb25jYXQodGhpcy5yaWdodEl0ZW1zKTtcclxuXHJcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgdGhpcy5yaWdodEl0ZW1zID0gYWxsSXRlbXM7XHJcbiAgICB0aGlzLmxlZnRJdGVtcyA9IFtdO1xyXG5cclxuICAgIGN1c3RvbUVsZW1lbnRIZWxwZXIuZGlzcGF0Y2hFdmVudCh0aGlzLmVsZW1lbnQsICdtb3ZlLWFsbC1yaWdodC1jbGljaycsIHt9KTtcclxuICB9XHJcblxyXG4gIF9hZGQodG9Db250YWluZXIsIGl0ZW0pIHtcclxuICAgIHRvQ29udGFpbmVyLnB1c2goaXRlbSk7XHJcbiAgfVxyXG5cclxuICBfcmVtb3ZlKGZyb21Db250YWluZXIsIGl0ZW0pIHtcclxuICAgIGxldCBpbmRleCA9IGZyb21Db250YWluZXIuZmluZEluZGV4KGkgPT4ge1xyXG4gICAgICByZXR1cm4gaSA9PT0gaXRlbTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCByZW1vdmVkSXRlbTtcclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIHJlbW92ZWRJdGVtID0gZnJvbUNvbnRhaW5lci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZW1vdmVkSXRlbVswXTtcclxuICB9XHJcblxyXG4gIF9zdWJzY3JpYmVUb0xlZnRJdGVtc0NvbGxlY3Rpb25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5fdW5zdWJzY3JpYmUodGhpcy5sZWZ0SXRlbXNDb2xsZWN0aW9uU3Vic2NyaXB0aW9uKTtcclxuXHJcbiAgICB0aGlzLmxlZnRJdGVtc0NvbGxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmJpbmRpbmdFbmdpbmVcclxuICAgICAgLmNvbGxlY3Rpb25PYnNlcnZlcih0aGlzLmxlZnRJdGVtcylcclxuICAgICAgLnN1YnNjcmliZShpdGVtcyA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZU1vdmVMZWZ0UmlnaHREaXNhYmxlZCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIF9zdWJzY3JpYmVUb1JpZ2h0SXRlbXNDb2xsZWN0aW9uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKHRoaXMucmlnaHRJdGVtc0NvbGxlY3Rpb25TdWJzY3JpcHRpb24pO1xyXG5cclxuICAgIHRoaXMucmlnaHRJdGVtc0NvbGxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmJpbmRpbmdFbmdpbmVcclxuICAgICAgLmNvbGxlY3Rpb25PYnNlcnZlcih0aGlzLnJpZ2h0SXRlbXMpXHJcbiAgICAgIC5zdWJzY3JpYmUoaXRlbXMgPT4ge1xyXG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVNb3ZlTGVmdFJpZ2h0RGlzYWJsZWQoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBfdW5zdWJzY3JpYmUoc3Vic2NyaXB0aW9uKSB7XHJcbiAgICBpZiAoc3Vic2NyaXB0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
