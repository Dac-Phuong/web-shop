<template>
  <UModal
    v-model:open="modal"
    :dismissible="false"
    :ui="{
      content: 'max-w-2xl rounded-2xl',
    }"
  >
    <template #content>
      <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
      >
        <!-- HEADER -->
        <div
          class="flex items-start gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-800"
        >
          <!-- ICON -->
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10"
          >
            <img
              src="/images/icon/notify.png"
              alt="Notify"
              class="h-10 w-10 object-contain"
            />
          </div>

          <!-- TITLE -->
          <div class="flex-1">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Thông báo
            </h3>

            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-400"
            >
              Thông báo từ hệ thống
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
        <div class="p-5">
          <div
            class="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/5"
          >
            <UiEditorContent
              :content="notice"
              class="prose prose-sm dark:prose-invert max-w-none"
            />
          </div>

          <!-- FOOTER -->
          <div class="mt-5 flex items-center justify-end gap-3">
            <USwitch v-model="display" />

            <span
              class="text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Không hiển thị lại
            </span>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const modal = ref(false);

const notice = ref("Chưa có thông báo");

const display = ref(false);

const HIDE_HOURS = 5;

// COOKIE
const hideNotice = useCookie<string | null>(
  "hide_system_notice",
  {
    maxAge: HIDE_HOURS * 60 * 60,
    sameSite: "lax",
  }
);

// GET DATA
const getData = async () => {
  try {
    // Đã ẩn trước đó
    if (hideNotice.value) {
      return;
    }

    const res = await useAPI(
      "socket/public/notify/system-default"
    );

    notice.value = res?.content ?? "";

    if (res?.display == 1) {
      modal.value = true;
    }
  } catch (e) {
    console.log(e);
  }
};

// WATCH HIDE
watch(display, (val) => {
  if (val) {
    hideNotice.value = "1";

    modal.value = false;
  } else {
    hideNotice.value = null;
  }
});

// INIT
onMounted(() => {
  getData();
});
</script>
