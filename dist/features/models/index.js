System.register(['./user', './product'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config, callback) {
    if (typeof callback === 'function') {}
  }

  return {
    setters: [function (_user) {
      _export('User', _user.User);
    }, function (_product) {
      _export('Product', _product.Product);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL21vZGVscy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdPLFdBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDMUMsUUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsRUFDbkM7R0FDRjs7Ozs0QkFOTyxJQUFJOztrQ0FDSixPQUFPIiwiZmlsZSI6ImZlYXR1cmVzL21vZGVscy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7VXNlcn0gZnJvbSAnLi91c2VyJztcclxuZXhwb3J0IHtQcm9kdWN0fSBmcm9tICcuL3Byb2R1Y3QnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
