import express from 'express';
var router = express.Router();

import LineItemController from '../controllers/lineitem-controller.js';

const lineItemController = new LineItemController();

router.get('/', (req, res) => {
  lineItemController.findAll( results => {
    res.send(results);
  })
});


router.get('/:id', (req, res) => {
  let id = req.params.id;
  lineItemController.find(id, results => {
    let lineItem = results;
    if (!lineItem) {
      res.sendStatus(404);
    }
    else {
      res.send(lineItem);
    }
  });
});


export default router;