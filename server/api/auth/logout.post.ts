import { removeRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token");
    if (!refreshToken) {
      return;
    }
    await removeRefreshToken(refreshToken);
    sendRefreshToken(event.node.res, '');
  } catch (error) {

  }

  return { message: 'Logged out' }
})
