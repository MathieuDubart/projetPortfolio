
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
      if(process.env[upperUsername]) {
        const accessToken = process.env[upperUsername];
        return accessToken;
      } else {
        const accessToken = process.env["MATHIEU"];
        return accessToken;
      }
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

    fetchApiResponse(requests, callback, id) { // request is an Array
      this.axios.all(requests).then(this.axios.spread((...dribbbleResponse) => {

        // console.log('DRIBBBLERESPONSE', id);


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
        parsed_bio.lien_cv = parser.removeAllTagsFromArray(parsed_bio.lien_cv, 'https://');
        parsed_bio.lien_book = parser.removeAllTagsFromArray(parsed_bio.lien_book, 'https://');
        parsed_bio.dribbble = parser.removeAllTagsFromArray(parsed_bio.dribbble, 'https://');
        parsed_bio.image_home = parser.removeAllTagsFromArray(parsed_bio.image_home, 'https://');
        parsed_bio.icon_mail = parser.removeAllTagsFromArray(parsed_bio.icon_mail, 'https://');
        parsed_bio.icon_instagram = parser.removeAllTagsFromArray(parsed_bio.icon_instagram, 'https://');
        parsed_bio.icon_linkedin = parser.removeAllTagsFromArray(parsed_bio.icon_linkedin, 'https://');
        parsed_bio.icon_dribbble = parser.removeAllTagsFromArray(parsed_bio.icon_dribbble, 'https://');
        parsed_bio.icon_burger = parser.removeAllTagsFromArray(parsed_bio.icon_burger, 'https://');
        parsed_bio.icon_close = parser.removeAllTagsFromArray(parsed_bio.icon_close, 'https://');
        // console.log(parsed_bio);


        //parsing desc post
        let tagRemovedDesc = parser.removePTag(parser.removeStrongTag(dribbbleSettingsDesc));
        let bracketsRemovedDesv = parser.removeBrackets(tagRemovedDesc);
        let parsed_setting_desc = parser.parsingInfos(bracketsRemovedDesv);
        parsed_setting_desc.background_image[0] = parser.removeAllTags(parsed_setting_desc.background_image[0], '');
        // console.log('SETTINGS DECRIPTION : ', parsed_setting_desc);

        //parsing lab post
        let tagRemovedLab = parser.removePTag(dribbbleLabDesc);
        let bracketsRemovedLab = parser.removeBrackets(tagRemovedLab);
        let parsed_lab_desc = parser.parsingInfos(bracketsRemovedLab);
        parsed_lab_desc.images = parser.removeAllTagsFromArray(parsed_lab_desc.images, '');
        // console.log('LE LAB OEOEOE: ', parsed_lab_desc);

        //parsing about post
        let tagRemovedAbout = parser.removePTag(dribbbleAboutDesc);
        let bracketsRemovedAbout = parser.removeBrackets(tagRemovedAbout);
        let parsed_about_desc = parser.parsingInfos(bracketsRemovedAbout);
        parsed_about_desc.images = parser.removeAllTagsFromArray(parsed_about_desc.images, '');
        // console.log('ABOUT: ', parsed_about_desc);

        
        //pushing projects desc in an array
        let projectsDesc = parser.removeAllFromShotsDesc(dribbbleResponse[1].data);
        // console.log('projectsDesc', projectsDesc);


        let project_brief;
        let project_gallery_array;
        let project_date;
        // const getcurrentProjectsInfos = function() {
        // dribbbleResponse[1].data.forEach(shot =>{
        for(let i = 0; i < dribbbleResponse[1].data.length; i++) {
          if(dribbbleResponse[1].data[i].id == id) {
            project_brief = projectsDesc[i].brief;
            project_gallery_array = helper.alternate(projectsDesc[i].images, projectsDesc[i].textes);
            project_date = projectsDesc[i].annee_realisation;
          }
        };
        


        // console.log(parsed_bio);


        callback({userInfos: dribbbleResponse[0].data,
                  shotsInfos: dribbbleResponse[1].data,
                  parsed_bio: parsed_bio,
                  parsed_setting_desc: parsed_setting_desc,
                  projectsDesc: projectsDesc,
                  project_brief: project_brief,
                  project_gallery_array: project_gallery_array,
                  project_date: project_date,
                  parsed_lab_desc: parsed_lab_desc,
                  parsed_about_desc: parsed_about_desc,
                  helper: helper,
                }, id);
      }));
    }
}


module.exports = DribbbleClient;
