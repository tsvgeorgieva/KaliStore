System.register([], function (_export) {
  "use strict";

  var BaseModel;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      BaseModel = (function () {
        function BaseModel() {
          _classCallCheck(this, BaseModel);

          this.isInEditMode = false;
          this.validation = undefined;
          this.bindingEngine = undefined;
          this._previousValues = {};
          this._subscriptions = [];
        }

        _createClass(BaseModel, [{
          key: "setEditMode",
          value: function setEditMode(edit) {
            this.isInEditMode = edit;

            if (edit) {
              this._previousValues = this.getOwnProperties();
            } else {
              this._previousValues = {};
            }
          }
        }, {
          key: "revertChanges",
          value: function revertChanges() {
            if (this.isInEditMode) {
              Object.assign(this, this._previousValues);
              this.setEditMode(false);
            }
          }
        }, {
          key: "getOwnProperties",
          value: function getOwnProperties() {
            var result = {};
            for (var prop in this) {
              if (this.hasOwnProperty(prop)) {
                result[prop] = this[prop];
              }
            }

            delete result.isInEditMode;
            delete result.validation;
            delete result._previousValues;

            return result;
          }
        }, {
          key: "subscribe",
          value: function subscribe(context, propertyName, callback) {
            var subscription = this.bindingEngine.propertyObserver(context, propertyName).subscribe(callback.bind(this));
            this._subscriptions.push(subscription);
          }
        }, {
          key: "unsubscribe",
          value: function unsubscribe() {
            this._subscriptions.forEach(function (subscription) {
              return subscription.dispose();
            });
          }
        }]);

        return BaseModel;
      })();

      _export("BaseModel", BaseModel);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL2Jhc2UtbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BR2EsU0FBUzs7Ozs7Ozs7O0FBQVQsZUFBUztBQUNULGlCQURBLFNBQVMsR0FDTjtnQ0FESCxTQUFTOztBQUVsQixjQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixjQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUM1QixjQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUMvQixjQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMxQixjQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztTQUMxQjs7cUJBUFUsU0FBUzs7aUJBU1QscUJBQUMsSUFBSSxFQUFFO0FBQ2hCLGdCQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7QUFFekIsZ0JBQUksSUFBSSxFQUFFO0FBQ1Isa0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDaEQsTUFBTTtBQUNMLGtCQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQzthQUMzQjtXQUNGOzs7aUJBRVkseUJBQUc7QUFDZCxnQkFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3JCLG9CQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUMsa0JBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7V0FDRjs7O2lCQUVlLDRCQUFHO0FBQ2pCLGdCQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsaUJBQUssSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQ3JCLGtCQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDN0Isc0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7ZUFDM0I7YUFDRjs7QUFFRCxtQkFBTyxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQzNCLG1CQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDekIsbUJBQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQzs7QUFFOUIsbUJBQU8sTUFBTSxDQUFDO1dBQ2Y7OztpQkFFUSxtQkFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRTtBQUN6QyxnQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQzFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1dBQ3hDOzs7aUJBRVUsdUJBQUc7QUFDWixnQkFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZO3FCQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7YUFBQSxDQUFDLENBQUM7V0FDckU7OztlQWpEVSxTQUFTIiwiZmlsZSI6ImZlYXR1cmVzL3V0aWxzL2Jhc2UtbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtb3NoZW5za3kgb24gNS8yNS8xNS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYXNlTW9kZWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pc0luRWRpdE1vZGUgPSBmYWxzZTtcclxuICAgIHRoaXMudmFsaWRhdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYmluZGluZ0VuZ2luZSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuX3ByZXZpb3VzVmFsdWVzID0ge307XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICBzZXRFZGl0TW9kZShlZGl0KSB7XHJcbiAgICB0aGlzLmlzSW5FZGl0TW9kZSA9IGVkaXQ7XHJcblxyXG4gICAgaWYgKGVkaXQpIHtcclxuICAgICAgdGhpcy5fcHJldmlvdXNWYWx1ZXMgPSB0aGlzLmdldE93blByb3BlcnRpZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3ByZXZpb3VzVmFsdWVzID0ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXZlcnRDaGFuZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuaXNJbkVkaXRNb2RlKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5fcHJldmlvdXNWYWx1ZXMpO1xyXG4gICAgICB0aGlzLnNldEVkaXRNb2RlKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE93blByb3BlcnRpZXMoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0ge307XHJcbiAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICByZXN1bHRbcHJvcF0gPSB0aGlzW3Byb3BdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIHJlc3VsdC5pc0luRWRpdE1vZGU7XHJcbiAgICBkZWxldGUgcmVzdWx0LnZhbGlkYXRpb247XHJcbiAgICBkZWxldGUgcmVzdWx0Ll9wcmV2aW91c1ZhbHVlcztcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlKGNvbnRleHQsIHByb3BlcnR5TmFtZSwgY2FsbGJhY2spIHtcclxuICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmJpbmRpbmdFbmdpbmUucHJvcGVydHlPYnNlcnZlcihjb250ZXh0LCBwcm9wZXJ0eU5hbWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoY2FsbGJhY2suYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24uZGlzcG9zZSgpKTtcclxuICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
