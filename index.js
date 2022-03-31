 //importer les libs
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const DribbbleClient = require ("./dribbbleClient.js");
const Parser = require ("./parser.js");
require("./prototypeFunctions");

const port = process.env.PORT;

const parser = new Parser();
const dribbbleClient = new DribbbleClient();
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log("Server is running on : http://localhost:" + port );
});

app.get('/', (request, response)=>{
  let username;
  if (username == undefined) {
    username = "MATHIEU";
  }else{
    username = request.query.name;
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

    //pushing projects desc in an array
    let projectsDesc = parser.removeAllFromShotsDesc(dribbbleResponse[1].data);

    console.log(projectsDesc);
    // console.log("//////TEST PARSING POST//////: " + testParsingPosts);


// ------------------------------- BROUILLONS ---------------------------//

// console.log("dribbbleResponse[1].data: " + dribbbleResponse[1].data);

// foreach sur dribbbleResponse[1].data
// dribbbleResponse[1].data.forEach( projects => {
//
// });

// console.log("//////DRIBBLE REPONSE//////: "+ dribbbleResponse[1].data[0])

//----------------------------------------------------------------------//



    response.render('pages/test.ejs', {parsed_bio: parsed_bio, parsed_setting_desc: parsed_setting_desc, projectsDesc: projectsDesc});
  }

  dribbbleClient.fetchApiResponse([requestUser, requestShots], callback);

})

// current directory :
// __dirname
