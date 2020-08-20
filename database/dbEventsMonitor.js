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
    host: '127.0.0.1',
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
      var idNo = e.affectedRows[0].after.name_nric_fin.split(",");
      var d = new Date();
      var dateFormat =   d.getFullYear() +  '-' + ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '-' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate()));
      var timeForamt = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

      person.setNricFin(idNo[1])
      person.setMobileNumber(e.affectedRows[0].after.mobile_no)
      var nric = person.getNricFin();
      var mobno = person.getMobileNumber();

      var sql = mysql.format("SELECT * from ost_hikvision_db.attendance_tbl where mobile_no= ? && auth_date= ? && auth_time < ? ORDER BY auth_time DESC", [mobno, dateFormat, timeForamt]);
      connection.query(sql,  function (error, results, fields) {
      if (error) throw error;
    
        console.log(JSON.stringify(results[0].auth_time) + "====" + JSON.stringify(results[1].auth_time))
      if(JSON.stringify(results[0].auth_time.split(':')[1]) >  JSON.stringify(results[1].auth_time.split(':')[1])){
               try{
              cypress.run();
              console.log("\n==============================\n");
              console.log("Person Info: " + nric + " : " + mobno)
              console.log("Date and Time: " + d)
             
              spinner.succeed(`__SAFE_ENTRY_SUCCEEDED_FOR_${person.getNricFin()}_${new Date()}__`);
              spinner.start();
          }catch(e){
            console.log(e)
       }
      }else{
        console.log("NO")
      }
      });

    }
  });
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(spinner.start.bind(spinner))
  .catch(console.error);
