//################## IMPORTING LIBS #####################//

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const DribbbleClient = require ("./dribbbleClient.js");
const Parser = require ("./parser.js");
// const engine = require("./engine");
require("./prototypeFunctions");
const helper = require('./helper');

const port = process.env.PORT;

const parser = new Parser();
const dribbbleClient = new DribbbleClient();
const app = express();


//################### SETTING SERVER ####################//

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log("Server is running on : http://localhost:" + port );
});


app.get('/:name', (request, response)=>{
  response.redirect('home');
})

app.get('/:name/home', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }

  let shotsArray = [];
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse) => {
    response.render('pages/home.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

app.get('/:name/contact', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }

  let shotsArray = [];
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse) => {
    response.render('pages/contact.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

// current directory :
// __dirname
