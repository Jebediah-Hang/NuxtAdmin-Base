import type { User } from '@/types/models/user';

export default defineEventHandler(async (event) => {
  const data: User = await readBody(event);

  const time = dateFormat();

  const saveData: TableCommonRowData<User> = {
    id: Date.now(),
    username: data.username,
    password: hashUserPassword(data.password),
    updateTime: time,
    createTime: time
  };

  const sql = MySqlCreator.insertOne(DatabaseTable.tbUser, saveData);

  try {
    await MysqlDBPool.query(sql);
    return ResultJson.success(null);
  } catch (error) {
    throw createQueryError(error);
  }
});
