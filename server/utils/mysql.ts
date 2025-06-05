import { escape } from 'mysql2';

type DataObj = Record<string, any>;
type OrderType = 'ASC' | 'DESC';

function createQueryEqualString(query: DataObj = {}) {
  const queryField = Object.entries(query).filter(([k, v]) => typeof v === 'number' ? true : v);
  return queryField.map(([k, v]) => `${k} = ${escape(v)}`).join(' AND ');
}

function createQueryLikeString(query: DataObj = {}) {
  return Object.keys(query).map(k => `${k} LIKE ${escape(`%${query[k]}%`)}`).join(' AND ');
}

export class MySqlCreator {

  static selectAll(tbName: string) {
    return `SELECT * FROM ${tbName};`;
  }

  static selectFieldAll(tbName: string, fields: Array<string>) {
    return `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName};`;
  }

  static selectOne(tbName: string, id: number) {
    return `SELECT * FROM ${tbName} WHERE id = ${id};`;
  }

  static selectEqual(tbName: string, query: DataObj = {}) {
    const queryStr = createQueryEqualString(query);
    return queryStr ? `SELECT * FROM ${tbName} WHERE ${queryStr};` : this.selectAll(tbName);
  }

  static selectFieldEqual(tbName: string, fields: Array<string>, query: DataObj = {}) {
    const queryStr = createQueryEqualString(query);
    return queryStr ? `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName} WHERE ${queryStr};` : this.selectFieldAll(tbName, fields);
  }

  static selectLike(tbName: string, query: DataObj = {}) {
    const queryStr = createQueryLikeString(query);
    return queryStr ? `SELECT * FROM ${tbName} WHERE ${queryStr};` : this.selectAll(tbName);
  }

  static selectFieldLike(tbName: string, fields: Array<string>, query: DataObj = {}) {
    const queryStr = createQueryLikeString(query);
    return queryStr ? `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName} WHERE ${queryStr};` : this.selectFieldAll(tbName, fields);
  }

  static countAll(tbName: string) {
    return `SELECT COUNT(*) FROM ${tbName};`;
  }

  static selectPage(tbName: string, size: number = 10, current: number = 1, order: string = '1', orderType: OrderType = 'ASC') {
    const offset = (current - 1) * size;
    return `SELECT * FROM ${tbName} ORDER BY ${order} ${orderType} LIMIT ${size} OFFSET ${offset};`;
  }

  static selectFieldPage(tbName: string, fields: Array<string>, size: number = 10, current: number = 1) {
    const offset = (current - 1) * size;
    return `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName} LIMIT ${size} OFFSET ${offset};`;
  }

  static countEqualAll(tbName: string, query: DataObj = {}) {
    const queryStr = createQueryEqualString(query);
    return queryStr ? `SELECT COUNT(*) FROM ${tbName} WHERE ${queryStr};` : this.countAll(tbName);
  }

  static selectEqualPage(tbName: string, size: number = 10, current: number = 1, query: DataObj = {}, order: string = '1', orderType: OrderType = 'ASC') {
    const offset = (current - 1) * size;
    const queryStr = createQueryEqualString(query);
    return queryStr ? `SELECT * FROM ${tbName} WHERE ${queryStr} ORDER BY ${order} ${orderType} LIMIT ${size} OFFSET ${offset};` : this.selectPage(tbName, size, current, order, orderType);
  }

  static selectFieldEqualPage(tbName: string, fields: Array<string>, size: number = 10, current: number = 1, query: DataObj = {}) {
    const offset = (current - 1) * size;
    const queryStr = createQueryEqualString(query);
    return queryStr ? `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName} WHERE ${queryStr} LIMIT ${size} OFFSET ${offset};` : this.selectFieldPage(tbName, fields, size, current);
  }

  static countLikeAll(tbName: string, query: DataObj = {}) {
    const queryStr = createQueryLikeString(query);
    return queryStr ? `SELECT COUNT(*) FROM ${tbName} WHERE ${queryStr};` : this.countAll(tbName);
  }

  static selectLikePage(tbName: string, size: number = 10, current: number = 1, query: DataObj = {}, order: string = '1', orderType: OrderType = 'ASC') {
    const offset = (current - 1) * size;
    const queryStr = createQueryLikeString(query);
    return queryStr ? `SELECT * FROM ${tbName} WHERE ${queryStr} ORDER BY ${order} ${orderType} LIMIT ${size} OFFSET ${offset};` : this.selectPage(tbName, size, current, order, orderType);
  }

  static selectFieldLikePage(tbName: string, fields: Array<string>, size: number = 10, current: number = 1, query: DataObj = {}) {
    const offset = (current - 1) * size;
    const queryStr = createQueryLikeString(query);
    return queryStr ? `SELECT ${fields.length ? fields.join(', ') : '*'} FROM ${tbName} WHERE ${queryStr} LIMIT ${size} OFFSET ${offset};` : this.selectFieldPage(tbName, fields, size, current);
  }

  static insertOne(tbName: string, data: DataObj = {}) {
    const keyStr = `(${Object.keys(data).join(', ')})`;
    const valStr = `(${Object.values(data).map(v => escape(v)).join(', ')})`;
    return `INSERT INTO ${tbName} ${keyStr} VALUES ${valStr};`;
  }

  static updateOne(tbName: string, id: number, data: DataObj = {}) {
    const updateStr = Object.keys(data).map(k => `${k} = ${escape(data[k])}`).join(', ');
    return `UPDATE ${tbName} SET ${updateStr} WHERE id = ${id};`;
  }

  static deleteOne(tbName: string, id: number) {
    return `DELETE FROM ${tbName} WHERE id = ${id};`;
  }

  static deleteList(tbName: string, ids: Array<number>) {
    const deleteStr = `(${ids.join(', ')})`;
    return `DELETE FROM ${tbName} WHERE id IN ${deleteStr};`;
  }

}

export function createQueryError(error: unknown) {
  return createError({
    statusCode: (<MySQLQueryError>error).errno,
    statusMessage: (<MySQLQueryError>error).message
  });
}
