<template>
  <div class="flex items-center gap-2">
    <UButton
      icon="i-heroicons-user"
      color="neutral"
      variant="soft"
      class="bounce-anim px-4 whitespace-nowrap"
      @click="
        tabItem = 0;
        modal = true;
      "
    >
      Tài khoản
    </UButton>

    <!-- MODAL -->
    <UModal
      v-model:open="modal"
      :ui="{
        content: 'max-w-lg rounded-2xl',
      }"
    >
      <template #content>
        <div
          class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          <div class="flex items-start gap-4 p-4">
            <div class="flex-1">
              <h2 class="SVN text-2xl font-bold text-gray-900 dark:text-white">
                {{ configStore.config.name }}
              </h2>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{
                  tabItem === 0
                    ? "Đăng nhập tài khoản của bạn"
                    : "Đăng ký tài khoản mới"
                }}
              </p>
            </div>

            <!-- CLOSE -->
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              square
              @click="modal = false"
            />
          </div>

          <!-- BODY -->
          <div class="p-6">
            <LazyAuthSignIn
              v-if="tabItem === 0"
              @up="tabItem = 1"
              @done="doneIn"
            />

            <LazyAuthSignUp
              v-if="tabItem === 1"
              @in="tabItem = 0"
              @done="doneUp"
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const configStore = useConfigStore();
const authStore = useAuthStore();
const modal = ref(false);
const tabItem = ref(0);

// WATCH STORE MODAL
watch(
  () => authStore.modal,
  (val) => {
    if (val) {
      modal.value = true;
    }
  },
);

// CLOSE MODAL
watch(modal, (val) => {
  if (!val) {
    authStore.setModal(false);
  }
});

// LOGIN SUCCESS
const doneIn = async () => {
  modal.value = false;

  await nextTick();

  await authStore.setAuth();
};

// REGISTER SUCCESS
const doneUp = async () => {
  modal.value = false;

  await nextTick();

  await authStore.setAuth();

  navigateTo("/thankyou");
};
</script>
