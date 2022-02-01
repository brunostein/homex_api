/**
 * TIFX Technologies
 * Copyright (c) 2014-2021 - All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Bruno B. Stein <bruno.stein@tifx.com.br>, 2021
 */

const config = require('./');

const dbSettings = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "",
  database: process.env.MYSQL_DB || "",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = dbSettings;
