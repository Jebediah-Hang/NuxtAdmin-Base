import type { User } from '@/types/models/user';

export default defineEventHandler(async (event) => {
  const data: User = await readBody(event);

  const updateData: TableCommonRowData<User> = {
    username: data.username,
    password: hashUserPassword(data.password),
    updateTime: dateFormat()
  };

  const sql = MySqlCreator.updateOne(DatabaseTable.tbUser, data.id, updateData);

  try {
    await MysqlDBPool.query(sql);
    return ResultJson.success(null);
  } catch (error) {
    throw createQueryError(error);
  }
});
