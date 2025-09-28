import type { User } from "~~/types/models/user";
import type { UserSession } from "#auth-utils";

export class UserService {
  static async login(event: H3Event) {
    const data: User = await readBody(event);

    const userData: Partial<User> = {
      username: data.username,
      password: hashUserPassword(data.password)
    };

    const sql = MySql.selectEqual(DBTable.tbUser, userData);

    try {
      const result: any = await MySqlPool.query(sql);
      const users: Array<User> = result[0];

      if (users.length === 1) {
        const loginUser = users[0];

        const loginUserInfo: Partial<User> = {
          id: loginUser.id,
          username: loginUser.username,
          nickname: loginUser.nickname,
          phone: loginUser.phone,
          email: loginUser.email
        };
        const expiredTime = Date.now() + Constant.loginValidPeriod;

        const token = createJwtToken(loginUserInfo, expiredTime);

        const userSession: Partial<UserSession> = {
          user: loginUserInfo,
          expiredTime,
          token
        };
        await setUserSession(event, userSession);

        return ResultJson.success(userSession);
      } else {
        return ResultJson.failed(400);
      }
    } catch (error) {
      throw createQueryError(error);
    }
  }

  @RequireAuth
  static async register(event: H3Event) {
    const data: User = await readBody(event);

    const time = dateFormat();

    const saveData: TableCommonRowData<User> = {
      id: Date.now(),
      username: data.username,
      password: hashUserPassword(data.password),
      enable: 1,
      updateTime: time,
      createTime: time
    };

    const sql = MySql.insertOne(DBTable.tbUser, saveData);

    try {
      await MySqlPool.query(sql);
      return ResultJson.success(null);
    } catch (error) {
      throw createQueryError(error);
    }
  }

  @RequireAuth
  static async edit(event: H3Event) {
    const data: User = await readBody(event);

    const updateData: TableCommonRowData<User> = {
      username: data.username,
      password: hashUserPassword(data.password),
      updateTime: dateFormat()
    };

    const sql = MySql.updateOne(DBTable.tbUser, data.id, updateData);

    try {
      await MySqlPool.query(sql);
      return ResultJson.success(null);
    } catch (error) {
      throw createQueryError(error);
    }
  }
}
