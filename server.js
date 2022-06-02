//TODO: 
// clean up comments/code
// more objects.prices
// make pretty  css
// add the gif of tiny shooter on the toy horse for wins
// make 2 if else for the win condition, to signal if guess is way off 
// (like over or under by more than 50% of the price)
// make win condition within 10 or 20% of the price

const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

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
let tesla = new Item('Tesla', 45000, './img/t.jpeg')
let kaid = new Item('Kitchen Aid', 450, './img/kaid.jpeg')
let bed = new Item('Queen Size Purple Mattress', 1250, './img/bed.jpg')
let cam = new Item('Canon EOS 4000D DSLR Camera', 500, './img/cam.jpg')
let gen = new Item('Honda Generator EU2200i', 1300, './img/gen.png')
let hose = new Item('Garden Hose and Nozzle, 50 ft', 40, './img/hose.jpg')
let ice = new Item('FRIGIDAIRE Ice Maker, 40lb Capacity', 180, './img/ice.jpg')
let kite = new Item('Dragon Kite', 35, './img/kite.jpg')
let toast = new Item('Black and Decker 4 Slice Toaster Oven', 80, './img/toast.png')
let bowls = new Item('Set of 4 20oz Oven Safe Bowls', 23, './img/bowls.jpg')



let items = [tesla, kaid, bed, cam, gen, hose, ice, kite, toast, bowls]
//initialize counter for win condition
let counter = 0

 
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(params);
  console.log(page);
  
  
  const reWrite = (file, contentType) => {
    fs.readFile(file, function (err, data) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    });
  };
  if (page == '/') {
    reWrite('index.html', 'text/html');
  } else if (page == '/api') {

    // When clicking randomItem, returns a random item from list of items, and that is the item the game is played with.
     if (params['randomItem'] == 'true') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(chooseItem()));
    }
    else if (params['reset'] == 'true') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      counter = 0
      console.log(counter)
      const objToJson = {
        count: counter,
      };
      res.end(JSON.stringify(objToJson));
      
    }
      // Compares given price to selected item price
    else if (params['priceIsWrong'] == '') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log(choice._price)
      const objToJson = {
        verdict: 'Enter a value!!!',
        count: counter
      };
      res.end(JSON.stringify(objToJson));
    }
    // if given price is less than actual price
    else if (Number(params['priceIsWrong']) < choice._price) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //add 1 to the counter
      counter++
      // make object with verdict
      const objToJson = {
        verdict: 'The Price is Wrong!!!! Too low!',
        count: counter
      };
      //return to frontend as json
      res.end(JSON.stringify(objToJson));
    } //priceIsWrong = leon
    // if given price is less than actual price
    else if (Number(params['priceIsWrong']) > choice._price) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //add 1 to the counter
      counter++
      const objToJson = {
        verdict: 'The Price is WRONG! too High!',
        count: counter
      };
      res.end(JSON.stringify(objToJson));
    } // If given price is equal to the actual price
    else if (Number(params['priceIsWrong']) == choice._price) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        verdict: 'The Price is PERFECT!',
        count: counter
      };
      res.end(JSON.stringify(objToJson));
    }
    //priceIsWrong if
  } //else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  }

   else if (page == '/img/tv-background.png') {
    reWrite('./img/tv-background.png', 'image/png');
  }
   else if (page == '/img/kaid.jpeg') {
    reWrite('./img/kaid.jpeg', 'image/jpeg');
  }
  else if (page == '/img/t.jpeg') {
    reWrite('./img/t.jpeg', 'image/jpeg');
  }
  else if (page == '/img/kite.jpg') {
    reWrite('./img/kite.jpg', 'image/jpeg');
  }
  else if (page == '/img/hose.jpg') {
    reWrite('./img/hose.jpg', 'image/jpeg');
  }
  else if (page == '/img/ice.jpg') {
    reWrite('./img/ice.jpg', 'image/jpeg');
  }
  else if (page == '/img/cam.jpg') {
    reWrite('./img/cam.jpg', 'image/jpeg');
  }
  else if (page == '/img/bowls.jpg') {
    reWrite('./img/bowls.jpg', 'image/jpeg');
  }
  else if (page == '/img/bed.jpg') {
    reWrite('./img/bed.jpg', 'image/jpeg');
  }
  else if (page == '/img/gen.png') {
    reWrite('./img/gen.png', 'image/png');
  }
  else if (page == '/img/toast.png') {
    reWrite('./img/toast.png', 'image/png');
  }
  else if (page == '/img/clown.mp3') {
    reWrite('./img/clown.mp3', 'image/jpeg');
  }
  else if (page == '/img/bobbyB.jpeg') {
    reWrite('./img/bobbyB.jpeg', 'image/jpeg');
  }
  else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }

});


// initialize choice variable that is visible throughout hte rest of the function
let choice

function chooseItem(){
  //Chooses the item from list of items
  let item = (items[Math.floor(Math.random()*items.length)])
  console.log(item)
  //sets global variable choice to the random item
  choice = item
  return choice
}
server.listen(8000);