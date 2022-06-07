
class DribbbleClient {

  #axios;

  /**
  * documentation
  */

  constructor(){
      this.axios = require('axios');
      // set axios default url
      this.axios.defaults.baseURL = process.env.API_URL;
  }

    #getApiTokenFor(username) {
      let upperUsername = username.toUpperCase();
      // console.log(upperUsername);
      const accessToken = process.env[upperUsername];
      return accessToken;
    }

    getRequestForInformationAbout(username) {
      // console.log(username);
      let accessToken = this.#getApiTokenFor(username);
      // console.log(accessToken);
      return this.axios.get('/user', {
          params: { access_token: accessToken }
      });
    }

    getRequestForShotsAbout(username) {
      let accessToken = this.#getApiTokenFor(username);
      return this.axios.get('/user/shots', {
          params: { access_token: accessToken }
      });
    }

    fetchApiResponse(requests, callback) { // request is an Array
      this.axios.all(requests).then(this.axios.spread((...dribbbleResponse) => {

        const Parser = require ("./parser.js");
        const parser = new Parser();
        require("./prototypeFunctions");
        const helper = require('./helper');

        let userInfoResponse = dribbbleResponse[0].data.bio.removeLineBreak().decodeHTML()
        let dribbbleSettingsDesc = dribbbleResponse[1].data[dribbbleResponse[1].data.length - 1].description.removeLineBreak().decodeHTML()
        // console.log("dribbbleSettingsDesc: " + dribbbleSettingsDesc);

        //parsing bio
        let parsed_bio = parser.parsingInfos(userInfoResponse);
        parsed_bio.lien_cv[0] = parser.removeAllTags(parsed_bio.lien_cv[0], 'https://');
        parsed_bio.lien_book[0] = parser.removeAllTags(parsed_bio.lien_book[0], 'https://');
        parsed_bio.image_home = parser.removeAllTagsFromArray(parsed_bio.image_home, 'https://');
        // console.log(parsed_bio);


        //parsing desc post
        let tagRemovedDesc = parser.removePTag(dribbbleSettingsDesc);
        let parsed_setting_desc = parser.parsingInfos(tagRemovedDesc);
        parsed_setting_desc.background[0] = parser.removeAllTags(parsed_setting_desc.background[0], '');
        // console.log(parsed_setting_desc);

        //pushing projects desc in an array
        let projectsDesc = parser.removeAllFromShotsDesc(dribbbleResponse[1].data);

        console.log('projectsDesc', projectsDesc);

        let projectGalleryArray = helper.alternate(projectsDesc[0].images, projectsDesc[0].textes);

        // console.log(parsed_bio);


        callback({userInfos: dribbbleResponse[0].data,
                  shotsInfos: dribbbleResponse[1].data,
                  parsed_bio: parsed_bio,
                  parsed_setting_desc: parsed_setting_desc,
                  projectsDesc: projectsDesc,
                  projectGalleryArray: projectGalleryArray,
                  helper: helper
                 });
      }));
    }
}


module.exports = DribbbleClient;
