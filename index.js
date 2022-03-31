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

  let shotsArray = [];
  let requestUser = dribbbleClient.getRequestForInformationAbout(username);
  let requestShots = dribbbleClient.getRequestForShotsAbout(username);
  const callback = (dribbbleResponse) => {

    let userInfoResponse = dribbbleResponse[0].data.bio.removeLineBreak().decodeHTML()
    let dribbbleSettingsDesc = dribbbleResponse[1].data[dribbbleResponse[1].data.length - 1].description.removeLineBreak().decodeHTML()
    console.log("dribbbleSettingsDesc: " + dribbbleSettingsDesc);

    //parsing bio
    let parsed_bio = parser.parsingInfos(userInfoResponse);
    parsed_bio.font_family[0] = parser.removeAllTags(parsed_bio.font_family[0], 'https://');
    // console.log(parsed_bio.font_family[0]);

    //parsing desc post
    let tagRemovedDesc = parser.removePTag(dribbbleSettingsDesc);
    let parsed_setting_desc = parser.parsingInfos(tagRemovedDesc);
    parsed_setting_desc.background[0] = parser.removeAllTags(parsed_setting_desc.background[0], '');
    console.log(parsed_setting_desc);

    //pushing projects in an array
    let projects = [];
    for (let i=0; i < dribbbleResponse[1].data.length - 1; i++) {
      console.log("//////DRIBBLE REPONSE//////: "+ dribbbleResponse[1].data[i].description);
      projects.push(dribbbleResponse[1].data[i].description.removeLineBreak().decodeHTML());
    }

    //removing tags from each project in the array
    projects.forEach(project => {
      let testParsingPosts = parser.parsingInfos(parser.removePTag(project));
      testParsingPosts.images = parser.removeAllTagsFromArray(testParsingPosts.images, '');
      // console.log(testParsingPosts);
    })


// ------------------------------- BROUILLONS ---------------------------//

// console.log("dribbbleResponse[1].data: " + dribbbleResponse[1].data);

// foreach sur dribbbleResponse[1].data
// dribbbleResponse[1].data.forEach( projects => {
//
// });

// console.log("//////DRIBBLE REPONSE//////: "+ dribbbleResponse[1].data[0])

//---------------------------------------------------------------------//



    response.render('pages/test.ejs', {parsed_bio: parsed_bio, parsed_setting_desc: parsed_setting_desc});
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

// current directory :
// __dirname
