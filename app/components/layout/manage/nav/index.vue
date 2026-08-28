<template>
  <aside
    class="h-full overflow-y-auto  bg-white/95 px-3 py-5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95"
  >
    <nav class="space-y-1.5">
      <div v-for="(item, index) in items" :key="index" class="menu-group">
        <button
          v-if="item.children"
          type="button"
          class="menu-item group relative flex h-[54px] w-full items-center justify-between overflow-hidden rounded-2xl px-2.5 text-left transition-all duration-300"
          :class="
            openedMenu === index
              ? 'menu-open'
              : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
          "
          @click="toggleMenu(index)"
        >
          <!-- ACTIVE BACKGROUND -->
          <span
            v-if="openedMenu === index"
            class="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.10] via-indigo-500/[0.06] to-transparent"
          />

          <div class="relative flex min-w-0 items-center gap-3">
            <!-- ICON -->
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300"
              :class="
                openedMenu === index
                  ? 'border-blue-500/20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-500 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-blue-900 dark:group-hover:bg-blue-950/50 dark:group-hover:text-blue-400'
              "
            >
              <UIcon :name="item.icon" class="size-[19px]" />
            </div>

            <!-- LABEL -->
            <span
              class="truncate text-[13px] font-bold"
              :class="
                openedMenu === index ? 'text-slate-900 dark:text-white' : ''
              "
            >
              {{ item.label }}
            </span>
          </div>

          <!-- CHEVRON -->
          <span
            class="relative flex size-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
            :class="
              openedMenu === index
                ? 'bg-blue-500/10 text-blue-500'
                : 'text-slate-400'
            "
          >
            <UIcon
              name="i-heroicons-chevron-down"
              class="size-4 transition-transform duration-300"
              :class="{
                'rotate-180': openedMenu === index,
              }"
            />
          </span>
        </button>

        <!-- ================================================= -->
        <!-- SINGLE MENU -->
        <!-- ================================================= -->
        <NuxtLink
          v-else
          :to="item.to"
          class="menu-item group relative flex h-[54px] items-center gap-3 overflow-hidden rounded-2xl px-2.5 text-[13px] font-bold text-slate-500 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
          active-class="menu-active"
        >
          <span
            class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/[0.11] via-indigo-500/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-[.menu-active]:opacity-100"
          />
          <span
            class="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-0 shadow-[0_0_12px_rgba(59,130,246,0.7)] transition-all duration-300 group-[.menu-active]:h-7 group-[.menu-active]:opacity-100"
          />
          <div
            class="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-blue-900 dark:group-hover:bg-blue-950/50 dark:group-hover:text-blue-400 group-[.menu-active]:border-blue-500/20 group-[.menu-active]:bg-gradient-to-br group-[.menu-active]:from-blue-500 group-[.menu-active]:to-indigo-600 group-[.menu-active]:text-white group-[.menu-active]:shadow-lg group-[.menu-active]:shadow-blue-500/20"
          >
            <UIcon :name="item.icon" class="size-[19px]" />
          </div>

          <span
            class="relative truncate transition-colors group-[.menu-active]:text-blue-600 dark:group-[.menu-active]:text-blue-400"
          >
            {{ item.label }}
          </span>

          <span
            class="relative ml-auto size-1.5 shrink-0 rounded-full bg-blue-500 opacity-0 shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-opacity group-[.menu-active]:opacity-100"
          />
        </NuxtLink>
        <Transition
          enter-active-class="overflow-hidden transition-all duration-300 ease-out"
          leave-active-class="overflow-hidden transition-all duration-200 ease-in"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-80 opacity-100"
          leave-from-class="max-h-80 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div
            v-if="item.children && openedMenu === index"
            class="relative ml-5 mt-1.5 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-800"
          >
            <div
              class="pointer-events-none absolute -left-px top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent"
            />

            <NuxtLink
              v-for="child in item.children"
              :key="child.to"
              :to="child.to"
              class="sub-item group relative flex h-10 items-center gap-2.5 rounded-xl px-3 text-[12px] font-semibold text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
              active-class="sub-active"
            >
              <span
                class="relative flex size-5 shrink-0 items-center justify-center"
              >
                <span
                  class="size-1.5 rounded-full bg-slate-300 transition-all duration-200 group-hover:bg-blue-500 group-[.sub-active]:size-2 group-[.sub-active]:bg-blue-500 group-[.sub-active]:shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                />
              </span>

              <span class="truncate">
                {{ child.label }}
              </span>

            </NuxtLink>
          </div>
        </Transition>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const route = useRoute();
const items = [
  {
    label: "Quản lý người dùng",
    icon: "i-heroicons-users",
    children: [
      {
        label: "Danh sách người dùng",
        icon: "i-heroicons-user-group",
        to: "/manage/user",
      },
      {
        label: "Xác minh KYC",
        icon: "i-heroicons-shield-check",
        to: "/manage/user/kyc",
      },
    ],
  },

  {
    label: "Quản lý VIP",
    icon: "i-heroicons-trophy",
    children: [
      {
        label: "Gói VIP",
        icon: "i-heroicons-sparkles",
        to: "/manage/plan",
      },
      {
        label: "Lịch sử nâng VIP",
        icon: "i-heroicons-clock",
        to: "/manage/plan/history",
      },
    ],
  },

  {
    label: "Sản phẩm",
    icon: "i-heroicons-cube",
    to: "/manage/product",
  },

  {
    label: "Rút tiền",
    icon: "i-heroicons-banknotes",
    to: "/manage/withdraw",
  },

  {
    label: "CSKH",
    icon: "i-heroicons-chat-bubble-left-right",
    to: "/manage/chat",
  },

  {
    label: "Đánh giá cửa hàng",
    icon: "i-heroicons-star",
    to: "/manage/product/review",
  },
];

const getActiveParent = () => {
  const index = items.findIndex((item) => {
    if (!item.children) {
      return false;
    }

    return item.children.some((child) => {
      return route.path === child.to || route.path.startsWith(`${child.to}/`);
    });
  });

  return index >= 0 ? index : null;
};

const openedMenu = ref(getActiveParent());

const toggleMenu = (index) => {
  if (openedMenu.value === index) {
    openedMenu.value = null;
    return;
  }

  openedMenu.value = index;
};

/*
|--------------------------------------------------------------------------
| AUTO OPEN WHEN ROUTE CHANGES
|--------------------------------------------------------------------------
*/

watch(
  () => route.path,
  () => {
    const activeParent = getActiveParent();

    if (activeParent !== null) {
      openedMenu.value = activeParent;
    }
  },
);
</script>
