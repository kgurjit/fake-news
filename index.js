var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({
	extended: false
}));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
		toJSON: function(object) {
			return JSON.stringify(object);
		}
	}
}));
app.set('view engine', 'handlebars');

var routes = require('./routes');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port);