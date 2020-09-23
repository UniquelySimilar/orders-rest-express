import pool from '../mysql-conn-pool.js';

class OrderController {
  findByCustomer(customerId, callback) {
    pool.query('SELECT * FROM orders WHERE customer_id = ?', [customerId], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });    
  }
}

export default OrderController;