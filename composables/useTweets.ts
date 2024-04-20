import type { Tweet } from "@prisma/client";

export interface mediaFilesType {
  secure_url: string,
  public_id: string,
}

export default () => {
  const postTweet = (formData: { text: string, mediaFiles: mediaFilesType[] }) => {
    const form = new FormData();
    form.append('text', formData.text);
    form.append('formData', JSON.stringify(formData.mediaFiles));
    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form
    });
  }

  return {
    postTweet
  }
}
