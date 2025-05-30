import mysql, { type PoolOptions } from 'mysql2/promise';

const { databaseConfig } = useRuntimeConfig();

const access: PoolOptions = {
  port: 3306,
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const MysqlDBPool = mysql.createPool(access);
