$(document).ready(function () {

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

    // Reddit Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#reddit-button").on("click", function () {

        // Ajax Function searching Reddit API for Trashtag, Sorted by newest, Limited to 20 Returns
        $.ajax({
            url: "https://www.reddit.com/search.json?q=trashtag&sort=new&limit=20",
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

                    // Creating Img Tag
                    var redImg = $("<img src='" + redditImage + "' style='height:350px' style='width:400px'/>");

                    var redTitle = $("<h4>" + redditTitle + "</h4>");

                    // Creating Link Tag
                    var redLink = $("<a href='https://www.reddit.com" + redditLink + "'>" + "Click here for the original post." + "</a>");

                    // Appending to the Div
                    $("#content-div").html(redImg);
                    $("#content-div").html(redTitle);
                    $("#content-div").html(redLink);
                    console.log(redImg);

                };
            });
    });

    // EventBrite Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#eb-button").on("click", function () {
        var ebZip = $("#user-input").val();

        // Ajax Function searching Eventbrite, filtered by Subcategories including Community and Environment, Zip Code used to return results sorted by closest to farthest from the user's Input
        $.ajax({
            url: "https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.address=" + ebZip + "&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ",
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
                    var ebUrl = $("<a href='" + ebLink + "'>Follow me to the Original Event page.</a>");

                    var ebHead = $("<h3>" + ebTitle + "</h3>");

                    var ebSummary = $("<h5>" + ebSnippet + "</h3>");

                    // Appending to the Div
                    $("#content-div").append(ebHead);
                    $("#content-div").append(ebSummary);
                    $("#content-div").append(ebUrl);
                };
            });
    });

    // OpenWeather On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    // TODO: Include this API Pull with the Eventbrite button event? Pull weather info for the date of the event, in the zip code user provides?
    $("#start-button").on("click", function () {
        var weatherZip = $("#user-input").val();

        // Ajax Function searching Openweather for the current forecast in the zip code of the users input
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + weatherZip + "&appid=37f408cc8e84667b979fff6911c58aa0",
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
                    let nytLink = $("<a>");
                    nytLink.attr("href", nytURL);

                    // Appending to the Div
                    $("#content-div").append(nytSnippet);
                    $("#content-div").append(nytLead);
                    $("#content-div").append(nytLink);

                }
            });

    });
    $("#waterbottleconsumptionhtml").hide();
    $("#timesrefilled").hide();
    $("#calculatebutton").hide();
    $("#results").hide();
    $("#year").hide();
    $("#refresh").hide();

    $("#reuse-button").on("click", function () {

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
            $("#calculatebutton").on("click", function () {
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
$("#e911-button").on("click", function () {
    var earthZip = $("#user-input").val();

    $.ajax({
        url: "https://api.earth911.com/earth911.getPostalData?api_key=27a4dfaff4691499&postal_code=" + earthZip + "&country=us",
        method: "GET"
    })
        // Function Runs after receiving response
        .then(function (earthResponse) {
            console.log(earthResponse);
            let earthLat = earthResponse.result.latitude
            let earthLong = earthResponse.result.longitude

            $.ajax({
                url: "https://api.earth911.com/earth911.searchLocations?api_key=27a4dfaff4691499&latitude=" + earthLat + "&longitude=" + earthLong + "&max_results=20",
                method: "GET"
            })

            // For loop to cycle through the results
            for (var i = 0; i < 11; i++) {

                // Variables to be pulled and appended to the page
                let earthName = earthResponse.result[i].description;
                let earthType = earthResponse.result[i].location_type_id;


                console.log(earthName);
                console.log(earthType);
                console.log(earth3);

                // Creating Link Tag
                let nytLink = $("<a>");
                nytLink.attr("href", nytURL);

                // Appending to the Div
                $("#content-div").append(earthName);
                $("#content-div").append(earthType);
                $("#content-div").append(earth3);

            }
        });

});