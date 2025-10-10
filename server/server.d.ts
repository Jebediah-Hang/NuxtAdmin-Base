import type { H3Event as H3E } from "h3";
import type { QueryError, ResultSetHeader } from "mysql2";

declare global {
  type H3Event = H3E;

  type MySQLQueryError = QueryError;
  type MySQLQueryResult = ResultSetHeader;
  type MySQLQueryCountRes = Array<{ "COUNT(*)": number }>;
}

export {};
