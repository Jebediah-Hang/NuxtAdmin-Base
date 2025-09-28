import mysql, { type PoolOptions } from "mysql2/promise";

const { databaseConfig } = useRuntimeConfig();

const access: PoolOptions = {
  port: Number(databaseConfig.port),
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  charset: "utf8mb4_0900_ai_ci",
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const MySqlPool = mysql.createPool(access);

export function createQueryError(error: unknown) {
  return createError({
    statusCode: (<MySQLQueryError>error).errno,
    statusMessage: (<MySQLQueryError>error).message
  });
}

export class DBTable {
  static tbUser = "tb_user";
}
