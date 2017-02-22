Simple twitter REST proxy to search for trump tweets (?q=trump).  
Shoved it up in a aws lambda  
Used aws api gateway to front it. 


config file is setup, should probably move to envs that can be setup with the lambda
```
module.exports = {
  twitter: {
    consumer_key: <CONSUMER KEY>,
    consumer_secret: <CONSUMER SECRET>
  }
}
```