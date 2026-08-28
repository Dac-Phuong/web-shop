<script setup>
import dayjs from "dayjs";
import { useDebounceFn } from "@vueuse/core";

const { $socket } = useNuxtApp();
const authStore = useAuthStore();
const { playNotificationSound } = useSound();

const search = ref("");
const currentRoom = ref(null);

const users = shallowRef([]);
const messages = shallowRef([]);

const localMessage = ref("");

const loading = ref(false);
const uploading = ref(false);
const userLoading = ref(false);

const scrollRef = ref(null);
const fileInput = ref(null);
const openImage = ref(false);
const previewImage = ref("");

const openPreview = (img) => {
  previewImage.value = img;
  openImage.value = true;
};

const scrollBottom = async (smooth = false) => {
  await nextTick();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.value;

      if (!el) return;

      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    });
  });
};
const getUsers = async () => {
  try {
    userLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await useAPI("chat/manage/users");
    users.value = result || [];
  } catch (e) {
    console.log(e);
  } finally {
    userLoading.value = false;
  }
};

const getMessages = async (userId) => {
  try {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await useAPI("chat/manage/messages", { userId });
    messages.value = result || [];

    loading.value = false;
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
};

const selectRoom = async (user) => {
  currentRoom.value = user;
  currentRoom.value.unread = 0;
  await getMessages(user._id);
};

const sendMessage = () => {
  const text = localMessage.value.trim();

  if (!text || !currentRoom.value) return;

  $socket.emit("chat-send", {
    receiverId: currentRoom.value._id,
    message: text,
    type: "text",
  });

  localMessage.value = "";
};
const handleFileChange = async (e) => {
  const f = e.target.files[0];
  if (!f || !currentRoom.value) return;

  try {
    uploading.value = true;

    const formData = new FormData();
    formData.append("image", f);

    const res = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (json.code !== 200) throw new Error(json.message);

    const fileUrl = json.result.url;
    const type = json.result.type;

    $socket.emit("chat-send", {
      receiverId: currentRoom.value._id,
      message: "",
      type,
      fileUrl,
    });
  } catch (err) {
    useToast().add({
      title: "Upload lỗi",
      description: err.message,
      color: "error",
    });
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = "";
  }
};

const updateSidebar = useDebounceFn((data) => {
  const userId =
    data.sender?._id === authStore.profile._id
      ? data.receiver?._id
      : data.sender?._id;

  const list = [...users.value];
  const index = list.findIndex((item) => item._id === userId);

  if (index !== -1) {
    list[index] = {
      ...list[index],
      lastMessage: data.message || "File",
      lastTime: data.createdAt,
      unread:
        !currentRoom.value || currentRoom.value._id !== userId
          ? Number(list[index].unread || 0) + 1
          : list[index].unread,
    };

    const [item] = list.splice(index, 1);
    list.unshift(item);
    users.value = list;
  }
}, 150);

const appendMessage = async (data) => {
  if (
    !currentRoom.value ||
    (data.sender?._id !== currentRoom.value._id &&
      data.receiver?._id !== currentRoom.value._id)
  ) {
    return;
  }

  const exists = messages.value.some((item) => item._id === data._id);

  if (exists) return;

  messages.value = [...messages.value, data];

  await scrollBottom(true);
};
// computed dùng search ref, không bị ảnh hưởng bởi message typing
const filteredUsers = computed(() => {
  const keyword = search.value.toLowerCase();
  return users.value.filter(
    (item) =>
      item.phone?.toLowerCase().includes(keyword) ||
      item.username?.toLowerCase().includes(keyword),
  );
});

onMounted(async () => {
  $socket.on("chat-receive", async (data) => {
    updateSidebar(data);

    await appendMessage(data);
  });

  $socket.on("chat-error", (error) => {
    useToast().add({
      title: "Lỗi",
      description: error.message || "Không thể gửi tin nhắn",
      color: "error",
    });
  });

  await getUsers();
});

onUnmounted(() => {
  $socket.off("chat-receive");
  $socket.off("chat-error");
});
</script>

<template>
  <div class="h-[calc(98vh-120px)] min-h-[600px] overflow-hidden">
    <div
      class="grid h-full overflow-hidden rounded-3xl border border-default bg-default shadow-xl shadow-black/5 dark:shadow-black/20 lg:grid-cols-[360px_1fr]"
    >
      <aside
        class="flex h-full min-h-0 flex-col border-r border-default bg-elevated/30"
        :class="[currentRoom ? 'hidden lg:flex' : 'flex']"
      >
        <!-- SIDEBAR HEADER -->
        <div
          class="relative shrink-0 overflow-hidden border-b border-default bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white lg:p-5"
        >
          <div
            class="absolute -right-16 -top-20 size-52 rounded-full bg-white/10 blur-3xl"
          />

          <div
            class="absolute -bottom-24 left-1/3 size-48 rounded-full bg-indigo-400/20 blur-3xl"
          />

          <div class="relative">
            <div class="flex items-center gap-3">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
              >
                <UIcon name="i-lucide-messages-square" class="size-5" />
              </div>

              <div class="min-w-0">
                <h2 class="text-lg font-bold tracking-tight">
                  Hỗ trợ khách hàng
                </h2>

                <p class="mt-0.5 text-xs text-blue-100">
                  {{ users.length }} cuộc trò chuyện
                </p>
              </div>
            </div>

            <!-- SEARCH -->
            <div class="mt-4">
              <UInput
                v-model="search"
                icon="i-lucide-search"
                size="lg"
                class="w-full"
                placeholder="Tìm kiếm người dùng..."
                :ui="{
                  base: 'rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/15',
                  leadingIcon: 'text-white/70',
                }"
              />
            </div>
          </div>
        </div>

        <!-- USER LOADING -->
        <div v-if="userLoading" class="flex flex-1 items-center justify-center">
          <div class="flex flex-col items-center gap-3">
            <div
              class="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10"
            >
              <UIcon
                name="i-svg-spinners-ring-resize"
                class="size-7 text-blue-500"
              />
            </div>

            <div class="text-center">
              <p class="text-sm font-semibold">Đang tải người dùng...</p>

              <p class="mt-1 text-xs text-muted">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        </div>
        <!-- USER LIST -->
        <div v-else class="flex min-h-0 flex-1 flex-col">
          <div class="min-h-0 flex-1 overflow-y-auto p-2.5 lg:p-3">
            <!-- EMPTY SEARCH -->
            <div
              v-if="!filteredUsers.length"
              class="flex h-full min-h-[250px] flex-col items-center justify-center px-5 text-center"
            >
              <div
                class="flex size-14 items-center justify-center rounded-2xl bg-elevated"
              >
                <UIcon
                  name="i-lucide-user-round-search"
                  class="size-7 text-muted"
                />
              </div>

              <p class="mt-3 text-sm font-semibold">
                Không tìm thấy người dùng
              </p>

              <p class="mt-1 text-xs text-muted">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>

            <div v-else class="space-y-1.5">
              <button
                v-for="user in filteredUsers"
                :key="user._id"
                class="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-2.5 text-left transition-all duration-200"
                :class="
                  currentRoom?._id === user._id
                    ? 'border-blue-500/20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : 'border-transparent hover:border-blue-500/10 hover:bg-blue-500/[0.06]'
                "
                @click="selectRoom(user)"
              >
                <!-- ACTIVE INDICATOR -->
                <div
                  v-if="currentRoom?._id === user._id"
                  class="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-white"
                />

                <div class="relative shrink-0">
                  <UiImg
                    :src="user.avatar"
                    class="size-11 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10"
                  />

                  <span
                    class="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-default bg-emerald-500"
                    :class="
                      currentRoom?._id === user._id ? 'border-blue-600' : ''
                    "
                  />
                </div>

                <!-- USER INFO -->
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <h3
                      class="truncate text-sm font-bold"
                      :class="currentRoom?._id === user._id ? 'text-white' : ''"
                    >
                      {{ user.phone }}
                    </h3>

                    <span
                      v-if="user.lastTime"
                      class="shrink-0 text-[10px]"
                      :class="
                        currentRoom?._id === user._id
                          ? 'text-blue-100'
                          : 'text-muted'
                      "
                    >
                      {{ dayjs(user.lastTime).format("HH:mm") }}
                    </span>
                  </div>

                  <p
                    class="mt-1 truncate text-xs"
                    :class="
                      currentRoom?._id === user._id
                        ? 'text-blue-100'
                        : 'text-muted'
                    "
                  >
                    {{ user.lastMessage || "📷 Hình ảnh" }}
                  </p>
                </div>

                <!-- UNREAD -->
                <div
                  v-if="user.unread"
                  class="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  :class="
                    currentRoom?._id === user._id
                      ? 'bg-white text-blue-600'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm'
                  "
                >
                  {{ user.unread > 99 ? "99+" : user.unread }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <main
        v-if="currentRoom"
        class="col-span-full flex h-full min-h-0 flex-col lg:col-auto"
      >
        <!-- CHAT LOADING -->
        <div
          v-if="loading"
          class="flex flex-1 items-center justify-center bg-elevated/10"
        >
          <div class="flex flex-col items-center gap-3">
            <div
              class="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10"
            >
              <UIcon
                name="i-svg-spinners-ring-resize"
                class="size-7 text-blue-500"
              />
            </div>

            <p class="text-sm font-medium">Đang tải tin nhắn...</p>
          </div>
        </div>

        <div v-else class="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header
            class="relative shrink-0 overflow-hidden border-b border-default bg-default px-4 py-3.5 lg:px-6"
          >
            <div class="flex items-center justify-between">
              <div class="flex min-w-0 items-center gap-3">
                <UButton
                  class="lg:hidden"
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-arrow-left"
                  size="md"
                  square
                  @click="currentRoom = null"
                />

                <!-- AVATAR -->
                <div class="relative shrink-0">
                  <UiImg
                    :src="currentRoom.avatar"
                    class="size-11 rounded-full object-cover ring-2 ring-blue-500/10 lg:size-12"
                  />
                  <span
                    class="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-default bg-emerald-500"
                  />
                </div>

                <!-- INFO -->
                <div class="min-w-0">
                  <h3 class="truncate text-sm font-bold lg:text-base">
                    {{ currentRoom.phone }}
                  </h3>

                  <div class="mt-0.5 flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full bg-emerald-500" />

                    <p class="text-[11px] font-medium text-emerald-500">
                      Đang trực tuyến
                    </p>
                  </div>
                </div>
              </div>

              <!-- RIGHT ACTIONS -->
              <div class="flex items-center gap-1.5">
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-more-horizontal"
                  size="md"
                  square
                  class="rounded-xl"
                />
              </div>
            </div>
          </header>

          <div
            ref="scrollRef"
            class="chat-scroll min-h-0 flex-1 bg-gradient-to-b from-elevated/20 to-default p-4 lg:p-6"
          >
            <div class="mx-auto space-y-4">
              <!-- EMPTY MESSAGES -->
              <div
                v-if="!messages.length"
                class="flex min-h-[400px] flex-col items-center justify-center text-center"
              >
                <div
                  class="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                >
                  <UIcon name="i-lucide-message-circle" class="size-7" />
                </div>

                <h3 class="mt-4 text-base font-bold">
                  Bắt đầu cuộc trò chuyện
                </h3>

                <p class="mt-1 max-w-xs text-xs text-muted">
                  Gửi tin nhắn để hỗ trợ khách hàng.
                </p>
              </div>

              <div
                v-for="item in messages"
                :key="item._id"
                class="flex"
                :class="
                  item.sender?._id === authStore.profile._id
                    ? 'justify-end'
                    : 'justify-start'
                "
              >
                <div
                  class="flex max-w-[88%] flex-col gap-1 sm:max-w-[75%] lg:max-w-[65%]"
                >
                  <div
                    v-if="item.type === 'text'"
                    class="break-words whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    :class="
                      item.sender?._id === authStore.profile._id
                        ? 'rounded-br-md bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/15'
                        : 'rounded-bl-md border border-default bg-default text-highlighted shadow-sm'
                    "
                  >
                    {{ item.message }}
                  </div>

                  <!-- IMAGE -->
                  <div
                    v-else-if="item.type === 'image'"
                    class="group relative overflow-hidden rounded-2xl border border-default bg-default shadow-md"
                  >
                    <UiImg
                      :src="item.fileUrl"
                      @click="openPreview(item.fileUrl)"
                      class="max-w-[260px] cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.02]"
                    />

                    <div
                      class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-3 py-5 opacity-0 transition group-hover:opacity-100"
                    >
                      <div
                        class="flex items-center gap-1.5 text-xs font-medium text-white"
                      >
                        <UIcon name="i-lucide-zoom-in" class="size-3.5" />
                        Xem ảnh
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="item.type === 'file'"
                    class="overflow-hidden rounded-2xl border border-default bg-default p-1 shadow-md"
                  >
                    <video
                      :src="item.fileUrl"
                      controls
                      class="max-w-[300px] rounded-xl"
                    />
                  </div>

                  <div
                    class="flex items-center gap-1 px-2 text-[10px] font-medium text-muted"
                    :class="
                      item.sender?._id === authStore.profile._id
                        ? 'justify-end'
                        : 'justify-start'
                    "
                  >
                    <UIcon
                      v-if="item.sender?._id === authStore.profile._id"
                      name="i-lucide-check-check"
                      class="size-3 text-blue-500"
                    />

                    {{ dayjs(item.createdAt).format("HH:mm") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="shrink-0 border-t border-default bg-default p-3 sm:p-4">
            <div
              class="flex items-end gap-2 rounded-2xl border border-default bg-elevated/40 p-2 shadow-sm transition-all focus-within:border-blue-500/40 focus-within:ring-2 focus-within:ring-blue-500/10"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept="image/*,video/*"
                @change="handleFileChange"
              />

              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-paperclip"
                size="lg"
                square
                class="shrink-0 rounded-xl"
                :disabled="uploading"
                @click="fileInput.click()"
              />

              <!-- TEXTAREA -->
              <div class="min-w-0 flex-1">
                <UTextarea
                  v-model="localMessage"
                  :rows="1"
                  autoresize
                  :maxrows="5"
                  placeholder="Nhập tin nhắn hỗ trợ..."
                  :ui="{
                    base: 'border-0 bg-transparent px-2 py-2 shadow-none focus:ring-0 resize-none',
                  }"
                  @keydown.enter.exact.prevent="sendMessage"
                />
              </div>

              <UButton
                icon="i-lucide-send"
                size="lg"
                square
                class="shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
                :loading="uploading"
                :disabled="!localMessage?.trim() && !uploading"
                @click="sendMessage"
              />
            </div>

            <div class="mt-2 hidden items-center justify-between px-2 sm:flex">
              <p class="text-[10px] text-muted">Enter để gửi tin nhắn</p>

              <div class="flex items-center gap-1.5 text-[10px] text-muted">
                <UIcon name="i-lucide-shield-check" class="size-3" />
                Hỗ trợ khách hàng
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        v-else
        class="hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/[0.03] via-indigo-500/[0.02] to-transparent lg:flex"
      >
        <div
          class="relative flex size-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20"
        >
          <div class="absolute inset-0 rounded-[28px] bg-white/10" />

          <UIcon name="i-lucide-messages-square" class="relative size-11" />
        </div>

        <h3 class="mt-6 text-xl font-bold tracking-tight">
          Chưa chọn cuộc trò chuyện
        </h3>

        <p class="mt-2 max-w-sm text-center text-sm text-muted">
          Chọn một người dùng ở danh sách bên trái để bắt đầu hỗ trợ.
        </p>

        <div
          class="mt-5 flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-500"
        >
          <span class="size-1.5 rounded-full bg-blue-500" />
          {{ users.length }} cuộc trò chuyện
        </div>
      </div>
    </div>

    <!-- IMAGE PREVIEW -->
    <UiImgPreview v-model="openImage" :src="previewImage" />
  </div>
</template>
<style scoped>
.chat-scroll {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;
}
</style>
