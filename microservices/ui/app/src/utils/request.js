var axios = require('axios');
axios.defaults.headers.common['Content-Type'] = 'application/json';

var request = {
  makePost: function(url, data) {
    return axios.post(url, data);
  }
}

export default request;
