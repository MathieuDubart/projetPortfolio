# Table of contents

* Context
* Server and Routing
* Dribbble API calls
* Parsing and using API response
* Results

# Context

This is a school project for "L'École By CCI", based in France.
We had to create a portfolio for 11 students. Of course, we had to make it as customizable as possible for everyone, using the Dribbble API.


# Server and Routing

Our portfolios are hosted on [Heroku](https://heroku.com).

For routing, we used [Express](https://expressjs.com) and got this redirecting code scheme that we declined for each page of the portfolio:
```
app.get('/:name', (request, response)=>{
	let  username  =  request.params.name;
	response.redirect(username  +  '/home');
})
```

Each username is stocked in a .env file with this scheme:
```
USERNAME='Dribbble OAuth token'
```

Using the public directory to store and use our pages ont he web:
```
app.use(express.static(__dirname  +  '/public'));
```
So every time someone is entering https://our-portfolio.com/username, he's automatically redirected to https://our-portfolio.com/username/home, rendering the homepage.

To get every informations we need, we have this code snippet:
```
app.get('/:name/home', (request, response)=>{
	let  username  =  request.params.name;
	
	if (username  ==  undefined) {
		username  =  "defaultUsername";
	}
	
	let  requestUser  =  dribbbleClient.getRequestForInformationAbout(username);
	let  requestShots  =  dribbbleClient.getRequestForShotsAbout(username);
	
	const  callback  = (dribbbleResponse, id) => {
		response.render('pages/home.ejs', dribbbleResponse);
	}
	
	dribbbleClient.fetchApiResponse([requestUser, requestShots], callback, null);
})
```
So if someone is trying to access https://our-portfolio.com/, he's automatically redirected to the default username's homepage.

Then, we are getting the name passed in url and we make a call to the Dribbble API with the right OAuth token and render it on home.ejs file's that displays the homepage through our callback.

But it doesn't exactly work like that.

# Dribbble API calls
We have a file named dribbbleclient.js that only contains a class named 'DribbbleClient'.
In this class, we have many methods that are used to make calls to the Dribbble API and, afterwards, to process them by removing tags, links and everything that is useless or annoying.

The methods that allow us to perform this kind of process are calling an instance of a class named 'Parser' that is storedin a file named parser.js but let's talk about it later.

In the DribbbleClient class,  the first method is named 'getApiTokenFor'.
It's a private method that takes on parameter that is 'username'. Here it is:
```
#getApiTokenFor(username) {
	let  upperUsername  =  username.toUpperCase();
	if(process.env[upperUsername]) {
		const  accessToken  =  process.env[upperUsername];
		return  accessToken;
	} else {
		const  accessToken  =  process.env["defaultUsername"];
		return  accessToken;
	}
}
```
This private method is called in the two next method named 'getRequestForInformationAbout' and 'getRequestForShotsAbout'.

Those two methods are called in the routing saw above.

So, when you make a request on https://our-portfolio.com/username, the app catches the username and send it to those two methods that themselves call the private method 'getApiTokenFor' that returns the right OAuth Token that allows those methods to ask the API for the right user's informations.
