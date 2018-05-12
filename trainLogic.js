var config = {
  apiKey: "AIzaSyCiqot5p1rhEKHEXOgave9qyTSaXySiNTs",
  databaseURL: "https://trainhomework-fef5d.firebaseio.com/"
};

firebase.initializeApp(config);

var database = firebase.database();

// add train
$("#add-train").on("click", function(event) {
  event.preventDefault();

  var destination = $("#dest-input").val().trim();
  //need HELP with this line here.
  var startTime = moment($("#start-input").val().trim()).format("LLL");
  var interval = $("#interval-input").val().trim();
 
  var newTrain = {
    dest: destination,
    start: startTime,
    interval: interval
  };

  database.ref().push(newTrain);

  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.interval);

  alert("Train added");
  $("#dest-input").val("");
  $("#start-input").val("");
  $("#interval-input").val("");
});

// update train list
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());


  var trainDest = childSnapshot.val().dest;
  var trainInterval = childSnapshot.val().interval;
  var trainStart = childSnapshot.val().start;

  // takes difference between current time and train start time in unix, modulus operator against converted interval, converts back to minutes, compared to interval time
  var nextTrain = trainInterval - ( (moment.unix().diff(moment.unix(trainStart)) % (trainInterval * 60 )) / 60 );

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainDest + "</td><td>" + nextTrain + "</td></tr>");
});