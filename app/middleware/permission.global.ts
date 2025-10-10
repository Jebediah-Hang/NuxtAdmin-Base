export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/login") {
    if (!isValidLogin()) {
      return navigateTo("/login");
    }
  }
});
