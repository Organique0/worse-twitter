<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center p-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput :user="user" @onSubmit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup>
  const loading = ref(false);
  const { postTweet } = useTweets();
  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  async function handleFormSubmit(data) {
    loading.value = true;
    try {
      await postTweet(data);
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
</script>
