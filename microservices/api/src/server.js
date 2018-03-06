var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var fetchAction =  require('fetch');
var cookieParser = require('cookie-parser')

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


var allowCrossDomain = function(req, res, next) {
	var origin = req.headers.origin;
	res.setHeader('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}


app.use(allowCrossDomain);





app.post('/signpoint', function(req, res){

	var auth_token;
	var hasura_id;
	var gender = "Male";
	var dob = "03-09-1997";
	var firstname = "Manu";
	var lastname = "Gupta";
	var username = "manu0309";
	var password = "12345678";

	username = req.body.email;
	password = req.body.password;
	firstname = req.body.firstname;
	lastname = req.body.lastname;
	dob = req.body.dob;
	gender = req.body.gender;


	console.log(username);
	console.log(password);


	var url = "https://auth.bacteriology43.hasura-app.io/v1/signup";

	var requestOptions = {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		}
	};


	var body = {
		"provider": "username",
		"data": {
			"username": username,
			"password": password
		}
	};

	requestOptions.body = JSON.stringify(body);
	requestOptions.payload = JSON.stringify(body);


	fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){
		var myObj = JSON.parse(body);


		if(error){
			console.log('Request Failed:' +error);
		}

		res.status(meta.status).send(meta);


		if(meta.status === 200){
			authToken = myObj.auth_token
			hasura_id = myObj.hasura_id;

			var url = "https://data.bacteriology43.hasura-app.io/v1/query";


			console.log(authToken);

			var requestOptions = {
				"method": "POST",
				"headers": {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + authToken
				}
			};

			var body = {
				"type": "insert",
				"args": {
					"table": "user",
					"objects": [
						{
							"hasura_id": hasura_id,
							"username": username,
							"firstname": firstname,
							"lastname": lastname,
							"gender": gender,
							"dob": dob
						}
					]
				}
			};

			requestOptions.body = JSON.stringify(body);
			requestOptions.payload = JSON.stringify(body);

			fetchAction.fetchUrl(url, requestOptions,function(error,meta,body){
				var myObj = JSON.parse(body);

				if(error){
					console.log('Request Failed:' +error);
				}
				else
				{
					console.log(myObj);

				}

			});

		}

	});

});


app.post('/loginpoint', function(req, res){


	var username = req.body.email;
	var password = req.body.password;


	var url = "https://auth.bacteriology43.hasura-app.io/v1/login";

	var requestOptions = {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		}
	};


	var body = {
		"provider": "username",
		"data": {
			"username": username,
			"password": password
		}
	};

	requestOptions.body = JSON.stringify(body);
	requestOptions.payload = JSON.stringify(body);


	fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){
		var myObj = JSON.parse(body);

		if(error){
			console.log('Request Failed:' +error);
		}
		else
		{
			res.status(meta.status).cookie('bacteriology43' , myObj.auth_token, { maxAge: 900000, httpOnly: true }).send(meta);
			console.log(myObj);

		}

	});


});



