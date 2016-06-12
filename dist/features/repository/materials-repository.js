System.register(['service'], function (_export) {
  'use strict';

  var localStorageManager, materialsKey, MaterialsRepository, initialMaterials;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_service) {
      localStorageManager = _service.localStorageManager;
    }],
    execute: function () {
      materialsKey = 'materials';

      MaterialsRepository = (function () {
        function MaterialsRepository() {
          _classCallCheck(this, MaterialsRepository);

          this.lastId = 0;
          this.editableProperties = ['name'];

          this.materials = localStorageManager.get(materialsKey);
          if (this.materials === undefined) {
            this.initialize();
          }

          this.lastId = this.materials.length;
        }

        _createClass(MaterialsRepository, [{
          key: 'initialize',
          value: function initialize() {
            this.materials = initialMaterials;

            localStorageManager.save(materialsKey, this.materials);
          }
        }, {
          key: 'get',
          value: function get(id) {
            return this.materials.find(function (m) {
              return m.id === id;
            });
          }
        }, {
          key: 'getAll',
          value: function getAll() {
            var copy = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (copy) {
              return localStorageManager.get(materialsKey);
            }

            return this.materials;
          }
        }, {
          key: 'save',
          value: function save(materialData) {
            var _this = this;

            var material = {};
            material.id = ++this.lastId;
            this.editableProperties.forEach(function (property) {
              return _this._editProperty(material, materialData, property);
            });
            this.materials.push(material);
            localStorageManager.save(materialsKey, this.materials);
            return material.id;
          }
        }, {
          key: 'edit',
          value: function edit(materialData) {
            var _this2 = this;

            var material = this.get(materialData.id);
            this.editableProperties.forEach(function (property) {
              return _this2._editProperty(material, materialData, property);
            });
            localStorageManager.save(materialsKey, this.materials);
          }
        }, {
          key: '_editProperty',
          value: function _editProperty(material, materialData, property) {
            material[property] = materialData[property] || material[property];
          }
        }]);

        return MaterialsRepository;
      })();

      _export('MaterialsRepository', MaterialsRepository);

      initialMaterials = [{
        id: 1,
        name: 'Картон'
      }, {
        id: 2,
        name: 'Брокат'
      }, {
        id: 3,
        name: 'Стикери'
      }, {
        id: 4,
        name: 'Панделка'
      }, {
        id: 5,
        name: 'Мъниста'
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvbWF0ZXJpYWxzLXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVNLFlBQVksRUFFTCxtQkFBbUIsRUFxRDFCLGdCQUFnQjs7Ozs7Ozs7cUNBekRkLG1CQUFtQjs7O0FBRXJCLGtCQUFZLEdBQUcsV0FBVzs7QUFFbkIseUJBQW1CO0FBTW5CLGlCQU5BLG1CQUFtQixHQU1oQjtnQ0FOSCxtQkFBbUI7O2VBQzlCLE1BQU0sR0FBRyxDQUFDO2VBQ1Ysa0JBQWtCLEdBQUcsQ0FDbkIsTUFBTSxDQUNQOztBQUdDLGNBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELGNBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7QUFDaEMsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7QUFFRCxjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ3JDOztxQkFiVSxtQkFBbUI7O2lCQWVwQixzQkFBRztBQUNYLGdCQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDOztBQUVsQywrQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUN4RDs7O2lCQUVFLGFBQUMsRUFBRSxFQUFFO0FBQ04sbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO3FCQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTthQUFBLENBQUMsQ0FBQztXQUM5Qzs7O2lCQUVLLGtCQUFlO2dCQUFkLElBQUkseURBQUcsS0FBSzs7QUFDakIsZ0JBQUksSUFBSSxFQUFFO0FBQ1IscUJBQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlDOztBQUVELG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7V0FDdkI7OztpQkFFRyxjQUFDLFlBQVksRUFBRTs7O0FBQ2pCLGdCQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsb0JBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVCLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtxQkFBSSxNQUFLLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNsRyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsK0JBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsbUJBQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztXQUNwQjs7O2lCQUVHLGNBQUMsWUFBWSxFQUFFOzs7QUFDakIsZ0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtxQkFBSSxPQUFLLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNsRywrQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUN4RDs7O2lCQUVZLHVCQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFO0FBQzlDLG9CQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUNuRTs7O2VBbERVLG1CQUFtQjs7Ozs7QUFxRDFCLHNCQUFnQixHQUFHLENBQUM7QUFDeEIsVUFBRSxFQUFFLENBQUM7QUFDTCxZQUFJLEVBQUUsUUFBUTtPQUNmLEVBQUU7QUFDRCxVQUFFLEVBQUUsQ0FBQztBQUNMLFlBQUksRUFBRSxRQUFRO09BQ2YsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFNBQVM7T0FDaEIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFVBQVU7T0FDakIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFNBQVM7T0FDaEIsQ0FBQyIsImZpbGUiOiJmZWF0dXJlcy9yZXBvc2l0b3J5L21hdGVyaWFscy1yZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtsb2NhbFN0b3JhZ2VNYW5hZ2VyfSBmcm9tICdzZXJ2aWNlJztcclxuXHJcbmNvbnN0IG1hdGVyaWFsc0tleSA9ICdtYXRlcmlhbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc1JlcG9zaXRvcnkge1xyXG4gIGxhc3RJZCA9IDA7XHJcbiAgZWRpdGFibGVQcm9wZXJ0aWVzID0gW1xyXG4gICAgJ25hbWUnXHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFscyA9IGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0KG1hdGVyaWFsc0tleSk7XHJcbiAgICBpZiAodGhpcy5tYXRlcmlhbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxhc3RJZCA9IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFscyA9IGluaXRpYWxNYXRlcmlhbHM7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKG1hdGVyaWFsc0tleSwgdGhpcy5tYXRlcmlhbHMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0KGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXRlcmlhbHMuZmluZChtID0+IG0uaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldEFsbChjb3B5ID0gZmFsc2UpIHtcclxuICAgIGlmIChjb3B5KSB7XHJcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldChtYXRlcmlhbHNLZXkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gdGhpcy5tYXRlcmlhbHM7XHJcbiAgfVxyXG5cclxuICBzYXZlKG1hdGVyaWFsRGF0YSkge1xyXG4gICAgY29uc3QgbWF0ZXJpYWwgPSB7fTtcclxuICAgIG1hdGVyaWFsLmlkID0gKyt0aGlzLmxhc3RJZDtcclxuICAgIHRoaXMuZWRpdGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4gdGhpcy5fZWRpdFByb3BlcnR5KG1hdGVyaWFsLCBtYXRlcmlhbERhdGEsIHByb3BlcnR5KSk7XHJcbiAgICB0aGlzLm1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcclxuICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2F2ZShtYXRlcmlhbHNLZXksIHRoaXMubWF0ZXJpYWxzKTtcclxuICAgIHJldHVybiBtYXRlcmlhbC5pZDtcclxuICB9XHJcblxyXG4gIGVkaXQobWF0ZXJpYWxEYXRhKSB7XHJcbiAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuZ2V0KG1hdGVyaWFsRGF0YS5pZCk7XHJcbiAgICB0aGlzLmVkaXRhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHRoaXMuX2VkaXRQcm9wZXJ0eShtYXRlcmlhbCwgbWF0ZXJpYWxEYXRhLCBwcm9wZXJ0eSkpO1xyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKG1hdGVyaWFsc0tleSwgdGhpcy5tYXRlcmlhbHMpO1xyXG4gIH1cclxuXHJcbiAgX2VkaXRQcm9wZXJ0eShtYXRlcmlhbCwgbWF0ZXJpYWxEYXRhLCBwcm9wZXJ0eSkge1xyXG4gICAgbWF0ZXJpYWxbcHJvcGVydHldID0gbWF0ZXJpYWxEYXRhW3Byb3BlcnR5XSB8fCBtYXRlcmlhbFtwcm9wZXJ0eV07XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBpbml0aWFsTWF0ZXJpYWxzID0gW3tcclxuICBpZDogMSxcclxuICBuYW1lOiAn0JrQsNGA0YLQvtC9J1xyXG59LCB7XHJcbiAgaWQ6IDIsXHJcbiAgbmFtZTogJ9CR0YDQvtC60LDRgidcclxufSwge1xyXG4gIGlkOiAzLFxyXG4gIG5hbWU6ICfQodGC0LjQutC10YDQuCdcclxufSwge1xyXG4gIGlkOiA0LFxyXG4gIG5hbWU6ICfQn9Cw0L3QtNC10LvQutCwJ1xyXG59LCB7XHJcbiAgaWQ6IDUsXHJcbiAgbmFtZTogJ9Cc0YrQvdC40YHRgtCwJ1xyXG59XTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
