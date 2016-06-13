System.register(['./products-repository', './categories-repository', './cart-repository', './users-repository', './cities-repository', './offices-repository', './orders-repository', './materials-repository', './reviews-repository'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia, configCallback) {}

  return {
    setters: [function (_productsRepository) {
      _export('ProductsRepository', _productsRepository.ProductsRepository);
    }, function (_categoriesRepository) {
      _export('CategoriesRepository', _categoriesRepository.CategoriesRepository);
    }, function (_cartRepository) {
      _export('CartRepository', _cartRepository.CartRepository);
    }, function (_usersRepository) {
      _export('UsersRepository', _usersRepository.UsersRepository);
    }, function (_citiesRepository) {
      _export('CitiesRepository', _citiesRepository.CitiesRepository);
    }, function (_officesRepository) {
      _export('OfficesRepository', _officesRepository.OfficesRepository);
    }, function (_ordersRepository) {
      _export('OrdersRepository', _ordersRepository.OrdersRepository);
    }, function (_materialsRepository) {
      _export('MaterialsRepository', _materialsRepository.MaterialsRepository);
    }, function (_reviewsRepository) {
      _export('ReviewsRepository', _reviewsRepository.ReviewsRepository);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFVTyxXQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUU7Ozs7d0RBVjdDLGtCQUFrQjs7NERBQ2xCLG9CQUFvQjs7Z0RBQ3BCLGNBQWM7O2tEQUNkLGVBQWU7O29EQUNmLGdCQUFnQjs7c0RBQ2hCLGlCQUFpQjs7b0RBQ2pCLGdCQUFnQjs7MERBQ2hCLG1CQUFtQjs7c0RBQ25CLGlCQUFpQiIsImZpbGUiOiJmZWF0dXJlcy9yZXBvc2l0b3J5L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtQcm9kdWN0c1JlcG9zaXRvcnl9IGZyb20gJy4vcHJvZHVjdHMtcmVwb3NpdG9yeSc7XHJcbmV4cG9ydCB7Q2F0ZWdvcmllc1JlcG9zaXRvcnl9IGZyb20gJy4vY2F0ZWdvcmllcy1yZXBvc2l0b3J5JztcclxuZXhwb3J0IHtDYXJ0UmVwb3NpdG9yeX0gZnJvbSAnLi9jYXJ0LXJlcG9zaXRvcnknO1xyXG5leHBvcnQge1VzZXJzUmVwb3NpdG9yeX0gZnJvbSAnLi91c2Vycy1yZXBvc2l0b3J5JztcclxuZXhwb3J0IHtDaXRpZXNSZXBvc2l0b3J5fSBmcm9tICcuL2NpdGllcy1yZXBvc2l0b3J5JztcclxuZXhwb3J0IHtPZmZpY2VzUmVwb3NpdG9yeX0gZnJvbSAnLi9vZmZpY2VzLXJlcG9zaXRvcnknO1xyXG5leHBvcnQge09yZGVyc1JlcG9zaXRvcnl9IGZyb20gJy4vb3JkZXJzLXJlcG9zaXRvcnknO1xyXG5leHBvcnQge01hdGVyaWFsc1JlcG9zaXRvcnl9IGZyb20gJy4vbWF0ZXJpYWxzLXJlcG9zaXRvcnknO1xyXG5leHBvcnQge1Jldmlld3NSZXBvc2l0b3J5fSBmcm9tICcuL3Jldmlld3MtcmVwb3NpdG9yeSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEsIGNvbmZpZ0NhbGxiYWNrKSB7fVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
