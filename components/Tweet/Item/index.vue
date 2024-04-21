<template>
  <div>

    <TweetItemHeader :tweet="props.tweet" />

    <div class="ml-16">
      <p class="flex-shink font-medium text-gray-800 w-auto dark:text-white">
        {{ props.tweet.text }}
      </p>

      <div v-for="image in tweet.MediaFiles" :key="image.id">
        <UCarousel v-slot="{ item }" :items="tweet.MediaFiles" :ui="{ item: 'basis-full' }" class="
          mx-auto rounded-2xl overflow-hidden w-[70%]" :class="twitterBorderColor" :indicators="multipleImages">
          <CldImage :src="item.url" width="350" height="350" alt="Tweet Image" class="rounded-2xl mx-auto" />
        </UCarousel>
      </div>

      <div class="mt-2">
        <TweetItemActions :tweet="props.tweet"/>
      </div>

    </div>
  </div>
</template>

<script setup>
  const { twitterBorderColor } = useTailwindConfig();
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    }
  });

  const multipleImages = computed(() => props.tweet.MediaFiles.length > 1);
</script>