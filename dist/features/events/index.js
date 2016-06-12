System.register(['./add-product-to-cart-event', './remove-product-from-cart-event', './order-complete'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config, callback) {
    if (typeof callback === 'function') {}
  }

  return {
    setters: [function (_addProductToCartEvent) {
      _export('AddProductToCartEvent', _addProductToCartEvent.AddProductToCartEvent);
    }, function (_removeProductFromCartEvent) {
      _export('RemoveProductFromCartEvent', _removeProductFromCartEvent.RemoveProductFromCartEvent);
    }, function (_orderComplete) {
      _export('OrderComplete', _orderComplete.OrderComplete);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2V2ZW50cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlPLFdBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDMUMsUUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsRUFDbkM7R0FDRjs7Ozs4REFQTyxxQkFBcUI7O3dFQUNyQiwwQkFBMEI7OzhDQUMxQixhQUFhIiwiZmlsZSI6ImZlYXR1cmVzL2V2ZW50cy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7QWRkUHJvZHVjdFRvQ2FydEV2ZW50fSBmcm9tICcuL2FkZC1wcm9kdWN0LXRvLWNhcnQtZXZlbnQnO1xyXG5leHBvcnQge1JlbW92ZVByb2R1Y3RGcm9tQ2FydEV2ZW50fSBmcm9tICcuL3JlbW92ZS1wcm9kdWN0LWZyb20tY2FydC1ldmVudCc7XHJcbmV4cG9ydCB7T3JkZXJDb21wbGV0ZX0gZnJvbSAnLi9vcmRlci1jb21wbGV0ZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZywgY2FsbGJhY2spIHtcclxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
