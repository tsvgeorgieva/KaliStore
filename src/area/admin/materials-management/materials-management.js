import {inject} from 'aurelia-framework';
import {MaterialsRepository} from 'repository';

@inject(MaterialsRepository)
export class MaterialsManagement {
  constructor(materialsRepository) {
    this.materialsRepository = materialsRepository;
    this.materials = this.materialsRepository.getAll(true);
  }

  add() {
    this.materials.push({id: undefined, name: '', isInEditMode: true});
  }

  save(material) {
    material.isInEditMode = false;
    if(material.id !== undefined){
      this.materialsRepository.edit(material);
    } else {
      material.id = this.materialsRepository.save(material);
    }

  }

  edit(material) {
    material.isInEditMode = true;
  }
}
