import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./users";
import human from "human-time";
export const tweetTransformer = (tweet) => {
	return {
		id: tweet.id,
		text: tweet.text,
		MediaFiles: !!tweet.MediaFiles
			? tweet.MediaFiles.map(mediaFileTransformer)
			: [],
		author: !!tweet.author ? userTransformer(tweet.author) : null,
		replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		repliesCount: !!tweet.replies ? tweet.replies.lengts : 0,
		postedAtHuman: human(tweet.createdAt),
	};
};
