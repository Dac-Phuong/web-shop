import { defineStore } from "pinia";

export const useSocketStore = defineStore("socket", () => {
  const messages = ref<Record<string, any[]>>({});
  const online = ref(0);

  const updateOnline = (data: number) => {
    online.value = data;
  };
  const setMessages = (userId: string, data: any[]) => {
    messages.value[userId] = data;
  };

  const pushMessage = (data: any, userId: string) => {
    if (!data?._id) return;

    if (!messages.value[userId]) {
      messages.value[userId] = [];
    }

    const exists = messages.value[userId].some((m) => m._id === data._id);

    if (exists) return;

    messages.value[userId] = [...messages.value[userId], data];
  };

  return {
    messages,
    setMessages,
    pushMessage,
    updateOnline,
    online,
  };
});
