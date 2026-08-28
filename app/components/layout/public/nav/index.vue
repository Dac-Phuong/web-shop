
<template>
  <!-- OVERLAY -->
  <Transition name="fade">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    />
  </Transition>
  <!-- SIDEBAR -->
  <Transition name="sidebar">
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 light:bg-white dark:border-gray-700 transition-transform duration-300 ease-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
      ]"
    >
      <UiLogo />
      <LayoutPublicNavSide
        @close-sidebar="sidebarOpen = false"
      />
    </aside>
  </Transition>
</template>

<script setup>
const sidebarOpen = useState("sidebarOpen", () => false);
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
