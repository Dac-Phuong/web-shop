<template></template>

<script setup>
import { useOnline } from "@vueuse/core";
const online = useOnline();
const configStore = useConfigStore();
const authStore = useAuthStore();
const socketStore = useSocketStore();
const { $socket } = useNuxtApp();
const toast = useNotify();
const { playNotificationSound } = useSound();
const route = useRoute();

watch(
  () => authStore.isLogin,
  (val) => {
    if (!!val) $socket.emit("online-join", authStore.profile._id);
    else {
      $socket.emit("online-logout");
    }
  },
);

// Kết nối lại khi online
watch(online, (val) => {
  if (!val) return;
  $socket.emit("online-join", authStore.isLogin ? authStore.profile._id : null);
});

// const chatReceiveHandler = (data) => {
//   if (authStore?.profile?.type !== 3) {
//     const isChatPage = route.path.includes("/support");
//     if (!isChatPage) {
//       toast.info("Có tin nhắn mới");
//     }
//     playNotificationSound();
//   }
// };

onMounted(() => {
  // Web Update
  $socket.on("config-update", () => configStore.bootConfig());
  // Auth Update
  $socket.on("auth-update", async () => !!authStore.isLogin && (await authStore.setAuth()));
  // notify
  // $socket.on("chat-receive", chatReceiveHandler);
  // Online
  $socket.emit("online-join", authStore.isLogin ? authStore.profile?._id : null);
  $socket.on("online", (data) => socketStore.updateOnline(data));
  $socket.on("online-sign-in", () => {
    $socket.emit("notification"); // Lấy thông tin số thông báo mới
  });

  $socket.on("notify-single-push", (data) => {
    socketStore.changeNotifyData("single", {
      push: { update: socketStore.notify.single.push.update + 1, data: data },
    }); // Nhận thông báo mới
    if (socketStore.tab != "notify-single") return $socket.emit("notification"); // Không trong tab thông báo, thì nhận số thông báo mới
  });
});
// onUnmounted(() => {
//   $socket.off("chat-receive", chatReceiveHandler);
// });
</script>
