const router = require('express').Router()
const mainfunc = require('./main_func.js')();

router.route('/')
      .get((req, res, next) => {
          console.log("Route get")
          mainfunc.getAlertlist(req.mgs_mod)(function(resp){
            res.send(resp)
          })
      })

module.exports = router