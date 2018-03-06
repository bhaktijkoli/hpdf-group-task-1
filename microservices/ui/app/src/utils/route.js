var url = "https://api.bacteriology43.hasura-app.io";
var devUrl = "http://localhost:8080";
export default function(route) {
  if(process.env.NODE_ENV == 'development'){
    return devUrl + route;
  }
  return url + route;
}
