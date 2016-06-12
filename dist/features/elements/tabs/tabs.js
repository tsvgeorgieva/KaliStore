System.register(['aurelia-framework', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, useView, children, customElementHelper, Tabs;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      useView = _aureliaFramework.useView;
      children = _aureliaFramework.children;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Tabs = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Tabs, [{
          key: 'tabs',
          decorators: [children('tab')],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Tabs(element) {
          _classCallCheck(this, _Tabs);

          _defineDecoratedPropertyDescriptor(this, 'tabs', _instanceInitializers);

          this.activeTab = undefined;

          this.element = element;
          var scrollAttr = element.attributes.getNamedItem('scroll');
          if (scrollAttr !== null) {
            this.topShiftInPixels = scrollAttr.nodeValue;
            element.style.display = 'block';
            element.style.height = 'calc(100% - ' + this.topShiftInPixels + 'px)';
          }
        }

        _createDecoratedClass(Tabs, [{
          key: 'attached',
          value: function attached() {
            if (this.topShiftInPixels !== undefined) {
              this.tabs.forEach(function (tab) {
                tab.setInnerScroll();
              });
            }
          }
        }, {
          key: 'bind',
          value: function bind() {
            var _this = this;

            this.tabs.forEach(function (tab) {
              if (tab.active) {
                _this.activeTab = tab;
              }

              tab.hide();
            });

            this.activeTab.show();
          }
        }, {
          key: 'onTabClick',
          value: function onTabClick(tab) {
            customElementHelper.dispatchEvent(this.element, 'change', {
              tab: tab,
              test: 'baba'
            });

            this.activeTab.hide();

            tab.show();
            this.activeTab = tab;
          }
        }], null, _instanceInitializers);

        var _Tabs = Tabs;
        Tabs = inject(Element)(Tabs) || Tabs;
        Tabs = customElement('tabs')(Tabs) || Tabs;
        return Tabs;
      })();

      _export('Tabs', Tabs);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RhYnMvdGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7K0VBS2EsSUFBSTs7Ozs7Ozs7OztpQ0FMVCxNQUFNO3dDQUFFLGFBQWE7bUNBQUUsUUFBUTtrQ0FBRSxPQUFPO21DQUFFLFFBQVE7O21DQUNsRCxtQkFBbUI7OztBQUlkLFVBQUk7Ozs7OEJBQUosSUFBSTs7dUJBQ2QsUUFBUSxDQUFDLEtBQUssQ0FBQzs7bUJBQVEsRUFBRTs7Ozs7QUFJZixpQkFMQSxJQUFJLENBS0gsT0FBTyxFQUFFOzs7OztlQUZyQixTQUFTLEdBQUcsU0FBUzs7QUFHbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0QsY0FBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQ3ZCLGdCQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztBQUM3QyxtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ2hDLG1CQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sb0JBQWtCLElBQUksQ0FBQyxnQkFBZ0IsUUFBSyxDQUFDO1dBQ2xFO1NBQ0Y7OzhCQWJVLElBQUk7O2lCQWVQLG9CQUFHO0FBQ1QsZ0JBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtBQUN2QyxrQkFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDdkIsbUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztlQUN0QixDQUFDLENBQUM7YUFDSjtXQUNGOzs7aUJBRUcsZ0JBQUc7OztBQUNMLGdCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUN2QixrQkFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO0FBQ2Qsc0JBQUssU0FBUyxHQUFHLEdBQUcsQ0FBQztlQUN0Qjs7QUFFRCxpQkFBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1osQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3ZCOzs7aUJBRVMsb0JBQUMsR0FBRyxFQUFFO0FBQ2QsK0JBQW1CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQ3hELGlCQUFHLEVBQUUsR0FBRztBQUNSLGtCQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFdEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1dBQ3RCOzs7b0JBN0NVLElBQUk7QUFBSixZQUFJLEdBRGhCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxJQUFJLEtBQUosSUFBSTtBQUFKLFlBQUksR0FGaEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUVULElBQUksS0FBSixJQUFJO2VBQUosSUFBSSIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy90YWJzL3RhYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIHVzZVZpZXcsIGNoaWxkcmVufSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7Y3VzdG9tRWxlbWVudEhlbHBlcn0gZnJvbSAndXRpbHMnO1xyXG5cclxuQGN1c3RvbUVsZW1lbnQoJ3RhYnMnKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBUYWJzICB7XHJcbiAgQGNoaWxkcmVuKCd0YWInKSB0YWJzID0gW107XHJcblxyXG4gIGFjdGl2ZVRhYiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIGNvbnN0IHNjcm9sbEF0dHIgPSBlbGVtZW50LmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKCdzY3JvbGwnKTtcclxuICAgIGlmIChzY3JvbGxBdHRyICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMudG9wU2hpZnRJblBpeGVscyA9IHNjcm9sbEF0dHIubm9kZVZhbHVlO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IGBjYWxjKDEwMCUgLSAke3RoaXMudG9wU2hpZnRJblBpeGVsc31weClgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoZWQoKSB7XHJcbiAgICBpZiAodGhpcy50b3BTaGlmdEluUGl4ZWxzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy50YWJzLmZvckVhY2godGFiID0+IHtcclxuICAgICAgICB0YWIuc2V0SW5uZXJTY3JvbGwoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiaW5kKCkge1xyXG4gICAgdGhpcy50YWJzLmZvckVhY2godGFiID0+IHtcclxuICAgICAgaWYgKHRhYi5hY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFiLmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlVGFiLnNob3coKTtcclxuICB9XHJcblxyXG4gIG9uVGFiQ2xpY2sodGFiKSB7XHJcbiAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCAnY2hhbmdlJywge1xyXG4gICAgICB0YWI6IHRhYixcclxuICAgICAgdGVzdDogJ2JhYmEnXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVRhYi5oaWRlKCk7XHJcblxyXG4gICAgdGFiLnNob3coKTtcclxuICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiO1xyXG4gIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
