var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const greenlock = require('greenlock').create()
app.get('/get-cert', function(req, res) {
	greenlock.register(
		domains: req.body.domains
	).then(function(results) {
		console.log(results)
		// write certs to EFS
		// reboot service
	}).catch(err)(function(err) {
		console.error(err)
	})
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
