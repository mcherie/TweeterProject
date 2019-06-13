"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

        console.log("saveTweet func called")

      db.collection("tweets").insertOne(newTweet, function(err, res) {
        if (err) {
          callback(err);
      } else {
        callback(null);
      }
      })
    },


    getTweets: function(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

    
  };
}
