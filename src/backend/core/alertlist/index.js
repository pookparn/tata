const router = require('express').Router()
const mainfunc = require('./main_func.js')();



router.route('/fix7day')
  .get((req, res, next) => {
    console.log("Route get")
    mainfunc.getAlertlist(req, "fix7day")(function (resp) {
      res.send(resp)
    })
  })

router.route('/km7day')
  .get((req, res, next) => {
    console.log("Route get")
    mainfunc.getAlertlist(req, "km7day")(function (resp) {
      res.send(resp)
    })
  })

router.route('/km')
  .get((req, res, next) => {
    console.log("Route get")
    mainfunc.getAlertlist(req, "km")(function (resp) {
      res.send(resp)
    })
  })

router.route('/')
  .post((req, res, next) => {
    console.log("Route patch")
    mainfunc.updAlertlist(req)(function (resp) {
      res.send(resp)
    })
  })

module.exports = router