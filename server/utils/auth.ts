type TargetMethod<T, A extends Array<any>, R> = (this: T, ...args: A) => R;

function authFailed(event: H3Event) {
  setResponseStatus(event, 401);
  return ResultJson.failed(401);
}

export function RequireAuth<T, A extends Array<any>, R>(
  target: TargetMethod<T, A, R>,
  ctx: ClassMethodDecoratorContext<T, TargetMethod<T, A, R>>
) {
  async function auth(this: T, ...args: A): Promise<R> {
    const event: H3Event = args[0];

    try {
      const userSession = await requireUserSession(event);
      const { token, expiredTime } = userSession;

      const tokenPayload: any = verifyJwtToken(token);
      const { expiredTime: tokenExpiredTime } = tokenPayload;

      if (tokenExpiredTime !== expiredTime) {
        return <R>authFailed(event);
      }
      if (tokenExpiredTime < Date.now()) {
        return <R>authFailed(event);
      }

      return target.call(this, ...args);
    } catch (error) {
      return <R>authFailed(event);
    }
  }

  return <TargetMethod<T, A, R>>auth;
}
