/**
 * @description Telegram Bot created using BotFather
 */

require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const db = require("../../models");

// You will receive the Telegra Bot Token at the time of creating the bot
// Put it into the .env file and you're good to go
const bot = new TelegramBot(process.env.TELEGRAMBOTTOKEN, {polling: true});

bot.on("polling_error", (err) => console.log(err));

/**
 * @description Triggered when someone presses the 'Accept' or 'Reject' button.
 */
bot.on('callback_query', callbackQuery => {

	const message = callbackQuery.message;
	const callback = callbackQuery.data;
	const newsDetails = callback.split(',');

	// Sending a message telling whether the article has been accepted or rejected.
	bot.sendMessage(message.chat.id, "Article \"" + newsDetails[0] + "\" has been " + newsDetails[1])
	.then(() => db.PreReview.findOneAndUpdate({ _id: newsDetails[2] }, { status: newsDetails[1] }, { upsert: false }))
	.catch(err => console.log(err))

	// Adding article to PostReview if it has been accepted
	if(newsDetails[1] == 'Accepted') {
		db.PreReview.find({ _id: newsDetails[2] }).exec()
		.then(news => {
			news.forEach(n => {
				db.PostReview.create({
					title: n.title,
					author: n.author,
					publishedDate: n.publishedAt,
					origin: n.source,
					url: n.url,
					urlToImage: n.urlToImage,
					content: n.content
				})
			});
			console.log('Accepted, inserted into Post Review');
		})
		.catch(err => console.log(err))
	}

	// Delete the message with article details and inline keyboard.
	bot.deleteMessage(process.env.CHATID, message.message_id);
});

/**
 * @description Fetches articles from 'prereview' collection and sends messages for review using the TG bot api.
 */
exports.telegramBot = function() {

	// To find Chat ID, make an HTTP request to https://api.telegram.org/bot<Telegram Bot Token>/getUpdates/
	const chatId = parseInt(process.env.CHATID);

	// Find the "unsent" articles in the preReview collection.
	db.PreReview.find({ status: "unsent" }).limit(20).exec()
	.then(news => {
		news.forEach(n => {
			// Cleaning news title.
			const completeTitle = '' + n.title;
			const articleTitleTrim = completeTitle.substring(0, 20) + '...';
			const ascii = /^[ -~\t\n\r]+$/;
			let title = '';
			if (ascii.test(articleTitleTrim)) {
				title = articleTitleTrim;
			}

			// Sending the message with article details and inline keyboard.
			bot.sendMessage(
				chatId,
				'Review ' + n.title + ' at ' + n.url + ' ?',
				{
					reply_markup: {
						inline_keyboard: [[
							{
								text: 'Accept',
								callback_data: title + ',Accepted,' + n._id
							},
							{
								text: 'Reject',
								callback_data: title + ',Rejected,' + n._id
							}
						]]
					}
				}
			)
			.then(() => db.PreReview.findOneAndUpdate({ _id: n._id }, { status: "sentForReview" }, { upsert: false }))
			.catch(err => console.log(err))
		})
	})
	.catch(err => console.log(err));
}




