const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const ora = require('ora'); // cool spinner
const spinner = ora({
  text: '🛸 Waiting for database events... 🛸',
  color: 'blue',
  spinner: 'dots2'
});

const program = async () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'camer_user',
    password: 'admin123'
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
  });

  await instance.start();

  instance.addTrigger({
    name: 'monitoring all statments',
    expression: 'hikvision.*', // listen to hikvision database !!!
    // statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    statement: MySQLEvents.STATEMENTS.INSERT, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
    onEvent: e => {
    //   console.log(e);
    //   console.log("EVENT TYPE: " + e.type + " \n" + "OBJECT: " + JSON.stringify(e.affectedRows[0].after))
      console.log("Mobile Number: " + JSON.stringify(e.affectedRows[0].after.mobile_no) + "\n" + "NRIC/FIN: " + JSON.stringify(e.affectedRows[0].after.name_nric_fin) + "\n")
      spinner.succeed('_EVENT_');
      spinner.start();
    }
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(spinner.start.bind(spinner))
  .catch(console.error);