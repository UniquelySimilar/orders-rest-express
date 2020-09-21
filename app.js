import express from'express';
import logger from 'morgan';

import customersRouter from './routes/customer-routes.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/customers', customersRouter);

export default app;