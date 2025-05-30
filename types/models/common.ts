export interface AnyDataObject {
  [key: string]: any
}

export interface CommonDataObj {
  id: number;
  updateTime: string;
  createTime: string;
}

export type TableCommonRowData<T> = Partial<CommonDataObj & T>;

export interface Pager {
  size: number;
  current: number;
}

export type PageQuery<T> = Pager & Partial<T> & AnyDataObject;

export interface PageList<T> {
  total: number;
  current: number;
  list: Array<T>;
}

export interface ResponseResult<T> {
  code: number;
  msg: string;
  data: T;
}

export interface DeleteQuery {
  ids: string;
}

export interface SecretRuntimeConfig {
  jwtSignKey: string;
}
