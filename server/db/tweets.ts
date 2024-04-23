import client from ".";
import { PostTweetData } from "../api/user/tweets/index.post";

export const createTweet = (tweetData: PostTweetData) => {
    return client.tweet.create({
        data: tweetData
    });
};


export const getTweets = <T>(params = {}): Promise<T[]> => {
    return client.tweet.findMany({
        ...params
    }) as Promise<T[]>;
};


export const getTweetById = (tweetId: string, params = {}) => {
    return client.tweet.findUnique({
        ...params,
        where: {
            //@ts-expect-error
            ...params.where,
            id: tweetId
        }
    });
}