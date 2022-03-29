 //importer les libs
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const DribbbleClient = require ("./dribbbleClient.js");
const Parser = require ("./parser.js");

const port = process.env.PORT;


const dribbbleClient = new DribbbleClient();
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log("Server is running on : http://localhost:" + port );
});

app.get('/', (request, response)=>{
  username = request.query.name;
  //Test if there is no username given

  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);

  const callback = (responseFromDribble) => {

    //call to parser

    response.render('pages/test.ejs', {userInfo: responseFromDribble[0].data,
        userShots: responseFromDribble[1].data});
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);
})

const parser = new Parser();
let parsed_bio = parser.bioParserFunction(userInfoTest);

// current directory :
// __dirname
