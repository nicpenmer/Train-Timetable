
//TODO/FINISH:
//info is being added to the database, and to the html with input values..
//database info is not being shown on the html in the table though....
//Also, Need to make moment work with real time. 

console.log("its alive!");

// Initialize Firebase

var config = {
    apiKey: "AIzaSyBW-AwT3dDpja9zbSPYdrFNHHgX9mzYA8M",
    authDomain: "traintimetable-61959.firebaseapp.com",
    databaseURL: "https://traintimetable-61959.firebaseio.com",
    projectId: "traintimetable-61959",
    storageBucket: "traintimetable-61959.appspot.com",
    messagingSenderId: "129560533674"
};
firebase.initializeApp(config);

//variable for database
var database = firebase.database();

///todo:
//set variables for each inpiut info bit
//
var name = "";
var frequency = "";
var destination = "";
var nextArrival = "";
var minutesAway = "";
var firstTrain = "";
//create rows for each input item
var createRow = function (userObject) {
    var tBody = $("tbody");
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // create and save a reference to a td in the same statement we update its text
    var nameRow = $("<td>").text(userObject.name);
    var destinationRow = $("<td>").text(userObject.destination);
    var frequencyRow = $("<td>").text(userObject.frequency);
    var nextArrRow = $("<td>").text(userObject.nextArr);
    var minAwayRow = $("<td>").text(userObject.minutesAway);
    // Append the newly created table data to the table row
    tRow.append(nameRow, destinationRow, frequencyRow, nextArrRow, minAwayRow);
    // Append the table row to the table body
    tBody.append(tRow);
}

$("#update").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text boxes
    name = $("#trainName").val().trim();
    destination = $("#headingT").val().trim();
    firstTrain = $("#firstT").val().trim();
    frequency = $("#howOften").val().trim();

    //change these to times. make sure they are in number

    var userObject = {
        "name": name,
        "destination": destination,
        "first": firstTrain,
        "frequency": frequency,

    }

    // Code for handling the push
    database.ref("userObject").push(userObject);
    createRow(userObject);
    console.log(name, destination, firstTrain, frequency);

    var row = $("<td>")
})

//database.ref().orderByChild("dateAdded").limitToLast(13).on("child_added", function(snapshot) {

// Firebase watcher + initial loader HINT: .on("value")

////////

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trName = $("#trainName-input").val().trim();
    var trDestination = $("#headingT-input").val().trim();
    var trStart = moment($("#firstT-input").val().trim(), "HH:MM").format("X");
    var trFreq = $("#howOften-input").val().trim();
    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trName,
        destination: trDestination,
        start: trStart,
        frequency: trFreq
    };
    // Uploads employee data to the database
    database.ref().push(newTrain);
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    // Alert
    alert("Trains successfully added to schedule");
    // Clears all of the text-boxes
    $("#trainName-input").val("");
    $("#headingT-input").val("");
    $("#firstT-input").val("");
    $("#howOften-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().role;
    var trStart = childSnapshot.val().start;
    var trFreq = childSnapshot.val().rate;
    // Train Info
    console.log(trName);
    console.log(trDestination);
    console.log(trStart);
    console.log(trFreq);
    // Prettify the train ttime based on start
    var trStartPretty = moment.unix(trStart).format("HH:mm");


    // Calculate the train times using Math


    var nextArrival = "";
    var minutesAway = "";
    var tFrequency = trFreq;
    // Time is 3:30 AM
    var firstTime = trStart;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    diffTime = parseInt("minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    tMinutesTillTrain = parseInt(tMinutesTillTrain);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


//add current time to jumbottron for reality effect
    $("#currentTime").text(currentTime);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" +
        trStartPretty + "</td><td>" + trStart + "</td><td>" + trFreq + "</td></tr>");
});