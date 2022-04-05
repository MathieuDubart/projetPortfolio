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
  console.log("Server is running on : http://localhost:" + port + "/mathieu" );
});

//################### HOME PAGE APP.GET ###################//

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

//################### CONTACT APP.GET ####################//

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

//################### ARTWORKS APP.GET ####################//

app.get('/:name/artworks', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }

  let shotsArray = [];
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse) => {
    response.render('pages/artworks.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

//################### ABOUT ME APP.GET ###################//

app.get('/:name/about-me', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }

  let shotsArray = [];
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse) => {
    response.render('pages/aboutMe.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

 //################### LAB APP.GET ###################//

  app.get('/:name/lab', (request, response)=>{
    let username = request.params.name;
    if (username == undefined) {
      username = "MATHIEU";
    }

    let shotsArray = [];
    let requestUser = dribbbleClient.getRequestForInformationAbout(username);
    let requestShots = dribbbleClient.getRequestForShotsAbout(username);

    const callback = (dribbbleResponse) => {
      response.render('pages/labs.ejs', dribbbleResponse);
    }


    dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

//################### PROJET PAGE APP.GET ###################//

 app.get('/:name/projet', (request, response)=>{
   let username = request.params.name;
   if (username == undefined) {
     username = "MATHIEU";
   }

   let shotsArray = [];
   let requestUser = dribbbleClient.getRequestForInformationAbout(username);
   let requestShots = dribbbleClient.getRequestForShotsAbout(username);

   const callback = (dribbbleResponse) => {
     response.render('pages/projetPage.ejs', dribbbleResponse);
   }


   dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

// current directory :
// __dirname
