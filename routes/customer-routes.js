import express from 'express';
var router = express.Router();
import CustomerController from '../controllers/customer-controller.js'

var customerController = new CustomerController();

/* GET customers listing. */
router.get('/', (req, res) => {
  customerController.findAll( results => {
    res.send(results);
  });
});

router.get('/:customerId', (req, res) => {
  let id = req.params.customerId;
  customerController.find(id, results => {
    res.send(results);
  })
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