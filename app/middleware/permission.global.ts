export default defineNuxtRouteMiddleware((from, to) => {
  // console.log('defineNuxtRouteMiddleware ', from.path, '->', to.path)
  const { loggedIn, session } = useUserSession();
  console.log("router auth ==>", session.value);

  // // redirect the user to the login screen if they're not authenticated
  // if (!loggedIn.value) {
  //   return navigateTo("/login");
  // }
});
