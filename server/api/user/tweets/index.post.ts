import formidable from "formidable";
import { mediaFilesType } from "~/composables/useTweets";
import { createMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweets";

interface FormParseResponse {
  fields: formidable.Fields<string>;
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
    form.parse(event.node.req, (err, fields) => {
      if (err) {
        reject(err);
      }
      resolve({ fields });
    });
  });

  const { fields } = response;
  /*   if (fields.formData) {
      console.log(fields.formData);
      const parsed = JSON.parse(fields.formData[0]);
      console.log(parsed);
    } */
  //console.log(JSON.parse(fields.formData[0]));
  const parsed: undefined | mediaFilesType[] = fields.formData && JSON.parse(fields.formData[0]);

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
    tweet: fields
  }
})
