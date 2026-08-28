<template>
  <div class="fixed inset-x-0 bottom-0 z-50">
    <div
      class="mx-auto max-w-xl px-3 pb-2"
      style="padding-bottom: max(8px, env(safe-area-inset-bottom))"
    >
      <nav
        class="relative isolate grid h-[70px] grid-cols-5 items-center rounded-[25px] border border-slate-100 bg-white/95 p-[5px] shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
      >
        <!-- ACTIVE INDICATOR -->
        <div
          class="pointer-events-none absolute left-[6px] top-[7px] z-0 flex h-[54px] w-[calc((100%-12px)/5)] items-center justify-center transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          :style="{
            transform: `translateX(${activeIndex * 100}%)`,
          }"
        >
          <div
            class="h-[44px] w-[52px] rounded-[17px] bg-gradient-to-br from-[#eef6fd] to-[#e5f0fa] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_10px_rgba(30,100,165,0.05)]"
          />
        </div>

        <!-- HOME -->
        <NuxtLink
          to="/"
          class="group relative z-10 flex h-[54px] w-full flex-col items-center justify-center gap-[1px] text-slate-400 transition-all duration-200 active:scale-[0.91]"
          :class="route.path === '/' ? 'text-[#145DA0]' : ''"
        >
          <div
            class="flex h-[29px] w-8 items-center justify-center transition-transform duration-300"
            :class="
              route.path === '/'
                ? '-translate-y-0.5'
                : 'group-hover:-translate-y-0.5'
            "
          >
            <UIcon
              name="i-heroicons-home-solid"
              class="h-[22px] w-[22px] transition-transform duration-300"
              :class="
                route.path === '/' ? 'scale-110' : 'group-hover:scale-105'
              "
            />
          </div>

          <span
            class="max-w-full truncate text-[11px] font-semibold leading-3 tracking-[-0.01em] transition-all duration-200"
            :class="route.path === '/' ? 'font-bold' : ''"
          >
            {{ t("home") }}
          </span>
        </NuxtLink>

        <!-- HISTORY -->
        <NuxtLink
          to="/history"
          class="group relative z-10 flex h-[54px] w-full flex-col items-center justify-center gap-[1px] text-slate-400 transition-all duration-200 active:scale-[0.91]"
          :class="route.path.startsWith('/history') ? 'text-[#145DA0]' : ''"
        >
          <div
            class="flex h-[29px] w-8 items-center justify-center transition-transform duration-300"
            :class="
              route.path.startsWith('/history')
                ? '-translate-y-0.5'
                : 'group-hover:-translate-y-0.5'
            "
          >
            <UIcon
              name="i-heroicons-clock"
              class="h-[22px] w-[22px] transition-transform duration-300"
              :class="
                route.path.startsWith('/history')
                  ? 'scale-110'
                  : 'group-hover:scale-105'
              "
            />
          </div>

          <span
            class="max-w-full truncate text-[11px] font-semibold leading-3 tracking-[-0.01em]"
            :class="route.path.startsWith('/history') ? 'font-bold' : ''"
          >
            {{ t("history") }}
          </span>
        </NuxtLink>

        <!-- TASKS -->
        <NuxtLink
          to="/tasks"
          class="group relative z-20 flex h-[54px] w-full items-center justify-center overflow-visible text-[#145DA0] transition-transform duration-300 active:scale-[0.92]"
          :class="route.path.startsWith('/tasks') ? '' : ''"
        >
          <div
            class="relative -mt-[25px] flex h-[70px] w-[70px] items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1"
            :class="
              route.path.startsWith('/tasks')
                ? '-translate-y-0.5 scale-[1.06]'
                : ''
            "
          >
            <!-- GLOW -->
            <div
              class="absolute inset-[2px] rounded-full bg-[#145DA0]/25 blur-[10px] opacity-70 transition-all duration-300 group-hover:scale-[1.18] group-hover:opacity-100"
              :class="
                route.path.startsWith('/tasks') ? 'scale-[1.18] opacity-90' : ''
              "
            />

            <!-- BUTTON -->
            <div
              class="relative flex h-[55px] w-[55px] items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#061A40] to-[#145DA0] text-white shadow-[0_8px_20px_rgba(20,93,160,0.30),0_4px_8px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 group-hover:shadow-[0_12px_28px_rgba(20,93,160,0.36),0_5px_10px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              :class="
                route.path.startsWith('/tasks')
                  ? 'bg-gradient-to-br from-[#145DA0] to-[#061A40] shadow-[0_10px_26px_rgba(20,93,160,0.38),0_5px_10px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.38)]'
                  : ''
              "
            >
              <UIcon
                name="qlementine-icons:plus-16"
                class="h-[23px] w-[23px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform duration-300"
                :class="
                  route.path.startsWith('/tasks')
                    ? 'scale-110 -rotate-5'
                    : 'group-hover:scale-105'
                "
              />
            </div>
          </div>
        </NuxtLink>

        <!-- SUPPORT -->
        <NuxtLink
          to="/support"
          class="group relative z-10 flex h-[54px] w-full flex-col items-center justify-center gap-[1px] text-slate-400 transition-all duration-200 active:scale-[0.91]"
          :class="route.path.startsWith('/support') ? 'text-[#145DA0]' : ''"
        >
          <div
            class="flex h-[29px] w-8 items-center justify-center transition-transform duration-300"
            :class="
              route.path.startsWith('/support')
                ? '-translate-y-0.5'
                : 'group-hover:-translate-y-0.5'
            "
          >
            <UIcon
              name="i-heroicons-chat-bubble-left-right"
              class="h-[22px] w-[22px] transition-transform duration-300"
              :class="
                route.path.startsWith('/support')
                  ? 'scale-110'
                  : 'group-hover:scale-105'
              "
            />
          </div>

          <span
            class="max-w-full truncate text-[11px] font-semibold leading-3 tracking-[-0.01em]"
            :class="route.path.startsWith('/support') ? 'font-bold' : ''"
          >
            {{ t("chat") }}
          </span>
        </NuxtLink>

        <!-- PROFILE -->
        <NuxtLink
          to="/profile"
          class="group relative z-10 flex h-[54px] w-full flex-col items-center justify-center gap-[1px] text-slate-400 transition-all duration-200 active:scale-[0.91]"
          :class="route.path.startsWith('/profile') ? 'text-[#145DA0]' : ''"
        >
          <div
            class="flex h-[29px] w-8 items-center justify-center transition-transform duration-300"
            :class="
              route.path.startsWith('/profile')
                ? '-translate-y-0.5'
                : 'group-hover:-translate-y-0.5'
            "
          >
            <UIcon
              name="i-heroicons-user-solid"
              class="h-[22px] w-[22px] transition-transform duration-300"
              :class="
                route.path.startsWith('/profile')
                  ? 'scale-110'
                  : 'group-hover:scale-105'
              "
            />
          </div>

          <span
            class="max-w-full truncate text-[11px] font-semibold leading-3 tracking-[-0.01em]"
            :class="route.path.startsWith('/profile') ? 'font-bold' : ''"
          >
            {{ t("profile") }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();

const activeIndex = computed(() => {
  const path = route.path;

  if (path === "/") return 0;
  if (path.startsWith("/history")) return 1;
  if (path.startsWith("/tasks")) return 2;
  if (path.startsWith("/support")) return 3;
  if (path.startsWith("/profile")) return 4;

  return -1;
});
</script>
