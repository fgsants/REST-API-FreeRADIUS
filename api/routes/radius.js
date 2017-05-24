'use strict';

module.exports = function(app) {
  var radius = require('../controllers/radius');

  app.route('/check/:login')
    .get(radius.check);

  app.route('/auth/:login/:password')
    .get(radius.auth);
		
  app.route('/accounting/:login')
    .post(radius.accounting);
	
  app.route('/users')
    .get(radius.list_all_users)
    .post(radius.create_user);
	
  app.route('/users/:userID')
    .put(radius.update_user)
    .delete(radius.remove_user);
	
  app.route('/profiles')
    .get(radius.list_all_profiles)
    .post(radius.create_profile);
	
  app.route('/profiles/:profileID')
    .put(radius.update_profile)
    .delete(radius.remove_profile);
};