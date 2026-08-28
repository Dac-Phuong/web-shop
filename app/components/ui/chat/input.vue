<!-- components/Chat/ChatInput.vue -->
<template>
  <div
    class="fixed bottom-20 left-0 right-0 max-w-xl mx-auto border-t border-slate-200 px-4 py-3 bg-slate-50"
  >
    <div class="flex items-center gap-2">
      <UButton
        :loading="sending"
        class="w-11 h-11 rounded-2xl bg-gray-200 hover:bg-gray-300 flex text-black items-center justify-center"
        @click="$emit('attach')"
      >
        <UIcon name="i-heroicons-paper-clip" class="w-5 h-5" />
      </UButton>

      <div class="flex-1 flex items-center">
        <textarea
          v-model="localMessage"
          :rows="1"
          :placeholder="placeholder"
          class="w-full bg-transparent outline-none rounded-2xl border border-slate-200 p-2 focus:border-slate-400 text-slate-900"
          @keydown.enter.exact.prevent="handleSend"
        />
      </div>

      <UButton
        class="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 flex items-center justify-center"
        :disabled="sending"
        @click="handleSend"
      >
        <UIcon
          name="i-heroicons-paper-airplane-solid"
          class="w-5 h-5 text-white -rotate-45"
        />
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sending: Boolean,
  placeholder: String,
});

const emit = defineEmits(["send", "attach"]);

const localMessage = ref("");

const handleSend = () => {
  if (!localMessage.value.trim()) return;
  emit("send", localMessage.value);
  localMessage.value = "";
};
</script>
