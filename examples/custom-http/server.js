"use strict";

const path = require('path');
const express = require('express');
const multer  = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(express.static(path.join(__dirname, "./dist")));

app.post('/fileUpload', upload.single('file'), function (req, res) {
  console.info("A file was uploaded: " + req.file.originalname);
  res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
