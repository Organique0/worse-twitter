import { getTweetById } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweets";

type MyFancyAuthType = {
  id: string
}

export default defineEventHandler(async (event) => {

  const { id } = event.context.params as unknown as MyFancyAuthType;

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      MediaFiles: true,
      replyTo: {
        include: {
          author: true
        }
      },
      replies: {
        include: {
          MediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true
            }
          }
        }
      }
    }
  });

  return {
    'tweet': tweetTransformer(tweet),
  }
})
