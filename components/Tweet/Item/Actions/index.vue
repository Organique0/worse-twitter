<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-chat" :class="classes" />
      </template>

      <template v-slot:default>
        {{ props.tweet.repliesCount }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-refresh" :class="classes" />
      </template>

      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-heart" :class="classes" />
      </template>

      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>

    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue">

      <template v-slot:icon="{ classes }">
        <v-icon name="hi-upload" :class="classes" />
      </template>

      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>

    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    }
  });

  const generateRandomNumber = () => Math.floor(Math.random() * 100);
</script>
