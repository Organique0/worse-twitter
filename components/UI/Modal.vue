<template>
  <div>
    <UModal v-model="postTweetModal">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Modal
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="emits('onClose')" />
          </div>
        </template>
      </UCard>
      <div class="p-4">
        <slot></slot>
      </div>
    </UModal>
  </div>
</template>

<script setup>
  const { usePostTweetModal } = useTweets();
  const emits = defineEmits(['onClose']);
  const postTweetModal = usePostTweetModal();
</script>