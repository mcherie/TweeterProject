$(document).ready(function () {

  $("textarea").focus(function () {
    $(this).css("background-color", "#d7f2f2");
  });

  $("textarea").blur(function () {
    $(this).css("background-color", "#ffffff");
  });


  $("main section form textarea").on("input", function () {
    let count = (140 - this.value.length);
    console.log(count);

    $("main section form span.counter").text(count);

    if (count < 0) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red");
    }

  });


});