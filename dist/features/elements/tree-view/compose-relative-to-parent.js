System.register(['aurelia-framework', 'aurelia-pal'], function (_export) {
  'use strict';

  var TaskQueue, Container, inject, customAttribute, bindable, noView, CompositionEngine, ViewSlot, customElement, View, DOM, ComposeRelativeToParent;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      bindingContext: composer.bindingContext,
      overrideContext: composer.overrideContext,
      owningView: composer.owningView,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentController: composer.currentController
    });
  }

  function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function (controller) {
      composer.currentController = controller;
      composer.currentViewModel = controller ? controller.viewModel : null;
    });
  }
  return {
    setters: [function (_aureliaFramework) {
      TaskQueue = _aureliaFramework.TaskQueue;
      Container = _aureliaFramework.Container;
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      bindable = _aureliaFramework.bindable;
      noView = _aureliaFramework.noView;
      CompositionEngine = _aureliaFramework.CompositionEngine;
      ViewSlot = _aureliaFramework.ViewSlot;
      customElement = _aureliaFramework.customElement;
      View = _aureliaFramework.View;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }],
    execute: function () {
      ComposeRelativeToParent = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(ComposeRelativeToParent, [{
          key: 'model',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'view',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'viewModel',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function ComposeRelativeToParent(element, container, compositionEngine, viewSlot, taskQueue) {
          _classCallCheck(this, _ComposeRelativeToParent);

          _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'view', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'viewModel', _instanceInitializers);

          this.element = element;
          this.container = container;
          this.compositionEngine = compositionEngine;
          this.viewSlot = viewSlot;
          this.taskQueue = taskQueue;
          this.currentController = null;
          this.currentViewModel = null;
        }

        _createDecoratedClass(ComposeRelativeToParent, [{
          key: 'created',
          value: function created(owningView) {
            this.owningView = owningView;
          }
        }, {
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            this.viewResources = overrideContext.parentOverrideContext.bindingContext.viewResources;
            processInstruction(this, createInstruction(this, {
              view: this.view,
              viewModel: this.viewModel,
              model: this.model
            }));
          }
        }, {
          key: 'unbind',
          value: function unbind(bindingContext, overrideContext) {
            this.bindingContext = null;
            this.overrideContext = null;
            var returnToCache = true;
            var skipAnimation = true;
            this.viewSlot.removeAll(returnToCache, skipAnimation);
          }
        }], null, _instanceInitializers);

        var _ComposeRelativeToParent = ComposeRelativeToParent;
        ComposeRelativeToParent = inject(DOM.Element, Container, CompositionEngine, ViewSlot, TaskQueue)(ComposeRelativeToParent) || ComposeRelativeToParent;
        ComposeRelativeToParent = noView(ComposeRelativeToParent) || ComposeRelativeToParent;
        ComposeRelativeToParent = customElement('compose-relative-to-parent')(ComposeRelativeToParent) || ComposeRelativeToParent;
        return ComposeRelativeToParent;
      })();

      _export('ComposeRelativeToParent', ComposeRelativeToParent);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RyZWUtdmlldy9jb21wb3NlLXJlbGF0aXZlLXRvLXBhcmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OEhBYWEsdUJBQXVCOzs7Ozs7OztBQWdGcEMsV0FBUyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ2hELFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDaEMsb0JBQWMsRUFBRSxRQUFRLENBQUMsY0FBYztBQUN2QyxxQkFBZSxFQUFFLFFBQVEsQ0FBQyxlQUFlO0FBQ3pDLGdCQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7QUFDL0IsZUFBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQzdCLGNBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtBQUMzQixtQkFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO0FBQ3JDLHVCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7S0FDOUMsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsV0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ2pELFlBQVEsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDbkMsWUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLEVBQUk7QUFDakUsY0FBUSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztBQUN4QyxjQUFRLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3RFLENBQUMsQ0FBQztHQUNKOzs7b0NBOUdDLFNBQVM7b0NBQUUsU0FBUztpQ0FBRSxNQUFNOzBDQUFFLGVBQWU7bUNBQUUsUUFBUTtpQ0FBRSxNQUFNOzRDQUMvRCxpQkFBaUI7bUNBQUUsUUFBUTt3Q0FBRSxhQUFhOytCQUFFLElBQUk7O3dCQUcxQyxHQUFHOzs7QUFRRSw2QkFBdUI7Ozs7OEJBQXZCLHVCQUF1Qjs7dUJBT2pDLFFBQVE7Ozs7O3VCQU9SLFFBQVE7Ozs7O3VCQU9SLFFBQVE7Ozs7O0FBV0UsaUJBaENBLHVCQUF1QixDQWdDdEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFOzs7Ozs7Ozs7QUFDdEUsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsY0FBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDOUIsY0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUM5Qjs7OEJBeENVLHVCQUF1Qjs7aUJBK0MzQixpQkFBQyxVQUFVLEVBQUU7QUFDbEIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1dBQzlCOzs7aUJBUUcsY0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFO0FBQ3BDLGdCQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUNyQyxnQkFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7QUFDeEYsOEJBQWtCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUksRUFBRTtBQUMvQyxrQkFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ2YsdUJBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztBQUN6QixtQkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCLENBQUMsQ0FBQyxDQUFDO1dBQ0w7OztpQkFLSyxnQkFBQyxjQUFjLEVBQUUsZUFBZSxFQUFFO0FBQ3RDLGdCQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUMzQixnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDNUIsZ0JBQUksYUFBYSxHQUFHLElBQUksQ0FBQztBQUN6QixnQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLGdCQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7V0FDdkQ7Ozt1Q0E3RVUsdUJBQXVCO0FBQXZCLCtCQUF1QixHQURuQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUMxRCx1QkFBdUIsS0FBdkIsdUJBQXVCO0FBQXZCLCtCQUF1QixHQUZuQyxNQUFNLENBRU0sdUJBQXVCLEtBQXZCLHVCQUF1QjtBQUF2QiwrQkFBdUIsR0FIbkMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBRy9CLHVCQUF1QixLQUF2Qix1QkFBdUI7ZUFBdkIsdUJBQXVCIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL3RyZWUtdmlldy9jb21wb3NlLXJlbGF0aXZlLXRvLXBhcmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgVGFza1F1ZXVlLCBDb250YWluZXIsIGluamVjdCwgY3VzdG9tQXR0cmlidXRlLCBiaW5kYWJsZSwgbm9WaWV3LFxyXG4gIENvbXBvc2l0aW9uRW5naW5lLCBWaWV3U2xvdCwgY3VzdG9tRWxlbWVudCwgVmlld1xyXG59IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbmltcG9ydCB7RE9NfSBmcm9tICdhdXJlbGlhLXBhbCc7XHJcblxyXG4vKipcclxuKiBVc2VkIHRvIGNvbXBvc2UgYSBuZXcgdmlldyAvIHZpZXctbW9kZWwgdGVtcGxhdGUgb3IgYmluZCB0byBhbiBleGlzdGluZyBpbnN0YW5jZS5cclxuKi9cclxuQGN1c3RvbUVsZW1lbnQoJ2NvbXBvc2UtcmVsYXRpdmUtdG8tcGFyZW50JylcclxuQG5vVmlld1xyXG5AaW5qZWN0KERPTS5FbGVtZW50LCBDb250YWluZXIsIENvbXBvc2l0aW9uRW5naW5lLCBWaWV3U2xvdCwgVGFza1F1ZXVlKVxyXG5leHBvcnQgY2xhc3MgQ29tcG9zZVJlbGF0aXZlVG9QYXJlbnQge1xyXG4gIC8qKlxyXG4gICogTW9kZWwgdG8gYmluZCB0aGUgY3VzdG9tIGVsZW1lbnQgdG8uXHJcbiAgKlxyXG4gICogQHByb3BlcnR5IG1vZGVsXHJcbiAgKiBAdHlwZSB7Q3VzdG9tRWxlbWVudH1cclxuICAqL1xyXG4gIEBiaW5kYWJsZSBtb2RlbFxyXG4gIC8qKlxyXG4gICogVmlldyB0byBiaW5kIHRoZSBjdXN0b20gZWxlbWVudCB0by5cclxuICAqXHJcbiAgKiBAcHJvcGVydHkgdmlld1xyXG4gICogQHR5cGUge0h0bWxFbGVtZW50fVxyXG4gICovXHJcbiAgQGJpbmRhYmxlIHZpZXdcclxuICAvKipcclxuICAqIFZpZXctbW9kZWwgdG8gYmluZCB0aGUgY3VzdG9tIGVsZW1lbnQncyB0ZW1wbGF0ZSB0by5cclxuICAqXHJcbiAgKiBAcHJvcGVydHkgdmlld01vZGVsXHJcbiAgKiBAdHlwZSB7Q2xhc3N9XHJcbiAgKi9cclxuICBAYmluZGFibGUgdmlld01vZGVsXHJcblxyXG4gIC8qKlxyXG4gICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDb21wb3NlLlxyXG4gICogQHBhcmFtIGVsZW1lbnQgVGhlIENvbXBvc2UgZWxlbWVudC5cclxuICAqIEBwYXJhbSBjb250YWluZXIgVGhlIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGNvbnRhaW5lciBpbnN0YW5jZS5cclxuICAqIEBwYXJhbSBjb21wb3NpdGlvbkVuZ2luZSBDb21wb3NpdGlvbkVuZ2luZSBpbnN0YW5jZSB0byBjb21wb3NlIHRoZSBlbGVtZW50LlxyXG4gICogQHBhcmFtIHZpZXdTbG90IFRoZSBzbG90IHRoZSB2aWV3IGlzIGluamVjdGVkIGluIHRvLlxyXG4gICogQHBhcmFtIHZpZXdSZXNvdXJjZXMgQ29sbGVjdGlvbiBvZiByZXNvdXJjZXMgdXNlZCB0byBjb21waWxlIHRoZSB0aGUgdmlldy5cclxuICAqIEBwYXJhbSB0YXNrUXVldWUgVGhlIFRhc2tRdWV1ZSBpbnN0YW5jZS5cclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbnRhaW5lciwgY29tcG9zaXRpb25FbmdpbmUsIHZpZXdTbG90LCB0YXNrUXVldWUpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIHRoaXMuY29tcG9zaXRpb25FbmdpbmUgPSBjb21wb3NpdGlvbkVuZ2luZTtcclxuICAgIHRoaXMudmlld1Nsb3QgPSB2aWV3U2xvdDtcclxuICAgIHRoaXMudGFza1F1ZXVlID0gdGFza1F1ZXVlO1xyXG4gICAgdGhpcy5jdXJyZW50Q29udHJvbGxlciA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRWaWV3TW9kZWwgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBjcmVhdGVkLlxyXG4gICpcclxuICAqIEBwYXJhbSBvd25pbmdWaWV3IFRoZSB2aWV3IHRoYXQgdGhpcyBjb21wb25lbnQgd2FzIGNyZWF0ZWQgaW5zaWRlIG9mLlxyXG4gICovXHJcbiAgY3JlYXRlZChvd25pbmdWaWV3KSB7XHJcbiAgICB0aGlzLm93bmluZ1ZpZXcgPSBvd25pbmdWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBVc2VkIHRvIHNldCB0aGUgYmluZGluZ0NvbnRleHQuXHJcbiAgKlxyXG4gICogQHBhcmFtIGJpbmRpbmdDb250ZXh0IFRoZSBjb250ZXh0IGluIHdoaWNoIHRoZSB2aWV3IG1vZGVsIGlzIGV4ZWN1dGVkIGluLlxyXG4gICogQHBhcmFtIG92ZXJyaWRlQ29udGV4dCBUaGUgY29udGV4dCBpbiB3aGljaCB0aGUgdmlldyBtb2RlbCBpcyBleGVjdXRlZCBpbi5cclxuICAqL1xyXG4gIGJpbmQoYmluZGluZ0NvbnRleHQsIG92ZXJyaWRlQ29udGV4dCkge1xyXG4gICAgdGhpcy5iaW5kaW5nQ29udGV4dCA9IGJpbmRpbmdDb250ZXh0O1xyXG4gICAgdGhpcy5vdmVycmlkZUNvbnRleHQgPSBvdmVycmlkZUNvbnRleHQ7XHJcbiAgICB0aGlzLnZpZXdSZXNvdXJjZXMgPSBvdmVycmlkZUNvbnRleHQucGFyZW50T3ZlcnJpZGVDb250ZXh0LmJpbmRpbmdDb250ZXh0LnZpZXdSZXNvdXJjZXM7XHJcbiAgICBwcm9jZXNzSW5zdHJ1Y3Rpb24odGhpcywgY3JlYXRlSW5zdHJ1Y3Rpb24odGhpcywge1xyXG4gICAgICB2aWV3OiB0aGlzLnZpZXcsXHJcbiAgICAgIHZpZXdNb2RlbDogdGhpcy52aWV3TW9kZWwsXHJcbiAgICAgIG1vZGVsOiB0aGlzLm1vZGVsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFVuYmluZHMgdGhlIENvbXBvc2UuXHJcbiAgKi9cclxuICB1bmJpbmQoYmluZGluZ0NvbnRleHQsIG92ZXJyaWRlQ29udGV4dCkge1xyXG4gICAgdGhpcy5iaW5kaW5nQ29udGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLm92ZXJyaWRlQ29udGV4dCA9IG51bGw7XHJcbiAgICBsZXQgcmV0dXJuVG9DYWNoZSA9IHRydWU7XHJcbiAgICBsZXQgc2tpcEFuaW1hdGlvbiA9IHRydWU7XHJcbiAgICB0aGlzLnZpZXdTbG90LnJlbW92ZUFsbChyZXR1cm5Ub0NhY2hlLCBza2lwQW5pbWF0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc3RydWN0aW9uKGNvbXBvc2VyLCBpbnN0cnVjdGlvbikge1xyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGluc3RydWN0aW9uLCB7XHJcbiAgICBiaW5kaW5nQ29udGV4dDogY29tcG9zZXIuYmluZGluZ0NvbnRleHQsXHJcbiAgICBvdmVycmlkZUNvbnRleHQ6IGNvbXBvc2VyLm92ZXJyaWRlQ29udGV4dCxcclxuICAgIG93bmluZ1ZpZXc6IGNvbXBvc2VyLm93bmluZ1ZpZXcsXHJcbiAgICBjb250YWluZXI6IGNvbXBvc2VyLmNvbnRhaW5lcixcclxuICAgIHZpZXdTbG90OiBjb21wb3Nlci52aWV3U2xvdCxcclxuICAgIHZpZXdSZXNvdXJjZXM6IGNvbXBvc2VyLnZpZXdSZXNvdXJjZXMsXHJcbiAgICBjdXJyZW50Q29udHJvbGxlcjogY29tcG9zZXIuY3VycmVudENvbnRyb2xsZXJcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0luc3RydWN0aW9uKGNvbXBvc2VyLCBpbnN0cnVjdGlvbikge1xyXG4gIGNvbXBvc2VyLmN1cnJlbnRJbnN0cnVjdGlvbiA9IG51bGw7XHJcbiAgY29tcG9zZXIuY29tcG9zaXRpb25FbmdpbmUuY29tcG9zZShpbnN0cnVjdGlvbikudGhlbihjb250cm9sbGVyID0+IHtcclxuICAgIGNvbXBvc2VyLmN1cnJlbnRDb250cm9sbGVyID0gY29udHJvbGxlcjtcclxuICAgIGNvbXBvc2VyLmN1cnJlbnRWaWV3TW9kZWwgPSBjb250cm9sbGVyID8gY29udHJvbGxlci52aWV3TW9kZWwgOiBudWxsO1xyXG4gIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
