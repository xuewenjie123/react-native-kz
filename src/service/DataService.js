'use strict';
var SERVER = 'http://www.strong-link.cn/api';

function login(){
    return fetch(`${SERVER}/login.html`,{
      method:'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({
      //   'firstParam': 'yourValue',
      //   'secondParam':'yourOtherValue'
      // })
    })
		.then((response) => response.json())
		.then((responseData) => {
			return responseData;
		});
}

var DataService = {
	'login':login,
};

module.exports = DataService
