<template>
  <header
    class="sticky top-0 z-50 h-[var(--header-size)] border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-950/85"
  >
    <div class="h-full px-4">
      <div class="flex h-full items-center justify-between">
        <div class="flex min-w-0 items-center gap-3">
          <!-- MOBILE MENU -->
          <USlideover v-model:open="open" class="w-[300px]">
            <UButton
              icon="i-heroicons-bars-3"
              color="neutral"
              variant="ghost"
              class="size-11 rounded-2xl border border-slate-200/70 bg-white/70 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-900 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 xl:hidden"
            />

            <template #content>
              <div class="flex h-full flex-col bg-white dark:bg-slate-950">
                <!-- MOBILE HEADER -->
                <div
                  class="flex h-[var(--header-size)] items-center justify-between border-b border-slate-200/70 px-4 dark:border-slate-800"
                >
                  <div class="flex items-center gap-3">
                    <!-- LOGO -->
                    <div
                      class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                    >
                      <UIcon name="i-heroicons-squares-2x2" class="size-5" />
                    </div>

                    <div>
                      <p
                        class="text-[13px] font-black tracking-tight text-slate-900 dark:text-white"
                      >
                        Manage Panel
                      </p>

                      <p
                        class="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400"
                      >
                        Admin Dashboard
                      </p>
                    </div>
                  </div>

                  <UButton
                    icon="i-heroicons-x-mark"
                    color="neutral"
                    variant="ghost"
                    class="size-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
                    @click="open = false"
                  />
                </div>

                <!-- MOBILE NAV -->
                <div class="flex-1 overflow-y-auto">
                  <LayoutManageNav />
                </div>
              </div>
            </template>
          </USlideover>
          <NuxtLink to="/manage" class="group flex min-w-0 items-center gap-3">
            <div
              class="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 sm:flex"
            >
              <UIcon name="i-heroicons-squares-2x2" class="size-5" />
            </div>

            <div class="hidden min-w-0 sm:block">
              <p
                class="truncate text-[13px] font-black tracking-[0.18em] text-slate-900 dark:text-white"
              >
                Dashboard
              </p>

              <p
                class="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400"
              >
                Quản lý hệ thống
              </p>
            </div>
          </NuxtLink>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <UPopover v-model:open="notifyOpen">
            <UButton
              color="neutral"
              variant="ghost"
              class="group relative size-11 rounded-2xl border border-transparent transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-blue-900 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
              @click="openNotify"
            >
              <UIcon
                name="i-heroicons-bell"
                class="size-[19px] transition-transform duration-300 group-hover:-rotate-6"
              />
              <span
                v-if="unread > 0"
                class="absolute right-1 top-1 flex min-w-[18px] h-[18px] items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-red-500 to-rose-600 px-1 text-[8px] font-black text-white shadow-lg shadow-red-500/30 dark:border-slate-950"
              >
                {{ unread > 99 ? "99+" : unread }}
              </span>
              <span
                v-if="unread > 0"
                class="absolute right-[5px] top-[5px] size-2 animate-ping rounded-full bg-red-400 opacity-60"
              />
            </UButton>

            <template #content>
              <div
                class="w-[calc(100vw-24px)] max-w-[390px] overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40"
              >
                <div
                  class="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-slate-50 to-blue-50/70 px-5 py-4 dark:border-slate-800 dark:from-slate-900 dark:to-blue-950/20"
                >
                  <div
                    class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-blue-500/10 blur-2xl"
                  />

                  <div class="relative flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                      >
                        <UIcon name="i-heroicons-bell" class="size-5" />
                      </div>

                      <div>
                        <h3
                          class="text-[13px] font-black text-slate-900 dark:text-white"
                        >
                          Thông báo
                        </h3>

                        <p
                          class="mt-0.5 text-[10px] font-medium text-slate-400"
                        >
                          {{ unread }} chưa đọc
                        </p>
                      </div>
                    </div>

                    <UButton
                      icon="i-heroicons-check"
                      color="primary"
                      variant="soft"
                      size="xs"
                      label="Đã đọc"
                      class="rounded-xl font-bold"
                      @click="readAllNotify()"
                    />
                  </div>
                </div>

                <!-- NOTIFICATION LIST -->
                <div class="max-h-[480px] overflow-y-auto">
                  <!-- LOADING -->
                  <div
                    v-if="notifyLoading"
                    class="flex flex-col items-center justify-center py-16"
                  >
                    <div
                      class="flex size-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40"
                    >
                      <UIcon
                        name="i-heroicons-arrow-path"
                        class="size-5 animate-spin text-blue-500"
                      />
                    </div>

                    <p class="mt-3 text-[11px] font-medium text-slate-400">
                      Đang tải thông báo...
                    </p>
                  </div>

                  <!-- EMPTY -->
                  <div
                    v-else-if="notifications.length === 0"
                    class="flex flex-col items-center justify-center px-5 py-16 text-center"
                  >
                    <div
                      class="mb-3 flex size-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
                    >
                      <UIcon
                        name="i-heroicons-bell-slash"
                        class="size-6 text-slate-400"
                      />
                    </div>

                    <p
                      class="text-[12px] font-bold text-slate-700 dark:text-slate-200"
                    >
                      Chưa có thông báo
                    </p>

                    <p class="mt-1 text-[10px] text-slate-400">
                      Mọi hoạt động mới sẽ hiển thị tại đây
                    </p>
                  </div>

                  <!-- ITEMS -->
                  <div
                    v-for="item in notifications"
                    :key="item._id"
                    class="group cursor-pointer border-b border-slate-100 px-4 py-3 transition-all duration-200 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:bg-blue-950/20"
                    @click="navigateNotify(item)"
                  >
                    <div class="flex gap-3">
                      <!-- ICON -->
                      <div
                        class="flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
                        :class="
                          item.isRead
                            ? 'bg-slate-100 text-slate-400 dark:bg-slate-900'
                            : 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10 dark:bg-blue-950/40 dark:text-blue-400'
                        "
                      >
                        <UIcon
                          name="i-heroicons-bell-alert"
                          class="size-[18px]"
                        />
                      </div>

                      <!-- CONTENT -->
                      <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-2">
                          <p
                            class="line-clamp-1 text-[12px] font-bold"
                            :class="
                              item.isRead
                                ? 'text-slate-700 dark:text-slate-200'
                                : 'text-blue-600 dark:text-blue-400'
                            "
                          >
                            {{ item.title }}
                          </p>

                          <!-- UNREAD DOT -->
                          <span
                            v-if="!item.isRead"
                            class="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                          />
                        </div>

                        <p
                          class="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400"
                        >
                          {{ item.content }}
                        </p>

                        <div
                          class="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-slate-400"
                        >
                          <UIcon name="i-heroicons-clock" class="size-3" />

                          {{ dayjs(item.createdAt).format("DD/MM/YYYY HH:mm") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </UPopover>
          <UButton
            color="neutral"
            variant="ghost"
            class="group size-11 rounded-2xl border border-transparent transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-blue-900 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
            @click="
              colorMode.preference =
                colorMode.value === 'dark' ? 'light' : 'dark'
            "
          >
            <UIcon
              :name="
                colorMode.value === 'dark'
                  ? 'i-heroicons-sun'
                  : 'i-heroicons-moon'
              "
              class="size-[18px] transition-transform duration-300 group-hover:rotate-12"
            />
          </UButton>
          <UDropdownMenu
            :items="items"
            :content="{
              align: 'end',
              sideOffset: 8,
            }"
            :ui="{
              content:
                'w-52 rounded-2xl border border-slate-200/70 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.15)] dark:border-slate-800 dark:bg-slate-950',
            }"
          >
            <UButton
              color="neutral"
              variant="ghost"
              class="group relative size-11 rounded-2xl border border-transparent bg-slate-50 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 dark:bg-slate-900 dark:hover:border-blue-900 dark:hover:bg-blue-950/40"
            >
              <div
                class="flex size-8 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
              >
                <UIcon name="i-heroicons-user" class="size-[17px]" />
              </div>

              <span
                class="absolute bottom-1 right-1 size-2.5 rounded-full border-2 border-slate-50 bg-emerald-400 dark:border-slate-900"
              />
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const open = ref(false);
const { $socket } = useNuxtApp();
const { playNotificationSound } = useSound();
import dayjs from "dayjs";
const toast = useNotify();
const route = useRoute();
const notifyOpen = ref(false);
const notifyLoading = ref(false);
const unread = ref(0);
const notifications = ref([]);

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

