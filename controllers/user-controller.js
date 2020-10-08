import pool from '../mysql-conn-pool.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class UserController {
  findAll(callback) {
    pool.query('SELECT * FROM users', (error, results, fields) => {
      if (error) throw error;

      let usersNoPwd = results.map( result => {
        let user = Object.assign({}, result);
        user.password = undefined;
        return user;
      })

      return callback(usersNoPwd);
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

  create(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) throw err;

      user.password = hash;
      pool.query('INSERT INTO tokenusersexpress SET ?', user, (error, results, fields) => {
        if (error) throw error;
  
        return callback(results);
      });
    });
  }
}

export default UserController;