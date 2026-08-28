<template>
  <UForm :state="state" :validate="validate" class="space-y-5" @submit="submit">
    <!-- USERNAME -->
    <UFormField label="Tài khoản" name="username">
      <UInput
        v-model="state.username"
        icon="i-heroicons-user"
        size="xl"
        placeholder="Nhập tài khoản..."
        class="w-full"
      />
    </UFormField>

    <!-- PASSWORD -->
    <UFormField label="Mật khẩu" name="password">
      <UInput
        v-model="state.password"
        icon="i-heroicons-lock-closed"
        type="password"
        size="xl"
        placeholder="Nhập mật khẩu..."
        class="w-full"
      />
    </UFormField>

    <!-- ACTION -->
    <div class="flex items-center justify-between pt-2">
      <!-- REGISTER -->
      <button
        type="button"
        :disabled="loading"
        class="text-sm font-medium text-gray-500 transition hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        @click="emit('up')"
      >
        Bạn chưa có tài khoản?
      </button>

      <!-- SUBMIT -->
      <UButton
        type="submit"
        :loading="loading"
        size="lg"
        color="primary"
        class="px-5"
      >
        Đăng nhập
      </UButton>
    </div>
  </UForm>
</template>

<script setup>
const toast = useToast();
const emit = defineEmits(["done", "up"]);
const loading = ref(false);

const state = reactive({
  username: "",
  password: "",
});

// VALIDATE
const validate = (state) => {
  const errors = [];
  if (!state.username)
    errors.push({ name: "username", message: "Vui lòng nhập tài khoản" });
  if (!state.password)
    errors.push({ name: "password", message: "Vui lòng nhập mật khẩu" });

  return errors;
};

// SUBMIT
const submit = async () => {
  try {
    loading.value = true;
    await useAPI("auth/public/sign/in", JSON.parse(JSON.stringify(state)));
    emit("done");
  } catch (e) {
    // toast.add({ title: "Đăng nhập thất bại", description: "Vui lòng kiểm tra lại thông tin đăng nhập" });
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
