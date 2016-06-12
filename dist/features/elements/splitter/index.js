System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config, callback) {
    config.globalResources('./split-horizontal');
    config.globalResources('./split-vertical');

    if (typeof callback === 'function') {}
  }

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sV0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUMxQyxVQUFNLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDN0MsVUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUUzQyxRQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRSxFQUVuQztHQUNGIiwiZmlsZSI6ImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcygnLi9zcGxpdC1ob3Jpem9udGFsJyk7XHJcbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcygnLi9zcGxpdC12ZXJ0aWNhbCcpO1xyXG5cclxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAvL1RPRE9cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
