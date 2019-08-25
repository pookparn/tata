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
        range: 'ข้อมูลรถ!A2:M274',
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
                console.log(rows[224])
                rows.map((oneRow) => {
                    tasks.push((callback) => {
                        var tmpData = {
                            "_id": new ObjectID(),
                            "owner_id": null,
                            "seq_id": oneRow[0],
                            "model": oneRow[2],
                            "license_plate": oneRow[3],
                            "province": oneRow[4],
                            "color": oneRow[5],
                            "vin": oneRow[6],
                            "engine_no": oneRow[7],
                            "sale_dt": "",
                            "roof": oneRow[9],
                            "finance_year": oneRow[10],
                            "finance_down": oneRow[11],
                            "create_dt": "",

                        }

                        console.log(oneRow)
                        if (oneRow[8]) {
                            console.log("DATE", oneRow[8])
                            var dayFormat = formatDate(oneRow[8], "/")
                            tmpData.sale_dt = moment(dayFormat, 'DD/MM/YYYY', true).format()
                            console.log(tmpData)
                        }
                        if (oneRow[12]) {
                            console.log("DATE", oneRow[12])
                            var dayFormat = formatDate(oneRow[12], "/")
                            tmpData.create_dt = moment(dayFormat, 'DD/MM/YYYY', true).format()
                            console.log(tmpData)
                        }

                        //callback()
                        mgs_mod.owner.findOne({ "business_name": oneRow[1] })
                            .lean()
                            .exec(function (err, ownerData) {
                                if (err || !ownerData) {
                                    console.log(">>>>>",err)
                                } else {
                                    console.log(ownerData)
                                    tmpData.owner_id = ownerData._id
                                    var newCar = new mgs_mod.car(tmpData)
                                    newCar.save(function (err, res) {
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