const authStore = useAuthStore();
const colorMode = useColorMode();

const navigateNotify = async (item) => {
  await readAllNotify(item._id);

  switch (item.type) {
    case "kyc":
      return navigateTo("/manage/user/kyc");

    case "withdraw":
      return navigateTo("/manage/withdraw");

    case "chat":
      return navigateTo("/manage/chat");
    default:
      return;
  }
};

const logout = async () => {
  await authStore.removeAuth();
  await navigateTo("/auth/login");
};

const items = [
  {
    label: "Trang chủ",
    icon: "i-lucide-home",
    onSelect: async () => {
      await navigateTo("/");
    },
  },
  {
    type: "separator",
  },
  {
    label: "Đăng xuất",
    icon: "i-lucide-log-out",
    color: "error",
    onSelect: async () => {
      await logout();
    },
  },
];

const getNotifications = async () => {
  try {
    notifyLoading.value = true;
    const result = await useAPI("socket/manage/notify/list", {
      page: 1,
      limit: 20,
    });

    notifications.value = result.items || [];
    unread.value = result.unread || 0;
  } finally {
    notifyLoading.value = false;
  }
};

const openNotify = async () => {
  await getNotifications();
};

const readAllNotify = async (notifyId = null) => {
  await useAPI("socket/manage/notify/read", { notifyId });
  notifyOpen.value = false;
  if (notifyId) {
    const item = notifications.value.find((i) => i.notifyId === notifyId);
    if (item && !item.isRead) {
      item.isRead = true;
      unread.value = Math.max(0, unread.value - 1);
    }
  } else {
    unread.value = 0;
    notifications.value = notifications.value.map((i) => ({
      ...i,
      isRead: true,
    }));
  }
};
const chatReceiveHandler = () => {
  if (authStore?.profile?.type == 3) {
    const isChatPage = route.path.includes("/chat");
    if (!isChatPage) {
      toast.info("Có tin nhắn mới");
    }
    playNotificationSound();
  }
};

onMounted(() => {
  $socket.on("notify-admin", async () => {
    await getNotifications();
    await playNotificationSound();
  });
  $socket.on("chat-receive", chatReceiveHandler);
});

onUnmounted(() => {
  $socket.off("notify-admin");
  $socket.off("chat-receive");
});
</script>
<style>
div#reka-popover-content-v-0-4 {
  border-radius: 28px !important;
}
</style>
