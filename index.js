class Item{
  constructor(name, price, img){
    this._name = name
    this._price = price
    this.img = img
  }
  getName(){
    return this.name
  }
  getPrice(){
    return this.price
  }
  getImg(){
    return this.img
  }
}

let tesla = new Item('Tesla', 45000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tesla.com%2Fmodels&psig=AOvVaw2drB-cH9MmQWrq1fAnpkzK&ust=1653696636669000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOjm3Jay_vcCFQAAAAAdAAAAABAD')

console.log(tesla)
