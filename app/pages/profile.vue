<template>
  <div class="min-h-screen bg-[#F4F7FB] pb-8">
    <!-- HEADER -->
    <div class="relative overflow-hidden text-gray-200 px-2 pt-6 pb-2">
      <!-- Header -->
      <div class="relative flex items-start justify-between gap-3">
        <!-- User -->
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <div class="relative">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur"
            >
              <UiImg
                src="/assets/img/user.jpg"
                class="h-full w-full rounded-full object-cover"
              />
            </div>
            <span
              class="absolute bottom-0 right-0 h-3 w-3 border-1 rounded-full bg-emerald-400"
            />
          </div>

          <div class="min-w-0 flex-1">
            <h1 class="mt-0.5 truncate text-base font-bold text-black">
              {{ authStore.profile?.username }}
            </h1>

            <div class="flex items-center gap-2">
              <span class="truncate text-xs text-gray-500">
                {{ authStore.profile?.phone }}
              </span>
              <span
                class="rounded-full border border-amber-300/30 bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-500"
              >
                VIP {{ authStore.profile?.level || 0 }}
              </span>
            </div>
          </div>
        </div>
        <button
          @click="isOpen = true"
          class="flex min-w-[78px] items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-[#0F2742] active:scale-95"
        >
          <UIcon :name="currentLang?.icon" class="h-4 w-4 shrink-0" />
          <span>{{ currentLang?.label }}</span>
          <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 shrink-0" />
        </button>

        <!-- LANGUAGE MODAL -->
        <Transition name="modal">
          <div v-if="isOpen" class="fixed inset-0 z-[9999]">
            <!-- BACKDROP -->
            <div
              class="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px]"
              @click="isOpen = false"
            ></div>

            <!-- BOTTOM SHEET -->
            <div
              class="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-xl overflow-hidden rounded-t-[28px] bg-white shadow-[0_-15px_50px_rgba(15,23,42,0.2)]"
            >
              <!-- HANDLE -->
              <div class="flex justify-center pt-3">
                <div class="h-1.5 w-10 rounded-full bg-slate-200"></div>
              </div>

              <!-- HEADER -->
              <div class="flex items-center justify-between px-5 pb-4 pt-3">
                <div>
                  <h3 class="text-[17px] font-bold text-slate-900">
                    {{ $t("language") }}
                  </h3>

                  <p class="mt-0.5 text-xs text-slate-400">
                    {{ $t("selectLanguage") }}
                  </p>
                </div>

                <button
                  @click="isOpen = false"
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition active:scale-90"
                >
                  <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
              </div>

              <!-- LANGUAGES -->
              <div class="space-y-2 px-4 pb-6">
                <button
                  v-for="lang in languages"
                  :key="lang.value"
                  @click="
                    setLang(lang.value);
                    isOpen = false;
                  "
                  class="flex w-full items-center gap-3 rounded-2xl border px-2 py-2 text-left transition-all active:scale-[0.98]"
                  :class="
                    locale === lang.value
                      ? 'border-[#145DA0]/20 bg-[#145DA0]/10 text-[#145DA0]'
                      : 'border-slate-100 bg-slate-50 text-slate-700'
                  "
                >
                  <!-- ICON -->
                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    :class="
                      locale === lang.value ? 'bg-[#145DA0]/10' : 'bg-white'
                    "
                  >
                    <UIcon :name="lang.icon" class="h-5 w-5" />
                  </div>

                  <!-- LABEL -->
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-sm font-semibold"
                      :class="
                        locale === lang.value
                          ? 'text-[#145DA0]'
                          : 'text-slate-700'
                      "
                    >
                      {{ lang.label }}
                    </p>
                  </div>

                  <!-- CHECK -->
                  <div
                    v-if="locale === lang.value"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-[#145DA0]"
                  >
                    <UIcon
                      name="i-heroicons-check"
                      class="h-4 w-4 text-white"
                    />
                  </div>
                </button>
              </div>

              <!-- SAFE AREA -->
              <div class="h-[env(safe-area-inset-bottom)] bg-white"></div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <!-- BALANCE CARD -->
    <div class="relative z-10 px-2 pt-2">
      <div
        class="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#061A40] via-[#0D3B70] to-[#1464A0] px-4 py-4 text-white shadow-[0_16px_40px_rgba(6,26,64,0.28)]"
      >
        <!-- DECORATION -->
        <div
          class="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-cyan-300/[0.06]"
        />

        <div
          class="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full border-[16px] border-white/[0.04]"
        />

        <div class="relative">
          <!-- TOP -->
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-1.5">
                <UIcon
                  name="solar:wallet-money-bold"
                  class="h-3.5 w-3.5 text-cyan-300"
                />

                <p
                  class="text-[10px] font-bold uppercase tracking-[1.5px] text-blue-200/80"
                >
                  {{ $t("accountOverview") }}
                </p>
              </div>

              <p class="mt-1 text-[11px] font-medium text-white/60">
                {{ $t("availableBalance") }}
              </p>
            </div>

            <div
              class="flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.10] shadow-inner shadow-white/[0.05]"
            >
              <UIcon name="solar:chart-2-bold" class="h-5 w-5 text-cyan-200" />
            </div>
          </div>

          <!-- BALANCE -->
          <div class="mt-3">
            <div class="flex items-baseline gap-1">
              <span class="text-[30px] font-black leading-none tracking-[-1px]">
                ${{ useMoney().toMoney(authStore.profile?.coin || 0) }}
              </span>
            </div>

            <div class="mt-2 flex items-center gap-1.5">
              <div
                class="flex items-center gap-1 rounded-full border border-emerald-300/10 bg-emerald-400/10 px-2 py-1"
              >
                <UIcon
                  name="solar:verified-check-bold"
                  class="h-3 w-3 text-emerald-300"
                />

                <span class="text-[9px] font-semibold text-emerald-200">
                  {{ $t("activeAccount") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-auto grid grid-cols-3 gap-2.5 pt-2">
        <!-- DEPOSIT -->
        <NuxtLink
          to="/support"
          class="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white px-2 py-2.5 backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.18] active:scale-[0.96]"
        >
          <UIcon
            name="i-heroicons-arrow-down-circle"
            class="h-5 w-5 text-emerald-300"
          />

          <span class="mt-1 text-[14px] font-semibold gray-500">
            {{ $t("deposit") }}
          </span>
        </NuxtLink>

        <!-- WITHDRAW -->
        <NuxtLink
          to="/withdraw"
          class="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white px-2 py-2.5 backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.18] active:scale-[0.96]"
        >
          <UIcon
            name="i-heroicons-arrow-up-circle"
            class="h-5 w-5 text-cyan-200"
          />

          <span class="mt-1 text-[14px] font-semibold gray-500">
            {{ $t("withdraw") }}
          </span>
        </NuxtLink>

        <!-- REPORT -->
        <NuxtLink
          to="/report"
          class="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white px-2 py-2.5 backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.18] active:scale-[0.96]"
        >
          <UIcon name="i-heroicons-chart-bar" class="h-5 w-5 text-violet-200" />

          <span class="mt-1 text-[14px] font-semibold gray-500">
            {{ $t("report") }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- MENU SECTION -->
    <div class="mt-2 px-2">
      <div
        class="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        <NuxtLink
          v-for="(item, index) in menus"
          :key="item.label"
          :to="item.to"
          class="group flex w-full items-center justify-between p-3 transition active:bg-slate-50"
          :class="{
            'border-b border-slate-100': index !== menus.length - 1,
          }"
        >
          <div class="flex items-center gap-3.5">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50"
            >
              <UIcon :name="item.icon" class="h-5 w-5 text-[#145DA0]" />
            </div>

            <div class="text-left">
              <p class="text-[14px] font-semibold text-slate-800">
                {{ item.label }}
              </p>
            </div>
          </div>

          <UIcon
            name="i-heroicons-chevron-right"
            class="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#145DA0]"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- LOGOUT -->
    <div class="mt-2 px-2">
      <button
        @click="logout"
        class="flex w-full items-center justify-between rounded-[22px] border border-rose-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
      >
        <div class="flex items-center gap-3.5">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50"
          >
            <UIcon
              name="i-heroicons-arrow-right-on-rectangle"
              class="h-5 w-5 text-rose-500"
            />
          </div>

          <div class="text-left">
            <p class="text-sm font-semibold text-rose-600">
              {{ $t("logout") }}
            </p>
          </div>
        </div>

        <UIcon
          name="i-heroicons-chevron-right"
          class="h-5 w-5 text-slate-300"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
const { t, locale, setLocale } = useI18n();
const authStore = useAuthStore();
const isOpen = ref(false);
const languages = [
  { value: "vi", label: "VN", icon: "circle-flags:vn" },
  { value: "en", label: "EN", icon: "circle-flags:us" },
  { value: "zh", label: "中文", icon: "circle-flags:cn" },
  { value: "ko", label: "한국", icon: "circle-flags:kr" },
  { value: "de", label: "DE", icon: "circle-flags:de" },
  { value: "ja", label: "日本", icon: "circle-flags:jp" },
  { value: "fr", label: "FR", icon: "circle-flags:fr" },
];

const currentLang = computed(() =>
  languages.find((l) => l.value === locale.value),
);

const setLang = async (value) => {
  await setLocale(value);
  isOpen.value = false;
};

const logout = async () => {
  await authStore.removeAuth();
  await navigateTo("/auth/login");
};

const hidePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/(\+\d{4})(\d+)(\d{2})/, (_, start, middle, end) => {
    return `${start}${"*".repeat(middle.length)}${end}`;
  });
};

const menus = computed(() => [
  ...(authStore?.profile?.type == 3
    ? [
        {
          label: t("manage"),
          icon: "i-heroicons-user-group",
          to: "/manage/user",
        },
      ]
    : []),

  {
    label: t("userInfo"),
    icon: "solar:user-linear",
    to: "/info",
  },
  {
    label: t("linkBankAccount"),
    icon: "i-heroicons-building-library",
    to: "/bank",
  },
  {
    label: t("securityCenter"),
    icon: "i-heroicons-shield-check",
    to: "/security",
  },
  {
    label: t("financialReport"),
    icon: "i-heroicons-chart-bar-square",
    to: "/report",
  },

  {
    label: t("support"),
    icon: "i-heroicons-chat-bubble-left-right",
    to: "/support",
  },
  {
    label: t("upgradeAccount"),
    icon: "i-heroicons-sparkles",
    to: "/upgrade",
  },
]);
</script>
