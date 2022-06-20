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


app.get('/favicon.ico', (req,res)=>{})

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

app.get('/:name/project', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/home');
})

app.get('/:name/project/', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/home');
})

app.get('/:name/project/home', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/home');
})

app.get('/:name/project/artworks', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/artworks');
})

app.get('/:name/project/lab', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/lab');
})

app.get('/:name/project/contact', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/contact');
})

app.get('/:name/project/about-me', (request, response)=>{
  let username = request.params.name;
  response.redirect('/'+username+'/about-me');
})

app.get('/:name/home', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }
  
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse, id) => {
    response.render('pages/home.ejs', dribbbleResponse);
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);

})

//################### CONTACT APP.GET ####################//

app.get('/:name/contact', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse, id) => {
    response.render('pages/contact.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);

})

//################### ARTWORKS APP.GET ####################//

app.get('/:name/artworks', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse, id) => {
    response.render('pages/artworks.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);

})

//################### ABOUT ME APP.GET ###################//

app.get('/:name/about-me', (request, response)=>{
  let username = request.params.name;
  if (username == undefined) {
    username = "MATHIEU";
  }
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (dribbbleResponse, id) => {
    response.render('pages/aboutMe.ejs', dribbbleResponse);
  }


  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);

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
      const callback = (dribbbleResponse, id) => {
        response.render('pages/games.ejs', dribbbleResponse);
      }  
      dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);
    }else{
      const callback = (dribbbleResponse, id) => {
        response.render('pages/lab.ejs', dribbbleResponse);
      }
      dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);
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

  const callback = (dribbbleResponse, id) => {
    response.render('pages/projetPage.ejs', dribbbleResponse);
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);

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


  const callback = (dribbbleResponse, id) => {
    dribbbleResponse.shotsInfos['shotId'] = id;
    response.render('pages/projetPage.ejs', dribbbleResponse);
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, id);
})

app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})

// current directory :
// __dirname