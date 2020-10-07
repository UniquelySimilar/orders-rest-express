import pool from '../mysql-conn-pool.js';
import bcrypt from 'bcrypt';

class LoginController {
  login(user, callback) {
    pool.query('SELECT password FROM tokenusersexpress WHERE username = ?', [user.username], (error, results, fields) => {
      if (error) throw error;

      let hash = results[0].password;

      bcrypt.compare(user.password, hash, function(err, result) {
        if (err) throw err;

        return callback(result);  // true or false
      });
    });
  }
}

export default LoginController;