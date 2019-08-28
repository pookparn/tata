const dateformat = require('dateformat');

module.exports = function () {
        function getAlertlist(mgs_mod, type) {
                return function (callback, errback) {
                        var lastWeek = new Date();
                        lastWeek.setDate(lastWeek.getDate() - 7);
                        console.log("infunc")
                        let queryCon = {
                                service_type: { $ne: "เช็คระยะ" },
                                out_dt: { "$lte": lastWeek },
                                $or: [{ alert_status: "ยังไม่ได้แจ้งเตือน" }, { alert_status: "ลูกค้าไม่รับสาย/ไม่สะดวกคุย" }]
                        }

                        if (type == "km7day") {
                                queryCon = {
                                        service_type: "เช็คระยะ" ,
                                        out_dt: { "$lte": lastWeek },
                                        $or: [{ alert_status: "ยังไม่ได้แจ้งเตือน" }, { alert_status: "ลูกค้าไม่รับสาย/ไม่สะดวกคุย" }]
                                }
                        }else if(type == "km"){
                                var specDay = new Date();
                                specDay.setDate(lastWeek.getDate() - 7);
                                queryCon = {
                                        service_type: "เช็คระยะ" ,
                                       // out_dt: { "$lte": lastWeek },
                                        alert_status :{ "$ne" : "แจ้งทราบแล้ว"}
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

        return { getAlertlist: getAlertlist };
}

