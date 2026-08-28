<template>
  <UForm :state="state" :validate="validate" class="space-y-5" @submit="submit">
    <!-- USERNAME -->
    <UFormField
      name="username"
      :hint="`${state.username.length}/15`"
      label="Tài khoản"
    >
      <UInput
        v-model="state.username"
        icon="i-heroicons-user"
        size="xl"
        placeholder="Nhập tài khoản..."
        class="w-full"
      />
    </UFormField>

    <!-- EMAIL -->
    <UFormField name="email" label="Email">
      <UInput
        v-model="state.email"
        icon="i-heroicons-envelope"
        type="email"
        size="xl"
        placeholder="Nhập email..."
        class="w-full"
      />
    </UFormField>

    <!-- PHONE -->
    <UFormField name="phone" label="Điện thoại">
      <UInput
        v-model="state.phone"
        icon="i-heroicons-phone"
        size="xl"
        placeholder="Nhập số điện thoại..."
        class="w-full"
      />
    </UFormField>

    <!-- PASSWORD -->
    <UFormField
      name="password"
      :hint="`${state.password.length}/15`"
      label="Mật khẩu"
    >
      <UInput
        v-model="state.password"
        icon="i-heroicons-lock-closed"
        type="password"
        size="xl"
        placeholder="Nhập mật khẩu..."
        class="w-full"
      />
    </UFormField>

    <!-- REFERRAL -->
    <UFormField
      v-if="configStore.config.enable.referral"
      name="referral_code"
      label="Mã mời"
    >
      <UInput
        v-model="state.referral_code"
        icon="i-heroicons-qr-code"
        size="xl"
        placeholder="Nhập mã mời nếu có..."
        class="w-full"
      />
    </UFormField>

    <!-- ACTION -->
    <div class="flex items-center justify-between pt-2">
      <!-- LOGIN -->
      <button
        type="button"
        :disabled="loading"
        class="text-sm font-medium text-gray-500 transition hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        @click="emit('in')"
      >
        Bạn đã có tài khoản?
      </button>

      <!-- SUBMIT -->
      <UButton
        type="submit"
        :loading="loading"
        size="lg"
        color="primary"
        class="px-5"
      >
        Đăng ký
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
const configStore = useConfigStore();

const emit = defineEmits<{
  done: [];
  in: [];
}>();

const loading = ref(false);

const state = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  referral_code: "",
});

// VALIDATE
const validate = (state: any) => {
  const errors = [];

  // USERNAME
  if (!state.username) {
    errors.push({
      name: "username",
      message: "Vui lòng nhập tài khoản",
    });
  } else if (state.username.length < 6 || state.username.length > 12) {
    errors.push({
      name: "username",
      message: "Độ dài 6-12 ký tự",
    });
  } else if (/\s/g.test(state.username)) {
    errors.push({
      name: "username",
      message: "Không được chứa khoảng trắng",
    });
  } else if (!/^[a-z0-9]*$/g.test(state.username)) {
    errors.push({
      name: "username",
      message: "Không chứa ký tự đặc biệt hoặc chữ in hoa",
    });
  } else if (
    state.username.includes("admin") ||
    state.username.includes("smod") ||
    state.username.includes("robot")
  ) {
    errors.push({
      name: "username",
      message: "Tên tài khoản không hợp lệ",
    });
  }

  // EMAIL
  if (!state.email) {
    errors.push({
      name: "email",
      message: "Vui lòng nhập email",
    });
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.email)) {
    errors.push({
      name: "email",
      message: "Email không đúng định dạng",
    });
  }

  // PHONE
  if (!state.phone) {
    errors.push({
      name: "phone",
      message: "Vui lòng nhập số điện thoại",
    });
  } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(state.phone)) {
    errors.push({
      name: "phone",
      message: "Số điện thoại không đúng định dạng",
    });
  }

  // PASSWORD
  if (!state.password) {
    errors.push({
      name: "password",
      message: "Vui lòng nhập mật khẩu",
    });
  } else if (state.password.length < 6 || state.password.length > 15) {
    errors.push({
      name: "password",
      message: "Độ dài 6-15 ký tự",
    });
  } else if (/\s/g.test(state.password)) {
    errors.push({
      name: "password",
      message: "Không được chứa khoảng trắng",
    });
  }

  return errors;
};

// SUBMIT
const submit = async () => {
  try {
    loading.value = true;

    await useAPI("auth/public/sign/up", JSON.parse(JSON.stringify(state)));

    emit("done");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
