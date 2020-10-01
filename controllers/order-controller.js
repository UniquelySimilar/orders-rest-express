import pool from '../mysql-conn-pool.js';

class OrderController {
  findAll(callback) {
    pool.query('SELECT * FROM orders', (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  findByCustomer(customerId, callback) {
    pool.query('SELECT * FROM orders WHERE customer_id = ?', [customerId], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });    
  }

  create(order, callback) {
    order.order_date = new Date(parseInt(order.order_date));
    order.required_date = new Date(parseInt(order.required_date));
    if (order.shipped_date === '') {
      order.shipped_date = null;
    }
    else {
      order.shipped_date = new Date(parseInt(order.shipped_date));
    }
    pool.query('INSERT INTO orders SET ?', order, (error, results, fields) => {
      if (error) {
        if (error.sqlMessage) {
          console.error(`ERROR: ${error.sqlMessage}`);
        }
        else {
          console.error(error);
        }
      }
  
      return callback(results);
    });
  }
}

export default OrderController;