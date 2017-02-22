var http = require('https');

function Utils(){
  var url = 'https://api.twitter.com/oauth2/token';
  var token;
  function bearerToken(key, secret){
    return new Promise(function(resolve, reject){
      var cat = key +":"+secret;
      var credentials = new Buffer(cat).toString('base64');
      var headers= {
          "Authorization": "Basic " + credentials,
          "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      };
      var body = "grant_type=client_credentials";
      var request = http.request({
        headers: headers,
        method: 'POST',
        hostname:'api.twitter.com',
        path: '/oauth2/token'
      }, function(response){
        var str = '';
        response.on('data', function (chunk) {
          str += chunk;
        });

        response.on('end', function () {
          var tmp = JSON.parse(str);
          token = tmp.access_token;
          resolve(token);
        });

      });
      request.end(body);
    });
  }
  function tweets(search){
    return new Promise(function(resolve, reject){
      var headers = {
          "Authorization": "Bearer " + token
      };
      var request = http.request({
        headers: headers,
        method: 'GET',
        hostname:'api.twitter.com',
        path: '/1.1/search/tweets.json?q=trump&result_type=mixed&count=20'
      }, function(response){
        var str = '';
        response.on('error',function(e){reject(e)});

        response.on('data', function (chunk) {
          str += chunk;
        });

        response.on('end', function () {
          try{
            resolve(str);
          }catch(e){
            reject(e);
          }
          
        });
      });
      request.end();
    });
  }


  this.bearerToken = bearerToken;
  this.tweets = tweets;
  this.token = token;
  return this;
}

module.exports = Utils;