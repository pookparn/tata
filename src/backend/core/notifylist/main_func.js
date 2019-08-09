module.exports = function() {
    function getNotifylist(mgs_mod) { return function(callback, errback) {
        console.log("infunc")
        mgs_mod.servicehist.find()
        .lean()
        .exec(function (err, data) {
            console.log(data)
            callback(data)
        })
    }}
    return {  getNotifylist:getNotifylist};
}

