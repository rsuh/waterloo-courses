import 'whatwg-fetch';
import { API_KEY } from '../constants/index'

export default {
  getData: function(url) {
    return fetch(url + "?key=" + API_KEY, {
      method: "GET",
    })
    .then((response) => {
      return response.json();
    });
  }
}
