System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, ordersKey, OrdersRepository, initialOrders;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      ordersKey = 'orders';

      OrdersRepository = (function () {
        function OrdersRepository() {
          _classCallCheck(this, OrdersRepository);

          this.lastId = 0;

          this.orders = localStorageManager.get(ordersKey);
          if (this.orders === undefined) {
            this.initialize();
          }

          this.lastId = this.orders.length;
        }

        _createClass(OrdersRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.orders = initialOrders;

            localStorageManager.save(ordersKey, this.orders);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.orders.find(function (o) {
              return o.id === id;
            });
          }
        }, {
          key: 'getByUserId',
          value: function getByUserId(userId) {
            return this.orders.filter(function (o) {
              return o.user.id === userId;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            return this.orders;
          }
        }, {
          key: 'save',
          value: function save(order) {
            order.id = ++this.lastId;
            this.orders.push(order);

            localStorageManager.save(ordersKey, this.orders);
          }
        }]);

        return OrdersRepository;
      })();

      _export('OrdersRepository', OrdersRepository);

      initialOrders = [{
        id: 1,
        user: {
          id: 1,
          userName: 'pesho',
          fullName: 'Pesho Peshev',
          city: {
            id: 1,
            name: 'София'
          },
          address: 'ул. Пършевица 5',
          phone: '2873278',
          email: 'pesho@abv.bg'
        },
        delivery: {
          city: {
            id: 2,
            name: 'Пловдив'
          },
          address: 'ул. Някоя си 72',
          client: {
            name: 'Иван Пешев',
            phoneNumber: '0988855'
          }
        },
        products: [{
          product: {
            id: 1,
            title: 'Пролетна картичка',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: {
              amount: 10,
              currency: 'BGN'
            },
            rating: 4.1,
            materials: [{
              id: 1,
              name: 'Картон'
            }],
            size: '20см x 10см',
            picture: 'assets/images/kartichka1.jpg',
            category: {
              id: 1,
              title: 'Картички'
            },
            daysToMake: 2
          },
          quantity: 2
        }, {
          product: {
            id: 3,
            title: 'Коледна картичка с елен',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: {
              amount: 10,
              currency: 'BGN'
            },
            rating: 4.6,
            materials: [{
              id: 1,
              name: 'Картон'
            }, {
              id: 2,
              name: 'Брокат'
            }],
            size: '20см x 10см',
            picture: 'assets/images/kartichka3.jpg',
            category: {
              id: 1,
              title: 'Картички'
            },
            daysToMake: 2
          },
          quantity: 1
        }],
        totalPrice: {
          amount: 33.70,
          currency: 'BGN'
        },
        status: 4
      }, {
        id: 2,
        user: {
          id: 1,
          userName: 'pesho',
          fullName: 'Pesho Peshev',
          city: {
            id: 1,
            name: 'София'
          },
          address: 'ул. Пършевица 5',
          phone: '2873278',
          email: 'pesho@abv.bg'
        },
        delivery: {
          city: {
            id: 2,
            name: 'Пловдив'
          },
          address: 'ул. Някоя си 72',
          client: {
            name: 'Иван Пешев',
            phoneNumber: '0988855'
          }
        },
        products: [{
          product: {
            id: 5,
            title: 'Детска диадема',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: {
              amount: 8,
              currency: 'BGN'
            },
            rating: 4.1,
            materials: [{
              id: 5,
              name: 'Мъниста'
            }, {
              id: 4,
              name: 'Панделка'
            }],
            size: 'стандартен',
            picture: 'assets/images/diadema.jpg',
            category: {
              id: 3,
              title: 'Аксесоари'
            },
            daysToMake: 3
          },
          quantity: 1
        }],
        totalPrice: {
          amount: 11.70,
          currency: 'BGN'
        },
        status: 3
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvb3JkZXJzLXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVNLFNBQVMsRUFFRixnQkFBZ0IsRUFzQ3ZCLGFBQWE7Ozs7Ozs7O3FDQTFDWCxtQkFBbUI7OztBQUVyQixlQUFTLEdBQUcsUUFBUTs7QUFFYixzQkFBZ0I7QUFHaEIsaUJBSEEsZ0JBQWdCLEdBR2I7Z0NBSEgsZ0JBQWdCOztlQUMzQixNQUFNLEdBQUcsQ0FBQzs7QUFHUixjQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRCxjQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQzdCLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7O0FBRUQsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNsQzs7cUJBVlUsZ0JBQWdCOztpQkFZakIsc0JBQUc7QUFDWCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7O0FBRTVCLCtCQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1dBQ2xEOzs7aUJBRUUsYUFBQyxFQUFFLEVBQUU7QUFDTixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7cUJBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO2FBQUEsQ0FBQyxDQUFDO1dBQzNDOzs7aUJBRVUscUJBQUMsTUFBTSxFQUFDO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNO2FBQUEsQ0FBQyxDQUFDO1dBQ3REOzs7aUJBRUssa0JBQUc7QUFDUCxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1dBQ3BCOzs7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aW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmNvbnN0IG9yZGVyc0tleSA9ICdvcmRlcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9yZGVyc1JlcG9zaXRvcnkge1xyXG4gIGxhc3RJZCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5vcmRlcnMgPSBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChvcmRlcnNLZXkpO1xyXG4gICAgaWYgKHRoaXMub3JkZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXN0SWQgPSB0aGlzLm9yZGVycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5vcmRlcnMgPSBpbml0aWFsT3JkZXJzO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShvcmRlcnNLZXksIHRoaXMub3JkZXJzKTtcclxuICB9XHJcblxyXG4gIGdldChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3JkZXJzLmZpbmQobyA9PiBvLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRCeVVzZXJJZCh1c2VySWQpe1xyXG4gICAgcmV0dXJuIHRoaXMub3JkZXJzLmZpbHRlcihvID0+IG8udXNlci5pZCA9PT0gdXNlcklkKTtcclxuICB9XHJcblxyXG4gIGdldEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLm9yZGVycztcclxuICB9XHJcblxyXG4gIHNhdmUob3JkZXIpIHtcclxuICAgIG9yZGVyLmlkID0gKyt0aGlzLmxhc3RJZDtcclxuICAgIHRoaXMub3JkZXJzLnB1c2gob3JkZXIpO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShvcmRlcnNLZXksIHRoaXMub3JkZXJzKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGluaXRpYWxPcmRlcnMgPSBbe1xyXG4gIGlkOiAxLFxyXG4gIHVzZXI6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgdXNlck5hbWU6ICdwZXNobycsXHJcbiAgICBmdWxsTmFtZTogJ1Blc2hvIFBlc2hldicsXHJcbiAgICBjaXR5OiB7XHJcbiAgICAgIGlkOiAxLFxyXG4gICAgICBuYW1lOiAn0KHQvtGE0LjRjydcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiAn0YPQuy4g0J/RitGA0YjQtdCy0LjRhtCwIDUnLFxyXG4gICAgcGhvbmU6ICcyODczMjc4JyxcclxuICAgIGVtYWlsOiAncGVzaG9AYWJ2LmJnJ1xyXG4gIH0sXHJcbiAgZGVsaXZlcnk6IHtcclxuICAgIGNpdHk6IHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIG5hbWU6ICfQn9C70L7QstC00LjQsidcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiAn0YPQuy4g0J3Rj9C60L7RjyDRgdC4IDcyJyxcclxuICAgIGNsaWVudDoge1xyXG4gICAgICBuYW1lOiAn0JjQstCw0L0g0J/QtdGI0LXQsicsXHJcbiAgICAgIHBob25lTnVtYmVyOiAnMDk4ODg1NSdcclxuICAgIH1cclxuICB9LFxyXG4gIHByb2R1Y3RzOiBbe1xyXG4gICAgICBwcm9kdWN0OiB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdGl0bGU6ICfQn9GA0L7Qu9C10YLQvdCwINC60LDRgNGC0LjRh9C60LAnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgICAgICAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgICAgICAgcHJpY2U6IHtcclxuICAgICAgICAgIGFtb3VudDogMTAsXHJcbiAgICAgICAgICBjdXJyZW5jeTogJ0JHTidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJhdGluZzogNC4xLFxyXG4gICAgICAgIG1hdGVyaWFsczogW3tcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgbmFtZTogJ9Ca0LDRgNGC0L7QvSdcclxuICAgICAgICB9XSxcclxuICAgICAgICBzaXplOiAnMjDRgdC8IHggMTDRgdC8JyxcclxuICAgICAgICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9rYXJ0aWNoa2ExLmpwZ2AsXHJcbiAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgdGl0bGU6ICfQmtCw0YDRgtC40YfQutC4J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF5c1RvTWFrZTogMlxyXG4gICAgICB9LFxyXG4gICAgICBxdWFudGl0eTogMlxyXG4gICAgfSwge1xyXG4gICAgICBwcm9kdWN0OiB7XHJcbiAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgdGl0bGU6ICfQmtC+0LvQtdC00L3QsCDQutCw0YDRgtC40YfQutCwINGBINC10LvQtdC9JyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICAgICAgICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gICAgICAgIHByaWNlOiB7XHJcbiAgICAgICAgICBhbW91bnQ6IDEwLFxyXG4gICAgICAgICAgY3VycmVuY3k6ICdCR04nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByYXRpbmc6IDQuNixcclxuICAgICAgICBtYXRlcmlhbHM6IFt7XHJcbiAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgIG5hbWU6ICfQmtCw0YDRgtC+0L0nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICBuYW1lOiAn0JHRgNC+0LrQsNGCJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIHNpemU6ICcyMNGB0LwgeCAxMNGB0LwnLFxyXG4gICAgICAgIHBpY3R1cmU6IGBhc3NldHMvaW1hZ2VzL2thcnRpY2hrYTMuanBnYCxcclxuICAgICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICB0aXRsZTogJ9Ca0LDRgNGC0LjRh9C60LgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXlzVG9NYWtlOiAyXHJcbiAgICAgIH0sXHJcbiAgICAgIHF1YW50aXR5OiAxXHJcbiAgICB9XHJcbiAgXSxcclxuICB0b3RhbFByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDMzLjcwLFxyXG4gICAgY3VycmVuY3k6ICdCR04nXHJcbiAgfSxcclxuICBzdGF0dXM6IDRcclxufSwge1xyXG4gIGlkOiAyLFxyXG4gIHVzZXI6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgdXNlck5hbWU6ICdwZXNobycsXHJcbiAgICBmdWxsTmFtZTogJ1Blc2hvIFBlc2hldicsXHJcbiAgICBjaXR5OiB7XHJcbiAgICAgIGlkOiAxLFxyXG4gICAgICBuYW1lOiAn0KHQvtGE0LjRjydcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiAn0YPQuy4g0J/RitGA0YjQtdCy0LjRhtCwIDUnLFxyXG4gICAgcGhvbmU6ICcyODczMjc4JyxcclxuICAgIGVtYWlsOiAncGVzaG9AYWJ2LmJnJ1xyXG4gIH0sXHJcbiAgZGVsaXZlcnk6IHtcclxuICAgIGNpdHk6IHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIG5hbWU6ICfQn9C70L7QstC00LjQsidcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiAn0YPQuy4g0J3Rj9C60L7RjyDRgdC4IDcyJyxcclxuICAgIGNsaWVudDoge1xyXG4gICAgICBuYW1lOiAn0JjQstCw0L0g0J/QtdGI0LXQsicsXHJcbiAgICAgIHBob25lTnVtYmVyOiAnMDk4ODg1NSdcclxuICAgIH1cclxuICB9LFxyXG4gIHByb2R1Y3RzOiBbe1xyXG4gICAgcHJvZHVjdDoge1xyXG4gICAgICBpZDogNSxcclxuICAgICAgdGl0bGU6ICfQlNC10YLRgdC60LAg0LTQuNCw0LTQtdC80LAnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICAgICAnc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuJyxcclxuICAgICAgcHJpY2U6IHtcclxuICAgICAgICBhbW91bnQ6IDgsXHJcbiAgICAgICAgY3VycmVuY3k6ICdCR04nXHJcbiAgICAgIH0sXHJcbiAgICAgIHJhdGluZzogNC4xLFxyXG4gICAgICBtYXRlcmlhbHM6IFt7XHJcbiAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgbmFtZTogJ9Cc0YrQvdC40YHRgtCwJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgbmFtZTogJ9Cf0LDQvdC00LXQu9C60LAnXHJcbiAgICAgIH1dLFxyXG4gICAgICBzaXplOiAn0YHRgtCw0L3QtNCw0YDRgtC10L0nLFxyXG4gICAgICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9kaWFkZW1hLmpwZ2AsXHJcbiAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgdGl0bGU6ICfQkNC60YHQtdGB0L7QsNGA0LgnXHJcbiAgICAgIH0sXHJcbiAgICAgIGRheXNUb01ha2U6IDNcclxuICAgIH0sXHJcbiAgICBxdWFudGl0eTogMVxyXG4gIH1cclxuICBdLFxyXG4gIHRvdGFsUHJpY2U6IHtcclxuICAgIGFtb3VudDogMTEuNzAsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHN0YXR1czogM1xyXG59XTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
