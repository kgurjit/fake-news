var express = require('express');
var router = express.Router();
var news = require('../controller/news');

router.get('/', function(req, res, next) {
	news.loadNews(function(newsItems){
		res.render('index', {newsItems: newsItems});
	}, function(err){
		res.render('error', {err: err});
	});
});

module.exports = router;