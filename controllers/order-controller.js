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