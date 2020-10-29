import pool from '../mysql-conn-pool.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class LoginController {
  login(user, callback) {
    pool.query('SELECT password FROM tokenusersexpress WHERE username = ?', [user.username], (error, results, fields) => {
      if (error) throw error;

      if (results.length === 0) {
        return callback(null);
      }
      else {
        let hash = results[0].password;

        bcrypt.compare(user.password, hash, function(err, result) {
          if (err) throw err;
  
          let token = null;
          if (result) {
            token = uuidv4();
            // Store token and expiration in database
            pool.query('UPDATE tokenusersexpress SET token = ?, tokenexp = (CURDATE() + 1) WHERE username = ?',
              [token, user.username], (error, results, fields) => {
                if (error) throw error;
              })
          }
  
          return callback(token);
        });
      }
    });
  }

  logout(headerValue, callback) {
    if (headerValue !== undefined) {
      let token = headerValue.substring(7);
      let sql = "UPDATE tokenusersexpress SET token = NULL, tokenexp = NULL WHERE token = ?";
      pool.query(sql, [token], (error, results, fields) => {
        if (error) throw error;

        return callback();
      });
    }
    else {
      return callback();
    }
  }
}

export default LoginController;