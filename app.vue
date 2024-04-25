<template>
  <div>
    <div class="bg-white dark:bg-dim-900">
      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-10">

          <div class="col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal" />
            </div>
          </div>

          <main class="col-span-10 md:col-span-6">
            <router-view />
          </main>

          <div class="hidden md:block md:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>

        </div>
      </div>

      <AuthPage v-else />

      <UIModal @on-close="handleModalClose">
        <TweetForm :user="user" @onSuccess="handleFormSuccess" :replyTo="replyTweet" showReply />
      </UIModal>
    </div>
  </div>
</template>
<script setup>
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === 'dark');
  const toggleDarkMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  };

  const { useAuthUser, initAuth, useAuthLoading } = useAuth();
  const user = useAuthUser();
  const isAuthLoading = useAuthLoading();
  const { closePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets();
  const emitter = useEmitter();
  const replyTweet = useReplyTweet();

  emitter.$on('toggleDarkMode', toggleDarkMode);
  emitter.$on('replyTweet', (tweet) => {
    openPostTweetModal(tweet);
  });

  onBeforeMount(() => {
    initAuth();
  });

  function handleFormSuccess(tweet) {
    closePostTweetModal();
    navigateTo({
      path: `/status/${tweet.id}`
    });
  };

  function handleModalClose() {
    closePostTweetModal();
  };

  function handleOpenTweetModal() {
    openPostTweetModal(null);
  };

</script>