System.register(['aurelia-framework', 'repository'], function (_export) {
  'use strict';

  var inject, MaterialsRepository, MaterialsManagement;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_repository) {
      MaterialsRepository = _repository.MaterialsRepository;
    }],
    execute: function () {
      MaterialsManagement = (function () {
        function MaterialsManagement(materialsRepository) {
          _classCallCheck(this, _MaterialsManagement);

          this.materialsRepository = materialsRepository;
          this.materials = this.materialsRepository.getAll(true);
        }

        _createClass(MaterialsManagement, [{
          key: 'add',
          value: function add() {
            this.materials.push({ id: undefined, name: '', isInEditMode: true });
          }
        }, {
          key: 'save',
          value: function save(material) {
            material.isInEditMode = false;
            if (material.id !== undefined) {
              this.materialsRepository.edit(material);
            } else {
              material.id = this.materialsRepository.save(material);
            }
          }
        }, {
          key: 'edit',
          value: function edit(material) {
            material.isInEditMode = true;
          }
        }]);

        var _MaterialsManagement = MaterialsManagement;
        MaterialsManagement = inject(MaterialsRepository)(MaterialsManagement) || MaterialsManagement;
        return MaterialsManagement;
      })();

      _export('MaterialsManagement', MaterialsManagement);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyZWEvYWRtaW4vbWF0ZXJpYWxzLW1hbmFnZW1lbnQvbWF0ZXJpYWxzLW1hbmFnZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21DQUlhLG1CQUFtQjs7Ozs7Ozs7aUNBSnhCLE1BQU07O3dDQUNOLG1CQUFtQjs7O0FBR2QseUJBQW1CO0FBQ25CLGlCQURBLG1CQUFtQixDQUNsQixtQkFBbUIsRUFBRTs7O0FBQy9CLGNBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUMvQyxjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEQ7O3FCQUpVLG1CQUFtQjs7aUJBTTNCLGVBQUc7QUFDSixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7V0FDcEU7OztpQkFFRyxjQUFDLFFBQVEsRUFBRTtBQUNiLG9CQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUM5QixnQkFBRyxRQUFRLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBQztBQUMzQixrQkFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QyxNQUFNO0FBQ0wsc0JBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2RDtXQUVGOzs7aUJBRUcsY0FBQyxRQUFRLEVBQUU7QUFDYixvQkFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7V0FDOUI7OzttQ0F0QlUsbUJBQW1CO0FBQW5CLDJCQUFtQixHQUQvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FDZixtQkFBbUIsS0FBbkIsbUJBQW1CO2VBQW5CLG1CQUFtQiIsImZpbGUiOiJhcmVhL2FkbWluL21hdGVyaWFscy1tYW5hZ2VtZW50L21hdGVyaWFscy1tYW5hZ2VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtNYXRlcmlhbHNSZXBvc2l0b3J5fSBmcm9tICdyZXBvc2l0b3J5JztcclxuXHJcbkBpbmplY3QoTWF0ZXJpYWxzUmVwb3NpdG9yeSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc01hbmFnZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKG1hdGVyaWFsc1JlcG9zaXRvcnkpIHtcclxuICAgIHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeSA9IG1hdGVyaWFsc1JlcG9zaXRvcnk7XHJcbiAgICB0aGlzLm1hdGVyaWFscyA9IHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeS5nZXRBbGwodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBhZGQoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFscy5wdXNoKHtpZDogdW5kZWZpbmVkLCBuYW1lOiAnJywgaXNJbkVkaXRNb2RlOiB0cnVlfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKG1hdGVyaWFsKSB7XHJcbiAgICBtYXRlcmlhbC5pc0luRWRpdE1vZGUgPSBmYWxzZTtcclxuICAgIGlmKG1hdGVyaWFsLmlkICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLm1hdGVyaWFsc1JlcG9zaXRvcnkuZWRpdChtYXRlcmlhbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXRlcmlhbC5pZCA9IHRoaXMubWF0ZXJpYWxzUmVwb3NpdG9yeS5zYXZlKG1hdGVyaWFsKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBlZGl0KG1hdGVyaWFsKSB7XHJcbiAgICBtYXRlcmlhbC5pc0luRWRpdE1vZGUgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
