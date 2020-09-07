var pg = require ('pg');
var EventEmitter = require('events');
var util = require('util');
require('dotenv').config();

EventEmitter.setMaxListeners = 0;

var personList = require('../openapi/getPersonList');

// Build and instantiate our custom event emitter
function DbEventEmitter(){
    EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter;

dbEventEmitter.on('new_insert', (msg) => {
    // console.log(msg;)
    console.log("\n New Door Access Detected.. Submitting Person Information to Safe Entry.. \n")
    console.log(" Person Name: " + msg.person_name + "\n " + "Device Name: " + msg.device_name)
    personList.getPersonInfo(msg.employee_id, msg.device_name)

  });

pg.connect(process.env.PSQL_DB_URL2, function(err, client) {
    if(err) {
        console.log("DB CONNECTION FAILED \n" + err);
    }

    // Listen for all pg_notify channel messages
    client.on('notification', function(msg) {
        let payload = JSON.parse(msg.payload);
        dbEventEmitter.emit(msg.channel, payload);
    });

    // Designate which channels we are listening on. Add additional channels with multiple lines.
    client.query('LISTEN new_insert');
});