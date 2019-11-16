const express = require("express");
const router = express.Router();
const handlers = require("../handlers/newsRoutes");

// routes to view all news articles in PreReview and PostReview
router.route('/prereview').get(handlers.preReview);
router.route('/postreview').get(handlers.postReview);

module.exports = router; 