# Table of contents

* [Context](#Context)
* [Server and Routing](#server-and-routing)
* [Dribbble API calls](#dribbble-api-calls)
* [Parsing and using API response](#parsing-and-using-the-api-reponse)
* [Results](#results)

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

# Parsing and using the API reponse
Now let's see how we parse and use the API response.
## Parsing

So now we have the API reponse. Let's parse it !

As said a little above, we have a class named 'Parser'.
In the DribbbleClient's instance, we have a method called 'fetchApiResponse' that calls an instance of the Parser's class.
In this Parser's instance (named 'parser'), we got a lot of methods. The only three ones called fromt the outside of the class are 'removeAllTags', 'removeAllTagsFromArray' and 'removeAllFromShotsDesc'.
All those three methods are calling other parser's methods like 'removePTag', 'removeBrackets' and more.
As their name says, the only difference between 'removeAllTags' and 'removeAllTagsFromArray', is that the last one is a method made to remove all tags from an array.
Once every tag of every call is removed, the fetchApiResponse's callack send the informations on the pages:
```
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
				
```
We also had a third class, stored in the 'helper.js', that helps us to know if the string passed as a parameter is an url and so an image or if it's just a string that contains text to correctly process informations in the artworks section and in 'dribbbleClient.js'.
## Using the API reponse

Now that we got parsed informations from dribbble with the use of the parser above,
We can start using them in ejs files to customize every portfolios.

Between all the informations that we retreive, we dinstinguish several different categories :

* 'userInfos' and 'shotsInfos' which are the direct responses to api calls 'GET /user/user' and 'GET /user/shots' respectively.
Our parser didn't do much on thoses, expect adding a key 'shotId' at the end of shotsInfos, with as value the id of the current project, if we find ourselves on ProjectPage.
	* in userInfos, we use some of all the information, like the name, the profile picture, the bio and the links.
	* in userShots, we can find every shots published by the owner of the dribbble account, and we can use it directly in ejs by looping on it and getting the informations needed, like the id, the title, the description, images, and tags. 
* 