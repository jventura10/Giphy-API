$(document).ready(function(){
    //Topics for Buttons, These Will be Default Buttons, More Can Be Added With User Input
    var topics=['Naruto','Itachi','Uchiha','Seven Deadly Sins','Castlevania','Rurouni Kenshin','Hunter x Hunter','Sword Art Online','Cowboy Bebop','Samurai Champloo','Pokemon',
                'Dragon Ball Z'];

    //Function to Get Topics Array and Make a Button For Each Index, Gets Called When New Topic Has Been Added
    function renderButtons(){
        //Empty Previous Set of Buttons
        $("#btnSpace").empty();

        //Loop Through the Topics Array and Make Button for Each, With Class Needed to Style Them and Attributes to Display Search Results
        for(var j=0;j<topics.length;j++){
            $("#btnSpace").append("<button class='btn btn-outline-success topic' data-name='"+topics[j]+"'>"+topics[j]+"</button>")
        }
    }

    //Function to Be Executed to Add New Topic When New Search Topic is Entered
    $("#submitBtn").on("click",function(event){
        //Prevent Default Submit Actions
        event.preventDefault();

        //Get Search Box Input
        var topic=$("#searchArea").val().trim();

        //Push Topic Into Array
        topics.push(topic);

        //Empty Search Area
        $("#searchArea").val(" ");

        //Now Render Buttons With New Topic Added
        renderButtons();
    });

    //Function That Displays Results of a Topic Button Being Pressed
    function displayInfo(){
        var searchTopic=$(this).attr("data-name");  //Get the Topic Name from Attribute of the Button That Was Pressed
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchTopic+"&api_key=O6c62WLupbvgnteYTTNioADJEjhtLh9j&limit=10";  //Make URL for GIF's Search

        //Empty Image Space DIV for Images Not to Stack
        $("#imageSpace").empty();

        //Ajax Call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            //Get Array of Images That Come Back
            var results=response.data;

            // Looping Over Every Index in the Response Array
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a DIV for the GIF and Rating
              var gifDiv = $("<div>");

              // Storing the Result Item's Rating
              var rating = results[i].rating;

              // Creating a Paragraph Tag With the Result Item's Rating
              var p = $("<p>").text("Rating: " + rating);

              // Appending the Paragraph Created to the "gifDiv" DIV Created Along With Image w/ Attributes Needed to Later Play and Pause GIF
              gifDiv.append(p);
              gifDiv.append("<img src='"+results[i].images.fixed_height_still.url+"' data-still='"+results[i].images.fixed_height_still.url+"' data-animate='"+results[i].images.fixed_height.url+"' data-state='still' class='topicImg'><hr>");


              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#imageSpace").prepend(gifDiv);
            }
          }


        });
    }

    function changeState(){
        var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    }

    //For Dynamically Created Elements
    $(document).on("click", ".topic", displayInfo);     //If Topic Button is Pressed Then Display That Topic's Search Results
    $(document).on("click", ".topicImg", changeState);  //If an Image is Clicked on Play/Pause GIF

    //Display Default Buttons
    renderButtons();
});
