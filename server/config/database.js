'use strict';

// config/database.js
var host = 'gumabae.iptime.org';
if (process.env.NODE_ENV !== 'production') {
  host = '127.0.0.1';
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
