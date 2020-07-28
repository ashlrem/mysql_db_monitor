const express = require('express');
const app = express();
const databaseEventsMonitor = require('./database/dbEventsMonitor');
// const hikvision = require('./openAPI');

app.get('/', (req, res) => {
  res.send('OST Face Recognition Monitoring')
});


app.listen(5000, () => {
  console.log('OST Face Recognition Monitoring listening on port 5000!')
});