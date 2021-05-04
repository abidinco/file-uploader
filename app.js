var express = require('express');
var multer = require('multer');
var path = require('path');
var app = express();

// Serve files like: example.com/content/one/pp/image
app.use('/content/one/pp', express.static(path.join(__dirname, 'uploads/pp')));
app.use('/content/one/header', express.static(path.join(__dirname, 'uploads/header')));

// Multer opts
var ppStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/pp') // Destination for files
	},
	filename: function(req, file, cb) {
		cb(null, req.body.username) // Like 'nickname' (Who needs a file extension?)
		// If file is exists, multer overrides it.
		// So we can have just 1 profile picture at one time
	}
});
var uploadPP = multer({storage: ppStorage});
var headerStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/header')
	},
	filename: function(req, file, cb) {
		cb(null, req.body.username)
	}
});
var uploadHeader = multer({storage: headerStorage});

// Handle post request
app.post('/upload/pp', uploadPP.single('avatar'), function(req, res) {
	res.end('end');
});
app.post('/upload/header', uploadHeader.single('header'), function(req, res) {
	res.end('end');
});

app.listen(8090, function() {
	console.log('Listening on 8090');
});
