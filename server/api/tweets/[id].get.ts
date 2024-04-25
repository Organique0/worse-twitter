import { getTweetById } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweets";
import { MyTweetType } from "../user/tweets/index.post";

export type MyFancyAuthType = {
  id: string
}

export default defineEventHandler(async (event) => {

  const { id } = event.context.params as unknown as MyFancyAuthType;

  const tweet = await getTweetById<MyTweetType>(id, {
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
    'tweet': tweet && tweetTransformer(tweet),
  }
})
