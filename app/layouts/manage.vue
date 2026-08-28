<template>
  <div class="min-h-screen text-default">
    <!-- HEADER -->
    <LayoutManageHeader />
    <!-- BODY -->
    <div class="flex">
      <!-- SIDEBAR -->
      <aside
        class="hidden xl:flex flex-col w-[290px] shrink-0 h-[calc(100vh-var(--header-size))] sticky top-[var(--header-size)] border-r border-default backdrop-blur-xl"
      >
        <LayoutManageNav />
      </aside>

      <!-- CONTENT -->
      <main class="flex-1 min-w-0">
        <div class="p-4 lg:p-6 mx-auto w-full h-full bg-[#f5f5f5] dark:bg-[#020420]">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Manage Panel",
  robots: "noindex, nofollow",
});
</script>

<style>
:root {
  --header-size: 74px;
}
</style>
