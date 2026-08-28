<template>
  <div class="min-h-screen bg-[#F4F7FB] pb-6">
    <!-- HEADER -->
    <LayoutPublicHeader
      :title="t('updateAccount')"
      icon="i-heroicons-sparkles"
    />

    <LoadingPlan v-if="loading" class="pt-[65px]" />
    <!-- CONTENT -->
    <main v-else class="px-2 pt-[65px] pb-4">
      <!-- PLAN LIST -->
      <div class="space-y-2">
        <div
          v-for="item in list"
          :key="item.level"
          class="relative overflow-hidden rounded-[24px] border bg-white shadow-[0_8px_25px_rgba(15,23,42,0.07)] transition-all duration-300"
          :class="
            isCurrentLevel(item.level)
              ? 'border-[#176CC4]/70 shadow-[0_10px_30px_rgba(23,108,196,0.16)]'
              : 'border-slate-200'
          "
        >
          <!-- ACTIVE INDICATOR -->
          <div
            v-if="isCurrentLevel(item.level)"
            class="absolute inset-x-0 top-0 z-10 h-[3px] bg-[#18A0FF]"
          />

          <div
            class="relative overflow-hidden bg-gradient-to-br from-[#061A40] via-[#0A326B] to-[#145DA0] px-4 pb-4 pt-4 text-white"
          >
            <!-- DECORATION -->
            <div
              class="pointer-events-none absolute right-0 top-0 z-0 h-28 w-28"
            >
              <UiImg
                src="https://cdn3d.iconscout.com/3d/premium/thumb/coin-3d-icon-png-download-10411192.png"
                alt=""
                class="h-full w-full object-contain"
              />
            </div>

            <div
              class="pointer-events-none absolute -bottom-16 right-14 z-0 h-40 w-40 rounded-full bg-sky-300/[0.10] blur-3xl"
            />

            <div class="relative">
              <!-- TOP -->
              <div class="flex items-center justify-between gap-3">
                <!-- LEVEL + NAME -->
                <div class="flex min-w-0 items-center gap-3">
                  <!-- LEVEL -->
                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 shadow-inner"
                  >
                    <UiImg
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/vip-badge-3d-icon-png-download-14142756.png"
                      alt=""
                      class="h-full w-full object-contain"
                    />
                  </div>

                  <!-- NAME -->
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <h3
                        class="truncate text-[17px] font-black tracking-[-0.3px]"
                      >
                        {{ item.name }}
                      </h3>

                      <!-- ACTIVE -->
                      <span
                        v-if="isCurrentLevel(item.level)"
                        class="flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-extrabold text-emerald-300"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        {{ t("opened") }}
                      </span>
                    </div>

                    
                  </div>
                </div>
              </div>

              <!-- DESCRIPTION -->
              <div
                class="mt-3 rounded-xl border border-white/[0.08] bg-black/[0.12] px-3 py-2.5"
              >
                <p class="text-[11px] leading-[17px] text-blue-50/80">
                  {{ t(item.description) || t("premiumDescription") }}
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 bg-white">
            <!-- COMMISSION -->
            <div class="px-2 py-3.5 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <UIcon
                  name="i-heroicons-arrow-trending-up"
                  class="h-4 w-4 text-emerald-500"
                />

                <span class="text-[17px] font-black text-emerald-600">
                  {{ item.commission || 0 }}%
                </span>
              </div>

              <p
                class="mt-1.5 text-[9px] font-bold uppercase tracking-[0.7px] text-slate-400"
              >
                {{ t("commission") }}
              </p>
            </div>

            <!-- ORDERS -->
            <div class="border-x border-slate-100 px-2 py-3.5 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <UIcon
                  name="i-heroicons-shopping-bag"
                  class="h-4 w-4 text-[#145DA0]"
                />

                <span class="text-[17px] font-black text-slate-900">
                  {{ item.maxOrders }}
                </span>
              </div>

              <p
                class="mt-1.5 text-[9px] font-bold uppercase tracking-[0.7px] text-slate-400"
              >
                {{ t("maxOrders") }}
              </p>
            </div>

            <!-- RETURN -->
            <div class="px-2 py-3.5 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <UIcon
                  name="solar:dollar-outline"
                  class="h-5 w-5 text-[#145DA0]"
                />

                <span class="text-[17px] font-black text-slate-900">
                  {{  useMoney().toMoney(item.price) || 0 }}
                </span>
              </div>

              <p
                class="mt-1.5 text-[9px] font-bold uppercase tracking-[0.7px] text-slate-400"
              >
                {{ t('minimumCapital') }}
              </p>
            </div>
          </div>
          <div class="border-t border-slate-100 px-3.5 py-3.5">
            <NuxtLink
              :to="isCurrentLevel(item.level) ? undefined : '/support'"
              class="block"
            >
              <button
                type="button"
                class="flex h-11 w-full items-center justify-center gap-2 rounded-[13px] text-[12px] font-extrabold transition-all duration-200 active:scale-[0.97]"
                :class="
                  isCurrentLevel(item.level)
                    ? 'border border-emerald-100 bg-emerald-50 text-emerald-600'
                    : 'bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_6px_16px_rgba(6,26,64,0.18)]'
                "
              >
                <UIcon
                  :name="
                    isCurrentLevel(item.level)
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-arrow-up-right'
                  "
                  class="h-4 w-4"
                />

                {{ isCurrentLevel(item.level) ? t("inUse") : t("upgradeNow") }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="mt-4 flex items-start gap-3 rounded-[20px] border border-slate-200 bg-white px-3.5 py-3.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]"
      >
        <!-- ICON -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#061A40]"
        >
          <UIcon
            name="i-heroicons-information-circle"
            class="h-[18px] w-[18px] text-white"
          />
        </div>

        <!-- CONTENT -->
        <div class="min-w-0">
          <p class="text-[11px] font-black text-slate-800">
            {{ t("missionInfo") }}
          </p>

          <p class="mt-1 text-[10px] leading-[16px] text-slate-500">
            {{ t("missionDescription") }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
const authStore = useAuthStore();
const { t } = useI18n();
const list = ref([]);
const loading = ref(true);
const isCurrentLevel = (level) => {
  return authStore?.profile?.level === level;
};
const getBank = async () => {
  try {
    loading.value = true;

    const data = await useAPI("plan/public/get");
    list.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getBank();
});
</script>
