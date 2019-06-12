/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){



$('article').on('mouseover', function(){
  $(this).find('.flag').show();
});

$('article').on('mouseout', function(){
  $(this).find('.flag').hide();
});

}):