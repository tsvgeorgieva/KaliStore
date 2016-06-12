System.register(['aurelia-framework', 'aurelia-event-aggregator', './event/user-logged-in-event', './event/user-logged-out-event', 'repository', './local-storage-manager'], function (_export) {
  'use strict';

  var inject, EventAggregator, UserLoggedInEvent, UserLoggedOutEvent, UsersRepository, localStorageManager, currentUserKey, Session;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_eventUserLoggedInEvent) {
      UserLoggedInEvent = _eventUserLoggedInEvent.UserLoggedInEvent;
    }, function (_eventUserLoggedOutEvent) {
      UserLoggedOutEvent = _eventUserLoggedOutEvent.UserLoggedOutEvent;
    }, function (_repository) {
      UsersRepository = _repository.UsersRepository;
    }, function (_localStorageManager) {
      localStorageManager = _localStorageManager.localStorageManager;
    }],
    execute: function () {
      currentUserKey = 'currentUser';

      Session = (function () {
        function Session(eventAggregator, usersRepository) {
          _classCallCheck(this, _Session);

          this.eventAggregator = eventAggregator;
          this.usersRepository = usersRepository;

          this.initUserData();

          if (this.userRemembered()) {
            this.restoreData();
          }
        }

        _createClass(Session, [{
          key: 'initUserData',
          value: function initUserData() {
            this.user = {};
            this.userAccessRights = [];

            this.isLoggedIn = false;
            this.isBusy = false;
          }
        }, {
          key: 'loginUser',
          value: function loginUser(userId) {
            this.user = this.usersRepository.get(userId);
            localStorageManager.save(currentUserKey, this.user);
            this.restoreData();
          }
        }, {
          key: 'logoutUser',
          value: function logoutUser() {
            localStorageManager.clear(currentUserKey);
            this.initUserData();
            this.eventAggregator.publish(new UserLoggedOutEvent());
          }
        }, {
          key: 'userHasAccessRight',
          value: function userHasAccessRight(requiredAccessRight) {
            return this.userAccessRights[requiredAccessRight] === true;
          }
        }, {
          key: 'userHasAllAccessRights',
          value: function userHasAllAccessRights(requiredAccessRights) {
            var _this = this;

            return requiredAccessRights.every(function (accessRight) {
              return _this.userHasAccessRight(accessRight);
            });
          }
        }, {
          key: 'isUserLoggedIn',
          value: function isUserLoggedIn() {
            return this.isLoggedIn === true;
          }
        }, {
          key: 'userRemembered',
          value: function userRemembered() {
            return localStorageManager.has(currentUserKey);
          }
        }, {
          key: 'restoreData',
          value: function restoreData(data) {
            data = data || localStorageManager.get(currentUserKey);

            this.user = data;
            this.userAccessRights = this._reduceToHash(data.userAccessRights);

            this.isLoggedIn = true;
            this.eventAggregator.publish(new UserLoggedInEvent());
          }
        }, {
          key: 'getUserName',
          value: function getUserName() {
            return this.user.userName;
          }
        }, {
          key: 'getUserId',
          value: function getUserId() {
            return this.user.id;
          }
        }, {
          key: '_reduceToHash',
          value: function _reduceToHash(array) {
            return array.reduce(function (hash, item) {
              hash[item] = true;
              return hash;
            }, {});
          }
        }]);

        var _Session = Session;
        Session = inject(EventAggregator, UsersRepository)(Session) || Session;
        return Session;
      })();

      _export('Session', Session);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2Uvc2Vzc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NEdBT00sY0FBYyxFQUdQLE9BQU87Ozs7Ozs7O2lDQVZaLE1BQU07O2dEQUNOLGVBQWU7O2tEQUNmLGlCQUFpQjs7b0RBQ2pCLGtCQUFrQjs7b0NBQ2xCLGVBQWU7O2lEQUNmLG1CQUFtQjs7O0FBRXJCLG9CQUFjLEdBQUcsYUFBYTs7QUFHdkIsYUFBTztBQUVQLGlCQUZBLE9BQU8sQ0FFTixlQUFlLEVBQUUsZUFBZSxFQUFFOzs7QUFDNUMsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdkMsY0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7O0FBRXZDLGNBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7QUFFcEIsY0FBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjtTQUNGOztxQkFYVSxPQUFPOztpQkFhTix3QkFBRztBQUNiLGdCQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNmLGdCQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDOztBQUUzQixnQkFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1dBQ3JCOzs7aUJBRVEsbUJBQUMsTUFBTSxFQUFFO0FBQ2hCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLCtCQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BELGdCQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7V0FDcEI7OztpQkFFUyxzQkFBRztBQUNYLCtCQUFtQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQyxnQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BCLGdCQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztXQUN4RDs7O2lCQUVpQiw0QkFBQyxtQkFBbUIsRUFBRTtBQUN0QyxtQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLENBQUM7V0FDNUQ7OztpQkFFcUIsZ0NBQUMsb0JBQW9CLEVBQUU7OztBQUMzQyxtQkFBTyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDL0MscUJBQU8sTUFBSyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM3QyxDQUFDLENBQUM7V0FDSjs7O2lCQUVhLDBCQUFHO0FBQ2YsbUJBQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUM7V0FDakM7OztpQkFFYSwwQkFBRztBQUNmLG1CQUFPLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztXQUNoRDs7O2lCQUVVLHFCQUFDLElBQUksRUFBRTtBQUNoQixnQkFBSSxHQUFHLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXZELGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixnQkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRWxFLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixnQkFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7V0FDdkQ7OztpQkFFVSx1QkFBRztBQUNaLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1dBQzNCOzs7aUJBRVEscUJBQUc7QUFDVixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztXQUNyQjs7O2lCQUVZLHVCQUFDLEtBQUssRUFBQztBQUNsQixtQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBSztBQUNsQyxrQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNsQixxQkFBTyxJQUFJLENBQUM7YUFDYixFQUFFLEVBQUUsQ0FBQyxDQUFDO1dBQ1I7Ozt1QkExRVUsT0FBTztBQUFQLGVBQU8sR0FEbkIsTUFBTSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FDNUIsT0FBTyxLQUFQLE9BQU87ZUFBUCxPQUFPIiwiZmlsZSI6ImZlYXR1cmVzL3NlcnZpY2Uvc2Vzc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQge1VzZXJMb2dnZWRJbkV2ZW50fSBmcm9tICcuL2V2ZW50L3VzZXItbG9nZ2VkLWluLWV2ZW50JztcclxuaW1wb3J0IHtVc2VyTG9nZ2VkT3V0RXZlbnR9IGZyb20gJy4vZXZlbnQvdXNlci1sb2dnZWQtb3V0LWV2ZW50JztcclxuaW1wb3J0IHtVc2Vyc1JlcG9zaXRvcnl9IGZyb20gJ3JlcG9zaXRvcnknO1xyXG5pbXBvcnQge2xvY2FsU3RvcmFnZU1hbmFnZXJ9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS1tYW5hZ2VyJztcclxuXHJcbmNvbnN0IGN1cnJlbnRVc2VyS2V5ID0gJ2N1cnJlbnRVc2VyJztcclxuXHJcbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yLCBVc2Vyc1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBTZXNzaW9uIHtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnRBZ2dyZWdhdG9yLCB1c2Vyc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xyXG4gICAgdGhpcy51c2Vyc1JlcG9zaXRvcnkgPSB1c2Vyc1JlcG9zaXRvcnk7XHJcblxyXG4gICAgdGhpcy5pbml0VXNlckRhdGEoKTtcclxuXHJcbiAgICBpZiAodGhpcy51c2VyUmVtZW1iZXJlZCgpKSB7XHJcbiAgICAgIHRoaXMucmVzdG9yZURhdGEoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRVc2VyRGF0YSgpIHtcclxuICAgIHRoaXMudXNlciA9IHt9O1xyXG4gICAgdGhpcy51c2VyQWNjZXNzUmlnaHRzID0gW107XHJcblxyXG4gICAgdGhpcy5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbG9naW5Vc2VyKHVzZXJJZCkge1xyXG4gICAgdGhpcy51c2VyID0gdGhpcy51c2Vyc1JlcG9zaXRvcnkuZ2V0KHVzZXJJZCk7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUoY3VycmVudFVzZXJLZXksIHRoaXMudXNlcik7XHJcbiAgICB0aGlzLnJlc3RvcmVEYXRhKCk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXRVc2VyKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5jbGVhcihjdXJyZW50VXNlcktleSk7XHJcbiAgICB0aGlzLmluaXRVc2VyRGF0YSgpO1xyXG4gICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChuZXcgVXNlckxvZ2dlZE91dEV2ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHJlcXVpcmVkQWNjZXNzUmlnaHQpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJBY2Nlc3NSaWdodHNbcmVxdWlyZWRBY2Nlc3NSaWdodF0gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICB1c2VySGFzQWxsQWNjZXNzUmlnaHRzKHJlcXVpcmVkQWNjZXNzUmlnaHRzKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZWRBY2Nlc3NSaWdodHMuZXZlcnkoYWNjZXNzUmlnaHQgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy51c2VySGFzQWNjZXNzUmlnaHQoYWNjZXNzUmlnaHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpc1VzZXJMb2dnZWRJbigpIHtcclxuICAgIHJldHVybiB0aGlzLmlzTG9nZ2VkSW4gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICB1c2VyUmVtZW1iZXJlZCgpIHtcclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmhhcyhjdXJyZW50VXNlcktleSk7XHJcbiAgfVxyXG5cclxuICByZXN0b3JlRGF0YShkYXRhKSB7XHJcbiAgICBkYXRhID0gZGF0YSB8fCBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChjdXJyZW50VXNlcktleSk7XHJcblxyXG4gICAgdGhpcy51c2VyID0gZGF0YTtcclxuICAgIHRoaXMudXNlckFjY2Vzc1JpZ2h0cyA9IHRoaXMuX3JlZHVjZVRvSGFzaChkYXRhLnVzZXJBY2Nlc3NSaWdodHMpO1xyXG5cclxuICAgIHRoaXMuaXNMb2dnZWRJbiA9IHRydWU7XHJcbiAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKG5ldyBVc2VyTG9nZ2VkSW5FdmVudCgpKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJOYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlci51c2VyTmFtZTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXIuaWQ7XHJcbiAgfVxyXG4gIFxyXG4gIF9yZWR1Y2VUb0hhc2goYXJyYXkpe1xyXG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZSgoaGFzaCwgaXRlbSkgPT4ge1xyXG4gICAgICBoYXNoW2l0ZW1dID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
