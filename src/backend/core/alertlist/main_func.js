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
        function getAlertlist(req, type) {
                return function (callback, errback) {
                        let mgs_mod = req.mgs_mod
                        let lastWeek = new Date();
                        lastWeek.setDate(lastWeek.getDate() - 7);
                        console.log("infunc")
                        let queryCon = {
                                service_type: { $ne: "เช็คระยะ" },
                                out_dt: { "$lte": lastWeek },
                                $or: [{ alert_status: "ยังไม่ได้แจ้งเตือน" }, { alert_status: "ลูกค้าไม่รับสาย/ไม่สะดวกคุย" }]
                        }

                        if (type == "km7day") {
                                queryCon = {
                                        service_type: "เช็คระยะ",
                                        out_dt: { "$lte": lastWeek },
                                        $or: [{ alert_status: "ยังไม่ได้แจ้งเตือน" }, { alert_status: "ลูกค้าไม่รับสาย/ไม่สะดวกคุย" }]
                                }
                        } else if (type == "km") {
                                var specDay = new Date();
                                specDay.setDate(lastWeek.getDate() - 7);
                                queryCon = {
                                        service_type: "เช็คระยะ",
                                        // out_dt: { "$lte": lastWeek },
                                        alert_status: { "$ne": "แจ้งทราบแล้ว" }
                                }
                        }

                        mgs_mod.servicehist.find(queryCon)
                                .populate("owner_id car_id")
                                .lean()
                                .exec(function (err, servHistData) {
                                        if (err) {
                                                callback([])
                                                return
                                        }
                                        var result = []
                                        if (servHistData.length > 0) {
                                                servHistData.map((onedata, index) => {
                                                        if (type == "km") {
                                                                //console.log(onedata.car_id.model,onedata.out_dt,carMaConf[onedata.car_id.model].month)
                                                                var aDate = new Date(onedata.out_dt);
                                                                //console.log(aDate)
                                                                aDate.setDate(lastWeek.getDate() + (carMaConf[onedata.car_id.model].month * 30));
                                                                //console.log(aDate)
                                                                //console.log(aDate < new Date())
                                                                if (aDate > new Date()) {
                                                                        return
                                                                } else {
                                                                        // console.log(onedata.car_id.model, onedata.out_dt, carMaConf[onedata.car_id.model].month)
                                                                        // console.log(new Date(onedata.out_dt))
                                                                        // console.log(aDate)
                                                                        // console.log(aDate < new Date())
                                                                }
                                                        }
                                                        result.push(
                                                                {
                                                                        _id: onedata._id,
                                                                        ser_out_dt: dateformat(onedata.out_dt, 'dd-mm-yyyy'),
                                                                        company: onedata.owner_id.business_name,
                                                                        lice_pl: onedata.car_id.license_plate,
                                                                        model: onedata.car_id.model,
                                                                        cont1: onedata.owner_id.contact.first_contact_name,
                                                                        tel1: onedata.owner_id.contact.first_contact_tel,
                                                                        cont2: onedata.owner_id.contact.second_contact_name,
                                                                        tel2: onedata.owner_id.contact.second_contact_tel,
                                                                        ser_fix_no: onedata.service_fix_no,
                                                                        ser_type: onedata.service_type,
                                                                        km_out: onedata.service_out_km,
                                                                        month_alert_no: "month_alert_no",
                                                                        problem: onedata.service_fix_desc,
                                                                        alert_level: onedata.alert_lv,
                                                                        alert_detail: onedata.alert_desc,
                                                                        alert_status: onedata.alert_status,
                                                                        remark: onedata.remark
                                                                }
                                                        )
                                                })

                                        }


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
                                                        alert_lv: oneData.alert_level,
                                                        alert_status: oneData.alert_status,
                                                        remark: oneData.remark,
                                                        $push: {
                                                                update_hist: {
                                                                        "alert_lv": oneData.alert_lv,
                                                                        "remark": oneData.remark,
                                                                        "alert_status": oneData.alert_status,
                                                                        "old_alert_lv": oneData.old_alert_lv,
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
        return { getAlertlist: getAlertlist, updAlertlist: updAlertlist };
}

