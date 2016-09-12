var cheerio = require('cheerio');
var request = require('request');
var NewsItem = require('../model/newsItem');


var loadNews = function(done, err) {
	NewsItem.find({}, function(err, news){
		if(err) {
			console.log('Error loading news. ');
			err(err);
		} else {
			if(news.length === 0) {
				console.log('No news found. Scrapping and loading now...');
				scrapNewsAndSave(done, err);
			} else {
				done(news);
			}
		}
	});
};

var scrapNewsAndSave = function(done, errCb) {
	request('http://www.theonion.com/section/politics/', function(error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var news = [];
			$('article.summary').each(function(i, element) {
				var article = $(this);
				var title = article.find('.headline a').html().trim();
				var body = article.find('.desc').html().trim();
				news.push({'title': title, 'body': body});
			});
			console.log('Got news.. saving now');

			NewsItem.insertMany(news, function(err, insertedNews){
				if(err){
					errCb(err);
				} else {
					done(insertedNews);
				}
			});
		} else {
			console.log('News could not be scrapped.')
			errCb('News could not be scrapped');
		}
	});
};

module.exports = {loadNews: loadNews}