import type { Dictionary } from '@/types/models/dictionary';

export default defineEventHandler(async (event) => {
  const params: ApiPageQuery<Dictionary> = getQuery(event);
  const [pager, query] = separatePagerQuery(params);

  const countSql = MySqlCreator.countEqualAll(DatabaseTable.tbDictionary, query);
  const selectSql = MySqlCreator.selectEqualPage(DatabaseTable.tbDictionary, pager.size, pager.current, query);

  try {
    const [result]: any = await MysqlDBPool.query(`${countSql}${selectSql}`);

    const [countResult]: MySQLQueryCountRes = result[0];
    const listResult: Array<TableCommonRowData<Dictionary>> = result[1];

    listResult.forEach(dictionary => {
      const { updateTime, createTime } = dictionary;

      dictionary.updateTime = dateFormat(new Date(<string>updateTime));
      dictionary.createTime = dateFormat(new Date(<string>createTime));
    });

    return ResultJson.success({ total: countResult["COUNT(*)"], current: pager.current, list: listResult });
  } catch(error) {
    throw createQueryError(error);
  }
});
