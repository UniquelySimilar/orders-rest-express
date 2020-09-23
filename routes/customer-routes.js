import express from 'express';
var router = express.Router();
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

router.post('/', (req, res) => {
  customerController.create(req.body, (results) => {
    res.sendStatus(201);
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