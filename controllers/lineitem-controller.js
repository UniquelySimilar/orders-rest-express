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

  create(lineitem, callback) {
    let sql = 'INSERT INTO line_items (order_id, product_id, unit_price, quantity) values(?, null, ?, ?)';
    pool.query(sql, [lineitem.order_id, lineitem.unit_price, lineitem.quantity], (error, results, fields) => {
      if (error) throw error;

      return callback(results);
    });
  }

}

export default LineItemController;