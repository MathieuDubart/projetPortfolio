//importer les libs
require('dotenv').config();
const express = require('express');
const axios = require('axios');

//recupérer les variables ENV
const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT;
const accessToken = process.env.ACCESS_TOKEN;

//set axios default url
axios.defaults.baseURL = process.env.API_URL;


app.listen(port, () => {

});

app.get('/', (request, response)=>{


    //response.send("coucou");

    const userRequest = axios.get('/user', {
        params: { access_token: accessToken }
    });//.then((apiResponse)=>{
    //     console.log(request.query.user);
    //     response.send(apiResponse.data);
    // });

    const projectsRequest = axios.get('/user/shots', {
        params: { access_token: accessToken, per_page: 100}
    });//.then((apiResponse)=>{
    //     console.log(request.query.user);
    //     response.send(apiResponse.data);
    // });


    axios.all([userRequest, projectsRequest]).then(axios.spread((...apiResponses) => {
        response.render('pages/index', {userInfo: apiResponses[0].data,
            userShots: apiResponses[1].data});
    }));

});

