'use strict';

// config/database.js
var host = '127.0.0.1';
if (process.env.MYWEB_ENV !== 'production') {
  host = '192.168.0.15';
}

module.exports = {
  mysql: {
    host: host,
    port: 3306,
    user: 'myweb',
    password: 'myweb1!',
    database: 'myweb'
  }
};
