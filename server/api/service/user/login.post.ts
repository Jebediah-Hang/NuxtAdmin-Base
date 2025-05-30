import type { User } from '@/types/models/user';

export default defineEventHandler(async (event) => {
  const data: User = await readBody(event);

  const userData: Partial<User> = {
    username: data.username,
    password: hashUserPassword(data.password)
  };

  const sql = MySqlCreator.selectEqual(DatabaseTable.tbUser, userData);

  try {
    const result: any = await MysqlDBPool.query(sql);
    const users: Array<User> = result[0];
    if (users.length === 1) {
      const loginUser = users[0];
      const token = createJwtToken(loginUser);
      return ResultJson.success(token);
    } else {
      return ResultJson.failed(400);
    }
  } catch (error) {
    throw createQueryError(error);
  }
});
