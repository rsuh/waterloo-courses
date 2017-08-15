import 'whatwg-fetch';

export default {
  getData: function(url) {
    return fetch(url, {
      method: "GET",
    })
    .then((response) => {
      return response.json();
    });
  }
}