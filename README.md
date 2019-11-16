# 🐒WhereDevsDev News

### Technology News Feed Curated by Admins at the WhereDevsDev Community built using MongoDB, Express, NodeJS and React

#### SERVER:
  1. Install and start MongoDB
  2. Install dependencies: `npm install`
  3. Start the server: `node index.js` or `nodemon`
  
  * A CRON job runs every day at 0000 hrs. causing the Server to fetch articles from news sources and populate the PreReview collection.
  * A CRON job runs every day at 0100, 0500, 0900, 1300, 1700 and 2100 hrs. causing the Telegram Bot to send articles in the PreReview collection, to Admins for review.
  * If an article is accepted, it is then put into the PostReview Collection.
  * A JSON API endpoint serves the articles in the PostReview collection that the Client can query.
  * A CRON job runs every Sun, Tue, Thu and Sat at 2230 hrs. deleting all records from the PreReview collection that have been sent for review and rejected.
  * *To see the App in action in a development environment, you may change the CRON times to shorter intervals.*

  #### API Endpoints:
   * http://localhost:3001/news/prereview *(default PORT: 3001)*
   * http://localhost:3001/news/postreview *(default PORT: 3001)*

#### CLIENT:
  1. Install dependencies: `npm install`
  2. Run `npm start`
  
  * Client communicates with Server and loads News Articles from PostReview collection
  * News articles are rendered and clicking on each tile routes user to the individual component for each article



&nbsp;

&nbsp;

&nbsp;

Powered by:  
https://newsapi.org/  
https://gnews.io/  
https://hackernews.api-docs.io/  
