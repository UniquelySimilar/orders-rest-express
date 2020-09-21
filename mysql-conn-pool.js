import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'testuser',
    password        : 'testpwd',
    database        : 'ordersdb'
  });

export default pool;