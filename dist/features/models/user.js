System.register([], function (_export) {
  "use strict";

  var User;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      User = (function () {
        function User(data) {
          _classCallCheck(this, User);

          data = data || {};
          this.id = data.id;
          this.userName = data.userName;
          this.password = data.password;
          this.fullName = data.fullName;
          this.city = data.city;
          this.address = data.address;
          this.phone = data.phone;
          this.email = data.email;
          this.isBlocked = data.isBlocked || false;
        }

        _createClass(User, [{
          key: "getData",
          value: function getData() {
            return {
              id: this.id,
              userName: this.userName,
              password: this.password,
              fullName: this.fullName,
              city: this.city,
              address: this.address,
              phone: this.phone,
              email: this.email,
              isBlocked: this.isBlocked
            };
          }
        }]);

        return User;
      })();

      _export("User", User);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL21vZGVscy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUNhLElBQUk7Ozs7Ozs7OztBQUFKLFVBQUk7QUFDSixpQkFEQSxJQUFJLENBQ0gsSUFBSSxFQUFDO2dDQUROLElBQUk7O0FBRWIsY0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDbEIsY0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ2xCLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM5QixjQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDOUIsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzlCLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN0QixjQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDNUIsY0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLGNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN4QixjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDO1NBQzFDOztxQkFaVSxJQUFJOztpQkFjUixtQkFBRTtBQUNQLG1CQUFPO0FBQ0wsZ0JBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtBQUNYLHNCQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7QUFDdkIsc0JBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtBQUN2QixzQkFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO0FBQ3ZCLGtCQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDZixxQkFBTyxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQ3JCLG1CQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDakIsbUJBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUNqQix1QkFBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzFCLENBQUM7V0FDSDs7O2VBMUJVLElBQUkiLCJmaWxlIjoiZmVhdHVyZXMvbW9kZWxzL3VzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpe1xyXG4gICAgZGF0YSA9IGRhdGEgfHwge307XHJcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgdGhpcy5wYXNzd29yZCA9IGRhdGEucGFzc3dvcmQ7XHJcbiAgICB0aGlzLmZ1bGxOYW1lID0gZGF0YS5mdWxsTmFtZTtcclxuICAgIHRoaXMuY2l0eSA9IGRhdGEuY2l0eTtcclxuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcclxuICAgIHRoaXMucGhvbmUgPSBkYXRhLnBob25lO1xyXG4gICAgdGhpcy5lbWFpbCA9IGRhdGEuZW1haWw7XHJcbiAgICB0aGlzLmlzQmxvY2tlZCA9IGRhdGEuaXNCbG9ja2VkIHx8IGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBnZXREYXRhKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgdXNlck5hbWU6IHRoaXMudXNlck5hbWUsXHJcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICBmdWxsTmFtZTogdGhpcy5mdWxsTmFtZSxcclxuICAgICAgY2l0eTogdGhpcy5jaXR5LFxyXG4gICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXHJcbiAgICAgIHBob25lOiB0aGlzLnBob25lLFxyXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgaXNCbG9ja2VkOiB0aGlzLmlzQmxvY2tlZFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
