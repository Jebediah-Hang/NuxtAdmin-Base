export class TestService {
  @RequireAuth
  static async test(event: H3Event) {
    await delay(100);
    return ResultJson.success("hello test !!!");
  }
}
