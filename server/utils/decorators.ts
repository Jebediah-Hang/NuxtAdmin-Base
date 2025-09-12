type TargetMethod<T, A extends Array<any>, R> = (this: T, ...args: A) => R;

export function RequireAuth<T, A extends Array<any>, R>(
  target: TargetMethod<T, A, R>,
  ctx: ClassMethodDecoratorContext<T, TargetMethod<T, A, R>>
) {
  async function auth(this: T, ...args: A): Promise<R> {
    const event: H3Event = args[0];

    const userSession = await requireUserSession(event);
    console.log("auth===>", userSession);

    return target.call(this, ...args);
  }

  return <TargetMethod<T, A, R>>auth;
}
