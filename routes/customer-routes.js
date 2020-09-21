import express from 'express';
var router = express.Router();
import CustomerController from '../controllers/customer-controller.js'

var customerController = new CustomerController();

/* GET customers listing. */
router.get('/', function(req, res, next) {
  customerController.findAll(function(results) {
    res.send(results);
  })
});

router.get('/:customerId', function(req, res, next) {
  let id = req.params.customerId;
  customerController.find(id, function(results) {
    res.send(results);
  })
})

export default router;