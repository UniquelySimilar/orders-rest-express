import express from'express';
import logger from 'morgan';
import cors from 'cors';

import customersRouter from './routes/customer-routes.js';
import ordersRouter from './routes/order-routes.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);

export default app;