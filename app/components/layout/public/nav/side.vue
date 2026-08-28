<template>
  <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
    <template v-for="item in menuItems" :key="item.label">
      <!-- MENU THƯỜNG -->
      <NuxtLink
        v-if="!item.children"
        :to="item.to"
        @click="handleNavigate"
        class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200"
        :class="[
          $route.path === item.to ||
          ($route.path.startsWith(item.to) && item.to !== '/')
            ? 'bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-950/30 dark:text-emerald-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
        ]"
      >
        <UIcon :name="item.icon" class="h-5 w-5 transition-none" />

        <span>{{ item.label }}</span>

        <UBadge
          v-if="item.badge"
          size="xs"
          :color="item.badgeColor"
          variant="solid"
          class="ml-auto"
        >
          {{ item.badge }}
        </UBadge>
      </NuxtLink>

      <!-- MENU CÓ SUB -->
      <div v-else class="space-y-1">
        <div
          class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all"
          :class="[
            isParentActive(item)
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
          ]"
          @click="toggleMenu(item.label)"
        >
          <UIcon :name="item.icon" class="h-5 w-5" />

          <span class="flex-1">{{ item.label }}</span>

          <UIcon
            :name="
              expandedMenus.includes(item.label)
                ? 'i-heroicons-chevron-up'
                : 'i-heroicons-chevron-down'
            "
            class="h-4 w-4 transition-transform"
          />
        </div>

        <!-- SUB MENU -->
        <Transition name="submenu">
          <div
            v-show="expandedMenus.includes(item.label)"
            class="ml-4 space-y-1 overflow-hidden"
          >
            <NuxtLink
              v-for="child in item.children"
              :key="child.label"
              :to="child.to"
              @click="handleNavigate"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all"
              :class="[
                $route.path === child.to
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
              ]"
            >
              <UIcon :name="child.icon" class="h-4 w-4" />

              <span>{{ child.label }}</span>

              <UBadge
                v-if="child.badge"
                size="xs"
                :color="child.badgeColor"
                variant="soft"
                class="ml-auto"
              >
                {{ child.badge }}
              </UBadge>
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </template>
  </nav>

  <!-- FOOTER -->
  <div
    v-if="isLogin"
    class="space-y-3 border-t border-gray-200 p-4 dark:border-gray-700"
  >
    <div
      class="flex items-center gap-3 rounded-xl bg-gray-50 p-2 dark:bg-gray-700/50"
    >
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-sm font-medium text-white"
      >
        U
      </div>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">User Demo</p>

        <p class="truncate text-xs text-gray-500 dark:text-gray-400">
          user@example.com
        </p>
      </div>

      <UDropdownMenu :items="userMenu">
        <UButton icon="i-heroicons-chevron-down" variant="ghost" size="xs" />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close-sidebar"]);
const authStore = useAuthStore();
const isLogin = computed(() => authStore?.isLogin ?? false);

const route = useRoute();

const menuItems = ref([
  {
    label: "Trang chủ",
    icon: "i-heroicons-home",
    to: "/",
  },

  {
    label: "Nạp tiền",
    icon: "i-heroicons-credit-card",
    to: "/deposit",
  },
  {
    label: "Dịch vụ Telegram",
    icon: "i-heroicons-cube",
    children: [
      {
        label: "Tài khoản Telegram",
        icon: "i-heroicons-user",
        to: "/service/accounts",
      },
      {
        label: "Nhắn tin hàng loạt",
        icon: "i-heroicons-chat-bubble-left-right",
        to: "/service/broadcast",
      },

      {
        label: "Auto trả lời tin nhắn",
        icon: "i-heroicons-chat-bubble-left-ellipsis",
        to: "/service/auto-reply",
        badge: "Hot",
        badgeColor: "red",
      },

      {
        label: "Quản lý nhóm Telegram",
        icon: "i-heroicons-users",
        to: "/service/groups",
      },
    ],
  },

  {
    label: "Lịch sử giao dịch",
    icon: "i-heroicons-clock",
    to: "/transactions",
  },

  {
    label: "Hoa hồng",
    icon: "i-heroicons-presentation-chart-bar",
    to: "/commission",
    badge: "New",
    badgeColor: "green",
  },

  {
    label: "Affiliate",
    icon: "i-heroicons-user-group",
    to: "/affiliate",
  },

  {
    label: "Công cụ",
    icon: "i-heroicons-cube",
    to: "/tools",
  },

  {
    label: "Hỗ trợ",
    icon: "i-heroicons-chat-bubble-left",
    to: "/support",
  },

  {
    label: "Cài đặt",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
  },
]);

const expandedMenus = ref(["Dịch vụ Telegram"]);
const logout = async () => {
  await authStore.removeAuth();
};
const userMenu = [
  [
    {
      label: 'Thông tin tài khoản',
      icon: 'i-heroicons-user',
      to: '/profile'
    }
  ],

  [
    {
      label: 'Đổi mật khẩu',
      icon: 'i-heroicons-key',
      to: '/change-password'
    }
  ],

  [
    {
      label: 'Đăng xuất',
      icon: 'i-heroicons-arrow-left-start-on-rectangle',
      onSelect: logout
    }
  ]
]


function toggleMenu(label) {
  if (expandedMenus.value.includes(label)) {
    expandedMenus.value = expandedMenus.value.filter((m) => m !== label);
  } else {
    expandedMenus.value.push(label);
  }
}

function isParentActive(item) {
  return item.children?.some((child) => route.path === child.to);
}

function handleNavigate() {
  if (window.innerWidth < 1024) {
    emit("close-sidebar");
  }
}

</script>

<style scoped>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.25s ease;
  max-height: 300px;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
