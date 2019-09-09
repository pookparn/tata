const router = require('express').Router()
const mainfunc = require('./main_func.js')();



router.route('/')
  .get((req, res, next) => {
    console.log("Route get")
    mainfunc.getCustlist(req)(function (resp) {
      res.send(resp)
    })
  })


module.exports = router