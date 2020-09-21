import mysql from 'mysql';
import pool from '../mysql-conn-pool.js';

class CustomerController {
  findAll(callback) {
    pool.query('SELECT * FROM customers', (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  find(id, callback) {
    pool.query('SELECT * FROM customers WHERE id = ?', [id], (error, results, fields) => {
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

  create(customer, callback) {
    pool.query('INSERT INTO customers SET ?', customer, (error, results, fields) => {
      if (error) throw error;

      // Return OkPacket object
      return callback(results);
    });
  }

  update(id, customer, callback) {
    let updatedAt = mysql.raw('CURRENT_TIMESTAMP()');
    let sql = 'UPDATE customers SET first_name = ?, last_name = ?, city = ?, state = ?, zipcode = ?, ' +
              'home_phone = ?, work_phone = ?, email = ?, updated_at = ? WHERE id = ?';
    let queryValues = [
      customer.first_name, customer.last_name, customer.city, customer.state, customer.zipcode,
      customer.home_phone, customer.work_phone, customer.email, updatedAt, id
    ];

    pool.query(sql, queryValues, (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  delete(id, callback) {
    pool.query('DELETE FROM customers WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }
}

export default CustomerController;