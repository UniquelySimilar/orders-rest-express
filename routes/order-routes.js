import express from 'express';
var router = express.Router();

import OrderController from '../controllers/order-controller.js';
var orderController = new OrderController();

router.get('/', (req, res) => {
  orderController.findAll(results => {
    res.send(results);
  });
});

export default router;