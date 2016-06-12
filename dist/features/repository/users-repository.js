System.register(['service', 'enum'], function (_export) {
  'use strict';

  var localStorageManager, accessRight, usersKey, UsersRepository, initialUsers;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }, function (_enum) {
      accessRight = _enum.accessRight;
    }],
    execute: function () {
      usersKey = 'users';

      UsersRepository = (function () {
        function UsersRepository() {
          _classCallCheck(this, UsersRepository);

          this.lastId = 0;

          this.users = localStorageManager.get(usersKey);
          if (this.users === undefined) {
            this.initialize();
          }

          this.lastId = this.users.length;
        }

        _createClass(UsersRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.users = initialUsers;

            localStorageManager.save(usersKey, this.users);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.users.find(function (u) {
              return u.id === id;
            });
          }
        }, {
          key: 'getByUserName',
          value: function getByUserName(userName) {
            return this.users.find(function (u) {
              return u.userName === userName;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.users;
          }
        }, {
          key: 'save',
          value: function save(user) {
            user.id = ++this.lastId;
            user.userAccessRights = [accessRight.userProfile];
            this.users.push(user);

            localStorageManager.save(usersKey, this.users);
            return user.id;
          }
        }, {
          key: 'edit',
          value: function edit(userData) {
            var user = this.get(userData.id);

            user.city = userData.city || user.city;
            user.fullName = userData.fullName || user.fullName;
            user.address = userData.address || user.address;
            user.phone = userData.phone || user.phone;
            localStorageManager.save(usersKey, this.users);
          }
        }, {
          key: 'block',
          value: function block(userId) {
            var user = this.get(userId);
            user.isBlocked = true;
            localStorageManager.save(usersKey, this.users);
          }
        }, {
          key: 'unblock',
          value: function unblock(userId) {
            var user = this.get(userId);
            user.isBlocked = false;
            localStorageManager.save(usersKey, this.users);
          }
        }, {
          key: 'userHasAccessRight',
          value: function userHasAccessRight(userId, requiredAccessRight) {
            var user = this.get(userId);
            return user.userAccessRights[requiredAccessRight] === true;
          }
        }, {
          key: 'userHasAllAccessRights',
          value: function userHasAllAccessRights(userId, requiredAccessRights) {
            var _this = this;

            var user = this.get(userId);
            return requiredAccessRights.every(function (accessRight) {
              return _this.userHasAccessRight(userId, accessRight);
            });
          }
        }]);

        return UsersRepository;
      })();

      _export('UsersRepository', UsersRepository);

      initialUsers = [{
        id: 1,
        userName: 'pesho',
        password: '123',
        fullName: 'Pesho Peshev',
        city: {
          id: 1,
          name: 'София'
        },
        address: 'ул. Пършевица 5',
        phone: '2873278',
        email: 'pesho@abv.bg',
        isBlocked: false,
        userAccessRights: [accessRight.userProfile]
      }, {
        id: 2,
        userName: 'admin',
        password: 'admin',
        fullName: 'Admin Adminski',
        city: {
          id: 2,
          name: 'Пловдив'
        },
        address: 'ул. Пършевица 5',
        phone: '2873278',
        email: 'admin@neshtokrasivo.bg',
        isBlocked: false,
        userAccessRights: [accessRight.userProfile, accessRight.adminPanel]
      }, {
        id: 3,
        userName: 'loshiq',
        password: '123',
        fullName: 'Losho Loshev',
        city: {
          id: 1,
          name: 'София'
        },
        address: 'ул. Ала Бала 5',
        phone: '5555555',
        email: 'loshiq@losho.bg',
        isBlocked: true,
        userAccessRights: [accessRight.userProfile]
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvdXNlcnMtcmVwb3NpdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0NBR00sUUFBUSxFQUVELGVBQWUsRUE2RXRCLFlBQVk7Ozs7Ozs7O3FDQWxGVixtQkFBbUI7OzBCQUNuQixXQUFXOzs7QUFFYixjQUFRLEdBQUcsT0FBTzs7QUFFWCxxQkFBZTtBQUdmLGlCQUhBLGVBQWUsR0FHWjtnQ0FISCxlQUFlOztlQUMxQixNQUFNLEdBQUcsQ0FBQzs7QUFHUixjQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQyxjQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQzVCLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7O0FBRUQsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNqQzs7cUJBVlUsZUFBZTs7aUJBWWhCLHNCQUFHO0FBQ1gsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDOztBQUUxQiwrQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUNoRDs7O2lCQUVFLGFBQUMsRUFBRSxFQUFFO0FBQ04sbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO3FCQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTthQUFBLENBQUMsQ0FBQztXQUMxQzs7O2lCQUVZLHVCQUFDLFFBQVEsRUFBQztBQUNyQixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7cUJBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRO2FBQUEsQ0FBQyxDQUFDO1dBQ3REOzs7aUJBRUssa0JBQUc7QUFDUCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1dBQ25COzs7aUJBRUcsY0FB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O0FBQ0wsZ0JBQVEsRUFBRSxPQUFPO0FBQ2pCLGdCQUFRLEVBQUUsT0FBTztBQUNqQixnQkFBUSxFQUFFLGdCQUFnQjtBQUMxQixZQUFJLEVBQUU7QUFDSixZQUFFLEVBQUUsQ0FBQztBQUNMLGNBQUksRUFBRSxTQUFTO1NBQ2hCO0FBQ0QsZUFBTyxFQUFFLGlCQUFpQjtBQUMxQixhQUFLLEVBQUUsU0FBUztBQUNoQixhQUFLLEVBQUUsd0JBQXdCO0FBQy9CLGlCQUFTLEVBQUUsS0FBSztBQUNoQix3QkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQztPQUNwRSxFQUFFO0FBQ0QsVUFBRSxFQUFFLENBQUM7QUFDTCxnQkFBUSxFQUFFLFFBQVE7QUFDbEIsZ0JBQVEsRUFBRSxLQUFLO0FBQ2YsZ0JBQVEsRUFBRSxjQUFjO0FBQ3hCLFlBQUksRUFBRTtBQUNKLFlBQUUsRUFBRSxDQUFDO0FBQ0wsY0FBSSxFQUFFLE9BQU87U0FDZDtBQUNELGVBQU8sRUFBRSxnQkFBZ0I7QUFDekIsYUFBSyxFQUFFLFNBQVM7QUFDaEIsYUFBSyxFQUFFLGlCQUFpQjtBQUN4QixpQkFBUyxFQUFFLElBQUk7QUFDZix3QkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7T0FDNUMsQ0FBQyIsImZpbGUiOiJmZWF0dXJlcy9yZXBvc2l0b3J5L3VzZXJzLXJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2xvY2FsU3RvcmFnZU1hbmFnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5pbXBvcnQge2FjY2Vzc1JpZ2h0fSBmcm9tICdlbnVtJztcclxuXHJcbmNvbnN0IHVzZXJzS2V5ID0gJ3VzZXJzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2Vyc1JlcG9zaXRvcnkge1xyXG4gIGxhc3RJZCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy51c2VycyA9IGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0KHVzZXJzS2V5KTtcclxuICAgIGlmICh0aGlzLnVzZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMubGFzdElkID0gdGhpcy51c2Vycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy51c2VycyA9IGluaXRpYWxVc2VycztcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUodXNlcnNLZXksIHRoaXMudXNlcnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnlVc2VyTmFtZSh1c2VyTmFtZSl7XHJcbiAgICByZXR1cm4gdGhpcy51c2Vycy5maW5kKHUgPT4gdS51c2VyTmFtZSA9PT0gdXNlck5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlcnM7XHJcbiAgfVxyXG5cclxuICBzYXZlKHVzZXIpIHtcclxuICAgIHVzZXIuaWQgPSArK3RoaXMubGFzdElkO1xyXG4gICAgdXNlci51c2VyQWNjZXNzUmlnaHRzID0gW2FjY2Vzc1JpZ2h0LnVzZXJQcm9maWxlXTtcclxuICAgIHRoaXMudXNlcnMucHVzaCh1c2VyKTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUodXNlcnNLZXksIHRoaXMudXNlcnMpO1xyXG4gICAgcmV0dXJuIHVzZXIuaWQ7XHJcbiAgfVxyXG5cclxuICBlZGl0KHVzZXJEYXRhKXtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldCh1c2VyRGF0YS5pZCk7XHJcblxyXG4gICAgLy9UT0RPOiBzZXBhcmF0ZSBtZXRob2QgZm9yIGNoYW5naW5nIHBhc3N3b3JkP1xyXG4gICAgLy9jdXJyZW50VXNlci5wYXNzd29yZCA9IHVzZXIucGFzc3dvcmQgfHwgY3VycmVudFVzZXIucGFzc3dvcmQ7XHJcblxyXG4gICAgdXNlci5jaXR5ID0gdXNlckRhdGEuY2l0eSB8fCB1c2VyLmNpdHk7XHJcbiAgICB1c2VyLmZ1bGxOYW1lID0gdXNlckRhdGEuZnVsbE5hbWUgfHwgdXNlci5mdWxsTmFtZTtcclxuICAgIHVzZXIuYWRkcmVzcyA9IHVzZXJEYXRhLmFkZHJlc3MgfHwgdXNlci5hZGRyZXNzO1xyXG4gICAgdXNlci5waG9uZSA9IHVzZXJEYXRhLnBob25lIHx8IHVzZXIucGhvbmU7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUodXNlcnNLZXksIHRoaXMudXNlcnMpO1xyXG4gIH1cclxuICBcclxuICBibG9jayh1c2VySWQpe1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0KHVzZXJJZCk7XHJcbiAgICB1c2VyLmlzQmxvY2tlZCA9IHRydWU7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUodXNlcnNLZXksIHRoaXMudXNlcnMpO1xyXG4gIH1cclxuICBcclxuICB1bmJsb2NrKHVzZXJJZCl7XHJcbiAgICBjb25zdCB1c2VyID0gdGhpcy5nZXQodXNlcklkKTtcclxuICAgIHVzZXIuaXNCbG9ja2VkID0gZmFsc2U7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUodXNlcnNLZXksIHRoaXMudXNlcnMpO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0FjY2Vzc1JpZ2h0KHVzZXJJZCwgcmVxdWlyZWRBY2Nlc3NSaWdodCkge1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0KHVzZXJJZCk7XHJcbiAgICByZXR1cm4gdXNlci51c2VyQWNjZXNzUmlnaHRzW3JlcXVpcmVkQWNjZXNzUmlnaHRdID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdXNlckhhc0FsbEFjY2Vzc1JpZ2h0cyh1c2VySWQsIHJlcXVpcmVkQWNjZXNzUmlnaHRzKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdGhpcy5nZXQodXNlcklkKTtcclxuICAgIHJldHVybiByZXF1aXJlZEFjY2Vzc1JpZ2h0cy5ldmVyeShhY2Nlc3NSaWdodCA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLnVzZXJIYXNBY2Nlc3NSaWdodCh1c2VySWQsIGFjY2Vzc1JpZ2h0KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaW5pdGlhbFVzZXJzID0gW3tcclxuICBpZDogMSxcclxuICB1c2VyTmFtZTogJ3Blc2hvJyxcclxuICBwYXNzd29yZDogJzEyMycsXHJcbiAgZnVsbE5hbWU6ICdQZXNobyBQZXNoZXYnLFxyXG4gIGNpdHk6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ch0L7RhNC40Y8nXHJcbiAgfSxcclxuICBhZGRyZXNzOiAn0YPQuy4g0J/RitGA0YjQtdCy0LjRhtCwIDUnLFxyXG4gIHBob25lOiAnMjg3MzI3OCcsXHJcbiAgZW1haWw6ICdwZXNob0BhYnYuYmcnLFxyXG4gIGlzQmxvY2tlZDogZmFsc2UsXHJcbiAgdXNlckFjY2Vzc1JpZ2h0czogW2FjY2Vzc1JpZ2h0LnVzZXJQcm9maWxlXVxyXG59LCB7XHJcbiAgaWQ6IDIsXHJcbiAgdXNlck5hbWU6ICdhZG1pbicsXHJcbiAgcGFzc3dvcmQ6ICdhZG1pbicsXHJcbiAgZnVsbE5hbWU6ICdBZG1pbiBBZG1pbnNraScsXHJcbiAgY2l0eToge1xyXG4gICAgaWQ6IDIsXHJcbiAgICBuYW1lOiAn0J/Qu9C+0LLQtNC40LInXHJcbiAgfSxcclxuICBhZGRyZXNzOiAn0YPQuy4g0J/RitGA0YjQtdCy0LjRhtCwIDUnLFxyXG4gIHBob25lOiAnMjg3MzI3OCcsXHJcbiAgZW1haWw6ICdhZG1pbkBuZXNodG9rcmFzaXZvLmJnJyxcclxuICBpc0Jsb2NrZWQ6IGZhbHNlLFxyXG4gIHVzZXJBY2Nlc3NSaWdodHM6IFthY2Nlc3NSaWdodC51c2VyUHJvZmlsZSwgYWNjZXNzUmlnaHQuYWRtaW5QYW5lbF1cclxufSwge1xyXG4gIGlkOiAzLFxyXG4gIHVzZXJOYW1lOiAnbG9zaGlxJyxcclxuICBwYXNzd29yZDogJzEyMycsXHJcbiAgZnVsbE5hbWU6ICdMb3NobyBMb3NoZXYnLFxyXG4gIGNpdHk6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ch0L7RhNC40Y8nXHJcbiAgfSxcclxuICBhZGRyZXNzOiAn0YPQuy4g0JDQu9CwINCR0LDQu9CwIDUnLFxyXG4gIHBob25lOiAnNTU1NTU1NScsXHJcbiAgZW1haWw6ICdsb3NoaXFAbG9zaG8uYmcnLFxyXG4gIGlzQmxvY2tlZDogdHJ1ZSxcclxuICB1c2VyQWNjZXNzUmlnaHRzOiBbYWNjZXNzUmlnaHQudXNlclByb2ZpbGVdXHJcbn1dO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
