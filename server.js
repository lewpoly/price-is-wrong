const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

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
    if (params['priceIsWrong'] == '') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        verdict: 'Enter a value!!!',
      };
      res.end(JSON.stringify(objToJson));
    }
    if (Number(params['priceIsWrong']) < 45000) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        verdict: 'The Price is Wrong!!!! Too low!',
      };
      res.end(JSON.stringify(objToJson));
    } //priceIsWrong = leon
    else if (Number(params['priceIsWrong']) > 45000) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        verdict: 'The Price is WRONG! too High!',
      };
      res.end(JSON.stringify(objToJson));
    } else if (Number(params['priceIsWrong']) == 45000) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        verdict: 'The Price is PERFECT!',
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
  } else {
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

server.listen(8000);
