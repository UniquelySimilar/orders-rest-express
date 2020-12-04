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
    if (!results) {
      res.status(400).send('Bad request - see server log');
    }
    else {
      res.sendStatus(201);
    }
  })
});


export default router;