import formidable from "formidable";
import { createMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweets";

interface FormParseResponse {
  fields: formidable.Fields<string>;
  files: formidable.Files<string>;
}

export interface TweetData {
  text: string,
  authorId: string
}

export interface MediaFileData {
  url: string,
  providerPublicId: string,
  userId: string,
  tweetId: string
}

type MediaFile = formidable.File | undefined;

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise<FormParseResponse>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const userId: string = event.context?.auth?.user?.id;

  if (!fields.text) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Text is required'
    }))
  }
  const tweetData: TweetData = {
    text: fields.text.join(''),
    authorId: userId,
  };
  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async key => {
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
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet)
  }
})
