import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { getUserById } from "../db/Users";

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    //'/api/tweets'
  ];

  const isHandledByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url!);

  });

  if (!isHandledByThisMiddleware) {
    return;
  };

  const token = event.node.req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return sendError(event, createError({
      statusMessage: "no token (middleware)",
      statusCode: 401,
    }));
  }

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'could not decode (middleware)'
    }));
  };

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error: any) {
    return sendError(event, createError({
      statusMessage: "Could not retrieve the user data (middleware)",
      statusText: error,
      statusCode: 401,
    }));
  }
})
