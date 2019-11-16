module.exports = async function () {
	const express = require("express");
	const app = express();
	const cron = require('node-cron');
	const errorHandler = require("./handlers/error");
	const { telegramBot } = require("./handlers/telegramBot");
	const { dropCollectionData } = require("./handlers/dropCollectionData");

	const PORT = 3002;
	// const PORT = process.env.PORT || 3001;

	// cron job to automatically send news articles in PreReview collection to Telegram Bot for review by Admins
	// scheduled daily at 0100, 0500, 0900, 1300, 1700 and 2100 hrs.
	// prod: 00 1,5,9,13,17,21 * * *
	// dev:  */10 * * * * *
	cron.schedule('00 1,5,9,13,17,21 * * *', () => {
		console.log('sending news from PreReview to Telegram Bot...');
		telegramBot();
	});

	// cron job to automatically send news articles in PreReview collection to Telegram Bot for review by Admins
	// scheduled on Sun, Tue, Thu and Sat at 2230 hrs.
	// prod: 30 22 * * 0,2,4,6
	cron.schedule('30 22 * * 0,2,4,6', () => {
		console.log('dropping all records from PreReview...');
		dropCollectionData();
	});

	// generic error handler from handlers/error.js
	app.use(errorHandler);

	app.listen(PORT, function() {
	    console.log(`WDD Telegram Review Bot has started on port ${PORT}`);
	});
}