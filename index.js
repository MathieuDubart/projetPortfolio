 //importer les libs
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const DribbbleClient = require ("./dribbbleClient.js");
const Parser = require ("./parser.js");

const port = process.env.PORT;

const parser = new Parser();
const dribbbleClient = new DribbbleClient();
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log("Server is running on : http://localhost:" + port );
});

// decode char html issue
String.prototype.decodeHTML = function() {
    var map = {"gt":">", "lt":"<", "quot":"\"", "amp":"&"};
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};

String.prototype.removeLineBreak = function() {
  return this.replace(/\n/g, '');
};

app.get('/', (request, response)=>{
  username = request.query.name;
  if (username == undefined) {
    username = "NILS";
  }

  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);
  const callback = (responseFromDribble) => {

    let userInfoResponse = responseFromDribble[0].data.bio.removeLineBreak().decodeHTML()
    let userShotsResponse = responseFromDribble[1].data[0].description.removeLineBreak().decodeHTML()

    // console.log(responseFromDribble[1].data);

    //call to parser
    let parsed_bio = parser.bioParserFunction(userInfoResponse);
    console.log(parsed_bio.font_family);

    parsed_bio.font_family[0] = parser.removeATagAndHrefAndRelAndLinkFromString(parsed_bio.font_family[0]);
    console.log(parsed_bio.font_family[0]);

    let tagRemovedDesc = parser.removePTag(userShotsResponse);
    let parsed_desc = parser.bioParserFunction(tagRemovedDesc);
    // console.log(parsed_desc);

    response.render('pages/test.ejs', {parsed_bio: parsed_bio, parsed_desc: parsed_desc});

  //   response.send({userInfo: responseFromDribble[0].data,
  //       userShots: responseFromDribble[1].data});
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);
})

let test = '<a href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;700&display=swap"></a>';
let parsingTest = parser.removeATagAndHrefAndRelAndLinkFromString(test);
console.log(parsingTest);


// current directory :
// __dirname
