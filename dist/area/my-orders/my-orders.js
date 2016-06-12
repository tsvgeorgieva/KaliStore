System.register(['aurelia-framework', 'service', 'repository'], function (_export) {
  'use strict';

  var inject, Session, OrdersRepository, MyOrders;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_service) {
      Session = _service.Session;
    }, function (_repository) {
      OrdersRepository = _repository.OrdersRepository;
    }],
    execute: function () {
      MyOrders = (function () {
        function MyOrders(session, ordersRepository) {
          _classCallCheck(this, _MyOrders);

          this.session = session;
          this.ordersRepository = ordersRepository;
          this.loadCurrentUserOrders();
        }

        _createClass(MyOrders, [{
          key: 'loadCurrentUserOrders',
          value: function loadCurrentUserOrders() {
            this.orders = this.ordersRepository.getByUserId(this.session.getUserId());
          }
        }]);

        var _MyOrders = MyOrders;
        MyOrders = inject(Session, OrdersRepository)(MyOrders) || MyOrders;
        return MyOrders;
      })();

      _export('MyOrders', MyOrders);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvbXktb3JkZXJzL215LW9yZGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7eUNBS2EsUUFBUTs7Ozs7Ozs7aUNBTGIsTUFBTTs7eUJBQ04sT0FBTzs7cUNBQ1AsZ0JBQWdCOzs7QUFHWCxjQUFRO0FBQ1IsaUJBREEsUUFBUSxDQUNQLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTs7O0FBQ3JDLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN6QyxjQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5Qjs7cUJBTFUsUUFBUTs7aUJBT0UsaUNBQUc7QUFDdEIsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7V0FDM0U7Ozt3QkFUVSxRQUFRO0FBQVIsZ0JBQVEsR0FEcEIsTUFBTSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUNyQixRQUFRLEtBQVIsUUFBUTtlQUFSLFFBQVEiLCJmaWxlIjoiYXJlYS9teS1vcmRlcnMvbXktb3JkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICdzZXJ2aWNlJztcclxuaW1wb3J0IHtPcmRlcnNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuXHJcbkBpbmplY3QoU2Vzc2lvbiwgT3JkZXJzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIE15T3JkZXJzIHtcclxuICBjb25zdHJ1Y3RvcihzZXNzaW9uLCBvcmRlcnNSZXBvc2l0b3J5KSB7XHJcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgdGhpcy5vcmRlcnNSZXBvc2l0b3J5ID0gb3JkZXJzUmVwb3NpdG9yeTtcclxuICAgIHRoaXMubG9hZEN1cnJlbnRVc2VyT3JkZXJzKCk7XHJcbiAgfVxyXG4gIFxyXG4gIGxvYWRDdXJyZW50VXNlck9yZGVycygpIHtcclxuICAgIHRoaXMub3JkZXJzID0gdGhpcy5vcmRlcnNSZXBvc2l0b3J5LmdldEJ5VXNlcklkKHRoaXMuc2Vzc2lvbi5nZXRVc2VySWQoKSk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
