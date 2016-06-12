System.register(['aurelia-framework', './split'], function (_export) {
  'use strict';

  var inject, customElement, bindable, useView, split, SplitHorizontal;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      useView = _aureliaFramework.useView;
    }, function (_split) {
      split = _split.split;
    }],
    execute: function () {
      SplitHorizontal = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(SplitHorizontal, [{
          key: 'sizes',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'minSizes',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function SplitHorizontal(element) {
          _classCallCheck(this, _SplitHorizontal);

          _defineDecoratedPropertyDescriptor(this, 'sizes', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'minSizes', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(SplitHorizontal, [{
          key: 'attached',
          value: function attached() {
            split(this.element.children, 'horizontal', this.sizes, this.minSizes);
          }
        }], null, _instanceInitializers);

        var _SplitHorizontal = SplitHorizontal;
        SplitHorizontal = useView('./split-view.html')(SplitHorizontal) || SplitHorizontal;
        SplitHorizontal = inject(Element)(SplitHorizontal) || SplitHorizontal;
        SplitHorizontal = customElement('split-horizontal')(SplitHorizontal) || SplitHorizontal;
        return SplitHorizontal;
      })();

      _export('SplitHorizontal', SplitHorizontal);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL3NwbGl0LWhvcml6b250YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VEQU1hLGVBQWU7Ozs7Ozs7Ozs7aUNBTnBCLE1BQU07d0NBQUUsYUFBYTttQ0FBRSxRQUFRO2tDQUFFLE9BQU87O3FCQUN4QyxLQUFLOzs7QUFLQSxxQkFBZTs7Ozs4QkFBZixlQUFlOzt1QkFDekIsUUFBUTs7Ozs7dUJBQ1IsUUFBUTs7Ozs7QUFFRSxpQkFKQSxlQUFlLENBSWQsT0FBTyxFQUFFOzs7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOzs4QkFOVSxlQUFlOztpQkFRbEIsb0JBQUc7QUFDVCxpQkFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUN2RTs7OytCQVZVLGVBQWU7QUFBZix1QkFBZSxHQUQzQixPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FDaEIsZUFBZSxLQUFmLGVBQWU7QUFBZix1QkFBZSxHQUYzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBRUgsZUFBZSxLQUFmLGVBQWU7QUFBZix1QkFBZSxHQUgzQixhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FHckIsZUFBZSxLQUFmLGVBQWU7ZUFBZixlQUFlIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL3NwbGl0LWhvcml6b250YWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIHVzZVZpZXd9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtzcGxpdH0gZnJvbSAnLi9zcGxpdCc7XHJcblxyXG5AY3VzdG9tRWxlbWVudCgnc3BsaXQtaG9yaXpvbnRhbCcpXHJcbkBpbmplY3QoRWxlbWVudClcclxuQHVzZVZpZXcoJy4vc3BsaXQtdmlldy5odG1sJylcclxuZXhwb3J0IGNsYXNzIFNwbGl0SG9yaXpvbnRhbCB7XHJcbiAgQGJpbmRhYmxlIHNpemVzO1xyXG4gIEBiaW5kYWJsZSBtaW5TaXplcztcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgc3BsaXQodGhpcy5lbGVtZW50LmNoaWxkcmVuLCAnaG9yaXpvbnRhbCcsIHRoaXMuc2l6ZXMsIHRoaXMubWluU2l6ZXMpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
