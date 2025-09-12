export class UserService {
  static async login(event: H3Event) {
    const data = {
      user: {
        id: "1",
        name: "aaa"
      },
      token: "qwerasdfzxcv"
    };

    await setUserSession(event, data);

    return ResultJson.success(data);
  }
}
