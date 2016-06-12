System.register(['aurelia-framework', './split'], function (_export) {
  'use strict';

  var inject, customElement, bindable, useView, split, SplitVertical;

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
      SplitVertical = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(SplitVertical, [{
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

        function SplitVertical(element) {
          _classCallCheck(this, _SplitVertical);

          _defineDecoratedPropertyDescriptor(this, 'sizes', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'minSizes', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(SplitVertical, [{
          key: 'attached',
          value: function attached() {
            split(this.element.children, 'vertical', this.sizes, this.minSizes);
          }
        }], null, _instanceInitializers);

        var _SplitVertical = SplitVertical;
        SplitVertical = useView('./split-view.html')(SplitVertical) || SplitVertical;
        SplitVertical = inject(Element)(SplitVertical) || SplitVertical;
        SplitVertical = customElement('split-vertical')(SplitVertical) || SplitVertical;
        return SplitVertical;
      })();

      _export('SplitVertical', SplitVertical);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL3NwbGl0LXZlcnRpY2FsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1REFNYSxhQUFhOzs7Ozs7Ozs7O2lDQU5sQixNQUFNO3dDQUFFLGFBQWE7bUNBQUUsUUFBUTtrQ0FBRSxPQUFPOztxQkFDeEMsS0FBSzs7O0FBS0EsbUJBQWE7Ozs7OEJBQWIsYUFBYTs7dUJBQ3ZCLFFBQVE7Ozs7O3VCQUNSLFFBQVE7Ozs7O0FBRUUsaUJBSkEsYUFBYSxDQUlaLE9BQU8sRUFBRTs7Ozs7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7OEJBTlUsYUFBYTs7aUJBUWhCLG9CQUFHO0FBQ1QsaUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7V0FDckU7Ozs2QkFWVSxhQUFhO0FBQWIscUJBQWEsR0FEekIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQ2hCLGFBQWEsS0FBYixhQUFhO0FBQWIscUJBQWEsR0FGekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUVILGFBQWEsS0FBYixhQUFhO0FBQWIscUJBQWEsR0FIekIsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBR25CLGFBQWEsS0FBYixhQUFhO2VBQWIsYUFBYSIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9zcGxpdHRlci9zcGxpdC12ZXJ0aWNhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgdXNlVmlld30gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge3NwbGl0fSBmcm9tICcuL3NwbGl0JztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdzcGxpdC12ZXJ0aWNhbCcpXHJcbkBpbmplY3QoRWxlbWVudClcclxuQHVzZVZpZXcoJy4vc3BsaXQtdmlldy5odG1sJylcclxuZXhwb3J0IGNsYXNzIFNwbGl0VmVydGljYWwge1xyXG4gIEBiaW5kYWJsZSBzaXplcztcclxuICBAYmluZGFibGUgbWluU2l6ZXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hlZCgpIHtcclxuICAgIHNwbGl0KHRoaXMuZWxlbWVudC5jaGlsZHJlbiwgJ3ZlcnRpY2FsJywgdGhpcy5zaXplcywgdGhpcy5taW5TaXplcyk7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
