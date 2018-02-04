		var express = require('express');
		var request = require('request');
		var path = require('path');
		var bodyParser = require('body-parser');
		var fetchAction =  require('fetch');

		var app = express();
		app.use(bodyParser.urlencoded({extended: true}));


		var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', "*");
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Content-Type');
	    next();
	}

		app.configure(function() {
		    app.use(allowCrossDomain);
		});    




		
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
		    	res.status(meta.status).send(meta);
		    	console.log(myObj);
			   
		    }
		   
		});


		});



		app.post('/submitpost',function(req,res){


	   var username = "manu0309";
	   var user_id = 1000;
	   var text = 0;
	   var image = 0;	

		
		var authToken = req.body.authToken;
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
					                "text": textpost
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


			var authToken = req.body.authToken;


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




		app.listen(8080, function(){
			console.log('listening on port 8080!');
		});


