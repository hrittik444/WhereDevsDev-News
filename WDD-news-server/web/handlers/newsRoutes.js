const db = require("../../models");

exports.preReview = function(req, res) {
	db.PreReview.find()
	.then(news => res.json(news))
	.catch(err => res.send(err));
}

exports.postReview = function(req, res) {
	db.PostReview.find()
	.then(news => res.json(news))
	.catch(err => res.send(err));
}

module.exports = exports;