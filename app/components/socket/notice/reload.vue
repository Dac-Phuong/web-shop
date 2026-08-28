```vue
<template>
  <UModal
    v-model:open="modal"
    :dismissible="false"
    :ui="{
      content: 'max-w-sm rounded-2xl',
    }"
  >
    <template #content>
      <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
      >
        <!-- BODY -->
        <div class="flex flex-col items-center p-6">
          <!-- ICON -->
          <div
            class="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/10"
          >
            <UIcon
              name="i-heroicons-cloud-arrow-down"
              class="h-10 w-10 text-primary-500"
            />
          </div>

          <!-- TITLE -->
          <h3
            class="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white"
          >
            Update Now
          </h3>

          <!-- DESC -->
          <p
            class="mb-6 text-center text-sm leading-6 text-gray-500 dark:text-gray-400"
          >
            {{ notice }}
          </p>

          <!-- BUTTON -->
          <UButton
            block
            size="lg"
            color="primary"
            variant="soft"
            @click="reload"
          >
            Tải lại sau {{ num }} giây
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

const num = ref(5);

const anim = ref<NodeJS.Timeout | null>(null);

// RELOAD
const reload = () => {
  if (anim.value) {
    clearInterval(anim.value);

    anim.value = null;
  }

  navigateTo("/");

  location.reload();
};

// SOCKET
onMounted(() => {
  $socket.on("notice-reload", (data: string) => {
    notice.value = data;

    modal.value = true;

    num.value = 5;

    if (anim.value) {
      clearInterval(anim.value);
    }

    anim.value = setInterval(() => {
      num.value--;

      if (num.value <= 0) {
        reload();
      }
    }, 1000);
  });
});

// CLEANUP
onUnmounted(() => {
  if (anim.value) {
    clearInterval(anim.value);
  }

  $socket.off("notice-reload");
});
</script>
```
