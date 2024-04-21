<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-10">

          <div class="col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
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
    </div>
  </div>
</template>
<script setup>
  const darkMode = ref(true);
  const { useAuthUser, initAuth, useAuthLoading } = useAuth();
  const user = useAuthUser();
  const isAuthLoading = useAuthLoading();

  onBeforeMount(() => {
    initAuth();
  })
</script>