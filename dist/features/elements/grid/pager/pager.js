System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var bindable, customElement, Pager;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      customElement = _aureliaFramework.customElement;
    }],
    execute: function () {
      Pager = (function () {
        var _instanceInitializers = {};

        function Pager() {
          _classCallCheck(this, _Pager);

          _defineDecoratedPropertyDescriptor(this, 'onPageChanged', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'numToShow', _instanceInitializers);

          this.nextDisabled = false;
          this.prevDisabled = false;

          _defineDecoratedPropertyDescriptor(this, 'showFirstLastButtons', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'showJumpButtons', _instanceInitializers);

          this.page = 1;
          this.pageCount = 0;
          this.pages = [];
        }

        _createDecoratedClass(Pager, [{
          key: 'changePage',
          value: function changePage(page) {
            var oldPage = this.page;
            this.page = this.cap(page);
            if (oldPage !== this.page) {
              this.onPageChanged(this.page);
            }
          }
        }, {
          key: 'update',
          value: function update(page, pagesize, totalItems) {
            this.page = page;
            this.totalItems = totalItems;
            this.pageSize = pagesize;

            this.createPages();
          }
        }, {
          key: 'cap',
          value: function cap(page) {
            if (page < 1) {
              return 1;
            } else if (page > this.pageCount) {
              return this.pageCount;
            } else {
              return page;
            }
          }
        }, {
          key: 'createPages',
          value: function createPages() {
            this.pageCount = Math.ceil(this.totalItems / this.pageSize);
            this.page = this.cap(this.page);

            var numToRender = this.pageCount < this.numToShow ? this.pageCount : this.numToShow;

            var indicatorPosition = Math.ceil(numToRender / 2);

            var firstPageNumber = this.page - indicatorPosition + 1;

            if (firstPageNumber < 1) {
              firstPageNumber = 1;
            }

            var lastPageNumber = firstPageNumber + numToRender - 1;

            if (lastPageNumber > this.pageCount) {
              var dif = this.pageCount - lastPageNumber;

              firstPageNumber += dif;
              lastPageNumber += dif;
            }

            var pages = [];

            for (var i = firstPageNumber; i <= lastPageNumber; i++) {
              pages.push(i);
            }

            this.pages = pages;

            this.updateButtons();
          }
        }, {
          key: 'updateButtons',
          value: function updateButtons() {
            this.nextDisabled = this.page === this.pageCount;
            this.prevDisabled = this.page === 1;
          }
        }, {
          key: 'next',
          value: function next() {
            this.changePage(this.page + 1);
          }
        }, {
          key: 'nextJump',
          value: function nextJump() {
            this.changePage(this.page + this.numToShow);
          }
        }, {
          key: 'prev',
          value: function prev() {
            this.changePage(this.page - 1);
          }
        }, {
          key: 'prevJump',
          value: function prevJump() {
            this.changePage(this.page - this.numToShow);
          }
        }, {
          key: 'first',
          value: function first() {
            this.changePage(1);
          }
        }, {
          key: 'last',
          value: function last() {
            this.changePage(this.pageCount);
          }
        }, {
          key: 'onPageChanged',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'numToShow',
          decorators: [bindable],
          initializer: function initializer() {
            return 5;
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
        }], null, _instanceInitializers);

        var _Pager = Pager;
        Pager = customElement('pager')(Pager) || Pager;
        return Pager;
      })();

      _export('Pager', Pager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvcGFnZXIvcGFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OytCQUdhLEtBQUs7Ozs7Ozs7Ozs7bUNBSFYsUUFBUTt3Q0FBRSxhQUFhOzs7QUFHbEIsV0FBSzs7O2lCQUFMLEtBQUs7Ozs7Ozs7ZUFTaEIsWUFBWSxHQUFHLEtBQUs7ZUFDcEIsWUFBWSxHQUFHLEtBQUs7Ozs7OztlQU9wQixJQUFJLEdBQUcsQ0FBQztlQUNSLFNBQVMsR0FBRyxDQUFDO2VBRWIsS0FBSyxHQUFHLEVBQUU7Ozs4QkFwQkMsS0FBSzs7aUJBc0JOLG9CQUFDLElBQUksRUFBRTtBQUNmLGdCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQzFCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsZ0JBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDekIsa0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1dBQ0Y7OztpQkFHSyxnQkFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUNqQyxnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7QUFFekIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjs7O2lCQUVFLGFBQUMsSUFBSSxFQUFFO0FBQ1IsZ0JBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtBQUNaLHFCQUFPLENBQUMsQ0FBQzthQUNWLE1BQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNoQyxxQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3ZCLE1BQU07QUFDTCxxQkFBTyxJQUFJLENBQUM7YUFDYjtXQUNGOzs7aUJBRVUsdUJBQUc7QUFFWixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVELGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUdoQyxnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7QUFJcEYsZ0JBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBR25ELGdCQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixHQUFHLENBQUMsQ0FBQzs7QUFHeEQsZ0JBQUksZUFBZSxHQUFHLENBQUMsRUFBRTtBQUN2Qiw2QkFBZSxHQUFHLENBQUMsQ0FBQzthQUNyQjs7QUFJRCxnQkFBSSxjQUFjLEdBQUcsZUFBZSxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7O0FBSXZELGdCQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ25DLGtCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQzs7QUFFMUMsNkJBQWUsSUFBSSxHQUFHLENBQUM7QUFDdkIsNEJBQWMsSUFBSSxHQUFHLENBQUM7YUFDdkI7O0FBRUQsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFZixpQkFBSyxJQUFJLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0RCxtQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmOztBQUVELGdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsZ0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztXQUN0Qjs7O2lCQUVZLHlCQUFHO0FBQ2QsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2pELGdCQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO1dBQ3JDOzs7aUJBRUcsZ0JBQUc7QUFDTCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQ2hDOzs7aUJBRU8sb0JBQUc7QUFDVCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUM3Qzs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztXQUNoQzs7O2lCQUVPLG9CQUFHO0FBQ1QsZ0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7V0FDN0M7OztpQkFFSSxpQkFBRztBQUNOLGdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3BCOzs7aUJBRUcsZ0JBQUc7QUFDTCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7V0FDakM7Ozt1QkFySEEsUUFBUTs7Ozs7dUJBR1IsUUFBUTs7bUJBQWEsQ0FBQzs7Ozs7dUJBT3RCLFFBQVE7O21CQUF3QixJQUFJOzs7Ozt1QkFDcEMsUUFBUTs7bUJBQW1CLElBQUk7Ozs7O3FCQWRyQixLQUFLO0FBQUwsYUFBSyxHQURqQixhQUFhLENBQUMsT0FBTyxDQUFDLENBQ1YsS0FBSyxLQUFMLEtBQUs7ZUFBTCxLQUFLIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvcGFnZXIvcGFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2JpbmRhYmxlLCBjdXN0b21FbGVtZW50fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgncGFnZXInKVxyXG5leHBvcnQgY2xhc3MgUGFnZXIge1xyXG5cclxuICAvLyBDYWxsZWQgd2hlbiB0aGUgc2VsZWN0ZWQgcGFnZSBjaGFuZ2VzXHJcbiAgQGJpbmRhYmxlIG9uUGFnZUNoYW5nZWQ7XHJcblxyXG4gIC8vIE1heCBudW0gcGFnZXMgdG8gc2hvd1xyXG4gIEBiaW5kYWJsZSBudW1Ub1Nob3cgPSA1O1xyXG5cclxuICAvLyBEaXNhYmxlL2VuYWJsZVxyXG4gIG5leHREaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHByZXZEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBQYWdlciBidXR0b24gb3B0aW9uc1xyXG4gIEBiaW5kYWJsZSBzaG93Rmlyc3RMYXN0QnV0dG9ucyA9IHRydWU7XHJcbiAgQGJpbmRhYmxlIHNob3dKdW1wQnV0dG9ucyA9IHRydWU7XHJcblxyXG4gIC8vIFRvdGFsIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgZGF0YXNldFxyXG4gIHBhZ2UgPSAxO1xyXG4gIHBhZ2VDb3VudCA9IDA7XHJcblxyXG4gIHBhZ2VzID0gW107XHJcblxyXG4gIGNoYW5nZVBhZ2UocGFnZSkge1xyXG4gICAgY29uc3Qgb2xkUGFnZSA9IHRoaXMucGFnZTtcclxuICAgIHRoaXMucGFnZSA9IHRoaXMuY2FwKHBhZ2UpO1xyXG4gICAgaWYgKG9sZFBhZ2UgIT09IHRoaXMucGFnZSkge1xyXG4gICAgICB0aGlzLm9uUGFnZUNoYW5nZWQodGhpcy5wYWdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIENhbGxlZCB3aGVuIHRoZSBkYXRhIHNvdXJjZSBjaGFuZ2VzXHJcbiAgdXBkYXRlKHBhZ2UsIHBhZ2VzaXplLCB0b3RhbEl0ZW1zKSB7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG4gICAgdGhpcy50b3RhbEl0ZW1zID0gdG90YWxJdGVtcztcclxuICAgIHRoaXMucGFnZVNpemUgPSBwYWdlc2l6ZTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVBhZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBjYXAocGFnZSkge1xyXG4gICAgaWYgKHBhZ2UgPCAxKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID4gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFnZUNvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHBhZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQYWdlcygpIHtcclxuICAgIC8vIENhbGMgdGhlIG1heCBwYWdlIG51bWJlclxyXG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5wYWdlU2l6ZSk7XHJcbiAgICB0aGlzLnBhZ2UgPSB0aGlzLmNhcCh0aGlzLnBhZ2UpO1xyXG5cclxuICAgIC8vIENhcCB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHJlbmRlciBpZiB0aGUgY291bnQgaXMgbGVzcyB0aGFuIG51bWJlciB0byBzaG93IGF0IG9uY2VcclxuICAgIGxldCBudW1Ub1JlbmRlciA9IHRoaXMucGFnZUNvdW50IDwgdGhpcy5udW1Ub1Nob3cgPyB0aGlzLnBhZ2VDb3VudCA6IHRoaXMubnVtVG9TaG93O1xyXG5cclxuICAgIC8vIFRoZSBjdXJyZW50IHBhZ2Ugc2hvdWxkIHRyeSB0byBhcHBlYXIgaW4gdGhlIG1pZGRsZSwgc28gZ2V0IHRoZSBtZWRpYW4gXHJcbiAgICAvLyBvZiB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNob3cgYXQgb25jZSAtIHRoaXMgd2lsbCBiZSBvdXIgYWRqdXN0bWVudCBmYWN0b3JcclxuICAgIGxldCBpbmRpY2F0b3JQb3NpdGlvbiA9IE1hdGguY2VpbChudW1Ub1JlbmRlciAvIDIpO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHRoZSBwb3MgZnJvbSB0aGUgY3VycmVudCBwYWdlIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBub1xyXG4gICAgbGV0IGZpcnN0UGFnZU51bWJlciA9IHRoaXMucGFnZSAtIGluZGljYXRvclBvc2l0aW9uICsgMTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFnZSBpcyBsZXNzIHRoYW4gMSwgbWFrZSBpdCAxXHJcbiAgICBpZiAoZmlyc3RQYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICBmaXJzdFBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHJlbmRlclxyXG4gICAgLy8gcmVtZW1iZXIgdG8gc3VidHJhY3QgMSBhcyB0aGlzIHJlcHJlc2VudHMgdGhlIGZpcnN0IHBhZ2UgbnVtYmVyXHJcbiAgICBsZXQgbGFzdFBhZ2VOdW1iZXIgPSBmaXJzdFBhZ2VOdW1iZXIgKyBudW1Ub1JlbmRlciAtIDE7XHJcblxyXG4gICAgLy8gSWYgdGhlIGxhc3QgcGFnZSBpcyBncmVhdGVyIHRoYW4gdGhlIHBhZ2UgY291bnRcclxuICAgIC8vIGFkZCB0aGUgZGlmZmVyZW5jZSB0byB0aGUgZmlyc3QvbGFzdCBwYWdlXHJcbiAgICBpZiAobGFzdFBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICBsZXQgZGlmID0gdGhpcy5wYWdlQ291bnQgLSBsYXN0UGFnZU51bWJlcjtcclxuXHJcbiAgICAgIGZpcnN0UGFnZU51bWJlciArPSBkaWY7XHJcbiAgICAgIGxhc3RQYWdlTnVtYmVyICs9IGRpZjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFnZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gZmlyc3RQYWdlTnVtYmVyOyBpIDw9IGxhc3RQYWdlTnVtYmVyOyBpKyspIHtcclxuICAgICAgcGFnZXMucHVzaChpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBhZ2VzID0gcGFnZXM7XHJcblxyXG4gICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVCdXR0b25zKCkge1xyXG4gICAgdGhpcy5uZXh0RGlzYWJsZWQgPSB0aGlzLnBhZ2UgPT09IHRoaXMucGFnZUNvdW50O1xyXG4gICAgdGhpcy5wcmV2RGlzYWJsZWQgPSB0aGlzLnBhZ2UgPT09IDE7XHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMucGFnZSArIDEpO1xyXG4gIH1cclxuXHJcbiAgbmV4dEp1bXAoKSB7XHJcbiAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5wYWdlICsgdGhpcy5udW1Ub1Nob3cpO1xyXG4gIH1cclxuXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLnBhZ2UgLSAxKTtcclxuICB9XHJcblxyXG4gIHByZXZKdW1wKCkge1xyXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMucGFnZSAtIHRoaXMubnVtVG9TaG93KTtcclxuICB9XHJcblxyXG4gIGZpcnN0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2VQYWdlKDEpO1xyXG4gIH1cclxuXHJcbiAgbGFzdCgpIHtcclxuICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLnBhZ2VDb3VudCk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
