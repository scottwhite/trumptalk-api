var config  = require('./config').twitter;
var Utils = require('./utils')();

exports.handler = function(event, context, callback) {
  Utils.bearerToken(config.consumer_key, config.consumer_secret).then(function(bt){
    Utils.tweets('trump').then(function(tweets){
      var response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-type'
        },
        body: tweets
      };
      callback(null, response);
    })
  });   
}

