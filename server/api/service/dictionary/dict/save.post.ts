import type { Dictionary } from '@/types/models/dictionary';

export default defineEventHandler(async (event) => {
  const data: Partial<Dictionary> = await readBody(event);

  let sql = '';
  const now = Date.now();
  const time = dateFormat();

  if (data.id) {
    const updateData: TableCommonRowData<Dictionary> = {
      ...data,
      updateTime: time
    };

    delete updateData.id;
    delete updateData.createTime;

    sql = MySqlCreator.updateOne(DatabaseTable.tbDictionary, data.id, updateData);
  } else {
    const saveData: TableCommonRowData<Dictionary> = {
      ...data,
      id: now,
      updateTime: time,
      createTime: time
    };

    sql = MySqlCreator.insertOne(DatabaseTable.tbDictionary, saveData);
  }

  try {
    await MysqlDBPool.query(sql);
    return ResultJson.success(null);
  } catch (error) {
    throw createQueryError(error);
  }
});
