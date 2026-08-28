<template>
  <div class="chat-page">
    <LayoutPublicHeader
      :title="t('support')"
      :description="t('supportDescription')"
      icon="i-heroicons-chat-bubble-left-right"
    />

    <div ref="scrollRef" class="chat-scroll" @scroll.passive="handleScroll">
      <div
        v-if="loading"
        class="flex min-h-full flex-col items-center justify-center"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <UIcon
            name="i-svg-spinners-ring-resize"
            class="h-6 w-6 text-[#145DA0]"
          />  
        </div>

        <p class="mt-3 text-xs font-medium text-slate-400">
          {{ t("loadingData") }}
        </p>
      </div>

      <div v-else class="chat-content space-y-3">
        <div
          v-for="item in messages"
          :key="item._id"
          v-memo="[item._id, item.message, item.fileUrl]"
        >
          <!-- USER -->
          <div
            v-if="item.sender?._id == authStore.profile?._id"
            class="flex justify-end"
          >
            <div class="max-w-[82%] min-w-0">
              <!-- TEXT -->
              <div
                v-if="item.type === 'text'"
                class="break-words whitespace-pre-wrap rounded-[20px] rounded-br-md bg-[#145DA0] px-3.5 py-2.5 text-[14px] leading-relaxed text-white shadow-[0_3px_10px_rgba(20,93,160,0.12)]"
              >
                {{ item.message }}
              </div>

              <!-- IMAGE -->
              <div
                v-else-if="item.type === 'image'"
                class="overflow-hidden rounded-[18px] border border-white bg-white shadow-sm"
              >
                <UiImg
                  :src="item.fileUrl"
                  class="block max-h-[220px] max-w-[240px] cursor-zoom-in object-cover"
                  @click="openPreview(item.fileUrl)"
                />
              </div>

              <!-- VIDEO -->
              <div
                v-else-if="item.type === 'file'"
                class="overflow-hidden rounded-[18px] bg-white p-1 shadow-sm"
              >
                <video
                  :src="item.fileUrl"
                  controls
                  class="max-h-[240px] max-w-[260px] rounded-[14px]"
                />
              </div>

              <!-- TIME -->
              <p class="mt-1 px-1 text-right text-[10px] text-slate-400">
                {{ dayjs(item.createdAt).format("HH:mm") }}
              </p>
            </div>
          </div>

          <!-- ADMIN -->
          <div v-else class="flex items-end gap-2">
            <!-- ADMIN ICON -->
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
            >
              <UIcon
                name="i-heroicons-chat-bubble-left-right"
                class="h-4 w-4 text-[#145DA0]"
              />
            </div>

            <div class="max-w-[82%] min-w-0">
              <!-- TEXT -->
              <div
                v-if="item.type === 'text'"
                class="break-words whitespace-pre-wrap rounded-[20px] rounded-bl-md border border-slate-100 bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-slate-700 shadow-[0_3px_12px_rgba(15,23,42,0.04)]"
              >
                {{ item.message }}
              </div>

              <!-- IMAGE -->
              <div
                v-else-if="item.type === 'image'"
                class="overflow-hidden rounded-[18px] border border-slate-100 bg-white shadow-sm"
              >
                <UiImg
                  :src="item.fileUrl"
                  class="block max-h-[220px] max-w-[240px] cursor-zoom-in object-cover"
                  @click="openPreview(item.fileUrl)"
                />
              </div>

              <!-- VIDEO -->
              <div
                v-else-if="item.type === 'file'"
                class="overflow-hidden rounded-[18px] bg-white p-1 shadow-sm"
              >
                <video
                  :src="item.fileUrl"
                  controls
                  class="max-h-[240px] max-w-[260px] rounded-[14px]"
                />
              </div>

              <!-- TIME -->
              <p class="mt-1 px-1 text-[10px] text-slate-400">
                {{ dayjs(item.createdAt).format("HH:mm") }}
              </p>
            </div>
          </div>
        </div>

        <div ref="bottomAnchor" class="h-px w-full" aria-hidden="true" />
      </div>
    </div>
    <div
      class="pointer-events-none fixed inset-x-0 bottom-22 !mx-3 z-40 flex justify-center"
    >
      <div
        class="pointer-events-auto flex w-full max-w-xl items-end gap-2 rounded-[20px] bg-[#F8FAFC] p-1.5 shadow-sm"
      >
        <!-- ATTACH -->
        <UButton
          :loading="sending"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white text-slate-500 shadow-sm hover:bg-slate-50"
          @click="fileInput?.click()"
        >
          <UIcon name="i-heroicons-paper-clip" class="h-5 w-5" />
        </UButton>

        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept="image/*,video/*"
          @change="handleFileChange"
        />

        <!-- TEXT -->
        <textarea
          v-model="message"
          :rows="1"
          :placeholder="t('enterMessage')"
          class="max-h-24 min-h-[40px] min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-[14px] leading-5 text-slate-900 outline-none placeholder:text-slate-400"
          @keydown.enter.exact.prevent="sendMessage"
        />

        <!-- SEND -->
        <UButton
          :loading="sending"
          :disabled="sending"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#145DA0] shadow-[0_4px_12px_rgba(20,93,160,0.18)] hover:bg-[#104D88]"
          @click="sendMessage"
        >
          <UIcon
            name="i-heroicons-paper-airplane-solid"
            class="h-4.5 w-4.5 -rotate-45 text-white"
          />
        </UButton>
      </div>
    </div>

    <UiImgPreview v-model="openImage" :src="previewImage" />
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const { t } = useI18n();
const { playNotificationSound } = useSound();
const { $socket } = useNuxtApp();

