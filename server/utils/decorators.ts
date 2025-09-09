export function RequireAuth<T, A extends Array<any>, R>(
  target: (this: T, ...args: A) => R,
  ctx: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
) {
  function auth(this: T, ...args: A): R {
    const event: H3Event = args[0];
    const authToken = getHeader(event, "Authorization");

    if (!authToken) {
      setResponseStatus(event, 401);
      return <R>ResultJson.failed(401, "Unauthorized");
    }

    const res = target.call(this, ...args);
    return res;
  }

  return auth;
}
