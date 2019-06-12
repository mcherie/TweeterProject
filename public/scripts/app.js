// Fake data taken from tweets.json
const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  for (const tweet of tweets) {
    const $incomingTweet = createTweetElement(tweet)
    $('#tweets-container').prepend($incomingTweet);
  }
}

function createTweetElement(tweet) {
  // Base this from HTML template, better to have it side-by-side. Create everything first, from top to bottom, LINE BY LINE. Then Append everything for each section (the last thing to append are the main/major headings under this secction).  Then add data to elements to make it dynamic.


  // Create Elements
  const $tweet = $('<article>').addClass('tweet');

  // 1. Create Elements
  const $header = $('<header>')
  const $headerAvatar = $('<img>').addClass('avatar')
  const $headerOwner = $('<h3>').addClass('accountOwner')
  const $headerHandle = $('<p>').addClass('reply-to')

  // 3. Add data to elements
  $headerAvatar.attr('src', tweet.user.avatars.small);
  $headerOwner.text(tweet.user.name);
  $headerHandle.text(tweet.user.handle);

  // 2. Append Elements
  $header.append($headerAvatar);
  $header.append($headerOwner);
  $header.append($headerHandle);


  // 1. Create Elements
  const $tweetBody = $('<p>').addClass('tweetBody')
  // 3. Add data to elements
  $tweetBody.text(tweet.content.text);


  // 1. Create Elements
  const $footer = $('<footer>')
  const $footerCreated = $('<span>').addClass('created')
  const $footerFlag = $('<img>').addClass('flag')
  const $footerRetweet = $('<img>').addClass('retweet')
  const $footerLike = $('<img>').addClass('love')

  // 3. Add data to elements
  $footerCreated.text(tweet.created_at);
  $footerFlag.attr('src', "https://images.vexels.com/media/users/3/130335/isolated/preview/8895fce21acb5e4046753456aa05328f-flat-flag-icon-by-vexels.png");
  $footerRetweet.attr('src', "https://cdn0.iconfinder.com/data/icons/twitter-ui-flat/48/Twitter_UI-13-512.png");
  $footerLike.attr('src', "https://cdn.shopify.com/s/files/1/1573/2047/products/product-image-111632822_1024x1024.jpg?v=1527269063");


  // 2. Append Elements
  $footer.append($footerCreated)
  $footer.append($footerFlag)
  $footer.append($footerRetweet)
  $footer.append($footerLike)


  // 4. Append Elements
  $tweet.append($header)
  $tweet.append($tweetBody)
  $tweet.append($footer)

  return $tweet;
}


$(document).ready(function () {
  renderTweets(data);

  // -----------------------------Below is the POST------------------------------------

  var $button = $('#send-tweet');

  $button.on('submit', function (event) {
    event.preventDefault();
    console.log('Tweet button clicked, now it SHOULD make an ajax call to post this tweet...');
    // this is to serialize(don't forget it's a function) to turn the form "data" into a query string
    const $newUserTweet = $(this).serialize();
    // send ajax request with url, methd, and the data you want processed
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $newUserTweet, // the new serialized data
      })
      .then(function () {
        console.log("This space is where I code what I want to do here, which in this case is load tweets (that has the renderTweets function to process the data)")
        loadTweets()
      });
  });

  // ------------------------------Below is the GET-------------------------------------

  var loadTweets = function () {
    // Send the ajax request
    $.ajax('/tweets', {
      method: 'GET',
      success: function (data) {
        // console.log('Success', data);
        renderTweets(data);
      },
      // success: renderTweets(data); this doesn't work since there's only one function?
    })
  }

});




  // $('#send-tweet').on('submit', function (event) {
  //   event.preventDefault();
  //   const $userTweet = $(this).serialize();

  //   $.ajax({
  //     type: 'POST',
  //     url: '/tweets/',
  //     data: $userTweet,
  //     // Callback from jQuery, that allows you to manipulate the data before sending the request
  //     beforeSend: function () {
  //       console.log('beforeSend');
  //     },
  //     success: function () {
  //       console.log('Success');
  //     },
  //     error: function () {
  //       console.log('Error');
  //     }
  //   });

  // });