"use strict";

var express = require('express');
var multer  = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(express.static(__dirname));

app.post('/fileUpload', upload.single('file'), function (req, res) {
    console.log("Uploaded file " + req.file.originalname);
    res.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});