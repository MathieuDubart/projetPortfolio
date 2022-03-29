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

app.get('/hello', (request, response)=>{
    response.send("hi");
})

const parser = new Parser();

const userInfoTest = {
   "name": "gerard",
   "bio": "text_bio = Hello, | I'm Nils, a creative developper student | I'm Nils, a ingenious developper student; colors = #000000 | #FFFFFF | #6c5985; font_names = Roboto | Poppins",
   "links": { "web": "https://google.com",
              "twitter" : "https://twitter.com/zaynbsn",
              "instagram": "https://instagram.com/orelsan"
            }
};

let parsed_bio = parser.bioParserFunction(userInfoTest);

// current directory :
// __dirname