const socketStore = useSocketStore();
const authStore = useAuthStore();

const loading = ref(false);
const sending = ref(false);

const scrollRef = ref(null);
const bottomAnchor = ref(null);
const fileInput = ref(null);

const message = ref("");
const file = ref(null);
const fileUrl = ref("");
const fileType = ref("");

const openImage = ref(false);
const previewImage = ref("");

const isAtBottom = ref(true);

let resizeObserver = null;
let scrollFrame = null;

const messages = computed(() => {
  const userId = authStore.profile?._id;

  if (!userId) {
    return [];
  }

  return socketStore.messages[userId] || [];
});

const openPreview = (img) => {
  if (!img) return;

  previewImage.value = img;
  openImage.value = true;
};

const isNearBottom = (threshold = 100) => {
  const el = scrollRef.value;

  if (!el) {
    return true;
  }

  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
};

const handleScroll = () => {
  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame);
  }

  scrollFrame = requestAnimationFrame(() => {
    isAtBottom.value = isNearBottom();
  });
};

const forceScrollToBottom = async () => {
  isAtBottom.value = true;

  await nextTick();

  const el = scrollRef.value;

  if (!el) {
    return;
  }

  const performScroll = () => {
    const currentEl = scrollRef.value;

    if (!currentEl) {
      return;
    }

    currentEl.scrollTop = currentEl.scrollHeight;

    if (bottomAnchor.value) {
      bottomAnchor.value.scrollIntoView({
        block: "end",
        behavior: "auto",
      });
    }
  };

  requestAnimationFrame(() => {
    performScroll();

    requestAnimationFrame(() => {
      performScroll();

      setTimeout(() => {
        performScroll();
      }, 80);
    });
  });
};

const scrollToBottom = async () => {
  if (!isAtBottom.value) {
    return;
  }

  await forceScrollToBottom();
};

const getMessages = async () => {
  loading.value = true;

  try {
    const result = await useAPI("chat/public/list", {
      size: 20,
      skip: 0,
    });

    socketStore.setMessages(authStore.profile._id, result);
  } catch (error) {
    console.error("Get messages error:", error);
  } finally {
    loading.value = false;

    await nextTick();

    await forceScrollToBottom();
  }
};

