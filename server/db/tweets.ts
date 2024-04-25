import { Tweet } from "@prisma/client";
import client from ".";
import { MyTweetType, PostTweetData } from "../api/user/tweets/index.post";

export const createTweet = (tweetData: PostTweetData): Promise<MyTweetType> => {
    return client.tweet.create({
        data: tweetData
    }) as unknown as Promise<MyTweetType>;
};


export const getTweets = <T>(params = {}): Promise<T[]> => {
    return client.tweet.findMany({
        ...params
    }) as Promise<T[]>;
};


export const getTweetById = <T>(tweetId: string, params = {}): Promise<T> => {
    return client.tweet.findUnique({
        ...params,
        where: {
            //@ts-expect-error
            ...params.where,
            id: tweetId
        }
    }) as unknown as Promise<T>;
}