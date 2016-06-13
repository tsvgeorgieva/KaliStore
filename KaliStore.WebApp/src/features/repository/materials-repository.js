import {localStorageManager} from 'service';

const materialsKey = 'materials';

export class MaterialsRepository {
  lastId = 0;
  editableProperties = [
    'name'
  ];

  constructor() {
    this.materials = localStorageManager.get(materialsKey);
    if (this.materials === undefined) {
      this.initialize();
    }

    this.lastId = this.materials.length;
  }

  initialize() {
    this.materials = initialMaterials;

    localStorageManager.save(materialsKey, this.materials);
  }

  get(id) {
    return this.materials.find(m => m.id === id);
  }

  getAll(copy = false) {
    if (copy) {
      return localStorageManager.get(materialsKey);
    }
    
    return this.materials;
  }

  save(materialData) {
    const material = {};
    material.id = ++this.lastId;
    this.editableProperties.forEach(property => this._editProperty(material, materialData, property));
    this.materials.push(material);
    localStorageManager.save(materialsKey, this.materials);
    return material.id;
  }

  edit(materialData) {
    const material = this.get(materialData.id);
    this.editableProperties.forEach(property => this._editProperty(material, materialData, property));
    localStorageManager.save(materialsKey, this.materials);
  }

  _editProperty(material, materialData, property) {
    material[property] = materialData[property] || material[property];
  }
}

const initialMaterials = [{
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
