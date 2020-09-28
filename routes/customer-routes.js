import express from 'express';
var router = express.Router();
import expressValidator from 'express-validator';
const { body, validationResult } = expressValidator;

import CustomerController from '../controllers/customer-controller.js'
import OrderController from '../controllers/order-controller.js'

var customerController = new CustomerController();
var orderController = new OrderController();

router.get('/', (req, res) => {
  customerController.findAll( results => {
    res.send(results);
  });
});

router.get('/:customerId', (req, res) => {
  let id = req.params.customerId;
  let customer = {};
  customerController.find(id, results => {
    customer = results;
    orderController.findByCustomer(id, (results) => {
      customer.orders = results;
      res.send(customer);
    });
  });
});

router.post('/',
[
  body('first_name').isLength({ min:1, max: 50} ),
  body('last_name').isLength({ min:1, max: 50 }),
  body('street').isLength({ min:1, max: 50 }),
  body('city').isLength({ min:1, max: 50 }),
  body('zipcode').isPostalCode('US'),
  body('home_phone').isInt({ min: 1000000000, max: 9999999999 }),
  body('work_phone').optional({ checkFalsy: true }).isInt({ min: 1000000000, max: 9999999999 }),
  body('email').isEmail()
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  customerController.create(req.body, (results) => {
    if (!results) {
      res.status(400).send('Bad request - see server log');
    }
    else {
      res.sendStatus(201);
    }
  });
});

router.put('/:id', (req, res) => {
  customerController.update(req.params.id, req.body, (results) => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  });
});

router.delete('/:id', (req, res)=> {
  customerController.delete(req.params.id, (results) => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  })
})

export default router;