var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tata:SonyA7iii@localhost:27017/tata?authSource=admin', { useNewUrlParser: true })

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
        "percent_discount": Number,
        "remark": String

}, { collection: "owner" })
module.exports.owner = mongoose.model('owner', ownerSchema)

var carSchema = new Schema({
        "_id": Schema.Types.ObjectId,
        "owener_id": { type: Schema.Types.ObjectId, ref: "owner" },
        "seq_id": String,
        "model": String,
        "license_plate": String,
        "province": String,
        "color": String,
        "vin": String,
        "engine_no": String,
        "sale_dt": Date,
        "create_dt": Date
}, { collection: "car" })
module.exports.car = mongoose.model('car', carSchema)

var servicehistSchema = new Schema({
        "_id": Schema.Types.ObjectId,
        "car_id": { type: Schema.Types.ObjectId, ref: "car" },
        "owener_id": { type: Schema.Types.ObjectId, ref: "owner" },
        "service_entry_km": Number,
        "service_out_km": Number,
        "service_type": String,
        "service_fix_no": String,
        "cust_inform_problem": String,
        "service_fix_desc": String,
        "mechanic": String,
        "entry_dt": Date,
        "out_dt": Date,
        "inform_lv": Number,
        "inform_desc": String,
        "inform_status": String,
        "update_by": String,
        "remark": String
}, { collection: "service_history" })
module.exports.servicehist = mongoose.model('servicehist', servicehistSchema)

