const LiveSQL = require('live-sql')

/**
 * Create a new isntance
 */
var manager = new LiveSQL({
    "host": "localhost",
    "user": "camer_user",
    "password": "admin123",
    "database": "hikvision"
    /**
     * @see node-mysql for connection options
     */
});

/**
 * Subscribe to the `attendance_acs` table
 */
manager.subscribe("attendance_acs");

/**
 * Listen for new posts on the `hikvision.attendance_acs` table
 *
 * Each time an insert happens on the posts table
 * this method is fired
 */
manager.on("attendance_acs.insert", function(event){
    /**
     * Log the effected rows
     */
    console.log(event.rows());
});

/**
 * Catch all events on the `hikvision.attendance_acs` table
 */
// manager.on("hikvision.attendance_acs.*", function(event){
//     /**
//      * Log the event type
//      */
//     console.log(event.type());
// });

/**
 * Start the client
 */
manager.start();