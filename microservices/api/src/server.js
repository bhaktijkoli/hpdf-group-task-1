		var express = require('express');
		var request = require('request');
		var path = require('path');
		var bodyParser = require('body-parser');
		var fetchAction =  require('fetch');

		var app = express();
		app.use(bodyParser.urlencoded({extended: true}));
		
		app.post('/signpoint', function(req, res){

		var auth_token;
		var hasura_id;
		var gender;
		var dob;
		var firstname;
		var lastname;
		var username;
		var password;

		username = req.body.email;
	    password = req.body.password;
		firstname = req.body.firstname;
	    lastname = req.body.lastname;
		dob = req.body.dob;
		gender = req.body.gender;


		

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
		    	res.send(meta);
			    //var authToken = myObj.auth_token;
			   
		    }
		   
		});


		});



		app.post('/submitpost',function(req,res){

		
		var authToken = req.body.authToken;
		var hasura_id = req.body.hasura_id;	

		var url = "https://data.adulthood94.hasura-app.io/v1/query";

		var requestOptions = {
		    "method": "POST",
		    "headers": {
		        "Content-Type": "application/json",
		        "Authorization": "Bearer "+ authToken
		    }
		};

		var body = {
		    "type": "insert",
		    "args": {
		        "table": "posts",
		        "objects": [
		            {
		                "hasura_id": hasura_id,
		                "text": text
		            }
		        ]
		    }
		};

		requestOptions.body = JSON.stringify(body);

		fetchAction.fetchAction(url, requestOptions,function(error,meta,body){
  			
  			var myObj = JSON.parse(body);
		  
		    if(error){
		    	console.log('Request Failed:' + error);
		    }
		    else
		    {
		    	res.status(meta.status).send(body);
			    
		    }


		});
		
		});


		app.post('/seeposts',function(req,res){


			var authToken = req.body.authToken;


		var url = "https://data.adulthood94.hasura-app.io/v1/query";

	
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
		        "table": "posts",
		        "columns": [
		            "*"
		        ]
		    }
		};

		requestOptions.body = JSON.stringify(body);

		fetchAction.fetchAction(url, function(error,meta,body){
			var myObj = JSON.parse(body);
			if(error){
		    	console.log('Request Failed:' + error);
		    }
		    else
		    {
		    	res.status(meta.status).send(myObj);
			    
		    }
		});
});




		app.listen(8080, function(){
			console.log('listening on port 8080!');
		});


