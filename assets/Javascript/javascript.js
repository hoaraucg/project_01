$(document).ready(function () {

    $('.parallax').parallax();
    $('.carousel').carousel();
    //Rotating text on header
    var animationDelay = 2500;

    animateHeadline($('.cd-headline'));

    function animateHeadline($headlines) {
        $headlines.each(function () {
            var headline = $(this);
            //trigger animation
            setTimeout(function () { hideWord(headline.find('.is-visible')) }, animationDelay);
            //other checks here ...
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
        setTimeout(function () { hideWord(nextWord) }, animationDelay);
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }
    // init carousel
    $('.carousel').carousel()

// When users click "submit"
$("#start-button").on("click", function(event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();
 
    // Grab the user input
    var zipcodesave = $("#user-input").val().trim();
 
    // Clear absolutely everything stored in localStorage using localStorage.clear()
    localStorage.clear();
 
    // Store the zip into localStorage using "localStorage.setItem"
    localStorage.setItem("zip code", zipcodesave);
 
  });

  //toast notification on save of zip code
  $("#start-button").one("click", function(){
      M.toast({html: 'Your zip code has been saved!'})
  }) 
  // By default (upon load) show the zip stored in localStorage using "localStorage.getItem"
  $("#user-input").val(localStorage.getItem("zip code"));

  // By default (upon load) show the name stored in localStorage using "localStorage.getItem"
  $("#greeting").text(localStorage.getItem("name"));



    // Reddit Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#reddit-button").on("click", function () {
        $(".row-append").empty();
        $("#waterbottleconsumptionhtml").empty();


        // Ajax Function searching Reddit API for Trashtag, Sorted by newest, Limited to 20 Returns
        $.ajax({
            url: "https://www.reddit.com/search.json?q=trashtag&sort=new&limit=10",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (redditResponse) {
                console.log(redditResponse);

                // For loop to cycle through results
                for (var i = 0; i < 6; i++) {

                    // Variables to be pulled and appended to the page
                    let redditTitle = redditResponse.data.children[i].data.title;
                    let redditImage = redditResponse.data.children[i].data.url;
                    let redditLink = redditResponse.data.children[i].data.permalink;
                    console.log(redditTitle);
                    console.log(redditImage);
                    console.log(redditLink);

                    var redditAppend = $('<div class="card horizontal blue-grey darken-1"><div class="card-image"><img src="'
                    + redditImage +
                    '" style="width:400px" style="height:300px"></div><div class="card-stacked"><div class="card-content white-text"><p>'
                    + redditTitle +
                    '</p></div><div class="card-action"><a href="'
                    + redditLink + 
                    '">Original Post</a></div></div></div></div>');

                    // Appending to the Div
                    $(".row-append").append(redditAppend);
                };
            });
    });

    // EventBrite Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#eb-button").on("click", function () {
        $(".row-append").empty();
        $("#waterbottleconsumptionhtml").empty();

        // Ajax Function searching Eventbrite, filtered by Subcategories including Community and Environment, Zip Code used to return results sorted by closest to farthest from the user's Input
        $.ajax({
            url: "https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.within=100mi&location.address=" + localStorage.getItem("zip code") + "&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (ebResponse) {
                console.log(ebResponse);

                // For loop to cycle through the Results
                for (var i = 0; i < 6; i++) {

                    // Variables to be pulled and appended to the page
                    let ebTitle = ebResponse.events[i].name.text;
                    let ebSnippet = ebResponse.events[i].summary;
                    let ebLink = ebResponse.events[i].url;

                    console.log(ebTitle);
                    console.log(ebSnippet);
                    console.log(ebLink);

                    // Creating Link Tag
                    var ebAppend = $('<div class="card blue-grey darken-1" id="card-box"><div class="card-content white-text"><span class="card-title">'
                    + ebTitle + 
                    '"</span><p>"'
                    + ebSnippet +
                    '"</p></div><div class="card-action"><a href="#">"'
                    + ebLink +
                    '"</a></div></div>"');



                    // Appending to the Div
                    $(".row-append").append(ebAppend);

                };
            });
    });

    // OpenWeather On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    // TODO: Include this API Pull with the Eventbrite button event? Pull weather info for the date of the event, in the zip code user provides?
    $("#start-button").on("click", function () {
        $(".row-append").empty();
        $("#waterbottleconsumptionhtml").empty();

        // Ajax Function searching Openweather for the current forecast in the zip code of the users input
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("zip code") + "&appid=37f408cc8e84667b979fff6911c58aa0",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (weatherResponse) {
                console.log(weatherResponse);

                // Variables to be pulled and appended to the page
                let owTemp = (weatherResponse.main.temp - 273.15) * (9 / 5) + 32;
                let owForecast = weatherResponse.weather.main;
                let owRain = weatherResponse.clouds.all;

                console.log(owTemp);
                console.log(owForecast);
                console.log(owRain);
            });
    });

    // NY Times On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#nyt-button").on("click", function () {
        $(".row-append").empty();
        $("#waterbottleconsumptionhtml").empty();

        $.ajax({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=nature&sort=newest&api-key=kfv7BnPMd5mvBPeGSaKGQdhyRAGGhhWG",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (nytResponse) {
                console.log(nytResponse);

                // For loop to cycle through the results
                for (var i = 0; i < 11; i++) {

                    // Variables to be pulled and appended to the page
                    let nytSnippet = nytResponse.response.docs[i].headline.main;
                    let nytLead = nytResponse.response.docs[i].lead_paragraph;
                    let nytURL = nytResponse.response.docs[i].web_url;

                    console.log(nytSnippet);
                    console.log(nytLead);
                    console.log(nytURL);

                    // Creating Link Tag
                    var nytLink = $('<div class="card blue-grey darken-1" id="card-box"><div class="card-content white-text"><span class="card-title">'
                    + nytSnippet + 
                    '"</span><p>"'
                    + nytLead +
                    '"</p></div><div class="card-action"><a href="#">"'
                    + nytURL +
                    '"</a></div></div>"');



                    // Appending to the Div
                    $(".row-append").append(nytLink);

                }
            });

    });
    $("#waterbottleconsumptionhtml").hide();
    $("#timesrefilled").hide();
    $("#calculatebutton").hide();
    $("#results").hide();
    $("#year").hide();
    $("#refresh").hide();

    $("#consumption-button").on("click", function () {
        $(".row-append").empty();

        $("#waterbottleconsumptionhtml").show();
        //global variables
        //assuming standard plastic water bottle is 12oz size
        var standardBottle = 12;
        var userInput;
        var consumed;
        var numberBottles;
        var plasticSaved;

        //hide times refilled until clicked


        //calculating the number of plastic bottles saved by taking the size of the reusable bottle selected, multiplied by the number of times refilled - then dividing that number by 12oz adn rounding it up to give you the number of plastic bottles saved
        $(".reusebottle").one("click", function () {
            let ounces = parseInt($(this).attr("data"));
            //on click animate the image
            $(this).animate({
                left: '250px',
                height: '+=150px',
                width: '+=150px'
            });
            //on click hide other images
            $(this).siblings("img").hide();
            //on click show input for times refilled
            $("#refresh").show();
            $("#timesrefilled").show();
            $("#calculatebutton").show();
            $("#calculatebutton").one("click", function () {
                //console log the reusable bottle size selected
                console.log("reusable bottle size in oz: ", ounces);
                userInput = $("#amountDrank").val();
                consumed = ounces * userInput;
                //console log total ounces consumed in reusable bottle
                console.log("total ounces consumed:", consumed);
                numberBottles = consumed / standardBottle;
                //console log unrounded 12 oz bottles saved
                console.log("unrounded number of 12oz plastic bottles: ", numberBottles);
                plasticSaved = Math.ceil(numberBottles);
                //console log rounded up number of plastic bottles saved
                console.log("number of plastic water bottles to display: " + plasticSaved);
                $("#calculatebutton").hide();
                $("#results").show();
                $("#results").append("You have saved " + plasticSaved + " plastic bottles today");
                for (i = 0; i < plasticSaved; i++) {
                    $("#results").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
                }
                $("#year").show();
            });
            $("#yearcalc").on("click", function () {
                $("#yearcalc").hide();
                let yearSaved = plasticSaved * 365;
                console.log(yearSaved);
                $("#year").append("At this rate you will save " + yearSaved + " bottles in a year")
                for (i = 0; i < yearSaved; i++) {
                    $("#year").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
                }

            })

            $("#refresh").click(function () {
                location.reload();
                })
        });

    });



});

