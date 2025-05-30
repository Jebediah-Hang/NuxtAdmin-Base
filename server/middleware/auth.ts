export default defineEventHandler(async (event) => {

  const requestPath = getRequestURL(event).pathname;

  if (authApiSets.has(requestPath)) {

    const token = getHeader(event, 'Authorization')?.split(' ')[1];

    try {
      verifyJwtToken(token);
    } catch (error) {
      setResponseStatus(event, 401);
      return null;
    }
  }
});
