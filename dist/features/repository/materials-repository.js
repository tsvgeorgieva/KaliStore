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
      }, {
        id: 6,
        name: 'Въже'
      }, {
        id: 7,
        name: 'Висулка'
      }];
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3JlcG9zaXRvcnkvbWF0ZXJpYWxzLXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVNLFlBQVksRUFFTCxtQkFBbUIsRUFxRDFCLGdCQUFnQjs7Ozs7Ozs7cUNBekRkLG1CQUFtQjs7O0FBRXJCLGtCQUFZLEdBQUcsV0FBVzs7QUFFbkIseUJBQW1CO0FBTW5CLGlCQU5BLG1CQUFtQixHQU1oQjtnQ0FOSCxtQkFBbUI7O2VBQzlCLE1BQU0sR0FBRyxDQUFDO2VBQ1Ysa0JBQWtCLEdBQUcsQ0FDbkIsTUFBTSxDQUNQOztBQUdDLGNBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELGNBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7QUFDaEMsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7QUFFRCxjQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ3JDOztxQkFiVSxtQkFBbUI7O2lCQWVwQixzQkFBRztBQUNYLGdCQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDOztBQUVsQywrQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUN4RDs7O2lCQUVFLGFBQUMsRUFBRSxFQUFFO0FBQ04sbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO3FCQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTthQUFBLENBQUMsQ0FBQztXQUM5Qzs7O2lCQUVLLGtCQUFlO2dCQUFkLElBQUkseURBQUcsS0FBSzs7QUFDakIsZ0JBQUksSUFBSSxFQUFFO0FBQ1IscUJBQU8sbUJBQW1CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlDOztBQUVELG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7V0FDdkI7OztpQkFFRyxjQUFDLFlBQVksRUFBRTs7O0FBQ2pCLGdCQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsb0JBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVCLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtxQkFBSSxNQUFLLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNsRyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsK0JBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkQsbUJBQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztXQUNwQjs7O2lCQUVHLGNBQUMsWUFBWSxFQUFFOzs7QUFDakIsZ0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLGdCQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTtxQkFBSSxPQUFLLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNsRywrQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUN4RDs7O2lCQUVZLHVCQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFO0FBQzlDLG9CQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUNuRTs7O2VBbERVLG1CQUFtQjs7Ozs7QUFxRDFCLHNCQUFnQixHQUFHLENBQUM7QUFDeEIsVUFBRSxFQUFFLENBQUM7QUFDTCxZQUFJLEVBQUUsUUFBUTtPQUNmLEVBQUU7QUFDRCxVQUFFLEVBQUUsQ0FBQztBQUNMLFlBQUksRUFBRSxRQUFRO09BQ2YsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFNBQVM7T0FDaEIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFVBQVU7T0FDakIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLFNBQVM7T0FDaEIsRUFBRTtBQUNELFVBQUUsRUFBRSxDQUFDO0FBQ0wsWUFBSSxFQUFFLE1BQU07T0FDYixFQUFFO0FBQ0QsVUFBRSxFQUFFLENBQUM7QUFDTCxZQUFJLEVBQUUsU0FBUztPQUNoQixDQUFDIiwiZmlsZSI6ImZlYXR1cmVzL3JlcG9zaXRvcnkvbWF0ZXJpYWxzLXJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2xvY2FsU3RvcmFnZU1hbmFnZXJ9IGZyb20gJ3NlcnZpY2UnO1xyXG5cclxuY29uc3QgbWF0ZXJpYWxzS2V5ID0gJ21hdGVyaWFscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxzUmVwb3NpdG9yeSB7XHJcbiAgbGFzdElkID0gMDtcclxuICBlZGl0YWJsZVByb3BlcnRpZXMgPSBbXHJcbiAgICAnbmFtZSdcclxuICBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWF0ZXJpYWxzID0gbG9jYWxTdG9yYWdlTWFuYWdlci5nZXQobWF0ZXJpYWxzS2V5KTtcclxuICAgIGlmICh0aGlzLm1hdGVyaWFscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGFzdElkID0gdGhpcy5tYXRlcmlhbHMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZSgpIHtcclxuICAgIHRoaXMubWF0ZXJpYWxzID0gaW5pdGlhbE1hdGVyaWFscztcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUobWF0ZXJpYWxzS2V5LCB0aGlzLm1hdGVyaWFscyk7XHJcbiAgfVxyXG5cclxuICBnZXQoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLm1hdGVyaWFscy5maW5kKG0gPT4gbS5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsKGNvcHkgPSBmYWxzZSkge1xyXG4gICAgaWYgKGNvcHkpIHtcclxuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0KG1hdGVyaWFsc0tleSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzLm1hdGVyaWFscztcclxuICB9XHJcblxyXG4gIHNhdmUobWF0ZXJpYWxEYXRhKSB7XHJcbiAgICBjb25zdCBtYXRlcmlhbCA9IHt9O1xyXG4gICAgbWF0ZXJpYWwuaWQgPSArK3RoaXMubGFzdElkO1xyXG4gICAgdGhpcy5lZGl0YWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB0aGlzLl9lZGl0UHJvcGVydHkobWF0ZXJpYWwsIG1hdGVyaWFsRGF0YSwgcHJvcGVydHkpKTtcclxuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zYXZlKG1hdGVyaWFsc0tleSwgdGhpcy5tYXRlcmlhbHMpO1xyXG4gICAgcmV0dXJuIG1hdGVyaWFsLmlkO1xyXG4gIH1cclxuXHJcbiAgZWRpdChtYXRlcmlhbERhdGEpIHtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5nZXQobWF0ZXJpYWxEYXRhLmlkKTtcclxuICAgIHRoaXMuZWRpdGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4gdGhpcy5fZWRpdFByb3BlcnR5KG1hdGVyaWFsLCBtYXRlcmlhbERhdGEsIHByb3BlcnR5KSk7XHJcbiAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNhdmUobWF0ZXJpYWxzS2V5LCB0aGlzLm1hdGVyaWFscyk7XHJcbiAgfVxyXG5cclxuICBfZWRpdFByb3BlcnR5KG1hdGVyaWFsLCBtYXRlcmlhbERhdGEsIHByb3BlcnR5KSB7XHJcbiAgICBtYXRlcmlhbFtwcm9wZXJ0eV0gPSBtYXRlcmlhbERhdGFbcHJvcGVydHldIHx8IG1hdGVyaWFsW3Byb3BlcnR5XTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGluaXRpYWxNYXRlcmlhbHMgPSBbe1xyXG4gIGlkOiAxLFxyXG4gIG5hbWU6ICfQmtCw0YDRgtC+0L0nXHJcbn0sIHtcclxuICBpZDogMixcclxuICBuYW1lOiAn0JHRgNC+0LrQsNGCJ1xyXG59LCB7XHJcbiAgaWQ6IDMsXHJcbiAgbmFtZTogJ9Ch0YLQuNC60LXRgNC4J1xyXG59LCB7XHJcbiAgaWQ6IDQsXHJcbiAgbmFtZTogJ9Cf0LDQvdC00LXQu9C60LAnXHJcbn0sIHtcclxuICBpZDogNSxcclxuICBuYW1lOiAn0JzRitC90LjRgdGC0LAnXHJcbn0sIHtcclxuICBpZDogNixcclxuICBuYW1lOiAn0JLRitC20LUnXHJcbn0sIHtcclxuICBpZDogNyxcclxuICBuYW1lOiAn0JLQuNGB0YPQu9C60LAnXHJcbn1dO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