const handleFileChange = async (e) => {
  const input = e.target;
  const selectedFile = input.files?.[0];

  if (!selectedFile) {
    return;
  }

  if (selectedFile.size > 20 * 1024 * 1024) {
    useNotify().error("File không được vượt quá 20MB");

    input.value = "";
    return;
  }

  sending.value = true;
  isAtBottom.value = true;

  try {
    const formData = new FormData();

    formData.append("image", selectedFile);

    const res = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (json.code !== 200) {
      throw new Error(json.message);
    }

    $socket.emit("chat-send", {
      message: "",
      type: json.result.type,
      fileUrl: json.result.url,
    });

    input.value = "";

    await forceScrollToBottom();
  } catch (err) {
    useNotify().error(err?.message || "Upload thất bại");

    input.value = "";
  } finally {
    sending.value = false;
  }
};

const sendMessage = () => {
  const text = message.value.trim();

  if (!text && !fileUrl.value) {
    useNotify().error("Nhập nội dung chat");
    return;
  }

  if (authStore.profile?.type === 3) {
    useNotify().error(
      "Tài khoản quản trị không thể gửi tin nhắn. Vui lòng đến trang quản lý để xem tin nhắn.",
    );
    return;
  }

  if (sending.value) {
    return;
  }

  sending.value = true;
  isAtBottom.value = true;

  try {
    $socket.emit("chat-send", {
      message: text,
      type: fileUrl.value ? fileType.value : "text",
      fileUrl: fileUrl.value || null,
    });

    message.value = "";
    file.value = null;
    fileUrl.value = "";
    fileType.value = "";

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    forceScrollToBottom();
  } finally {
    requestAnimationFrame(() => {
      sending.value = false;
    });
  }
};

const handleChatReceive = async (data) => {
  if (!data) {
    return;
  }

  const currentUserId = authStore.profile?._id;

  if (!currentUserId) {
    return;
  }

  const shouldScroll = isNearBottom();

  socketStore.pushMessage(data, currentUserId);

  if (shouldScroll) {
    isAtBottom.value = true;

    await nextTick();

    await forceScrollToBottom();
  }

  if (data.sender?._id && data.sender._id !== currentUserId) {
    playNotificationSound();
  }
};

const handleChatError = (err) => {
  useNotify().error(err?.message || "Lỗi gửi tin nhắn");
};

const setupResizeObserver = () => {
  if (!scrollRef.value) {
    return;
  }

  resizeObserver = new ResizeObserver(() => {
    if (!isAtBottom.value) {
      return;
    }

    if (scrollFrame) {
      cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = requestAnimationFrame(() => {
      const el = scrollRef.value;

      if (!el) {
        return;
      }

      el.scrollTop = el.scrollHeight;
    });
  });

  resizeObserver.observe(scrollRef.value);
};

onMounted(async () => {
  $socket.on("chat-receive", handleChatReceive);
  $socket.on("chat-error", handleChatError);
  await getMessages();
  await nextTick();
  setupResizeObserver();
});

onUnmounted(() => {
  $socket.off("chat-receive", handleChatReceive);

  $socket.off("chat-error", handleChatError);

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame);

    scrollFrame = null;
  }
});
</script>

<style scoped>
.chat-page {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background: #f4f7fb;
}

.chat-scroll {
  position: relative;

  flex: 1 1 0%;
  min-width: 0;
  min-height: 0;

  width: 100%;
  height: 0;

  overflow-y: auto;
  overflow-x: hidden;

  padding-right: 12px;
  padding-left: 12px;
  margin-bottom: 50px;
  margin-top: 70px;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;

  overscroll-behavior-x: none;
  overscroll-behavior-y: auto;

  scroll-behavior: auto;

  scrollbar-width: thin;
}

.chat-content {
  width: 100%;
  min-width: 0;
}

.chat-scroll::-webkit-scrollbar {
  width: 5px;
}

.chat-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.chat-scroll::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background: rgba(100, 116, 139, 0.25);
}

.chat-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.4);
}

@media (max-width: 640px) {
  .chat-page {
    height: 100dvh;
    max-height: 100dvh;
  }

  .chat-scroll {
    padding-right: 10px;
    margin-bottom: 50px;
    padding-left: 10px;

    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
  }

  .chat-content {
    width: 100%;
  }
}
</style>
