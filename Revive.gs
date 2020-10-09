//useful functions I used in the code.

//To see how long the user was offline for at the time of revive. It converts the timestamp differences to Human readable
function getLastAction(a, b) {
  var diff = a - b;
  if (diff > 86400) {
    var day = Math.floor(diff/86400);
    if (diff > 172800) {
      var time = String(day) + " days away";
    } else {
      var time = "1 day away";
    }
  } else {
    if (diff > 3600) {
      var hour = Math.floor(diff/3600);
      if (hour > 1) {
        var time = String(hour) +" hours away";
      } else {
        var time = "1 hour away";
      }
    } else {
      if (diff > 60) {
        var minute = Math.floor(diff/60);
        if (minute > 1) {
          var time = String(minute) +" minutes away";
        } else {
          var time = "1 minute away";
        }
      } else {
        if (diff > 1) {
          var time = String(diff) + " seconds away";
        } else {
          var time = "1 second away";
        }
      }
    }
  }
  return time;
}

//Converting Unix to Readable
function getTime(stamp) {
  return Utilities.formatDate(new Date(stamp*1000), "GMT", "dd MMMM yyyy  hh:mm:ss a");
}

//Function to see if the either the reviver or the patient is Factionless or their faction has a special character in the name
function checkFaultyString(args) {
  if (typeof args == "undefined" || args === null || args == "") {
    var args = "N/A";
  } else if (args.includes(";")) {
    var decode = XmlService.parse('<d>' + args + '</d>');
    var args = decode.getRootElement().getText();
  }

  return args;
}


//Main stuff
var ss = SpreadsheetApp.getActiveSpreadsheet();
var prefSheet = ss.getSheetByName("Key");
var logSheet1 = ss.getSheetByName("Revives Given");
var logSheet2 = ss.getSheetByName("Revives Received");
var filterSheet = ss.getSheetByName("Search");
var apiKey = prefSheet.getRange("B1").getValue();
var hiddenSheet = ss.getSheetByName("Filter");


function myFunction() {
  var url = "https://api.torn.com/user/?selections=revives,profile&key="+apiKey;
  try {
    var data = JSON.parse(UrlFetchApp.fetch(url));
    if (data["error"]) {
      prefSheet.getRange("B3").setValue(data["error"]["error"]);
      return;
    } else if (data["revives"]) {
      var last_entry = hiddenSheet.getRange("D1").getValue();
      var user_id = data["player_id"];
      var given_array = [];
      var received_array = [];
      var timestampArray = [];

      for (k in data["revives"]) {

        var revive = data["revives"][k];
        timestampArray.push(revive["timestamp"]);
        if (revive["timestamp"] > last_entry && revive["reviver_id"] == user_id) {
          given_array.push([revive["timestamp"], getTime(revive["timestamp"]), revive["reviver_name"], revive["reviver_id"], checkFaultyString (revive["reviver_factionname"]), revive["reviver_faction"], revive["target_name"], revive["target_id"], revive["target_faction"], checkFaultyString (revive["target_factionname"]), revive["target_hospital_reason"].replace(/<[^>]+>/g, ""), revive["target_last_action"]["timestamp"], getLastAction(revive["timestamp"], revive["target_last_action"]["timestamp"]), revive["target_last_action"]["status"]]);


        } else if (revive["timestamp"] > last_entry && revive["reviver_id"] != user_id) {
          received_array.push([revive["timestamp"], getTime(revive["timestamp"]), revive["reviver_name"], revive["reviver_id"], checkFaultyString (revive["reviver_factionname"]), revive["reviver_faction"], revive["target_name"], revive["target_id"], revive["target_faction"], checkFaultyString (revive["target_factionname"]), revive["target_hospital_reason"].replace(/<[^>]+>/g, ""), revive["target_last_action"]["timestamp"], getLastAction(revive["timestamp"], revive["target_last_action"]["timestamp"]), revive["target_last_action"]["status"]]);
        }
      }

      var noOfRevivesGiven = given_array.length;
      var noOfRevivesReceived = received_array.length;
      if (noOfRevivesGiven > 0) {
        logSheet1.insertRowsAfter(1, noOfRevivesGiven);
        logSheet1.getRange(2, 1, noOfRevivesGiven, 14).setValues(given_array);
        logSheet1.sort(1, false);
      }

      if (noOfRevivesReceived > 0) {
        logSheet2.insertRowsAfter(1, noOfRevivesReceived);
        logSheet2.getRange(2, 1, noOfRevivesReceived, 14).setValues(received_array);
        logSheet2.sort(1, false)
      }
      if (timestampArray.length > 0) {
        var last_array = timestampArray.sort(function(a, b) {
          return a - b;
        });
        var timestamp = last_array[last_array.length - 1];
        hiddenSheet.getRange("D1").setValue(timestamp);
        prefSheet.getRange("B2").setValue(getTime(new Date().getTime()/1000));
        prefSheet.getRange("B3").setValue("Successfully Updated");
      }
    }
    var noOfRows = filterSheet.getMaxRows();
    var noOfRows = filterSheet.getMaxRows();
    if (noOfRows > 100) {
      filterSheet.deleteRows(101, noOfRows-100);
    }
  }
  catch(error) {
    prefSheet.getRange("B3").setValue(error.message);
  }
}

function firstRun() {
  var value = prefSheet.getRange("B3").getValue().split(" ");
  var int = parseInt(value[0]);
  var hM = value[1];
  if (hM == "minutes") {
    ScriptApp.newTrigger('myFunction')
    .timeBased()
    .everyMinutes(int)
    .create();
    prefSheet.deleteRow(3);

  } else if (hM == "hour" || hM == "hours") {
    ScriptApp.newTrigger('myFunction')
    .timeBased()
    .everyHours(int)
    .create();
    prefSheet.deleteRow(3);
  } else if (hM == "day") {
    ScriptApp.newTrigger("myFunction")
    .timeBased()
    .atHour(5)
    .everyDays(1)
    .create();
    prefSheet.deleteRow(3);
  }

  myFunction();
}

function onOpen(e) {
  var menu = SpreadsheetApp.getUi().createMenu('Run Manually')
  menu.addItem('Update Sheet', 'myFunction').addToUi();
}
