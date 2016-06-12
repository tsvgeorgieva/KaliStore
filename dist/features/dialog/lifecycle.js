System.register([], function (_export) {
  'use strict';

  _export('invokeLifecycle', invokeLifecycle);

  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9saWZlY3ljbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxXQUFTLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNyRCxRQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN4QyxVQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRW5DLFVBQUksTUFBTSxZQUFZLE9BQU8sRUFBRTtBQUM3QixlQUFPLE1BQU0sQ0FBQztPQUNmOztBQUVELFVBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQzNDLGVBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUNoQzs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7O0FBRUQsV0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzlCIiwiZmlsZSI6ImZlYXR1cmVzL2RpYWxvZy9saWZlY3ljbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaW52b2tlTGlmZWN5Y2xlKGluc3RhbmNlLCBuYW1lLCBtb2RlbCkge1xyXG4gIGlmICh0eXBlb2YgaW5zdGFuY2VbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGxldCByZXN1bHQgPSBpbnN0YW5jZVtuYW1lXShtb2RlbCk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzdWx0ICE9PSBudWxsICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
