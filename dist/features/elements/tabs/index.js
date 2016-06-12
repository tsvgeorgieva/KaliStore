System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config, callback) {
    config.globalResources('./tabs');
    config.globalResources('./tab');

    if (typeof callback === 'function') {}
  }

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RhYnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxXQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFVBQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsVUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFaEMsUUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsRUFFbkM7R0FDRiIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy90YWJzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcygnLi90YWJzJyk7XHJcbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcygnLi90YWInKTtcclxuXHJcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgLy9UT0RPXHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
