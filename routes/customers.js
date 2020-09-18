var express = require('express');
var router = express.Router();

/* GET customers listing. */
router.get('/', function(req, res, next) {
  res.send('customer index');
});

module.exports = router;
