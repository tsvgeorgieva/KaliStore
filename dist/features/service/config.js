System.register(['./locale'], function (_export) {
  'use strict';

  var Locale, ConfigDefaults, Config;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_locale) {
      Locale = _locale.Locale;
    }],
    execute: function () {
      ConfigDefaults = function ConfigDefaults() {
        _classCallCheck(this, ConfigDefaults);
      };

      _export('ConfigDefaults', ConfigDefaults);

      ConfigDefaults._defaults = {
        locale: 'en-US',
        localeResources: 'service/resources/'
      };

      ConfigDefaults.defaults = function () {
        var defaults = {};
        Object.assign(defaults, ConfigDefaults._defaults);
        return defaults;
      };

      Config = (function () {
        function Config(innerConfig) {
          _classCallCheck(this, Config);

          this.innerConfig = innerConfig;
          this.values = this.innerConfig ? {} : ConfigDefaults.defaults();
          this.changedHandlers = new Map();
        }

        _createClass(Config, [{
          key: 'getValue',
          value: function getValue(identifier) {
            if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
              return this.values[identifier];
            }
            if (this.innerConfig !== null) {
              return this.innerConfig.getValue(identifier);
            }
            throw Error('Config not found: ' + identifier);
          }
        }, {
          key: 'setValue',
          value: function setValue(identifier, value) {
            this.values[identifier] = value;
            return this;
          }
        }, {
          key: 'onLocaleChanged',
          value: function onLocaleChanged(callback) {
            var _this = this;

            if (this.innerConfig !== undefined) {
              return this.innerConfig.onLocaleChanged(callback);
            } else {
              var _ret = (function () {
                var id = ++ValidationConfig.uniqueListenerId;
                _this.changedHandlers.set(id, callback);
                return {
                  v: function () {
                    _this.changedHandlers['delete'](id);
                  }
                };
              })();

              if (typeof _ret === 'object') return _ret.v;
            }
          }
        }, {
          key: 'getDependencies',
          value: function getDependencies() {
            return this.getValue('dependencies');
          }
        }, {
          key: 'setHttpService',
          value: function setHttpService(httpOpts) {
            Config.httpOpts = httpOpts;
          }
        }, {
          key: 'setLoggerService',
          value: function setLoggerService(loggerOpts) {
            Config.loggerOpts = loggerOpts;
          }
        }, {
          key: 'setWSService',
          value: function setWSService(wsOpts) {
            Config.wsOpts = wsOpts;
          }
        }, {
          key: 'routerAuthStep',
          value: function routerAuthStep(opts) {
            Config.routerAuthStepOpts = opts;
          }
        }, {
          key: 'useLocale',
          value: function useLocale(localeIdentifier) {
            this.setValue('locale', localeIdentifier);
            var callbacks = Array.from(this.changedHandlers.values());
            for (var i = 0; i < callbacks.length; i++) {
              callbacks[i]();
            }
            return this;
          }
        }, {
          key: 'locale',
          value: function locale() {
            return Locale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
          }
        }]);

        return Config;
      })();

      _export('Config', Config);

      Config.uniqueListenerId = 0;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztjQUthLGNBQWMsRUFjZCxNQUFNOzs7Ozs7Ozt1QkFoQlgsTUFBTTs7O0FBRUQsb0JBQWMsWUFBZCxjQUFjOzhCQUFkLGNBQWM7Ozs7O0FBRzNCLG9CQUFjLENBQUMsU0FBUyxHQUFHO0FBQ3pCLGNBQU0sRUFBRSxPQUFPO0FBQ2YsdUJBQWUsRUFBRSxvQkFBb0I7T0FDdEMsQ0FBQzs7QUFFRixvQkFBYyxDQUFDLFFBQVEsR0FBRyxZQUFXO0FBQ25DLFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixjQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEQsZUFBTyxRQUFRLENBQUM7T0FDakIsQ0FBQzs7QUFFVyxZQUFNO0FBQ04saUJBREEsTUFBTSxDQUNMLFdBQVcsRUFBRTtnQ0FEZCxNQUFNOztBQUVmLGNBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQy9CLGNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2hFLGNBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNsQzs7cUJBTFUsTUFBTTs7aUJBT1Qsa0JBQUMsVUFBVSxFQUFFO0FBQ25CLGdCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUM1RixxQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO0FBQ0QsZ0JBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDN0IscUJBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7QUFDRCxrQkFBTSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLENBQUM7V0FDaEQ7OztpQkFFTyxrQkFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFO0FBQzFCLGdCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNoQyxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2lCQUVjLHlCQUFDLFFBQVEsRUFBRTs7O0FBQ3hCLGdCQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO0FBQ2xDLHFCQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25ELE1BQU07O0FBQ0wsb0JBQUksRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7QUFDN0Msc0JBQUssZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkM7cUJBQU8sWUFBTTtBQUNYLDBCQUFLLGVBQWUsVUFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO21CQUNqQztrQkFBQzs7OzthQUNIO1dBQ0Y7OztpQkFFYywyQkFBRztBQUNoQixtQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1dBQ3RDOzs7aUJBRWEsd0JBQUMsUUFBUSxFQUFFO0FBQ3ZCLGtCQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztXQUM1Qjs7O2lCQUVlLDBCQUFDLFVBQVUsRUFBRTtBQUMzQixrQkFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7V0FDaEM7OztpQkFFVyxzQkFBQyxNQUFNLEVBQUU7QUFDbkIsa0JBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3hCOzs7aUJBRWEsd0JBQUMsSUFBSSxFQUFFO0FBQ25CLGtCQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1dBQ2xDOzs7aUJBRVEsbUJBQUMsZ0JBQWdCLEVBQUU7QUFDMUIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDMUMsZ0JBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzFELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6Qyx1QkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDaEI7QUFDRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2lCQUVLLGtCQUFHO0FBQ1AsbUJBQU8sTUFBTSxDQUFDLFVBQVUsQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7V0FDcEU7OztlQWxFVSxNQUFNOzs7OztBQXFFbkIsWUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE3LzE1LlxyXG4gKi9cclxuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4vbG9jYWxlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maWdEZWZhdWx0cyB7XHJcbn1cclxuXHJcbkNvbmZpZ0RlZmF1bHRzLl9kZWZhdWx0cyA9IHtcclxuICBsb2NhbGU6ICdlbi1VUycsXHJcbiAgbG9jYWxlUmVzb3VyY2VzOiAnc2VydmljZS9yZXNvdXJjZXMvJ1xyXG59O1xyXG5cclxuQ29uZmlnRGVmYXVsdHMuZGVmYXVsdHMgPSBmdW5jdGlvbigpIHtcclxuICBsZXQgZGVmYXVsdHMgPSB7fTtcclxuICBPYmplY3QuYXNzaWduKGRlZmF1bHRzLCBDb25maWdEZWZhdWx0cy5fZGVmYXVsdHMpO1xyXG4gIHJldHVybiBkZWZhdWx0cztcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKGlubmVyQ29uZmlnKSB7XHJcbiAgICB0aGlzLmlubmVyQ29uZmlnID0gaW5uZXJDb25maWc7XHJcbiAgICB0aGlzLnZhbHVlcyA9IHRoaXMuaW5uZXJDb25maWcgPyB7fSA6IENvbmZpZ0RlZmF1bHRzLmRlZmF1bHRzKCk7XHJcbiAgICB0aGlzLmNoYW5nZWRIYW5kbGVycyA9IG5ldyBNYXAoKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKGlkZW50aWZpZXIpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlcy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSAhPT0gbnVsbCAmJiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlubmVyQ29uZmlnICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLmdldFZhbHVlKGlkZW50aWZpZXIpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgRXJyb3IoJ0NvbmZpZyBub3QgZm91bmQ6ICcgKyBpZGVudGlmaWVyKTtcclxuICB9XHJcblxyXG4gIHNldFZhbHVlKGlkZW50aWZpZXIsIHZhbHVlKSB7XHJcbiAgICB0aGlzLnZhbHVlc1tpZGVudGlmaWVyXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7IC8vZmx1ZW50IEFQSVxyXG4gIH1cclxuXHJcbiAgb25Mb2NhbGVDaGFuZ2VkKGNhbGxiYWNrKSB7XHJcbiAgICBpZiAodGhpcy5pbm5lckNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlubmVyQ29uZmlnLm9uTG9jYWxlQ2hhbmdlZChjYWxsYmFjayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgaWQgPSArK1ZhbGlkYXRpb25Db25maWcudW5pcXVlTGlzdGVuZXJJZDtcclxuICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuc2V0KGlkLCBjYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkSGFuZGxlcnMuZGVsZXRlKGlkKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlcGVuZGVuY2llcygpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFZhbHVlKCdkZXBlbmRlbmNpZXMnKTtcclxuICB9XHJcblxyXG4gIHNldEh0dHBTZXJ2aWNlKGh0dHBPcHRzKSB7XHJcbiAgICBDb25maWcuaHR0cE9wdHMgPSBodHRwT3B0cztcclxuICB9XHJcblxyXG4gIHNldExvZ2dlclNlcnZpY2UobG9nZ2VyT3B0cykge1xyXG4gICAgQ29uZmlnLmxvZ2dlck9wdHMgPSBsb2dnZXJPcHRzO1xyXG4gIH1cclxuXHJcbiAgc2V0V1NTZXJ2aWNlKHdzT3B0cykge1xyXG4gICAgQ29uZmlnLndzT3B0cyA9IHdzT3B0cztcclxuICB9XHJcblxyXG4gIHJvdXRlckF1dGhTdGVwKG9wdHMpIHtcclxuICAgIENvbmZpZy5yb3V0ZXJBdXRoU3RlcE9wdHMgPSBvcHRzO1xyXG4gIH1cclxuXHJcbiAgdXNlTG9jYWxlKGxvY2FsZUlkZW50aWZpZXIpIHtcclxuICAgIHRoaXMuc2V0VmFsdWUoJ2xvY2FsZScsIGxvY2FsZUlkZW50aWZpZXIpO1xyXG4gICAgbGV0IGNhbGxiYWNrcyA9IEFycmF5LmZyb20odGhpcy5jaGFuZ2VkSGFuZGxlcnMudmFsdWVzKCkpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2FsbGJhY2tzW2ldKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGxvY2FsZSgpIHtcclxuICAgIHJldHVybiBMb2NhbGUuUmVwb3NpdG9yeVxyXG4gICAgICAubG9hZCh0aGlzLmdldFZhbHVlKCdsb2NhbGUnKSwgdGhpcy5nZXRWYWx1ZSgnbG9jYWxlUmVzb3VyY2VzJykpO1xyXG4gIH1cclxufVxyXG5cclxuQ29uZmlnLnVuaXF1ZUxpc3RlbmVySWQgPSAwO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
