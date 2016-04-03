var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/cncntr8');
var sessions = db.get('sessions');

router.get('/', function(req, res, next) {
  sessions.find({}, function(err, sessions) {
    if (err) throw err;
    console.log(sessions)
    res.render('index', { sessions: sessions });
  })
});

module.exports = router;
