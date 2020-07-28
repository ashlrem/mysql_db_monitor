# mysql_db_monitor

Before we start we need to enable binary logs in MySQL, by changing my.ini file in windows and my.cnf in ubuntu.
The location of these files might be different, based on how you install mysql.
we need to add the following lines under [mysqld] section, and then restart mysql.

```
log-bin=bin.log
log-bin-index=bin-log.index
max_binlog_size=100M
binlog_format=row
socket=mysql.sock
```

## Installing NPM Dependencies

```
npm install
```

## Monitoring the database table
```
npm run start
```

## Changing MySQL Dependencies and configuring the table

> dbEventsMonitor.js
```
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'camera_user',
    password: 'admin123'
  });
```

```
instance.addTrigger({
    name: 'monitoring all statments',
    expression: 'ost_hikvision_db.*', // listen to hikvision database !!!
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
```
