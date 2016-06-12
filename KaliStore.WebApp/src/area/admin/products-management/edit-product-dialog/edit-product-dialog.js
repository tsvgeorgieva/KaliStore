import {inject, bindable} from 'aurelia-framework';
import {DialogController} from 'dialog';
import {MaterialsRepository, CategoriesRepository} from 'repository';
import {Product} from 'models';

@inject(DialogController, MaterialsRepository, CategoriesRepository)
export class EditProductDialog {
  @bindable selectedPictures;
  
  currencies = ['BGN', 'EUR', 'USD'];

  constructor(dialogController, materialsRepository, categoriesRepository) {
    this.dialogController = dialogController;
    this.materialsRepository = materialsRepository;
    this.categoriesRepository = categoriesRepository;

    this.materials = this.materialsRepository.getAll();
    this.categories = this.categoriesRepository.getAll();
  }

  activate(productData) {
    this.product = new Product(productData);
    this.product.materialsIds = this.product.materials.map(m => m.id.toString());
    this.product.category = this.categoriesRepository.get(this.product.category.id);
    
    //todo: remove this
    window.product = this.product;
  }
  
  save() {
    const productData = this.product.getCopy();
    productData.materials = this.product.materialsIds.map(mId =>
      this.materialsRepository.get(parseInt(mId))
    );
    productData.price.amount = parseFloat(productData.price.amount);
    productData.daysToMake = parseFloat(productData.daysToMake);
    this.dialogController.ok(productData);
  }
  
  cancel() {
    this.dialogController.cancel();
  }

  selectedPicturesChanged() {
    this.product.pictures = this._fileListToArray(this.selectedPictures);
  }

  deletePicture(index){
    this.product.pictures.splice(index, 1);
  }

  deleteFirstPicture(){
    // todo:
  }

  _fileListToArray(fileList) {
    let files = [];
    if (!fileList) {
      return files;
    }
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i));
    }
    return files;
  }
}
