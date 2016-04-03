var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/cncntr8');
var sessions = db.get('sessions');
var metrics = db.get('metrics');

router.get('/:session', function(req, res, next) {
  var sessionId = req.params.session;
  sessions.findById(sessionId).success(function(session) {
    metrics.find({
      session: sessions.id(sessionId)
    }).success(function(metrics) {
      console.log(metrics)
      res.render('session', {
        session: session,
        metrics: metrics
      });
    })
  })
});

module.exports = router;
