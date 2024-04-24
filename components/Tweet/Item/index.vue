<template>
  <div>

    <TweetItemHeader :tweet="props.tweet" />

    <div class="tweetBodyWrapper">
      <p class="flex-shink font-medium text-gray-800 w-auto dark:text-white p-2" :class="textSize">
        {{ props.tweet.text }}
      </p>

      <div v-for="image in tweet.MediaFiles" :key="image.id">
        <UCarousel v-slot="{ item }" :items="tweet.MediaFiles" :ui="{ item: 'basis-full' }" class="
          mx-auto rounded-2xl overflow-hidden w-[70%]" :class="twitterBorderColor" :indicators="multipleImages">
          <CldImage :src="item.url" width="350" height="350" alt="Tweet Image" class="rounded-2xl mx-auto" />
        </UCarousel>
      </div>

      <div class="mt-2" v-if="!props.hideActions">
        <TweetItemActions :tweet="props.tweet" :compact="props.compact" @on-comment-click="handleCommentClick" />
      </div>

    </div>
  </div>
</template>

<script setup>
  const { twitterBorderColor } = useTailwindConfig();
  const emitter = useEmitter();
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
  });

  const multipleImages = computed(() => props.tweet.MediaFiles.length > 1);
  const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2 mt-4');
  const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl');


  function handleCommentClick() {
    emitter.$emit('replyTweet', props.tweet);
  }
</script>