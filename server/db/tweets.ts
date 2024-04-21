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