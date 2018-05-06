import { baseURI } from './../constant/url';
import { NetInfo } from 'react-native';

const _Api = (opts) => {
  opts = opts || {
    baseURI: baseURI,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  var options = {};
  options.headers = opts.headers;
  options.method = "POST";

  var methodsFunc = function (path, { params }, callback){
    options.body = params;
    fetch(opts.baseURI + path + ".jhtml",options)
      .then((response) => {return response.text()})
      .then((response) => {
        console.log(response)
        callback(response)
      })
      .catch((error) => {
        console.log(error)
      });
    }
  return methodsFunc;
}

const api = new _Api({
  baseURI: baseURI,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default api;