// Earth911 API
$("#earth-button").on("click", function () {
    console.log("button clicked");

    $(".row-append").empty();
    $("#waterbottleconsumptionhtml").empty();

    $.ajax({
        url: "https:cors.io?https://api.earth911.com/earth911.getPostalData?api_key=27a4dfaff4691499&postal_code=" + localStorage.getItem("zip code") + "&country=us",
        method: "GET",
        headers: {  'Access-Control-Allow-Origin': '*' }, 
    }).then(function (earthResponse) {
            var data = JSON.parse(earthResponse);
            console.log("data" + data);
            let earthLat = data.result.latitude;
            let earthLong = data.result.longitude;
            console.log("lat" + earthLat);
            console.log("long" + earthLong);

            $.ajax({
                url: "https:cors.io?https://api.earth911.com/earth911.searchLocations?api_key=27a4dfaff4691499&latitude=" + earthLat + "&longitude=" + earthLong + "&max_results=5",
                method: "GET",
                headers: {  'Access-Control-Allow-Origin': '*' },
            }).then(function (earthResponse2){
                var data2 = JSON.parse(earthResponse2);
                // For loop to cycle through the results
                for (var i = 0; i < 11; i++) {

                    console.log(data2);
                    // Variables to be pulled and appended to the page
                    let earthName = data2.result[i].description;
                    let earthType = data2.result[i].location_type_id;
                    let earthDistance = data2.result[i].distance;


                    console.log(earthName);
                    console.log(earthType);

                    var earthAppend = $('<div class="card blue-grey darken-1" id="card-box"><div class="card-content white-text"><span class="card-title">'
                    + earthName + 
                    '</span><p>'
                    + earthName +
                    '</p></div><div class="card-action"><p style="color:white">Distance to this Location: '
                    + earthDistance +
                    '</p></div></div>"');



                    // Appending to the Div
                    $(".row-append").append(earthAppend);
                

                }
            });
    });
});