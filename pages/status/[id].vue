<template>
  <div>
    <MainSection title="Tweet" :loading="loading">

      <head>
        <Title></Title>
      </head>
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>

<script setup>
  const loading = ref(false);
  const tweet = ref(null);
  const { getTweetById } = useTweets();
  const { useAuthUser } = useAuth();

  const user = useAuthUser();

  watch(() => useRoute().fullPath, () => getTweet());

  function getTweetIdFromRoute() {
    return useRoute().params.id;
  };

  async function getTweet() {
    if (useRoute().params.id == undefined) {
      return;
    }
    loading.value = true;
    try {
      const response = await getTweetById(getTweetIdFromRoute());
      tweet.value = response.tweet;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  onBeforeMount(() => {
    getTweet()
  });
</script>