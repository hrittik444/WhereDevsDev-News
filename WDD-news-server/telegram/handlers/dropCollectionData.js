const db = require("../../models");

// deleting all records from PreReview collection
exports.dropCollectionData = function () {
	db.PreReview.remove({}).exec();
}