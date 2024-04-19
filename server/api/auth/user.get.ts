import { userTransformer } from "~/server/transformers/users"

export default defineEventHandler(async (event) => {
  if (!event.context.auth?.user) {
    return sendError(event, createError({
      statusMessage: "unauthorized",
      statusCode: 401,
    }));
  }
  else {
    return {
      user: userTransformer(event.context.auth?.user)
    }
  }
})
