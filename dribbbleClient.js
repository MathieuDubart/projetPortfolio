
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
      const accessToken = process.env[upperUsername];
      return accessToken;
    }

    getRequestForInformationAbout(username) {
      let accessToken = this.#getApiTokenFor(username);
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
        let dribbbleLabDesc = dribbbleResponse[1].data[dribbbleResponse[1].data.length - 2].description.removeLineBreak().decodeHTML()
        let dribbbleAboutDesc = dribbbleResponse[1].data[dribbbleResponse[1].data.length - 3].description.removeLineBreak().decodeHTML()
        // console.log("dribbbleSettingsDesc: " + dribbbleSettingsDesc);

        //parsing bio
        let parsed_bio = parser.parsingInfos(userInfoResponse);
        parsed_bio.lien_cv[0] = parser.removeAllTags(parsed_bio.lien_cv[0], 'https://');
        parsed_bio.lien_book[0] = parser.removeAllTags(parsed_bio.lien_book[0], 'https://');
        parsed_bio.image_home = parser.removeAllTagsFromArray(parsed_bio.image_home, 'https://');
        // console.log(parsed_bio);


        //parsing desc post
        let tagRemovedDesc = parser.removePTag(parser.removeStrongTag(dribbbleSettingsDesc));
        let bracketsRemovedDesv = parser.removeBrackets(tagRemovedDesc);
        let parsed_setting_desc = parser.parsingInfos(bracketsRemovedDesv);
        parsed_setting_desc.background_image[0] = parser.removeAllTags(parsed_setting_desc.background_image[0], '');
        console.log('SETTINGS DECRIPTION : ', parsed_setting_desc);

        //parsing lab post
        let tagRemovedLab = parser.removePTag(dribbbleLabDesc);
        let bracketsRemovedLab = parser.removeBrackets(tagRemovedLab);
        let parsed_lab_desc = parser.parsingInfos(bracketsRemovedLab);
        parsed_lab_desc.images = parser.removeAllTagsFromArray(parsed_lab_desc.images, '');
        console.log('LE LAB OEOEOE: ', parsed_lab_desc);

        //parsing about post
        let tagRemovedAbout = parser.removePTag(dribbbleAboutDesc);
        let bracketsRemovedAbout = parser.removeBrackets(tagRemovedAbout);
        let parsed_about_desc = parser.parsingInfos(bracketsRemovedAbout);
        parsed_about_desc.images = parser.removeAllTagsFromArray(parsed_about_desc.images, '');
        console.log('ABOUT: ', parsed_about_desc);

        

        //pushing projects desc in an array
        let projectsDesc = parser.removeAllFromShotsDesc(dribbbleResponse[1].data);

        // console.log('projectsDesc', projectsDesc);

        let projectGalleryArray = helper.alternate(projectsDesc[0].images, projectsDesc[0].textes);

        // console.log(parsed_bio);


        callback({userInfos: dribbbleResponse[0].data,
                  shotsInfos: dribbbleResponse[1].data,
                  parsed_bio: parsed_bio,
                  parsed_setting_desc: parsed_setting_desc,
                  projectsDesc: projectsDesc,
                  projectGalleryArray: projectGalleryArray,
                  parsed_lab_desc: parsed_lab_desc,
                  parsed_about_desc: parsed_about_desc,
                  helper: helper
                });
      }));
    }
}


module.exports = DribbbleClient;
