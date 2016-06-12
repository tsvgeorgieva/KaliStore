System.register(['aurelia-framework', 'service', './materials-repository', './categories-repository'], function (_export) {
  'use strict';

  var inject, localStorageManager, MaterialsRepository, CategoriesRepository, productsKey, ProductsRepository, initialProducts;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_service) {
      localStorageManager = _service.localStorageManager;
    }, function (_materialsRepository) {
      MaterialsRepository = _materialsRepository.MaterialsRepository;
    }, function (_categoriesRepository) {
      CategoriesRepository = _categoriesRepository.CategoriesRepository;
    }],
    execute: function () {
      productsKey = 'products';

      ProductsRepository = (function () {
        function ProductsRepository(materialsRepository, categoriesRepository) {
          _classCallCheck(this, _ProductsRepository);

          this.editableProperties = ['title', 'description', 'price', 'rating', 'materials', 'size', 'picture', 'category', 'daysToMake'];

          this.materialsRepository = materialsRepository;
          this.categoriesRepository = categoriesRepository;

          this.products = this._getAllFromLocalStorage();
          if (this.products.length === 0) {
            this._initialize();
          }
        }

        _createClass(ProductsRepository, [{
          key: 'get',
          value: function get(id) {
            return this.products.find(function (p) {
              return p.id === id;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            var copy = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (copy) {
              return this._getAllFromLocalStorage();
            }

            return this.products;
          }
        }, {
          key: 'getByQuery',
          value: function getByQuery(query) {
            var lowerCaseQuery = query.toLocaleLowerCase();
            return this.products.filter(function (p) {
              return p.title.toLocaleLowerCase().indexOf(lowerCaseQuery) > -1;
            });
          }
        }, {
          key: 'getByCategory',
          value: function getByCategory(categoryId) {
            return this.products.filter(function (p) {
              return p.category.id === categoryId;
            });
          }
        }, {
          key: 'save',
          value: function save(productData) {
            var _this = this;

            var product = {};
            product.id = ++this.lastId;
            this.editableProperties.forEach(function (property) {
              return _this._editProperty(product, productData, property);
            });
            this.products.push(product);
            this._saveAllToLocalStorage();
            return product.id;
          }
        }, {
          key: 'edit',
          value: function edit(productData) {
            var _this2 = this;

            var product = this.get(productData.id);
            this.editableProperties.forEach(function (property) {
              return _this2._editProperty(product, productData, property);
            });
            this._saveAllToLocalStorage();
          }
        }, {
          key: '_initialize',
          value: function _initialize() {
            var _this3 = this;

            this.products = initialProducts.map(function (p) {
              p.materials = p.materials.map(function (m) {
                return _this3.materialsRepository.get(m.id);
              });
              p.category = _this3.categoriesRepository.get(p.category.id);
              return p;
            });
            this._saveAllToLocalStorage();
          }
        }, {
          key: '_getAllFromLocalStorage',
          value: function _getAllFromLocalStorage() {
            var _this4 = this;

            return (localStorageManager.get(productsKey) || []).map(function (p) {
              p.materials = p.materials.map(function (m) {
                return _this4.materialsRepository.get(m.id);
              });
              p.category = _this4.categoriesRepository.get(p.category.id);
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
        ProductsRepository = inject(MaterialsRepository, CategoriesRepository)(ProductsRepository) || ProductsRepository;
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
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvcHJvZHVjdHMtcmVwb3NpdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OEVBS00sV0FBVyxFQUdKLGtCQUFrQixFQXFGekIsZUFBZTs7Ozs7Ozs7aUNBN0ZiLE1BQU07O3FDQUNOLG1CQUFtQjs7aURBQ25CLG1CQUFtQjs7bURBQ25CLG9CQUFvQjs7O0FBRXRCLGlCQUFXLEdBQUcsVUFBVTs7QUFHakIsd0JBQWtCO0FBYWxCLGlCQWJBLGtCQUFrQixDQWFqQixtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRTs7O2VBWnZELGtCQUFrQixHQUFHLENBQ25CLE9BQU8sRUFDUCxhQUFhLEVBQ2IsT0FBTyxFQUNQLFFBQVEsRUFDUixXQUFXLEVBQ1gsTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxDQUNiOztBQUdDLGNBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUMvQyxjQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7O0FBRWpELGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7QUFDL0MsY0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDOUIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNwQjtTQUNGOztxQkFyQlUsa0JBQWtCOztpQkF1QjFCLGFBQUMsRUFBRSxFQUFFO0FBQ04sbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO3FCQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTthQUFBLENBQUMsQ0FBQztXQUM3Qzs7O2lCQUVLLGtCQUFlO2dCQUFkLElBQUkseURBQUcsS0FBSzs7QUFDakIsZ0JBQUksSUFBSSxFQUFFO0FBQ1IscUJBQU8sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDdkM7O0FBRUQsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FB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QVEsRUFBRTtBQUNSLFlBQUUsRUFBRSxDQUFDO0FBQ0wsY0FBSSxFQUFFLE9BQU87U0FDZDtBQUNELGtCQUFVLEVBQUUsQ0FBQztPQUNkLEVBQUU7QUFDRCxVQUFFLEVBQUUsQ0FBQztBQUNMLGFBQUssRUFBRSxnQkFBZ0I7QUFDdkIsbUJBQVcsRUFBRSwyREFBMkQsR0FDeEUsb0VBQW9FO0FBQ3BFLGFBQUssRUFBRTtBQUNMLGdCQUFNLEVBQUUsQ0FBQztBQUNULGtCQUFRLEVBQUUsS0FBSztTQUNoQjtBQUNELGNBQU0sRUFBRSxHQUFHO0FBQ1gsaUJBQVMsRUFBRSxDQUFDO0FBQ1YsWUFBRSxFQUFFLENBQUM7QUFDTCxjQUFJLEVBQUUsU0FBUztTQUNoQixFQUFFO0FBQ0QsWUFBRSxFQUFFLENBQUM7QUFDTCxjQUFJLEVBQUUsVUFBVTtTQUNqQixDQUFDO0FBQ0YsWUFBSSxFQUFFLFlBQVk7QUFDbEIsZUFBTyw2QkFBNkI7QUFDcEMsZ0JBQVEsRUFBRTtBQUNSLFlBQUUsRUFBRSxDQUFDO0FBQ0wsY0FBSSxFQUFFLFdBQVc7U0FDbEI7QUFDRCxrQkFBVSxFQUFFLENBQUM7T0FDZCxDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3JlcG9zaXRvcnkvcHJvZHVjdHMtcmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7bG9jYWxTdG9yYWdlTWFuYWdlcn0gZnJvbSAnc2VydmljZSc7XHJcbmltcG9ydCB7TWF0ZXJpYWxzUmVwb3NpdG9yeX0gZnJvbSAnLi9tYXRlcmlhbHMtcmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7Q2F0ZWdvcmllc1JlcG9zaXRvcnl9IGZyb20gJy4vY2F0ZWdvcmllcy1yZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IHByb2R1Y3RzS2V5ID0gJ3Byb2R1Y3RzJztcclxuXHJcbkBpbmplY3QoTWF0ZXJpYWxzUmVwb3NpdG9yeSwgQ2F0ZWdvcmllc1JlcG9zaXRvcnkpXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c1JlcG9zaXRvcnkge1xyXG4gIGVkaXRhYmxlUHJvcGVydGllcyA9IFtcclxuICAgICd0aXRsZScsXHJcbiAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgJ3ByaWNlJyxcclxuICAgICdyYXRpbmcnLFxyXG4gICAgJ21hdGVyaWFscycsXHJcbiAgICAnc2l6ZScsXHJcbiAgICAncGljdHVyZScsXHJcbiAgICAnY2F0ZWdvcnknLFxyXG4gICAgJ2RheXNUb01ha2UnXHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IobWF0ZXJpYWxzUmVwb3NpdG9yeSwgY2F0ZWdvcmllc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeSA9IG1hdGVyaWFsc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNSZXBvc2l0b3J5ID0gY2F0ZWdvcmllc1JlcG9zaXRvcnk7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMuX2dldEFsbEZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLl9pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2R1Y3RzLmZpbmQocCA9PiBwLmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoY29weSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoY29weSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZ2V0QWxsRnJvbUxvY2FsU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnByb2R1Y3RzO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnlRdWVyeShxdWVyeSkge1xyXG4gICAgY29uc3QgbG93ZXJDYXNlUXVlcnkgPSBxdWVyeS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdHMuZmlsdGVyKHAgPT4gcC50aXRsZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YobG93ZXJDYXNlUXVlcnkpID4gLTEpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnlDYXRlZ29yeShjYXRlZ29yeUlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0cy5maWx0ZXIocCA9PiBwLmNhdGVnb3J5LmlkID09PSBjYXRlZ29yeUlkKTtcclxuICB9XHJcblxyXG4gIHNhdmUocHJvZHVjdERhdGEpIHtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB7fTtcclxuICAgIHByb2R1Y3QuaWQgPSArK3RoaXMubGFzdElkO1xyXG4gICAgdGhpcy5lZGl0YWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB0aGlzLl9lZGl0UHJvcGVydHkocHJvZHVjdCwgcHJvZHVjdERhdGEsIHByb3BlcnR5KSk7XHJcbiAgICB0aGlzLnByb2R1Y3RzLnB1c2gocHJvZHVjdCk7XHJcbiAgICB0aGlzLl9zYXZlQWxsVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIHJldHVybiBwcm9kdWN0LmlkO1xyXG4gIH1cclxuXHJcbiAgZWRpdChwcm9kdWN0RGF0YSkge1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IHRoaXMuZ2V0KHByb2R1Y3REYXRhLmlkKTtcclxuICAgIHRoaXMuZWRpdGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4gdGhpcy5fZWRpdFByb3BlcnR5KHByb2R1Y3QsIHByb2R1Y3REYXRhLCBwcm9wZXJ0eSkpO1xyXG4gICAgdGhpcy5fc2F2ZUFsbFRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgfVxyXG5cclxuICBfaW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMucHJvZHVjdHMgPSBpbml0aWFsUHJvZHVjdHMubWFwKHAgPT4ge1xyXG4gICAgICBwLm1hdGVyaWFscyA9IHAubWF0ZXJpYWxzLm1hcChtID0+IHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeS5nZXQobS5pZCkpO1xyXG4gICAgICBwLmNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yaWVzUmVwb3NpdG9yeS5nZXQocC5jYXRlZ29yeS5pZCk7XHJcbiAgICAgIHJldHVybiBwO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zYXZlQWxsVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICB9XHJcblxyXG4gIF9nZXRBbGxGcm9tTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgcmV0dXJuIChsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChwcm9kdWN0c0tleSkgfHwgW10pLm1hcChwID0+IHtcclxuICAgICAgcC5tYXRlcmlhbHMgPSBwLm1hdGVyaWFscy5tYXAobSA9PiB0aGlzLm1hdGVyaWFsc1JlcG9zaXRvcnkuZ2V0KG0uaWQpKTtcclxuICAgICAgcC5jYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcmllc1JlcG9zaXRvcnkuZ2V0KHAuY2F0ZWdvcnkuaWQpO1xyXG4gICAgICByZXR1cm4gcDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX3NhdmVBbGxUb0xvY2FsU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShwcm9kdWN0c0tleSwgdGhpcy5wcm9kdWN0cyk7XHJcbiAgfVxyXG5cclxuICBfZWRpdFByb3BlcnR5KHByb2R1Y3QsIHByb2R1Y3REYXRhLCBwcm9wZXJ0eSkge1xyXG4gICAgcHJvZHVjdFtwcm9wZXJ0eV0gPSBwcm9kdWN0RGF0YVtwcm9wZXJ0eV0gfHwgcHJvZHVjdFtwcm9wZXJ0eV07XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsUHJvZHVjdHMgPSBbe1xyXG4gIGlkOiAxLFxyXG4gIHRpdGxlOiAn0J/RgNC+0LvQtdGC0L3QsCDQutCw0YDRgtC40YfQutCwJyxcclxuICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gIHByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDEwLFxyXG4gICAgY3VycmVuY3k6ICdCR04nXHJcbiAgfSxcclxuICByYXRpbmc6IDQuMSxcclxuICBtYXRlcmlhbHM6IFt7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC+0L0nXHJcbiAgfV0sXHJcbiAgc2l6ZTogJzIw0YHQvCB4IDEw0YHQvCcsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMva2FydGljaGthMS5qcGdgLFxyXG4gIGNhdGVnb3J5OiB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC40YfQutC4J1xyXG4gIH0sXHJcbiAgZGF5c1RvTWFrZTogMlxyXG59LCB7XHJcbiAgaWQ6IDIsXHJcbiAgdGl0bGU6ICfQmtCw0YDRgtC40YfQutCwINGBINGA0L7Qt9C4JyxcclxuICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gIHByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDEwLFxyXG4gICAgY3VycmVuY3k6ICdCR04nXHJcbiAgfSxcclxuICByYXRpbmc6IDQuNyxcclxuICBtYXRlcmlhbHM6IFt7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC+0L0nXHJcbiAgfV0sXHJcbiAgc2l6ZTogJzIw0YHQvCB4IDEw0YHQvCcsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMva2FydGljaGthMi5qcGdgLFxyXG4gIGNhdGVnb3J5OiB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC40YfQutC4J1xyXG4gIH0sXHJcbiAgZGF5c1RvTWFrZTogMlxyXG59LCB7XHJcbiAgaWQ6IDMsXHJcbiAgdGl0bGU6ICfQmtC+0LvQtdC00L3QsCDQutCw0YDRgtC40YfQutCwINGBINC10LvQtdC9JyxcclxuICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsICcgK1xyXG4gICdzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4nLFxyXG4gIHByaWNlOiB7XHJcbiAgICBhbW91bnQ6IDEwLFxyXG4gICAgY3VycmVuY3k6ICdCR04nXHJcbiAgfSxcclxuICByYXRpbmc6IDQuNixcclxuICBtYXRlcmlhbHM6IFt7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICfQmtCw0YDRgtC+0L0nXHJcbiAgfSwge1xyXG4gICAgaWQ6IDIsXHJcbiAgICBuYW1lOiAn0JHRgNC+0LrQsNGCJ1xyXG4gIH1dLFxyXG4gIHNpemU6ICcyMNGB0LwgeCAxMNGB0LwnLFxyXG4gIHBpY3R1cmU6IGBhc3NldHMvaW1hZ2VzL2thcnRpY2hrYTMuanBnYCxcclxuICBjYXRlZ29yeToge1xyXG4gICAgaWQ6IDEsXHJcbiAgICBuYW1lOiAn0JrQsNGA0YLQuNGH0LrQuCdcclxuICB9LFxyXG4gIGRheXNUb01ha2U6IDJcclxufSwge1xyXG4gIGlkOiA0LFxyXG4gIHRpdGxlOiAn0JTQtdGC0YHQutCwINGC0L7RgNGC0LAg0L7RgiDQutCw0YDRgtC+0L0nLFxyXG4gIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgJyArXHJcbiAgJ3NlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLicsXHJcbiAgcHJpY2U6IHtcclxuICAgIGFtb3VudDogMzAsXHJcbiAgICBjdXJyZW5jeTogJ0JHTidcclxuICB9LFxyXG4gIHJhdGluZzogNC42LFxyXG4gIG1hdGVyaWFsczogW3tcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ9Ca0LDRgNGC0L7QvSdcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICfQodGC0LjQutC10YDQuCdcclxuICB9LCB7XHJcbiAgICBpZDogNCxcclxuICAgIG5hbWU6ICfQn9Cw0L3QtNC10LvQutCwJ1xyXG4gIH1dLFxyXG4gIHNpemU6ICc0MNGB0LwgeCA0MNGB0LwgeCAyMNGB0LwnLFxyXG4gIHBpY3R1cmU6IGBhc3NldHMvaW1hZ2VzL3RvcnRhLmpwZ2AsXHJcbiAgY2F0ZWdvcnk6IHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ9Ci0L7RgNGC0LgnXHJcbiAgfSxcclxuICBkYXlzVG9NYWtlOiA1XHJcbn0sIHtcclxuICBpZDogNSxcclxuICB0aXRsZTogJ9CU0LXRgtGB0LrQsCDQtNC40LDQtNC10LzQsCcsXHJcbiAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCAnICtcclxuICAnc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuJyxcclxuICBwcmljZToge1xyXG4gICAgYW1vdW50OiA4LFxyXG4gICAgY3VycmVuY3k6ICdCR04nXHJcbiAgfSxcclxuICByYXRpbmc6IDQuMSxcclxuICBtYXRlcmlhbHM6IFt7XHJcbiAgICBpZDogNSxcclxuICAgIG5hbWU6ICfQnNGK0L3QuNGB0YLQsCdcclxuICB9LCB7XHJcbiAgICBpZDogNCxcclxuICAgIG5hbWU6ICfQn9Cw0L3QtNC10LvQutCwJ1xyXG4gIH1dLFxyXG4gIHNpemU6ICfRgdGC0LDQvdC00LDRgNGC0LXQvScsXHJcbiAgcGljdHVyZTogYGFzc2V0cy9pbWFnZXMvZGlhZGVtYS5qcGdgLFxyXG4gIGNhdGVnb3J5OiB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICfQkNC60YHQtdGB0L7QsNGA0LgnXHJcbiAgfSxcclxuICBkYXlzVG9NYWtlOiAzXHJcbn1dO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
