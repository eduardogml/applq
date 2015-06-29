module.exports = function (app) {
	
  var controller = app.controllers.facebookuser;

  app.route('/facebookuser')
  .post(controller.salvaFacebookuser);
};
