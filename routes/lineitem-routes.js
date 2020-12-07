import express from 'express';
var router = express.Router();

import { validationResult, lineItemCreateValRules, lineItemEditValRules } from '../validation-rules.js';

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

router.post('/',
lineItemCreateValRules,
(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  lineItemController.create(req.body, (results) => {
    res.sendStatus(201);
  });
});

router.put('/:id',
lineItemEditValRules,
(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let lineItem = req.body;
  lineItem.id = req.params.id;
  lineItemController.update(lineItem, (results) => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  });
});

router.delete('/:id', (req, res) => {
  lineItemController.delete(req.params.id, (results) => {
    if (results.affectedRows === 0) {
      res.sendStatus(404);
    }
    else {
      res.sendStatus(204);
    }
  })
})

export default router;