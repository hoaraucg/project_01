
    // ========================================== START CODING BELOW!!

    // Initialize Firebase
        
    
  var firebaseConfig = {
    apiKey: "AIzaSyD1VFxsCo-vlZPgJZHc92Nh_Sg9bJKoC0M",
    authDomain: "environment-evergreen.firebaseapp.com",
    databaseURL: "https://environment-evergreen.firebaseio.com",
    projectId: "environment-evergreen",
    storageBucket: "environment-evergreen.appspot.com",
    messagingSenderId: "442420574196",
    appId: "1:442420574196:web:ad7ae46cda713421"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var volunteerFirstName = "";
var volunteerLastName = "";
var volunteerAge= 0;
var volunteerPhone = "";
var volunteerEmail = "";
var volunteerConcerns = "";
var volunteerPassword = "";




// Capture Button Click
$("#add-volunteer-btn").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  volunteerFirstName = $("#volunteer-first-name-input").val().trim();
  volunteerLastName = $("#volunteer-last-name-input").val().trim();
  volunteerZipCode = $("#volunteer-zipcode-input").val().trim();
  volunteerPhone = $("#volunteer-phone-input").val().trim();
  volunteerEmail = $("#volunteer-email-input").val().trim();
  volunteerConcerns = $("#volunteer-textare1-input").val().trim();
  volunteerPassword = $("#volunteer-password-input").val().trim();

 // Creates local "temporary" object for holding train data
 var newTrain = {
    
    firstName : trainName,
    lastName: destinationTrain,
    zipcode: firstTrainHour,
    phone : frecuencyTrain,
    email: firebase.database.ServerValue.TIMESTAMP,
    concerns : frecuencyTrain,
    password: firebase.database.ServerValue.TIMESTAMP,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frecuency);
  console.log(newTrain.dateAdded);

  alert("train successfully added");

  // Clears all of the text-boxes
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("first-train-hour-input").val("");
  $("#frecuency-input").val(0);
});

  

// 3. Create Firebase event for adding Trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartHour = childSnapshot.val().firstTrain;
  var trainFrecuency = childSnapshot.val().frecuency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartHour);
  console.log(trainFrecuency);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainStartHour, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrecuency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrecuency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var nextTrainDisplay = moment(nextTrain).format("hh:mm");

  //   // Prettify the employee start

//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStartHour),
    $("<td>").text(trainFrecuency),
    $("<td>").text(nextTrainDisplay),
    $("<td>").text(tMinutesTillTrain)
    
  );

  // Append the new row to the table
  $("tbody").append(newRow);
});



// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is today 6/14/2019


// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

     
     
     
     
     
     
     
     
     
     
     
     
     
    
   
    {/* // Firebase watcher .on("child_added")
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.starthour);
      console.log(sv.frecuency);
      console.log(sv.dateAdded);

      // Change the HTML to reflect
      $("#train-name-display").text(sv.traiName);
      $("#destination-display").text(sv.destination);
      $("#first-train-display").text(sv.first-train);
      $("#frecuency-train-display").text(frecuency-train);
      $("#dateAdded-train-display").text(dateAdded-train);
    )};

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    



 */}



  