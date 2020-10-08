import pool from './mysql-conn-pool.js';

var checkAuthHeader = function(req, res, next) {
  if (req.path === '/login') {
    return next();
  }

  let headerValue = req.header('Authorization');
  if (headerValue === undefined) {
    res.sendStatus(401);
  }
  else {
    let token = headerValue.substring(7);
    let sql = 'SELECT * FROM ordersdb.tokenusersexpress WHERE DATE(tokenexp) > CURDATE() AND token = ?';
    pool.query(sql, [token], (error, results, fields) => {
      if (error) throw error;

      if (results.length === 0) {
        res.sendStatus(401);
      }
      else {
        next();
      }
    })
  }
}

export { checkAuthHeader };