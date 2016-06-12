export class Product{
  constructor(data){
    data = data || {};
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.rating = data.rating || 0;
    this.materials = data.materials || [];
    this.size = data.size;
    this.picture = data.picture;
    this.pictures = data.pictures || [];
    this.category = data.category;
    this.daysToMake = data.daysToMake;
    
  }

  getData(){
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      rating: this.rating,
      materials: this.materials,
      size: this.size,
      picture: this.picture,
      pictures: this.pictures,
      category: this.category,
      daysToMake: this.daysToMake
    };
  }

  getCopy() {
    return JSON.parse(JSON.stringify(this.getData()));
  }
}


