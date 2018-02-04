import route from '../utils/route';
import request from '../utils/request';

export function getAuthUser(store) {
  request.makePost(route('/authpoint'),{})
  .then(function (response) {
    console.log(response.data);
    var user = response.data;
    store.dispatch({type: "AUTH_USER", payload: user});
  })
}

export function loaded() {
  return {
    type: "LOADED",
    payload: true,
  }
}
