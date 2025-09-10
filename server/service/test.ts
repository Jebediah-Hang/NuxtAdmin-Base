export class TestService {
  @RequireAuth
  static async test(event: H3Event) {
    await delay(1000);
    return ResultJson.success("hello test !!!");
  }
}
