System.register(['./access-right'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config, callback) {
    if (typeof callback === 'function') {}
  }

  return {
    setters: [function (_accessRight) {
      _export('accessRight', _accessRight.accessRight);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VudW0vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFTyxXQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFFBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFLEVBQ25DO0dBQ0Y7Ozs7MENBTE8sV0FBVyIsImZpbGUiOiJmZWF0dXJlcy9lbnVtL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHthY2Nlc3NSaWdodH0gZnJvbSAnLi9hY2Nlc3MtcmlnaHQnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
