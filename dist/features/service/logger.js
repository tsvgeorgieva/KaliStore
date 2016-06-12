System.register(['CodeSeven/toastr', './config'], function (_export) {
  'use strict';

  var toastr, Config, defaults, Logger;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function log(options) {
    var opts = Object.assign({}, defaults, options);

    if (opts.showToast) {
      toastr[opts.type](opts.message, opts.title);
    }
  }

  function sanitize(options, messageType) {
    if (typeof options === 'string' || options instanceof String) {
      return {
        message: options,
        type: messageType
      };
    }

    options.type = messageType;
    return options;
  }

  return {
    setters: [function (_CodeSevenToastr) {
      toastr = _CodeSevenToastr['default'];
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      defaults = {
        source: 'app',
        title: '',
        message: 'no message provided',
        data: '',
        showToast: true,
        type: 'info'
      };

      Logger = (function () {
        function Logger() {
          _classCallCheck(this, Logger);

          var defOpts = {
            closeButton: true,
            positionClass: 'toast-bottom-right',
            fadeOut: 1000
          };

          var configOptions = Config.loggerOpts || {};
          var options = Object.assign(toastr.options, defOpts, configOptions);
          toastr.options = options;
        }

        _createClass(Logger, [{
          key: 'warn',
          value: function warn(options) {
            log(sanitize(options, 'warning'));
          }
        }, {
          key: 'info',
          value: function info(options) {
            log(sanitize(options, 'info'));
          }
        }, {
          key: 'error',
          value: function error(options) {
            log(sanitize(options, 'error'));
          }
        }, {
          key: 'success',
          value: function success(options) {
            log(sanitize(options, 'success'));
          }
        }]);

        return Logger;
      })();

      _export('Logger', Logger);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztzQkFNTSxRQUFRLEVBOEJELE1BQU07Ozs7OztBQXJCbkIsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFHaEQsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0M7R0FDRjs7QUFFRCxXQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO0FBQ3RDLFFBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxNQUFNLEVBQUU7QUFDNUQsYUFBTztBQUNMLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLFlBQUksRUFBRSxXQUFXO09BQ2xCLENBQUM7S0FDSDs7QUFFRCxXQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztBQUMzQixXQUFPLE9BQU8sQ0FBQztHQUNoQjs7Ozs7O3VCQTlCTyxNQUFNOzs7QUFFUixjQUFRLEdBQUc7QUFDZixjQUFNLEVBQUUsS0FBSztBQUNiLGFBQUssRUFBRSxFQUFFO0FBQ1QsZUFBTyxFQUFFLHFCQUFxQjtBQUM5QixZQUFJLEVBQUUsRUFBRTtBQUNSLGlCQUFTLEVBQUUsSUFBSTtBQUNmLFlBQUksRUFBRSxNQUFNO09BQ2I7O0FBdUJZLFlBQU07QUFDTixpQkFEQSxNQUFNLEdBQ0g7Z0NBREgsTUFBTTs7QUFFZixjQUFJLE9BQU8sR0FBRztBQUNaLHVCQUFXLEVBQUUsSUFBSTtBQUNqQix5QkFBYSxFQUFFLG9CQUFvQjtBQUNuQyxtQkFBTyxFQUFFLElBQUk7V0FDZCxDQUFDOztBQUVGLGNBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0FBQzVDLGNBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDcEUsZ0JBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQzFCOztxQkFYVSxNQUFNOztpQkFhYixjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDbkM7OztpQkFFRyxjQUFDLE9BQU8sRUFBRTtBQUNaLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7V0FDaEM7OztpQkFFSSxlQUFDLE9BQU8sRUFBRTtBQUNiLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7V0FDakM7OztpQkFFTSxpQkFBQyxPQUFPLEVBQUU7QUFDZixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQ25DOzs7ZUEzQlUsTUFBTSIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2xvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1vc2hlbnNreSBvbiA2LzE2LzE1LlxyXG4gKi9cclxuaW1wb3J0IHRvYXN0ciBmcm9tICdDb2RlU2V2ZW4vdG9hc3RyJztcclxuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29uZmlnJztcclxuXHJcbmNvbnN0IGRlZmF1bHRzID0ge1xyXG4gIHNvdXJjZTogJ2FwcCcsXHJcbiAgdGl0bGU6ICcnLFxyXG4gIG1lc3NhZ2U6ICdubyBtZXNzYWdlIHByb3ZpZGVkJyxcclxuICBkYXRhOiAnJyxcclxuICBzaG93VG9hc3Q6IHRydWUsXHJcbiAgdHlwZTogJ2luZm8nXHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2cob3B0aW9ucykge1xyXG4gIGxldCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gIC8vc3lzdGVtLmxvZyhvcG5zLnNvdXJjZSArICcsICcgKyBvcG5zLnR5cGUgKyAnLCAnICsgb3Bucy5tZXNzYWdlICsgJywgJyArIG9wbnMuZGF0YSArICcgJyk7XHJcblxyXG4gIGlmIChvcHRzLnNob3dUb2FzdCkge1xyXG4gICAgdG9hc3RyW29wdHMudHlwZV0ob3B0cy5tZXNzYWdlLCBvcHRzLnRpdGxlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhbml0aXplKG9wdGlvbnMsIG1lc3NhZ2VUeXBlKSB7XHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyB8fCBvcHRpb25zIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiBvcHRpb25zLFxyXG4gICAgICB0eXBlOiBtZXNzYWdlVHlwZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9wdGlvbnMudHlwZSA9IG1lc3NhZ2VUeXBlO1xyXG4gIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGxldCBkZWZPcHRzID0ge1xyXG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LWJvdHRvbS1yaWdodCcsXHJcbiAgICAgIGZhZGVPdXQ6IDEwMDBcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbmZpZ09wdGlvbnMgPSBDb25maWcubG9nZ2VyT3B0cyB8fCB7fTtcclxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih0b2FzdHIub3B0aW9ucywgZGVmT3B0cywgY29uZmlnT3B0aW9ucyk7XHJcbiAgICB0b2FzdHIub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICB3YXJuKG9wdGlvbnMpIHtcclxuICAgIGxvZyhzYW5pdGl6ZShvcHRpb25zLCAnd2FybmluZycpKTtcclxuICB9XHJcblxyXG4gIGluZm8ob3B0aW9ucykge1xyXG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdpbmZvJykpO1xyXG4gIH1cclxuXHJcbiAgZXJyb3Iob3B0aW9ucykge1xyXG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdlcnJvcicpKTtcclxuICB9XHJcblxyXG4gIHN1Y2Nlc3Mob3B0aW9ucykge1xyXG4gICAgbG9nKHNhbml0aXplKG9wdGlvbnMsICdzdWNjZXNzJykpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
