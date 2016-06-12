System.register(['aurelia-framework', 'aurelia-pal'], function (_export) {
  'use strict';

  var TaskQueue, Container, inject, customAttribute, bindable, CompositionEngine, ViewSlot, ViewResources, customElement, View, DOM, Popover;

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
      CompositionEngine = _aureliaFramework.CompositionEngine;
      ViewSlot = _aureliaFramework.ViewSlot;
      ViewResources = _aureliaFramework.ViewResources;
      customElement = _aureliaFramework.customElement;
      View = _aureliaFramework.View;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }],
    execute: function () {
      Popover = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Popover, [{
          key: 'title',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'content',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'placement',
          decorators: [bindable],
          initializer: function initializer() {
            return 'bottom';
          },
          enumerable: true
        }, {
          key: 'trigger',
          decorators: [bindable],
          initializer: function initializer() {
            return 'hover';
          },
          enumerable: true
        }, {
          key: 'disabled',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'view',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'width',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function Popover(element, container, compositionEngine, viewSlot, viewResources, taskQueue, dom) {
          _classCallCheck(this, _Popover);

          _defineDecoratedPropertyDescriptor(this, 'title', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'content', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'placement', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'trigger', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'view', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'width', _instanceInitializers);

          this.element = element;
          this.container = container;
          this.compositionEngine = compositionEngine;
          this.viewSlot = viewSlot;
          this.viewResources = viewResources;
          this.taskQueue = taskQueue;
          this.currentController = null;
          this.currentViewModel = null;
          this.dom = dom;

          this.isPopoverInitialized = false;

          this._trigger = this.trigger;
        }

        _createDecoratedClass(Popover, [{
          key: 'created',
          value: function created(owningView, myView) {
            this.owningView = owningView;
          }
        }, {
          key: 'bind',
          value: function bind(bindingContext, overrideContext) {
            this.checkContentAndView();
            this.checkPlacement();
            this.checkTrigger();

            this.popoverNode = this.dom.createElement('div');
            this.popoverNode.style.display = 'none';

            this.viewSlot = new ViewSlot(this.popoverNode, true, this);
            this.dom.appendNode(this.popoverNode);
            this.$element = $(this.element);

            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            processInstruction(this, createInstruction(this, {
              view: this.view,
              viewModel: this.viewModel,
              model: this.model
            }));
          }
        }, {
          key: 'attached',
          value: function attached() {
            if (this.disabled) {
              return;
            }

            this.checkPlacement();
            this.checkTrigger();
            this._reinit();
          }
        }, {
          key: 'detached',
          value: function detached() {
            this._dispose();
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
        }, {
          key: 'contentChanged',
          value: function contentChanged(newValue, oldValue) {
            this.checkContentAndView();
            this._reinit();
          }
        }, {
          key: 'viewChanged',
          value: function viewChanged() {
            this.checkContentAndView();
            this._reinit();
          }
        }, {
          key: 'titleChanged',
          value: function titleChanged(newValue, oldValue) {
            this._reinit();
          }
        }, {
          key: 'placementChanged',
          value: function placementChanged(newValue, oldValue) {
            this.checkPlacement();
            this._reinit();
          }
        }, {
          key: 'triggerChanged',
          value: function triggerChanged(newValue, oldValue) {
            this.checkTrigger();

            this._trigger = this.trigger === 'insideClick' ? 'manual' : this.trigger;

            this._reinit();
          }
        }, {
          key: '_reinit',
          value: function _reinit() {
            if (this.disabled) {
              return;
            }

            if (this.isPopoverInitialized === true) {
              this._dispose();
            }

            this._init();
            this.isPopoverInitialized = true;
          }
        }, {
          key: '_init',
          value: function _init() {
            var _this = this;

            if (this.trigger === 'insideClick') {
              this.$element.on('click', function () {
                _this.$element.popover('toggle');
              });

              this.popoverNode.onclick = function () {
                _this.$element.popover('hide');
              };
            } else {
              this.$element.off('click');
              this.popoverNode.onclick = null;
            }

            this.$element.popover(this._getOptions());

            if (this.width) {
              this.popoverNode.style.width = this.width + 'px';
            }
          }
        }, {
          key: '_dispose',
          value: function _dispose() {
            this.popoverNode.style.display = 'none';
            this.$element.popover('dispose');
            this.isPopoverInitialized = false;
          }
        }, {
          key: '_getOptions',
          value: function _getOptions() {
            return {
              content: this.popoverNode,
              title: this.title || '',
              placement: this.placement,
              trigger: this._trigger,
              container: 'body',
              html: true,
              template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + (this.title ? '<h3 class="popover-title"></h3>' : '') + (!this.content && !this.view ? '' : '<div class="popover-content"></div>') + '</div>'
            };
          }
        }, {
          key: 'checkPlacement',
          value: function checkPlacement() {
            switch (this.placement) {
              case 'top':
              case 'bottom':
              case 'left':
              case 'right':
                break;
              default:
                throw new Error('Invalid value for popover placement: ' + this.placement);
            }
          }
        }, {
          key: 'checkTrigger',
          value: function checkTrigger() {
            switch (this.trigger) {
              case 'click':
              case 'hover':
              case 'focus':
              case 'insideClick':
                break;
              default:
                throw new Error('Invalid value for popover trigger: ' + this.trigger);
            }
          }
        }, {
          key: 'checkContentAndView',
          value: function checkContentAndView() {
            if (this.content && this.view) {
              throw new Error('Popover cannot have content and view at the same time! Content: ' + this.content + '; View: ' + this.view);
            }
          }
        }], null, _instanceInitializers);

        var _Popover = Popover;
        Popover = inject(DOM.Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue, DOM)(Popover) || Popover;
        Popover = customAttribute('popover')(Popover) || Popover;
        return Popover;
      })();

      _export('Popover', Popover);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2F0dHJpYnV0ZXMvcG9wb3Zlci9wb3BvdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxSUFVYSxPQUFPOzs7Ozs7OztBQWlNcEIsV0FBUyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ2hELFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDaEMsb0JBQWMsRUFBRSxRQUFRLENBQUMsY0FBYztBQUN2QyxxQkFBZSxFQUFFLFFBQVEsQ0FBQyxlQUFlO0FBQ3pDLGdCQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7QUFDL0IsZUFBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQzdCLGNBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtBQUMzQixtQkFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO0FBQ3JDLHVCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7S0FDOUMsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsV0FBUyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ2pELFlBQVEsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDbkMsWUFBUSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLEVBQUk7QUFDakUsY0FBUSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztBQUN4QyxjQUFRLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3RFLENBQUMsQ0FBQztHQUNKOzs7b0NBNU5DLFNBQVM7b0NBQUUsU0FBUztpQ0FBRSxNQUFNOzBDQUFFLGVBQWU7bUNBQUUsUUFBUTs0Q0FDdkQsaUJBQWlCO21DQUFFLFFBQVE7d0NBQUUsYUFBYTt3Q0FBRSxhQUFhOytCQUFFLElBQUk7O3dCQUd6RCxHQUFHOzs7QUFLRSxhQUFPOzs7OzhCQUFQLE9BQU87O3VCQUNqQixRQUFROzs7Ozt1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QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUM5RSxPQUFPLEtBQVAsT0FBTztBQUFQLGVBQU8sR0FGbkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUVkLE9BQU8sS0FBUCxPQUFPO2VBQVAsT0FBTyIsImZpbGUiOiJmZWF0dXJlcy9hdHRyaWJ1dGVzL3BvcG92ZXIvcG9wb3Zlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgVGFza1F1ZXVlLCBDb250YWluZXIsIGluamVjdCwgY3VzdG9tQXR0cmlidXRlLCBiaW5kYWJsZSxcclxuICBDb21wb3NpdGlvbkVuZ2luZSwgVmlld1Nsb3QsIFZpZXdSZXNvdXJjZXMsIGN1c3RvbUVsZW1lbnQsIFZpZXdcclxufSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5pbXBvcnQge0RPTX0gZnJvbSAnYXVyZWxpYS1wYWwnO1xyXG5cclxuLy9Abm9WaWV3KClcclxuQGN1c3RvbUF0dHJpYnV0ZSgncG9wb3ZlcicpXHJcbkBpbmplY3QoRE9NLkVsZW1lbnQsIENvbnRhaW5lciwgQ29tcG9zaXRpb25FbmdpbmUsIFZpZXdTbG90LCBWaWV3UmVzb3VyY2VzLCBUYXNrUXVldWUsIERPTSlcclxuZXhwb3J0IGNsYXNzIFBvcG92ZXIge1xyXG4gIEBiaW5kYWJsZSB0aXRsZTtcclxuICBAYmluZGFibGUgY29udGVudDtcclxuICBAYmluZGFibGUgcGxhY2VtZW50ID0gJ2JvdHRvbSc7XHJcbiAgQGJpbmRhYmxlIHRyaWdnZXIgPSAnaG92ZXInO1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSB2aWV3O1xyXG4gIEBiaW5kYWJsZSB3aWR0aDtcclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29udGFpbmVyLCBjb21wb3NpdGlvbkVuZ2luZSwgdmlld1Nsb3QsIHZpZXdSZXNvdXJjZXMsIHRhc2tRdWV1ZSwgZG9tKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICB0aGlzLmNvbXBvc2l0aW9uRW5naW5lID0gY29tcG9zaXRpb25FbmdpbmU7XHJcbiAgICB0aGlzLnZpZXdTbG90ID0gdmlld1Nsb3Q7XHJcbiAgICB0aGlzLnZpZXdSZXNvdXJjZXMgPSB2aWV3UmVzb3VyY2VzO1xyXG4gICAgdGhpcy50YXNrUXVldWUgPSB0YXNrUXVldWU7XHJcbiAgICB0aGlzLmN1cnJlbnRDb250cm9sbGVyID0gbnVsbDtcclxuICAgIHRoaXMuY3VycmVudFZpZXdNb2RlbCA9IG51bGw7XHJcbiAgICB0aGlzLmRvbSA9IGRvbTtcclxuXHJcbiAgICB0aGlzLmlzUG9wb3ZlckluaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fdHJpZ2dlciA9IHRoaXMudHJpZ2dlcjtcclxuICB9XHJcblxyXG4gIGNyZWF0ZWQob3duaW5nVmlldywgbXlWaWV3KSB7XHJcbiAgICB0aGlzLm93bmluZ1ZpZXcgPSBvd25pbmdWaWV3O1xyXG4gIH1cclxuXHJcbiAgYmluZChiaW5kaW5nQ29udGV4dCwgb3ZlcnJpZGVDb250ZXh0KSB7XHJcbiAgICB0aGlzLmNoZWNrQ29udGVudEFuZFZpZXcoKTtcclxuICAgIHRoaXMuY2hlY2tQbGFjZW1lbnQoKTtcclxuICAgIHRoaXMuY2hlY2tUcmlnZ2VyKCk7XHJcblxyXG4gICAgdGhpcy5wb3BvdmVyTm9kZSA9IHRoaXMuZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5wb3BvdmVyTm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIHRoaXMudmlld1Nsb3QgPSBuZXcgVmlld1Nsb3QodGhpcy5wb3BvdmVyTm9kZSwgdHJ1ZSwgdGhpcyk7XHJcbiAgICB0aGlzLmRvbS5hcHBlbmROb2RlKHRoaXMucG9wb3Zlck5vZGUpO1xyXG4gICAgdGhpcy4kZWxlbWVudCA9ICQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLmJpbmRpbmdDb250ZXh0ID0gYmluZGluZ0NvbnRleHQ7XHJcbiAgICB0aGlzLm92ZXJyaWRlQ29udGV4dCA9IG92ZXJyaWRlQ29udGV4dDtcclxuICAgIHByb2Nlc3NJbnN0cnVjdGlvbih0aGlzLCBjcmVhdGVJbnN0cnVjdGlvbih0aGlzLCB7XHJcbiAgICAgIHZpZXc6IHRoaXMudmlldyxcclxuICAgICAgdmlld01vZGVsOiB0aGlzLnZpZXdNb2RlbCxcclxuICAgICAgbW9kZWw6IHRoaXMubW9kZWxcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGF0dGFjaGVkKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hlY2tQbGFjZW1lbnQoKTtcclxuICAgIHRoaXMuY2hlY2tUcmlnZ2VyKCk7XHJcbiAgICB0aGlzLl9yZWluaXQoKTtcclxuICB9XHJcblxyXG4gIGRldGFjaGVkKCkge1xyXG4gICAgdGhpcy5fZGlzcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgdW5iaW5kKGJpbmRpbmdDb250ZXh0LCBvdmVycmlkZUNvbnRleHQpIHtcclxuICAgIHRoaXMuYmluZGluZ0NvbnRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5vdmVycmlkZUNvbnRleHQgPSBudWxsO1xyXG4gICAgbGV0IHJldHVyblRvQ2FjaGUgPSB0cnVlO1xyXG4gICAgbGV0IHNraXBBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy52aWV3U2xvdC5yZW1vdmVBbGwocmV0dXJuVG9DYWNoZSwgc2tpcEFuaW1hdGlvbik7XHJcbiAgfVxyXG5cclxuICBjb250ZW50Q2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tDb250ZW50QW5kVmlldygpO1xyXG4gICAgdGhpcy5fcmVpbml0KCk7XHJcbiAgfVxyXG5cclxuICB2aWV3Q2hhbmdlZCgpIHtcclxuICAgIHRoaXMuY2hlY2tDb250ZW50QW5kVmlldygpO1xyXG4gICAgdGhpcy5fcmVpbml0KCk7XHJcbiAgfVxyXG5cclxuICB0aXRsZUNoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICB0aGlzLl9yZWluaXQoKTtcclxuICB9XHJcblxyXG4gIHBsYWNlbWVudENoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICB0aGlzLmNoZWNrUGxhY2VtZW50KCk7XHJcbiAgICB0aGlzLl9yZWluaXQoKTtcclxuICB9XHJcblxyXG4gIHRyaWdnZXJDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgdGhpcy5jaGVja1RyaWdnZXIoKTtcclxuXHJcbiAgICB0aGlzLl90cmlnZ2VyID0gdGhpcy50cmlnZ2VyID09PSAnaW5zaWRlQ2xpY2snID8gJ21hbnVhbCcgOiB0aGlzLnRyaWdnZXI7XHJcblxyXG4gICAgdGhpcy5fcmVpbml0KCk7XHJcbiAgfVxyXG5cclxuICBfcmVpbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzUG9wb3ZlckluaXRpYWxpemVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLmlzUG9wb3ZlckluaXRpYWxpemVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIF9pbml0KCkge1xyXG4gICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2luc2lkZUNsaWNrJykge1xyXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRlbGVtZW50LnBvcG92ZXIoJ3RvZ2dsZScpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucG9wb3Zlck5vZGUub25jbGljayA9ICgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWxlbWVudC5wb3BvdmVyKCdoaWRlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgIHRoaXMucG9wb3Zlck5vZGUub25jbGljayA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4kZWxlbWVudC5wb3BvdmVyKHRoaXMuX2dldE9wdGlvbnMoKSk7XHJcbiAgICAvL3RoaXMucG9wb3Zlck5vZGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBpZiAodGhpcy53aWR0aCkge1xyXG4gICAgICB0aGlzLnBvcG92ZXJOb2RlLnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGlzLiRlbGVtZW50LnBvcG92ZXIoJ3Nob3cnKTtcclxuICAgIC8vdGhpcy4kZWxlbWVudC5wb3BvdmVyKCdoaWRlJyk7XHJcbiAgfVxyXG5cclxuICBfZGlzcG9zZSgpIHtcclxuICAgIHRoaXMucG9wb3Zlck5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHRoaXMuJGVsZW1lbnQucG9wb3ZlcignZGlzcG9zZScpO1xyXG4gICAgdGhpcy5pc1BvcG92ZXJJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgX2dldE9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb250ZW50OiB0aGlzLnBvcG92ZXJOb2RlLFxyXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSB8fCAnJyxcclxuICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgdHJpZ2dlcjogdGhpcy5fdHJpZ2dlcixcclxuICAgICAgY29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGh0bWw6IHRydWUsXHJcbiAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3dcIj48L2Rpdj4nICtcclxuICAgICAgKHRoaXMudGl0bGUgPyAnPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+JyA6ICcnKSArXHJcbiAgICAgICgoIXRoaXMuY29udGVudCAmJiAhdGhpcy52aWV3KSA/ICcnIDogJzxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj4nKSArXHJcbiAgICAgICc8L2Rpdj4nXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY2hlY2tQbGFjZW1lbnQoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMucGxhY2VtZW50KSB7XHJcbiAgICBjYXNlICd0b3AnOlxyXG4gICAgY2FzZSAnYm90dG9tJzpcclxuICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAvL2Nhc2UgJ2F1dG8nOlxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcG9wb3ZlciBwbGFjZW1lbnQ6ICcgKyB0aGlzLnBsYWNlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja1RyaWdnZXIoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudHJpZ2dlcikge1xyXG4gICAgY2FzZSAnY2xpY2snOlxyXG4gICAgY2FzZSAnaG92ZXInOlxyXG4gICAgY2FzZSAnZm9jdXMnOlxyXG4gICAgY2FzZSAnaW5zaWRlQ2xpY2snOlxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcG9wb3ZlciB0cmlnZ2VyOiAnICsgdGhpcy50cmlnZ2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrQ29udGVudEFuZFZpZXcoKSB7XHJcbiAgICBpZiAodGhpcy5jb250ZW50ICYmIHRoaXMudmlldykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvcG92ZXIgY2Fubm90IGhhdmUgY29udGVudCBhbmQgdmlldyBhdCB0aGUgc2FtZSB0aW1lISBDb250ZW50OiAke3RoaXMuY29udGVudH07IFZpZXc6ICR7dGhpcy52aWV3fWApO1xyXG4gICAgICAvL30gZWxzZSBpZiAoIXRoaXMuY29udGVudCAmJiAhdGhpcy52aWV3KSB7XHJcbiAgICAgIC8vICB0aHJvdyBuZXcgRXJyb3IoYFBvcG92ZXIgc2hvdWxkIGhhdmUgY29udGVudCBvciB2aWV3ISBDb250ZW50OiAke3RoaXMuY29udGVudH07IFZpZXc6ICR7dGhpcy52aWV3fWApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUluc3RydWN0aW9uKGNvbXBvc2VyLCBpbnN0cnVjdGlvbikge1xyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGluc3RydWN0aW9uLCB7XHJcbiAgICBiaW5kaW5nQ29udGV4dDogY29tcG9zZXIuYmluZGluZ0NvbnRleHQsXHJcbiAgICBvdmVycmlkZUNvbnRleHQ6IGNvbXBvc2VyLm92ZXJyaWRlQ29udGV4dCxcclxuICAgIG93bmluZ1ZpZXc6IGNvbXBvc2VyLm93bmluZ1ZpZXcsXHJcbiAgICBjb250YWluZXI6IGNvbXBvc2VyLmNvbnRhaW5lcixcclxuICAgIHZpZXdTbG90OiBjb21wb3Nlci52aWV3U2xvdCxcclxuICAgIHZpZXdSZXNvdXJjZXM6IGNvbXBvc2VyLnZpZXdSZXNvdXJjZXMsXHJcbiAgICBjdXJyZW50Q29udHJvbGxlcjogY29tcG9zZXIuY3VycmVudENvbnRyb2xsZXJcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0luc3RydWN0aW9uKGNvbXBvc2VyLCBpbnN0cnVjdGlvbikge1xyXG4gIGNvbXBvc2VyLmN1cnJlbnRJbnN0cnVjdGlvbiA9IG51bGw7XHJcbiAgY29tcG9zZXIuY29tcG9zaXRpb25FbmdpbmUuY29tcG9zZShpbnN0cnVjdGlvbikudGhlbihjb250cm9sbGVyID0+IHtcclxuICAgIGNvbXBvc2VyLmN1cnJlbnRDb250cm9sbGVyID0gY29udHJvbGxlcjtcclxuICAgIGNvbXBvc2VyLmN1cnJlbnRWaWV3TW9kZWwgPSBjb250cm9sbGVyID8gY29udHJvbGxlci52aWV3TW9kZWwgOiBudWxsO1xyXG4gIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
