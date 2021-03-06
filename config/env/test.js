module.exports = {
	env: 'test',
	db: 'mongodb://localhost/applq_test',
	sauceTestName: 'Applq E2E Testing',
	sauceUser : process.env.SAUCE_USERNAME,
	sauceKey : process.env.SAUCE_ACCESS_KEY,
	travisJobNumber: process.env.TRAVIS_JOB_NUMBER,
	travisBuild: process.env.TRAVIS_BUILD_NUMBER,
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackUrl: process.env.CALLBACK_URL,
	seleniumUser: process.env.SELENIUM_USER,
	seleniumUserPassword: process.env.SELENIUM_USER_PASSWORD,
	port: 3000,
	address: 'localhost',
	domain: 'localhost'
};