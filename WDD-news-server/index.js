require("dotenv").config();
const database = require("./models");
const webServer = require("./web");
const telegramBot = require("./telegram");

(async function main() {
	
	// console.log("Establishing connection to database.");
	// await database.init();

	console.log("Starting WDD News Server");
	await webServer();

	console.log("Starting WDD Telegram Review Bot");
	await telegramBot();

})();