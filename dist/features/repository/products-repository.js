System.register(['aurelia-framework', 'moment', 'service', './materials-repository', './categories-repository', './reviews-repository'], function (_export) {
  'use strict';

  var inject, moment, localStorageManager, MaterialsRepository, CategoriesRepository, ReviewsRepository, productsKey, ProductsRepository, initialProducts;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_moment) {
      moment = _moment['default'];
    }, function (_service) {
      localStorageManager = _service.localStorageManager;
    }, function (_materialsRepository) {
      MaterialsRepository = _materialsRepository.MaterialsRepository;
    }, function (_categoriesRepository) {
      CategoriesRepository = _categoriesRepository.CategoriesRepository;
    }, function (_reviewsRepository) {
      ReviewsRepository = _reviewsRepository.ReviewsRepository;
    }],
    execute: function () {
      productsKey = 'products';

      ProductsRepository = (function () {
        function ProductsRepository(materialsRepository, categoriesRepository, reviewsRepository) {
          _classCallCheck(this, _ProductsRepository);

          this.editableProperties = ['title', 'description', 'price', 'rating', 'materials', 'size', 'picture', 'category', 'daysToMake'];

          this.materialsRepository = materialsRepository;
          this.categoriesRepository = categoriesRepository;
          this.reviewsRepository = reviewsRepository;

          this.products = this._getAllFromLocalStorage();
          if (this.products.length === 0) {
            this._initialize();
          }
        }

        _createClass(ProductsRepository, [{
          key: 'get',
          value: function get(id) {
            var product = this.products.find(function (p) {
              return p.id === id;
            });
            product.rating = this.reviewsRepository.getRatingForProduct(product.id);
            return product;
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            var _this = this;

            var copy = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (copy) {
              return this._getAllFromLocalStorage();
            }

            this.products.forEach(function (p) {
              p.rating = _this.reviewsRepository.getRatingForProduct(p.id);
            });

            return this.products;
          }
        }, {
          key: 'getByQuery',
          value: function getByQuery(query) {
            var _this2 = this;

            var lowerCaseQuery = query.toLocaleLowerCase();
            return this.products.filter(function (p) {
              return p.title.toLocaleLowerCase().indexOf(lowerCaseQuery) > -1;
            }).map(function (p) {
              p.rating = _this2.reviewsRepository.getRatingForProduct(p.id);
              return p;
            });
          }
        }, {
          key: 'getByCategory',
          value: function getByCategory(categoryId) {
            var _this3 = this;

            return this.products.filter(function (p) {
              return p.category.id === categoryId;
            }).map(function (p) {
              p.rating = _this3.reviewsRepository.getRatingForProduct(p.id);
              return p;
            });
          }
        }, {
          key: 'save',
          value: function save(productData) {
            var _this4 = this;

            var product = {};
            product.id = ++this.lastId;
            this.editableProperties.forEach(function (property) {
              return _this4._editProperty(product, productData, property);
            });
            this.products.push(product);
            this._saveAllToLocalStorage();
            return product.id;
          }
        }, {
          key: 'edit',
          value: function edit(productData) {
            var _this5 = this;

            var product = this.get(productData.id);
            this.editableProperties.forEach(function (property) {
              return _this5._editProperty(product, productData, property);
            });
            this._saveAllToLocalStorage();
          }
        }, {
          key: '_initialize',
          value: function _initialize() {
            var _this6 = this;

            this.products = initialProducts.map(function (p) {
              p.materials = p.materials.map(function (m) {
                return _this6.materialsRepository.get(m.id);
              });
              p.category = _this6.categoriesRepository.get(p.category.id);
              p.rating = _this6.reviewsRepository.getRatingForProduct(p.id);
              return p;
            });
            this._saveAllToLocalStorage();
          }
        }, {
          key: '_getAllFromLocalStorage',
          value: function _getAllFromLocalStorage() {
            var _this7 = this;

            return (localStorageManager.get(productsKey) || []).map(function (p) {
              p.materials = p.materials.map(function (m) {
                return _this7.materialsRepository.get(m.id);
              });
              p.category = _this7.categoriesRepository.get(p.category.id);
              p.rating = _this7.reviewsRepository.getRatingForProduct(p.id);
              p.dateTimeAdded = moment(p.dateTimeAdded);
              return p;
            });
          }
        }, {
          key: '_saveAllToLocalStorage',
          value: function _saveAllToLocalStorage() {
            localStorageManager.save(productsKey, this.products);
          }
        }, {
          key: '_editProperty',
          value: function _editProperty(product, productData, property) {
            product[property] = productData[property] || product[property];
          }
        }]);

        var _ProductsRepository = ProductsRepository;
        ProductsRepository = inject(MaterialsRepository, CategoriesRepository, ReviewsRepository)(ProductsRepository) || ProductsRepository;
        return ProductsRepository;
      })();

      _export('ProductsRepository', ProductsRepository);

      initialProducts = [{
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
          name: 'Картички'
        },
        daysToMake: 2
      }, {
        id: 2,
        title: 'Картичка с рози',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 10,
          currency: 'BGN'
        },
        rating: 4.7,
        materials: [{
          id: 1,
          name: 'Картон'
        }],
        size: '20см x 10см',
        picture: 'assets/images/kartichka2.jpg',
        category: {
          id: 1,
          name: 'Картички'
        },
        daysToMake: 2
      }, {
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
          name: 'Картички'
        },
        daysToMake: 2
      }, {
        id: 4,
        title: 'Детска торта от картон',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 30,
          currency: 'BGN'
        },
        rating: 4.6,
        materials: [{
          id: 1,
          name: 'Картон'
        }, {
          id: 3,
          name: 'Стикери'
        }, {
          id: 4,
          name: 'Панделка'
        }],
        size: '40см x 40см x 20см',
        picture: 'assets/images/torta.jpg',
        category: {
          id: 2,
          name: 'Торти'
        },
        daysToMake: 5
      }, {
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
          name: 'Аксесоари'
        },
        daysToMake: 3
      }, {
        id: 6,
        title: 'Ръчно изработена картонена торта',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 20,
          currency: 'BGN'
        },
        rating: 4.3,
        materials: [{
          id: 1,
          name: 'Картон'
        }, {
          id: 3,
          name: 'Стикери'
        }, {
          id: 4,
          name: 'Панделка'
        }],
        size: '40см x 40см x 20см',
        picture: 'assets/images/torta2.jpg',
        category: {
          id: 2,
          name: 'Торти'
        },
        daysToMake: 5
      }, {
        id: 7,
        title: 'Огърлица със сърце',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 7,
          currency: 'BGN'
        },
        rating: 4.8,
        materials: [{
          id: 6,
          name: 'Въже'
        }, {
          id: 7,
          name: 'Висулка'
        }],
        size: 'стандартен',
        picture: 'assets/images/gerdan.jpg',
        category: {
          id: 3,
          name: 'Аксесоари'
        },
        daysToMake: 2
      }, {
        id: 8,
        title: 'Гривна със сърце',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 7,
          currency: 'BGN'
        },
        rating: 4.8,
        materials: [{
          id: 5,
          name: 'Мъниста'
        }, {
          id: 7,
          name: 'Висулка'
        }],
        size: 'стандартен',
        picture: 'assets/images/grivna.jpg',
        category: {
          id: 3,
          name: 'Аксесоари'
        },
        daysToMake: 2
      }, {
        id: 9,
        title: 'Обици',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: {
          amount: 8,
          currency: 'BGN'
        },
        rating: 5,
        materials: [{
          id: 6,
          name: 'Въже'
        }, {
          id: 7,
          name: 'Висулка'
        }],
        size: 'стандартен',
        picture: 'assets/images/obici.jpg',
        category: {
          id: 3,
          name: 'Аксесоари'
        },
        daysToMake: 3
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvcHJvZHVjdHMtcmVwb3NpdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7eUdBT00sV0FBVyxFQUdKLGtCQUFrQixFQXNHekIsZUFBZTs7Ozs7Ozs7aUNBaEhiLE1BQU07Ozs7cUNBRU4sbUJBQW1COztpREFDbkIsbUJBQW1COzttREFDbkIsb0JBQW9COzs2Q0FDcEIsaUJBQWlCOzs7QUFFbkIsaUJBQVcsR0FBRyxVQUFVOztBQUdqQix3QkFBa0I7QUFhbEIsaUJBYkEsa0JBQWtCLENBYWpCLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFOzs7ZUFaMUUsa0JBQWtCLEdBQUcsQ0FDbkIsT0FBTyxFQUNQLGFBQWEsRUFDYixPQUFPLEVBQ1AsUUFBUSxFQUNSLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLENBQ2I7O0FBR0MsY0FBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQy9DLGNBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNqRCxjQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7O0FBRTNDLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7QUFDL0MsY0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDOUIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjtTQUNGOztxQkF0QlUsa0JBQWtCOztpQkF3QjFCLGFBQUMsRUFBRSxFQUFFO0FBQ04sZ0JBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7YUFBQSxDQUFDLENBQUM7QUFDckQsbUJBQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFD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TztBQUNkLG1CQUFXLEVBQUUsMkRBQTJELEdBQ3hFLG9FQUFvRTtBQUNwRSxhQUFLLEVBQUU7QUFDTCxnQkFBTSxFQUFFLENBQUM7QUFDVCxrQkFBUSxFQUFFLEtBQUs7U0FDaEI7QUFDRCxjQUFNLEVBQUUsQ0FBQztBQUNULGlCQUFTLEVBQUUsQ0FBQztBQUNWLFlBQUUsRUFBRSxDQUFDO0FBQ0wsY0FBSSxFQUFFLE1BQU07U0FDYixFQUFFO0FBQ0QsWUFBRSxFQUFFLENBQUM7QUFDTCxjQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO0FBQ0YsWUFBSSxFQUFFLFlBQVk7QUFDbEIsZUFBTywyQkFBMkI7QUFDbEMsZ0JBQVEsRUFBRTtBQUNSLFlBQUUsRUFBRSxDQUFDO0FBQ0wsY0FBSSxFQUFFLFdBQVc7U0FDbEI7QUFDRCxrQkFBVSxFQUFFLENBQUM7T0FDZCxDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3JlcG9zaXRvcnkvcHJvZHVjdHMtcmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuaW1wb3J0IHtNYXRlcmlhbHNSZXBvc2l0b3J5fSBmcm9tICcuL21hdGVyaWFscy1yZXBvc2l0b3J5JztcclxuaW1wb3J0IHtDYXRlZ29yaWVzUmVwb3NpdG9yeX0gZnJvbSAnLi9jYXRlZ29yaWVzLXJlcG9zaXRvcnknO1xyXG5pbXBvcnQge1Jldmlld3NSZXBvc2l0b3J5fSBmcm9tICcuL3Jldmlld3MtcmVwb3NpdG9yeSc7XHJcblxyXG5jb25zdCBwcm9kdWN0c0tleSA9ICdwcm9kdWN0cyc7XHJcblxyXG5AaW5qZWN0KE1hdGVyaWFsc1JlcG9zaXRvcnksIENhdGVnb3JpZXNSZXBvc2l0b3J5LCBSZXZpZXdzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzUmVwb3NpdG9yeSB7XHJcbiAgZWRpdGFibGVQcm9wZXJ0aWVzID0gW1xyXG4gICAgJ3RpdGxlJyxcclxuICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAncHJpY2UnLFxyXG4gICAgJ3JhdGluZycsXHJcbiAgICAnbWF0ZXJpYWxzJyxcclxuICAgICdzaXplJyxcclxuICAgICdwaWN0dXJlJyxcclxuICAgICdjYXRlZ29yeScsXHJcbiAgICAnZGF5c1RvTWFrZSdcclxuICBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihtYXRlcmlhbHNSZXBvc2l0b3J5LCBjYXRlZ29yaWVzUmVwb3NpdG9yeSwgcmV2aWV3c1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeSA9IG1hdGVyaWFsc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNSZXBvc2l0b3J5ID0gY2F0ZWdvcmllc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLnJldmlld3NSZXBvc2l0b3J5ID0gcmV2aWV3c1JlcG9zaXRvcnk7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMuX2dldEFsbEZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLl9pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQoaWQpIHtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzLmZpbmQocCA9PiBwLmlkID09PSBpZCk7XHJcbiAgICBwcm9kdWN0LnJhdGluZyA9IHRoaXMucmV2aWV3c1JlcG9zaXRvcnkuZ2V0UmF0aW5nRm9yUHJvZHVjdChwcm9kdWN0LmlkKTtcclxuICAgIHJldHVybiBwcm9kdWN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsKGNvcHkgPSBmYWxzZSkge1xyXG4gICAgaWYgKGNvcHkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2dldEFsbEZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgIHAucmF0aW5nID0gdGhpcy5yZXZpZXdzUmVwb3NpdG9yeS5nZXRSYXRpbmdGb3JQcm9kdWN0KHAuaWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdHM7XHJcbiAgfVxyXG5cclxuICBnZXRCeVF1ZXJ5KHF1ZXJ5KSB7XHJcbiAgICBjb25zdCBsb3dlckNhc2VRdWVyeSA9IHF1ZXJ5LnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0cy5maWx0ZXIocCA9PiBwLnRpdGxlLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZihsb3dlckNhc2VRdWVyeSkgPiAtMSlcclxuICAgICAgLm1hcChwID0+IHtcclxuICAgICAgICBwLnJhdGluZyA9IHRoaXMucmV2aWV3c1JlcG9zaXRvcnkuZ2V0UmF0aW5nRm9yUHJvZHVjdChwLmlkKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnlDYXRlZ29yeShjYXRlZ29yeUlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0cy5maWx0ZXIocCA9PiBwLmNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKS5tYXAocCA9PiB7XHJcbiAgICAgIHAucmF0aW5nID0gdGhpcy5yZXZpZXdzUmVwb3NpdG9yeS5nZXRSYXRpbmdGb3JQcm9kdWN0KHAuaWQpO1xyXG4gICAgICByZXR1cm4gcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShwcm9kdWN0RGF0YSkge1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IHt9O1xyXG4gICAgcHJvZHVjdC5pZCA9ICsrdGhpcy5sYXN0SWQ7XHJcbiAgICB0aGlzLmVkaXRhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHRoaXMuX2VkaXRQcm9wZXJ0eShwcm9kdWN0LCBwcm9kdWN0RGF0YSwgcHJvcGVydHkpKTtcclxuICAgIHRoaXMucHJvZHVjdHMucHVzaChwcm9kdWN0KTtcclxuICAgIHRoaXMuX3NhdmVBbGxUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgcmV0dXJuIHByb2R1Y3QuaWQ7XHJcbiAgfVxyXG5cclxuICBlZGl0KHByb2R1Y3REYXRhKSB7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5nZXQocHJvZHVjdERhdGEuaWQpO1xyXG4gICAgdGhpcy5lZGl0YWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB0aGlzLl9lZGl0UHJvcGVydHkocHJvZHVjdCwgcHJvZHVjdERhdGEsIHByb3BlcnR5KSk7XHJcbiAgICB0aGlzLl9zYXZlQWxsVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICB9XHJcblxyXG4gIF9pbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5wcm9kdWN0cyA9IGluaXRpYWxQcm9kdWN0cy5tYXAocCA9PiB7XHJcbiAgICAgIHAubWF0ZXJpYWxzID0gcC5tYXRlcmlhbHMubWFwKG0gPT4gdGhpcy5tYXRlcmlhbHNSZXBvc2l0b3J5LmdldChtLmlkKSk7XHJcbiAgICAgIHAuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3JpZXNSZXBvc2l0b3J5LmdldChwLmNhdGVnb3J5LmlkKTtcclxuICAgICAgcC5yYXRpbmcgPSB0aGlzLnJldmlld3NSZXBvc2l0b3J5LmdldFJhdGluZ0ZvclByb2R1Y3QocC5pZCk7XHJcbiAgICAgIHJldHVybiBwO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zYXZlQWxsVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICB9XHJcblxyXG4gIF9nZXRBbGxGcm9tTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgcmV0dXJuIChsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChwcm9kdWN0c0tleSkgfHwgW10pLm1hcChwID0+IHtcclxuICAgICAgcC5tYXRlcmlhbHMgPSBwLm1hdGVyaWFscy5tYXAobSA9PiB0aGlzLm1hdGVyaWFsc1JlcG9zaXRvcnkuZ2V0KG0uaWQpKTtcclxuICAgICAgcC5jYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcmllc1JlcG9zaXRvcnkuZ2V0KHAuY2F0ZWdvcnkuaWQpO1xyXG4gICAgICBwLnJhdGluZyA9IHRoaXMucmV2aWV3c1JlcG9zaXRvcnkuZ2V0UmF0aW5nRm9yUHJvZHVjdChwLmlkKTtcclxuICAgICAgcC5kYXRlVGltZUFkZGVkID0gbW9tZW50KHAuZGF0ZVRpbWVBZGRlZCk7XHJcbiAgICAgIHJldHVybiBwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfc2F2ZUFsbFRvTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKHByb2R1Y3RzS2V5LCB0aGlzLnByb2R1Y3RzKTtcclxuICB9XHJcblxyXG4gIF9lZGl0UHJvcGVydHkocHJvZHVjdCwgcHJvZHVjdERhdGEsIHByb3BlcnR5KSB7XHJcbiAgICBwcm9kdWN0W3Byb3BlcnR5XSA9IHByb2R1Y3REYXRhW3Byb3BlcnR5XSB8fCBwcm9kdWN0W3Byb3BlcnR5XTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGluaXRpYWxQcm9kdWN0cyA9IFt7XHJcbiAgaWQ6IDEsXHJcbiAgdGl0bGU6ICfQn9GA0L7Qu9C10YLQvdCwINC60LDRgNGC0LjRh9C60LAnLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogMTAsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNC4xLFxyXG4gIG1hdGVyaWFsczogW3tcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0L7QvSdcclxuICB9XSxcclxuICBzaXplOiAnMjDRgdC8IHggMTDRgdC8JyxcclxuICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9rYXJ0aWNoa2ExLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0LjRh9C60LgnXHJcbiAgfSxcclxuICBkYXlzVG9NYWtlOiAyXHJcbn0sIHtcclxuICBpZDogMixcclxuICB0aXRsZTogJ9Ca0LDRgNGC0LjRh9C60LAg0YEg0YDQvtC30LgnLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogMTAsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNC43LFxyXG4gIG1hdGVyaWFsczogW3tcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0L7QvSdcclxuICB9XSxcclxuICBzaXplOiAnMjDRgdC8IHggMTDRgdC8JyxcclxuICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9rYXJ0aWNoa2EyLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0LjRh9C60LgnXHJcbiAgfSxcclxuICBkYXlzVG9NYWtlOiAyXHJcbn0sIHtcclxuICBpZDogMyxcclxuICB0aXRsZTogJ9Ca0L7Qu9C10LTQvdCwINC60LDRgNGC0LjRh9C60LAg0YEg0LXQu9C10L0nLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogMTAsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNC42LFxyXG4gIG1hdGVyaWFsczogW3tcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0L7QvSdcclxuICB9LCB7XHJcbiAgICBpZDogMixcclxuICAgIG5hbWU6ICfQkdGA0L7QutCw0YInXHJcbiAgfV0sXHJcbiAgc2l6ZTogJzIw0YHQvCB4IDEw0YHQvCcsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMva2FydGljaGthMy5qcGdgLFxyXG4gIGNhdGVnb3J5OiB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC40YfQutC4J1xyXG4gIH0sXHJcbiAgZGF5c1RvTWFrZTogMlxyXG59LCB7XHJcbiAgaWQ6IDQsXHJcbiAgdGl0bGU6ICfQlNC10YLRgdC60LAg0YLQvtGA0YLQsCDQvtGCINC60LDRgNGC0L7QvScsXHJcbiAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCAnICtcclxuICAnc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuJyxcclxuICBwcmljZToge1xyXG4gICAgYW1vdW50OiAzMCxcclxuICAgIGN1cnJlbmN5OiAnQkdOJ1xyXG4gIH0sXHJcbiAgcmF0aW5nOiA0LjYsXHJcbiAgbWF0ZXJpYWxzOiBbe1xyXG4gICAgaWQ6IDEsXHJcbiAgICBuYW1lOiAn0JrQsNGA0YLQvtC9J1xyXG4gIH0sIHtcclxuICAgIGlkOiAzLFxyXG4gICAgbmFtZTogJ9Ch0YLQuNC60LXRgNC4J1xyXG4gIH0sIHtcclxuICAgIGlkOiA0LFxyXG4gICAgbmFtZTogJ9Cf0LDQvdC00LXQu9C60LAnXHJcbiAgfV0sXHJcbiAgc2l6ZTogJzQw0YHQvCB4IDQw0YHQvCB4IDIw0YHQvCcsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMvdG9ydGEuanBnYCxcclxuICBjYXRlZ29yeToge1xyXG4gICAgaWQ6IDIsXHJcbiAgICBuYW1lOiAn0KLQvtGA0YLQuCdcclxuICB9LFxyXG4gIGRheXNUb01ha2U6IDVcclxufSwge1xyXG4gIGlkOiA1LFxyXG4gIHRpdGxlOiAn0JTQtdGC0YHQutCwINC00LjQsNC00LXQvNCwJyxcclxuICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gIHByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDgsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNC4xLFxyXG4gIG1hdGVyaWFsczogW3tcclxuICAgIGlkOiA1LFxyXG4gICAgbmFtZTogJ9Cc0YrQvdC40YHRgtCwJ1xyXG4gIH0sIHtcclxuICAgIGlkOiA0LFxyXG4gICAgbmFtZTogJ9Cf0LDQvdC00LXQu9C60LAnXHJcbiAgfV0sXHJcbiAgc2l6ZTogJ9GB0YLQsNC90LTQsNGA0YLQtdC9JyxcclxuICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9kaWFkZW1hLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAzLFxyXG4gICAgbmFtZTogJ9CQ0LrRgdC10YHQvtCw0YDQuCdcclxuICB9LFxyXG4gIGRheXNUb01ha2U6IDNcclxufSwge1xyXG4gIGlkOiA2LFxyXG4gIHRpdGxlOiAn0KDRitGH0L3QviDQuNC30YDQsNCx0L7RgtC10L3QsCDQutCw0YDRgtC+0L3QtdC90LAg0YLQvtGA0YLQsCcsXHJcbiAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCAnICtcclxuICAnc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuJyxcclxuICBwcmljZToge1xyXG4gICAgYW1vdW50OiAyMCxcclxuICAgIGN1cnJlbmN5OiAnQkdOJ1xyXG4gIH0sXHJcbiAgcmF0aW5nOiA0LjMsXHJcbiAgbWF0ZXJpYWxzOiBbe1xyXG4gICAgaWQ6IDEsXHJcbiAgICBuYW1lOiAn0JrQsNGA0YLQvtC9J1xyXG4gIH0sIHtcclxuICAgIGlkOiAzLFxyXG4gICAgbmFtZTogJ9Ch0YLQuNC60LXRgNC4J1xyXG4gIH0sIHtcclxuICAgIGlkOiA0LFxyXG4gICAgbmFtZTogJ9Cf0LDQvdC00LXQu9C60LAnXHJcbiAgfV0sXHJcbiAgc2l6ZTogJzQw0YHQvCB4IDQw0YHQvCB4IDIw0YHQvCcsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMvdG9ydGEyLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ9Ci0L7RgNGC0LgnXHJcbiAgfSxcclxuICBkYXlzVG9NYWtlOiA1XHJcbn0sIHtcclxuICBpZDogNyxcclxuICB0aXRsZTogJ9Ce0LPRitGA0LvQuNGG0LAg0YHRitGBINGB0YrRgNGG0LUnLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogNyxcclxuICAgIGN1cnJlbmN5OiAnQkdOJ1xyXG4gIH0sXHJcbiAgcmF0aW5nOiA0LjgsXHJcbiAgbWF0ZXJpYWxzOiBbe1xyXG4gICAgaWQ6IDYsXHJcbiAgICBuYW1lOiAn0JLRitC20LUnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDcsXHJcbiAgICBuYW1lOiAn0JLQuNGB0YPQu9C60LAnXHJcbiAgfV0sXHJcbiAgc2l6ZTogJ9GB0YLQsNC90LTQsNGA0YLQtdC9JyxcclxuICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9nZXJkYW4uanBnYCxcclxuICBjYXRlZ29yeToge1xyXG4gICAgaWQ6IDMsXHJcbiAgICBuYW1lOiAn0JDQutGB0LXRgdC+0LDRgNC4J1xyXG4gIH0sXHJcbiAgZGF5c1RvTWFrZTogMlxyXG59LCB7XHJcbiAgaWQ6IDgsXHJcbiAgdGl0bGU6ICfQk9GA0LjQstC90LAg0YHRitGBINGB0YrRgNGG0LUnLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogNyxcclxuICAgIGN1cnJlbmN5OiAnQkdOJ1xyXG4gIH0sXHJcbiAgcmF0aW5nOiA0LjgsXHJcbiAgbWF0ZXJpYWxzOiBbe1xyXG4gICAgaWQ6IDUsXHJcbiAgICBuYW1lOiAn0JzRitC90LjRgdGC0LAnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDcsXHJcbiAgICBuYW1lOiAn0JLQuNGB0YPQu9C60LAnXHJcbiAgfV0sXHJcbiAgc2l6ZTogJ9GB0YLQsNC90LTQsNGA0YLQtdC9JyxcclxuICBwaWN0dXJlOiBgYXNzZXRzL2ltYWdlcy9ncml2bmEuanBnYCxcclxuICBjYXRlZ29yeToge1xyXG4gICAgaWQ6IDMsXHJcbiAgICBuYW1lOiAn0JDQutGB0LXRgdC+0LDRgNC4J1xyXG4gIH0sXHJcbiAgZGF5c1RvTWFrZTogMlxyXG59LCB7XHJcbiAgaWQ6IDksXHJcbiAgdGl0bGU6ICfQntCx0LjRhtC4JyxcclxuICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gIHByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDgsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNSxcclxuICBtYXRlcmlhbHM6IFt7XHJcbiAgICBpZDogNixcclxuICAgIG5hbWU6ICfQktGK0LbQtSdcclxuICB9LCB7XHJcbiAgICBpZDogNyxcclxuICAgIG5hbWU6ICfQktC40YHRg9C70LrQsCdcclxuICB9XSxcclxuICBzaXplOiAn0YHRgtCw0L3QtNCw0YDRgtC10L0nLFxyXG4gIHBpY3R1cmU6IGBhc3NldHMvaW1hZ2VzL29iaWNpLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAzLFxyXG4gICAgbmFtZTogJ9CQ0LrRgdC10YHQvtCw0YDQuCdcclxuICB9LFxyXG4gIGRheXNUb01ha2U6IDNcclxufV07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
