import client from ".";
import { TweetData } from "../api/user/tweets/index.post";

export const createTweet = (tweetData: TweetData) => {
    return client.tweet.create({
        data: tweetData
    });
};