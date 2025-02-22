require('dotenv').config();
const path = require('path');
const { DataSource } = require('typeorm');

console.log('path', process.env.DB_HOST);

const AppDataSource = new DataSource({
  type: process.env.DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, 'dist/**/*.entity.js')],
  migrations: [path.join(__dirname, 'migrations/*.js')],
  synchronize: false,
});

module.exports = AppDataSource;
