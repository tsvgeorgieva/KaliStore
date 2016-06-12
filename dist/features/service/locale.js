System.register([], function (_export) {
  'use strict';

  var Locale, LocaleRepository;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Locale = (function () {
        function Locale(defaults, data) {
          _classCallCheck(this, Locale);

          this.defaults = defaults;
          this.currentLocale = data;
        }

        _createClass(Locale, [{
          key: 'getValueFor',
          value: function getValueFor(identifier, category) {
            if (this.currentLocale && this.currentLocale[category]) {
              var currentLocaleSetting = this.currentLocale[category][identifier];
              if (currentLocaleSetting !== undefined && currentLocaleSetting !== null) {
                return currentLocaleSetting;
              }
            }
            if (this.defaults[category]) {
              var defaultSetting = this.defaults[category][identifier];
              if (defaultSetting !== undefined && defaultSetting !== null) {
                return defaultSetting;
              }
            }
            throw 'validation: I18N: Could not find: ' + identifier + ' in category: ' + category;
          }
        }, {
          key: 'setting',
          value: function setting(settingIdentifier) {
            return this.getValueFor(settingIdentifier, 'settings');
          }
        }, {
          key: 'translate',
          value: function translate(translationIdentifier, newValue, threshold) {
            var translation = this.getValueFor(translationIdentifier, 'messages');
            if (typeof translation === 'function') {
              return translation(newValue, threshold);
            }
            if (typeof translation === 'string') {
              return translation;
            }
            throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
          }
        }]);

        return Locale;
      })();

      _export('Locale', Locale);

      LocaleRepository = (function () {
        function LocaleRepository() {
          _classCallCheck(this, LocaleRepository);

          this['default'] = null;
          this.instances = new Map();
          this.defaults = {
            settings: {},
            messages: {}
          };
        }

        _createClass(LocaleRepository, [{
          key: 'load',
          value: function load(localeIdentifier, basePath) {
            var _this = this;

            if (!basePath) basePath = 'aurelia-custom-app-common-files/resources/';
            basePath = 'features/service/resources/';

            return new Promise(function (resolve, reject) {
              if (_this.instances.has(localeIdentifier)) {
                var locale = _this.instances.get(localeIdentifier);
                resolve(locale);
              } else {
                System['import'](basePath + localeIdentifier).then(function (resource) {
                  var locale = _this.addLocale(localeIdentifier, resource.data);
                  resolve(locale);
                });
              }
            });
          }
        }, {
          key: 'addLocale',
          value: function addLocale(localeIdentifier, data) {
            var instance = new Locale(this.defaults, data);
            this.instances.set(localeIdentifier, instance);
            if (this['default'] === null) {
              this['default'] = instance;
            }
            return instance;
          }
        }]);

        return LocaleRepository;
      })();

      Locale.Repository = new LocaleRepository();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvbG9jYWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUdhLE1BQU0sRUFzQ2IsZ0JBQWdCOzs7Ozs7Ozs7QUF0Q1QsWUFBTTtBQUNOLGlCQURBLE1BQU0sQ0FDTCxRQUFRLEVBQUUsSUFBSSxFQUFFO2dDQURqQixNQUFNOztBQUVmLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCOztxQkFKVSxNQUFNOztpQkFNTixxQkFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFO0FBQ2hDLGdCQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN0RCxrQkFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLGtCQUFJLG9CQUFvQixLQUFLLFNBQVMsSUFBSSxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7QUFDdkUsdUJBQU8sb0JBQW9CLENBQUM7ZUFDN0I7YUFDRjtBQUNELGdCQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDM0Isa0JBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDekQsa0JBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO0FBQzNELHVCQUFPLGNBQWMsQ0FBQztlQUN2QjthQUNGO0FBQ0Qsa0JBQU0sb0NBQW9DLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztXQUN2Rjs7O2lCQUVNLGlCQUFDLGlCQUFpQixFQUFFO0FBQ3pCLG1CQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7V0FDeEQ7OztpQkFFUSxtQkFBQyxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO0FBQ3BELGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtBQUNyQyxxQkFBTyxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pDO0FBQ0QsZ0JBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO0FBQ25DLHFCQUFPLFdBQVcsQ0FBQzthQUNwQjtBQUNELGtCQUFNLHlCQUF5QixHQUFHLHFCQUFxQixHQUFHLDhCQUE4QixDQUFDO1dBQzFGOzs7ZUFuQ1UsTUFBTTs7Ozs7QUFzQ2Isc0JBQWdCO0FBQ1QsaUJBRFAsZ0JBQWdCLEdBQ047Z0NBRFYsZ0JBQWdCOztBQUVsQixjQUFJLFdBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsY0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLGNBQUksQ0FBQyxRQUFRLEdBQUc7QUFDZCxvQkFBUSxFQUFFLEVBQUU7QUFDWixvQkFBUSxFQUFFLEVBQUU7V0FDYixDQUFDO1NBQ0g7O3FCQVJHLGdCQUFnQjs7aUJBVWhCLGNBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFOzs7QUFFL0IsZ0JBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLDRDQUE0QyxDQUFDO0FBQ3ZFLG9CQUFRLEdBQUcsNkJBQTZCLENBQUM7O0FBRXpDLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN0QyxrQkFBSSxNQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUN4QyxvQkFBSSxNQUFNLEdBQUcsTUFBSyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDbEQsdUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztlQUNqQixNQUFNO0FBQ0wsc0JBQU0sVUFBTyxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVEsRUFBSztBQUM1RCxzQkFBSSxNQUFNLEdBQUcsTUFBSyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdELHlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pCLENBQUMsQ0FBQztlQUNKO2FBQ0YsQ0FBQyxDQUFDO1dBQ0o7OztpQkFFUSxtQkFBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUU7QUFDaEMsZ0JBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0MsZ0JBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLGdCQUFJLElBQUksV0FBUSxLQUFLLElBQUksRUFBRTtBQUN6QixrQkFBSSxXQUFRLEdBQUcsUUFBUSxDQUFDO2FBQ3pCO0FBQ0QsbUJBQU8sUUFBUSxDQUFDO1dBQ2pCOzs7ZUFuQ0csZ0JBQWdCOzs7QUFzQ3RCLFlBQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3NlcnZpY2UvbG9jYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbW9zaGVuc2t5IG9uIDYvMTcvMTUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxlIHtcclxuICBjb25zdHJ1Y3RvcihkZWZhdWx0cywgZGF0YSkge1xyXG4gICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xyXG4gICAgdGhpcy5jdXJyZW50TG9jYWxlID0gZGF0YTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlRm9yKGlkZW50aWZpZXIsIGNhdGVnb3J5KSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50TG9jYWxlICYmIHRoaXMuY3VycmVudExvY2FsZVtjYXRlZ29yeV0pIHtcclxuICAgICAgbGV0IGN1cnJlbnRMb2NhbGVTZXR0aW5nID0gdGhpcy5jdXJyZW50TG9jYWxlW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcclxuICAgICAgaWYgKGN1cnJlbnRMb2NhbGVTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgY3VycmVudExvY2FsZVNldHRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudExvY2FsZVNldHRpbmc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XSkge1xyXG4gICAgICBsZXQgZGVmYXVsdFNldHRpbmcgPSB0aGlzLmRlZmF1bHRzW2NhdGVnb3J5XVtpZGVudGlmaWVyXTtcclxuICAgICAgaWYgKGRlZmF1bHRTZXR0aW5nICE9PSB1bmRlZmluZWQgJiYgZGVmYXVsdFNldHRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFNldHRpbmc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRocm93ICd2YWxpZGF0aW9uOiBJMThOOiBDb3VsZCBub3QgZmluZDogJyArIGlkZW50aWZpZXIgKyAnIGluIGNhdGVnb3J5OiAnICsgY2F0ZWdvcnk7XHJcbiAgfVxyXG5cclxuICBzZXR0aW5nKHNldHRpbmdJZGVudGlmaWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZUZvcihzZXR0aW5nSWRlbnRpZmllciwgJ3NldHRpbmdzJyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGUodHJhbnNsYXRpb25JZGVudGlmaWVyLCBuZXdWYWx1ZSwgdGhyZXNob2xkKSB7XHJcbiAgICBsZXQgdHJhbnNsYXRpb24gPSB0aGlzLmdldFZhbHVlRm9yKHRyYW5zbGF0aW9uSWRlbnRpZmllciwgJ21lc3NhZ2VzJyk7XHJcbiAgICBpZiAodHlwZW9mIHRyYW5zbGF0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2xhdGlvbihuZXdWYWx1ZSwgdGhyZXNob2xkKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2xhdGlvbjtcclxuICAgIH1cclxuICAgIHRocm93ICdWYWxpZGF0aW9uIG1lc3NhZ2UgZm9yICcgKyB0cmFuc2xhdGlvbklkZW50aWZpZXIgKyAnd2FzIGluIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCc7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBMb2NhbGVSZXBvc2l0b3J5IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZGVmYXVsdCA9IG51bGw7XHJcbiAgICB0aGlzLmluc3RhbmNlcyA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgIHNldHRpbmdzOiB7fSxcclxuICAgICAgbWVzc2FnZXM6IHt9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbG9hZChsb2NhbGVJZGVudGlmaWVyLCBiYXNlUGF0aCkge1xyXG4gICAgLy8gdG9kbzogZml4IHRoaXMgcGF0aCFcclxuICAgIGlmICghYmFzZVBhdGgpIGJhc2VQYXRoID0gJ2F1cmVsaWEtY3VzdG9tLWFwcC1jb21tb24tZmlsZXMvcmVzb3VyY2VzLyc7XHJcbiAgICBiYXNlUGF0aCA9ICdmZWF0dXJlcy9zZXJ2aWNlL3Jlc291cmNlcy8nO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmluc3RhbmNlcy5oYXMobG9jYWxlSWRlbnRpZmllcikpIHtcclxuICAgICAgICBsZXQgbG9jYWxlID0gdGhpcy5pbnN0YW5jZXMuZ2V0KGxvY2FsZUlkZW50aWZpZXIpO1xyXG4gICAgICAgIHJlc29sdmUobG9jYWxlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBTeXN0ZW0uaW1wb3J0KGJhc2VQYXRoICsgbG9jYWxlSWRlbnRpZmllcikudGhlbigocmVzb3VyY2UpID0+IHtcclxuICAgICAgICAgIGxldCBsb2NhbGUgPSB0aGlzLmFkZExvY2FsZShsb2NhbGVJZGVudGlmaWVyLCByZXNvdXJjZS5kYXRhKTtcclxuICAgICAgICAgIHJlc29sdmUobG9jYWxlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRMb2NhbGUobG9jYWxlSWRlbnRpZmllciwgZGF0YSkge1xyXG4gICAgbGV0IGluc3RhbmNlID0gbmV3IExvY2FsZSh0aGlzLmRlZmF1bHRzLCBkYXRhKTtcclxuICAgIHRoaXMuaW5zdGFuY2VzLnNldChsb2NhbGVJZGVudGlmaWVyLCBpbnN0YW5jZSk7XHJcbiAgICBpZiAodGhpcy5kZWZhdWx0ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdCA9IGluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gIH1cclxufVxyXG5cclxuTG9jYWxlLlJlcG9zaXRvcnkgPSBuZXcgTG9jYWxlUmVwb3NpdG9yeSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
