 //importer les libs
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const DribbbleClient = require ("./dribbbleClient.js");
const Parser = require ("./parser.js");

const dribbbleClient = new DribbbleClient("NILS");
const parser = new Parser();

const userInfo = {
   "name": "gerard",
   "bio": "text_bio = Hello, | I'm Nils, a creative developper student | I'm Nils, a ingenious developper student; colors = #000000 | #FFFFFF | #6c5985; font_names = Roboto | Poppins",
   "links": { "web": "https://google.com",
              "twitter" : "https://twitter.com/zaynbsn",
              "instagram": "https://instagram.com/orelsan"
            }
};

// console.log(parser.bioParserFunction(userInfo));

let parsed_bio = parser.bioParserFunction(userInfo);


// object js :
// const nom = new Object();
// nom.propriété = 'valeur';

// split str to array :
// const array = str.split(' ');

// var str = 'one:two;three';
// str.split(':').pop().split(';')[0]; // returns 'two'

// current directory :
// __dirname
