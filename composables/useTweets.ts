import type { Tweet } from "@prisma/client";

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

  const getTweets = (params = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const response = useFetchApi('/api/tweets', {
          method: 'GET',
          params
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
  };

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  };

  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;

    setReplyTo(tweet);
  };

  const usePostTweetModal = () => useState('post_tweet_modal', () => false);
  const useReplyTweet = () => useState<Tweet | null>('reply_tweet', () => null);

  const setReplyTo = (tweet: Tweet | null) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  };

  return {
    postTweet,
    getTweets,
    getTweetById,
    closePostTweetModal,
    usePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
  }
}
