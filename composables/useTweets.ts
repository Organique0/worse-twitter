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
  }

  return {
    postTweet,
    getHomeTweets,
  }
}
