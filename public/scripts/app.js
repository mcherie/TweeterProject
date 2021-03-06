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
    const $incomingTweet = createTweetElement(tweet);
    $('#tweets-container').prepend($incomingTweet);
  }
}

function createTweetElement(tweet) {
  // Base this from HTML template, better to have it side-by-side. Create everything first, from top to bottom, LINE BY LINE. Then append everything for each section (the last thing to append are the main/major headings under this secction).  Then add data to elements to make it dynamic.

  // Create Elements
  const $tweet = $('<article>').addClass('tweet');

  // 1. Create Elements
  const $header = $('<header>');
  const $headerAvatar = $('<img>').addClass('avatar');
  const $headerOwner = $('<h3>').addClass('accountOwner');
  const $headerHandle = $('<p>').addClass('reply-to');

  const fullTemplate = "<cher><span>Hello Cher</span></cher>"


  // 3. Add data to elements
  $headerAvatar.attr('src', tweet.user.avatars.small);
  $headerOwner.text(tweet.user.name);
  $headerHandle.text(tweet.user.handle);

  // 2. Append Elements
  $header.append($headerAvatar);
  $header.append($headerOwner);
  $header.append($headerHandle);


  // 1. Create Elements
  const $tweetBody = $('<p>').addClass('tweetBody');
  // 3. Add data to elements
  $tweetBody.text(tweet.content.text);


  // 1. Create Elements
  const $footer = $('<footer>');
  const $footerCreated = $('<span>').addClass('created');
  const $footerFlag = $('<img>').addClass('flag');
  const $footerRetweet = $('<img>').addClass('retweet');
  const $footerLike = $('<img>').addClass('love');

  // Calculate to show time elapsed to show on the tweet
  let tweetCreated = tweet.created_at;
  let currentTime = Math.floor(Date.now());
  let timeString = ""
  let timeElapsed = currentTime - tweetCreated;
  if (((timeElapsed / 1000) / 60) < 1) {
    timeString = Math.floor(timeElapsed / 1000) + " seconds ago";
  } else if ((((timeElapsed / 1000) / 60) / 60) < 1) {
    if (((((timeElapsed / 1000) / 60) / 60) < 1) == 1) {
      timeString = Math.floor((timeElapsed / 1000) / 60) + " minute ago";
    } else
      timeString = Math.floor((timeElapsed / 1000) / 60) + " minutes ago";
  } else if (((((timeElapsed / 1000) / 60) / 60) / 24) < 1) {
    if (Math.floor(((timeElapsed / 1000) / 60) / 60) == 1) {
      timeString = Math.floor(((timeElapsed / 1000) / 60) / 60) + " hour ago";
    } else
      timeString = Math.floor(((timeElapsed / 1000) / 60) / 60) + " hours ago";
  } else if ((((((timeElapsed / 1000) / 60) / 60) / 24) / 30) > 1) {
    timeString = Math.floor((((timeElapsed / 1000) / 60) / 60) / 24) + " days ago";
  }

  // 3. Add data to elements
  $footerCreated.text([timeString]);
  $footerFlag.attr('src', "https://images.vexels.com/media/users/3/130335/isolated/preview/8895fce21acb5e4046753456aa05328f-flat-flag-icon-by-vexels.png");
  $footerRetweet.attr('src', "https://cdn0.iconfinder.com/data/icons/twitter-ui-flat/48/Twitter_UI-13-512.png");
  $footerLike.attr('src', "https://cdn.shopify.com/s/files/1/1573/2047/products/product-image-111632822_1024x1024.jpg?v=1527269063");


  // 2. Append Elements
  $footer.append($footerCreated);
  $footer.append($footerFlag);
  $footer.append($footerRetweet);
  $footer.append($footerLike);


  // 4. Append Elements
  $tweet.append($header);
  $tweet.append($tweetBody);
  $tweet.append($footer);

  return $tweet;
};


$(document).ready(function () {

  // -----------------------------Below is the POST------------------------------------

  const $button = $('#send-tweet');

  $button.on('submit', function (event) {
    event.preventDefault();

    // Serialize() to turn the form "data" into a query string
    const $newUserTweet = $(this).serialize();

    // If statements for text empty or tex exceed error messages
    if (!$('#send-tweet textarea').val()) {
      $('.textEmpty').slideDown();
    } else if ($('.counter').text() < 0) {
      $('.tweetExceed').slideDown();
    } else {

      // If criteria is met, send Ajax request with url, methd, and the data you want processed
      $.ajax({
          url: '/tweets/',
          method: 'POST',
          data: $newUserTweet, // the new serialized data
        })
        .then(function () {
          $('#tweets-container').empty();
          loadTweets()
        });

    }

  });

  // ------------------------------Below is the GET-------------------------------------

  let loadTweets = function () {
    // Send the ajax request
    $.ajax('/tweets', {
      method: 'GET',
      success: function (data) {
        // Now render the tweets with the new tweet, clear the textfield area, and reset the character count
        renderTweets(data);
        $('textarea').val('');
        let count = 140;
        $('.counter').text(count);
      },
    })
  }
  loadTweets();

  // ------------------below is the toggle to hide and show new tweet box ---------

  $('.compose').click(function () {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });
  // --------------------------------------------------------------------------------
  $('textarea').click(function () {
    $('.textEmpty').slideUp();
    $('.tweetExceed').slideUp();
  });
  // ---------------------------------------------------------------------------------


});