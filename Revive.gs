function myFunction() {

    var sh = SpreadsheetApp.getActiveSpreadsheet(); //Getting the spreadsheet which is active

    var ss = sh.getSheetByName("Log"); //get the worksheet inside the spreadsheet

    var sd = sh.getSheetByName("Key");

    ss.sort(1, false);

    var last_entry = ss.getRange("A2").getValue();

    var api = sd.getRange('B1').getValue(); // get value of API key

    var user_id_ = sd.getRange('B3');

    if (user_id_.isBlank()) {

        var call_url = 'https://api.torn.com/user/?selections=profile&key='+api;

        var profile = JSON.parse(UrlFetchApp.fetch(call_url));

        var player_id = profile["player_id"];

        user_id_.setValue(player_id);

    } else {

        var player_id = user_id_.getValue();

    }

  

    //API call

    var url = "https://api.torn.com/user/?selections=revives&key=" +  api;

    var content = UrlFetchApp.fetch(url);

    //Reading new data from API

    var apidata = JSON.parse(content);

    var place = {};

    place["revives"] = {};

    for (k in apidata["revives"]) {

        if (apidata["revives"][k]["timestamp"] > last_entry) {

            if (apidata["revives"][k]["reviver_id"] == player_id) {

                place["revives"][k] = apidata["revives"][k];

            }

        }

    }

    var log = JSON.stringify(place);

    var test = JSON.parse(log);

    

    //Converting Timestamp in revive data to readable time

    for (var i in test["revives"]) {

        test.revives[i]["time"] = Utilities.formatDate(new Date(test.revives[i]["timestamp"]*1000), "GMT", "dd MMMM yyyy  hh:mm:ss a") + "  TCT";

    }

    var final_a = JSON.stringify(test);

    var final = JSON.parse(final_a);

    var array = []; //creating an empty array to count total number of revives

    for (var m in final["revives"]) {

        array.push(m);

    }

    var elem = array.length;

    if (elem > 0) {

        ss.insertRowsBefore(2, elem);

        //Parsing JSON to write it in the spreadsheet

        var dataSet = final.revives;

        var rows = [];

        for (var i in dataSet) {

            var revives = dataSet[i];

            rows.push([revives.timestamp, revives.reviver_id, revives.reviver_name, revives.reviver_faction, revives.reviver_factionname, revives.target_id, revives.target_name, revives.target_faction, revives.target_factionname, revives.time]);

        }

        var datarange = ss.getRange(2, 1, elem, 10);

        datarange.setValues(rows) //writing data

        ss.sort(1, false);

    }

    var timestam = new Date().getTime();

    var uptime = Utilities.formatDate(new Date(timestam), "GMT", "dd MMMM yyyy  hh:mm:ss a") + "  TCT";

    var upcell = sd.getRange("B2").setValue(uptime);

}

//adding button to Spreadsheet

function onOpen(e) {

    var menu = SpreadsheetApp.getUi().createMenu('Run Manually')

    menu.addItem('Update Sheet', 'myFunction').addToUi();

}
