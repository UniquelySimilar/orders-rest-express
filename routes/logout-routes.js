import express from 'express';
var router = express.Router();

import LoginController from '../controllers/login-controller.js';
var loginController = new LoginController();

router.put('/', (req, res) => {
    loginController.logout(req.header('Authorization'), () => {
        // Just return 204.  Client app will clear token and display login page regardless.
        res.sendStatus(204);
    }) 
});

export default router;