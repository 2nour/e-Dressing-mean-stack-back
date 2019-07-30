const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

var app =express();

app.use(bodyParser.json());
app.use(cors());

var port=3000;

app.listen(port,function () {
    console.log('App listening on port 3000!')
  });

