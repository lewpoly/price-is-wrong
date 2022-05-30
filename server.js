//TODO: Allow server to recognize and load image files and 
//audio files

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

let items = [tesla, kaid]
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
      //Chooses item
      // let item = (items[Math.floor(Math.random()*2)])
      // console.log(item)
      // returns item as json object
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

  //  ***********

  //  ATTEMPT AT MAKING THE PHOTOS WORK

  // ********************


   else if (page == '/img/2.jpg') {
    fs.readFile('./img/2.jpg', function (err, data) {
       res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
   else if (page == '/img/kaid.jpeg') {
    fs.readFile('./img/kaid.jpeg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/img/t.jpeg') {
    fs.readFile('./img/t.jpeg', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data);
      res.end();
    });
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
