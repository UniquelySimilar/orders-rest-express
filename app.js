import express from'express';
import logger from 'morgan';
import cors from 'cors';

import { checkAuthHeader } from './auth.js';

import customersRouter from './routes/customer-routes.js';
import ordersRouter from './routes/order-routes.js';
import usersRouter from './routes/user-routes.js';
// Client app currently used for Express and Rails REST APIs.  Possibly create context root on servers
// in future and combine login and logout routes here.
import loginRouter from './routes/login-routes.js';
import logoutRouter from './routes/logout-routes.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', checkAuthHeader);

app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

export default app;