var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tata:SonyA7iii@157.230.249.126:27017/tata?authSource=admin', { useNewUrlParser: true })

var db = mongoose.connection;
var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

mongoose.connection.on('error', (err) => {
        console.log(err)
        console.log('>> Failed to connect to MongoDB, retrying...');
});

var ownerSchema = new Schema({

        "_id": Schema.Types.ObjectId,
        "seq_id": String,
        "owner_name": String,
        "business_name": String,
        "address": {
                "no": String,
                "district": String,
                "province": String,
                "postcode": String
        },
        "contact": {
                "first_contact_name": String,
                "first_contact_tel": String,
                "second_contact_name": String,
                "second_contact_tel": String,
                "fax": String,
                "email": String
        },
        "create_dt": Date,
        "update_dt": Date,
        "update_by": Date,
        "percent_discount": Number,
        "remark": String

}, { collection: "owner", versionKey:false })
module.exports.owner = mongoose.model('owner', ownerSchema)

var carSchema = new Schema({
        "_id": Schema.Types.ObjectId,
        "owner_id": { type: Schema.Types.ObjectId, ref: "owner" },
        "seq_id": String,
        "model": String,
        "license_plate": String,
        "province": String,
        "color": String,
        "vin": String,
        "engine_no": String,
        "sale_dt": Date,
        "create_dt": Date,
        "update_dt": Date,
        "update_by": Date,
        "roof" : String,
        "finance_year" :Number,
        "finance_down" : String
}, { collection: "car", versionKey:false })
module.exports.car = mongoose.model('car', carSchema)

var servicehistSchema = new Schema({
        "_id": Schema.Types.ObjectId,
        "seq_id": String,
        "car_id": { type: Schema.Types.ObjectId, ref: "car" },
        "owner_id": { type: Schema.Types.ObjectId, ref: "owner" },
        "service_entry_km": Number,
        "service_out_km": Number,
        "service_type": String,
        "service_fix_no": String,
        "cust_inform_problem": String,
        "service_fix_desc": String,
        "mechanic": String,
        "entry_dt": Date,
        "out_dt": Date,
        "alert_lv": String,
        "alert_desc": String,
        "alert_status": String,
        "create_dt": Date,
        "update_dt": Date,
        "update_by": String,
        "remark": String
}, { collection: "service_history" , versionKey:false})
module.exports.servicehist = mongoose.model('servicehist', servicehistSchema)




// const dateformat = require('dateformat');
// var lastWeek = new Date();
// lastWeek.setDate(lastWeek.getDate() -7);

// this.servicehist.find({service_type:{$ne:"เช็คระยะ"},
//                           out_dt:{"$lte": lastWeek}, 
//                           $or:[{alert_status:"ยังไม่ได้แจ้งเตือน"},{alert_status:"ลูกค้าไม่รับสาย/ ไม่สะดวกคุย"}]
//                         })
// .populate("owner_id car_id")
// .lean()
// .exec(function (err, servHistData) {
//    //console.log(servHistData)
// //    var date = new Date("04/20/2019")
// //    console.log(date)


// //    console.log(">>>>>",dateformat(servHistData.out_dt, 'dd-mm-yyyy'))
//    var result = []
//    if(servHistData.length > 0){
//         servHistData.map((onedata,index)=>{
//                 result.push(
//                         {       _id: onedata._id, 
//                                 ser_out_dt: dateformat(onedata.out_dt, 'dd-mm-yyyy'), 
//                                 company: onedata.owner_id.business_name, 
//                                 lice_pl: onedata.car_id.license_plate, 
//                                 model: onedata.car_id.model, 
//                                 cont1:onedata.owner_id.contact.first_contact_name, 
//                                 tel1:onedata.owner_id.contact.first_contact_tel, 
//                                 cont2:onedata.owner_id.contact.second_contact_name, 
//                                 tel2:onedata.owner_id.contact.second_contact_tel, 
//                                 ser_fix_no:onedata.service_fix_no, 
//                                 ser_type:onedata.service_type,
//                                 km_out:onedata.service_out_km, 
//                                 month_alert_no:"month_alert_no", 
//                                 problem:onedata.service_fix_desc, 
//                                 alert_level:onedata.alert_lv, 
//                                 alert_detail:onedata.alert_desc,
//                                 alert_status:onedata.alert_status,
//                                 remark:onedata.remark
//                         }
//                 )
//         })
//    }


//    console.log(result)
// })



//    var date = new Date("04/20/2019")
//    console.log(date)
// this.servicehist.updateOne({_id: "5d4ae1a04534184c2ec5279b"},{$set:{entry_dt:date,out_dt:date}})
// .exec(function (err, resp) {
//      console.log(err)
//      console.log(resp)
// })