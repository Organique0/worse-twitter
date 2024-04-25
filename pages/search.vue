<template>
  <div>
    <MainSection title="Search" :loading="loading">

      <head>
        <Title>Search</Title>
      </head>

      {{ searchQuery }}

      <TweetListFeed :tweets="SearchTweets" />
    </MainSection>
  </div>
</template>
<script setup>
  const { getTweets: getTweetsComposable } = useTweets();
  const loading = ref(false);
  const SearchTweets = ref([]);
  const searchQuery = computed(() => useRoute().query.query);

  watch(() => useRoute().fullPath, () => getTweets());

  onBeforeMount(async () => {
    getTweets();
  });

  async function getTweets() {
    loading.value = true;
    try {
      const { tweets } = await getTweetsComposable({
        query: searchQuery.value
      });
      SearchTweets.value = tweets;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

</script>