var axios = require('axios');

var data = '{\n\n    "pageNo": 1,\n    "pageSize": 500\n}';

var config = {
    method: 'post',
    url: 'https://127.0.0.1/artemis/api/resource/v1/person/personList',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json;charset=UTF-8', 
      'X-Ca-Key': '27692864', 
      'X-Ca-Signature': 'QLwgRkAYCxEHBktE3CEAJlYijZmeq2XvekudMW3ZG/Y='
    },
    data : data
  };

function getPersonInfo(personCode) {
    axios(config)
    .then(function (response) {
      console.log("getPersonInfo: " + personCode)
      var person = response.data.data.list.find(o => o.personCode === personCode);
      console.log("PSQL EVENTS MONIT: " + JSON.stringify(person))
    })
    .catch(function (error) {
      console.log(error);
    });
}

exports.getPersonInfo = getPersonInfo;