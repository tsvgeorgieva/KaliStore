System.register([], function (_export) {
  "use strict";

  var ListItem;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      ListItem = (function () {
        function ListItem(item, opts) {
          var _this = this;

          _classCallCheck(this, ListItem);

          this.item = item;
          this.text = item.text;
          this.view = item.view;
          this.viewModel = item.viewModel;

          this.icon = item.icon;
          this.expanded = item.expanded || false;
          this.selected = item.selected || false;
          this.hasChildren = Array.isArray(item.nodes) && item.nodes.length > 0;

          this.visible = true;
          this.nestedLevel = 0;

          Object.assign(this, opts);

          if (this.hasChildren) {
            this.children = item.nodes.map(function (itemData) {
              return new ListItem(itemData, {
                parent: _this,
                visible: _this.expanded,
                nestedLevel: _this.nestedLevel + 1,
                filter: _this.filter
              });
            });
          }

          if (this.expanded) {
            this.expand();
          }
        }

        _createClass(ListItem, [{
          key: "setFilter",
          value: function setFilter(filter) {
            this.filter = filter;
            this.applyFilter();
          }
        }, {
          key: "applyFilter",
          value: function applyFilter() {
            if (this.filter) {
              this.filtered = !this.filter(this.item);

              if (this.filtered === true) {
                this.collapse();
              }
            }
          }
        }, {
          key: "clearFilter",
          value: function clearFilter() {
            this.filtered = false;
          }
        }, {
          key: "getChildren",
          value: function getChildren() {
            return this.children || [];
          }
        }, {
          key: "toggleChildrenVisibility",
          value: function toggleChildrenVisibility(ev) {
            ev.stopPropagation();
            if (this.expanded) {
              this.collapse();
            } else {
              this.expand();
            }
          }
        }, {
          key: "setVisibleStatus",
          value: function setVisibleStatus(visible) {
            if (visible === false) {
              this.getChildren().forEach(function (c) {
                return c.setVisibleStatus(false);
              });
            } else if (this.expanded) {
              this.getChildren().forEach(function (c) {
                return c.setVisibleStatus(true);
              });
            }

            this.visible = visible;
          }
        }, {
          key: "expand",
          value: function expand() {
            this.expanded = true;
            this.getChildren().forEach(function (c) {
              return c.setVisibleStatus(true);
            });
            this.visible = true;
            if (this.parent) {
              this.parent.expand();
            }
          }
        }, {
          key: "collapse",
          value: function collapse() {
            this.expanded = false;
            this.getChildren().forEach(function (c) {
              return c.setVisibleStatus(false);
            });
          }
        }, {
          key: "setSelectedStatus",
          value: function setSelectedStatus(status) {
            this.selected = status;
            if (this.parent) {
              this.parent.expand();
            }
          }
        }]);

        return ListItem;
      })();

      _export("ListItem", ListItem);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RyZWUtdmlldy9saXN0LWl0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BQWEsUUFBUTs7Ozs7Ozs7O0FBQVIsY0FBUTtBQUNSLGlCQURBLFFBQVEsQ0FDUCxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7Z0NBRGIsUUFBUTs7QUFFakIsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3RCLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN0QixjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7O0FBRWhDLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN0QixjQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO0FBQ3ZDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7QUFDdkMsY0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBR3RFLGNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGNBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUVyQixnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTFCLGNBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNwQixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7cUJBQUksSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ2hFLHNCQUFNLE9BQU07QUFDWix1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c291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIExpc3RJdGVtIHtcclxuICBjb25zdHJ1Y3RvcihpdGVtLCBvcHRzKSB7XHJcbiAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgdGhpcy50ZXh0ID0gaXRlbS50ZXh0O1xyXG4gICAgdGhpcy52aWV3ID0gaXRlbS52aWV3O1xyXG4gICAgdGhpcy52aWV3TW9kZWwgPSBpdGVtLnZpZXdNb2RlbDtcclxuXHJcbiAgICB0aGlzLmljb24gPSBpdGVtLmljb247XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gaXRlbS5leHBhbmRlZCB8fCBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBpdGVtLnNlbGVjdGVkIHx8IGZhbHNlO1xyXG4gICAgdGhpcy5oYXNDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoaXRlbS5ub2RlcykgJiYgaXRlbS5ub2Rlcy5sZW5ndGggPiAwO1xyXG5cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5uZXN0ZWRMZXZlbCA9IDA7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5oYXNDaGlsZHJlbikge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuID0gaXRlbS5ub2Rlcy5tYXAoaXRlbURhdGEgPT4gbmV3IExpc3RJdGVtKGl0ZW1EYXRhLCB7XHJcbiAgICAgICAgcGFyZW50OiB0aGlzLFxyXG4gICAgICAgIHZpc2libGU6IHRoaXMuZXhwYW5kZWQsXHJcbiAgICAgICAgbmVzdGVkTGV2ZWw6IHRoaXMubmVzdGVkTGV2ZWwgKyAxLFxyXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXJcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XHJcbiAgICAgIHRoaXMuZXhwYW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRGaWx0ZXIoZmlsdGVyKSB7XHJcbiAgICB0aGlzLmZpbHRlciA9IGZpbHRlcjtcclxuICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVyKCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyZWQgPSAhdGhpcy5maWx0ZXIodGhpcy5pdGVtKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcmVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGVhckZpbHRlcigpIHtcclxuICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldENoaWxkcmVuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4gfHwgW107XHJcbiAgfVxyXG5cclxuICB0b2dnbGVDaGlsZHJlblZpc2liaWxpdHkoZXYpIHtcclxuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcclxuICAgICAgdGhpcy5jb2xsYXBzZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHBhbmQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFZpc2libGVTdGF0dXModmlzaWJsZSkge1xyXG4gICAgaWYgKHZpc2libGUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGMgPT4gYy5zZXRWaXNpYmxlU3RhdHVzKGZhbHNlKSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZXhwYW5kZWQpIHtcclxuICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLmZvckVhY2goYyA9PiBjLnNldFZpc2libGVTdGF0dXModHJ1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IHZpc2libGU7XHJcbiAgfVxyXG5cclxuICBleHBhbmQoKSB7XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGMgPT4gYy5zZXRWaXNpYmxlU3RhdHVzKHRydWUpKTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgdGhpcy5wYXJlbnQuZXhwYW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZSgpIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGMgPT4gYy5zZXRWaXNpYmxlU3RhdHVzKGZhbHNlKSk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZFN0YXR1cyhzdGF0dXMpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBzdGF0dXM7XHJcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgdGhpcy5wYXJlbnQuZXhwYW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
