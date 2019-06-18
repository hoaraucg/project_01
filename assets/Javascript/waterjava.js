//global variables
//assuming standard plastic water bottle is 12oz size
var standardBottle = 12;
var userInput;
var consumed;
var numberBottles;
var plasticSaved;

//hide times refilled until clicked
$("#timesrefilled").hide();
$("#calculatebutton").hide();
$("#results").hide();
$("#year").hide();
$("#refresh").hide();

//calculating the number of plastic bottles saved by taking the size of the reusable bottle selected, multiplied by the number of times refilled - then dividing that number by 12oz adn rounding it up to give you the number of plastic bottles saved
    $("img").one("click", function(){
        let ounces =  parseInt($(this).attr("data"));
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
       $("#calculatebutton").on("click", function(){
        //console log the reusable bottle size selected
       console.log("reusable bottle size in oz: ", ounces);
       userInput=$("#amountDrank").val();
        consumed = ounces*userInput;
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
        for (i=0; i<plasticSaved; i++){
            $("#results").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
        }
        $("#year").show();
    });
    $("#yearcalc").on("click", function(){
        $("#yearcalc").hide();
        let yearSaved = plasticSaved*365; 
        console.log(yearSaved);
        $("#year").append("At this rate you will save "+ yearSaved + " bottles in a year")
        for (i=0; i<yearSaved; i++){
            $("#year").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
        }

    })

    $("#refresh").click(function(){
        location.reload();
    })
});

    
