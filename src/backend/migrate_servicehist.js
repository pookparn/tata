const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const currentWeekNumber = require('current-week-number');
var mgs_mod = require('./mongoose_module.js');
var ObjectID = require('mongodb').ObjectID
var async = require("async");
var moment = require('moment');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
//const sheet_cfg = require("./config/sheet_config.json")

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

let formatDate = (strDate, dili) => {
    var arrDay = strDate.split(dili)
    console.log(arrDay)
    if (arrDay[0].length != 2) {
        arrDay[0] = "0" + arrDay[0]
    }
    if (arrDay[1].length != 2) {
        arrDay[1] = "0" + arrDay[1]
    }
    console.log(arrDay)
    var dayFormat = arrDay[0] + "/" + arrDay[1] + "/" + arrDay[2]
    return dayFormat
}

function listMultifunction(auth, callback) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1nHj0dHyCUKTL3Rsxrtzhydgyk9hkqR6087D_w1EKMVU',
        range: 'ประวัติการเข้ารับบริการ!A2:Q431',
    }, (err, res) => {
        if (err) {
            //console.log('The API returned an error: ' + err)
            callback('The API returned an error: ' + err)
            return
        }
        const rows = res.data.values;
        var result = []
        var arrData = []
        var tasks = []
        if (rows) {
            if (rows.length > 0) {
                rows.map((oneRow) => {
                    tasks.push((callback) => {
                        var tmpData = {
                            "_id": new ObjectID(),
                            "seq_id": oneRow[0],
                            "car_id": null,
                            "owner_id": null,
                            "service_entry_km": oneRow[3] ? oneRow[3].replace(',','') : 0,
                            "service_out_km": oneRow[4] ? oneRow[4].replace(',','') : 0,
                            "service_type": oneRow[5],
                            "service_fix_no": oneRow[6],
                            "cust_inform_problem": oneRow[7],
                            "service_fix_desc": oneRow[8],
                            "mechanic": oneRow[9],
                            "entry_dt":null,// oneRow[10],
                            "out_dt": null,//oneRow[11],
                            "alert_lv": oneRow[12],
                            "alert_desc": oneRow[13],
                            "alert_status": oneRow[14],
                            "create_dt": null,//oneRow[10],
                            "update_dt": null,
                            "update_by": "",
                            "remark": oneRow[15] ? oneRow[15] :""

                        }

                        console.log(oneRow)
                        if (oneRow[10]) {
                            console.log("DATE", oneRow[10])
                            var dayFormat = formatDate(oneRow[10], "/")
                            tmpData.create_dt = moment(dayFormat, 'DD/MM/YYYY', true).format()
                            console.log(tmpData)
                        }
                        if (oneRow[11]) {
                            console.log("DATE", oneRow[11])
                            var dayFormat = formatDate(oneRow[11], "/")
                            tmpData.out_dt = moment(dayFormat, 'DD/MM/YYYY', true).format()
                            console.log(tmpData)
                        }

                        //callback()
                        mgs_mod.car.findOne({ "license_plate": oneRow[1] })
                            .populate("owner_id")
                            .lean()
                            .exec(function (err, carData) {
                                if (err || !carData) {
                                    console.log(">>>>>",err)
                                } else {
                                    console.log(carData)
                                    tmpData.car_id = carData._id
                                    if(carData.owner_id){
                                        tmpData.owner_id = carData.owner_id._id
                                    }else{
                                        console.log(oneRow[0],"NOT FOUND OWNER")
                                        return callback()
                                    }
                                    var newservicehist = new mgs_mod.servicehist(tmpData)
                                    newservicehist.save(function (err, res) {
                                        console.log(oneRow[0], "err", err)
                                        console.log(oneRow[0], "res", res)
                                        callback()
                                    })
                                    //callback()
                                }

                            })

                    })

                })

            }
        }
        if (tasks.length > 0) {
            async.waterfall(tasks, function (err, result) {
                console.log("RESULT ", result)
                callback(result)
            });

        } else {
            callback(result)
        }

    });
}

module.exports = function () {

    function rdMultifunction() {
        return function (callback, errback) {
            // Load client secrets from a local file.
            fs.readFile('./config/credentials.json', (err, content) => {
                if (err) {
                    callbak("error")
                    return console.log('Error loading client secret file:', err);
                }
                authorize(JSON.parse(content), function (auth) {
                    listMultifunction(auth, function (resp) {
                        callback(resp)
                    })
                })
            });
        }
    };

    return { rdMultifunction: rdMultifunction }
};


fs.readFile('./credentials.json', (err, content) => {
    if (err) {
        //callbak("error")
        return console.log('Error loading client secret file:', err);
    }
    authorize(JSON.parse(content), function (auth) {
        listMultifunction(auth, function (resp) {
            //callback(resp)
        })
    })
});
