<template>
  <UModal
    v-model:open="modal"
    :dismissible="false"
    :ui="{
      content: 'max-w-xl rounded-2xl',
    }"
  >
    <template #content>
      <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
      >
        <!-- HEADER -->
        <div
          class="flex items-center gap-3 border-b border-gray-200 px-5 py-4 dark:border-gray-800"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          >
            <UIcon
              name="i-heroicons-bell-alert"
              class="h-6 w-6"
            />
          </div>

          <div class="flex-1">
            <h3
              class="text-base font-semibold text-gray-900 dark:text-white"
            >
              Thông báo
            </h3>

            <p
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              Tin nhắn từ quản trị viên
            </p>
          </div>
        </div>

        <!-- BODY -->
        <div class="p-5">
          <UiEditorContent
            :content="notice"
            class="prose prose-sm dark:prose-invert max-w-none"
          />
        </div>

        <!-- FOOTER -->
        <div
          class="flex justify-end border-t border-gray-200 px-5 py-4 dark:border-gray-800"
        >
          <UButton
            color="neutral"
            variant="soft"
            @click="modal = false"
          >
            Đóng
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { $socket } = useNuxtApp();

const modal = ref(false);

const notice = ref<string | null>(null);

onMounted(() => {
  $socket.on("notice-system", (data: string) => {
    notice.value = data;

    modal.value = true;
  });
});

onUnmounted(() => {
  $socket.off("notice-system");
});
</script>
