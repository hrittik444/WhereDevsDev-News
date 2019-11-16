module.exports = async function () {
	const cors = require("cors");
	const express = require("express");
	const app = express();
	const bodyParser = require("body-parser");
	const newsRoutes = require("./routes/news");
	const cron = require('node-cron');
	const errorHandler = require("./handlers/error");
	const { hackerNews, newsApiTech, googleNewsTech } = require("./handlers/newsAPI");

	const PORT = 3001;
	// const PORT = process.env.PORT || 3001;

	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// route to view all news articles in database
	app.use("/news", newsRoutes);

	// cron job to automatically load news into database from sources
	// scheduled daily at 0000 hrs.
	// prod: 0 0 * * *
	// dev:  */15 * * * * *
	cron.schedule('0 0 * * *', () => {
		console.log('loading news from sources into PreReview...');
		hackerNews();
		newsApiTech();
		googleNewsTech();
	});

	// 404 error handler
	app.use(function() {
	    let err = new Error("Not Found");
	    err.status = 404;
	    console.log(err);
	});

	// generic error handler from handlers/error.js
	app.use(errorHandler);

	app.listen(PORT, function() {
	    console.log(`WDD News Server has started on port ${PORT}`);
	});
}