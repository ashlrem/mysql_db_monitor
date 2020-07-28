var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'camer_user',
  password : 'admin123',
  database : 'hikvision'
});

connection.connect(function(err) {
    if(!err) {
        console.log("Successfully connected to database ... nn")
    } else {
        console.log("Failed to connect to database ... nn")
    }
});


// connection.query('SELECT * from attendance_acs', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
// });
// connection.end();