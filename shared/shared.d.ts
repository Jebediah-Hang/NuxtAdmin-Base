import type * as Models from "~~/types/common";

declare global {
  type ApiResponse<T = any> = Models.ResponseResult<T>;

  type ApiPager = Models.Pager;
  type ApiPageQuery<T = any> = Models.PageQuery<T>;
  type ApiPageList<T = any> = Models.PageList<T>;

  type ApiDeleteQuery = Models.DeleteQuery;

  type TableCommonRowData<T = any> = Models.TableCommonRowData<T>;
}

declare module "#auth-utils" {
  interface User {
    id?: number;
    username?: string;
    nickname?: string;
    phone?: string;
    email?: string;
  }

  interface UserSession {
    token: string;
    expiredTime: number;
  }

  interface SecureSessionData {}
}

export {};
