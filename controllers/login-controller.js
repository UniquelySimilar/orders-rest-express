import pool from '../mysql-conn-pool.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class LoginController {
  login(user, callback) {
    pool.query('SELECT password FROM tokenusersexpress WHERE username = ?', [user.username], (error, results, fields) => {
      if (error) throw error;

      let hash = results[0].password;

      bcrypt.compare(user.password, hash, function(err, result) {
        if (err) throw err;

        // NOTE: Create middleware to check request for token.
        // - If token found, check token expiration date.
        //   * If expired, send 401 response to client to trigger redirect to login page.
        // - If token NOT found, send 401 response to client to trigger redirect to login page.

        let token = null;
        if (result) {
          token = uuidv4();
          // Store token and expiration in database
          pool.query('UPDATE tokenusersexpress SET token = ?, tokenexp = ? WHERE username = ?',
            [token, new Date(), user.username], (error, results, fields) => {
              if (error) throw error;
            })
        }

        return callback(token);
      });
    });
  }
}

export default LoginController;