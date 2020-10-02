import express from 'express';
var router = express.Router();

import OrderController from '../controllers/order-controller.js';
import { validationResult, orderValRules } from '../validation-rules.js';

var orderController = new OrderController();

router.get('/', (req, res) => {
  orderController.findAll(results => {
    res.send(results);
  });
});

router.post('/',
orderValRules,
(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  orderController.create(req.body, results => {
    if (!results) {
      res.status(400).send('Bad request - see server log');
    }
    else {
      res.sendStatus(201);
    }
  })
});

router.put('/:id',
orderValRules,
(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let order = req.body;
  order.id = req.params.id;
  orderController.update(order, results => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  });
});

router.delete('/:id',
(req, res) => {
  orderController.delete(req.params.id, results => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  });
});

export default router;