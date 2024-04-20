<template>
  <div>
    <TweetFormInput :user="user" @onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
  const { postTweet } = useTweets();
  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  async function handleFormSubmit(data) {
    try {
      const response = await postTweet(data);
    } catch (error) {
      console.log(error);
    }
  }
</script>
