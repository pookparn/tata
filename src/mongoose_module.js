var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tata:SonyA7iii@localhost:27017/tata?authSource=admin',{useNewUrlParser: true})

var db = mongoose.connection;
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connection.on('error', (err)=>{
        console.log(err)
        console.log('>> Failed to connect to MongoDB, retrying...');
});

var ownerSchema = new Schema({
        name : String
},{collection : "owner"})

var owner = mongoose.model('owner',ownerSchema)
module.exports.owner = owner

// owner.find().exec(function (err, person) {
//         console.log(err)
//         console.log(person)
// })