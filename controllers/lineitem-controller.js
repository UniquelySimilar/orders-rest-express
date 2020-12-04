import pool from '../mysql-conn-pool.js';

class LineItemController {
  findAll(callback) {
    pool.query('SELECT * FROM line_items', (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  find(id, callback) {
    pool.query('SELECT * FROM line_items WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;

      // Convert result from array of RowDataPacket objects to array of object literals
      let lineItems = results.map( result => Object.assign({}, result) );
      let lineItem = null;
      if (lineItems.length > 0) {
        lineItem = lineItems[0];
      }

      return callback(lineItem);
    })
  }

  findByOrder(orderId, callback) {
    pool.query('SELECT * FROM line_items WHERE order_id = ?', [orderId], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

  create(lineItem, callback) {
    
  }

}

export default LineItemController;