<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon @on-click="emits('onCommentClick')" color="blue" :size="size">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-chat" :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ props.tweet.repliesCount }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">

      <template " v-slot:icon="{ classes }">
        <v-icon name="hi-refresh" :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-heart" :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-upload" :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        <span>
          {{ generateRandomNumber() }}
        </span>
      </template>

    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
  const emits = defineEmits(['onCommentClick']);
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: null,
    }
  });

  const showStats = computed(() => props.compact);
  const size = computed(() => props.compact ? 5 : 8);
  const generateRandomNumber = () => Math.floor(Math.random() * 100);
</script>
