System.register(['./timespan', './base-model', './custom-element-helper'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia, configCallback) {}

  return {
    setters: [function (_timespan) {
      _export('Timespan', _timespan.Timespan);
    }, function (_baseModel) {
      _export('BaseModel', _baseModel.BaseModel);
    }, function (_customElementHelper) {
      _export('customElementHelper', _customElementHelper.customElementHelper);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS08sV0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUNsRDs7OztvQ0FOTyxRQUFROztzQ0FDUixTQUFTOzswREFDVCxtQkFBbUIiLCJmaWxlIjoiZmVhdHVyZXMvdXRpbHMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1RpbWVzcGFufSBmcm9tICcuL3RpbWVzcGFuJztcclxuZXhwb3J0IHtCYXNlTW9kZWx9IGZyb20gJy4vYmFzZS1tb2RlbCc7XHJcbmV4cG9ydCB7Y3VzdG9tRWxlbWVudEhlbHBlcn0gZnJvbSAnLi9jdXN0b20tZWxlbWVudC1oZWxwZXInO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYSwgY29uZmlnQ2FsbGJhY2spIHtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
