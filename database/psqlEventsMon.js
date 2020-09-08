var pg = require ('pg');
var EventEmitter = require('events');
var util = require('util');
const ora = require('ora'); // cool spinner

require('events').EventEmitter.prototype._maxListeners = 0;

require('dotenv').config();

var personList = require('../openapi/getPersonList');

const spinner = ora({
    text: '🛸 Waiting for database events... 🛸 \n',
    color: 'blue',
    spinner: 'dots2'
  });

// Build and instantiate our custom event emitter
function DbEventEmitter(){
    EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter;

dbEventEmitter.on('new_insert', (msg) => {
    // console.log(msg;)
    console.log("\n New Door Access Detected.. Submitting Person Information to Safe Entry.. \n")
    console.log(" Person Name: " + msg.person_name + " | " + "Device Name: " + msg.device_name)
    personList.getPersonInfo(msg.employee_id, msg.device_name)
});

const program = async () => {
    pg.connect(process.env.PSQL_DB_URL, function(err, client) {

        if(err) {
            console.log("DB CONNECTION FAILED \n" + err);
        }
    
        // Listen for all pg_notify channel messages
        client.on('notification', async function(msg) {
            let payload = await JSON.parse(msg.payload);
            dbEventEmitter.emit(msg.channel, payload);
        });
    
        // Designate which channels we are listening on. Add additional channels with multiple lines.
        client.query('LISTEN new_insert');
    });
}

program()
    .then(spinner.start.bind(spinner))
    .catch(console.error);
