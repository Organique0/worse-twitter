export interface mediaFilesType {
  secure_url: string,
  public_id: string,
}

export default () => {
  const postTweet = (formData: { text: string, mediaFiles: mediaFilesType[], replyTo: string }) => {
    const form = new FormData();
    form.append('text', formData.text);
    form.append('replyTo', formData.replyTo)
    formData.mediaFiles && form.append('formData', JSON.stringify(formData.mediaFiles));
    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form
    });
  };

  const getHomeTweets = () => {
    return new Promise((resolve, reject) => {
      try {
        const response = useFetchApi('/api/tweets', {
          method: 'GET'
        });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    })
  };

  const getTweetById = (tweetId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: 'GET'
        });
        resolve(response);
      } catch (err) {
        reject(err);
      }
    })
  }

  return {
    postTweet,
    getHomeTweets,
    getTweetById
  }
}
