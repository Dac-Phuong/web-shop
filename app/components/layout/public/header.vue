<template>
  <div
    class="fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-xl border-b border-slate-200/80 bg-white/95 p-2 backdrop-blur-xl"
  >
    <div class="relative flex h-10 items-center justify-between">
      <!-- BACK -->
      <NuxtLink
        v-if="isBack"
        :to="backTo"
        class="relative z-10 flex h-10 items-center justify-center rounded-full text-slate-700 transition active:scale-90"
      >
        <UIcon name="weui:back-filled" class="h-5 w-5" />
      </NuxtLink>

      <!-- TITLE CENTER -->
      <h1
        class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[16px] font-bold tracking-[-0.01em] text-slate-900"
      >
        {{ title }}
      </h1>

      <!-- STATUS -->
      <div
        class="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#145DA0]/10"
      >
        <UIcon :name="icon" class="h-5 w-5 text-[#145DA0]" />
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useI18n();

defineProps({
  title: String,
  icon: {
    type: String,
    default: "i-heroicons-squares-2x2",
  },
  description: {
    type: String,
  },
  backTo: {
    type: String,
    default: "/profile",
  },
  isBack: {
    type: Boolean,
    default: true,
  },
});
</script>
