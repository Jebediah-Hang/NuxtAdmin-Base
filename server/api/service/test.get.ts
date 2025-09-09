class Controller {
  @RequireAuth
  static test(event: H3Event) {
    console.log("receive");
    return ResultJson.success("hello test 111");
  }
}

export default defineEventHandler(Controller.test);
