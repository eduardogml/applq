module.exports = {
	env: 'production',
	db: process.env.OPENSHIFT_MONGODB_DB_URL + 'applq',
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackUrl: process.env.CALLBACK_URL,
	port: process.env.OPENSHIFT_NODEJS_PORT,
	address: process.env.OPENSHIFT_NODEJS_IP,
	domain: process.env.OPENSHIFT_APP_DNS
};