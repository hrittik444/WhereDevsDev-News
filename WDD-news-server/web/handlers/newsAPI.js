require("dotenv").config();
const db = require("../../models");
const fetch = require("node-fetch");

// fetches top stories from Hacker News (https://hackernews.api-docs.io/v0/overview/introduction)
exports.hackerNews = function() {
	const topUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
	const storyUrl = 'https://hacker-news.firebaseio.com/v0/item/';
	
	fetch(topUrl)
	.then(res => res.json())
	.then(data => data.map(id => {
		const url = `${storyUrl}${id}.json`;
		return fetch(url).then(res => res.json());
	}))
	.then(data => Promise.all(data))
	.then(news => {
		news.forEach(n => (
			db.PreReview.create({
				title: n.title,
				author: n.by,
				publishedDate: n.time,
				origin: "Hacker News",
				url: n.url
			})
		));
		console.log(news);
	})
	.catch(err => console.log(err));
}

// fetches top stories (Category: technology) from News API (https://newsapi.org/)
exports.newsApiTech = function() {
	const topUrl = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWSAPITOKEN}`;
	
	fetch(topUrl)
	.then(res => res.json())
	.then(data => {
		data.articles.forEach(a => (
			db.PreReview.create({
				title: a.title,
				author: a.author,
				publishedDate: a.publishedAt,
				origin: a.source.name,
				url: a.url,
				urlToImage: a.urlToImage,
				content: a.content
			})
		));
		console.log(data);
	})
	.catch(err => console.log(err));
}

// fetches top stories (search query: technology) from Google News (https://gnews.io/)
exports.googleNewsTech = function () {
	const topUrl = `https://gnews.io/api/v3/top-news?q=technology&token=${process.env.GNEWSTOKEN}`;
	
	fetch(topUrl)
	.then(res => res.json())
	.then(data => {
		data.articles.forEach(a => (
			db.PreReview.create({
				title: a.title,
				author: a.author,
				publishedDate: a.publishedAt,
				origin: a.source.name,
				url: a.url,
				urlToImage: a.image,
				content: a.content
			})
		));
		console.log(data);
	})
	.catch(err => console.log(err));
}
