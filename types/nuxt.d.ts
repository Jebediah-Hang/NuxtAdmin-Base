import type { QueryError, ResultSetHeader } from 'mysql2';
import * as Models from './models/common';
import * as Elcoms from './models/elcom';

declare global {

  type MySQLQueryError = QueryError;
  type MySQLQueryResult = ResultSetHeader;
  type MySQLQueryCountRes = Array<{ 'COUNT(*)': number }>;

  type ApiResponse<T = any> = Models.ResponseResult<T>;

  type ApiPager = Models.Pager;
  type ApiPageQuery<T = any> = Models.PageQuery<T>;
  type ApiPageList<T = any> = Models.PageList<T>;

  type ApiDeleteQuery = Models.DeleteQuery;

  type TableCommonRowData<T = any> = Models.TableCommonRowData<T>;

  type ElcomPaginationPager = Elcoms.PaginationPager;
  type ElcomTableColumnConfig<T = any> = Elcoms.TableColumnConfig<T>;
}
