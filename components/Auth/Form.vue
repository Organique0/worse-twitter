<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <UIInput label="Username" placeholder="@username" type="text" v-model="data.username" />
      <UIInput label="Password" placeholder="*********" type="password" v-model="data.password" />
      <UIButton liquid :disabled="isButtonDisabled" @click="handleLogin">
        Login
      </UIButton>
    </div>
  </div>
</template>

<script setup>
  const { login } = useAuth();
  const data = reactive({
    username: '',
    password: '',
    loading: false
  });

  async function handleLogin() {
    data.loading = true;
    try {
      await login({
        username: data.username,
        password: data.password
      });
    } catch (error) {
      console.error(error);
    } finally {
      data.loading = false;
    }
  };

  const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
  })
</script>
