import type { DictCate } from '@/types/models/dictionary';

export default defineEventHandler(async (event) => {

  const fields: Array<keyof DictCate> = ['category'];

  const sql = MySqlCreator.selectFieldAll(DatabaseTable.tbDictionary, fields);

  try {
    const result: any = await MysqlDBPool.query(sql);
    const listResult: Array<DictCate> = result[0];

    const list = listResult.map(item => item.category);

    return ResultJson.success([...new Set(list)]);
  } catch (error) {
    throw createQueryError(error);
  }
});
