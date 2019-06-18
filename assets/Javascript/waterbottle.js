//global variables
//assuming standard plastic water bottle is 12oz size
var standardBottle = 12;
var userInput;
var consumed;
var numberBottles;
var plasticSaved;


//calculating the number of plastic bottles saved by taking the size of the reusable bottle selected, multiplied by the number of times refilled - then dividing that number by 12oz adn rounding it up to give you the number of plastic bottles saved
    $("button").click(function(){
       let ounces =  parseInt($(this).attr("data"));
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
    });
    