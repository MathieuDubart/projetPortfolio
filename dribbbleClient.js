class DribbbleClient {

  constructor(userName){
    const express = require('express');
    const axios = require('axios');

    //recupérer les variables ENV
    const app = express();
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    const port = process.env.PORT;

    app.listen(port, () => {
    });

    console.log(userName);

    const accessToken = process.env[userName];
    console.log(accessToken);

    // set axios default url
    axios.defaults.baseURL = process.env.API_URL;

    // ----------------------------------------------REQUEST API---------------------------------------------------

    app.get('/', (request, response)=>{



        const userRequest = axios.get('/user', {
            params: { access_token: accessToken }
        });
        // .then((apiResponse)=>{
        //     console.log(request.query.user);
        //     response.send(apiResponse.data);
        // });

        const projectsRequest = axios.get('/user/shots', {
            params: { access_token: accessToken, per_page: 100}
        });
        // .then((apiResponse)=>{
        //     console.log(request.query.user);
        //     response.send(apiResponse.data);
        // });


        axios.all([userRequest, projectsRequest]).then(axios.spread((...apiResponses) => {
            response.render('pages/test', {userInfo: apiResponses[0].data,
                userShots: apiResponses[1].data});
        }));

      })
  }
}


module.exports = DribbbleClient;