app.post('/submitpost',function(req,res){


	/*just initialising randomly to stop from having null enteries*/
	var username = "manu0309";
	var user_id = 1000;
	var text = 0;
	var image = 0;


	var authToken = req.cookies.bacteriology43;
	var user_id = req.body.hasura_id;
	var username = req.body.email;
	var textpost = req.body.text;
	//var imagepost = req.body.image;

	if(req.body.text != null)
	text = 1;
	else
	text = 0;

	if(req.body.image != null)
	image = 1;
	else
	image = 0;


	console.log(authToken);
	console.log(user_id);
	console.log(username);
	console.log(text);
	console.log(image);


	var url = "https://data.bacteriology43.hasura-app.io/v1/query";

	var requestOptions = {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+ authToken
		}
	};

	var body ={
		"type": "insert",
		"args": {
			"table": "posts",
			"objects": [
				{
					"user_id": user_id,
					"username": username,
					"text": text,
					"image": image
				}
			]
		}
	}

	requestOptions.body = JSON.stringify(body);
	requestOptions.payload = JSON.stringify(body);

	fetchAction.fetchUrl(url, requestOptions,function(error,meta,body){

		var myObj = JSON.parse(body);

		if(error){
			console.log('Request Failed:' + error);
		}
		else
		{
			//res.status(meta.status).send(body);

			if(meta.status == 200){


				if(text == 1){


					var url = "https://data.bacteriology43.hasura-app.io/v1/query";

					var requestOptions = {
						"method": "POST",
						"headers": {
							"Content-Type": "application/json",
							"Authorization": "Bearer "+ authToken
						}
					};

					var body ={
						"type": "insert",
						"args": {
							"table": "textposts",
							"objects": [
								{
									"user_id": user_id,
									"text": textpost,
									"username": username
								}
							]
						}
					}

					requestOptions.body = JSON.stringify(body);
					requestOptions.payload = JSON.stringify(body);

					fetchAction.fetchUrl(url, requestOptions,function(error,meta,body){

						var myObj = JSON.parse(body);

						if(error){
							console.log('Request Failed:' + error);
						}
						else
						{
							res.status(meta.status).send(body);


						}

					});
				}else if(image == 1)
				{

					var url = "https://filestore.bacteriology43.hasura-app.io/v1/file";


					var requestOptions = {
						method: 'POST',
						headers: {
							"Authorization": "Bearer e0139a8f27817e6fb09933b03d7a662e46ee44ba0f9a75a8"
						},
						body: file
					}


					//requestOptions.body = JSON.stringify(body);
					//requestOptions.payload = JSON.stringify(body);

					fetchAction.fetchUrl(url, requestOptions,function(error,meta,body){

						var myObj = JSON.parse(body);

						if(error){
							console.log('Request Failed:' + error);
						}
						else
						{
							res.status(meta.status).send(body);


						}

					});

				}

			}
		}

	});
});




app.post('/seeposts',function(req,res){


	var authToken = req.cookies.bacteriology43;


	var url = "https://data.bacteriology43.hasura-app.io/v1/query";

	console.log(authToken);


	var requestOptions = {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+authToken
		}
	};

	var body = {
	    "type": "select",
	    "args": {
	        "table": "textposts",
	        "columns": [
	            "*"
	        ],
	        "order_by": [
	            {
	                "column": "id",
	                "order": "desc"
	            }
	        ]
	    }
	};

	requestOptions.body = JSON.stringify(body);
	requestOptions.payload = JSON.stringify(body);

	fetchAction.fetchUrl(url, requestOptions, function(error,meta,body){
		var myObj = JSON.parse(body);
		if(error){
			console.log('Request Failed:' + error);
		}
		else
		{
			res.status(meta.status).send(myObj);

			//api call to fetch the image posts and sending.

		}
	});
});




app.post('/authpoint',function(req,res){

	var authToken = req.cookies.bacteriology43;

	var url = "https://auth.bacteriology43.hasura-app.io/v1/user/info";

	var requestOptions = {
		"method": "GET",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+authToken
		}
	};

	console.log(authToken);


	fetchAction.fetchUrl(url, requestOptions, function(error,meta,body){
		var myObj = JSON.parse(body);
		if(error){
			console.log('Request Failed:' + error);
		}
		else
		{
			//res.send(myObj);
			console.log(myObj);
			var url = "https://data.bacteriology43.hasura-app.io/v1/query";


			var requestOptions = {
				"method": "POST",
				"headers": {
					"Content-Type": "application/json",
					"Authorization": "Bearer "+ authToken
				}
			};

			var body = {
				"type": "select",
				"args": {
					"table": "user",
					"columns": [
						"*"
					],
					"where": {
						"hasura_id": {
							"$eq": myObj.hasura_id
						}
					}
				}
			};

			requestOptions.body = JSON.stringify(body);
			requestOptions.payload = JSON.stringify(body);

			fetchAction.fetchUrl(url, requestOptions, function(error,meta,body){
				var myObj = JSON.parse(body);
				if(error){
					console.log('Request Failed:' + error);
				}
				else
				{

					if(myObj.message != null)
					{
						var mess = {"auth": 0,"user": {}}
						res.send(mess);
					}
					else{

						var mess = {"auth": 1,"user": myObj}
						res.send(mess);
					}


					console.log(myObj);

				}
			});


		}
	});



});




app.listen(8080, function(){
	console.log('listening on port 8080!');
});
