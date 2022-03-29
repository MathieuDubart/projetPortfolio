
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
      console.log(accessToken);
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
          params: { access_token: accessToken, per_page: 100 }
      });
    }

    fetchApiResponse(requests, callback) { // request is an Array
      this.axios.all(requests).then(this.axios.spread((...apiResponses) => {
          callback(apiResponses);
      }));
    }
}


module.exports = DribbbleClient;
