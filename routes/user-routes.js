import express from 'express';
var router = express.Router();

import UserController from '../controllers/user-controller.js';
var userController = new UserController();

router.get('/', (req, res) => {
  userController.findAll( results => {
    res.send(results);
  });
});

router.get('/:userName', (req, res) => {
  let userName = req.params.userName;
  userController.find(userName, results => {
    res.send(results);
  });
})

export default router;