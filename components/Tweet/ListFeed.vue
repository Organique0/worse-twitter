<template>
  <div>

    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">
        No Tweets😢
      </p>
    </div>

    <div class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300" :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in props.tweets">
      <TweetItem :tweet="tweet" :key="tweet.id" @click.native="redirect(tweet)" compact />
    </div>
  </div>
</template>

<script setup>
  const { twitterBorderColor, defaultTransition } = useTailwindConfig();
  const props = defineProps({
    tweets: {
      type: Array,
      required: true
    }
  });

  const isEmptyArray = computed(() => props.tweets.length === 0);

  function redirect(tweet) {
    navigateTo({ path: `/status/${tweet.id}`, state: { tweet } });
  }

</script>
