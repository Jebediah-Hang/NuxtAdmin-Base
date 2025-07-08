import type { DictItem, DictCate } from '@/types/models/dictionary';

export default defineEventHandler(async (event) => {
  const params: Partial<DictCate> = getQuery(event);
  const fields: Array<keyof DictItem> = ['label', 'value'];

  const sql = MySqlCreator.selectFieldEqual(DatabaseTable.tbDictionary, fields, params);

  try {
    const result: any = await MysqlDBPool.query(sql);
    const listResult: Array<DictItem> = result[0];

    return ResultJson.success(listResult);
  } catch (error) {
    throw createQueryError(error);
  }
});
