var axios = require('axios');
var person = require('../person');
const cypress = require('../utils/cypressRun');
require('dotenv').config()

const  separator = "_";
var data = '{\n\n    "pageNo": 1,\n    "pageSize": 500\n}';

var config = {
    method: 'post',
    url: `https://${process.env.HCP_SERVER_IP}/artemis/api/resource/v1/person/personList`,
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json;charset=UTF-8', 
      'X-Ca-Key': '27692864', 
      'X-Ca-Signature': 'QLwgRkAYCxEHBktE3CEAJlYijZmeq2XvekudMW3ZG/Y='
    },
    data : data
  };

function getPersonInfo(personCode, deviceName) {
    axios(config)
    .then(function (response) {
      var personData = response.data.data.list.find(o => o.personCode === personCode);
      var direction = deviceName.split(separator)
      var cypressResponse = "";

      person.setNricFin(personData.personCode)
      person.setMobileNumber(personData.phoneNo)
      // console.log("PSQL EVENTS MONIT: " + JSON.stringify(person))
        try{
          if(direction[0] === process.env.DIRECTION_ENTRANCE){
            cypressResponse = cypress.runCheckIn();
          } else if(direction[0] === process.env.DIRECTION_EXIT){
            cypressResponse = cypress.runCheckOut();
          }
        }catch(e){
          console.log(e)
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}

exports.getPersonInfo = getPersonInfo;