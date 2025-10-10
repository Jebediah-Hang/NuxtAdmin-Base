export function isValidLogin() {
  const { loggedIn, session } = useUserSession();
  return Boolean(
    loggedIn.value && session.value?.expiredTime && session.value?.expiredTime > Date.now()
  );
}
