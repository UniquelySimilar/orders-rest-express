import pool from '../mysql-conn-pool.js';

class UserController {
  findAll(callback) {
    pool.query('SELECT * FROM users', (error, results, fields) => {
      if (error) throw error;

      for (let i = 0; i < results.length; i++) {
        results[i].password = undefined;
      }
      
      return callback(results);
    })
  }

  find(userName, callback) {
    pool.query('SELECT * FROM users WHERE username = ?', [userName], (error, results, fields) => {
      if (error) throw error;

      // Convert result from array of RowDataPacket objects to array of object literals
      let users = results.map( result => Object.assign({}, result) );
      let user = null;
      if (users.length > 0) {
        user = users[0];
        user.password = undefined;
      }

      return callback(user);
    })
  }
}

export default UserController;