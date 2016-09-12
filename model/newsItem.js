var DB_URI = "mongodb://heroku_t43fj0zp:kmunrtbkrflktk9g29f2j3u4ch@ds029436.mlab.com:29436/heroku_t43fj0zp";
var mongoose = require('mongoose');

var initDb = function(){
	var newsItemSchema = mongoose.Schema({
	    title: String,
	    body: String
	});
	mongoose.connect(DB_URI);
	// var conn = mongoose.createConnection(DB_URI);
	mongoose.Promise = require('bluebird');
	

	return mongoose.model('NewsItem', newsItemSchema);
};

var model = initDb();

module.exports = model;