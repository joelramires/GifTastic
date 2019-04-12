$(document).ready(function() {

  // Adding click event listen listener to all buttons
  $("button").on("click", function() {
    $("#gifs-appear-here").empty();

    // Grabbing and storing the data-property value from the button
    var tvShows = $(this).attr("data-shows");
    
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    tvShows + "&api_key=gzoefhXJKhu61UH9HvDCwOjpG0YM0fR7&limit=10";
    
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);
      
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var tvDiv = $("<div>");
        
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>")
        
        // Creating and storing an image tag
        var tvShowImage = $("<img>")
        .attr("data-still", results[i].images.fixed_height_still.url)
        .attr("data-animate", results[i].images.fixed_height.url)
        .attr("data-state","still")
        .attr("class", "gif")
        // Setting the src attribute of the image to a property pulled off the result item
        tvShowImage.attr("src", results[i].images.fixed_height_still.url);
        
        // Appending the paragraph and image tag to the tvDiv
        tvDiv.append(p);
        tvDiv.append(tvShowImage);
        
        // Prependng the tvDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(tvDiv);
        
        
      }
      
    });
    $(document).on("click", ".gif",function() {
      
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    
  });
});