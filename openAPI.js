const ipcamera = require('node-hikvision-api');

// Options:
var options = {
    host	: '127.0.0.1',
    port 	: '8000',
    user 	: 'admin',
    pass 	: 'admin123',
    log 	: false,
};

try{
    var hikvision 	= new ipcamera.hikvision(options);
    console.log("HikVision Open API \n\n" + JSON.stringify(hikvision) + "\n \n \n")
} catch (e) {
    console.log(e)
}

