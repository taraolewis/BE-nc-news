# NC News Seeding

HOSTED VERSION:
The API is hosted on Render and can be accessed at: https://be-nc-news-wwtd.onrender.com
The /api endpoint provides a complete list of available routes and their functionality.

PROJECT SUMMARY:
This API called Northcoders News serves as the backend that powers a news application, allowing users to fetch and interact with articles, topics, comments, and users. Users can read, post, update and delete comments. Users can also view and filter articles by topic, author, or date. It follows a test-driven development approach using Jest and includes error handling with appropriate error messages for invalid requests.

SET-UP:

- To set up the project locally, clone the repositary by opening your terminal and typing in the command 'git clone' then the link to the repositary: https://github.com/taraolewis/BE-nc-news

- Install the dependancies in the package.json file onto your cloned repositary by typing the command 'npm install' into your terminal.

- Set up environment variables by creating two .env files: .env.test and .env.development.

- You will then need to add PGDATABASE= nc_news into the .env.development file and PGDATABASE= nc_news_test into the .env.test file. These files will be git ignored automatically.

- Seed the local database by running the command 'npm run setup-dbs' in your terminal, followed by 'npm run seed-dev'. The first command will set up the database and the latter will seed it.

- At this point, you will be able to execute the test suite to verify functionality, using the command npm test. The tests cover, endpoint functionality, data validation and error handling.

MINIMUM VERSIONS REQUIRED:
Node.js (v16.0.0 or higher)
PostgreSQL (v14.0.0 or higher)
