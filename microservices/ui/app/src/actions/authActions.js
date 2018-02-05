import route from '../utils/route';
import request from '../utils/request';

export function getAuthUser(store) {
  request.makePost(route('/authpoint'),{})
  .then(function (response) {
    store.dispatch({type: "AUTH_USER", payload: response.data});
  })
}

export function loaded() {
  return {
    type: "LOADED",
    payload: true,
  }
}
