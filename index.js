var Boom      = require('boom');
var Graph     = require('fbgraph');
var Promise   = require('bluebird');

Promise.promisifyAll(Graph);

exports.authenticate = function(accessToken, fieldsArr) {

  var fields = 'id,first_name,last_name,gender,email,birthday,picture{url},cover,friends.limit(50){name,picture{url}}';
  if(fieldsArr && fieldsArr.length){
    fields = fieldsArr.join();
  }

  return Graph.getAsync('/me?fields='+fields+'&access_token=' + accessToken)
  .then(function(result) {
    if(!result.email) {
      throw Boom.unauthorized('Invalid access token: no email found, please set extended permissions for email.');
    }

    result.picture = 'https://graph.facebook.com/' + result.id + '/picture?type=large&redirect=true&width=600&height=600'; //hi-def image
    return result;
  })
  .catch(function(err) {
    throw Boom.unauthorized(err.message);
  });
}
