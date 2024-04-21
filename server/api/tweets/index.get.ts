import { tweetTransformer } from '~/server/transformers/tweets';
import { getTweets } from '../../../server/db/tweets';
import { MyTweetType } from '~/server/transformers/mediaFiles';

export default defineEventHandler(async (event) => {
  const tweets = await getTweets<MyTweetType>({
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
          author: true
        }
      },
    },
    orderBy: [
      {
        createdAt: "desc"
      }
    ]
  });
  return {
    tweets: tweets.map(tweetTransformer)
  }
})
