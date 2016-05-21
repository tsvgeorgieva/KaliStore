
export class User {
  constructor(data){
    data = data || {};
    this.userName = data.userName;
    this.password = data.password;
    this.fullName = data.fullName;
    this.city = data.city;
    this.address = data.address;
    this.phone = data.phone;
  }
  
  getData(){
    return {
      userName: this.userName,
      password: this.password,
      fullName: this.fullName,
      city: this.city,
      address: this.address,
      phone: this.phone
    };
  }
}
