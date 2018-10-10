// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfioyMHe5imq_9xnYi9VH_ci4CGZrYfW0",
  authDomain: "aug2018-cohort.firebaseapp.com",
  databaseURL: "https://aug2018-cohort.firebaseio.com",
  projectId: "aug2018-cohort",
  storageBucket: "aug2018-cohort.appspot.com",
  messagingSenderId: "215052238676"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var firstTrainTime;
var firstTrainConverted;
var frequency;
var nextArrival;
var minutesAway;
var rowArray = [];


$(document).on("click", "#submit", function(event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(1, "year");
  firstTrainConverted = firstTrainTime.format("HH:mm");
  frequency = parseInt($("#frequency").val());
  var tDiff = parseInt(moment().diff(moment(firstTrainTime), "minutes"));
  //TO GET MINUTES AWAY
  minutesAway =frequency - (tDiff%frequency);
  nextArrival = moment().add(minutesAway,"m").format("HH:mm");
  console.log(tDiff);

  database.ref().push({
    trainName : trainName,
    destination : destination,
    frequency : frequency,
    nextArrival : nextArrival,
    minutesAway : minutesAway,
  });
});

database.ref().on("child_added", function(snap) {
  console.log(snap.val());
  var newTr = $("<tr>");
  var object=snap.val();
  // var object = snap.val
  // for (var x in snap.val()) {
  //   var newTd = $("<td>");
  //   newTd.append(snap.val()[x]);
  //   newTr.append(newTd);
  //   console.log(snap.val()[x]);
  // }
  // $(".tableBody").append(newTr);
  var trainTd = $("<td>");
  var destinationTd = $("<td>");
  var frequencyTd = $("<td>");
  var nextTd = $("<td>");
  var minutesAwayTd = $("<td>");

  trainTd.append(object.trainName);
  destinationTd.append(object.destination);
  frequencyTd.append(object.frequency);
  nextTd.append(object.nextArrival);
  minutesAwayTd.append(object.minutesAway);

  newTr.append(trainTd);
  newTr.append(destinationTd);
  newTr.append(frequencyTd);
  newTr.append(nextTd);
  newTr.append(minutesAwayTd);
  $(".tableBody").append(newTr);
});