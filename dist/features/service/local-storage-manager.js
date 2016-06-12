System.register([], function (_export) {
  "use strict";

  var localStorageManager;
  return {
    setters: [],
    execute: function () {
      localStorageManager = {
        save: function save(key, data) {
          localStorage[key] = JSON.stringify(data);
        },

        get: function get(key) {
          var data = localStorage[key];
          if (data !== undefined) {
            return JSON.parse(data);
          }
        },

        has: function has(key) {
          var data = localStorage[key];
          return data !== undefined;
        },

        clear: function clear(key) {
          localStorage.removeItem(key);
        }
      };

      _export("localStorageManager", localStorageManager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvbG9jYWwtc3RvcmFnZS1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLG1CQUFtQjs7OztBQUFuQix5QkFBbUIsR0FBRztBQUNqQyxZQUFJLEVBQUUsY0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFLO0FBQ25CLHNCQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQzs7QUFFRCxXQUFHLEVBQUUsYUFBQyxHQUFHLEVBQUk7QUFDWCxjQUFNLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsY0FBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3RCLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDekI7U0FDRjs7QUFFRCxXQUFHLEVBQUUsYUFBQyxHQUFHLEVBQUs7QUFDWixjQUFNLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsaUJBQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztTQUMzQjs7QUFFRCxhQUFLLEVBQUUsZUFBQyxHQUFHLEVBQUk7QUFDYixzQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjtPQUNGIiwiZmlsZSI6ImZlYXR1cmVzL3NlcnZpY2UvbG9jYWwtc3RvcmFnZS1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGxvY2FsU3RvcmFnZU1hbmFnZXIgPSB7XHJcbiAgc2F2ZTogKGtleSwgZGF0YSkgPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlW2tleV0gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICB9LFxyXG5cclxuICBnZXQ6IChrZXkpPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZVtrZXldO1xyXG4gICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYXM6IChrZXkpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2Vba2V5XTtcclxuICAgIHJldHVybiBkYXRhICE9PSB1bmRlZmluZWQ7XHJcbiAgfSxcclxuXHJcbiAgY2xlYXI6IChrZXkpPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
