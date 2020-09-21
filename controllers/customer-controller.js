import pool from '../mysql-conn-pool.js';

class CustomerController {
  findAll(callback) {
    pool.query('SELECT * FROM customers', function(error, results, fields) {
      if (error) throw error;

      return callback(results);
    });
  }

  find(id, callback) {
    pool.query('SELECT * FROM customers WHERE id = ?', [id], function(error, results, fields) {
      if (error) throw error;

      // Convert result from array of RowDataPacket objects to array of object literals
      let customers = results.map( result => Object.assign({}, result) );
      let customer = null;
      if (customers.length > 0) {
        customer = customers[0];
      }

      return callback(customer);
    });
  }
}

export default CustomerController;