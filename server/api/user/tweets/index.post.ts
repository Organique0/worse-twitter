import { MediaFile, User } from "@prisma/client";
import formidable from "formidable";
import { mediaFilesType } from "~/composables/useTweets";
import { createMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweets";


interface FormParseResponse {
  fields: formidable.Fields<string>;
}

export interface UserWithoutPass extends Omit<User, 'password' | 'createdAt' | 'updatedAt'> {
  handle: string,
}

export interface PostTweetData {
  text: string,
  authorId: string,
  replyToId?: string,
}

export interface MediaFileData {
  url: string,
  providerPublicId: string,
  userId: string,
  tweetId: string
}
export interface MyTweetType {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: string;
  replyToId?: string;
  replyTo?: MyTweetType;
  replies: MyTweetType[];
  MediaFiles: MediaFile[];
}

export interface TransformedTweet {
  id: string,
  text: string,
  author: UserWithoutPass | null,
  replies: TransformedTweet[],
  repliesCount: number,
  postedAtHuman: string,
  MediaFiles: {
    id: string,
    url: string,
  }[],
  replyTo: {
    id: string,
    text: string,
  } | null,

}

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise<FormParseResponse>((resolve, reject) => {
    form.parse(event.node.req, (err, fields) => {
      if (err) {
        reject("could not parse form");
      }
      resolve({ fields });
    });
  });

  const { fields } = response;
  //console.log(fields);

  const parsed: undefined | mediaFilesType[] = fields.formData && JSON.parse(fields.formData[0]);

  const userId: string = event.context?.auth?.user?.id;

  if (!fields.text) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Text is required'
    }));
  };

  const tweetData: PostTweetData = {
    text: fields.text.join(''),
    authorId: userId,
  };


  if (fields.replyTo && fields.replyTo[0] != 'undefined' && fields.replyTo[0] != 'null') {
    const replyTo = fields.replyTo[0];
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  if (parsed) {
    const mediaPromises = parsed.map(element => {
      return createMediaFile({
        url: element.secure_url,
        providerPublicId: element.public_id,
        userId: userId,
        tweetId: tweet.id
      });
    });

    await Promise.all(mediaPromises);
  } else {
    console.log("no parsed");
  }


  /*  const filePromises = Object.keys(files).map(async key => {
      const fileArray = files[key] as formidable.File[];
      return Promise.all(fileArray.map(async file => {
        const cloudinaryResource = await uploadToCloudinary(file.filepath);
        return createMediaFile({
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          userId: userId,
          tweetId: tweet.id
        });
      }));
    }); */

  //await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet)
  }
})
