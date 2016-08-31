var Twit = require('twit')

// Twiter Credentials (KEEP IT PRIVATE !)
var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

// List of Twitter users who will be RT by the Bot
var streamers = ['le_bot_de_shug0','Shug0', 'Alphacast_fr', 'meltyDegun', 'manaberryio', 'meltymoonL', 'nujaow', 'Xeleko', 'xsooesport'];

// Mention for get RT  
var watcher = '@OversquadFR';

// JS function for looking in array and return true if users are in it
var contains = function(needle) {var findNaN = needle !== needle; var indexOf; if(!findNaN && typeof Array.prototype.indexOf === 'function') {indexOf = Array.prototype.indexOf; } else {indexOf = function(needle) {var i = -1, index = -1; for(i = 0; i < this.length; i++) {var item = this[i]; if((findNaN && item !== item) || item === needle) {index = i; break; } } return index; }; } return indexOf.call(this, needle) > -1; };



var stream = T.stream('statuses/filter', { track: watcher });
stream.on('tweet', function (tweet) {

  // The tweet with the watcher is found
  if (contains.call(streamers, tweet.user.screen_name)) {

    // The user is in the list so the bot RT this tweet
    T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
      //console.log(data)
    })
  }
})