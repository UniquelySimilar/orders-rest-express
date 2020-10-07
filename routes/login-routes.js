import express from 'express';
var router = express.Router();

import LoginController from '../controllers/login-controller.js';
var loginController = new LoginController();

router.post('/', (req, res) => {
    loginController.login(req.body, results => {
        res.send(results);
    });
});

export default router;