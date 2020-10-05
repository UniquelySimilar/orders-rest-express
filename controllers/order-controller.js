import mysql from 'mysql';
import pool from '../mysql-conn-pool.js';

class OrderController {
  findAll(callback) {
    pool.query('SELECT * FROM orders', (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  find(id, callback) {
    pool.query('SELECT * FROM orders WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;

      // Convert result from array of RowDataPacket objects to array of object literals
      let orders = results.map( result => Object.assign({}, result) );
      let order = null;
      if (orders.length > 0) {
        order = orders[0];
        console.log(order);
      }

      return callback(order);
    })
  }

  findByCustomer(customerId, callback) {
    pool.query('SELECT * FROM orders WHERE customer_id = ?', [customerId], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });    
  }

  create(order, callback) {
    if (order.shipped_date === '') {
      order.shipped_date = null;
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

  update(order, callback) {
    if (order.shipped_date === '') {
      order.shipped_date = null;
    }

    let updatedAt = mysql.raw('CURRENT_TIMESTAMP()');
    let sql = 'UPDATE orders SET order_status = ?, order_date = ?, required_date = ?, shipped_date = ?, ' +
              'updated_at = ? WHERE id = ?';
    let queryValues = [
      order.order_status, order.order_date, order.required_date, order.shipped_date, updatedAt, order.id
    ]

    pool.query(sql, queryValues, (error, results, fields) => {
      if (error) {
        if (error.sqlMessage) {
          console.error(`ERROR: ${error.sqlMessage}`);
        }
        else {
          console.error(error);
        }
      }

      return callback(results);
    })
  }

  delete(id, callback) {
    pool.query('DELETE FROM orders WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    })
  }
}

export default OrderController;