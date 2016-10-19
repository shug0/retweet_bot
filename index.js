// Load NPM LIB
var Twit = require('twit')
// JS function for looking in array and return true if users are in it
var contains = function(needle) {var findNaN = needle !== needle; var indexOf; if(!findNaN && typeof Array.prototype.indexOf === 'function') {indexOf = Array.prototype.indexOf; } else {indexOf = function(needle) {var i = -1, index = -1; for(i = 0; i < this.length; i++) {var item = this[i]; if((findNaN && item !== item) || item === needle) {index = i; break; } } return index; }; } return indexOf.call(this, needle) > -1; };

// Twiter Credentials (KEEP IT PRIVATE !)
var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

// List of Twitter users who will be RT by the Bot
var streamers = ['Alphacast_fr', 'meltyDegun', 'manaberryio', 'meltymoonL', 'nujaow', 'Xeleko', 'xsooesport'];

// Mention for get RT
var watcher = '@OversquadFR';

// User to check following
var userToCheckFollow = 'OversquadFR';
var followingsUsers = [];

// Store the IDS of the followings accounts
T.get('followers/ids', { screen_name: userToCheckFollow },  function (err, data, response) {
  followingsUsers = data.ids;
})

var stream = T.stream('statuses/filter', { track: watcher });

stream.on('tweet', function (tweet) {

  // Test if the user who had tweeted is in the streamers list & if the 'userToCheckFollow' is following him
  if ( contains.call(streamers, tweet.user.screen_name) && contains.call(followingsUsers, tweet.user.id)) {

    // We RT his tweet
    T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
      console.log('Just RT @' + tweet.user.screen_name);
    })

  }
})
