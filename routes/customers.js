import express from 'express';
var router = express.Router();

/* GET customers listing. */
router.get('/', function(req, res, next) {
  res.send('customer index');
});

export default router;