const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

app.use('/static', express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
