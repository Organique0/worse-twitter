import { Tweet } from "@prisma/client";
import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./users";
//@ts-expect-error
import human from "human-time";
import { MyTweetType, TransformedTweet } from "../api/user/tweets/index.post";

export const tweetTransformer = (tweet: MyTweetType): TransformedTweet => {
	return {
		id: tweet.id,
		text: tweet.text,
		MediaFiles: !!tweet.MediaFiles
			? tweet.MediaFiles.map(mediaFileTransformer)
			: [],
		author: !!tweet.author ? userTransformer(tweet.author) : null,
		replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		repliesCount: !!tweet.replies ? tweet.replies.length : 0,
		postedAtHuman: human(tweet.createdAt),
	};
};
