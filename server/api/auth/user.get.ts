import { userTransformer } from "~/server/transformers/users"

export default defineEventHandler(async (event) => {
  console.log(event.context.auth);
  return {
    user: userTransformer(event.context.auth?.user)
  }
})
