import express from 'express';
var router = express.Router();

import LoginController from '../controllers/login-controller.js';
var loginController = new LoginController();

router.post('/', (req, res) => {
  loginController.login(req.body, results => {
    if (!results) {
      res.sendStatus(401);
    }
    else {
      let resBody = {
        token: results
      };

      res.send(resBody);
    }
  });
});

export default router;