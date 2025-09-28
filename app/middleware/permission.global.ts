export default defineNuxtRouteMiddleware((from, to) => {
  console.log('routeMiddleware ', from.path, '->', to.path)
  const { loggedIn, session } = useUserSession();
  console.log("router auth ==>", loggedIn.value, session.value?.expiredTime);

  // // redirect the user to the login screen if they're not authenticated
  // if (!loggedIn.value) {
  //   return navigateTo("/login");
  // }
});
