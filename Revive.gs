function myFunction() {

    var ss = SpreadsheetApp.getActiveSpreadsheet(); //Getting the spreadsheet which is active

    var sh = ss.getSheetByName("Log"); //get the worksheet inside the spreadsheet

    var sd = ss.getSheetByName("Key");

    sh.sort(1, false);

    var properties = PropertiesService.getUserProperties();

    var last_entry = sh.getRange("A2").getValue();

    var api = sd.getRange('B1').getValue(); // get value of API key

    var user_id = properties.getProperty('user_id');

    //Logger.log(user_id);

    if (!user_id) {

        var call_url = 'https://api.torn.com/user/?selections=profile&key='+api;

        var profile = JSON.parse(UrlFetchApp.fetch(call_url));

        var user_id = profile["player_id"];

        properties.setProperty('user_id', user_id);

    }

    //API call

    var url = "https://api.torn.com/user/?selections=revives&key=" +  api;

    var content = UrlFetchApp.fetch(url);

    //Reading new data from API

    var apidata = JSON.parse(content);

    var newDict = {};

    newDict["revives"] = {};

    for (k in apidata["revives"]) {

        if (apidata["revives"][k]["timestamp"] > last_entry) {

            if (apidata["revives"][k]["reviver_id"] == user_id) {

                newDict["revives"][k] = apidata["revives"][k];

            }

        }

    }

    var unique = JSON.parse(JSON.stringify(newDict));

    //Converting Timestamp in revive data to readable time

    for (var k in unique["revives"]) {

        unique.revives[k]["time"] = Utilities.formatDate(new Date(unique.revives[k]["timestamp"]*1000), "GMT", "dd MMMM yyyy  hh:mm:ss a");

    }

    var final = JSON.parse(JSON.stringify(unique));

    //Parsing JSON to write it in the spreadsheet

    var dataSet = final.revives;

    var rows = [];

    for (var i in dataSet) {

        var revives = dataSet[i];

        rows.push([revives.timestamp, revives.reviver_id, revives.reviver_name, revives.reviver_faction, revives.reviver_factionname, revives.target_id, revives.target_name, revives.target_faction, revives.target_factionname, revives.time]);

    }

    var length = rows.length;

    if (length > 0) {

        sh.insertRowsAfter(1, length);

        var datarange = sh.getRange(2, 1, length, 10);

        datarange.setValues(rows) //writing data

        sh.sort(1, false);

    }

    var timestam = new Date().getTime();

    var uptime = Utilities.formatDate(new Date(timestam), "GMT", "dd MMMM yyyy  hh:mm:ss a") + "  TCT";

    var upcell = sd.getRange("B2").setValue(uptime);

}

function onOpen(e) {

    var menu = SpreadsheetApp.getUi().createMenu('Run Manually')

    menu.addItem('Update Sheet', 'myFunction').addToUi();

}
