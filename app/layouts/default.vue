<template>
  <div class="flex min-h-screen bg-white">
    <main class="w-full overflow-x-hidden">
      <div
        class="mx-auto max-w-xl pb-24 w-full relative min-h-screen bg-[#f5f5f5]"
      >
        <slot />
      </div>
    </main>
    <layout-public-buttom-bar />
  </div>
</template>
<script setup>
const route = useRoute();
</script>
