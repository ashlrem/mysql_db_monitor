const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const ora = require('ora'); // cool spinner

const spinner = ora({
  text: '🛸 Waiting for database events... 🛸 \n',
  color: 'blue',
  spinner: 'dots2'
});

const cypress = require('../utils/cypressRun');

var person = require('../person')

const program = async () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'camera_user',
    password: 'admin123'
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
  });

  await instance.start();

  instance.addTrigger({
    name: 'monitoring insert statments',
    expression: 'ost_hikvision_db.*', // listen to hikvision database !!!
    // statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    statement: MySQLEvents.STATEMENTS.INSERT, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    onEvent: e => {
      try{
        var idNo = e.affectedRows[0].after.name_nric_fin.split(",");
        var d = new Date();

        person.setNricFin(idNo[1])
        person.setMobileNumber(e.affectedRows[0].after.mobile_no)
  
        var nric = person.getNricFin();
        var mobno = person.getMobileNumber();

        console.log("\n==============================\n");
        console.log("Person Info: " + nric + " : " + mobno)
        console.log("Date and Time: " + d)
  
        cypress.run();
  
        spinner.succeed(`__SAFE_ENTRY_SUCCEEDED_FOR_${person.getNricFin()}_${new Date()}__`);
        spinner.start();
      }catch(e){
        console.log(e)
      }
    }
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(spinner.start.bind(spinner))
  .catch(console.error);