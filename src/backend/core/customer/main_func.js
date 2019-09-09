const dateformat = require('dateformat');
var async = require("async");

let carMaConf = {
        "SC-CNG": { "km": 5000, "month": 3 },
        "HD-CNG": { "km": 7500, "month": 3 },
        "Max CNG": { "km": 7500, "month": 3 },
        "X-Tend CLE": { "km": 5000, "month": 3 },
        "SC-DLE": { "km": 10000, "month": 6 },
        "140 HD-DLE": { "km": 15000, "month": 6 },
        "150NX-Pert HD 4x2": { "km": 20000, "month": 6 },
        "150NX-Pert 4x4": { "km": 20000, "month": 6 },
        "Max CAB": { "km": 15000, "month": 6 },
        "X-Tend DLS": { "km": 10000, "month": 6 },
        "Super ACE": { "km": 10000, "month": 6 },
        "Super ACE Mint": { "km": 10000, "month": 6 },
        "Double Cab DLE": { "km": 10000, "month": 6 },
        "Double Cab DLE 150NX-Treme 4x2": { "km": 20000, "month": 6 },
        "Double Cab DLE 150NX-Plore 4x4": { "km": 20000, "month": 6 }
}
module.exports = function () {
        function getCustlist(req) {
                return function (callback, errback) {
                        let mgs_mod = req.mgs_mod
                        let lastWeek = new Date();
                        lastWeek.setDate(lastWeek.getDate() - 7);
                        console.log("infunc")
                        let queryCon = {
                                
                        }

                        mgs_mod.owner.find(queryCon)
                                .lean()
                                .exec(function (err, ownerData) {
                                        if (err) {
                                                callback([])
                                                return
                                        }
                                        var result = []
                                        if (ownerData.length > 0) {
                                            ownerData.map((onedata, index) => {
                                                        result.push(
                                                            {
                                                                "_id" : onedata._id,
                                                                "owner_name" : onedata.owner_name,
                                                                "business_name" : onedata.business_name,
                                                                "contname1" : onedata.contact.first_contact_name,
                                                                "conttel1":onedata.contact.first_contact_tel,
                                                                "contname2" : onedata.contact.second_contact_name,
                                                                "conttel2":onedata.contact.second_contact_tel,
                                                                "addr_no" : onedata.address.no,
                                                                "addr_dist" : onedata.address.district,
                                                                "addr_prov" : onedata.address.province,
                                                                "addr_post" : onedata.address.postcode,
                                                                // "address" : {
                                                                //     "no" : "70 หมู่ 7 ซอยเพชรเกษม 130 ถนนเพชรเกษม ต.ไร่ขิง อ.สามพราน นครปฐม 73210",
                                                                //     "district" : "สามพราน",
                                                                //     "province" : "นครปฐม",
                                                                //     "postcode" : ""
                                                                // },
                                                                // "contact" : {
                                                                //     "first_contact_name" : "",
                                                                //     "first_contact_tel" : "0985191543",
                                                                //     "second_contact_name" : "",
                                                                //     "second_contact_tel" : "",
                                                                //     "fax" : "",
                                                                //     "email" : ""
                                                                // },
                                                                "create_dt" : dateformat(onedata.create_dt, 'dd-mm-yyyy'),
                                                                "percent_discount" : onedata.percent_discount,
                                                                "remark" : onedata.remark,
                                                                "__v" : 0
                                                            }
                                                        )
                                                })

                                        }

                                        console.log(result)
                                        callback(result)
                                })


                }
        }
        function updAlertlist(req) {
                return async function (callback, errback) {
                        let mgs_mod = req.mgs_mod
                        let arrUpd = []
                        let respData = { code: 0 }
                        //console.log(req)
                        //console.log(req.body)
                        let rawReq = req.body

                        rawReq.map((oneData) => {
                                arrUpd.push({
                                        updateOne: {
                                                filter: { _id: oneData._id },
                                                // If you were using the MongoDB driver directly, you'd need to do
                                                // `update: { $set: { title: ... } }` but mongoose adds $set for
                                                // you.
                                                update: {
                                                        //alert_lv: oneData.alert_lv,
                                                        alert_status: oneData.alert_status,
                                                        remark: oneData.remark,
                                                        $push: {
                                                                update_hist: {
                                                                        //"alert_lv": oneData.alert_lv,
                                                                        "remark": oneData.remark,
                                                                        "alert_status": oneData.alert_status,
                                                                        //"old_alert_lv": oneData.old_alert_lv,
                                                                        "old_remark": oneData.old_remark,
                                                                        "old_alert_status": oneData.old_alert_status,
                                                                        "update_dt": new Date(),
                                                                        "update_by": ""
                                                                }
                                                        },
                                                        update_dt: new Date()
                                                }
                                        }
                                })
                        })
                        console.log(JSON.stringify(arrUpd))
                        // callback(respData)
                        // return
                        try {
                                let b = await mgs_mod.servicehist.bulkWrite(arrUpd)
                                console.log(b)
                                callback(respData)
                                console.log("END")
                        } catch (e) {
                                console.log(e)
                                respData.code = -1
                                callback(respData)
                        }

                }
        }
        return { getCustlist: getCustlist, updAlertlist: updAlertlist };
}

