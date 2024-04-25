import { tweetTransformer } from '~/server/transformers/tweets';
import { getTweets } from '../../../server/db/tweets';
import { MyTweetType } from "../user/tweets/index.post";
import { MyFancyAuthType } from './[id].get';

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);
  let prismaQuery: Object = {
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
  };

  if (!!query) {
    prismaQuery = {
      ...prismaQuery,
      where: {
        text: {
          contains: query
        }
      }
    }
  };

  const tweets = await getTweets<MyTweetType>(prismaQuery);
  return {
    tweets: tweets.map(tweetTransformer)
  }
})
