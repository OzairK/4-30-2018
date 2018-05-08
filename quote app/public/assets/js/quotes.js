// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // jQuery event handlers should go here.
  $(".delquote").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/quotes/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim()
    };

    $.ajax("/api/quotes", {
      type: "POST",
      data: newQuote
    }).then(
      function() {
        console.log("created new quote");
        location.reload();
      }
    );
  });

  $(".update-form").on("submit", function(event) {

    event.preventDefault();
    var updatedQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim()
    };

    var id = $(this).data("id");

    $.ajax("/api/quotes/" + id, {
      type: "PUT",
      data: updatedQuote
    }).then(
      function() {
        location.reload();;
      }
    );
  });

});



