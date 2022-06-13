//################## IMPORTING LIBS #####################//

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const cors = require('cors');
const port = process.env.PORT;

const DribbbleClient = require ("./dribbbleClient.js");
const dribbbleClient = new DribbbleClient();

const app = express();

//################### SETTING SERVER ####################//
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log("Server is running on : http://localhost:" + port + "/'insert-username'" );
});

//################### HOME PAGE APP.GET ###################//


app.get('/favicon.ico', (req,res)=>{
  console.log('favicon loaded');
})

app.get('/', function (req, res) {
  res.redirect('/mathieu/home');
});

app.get('/:name', (request, response)=>{
  let username = request.params.name;
  response.redirect(username + '/home');
})

app.get('/:name/', (request, response)=>{
  let username = request.params.name;
  response.redirect('home');
})

app.get('/:name/home', (request, response)=>{
  let username = request.params.name;
  console.log(username);
  if (username == undefined) {
    username = "MATHIEU";
  }
  // console.log(username);
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
    let requestUser = dribbbleClient.getRequestForInformationAbout(username);
    let requestShots = dribbbleClient.getRequestForShotsAbout(username);

    if(username == "nils" || username == "mathieu"){
      const callback = (dribbbleResponse) => {
        response.render('pages/games.ejs', dribbbleResponse);
      }  
      dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);
    }else{
      const callback = (dribbbleResponse) => {
        response.render('pages/lab.ejs', dribbbleResponse);
      }
      dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);
    }
    




})

//################### PROJET PAGE APP.GET ###################//

 app.get('/:name/project', (request, response)=>{
   let username = request.params.name;
   if (username == undefined) {
     username = "MATHIEU";
   }
   let requestUser = dribbbleClient.getRequestForInformationAbout(username);
   let requestShots = dribbbleClient.getRequestForShotsAbout(username);

   const callback = (dribbbleResponse) => {
     response.render('pages/projetPage.ejs', dribbbleResponse);
   }

   dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

//################### PROJET :ID APP.GET ###################//

 app.get('/:name/project/:id', (request, response)=>{
   let username = request.params.name;
   let id = request.params.id;
   if (username == undefined) {
     username = "MATHIEU";
   }
   let requestUser = dribbbleClient.getRequestForInformationAbout(username);
   let requestShots = dribbbleClient.getRequestForShotsAbout(username);

   const callback = (dribbbleResponse) => {
     response.render('pages/projetPage.ejs', dribbbleResponse);
   }

   dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

app.get('*', function(req, res){
  res.send('what???', 404);
});
// current directory :
// __dirname
