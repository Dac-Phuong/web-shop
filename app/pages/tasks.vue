<script setup>
const { t } = useI18n();
const authStore = useAuthStore();
const toast = useNotify();
const loading = ref(false);
const loadingConfirm = ref(false);
const product = ref(null);
const status = ref(null);

const modal = ref({
  show: false,
  gift: false,
});

const random = async () => {
  try {
    loading.value = true;
    modal.value.gift = false;
    modal.value.show = true;
    await new Promise((r) => setTimeout(r, 2000));

    const res = await useAPI("product/public/random");
    product.value = res?.result || res?.data || res;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const confirmPartner = async () => {
  try {
    loading.value = true;
    await new Promise((r) => setTimeout(r, 2000));
    await useAPI("product/public/confirm", { productId: product.value._id });
    getData();
    modal.value.show = false;
    toast.success(t("orderCompletedCommissionAdded"));
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const getData = async () => {
  try {
    const res = await useAPI("product/public/get");
    status.value = res;
    modal.value.gift = res.bonus;
  } catch (e) {
    console.log(e);
  }
};

const profitByPercent = computed(() => {
  const price = Number(product.value?.price || 0);
  const percent = Number(status.value?.commission || 0);
  return Number(((price * percent) / 100).toFixed(3));
});
getData();
</script>
<template>
  <div class="min-h-screen bg-[#F4F7FB]">
    <LayoutPublicHeader :title="t('partner')" icon="pajamas:partner-verified" />

    <div v-if="authStore.profile?.level == 0" class="px-3 pt-[65px]">
      <div
        class="relative overflow-hidden rounded-[24px] border border-[#DCEAF5] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
      >
        <!-- Decorative -->
        <div
          class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#EAF3FB] blur-2xl"
        />

        <div class="relative">
          <div class="flex items-start gap-3">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EAF3FB]"
            >
              <UIcon
                name="i-heroicons-lock-closed"
                class="h-5 w-5 text-[#145DA0]"
              />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-[16px] font-extrabold text-slate-900">
                  {{ t("noTask") }}
                </h3>

                <span
                  class="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500"
                >
                  VIP
                </span>
              </div>

              <p class="mt-1 text-[11px] leading-5 text-slate-500">
                {{ t("noTaskDescription") }}
              </p>
            </div>
          </div>

          <div class="mt-4 rounded-[15px] bg-[#F5F9FD] p-3">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-heroicons-sparkles"
                class="h-4 w-4 text-[#145DA0]"
              />

              <span class="text-[11px] font-semibold text-slate-600">
                {{ t("upgradeNow") }}
              </span>
            </div>
          </div>

          <NuxtLink
            to="/upgrade"
            class="mt-3 flex h-11 items-center justify-center rounded-[13px] bg-[#145DA0] text-[11px] font-extrabold text-white shadow-[0_7px_18px_rgba(20,93,160,0.22)] transition hover:bg-[#104D88] active:scale-[0.98]"
          >
            {{ t("upgradeNow") }}

            <UIcon name="i-heroicons-arrow-right" class="ml-2 h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="px-2 pt-[65px] pb-6">
      <section
        class="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#061A40] to-[#145DA0] p-4 text-white shadow-[0_12px_30px_rgba(6,26,64,0.24)]"
      >
        <!-- BACKGROUND DECORATION -->
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/[0.08] blur-3xl"
        ></div>

        <div
          class="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#4DA8FF]/10 blur-3xl"
        ></div>

        <div
          class="pointer-events-none absolute right-[35%] top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-white/[0.025] blur-2xl"
        ></div>

        <div class="relative">
          <!-- HEADER -->
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <!-- BADGES -->
              <div class="flex items-center gap-1.5">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-[#69B8FF] shadow-[0_0_8px_rgba(105,184,255,0.8)]"
                  ></span>

                  {{ t("intermediary") }}
                </span>
              </div>

              <!-- TITLE -->
              <h2
                class="mt-3 text-[23px] font-black leading-none tracking-[-0.04em]"
              >
                Graff Home
              </h2>

              <p
                class="mt-1.5 text-[11px] font-semibold tracking-wide text-blue-100/70"
              >
                Graff Home Collection
              </p>
            </div>

            <!-- ICON -->
            <div
              class="relative flex shrink-0 items-center justify-center"
            >
              <div class="w-[80px] shrink-0">
                <UiImg
                  src="/assets/img/icon-tasks.png"
                  class="h-[80px] w-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,.20)]"
                />
              </div>
            </div>
          </div>
          <div
            class="relative mt-4 overflow-hidden rounded-[18px] border border-white/10 bg-[#061A40]/45 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md"
          >
            <div class="flex items-center gap-3">
              <!-- CONTENT -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <p
                    class="text-[10px] font-black uppercase tracking-[0.14em] text-blue-200"
                  >
                    {{ t("todayTask") || "TODAY'S TASK" }}
                  </p>
                </div>

                <div class="mt-2 flex items-end gap-1.5">
                  <span
                    class="text-[30px] font-black leading-none tracking-[-0.06em]"
                  >
                    {{ status?.orderToday || 0 }}
                  </span>

                  <span class="pb-0.5 text-[12px] font-bold text-blue-100/60">
                    / {{ status?.maxOrders || 0 }}
                  </span>
                </div>

                <p class="mt-1.5 text-[11px] font-medium text-blue-100/60">
                  {{ t("missionComplete") }}
                </p>
              </div>

              <!-- PROGRESS -->
              <div
                class="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center"
              >
                <svg
                  class="absolute h-full w-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,.12)"
                    stroke-width="3"
                  />

                  <path
                    d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8CC8FF"
                    stroke-linecap="round"
                    stroke-width="3"
                    :stroke-dasharray="`${
                      status?.maxOrders
                        ? Math.min(
                            ((status?.orderToday || 0) / status.maxOrders) *
                              100,
                            100,
                          )
                        : 0
                    }, 100`"
                  />
                </svg>

                <span class="relative text-[12px] font-black">
                  {{
                    status?.maxOrders
                      ? Math.round(
                          ((status?.orderToday || 0) / status.maxOrders) * 100,
                        )
                      : 0
                  }}%
                </span>
              </div>
            </div>

            <!-- PROGRESS BAR -->
            <div class="mt-3.5">
              <div class="h-[5px] overflow-hidden rounded-full bg-black/25">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#145DA0] to-[#8CC8FF] shadow-[0_0_10px_rgba(140,200,255,.35)] transition-all duration-700 ease-out"
                  :style="{
                    width: `${
                      status?.maxOrders
                        ? Math.min(
                            ((status?.orderToday || 0) / status.maxOrders) *
                              100,
                            100,
                          )
                        : 0
                    }%`,
                  }"
                ></div>
              </div>

              <div class="mt-2 flex items-center justify-between gap-2">
                <span
                  class="truncate text-[11px] font-semibold text-blue-100/60"
                >
                  {{ t("missionComplete") }}
                </span>

                <span
                  class="shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-2 py-1 text-[10px] font-black text-white"
                >
                  {{
                    Math.max(
                      (status?.maxOrders || 0) - (status?.orderToday || 0),
                      0,
                    )
                  }}
                  {{ t("remaining") || "remaining" }}
                </span>
              </div>
            </div>
          </div>
          <button
            @click="random"
            :disabled="loading"
            class="group relative mt-3.5 flex h-[47px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-white font-black text-[#061A40] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
          >
            <span
              v-if="!loading"
              class="relative flex items-center gap-1.5 text-[13px]"
            >
              {{ t("clicktoPlaceOrder") }}

              <UIcon
                name="i-heroicons-arrow-right"
                class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>

            <span v-else class="relative flex items-center gap-1.5 text-[13px]">
              <UIcon name="i-lucide-loader-2" class="h-4 w-4 animate-spin" />

              {{ t("processing") }}
            </span>
          </button>
        </div>
      </section>
      <section class="mt-3 grid grid-cols-2 gap-2.5">
        <!-- TASK -->
        <div
          class="group relative overflow-hidden rounded-[18px] border border-[#D8E5F2] bg-white p-3.5 shadow-[0_5px_18px_rgba(15,48,85,0.055)] transition-all active:scale-[0.98]"
        >
          <div
            class="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#145DA0]"
          ></div>

          <div class="relative">
            <div class="flex items-center justify-between gap-2">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F2FC] ring-1 ring-[#C9DFF2]"
              >
                <UIcon
                  name="i-heroicons-clipboard-document-list"
                  class="h-[19px] w-[19px] text-[#145DA0]"
                />
              </div>

              <span
                class="rounded-full bg-[#E8F2FC] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#145DA0]"
              >
                {{ t("task") }}
              </span>
            </div>

            <p
              class="mt-4 text-[23px] font-black leading-none tracking-[-0.05em] text-[#10213A]"
            >
              {{ status?.maxOrders || 0 }}
            </p>

            <p class="mt-1.5 text-[11px] font-semibold text-slate-500">
              {{ t("workOfTheDay") }}
            </p>
          </div>
        </div>

        <!-- COMPLETE -->
        <div
          class="group relative overflow-hidden rounded-[18px] border border-[#D8E5F2] bg-white p-3.5 shadow-[0_5px_18px_rgba(15,48,85,0.055)] transition-all active:scale-[0.98]"
        >
          <div
            class="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#145DA0]"
          ></div>

          <div class="relative">
            <div class="flex items-center justify-between gap-2">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F2FC] ring-1 ring-[#C9DFF2]"
              >
                <UIcon
                  name="i-heroicons-check-badge"
                  class="h-[19px] w-[19px] text-[#145DA0]"
                />
              </div>

              <span
                class="rounded-full bg-[#E8F2FC] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#145DA0]"
              >
                {{ t("done") }}
              </span>
            </div>

            <p
              class="mt-4 text-[23px] font-black leading-none tracking-[-0.05em] text-[#10213A]"
            >
              {{ status?.orderToday || 0 }}

              <span class="text-[12px] font-bold text-slate-400">
                / {{ status?.maxOrders || 0 }}
              </span>
            </p>

            <p class="mt-1.5 text-[11px] font-semibold text-slate-500">
              {{ t("missionComplete") }}
            </p>
          </div>
        </div>

        <!-- PROFIT -->
        <div
          class="group relative overflow-hidden rounded-[18px] border border-[#D8E5F2] bg-white p-3.5 shadow-[0_5px_18px_rgba(15,48,85,0.055)] transition-all active:scale-[0.98]"
        >
          <div
            class="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#145DA0]"
          ></div>

          <div class="relative">
            <div class="flex items-center justify-between gap-2">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F2FC] ring-1 ring-[#C9DFF2]"
              >
                <UIcon
                  name="i-heroicons-banknotes"
                  class="h-[19px] w-[19px] text-[#145DA0]"
                />
              </div>

              <span
                class="rounded-full bg-[#E8F2FC] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#145DA0]"
              >
                {{ t("profit") }}
              </span>
            </div>

            <p
              class="mt-4 truncate text-[19px] font-black leading-none tracking-[-0.04em] text-[#145DA0]"
            >
              ${{ useMoney().toMoney(status?.profitToday || 0) }}
            </p>

            <p class="mt-1.5 text-[11px] font-semibold text-slate-500">
              {{ t("missionIncome") }}
            </p>
          </div>
        </div>

        <!-- BALANCE -->
        <div
          class="group relative overflow-hidden rounded-[18px] border border-[#D8E5F2] bg-white p-3.5 shadow-[0_5px_18px_rgba(15,48,85,0.055)] transition-all active:scale-[0.98]"
        >
          <div
            class="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#145DA0]"
          ></div>

          <div class="relative">
            <div class="flex items-center justify-between gap-2">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#E8F2FC] ring-1 ring-[#C9DFF2]"
              >
                <UIcon
                  name="i-heroicons-wallet"
                  class="h-[19px] w-[19px] text-[#145DA0]"
                />
              </div>

              <span
                class="rounded-full bg-[#E8F2FC] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#145DA0]"
              >
                {{ t("wallet") }}
              </span>
            </div>

            <p
              class="mt-4 truncate text-[19px] font-black leading-none tracking-[-0.04em] text-[#10213A]"
            >
              ${{ useMoney().toMoney(status?.coin || 0) }}
            </p>

            <p class="mt-1.5 text-[11px] font-semibold text-slate-500">
              {{ t("currentBalance") }}
            </p>
          </div>
        </div>
      </section>
      <section
        class="relative mt-3 overflow-hidden rounded-[19px] bg-gradient-to-r from-[#061A40] to-[#145DA0] shadow-[0_9px_24px_rgba(6,26,64,0.16)]"
      >
        <div
          class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/[0.08] blur-2xl"
        ></div>

        <div
          class="relative flex min-h-[100px] items-center justify-between p-3.5"
        >
          <div class="flex max-w-[80%] items-start gap-2.5">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.10]"
            >
              <UIcon
                name="i-heroicons-information-circle"
                class="h-[19px] w-[19px] text-white"
              />
            </div>

            <div class="min-w-0">
              <h3 class="text-[14px] font-black text-white">
                {{ t("missionInfo") }}
              </h3>

              <p class="mt-1 text-[11px] leading-4 text-blue-100/75">
                {{ t("missionDescription") }}
              </p>
            </div>
          </div>

          <UiImg
            src="/assets/img/icon-b.png"
            class="absolute -bottom-1 -right-1 h-[70px] w-[70px] object-contain opacity-90 drop-shadow-[0_8px_16px_rgba(0,0,0,.22)]"
          />
        </div>
      </section>
    </div>

    <UModal
      v-model:open="modal.show"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-md overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(6,26,64,0.20)]',
      }"
    >
      <template #content>
        <div
          v-if="loading"
          class="flex min-h-[290px] flex-col items-center justify-center bg-white px-6"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-r from-[#061A40] to-[#145DA0] shadow-[0_8px_22px_rgba(6,26,64,0.20)]"
          >
            <UIcon
              name="i-svg-spinners-ring-resize"
              class="h-7 w-7 text-white"
            />
          </div>

          <p class="mt-5 text-[14px] font-extrabold text-slate-900">
            {{ t("processing") }}
          </p>

          <p class="mt-1 text-[12px] text-slate-400">
            {{ t("pleaseWaitaMoment") }}
          </p>
        </div>

        <div v-else-if="product">
          <!-- PRODUCT IMAGE -->
          <div class="relative h-[200px] overflow-hidden bg-slate-100">
            <UiImg
              :src="product.image || product.thumbnail"
              class="h-full w-full object-cover"
            />

            <!-- OVERLAY -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#061A40]/90 via-[#061A40]/10 to-transparent"
            ></div>

            <!-- TOP BADGE -->
            <div class="absolute left-4 top-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#061A40]/70 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg backdrop-blur-md"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-[#8CC8FF]"></span>

                {{ t("intermediary") }}
              </span>
            </div>

            <!-- PRODUCT INFO -->
            <div class="absolute bottom-4 left-4 right-4">
              <p
                class="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100/70"
              >
                Graff Home
              </p>

              <h2
                class="mt-1.5 line-clamp-2 text-[21px] font-black leading-tight tracking-[-0.02em] text-white"
              >
                {{ product.name }}
              </h2>
            </div>
          </div>

          <!-- CONTENT -->
          <div class="px-4 pb-4 pt-4">
            <!-- PRICE + COMMISSION -->
            <div class="flex items-center justify-between gap-3">
              <!-- PRICE -->
              <div class="min-w-0">
                <p class="text-[11px] font-semibold text-slate-400">
                  {{ t("productPrice") }}
                </p>

                <p
                  class="mt-1 text-[22px] font-black leading-none tracking-tight text-[#061A40]"
                >
                  ${{ useMoney().toMoney(product.price) }}
                </p>
              </div>

              <div
                class="flex shrink-0 items-center gap-1.5 rounded-full border border-[#C9DFF2] bg-[#E8F2FC] px-2.5 py-1.5 text-[11px] font-extrabold text-[#145DA0]"
              >
                <UIcon
                  name="i-heroicons-arrow-trending-up"
                  class="h-3.5 w-3.5"
                />

                +{{ status?.commission || 0 }}%
              </div>
            </div>

            <!-- EXPECTED INCOME -->
            <div
              class="relative mt-3 overflow-hidden rounded-[16px] border border-[#D8E5F2] bg-gradient-to-r from-[#F3F7FB] to-[#EAF3FB] px-3.5 py-3"
            >
              <div
                class="absolute right-0 top-0 h-16 w-16 rounded-full bg-[#145DA0]/5 blur-2xl"
              ></div>

              <div class="relative flex items-center justify-between gap-3">
                <div class="flex min-w-0 items-center gap-2.5">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-r from-[#061A40] to-[#145DA0] shadow-[0_5px_12px_rgba(6,26,64,0.15)]"
                  >
                    <UIcon
                      name="i-heroicons-banknotes"
                      class="h-4 w-4 text-white"
                    />
                  </div>

                  <div>
                    <p class="text-[11px] font-semibold text-slate-500">
                      {{ t("expectedIncome") }}
                    </p>

                    <p class="mt-0.5 text-[10px] text-slate-400">
                      {{ status?.commission || 0 }}% {{ t("commission") }}
                    </p>
                  </div>
                </div>

                <p
                  class="shrink-0 text-[18px] font-black leading-none text-[#145DA0]"
                >
                  ${{ useMoney().toMoney(profitByPercent) }}
                </p>
              </div>
            </div>

            <!-- DIVIDER -->
            <div class="my-4 h-px bg-slate-100"></div>

            <!-- ACTION -->
            <div class="grid grid-cols-2 gap-2.5">
              <!-- CANCEL -->
              <UButton
                color="neutral"
                variant="soft"
                class="h-11 rounded-xl border border-slate-200 bg-white text-[12px] font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.98]"
                @click="modal.show = false"
              >
                {{ t("cancel") }}
              </UButton>

              <!-- CONFIRM -->
              <UButton
                :loading="loadingConfirm"
                class="h-11 rounded-xl bg-gradient-to-r from-[#061A40] to-[#145DA0] text-[12px] font-extrabold text-white shadow-[0_7px_18px_rgba(6,26,64,0.22)] transition-all hover:from-[#071F4D] hover:to-[#1769B0] active:scale-[0.98]"
                @click="confirmPartner"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <UIcon name="i-heroicons-check" class="h-4 w-4" />

                  {{ t("submit") }}
                </span>
              </UButton>
            </div>
          </div>
        </div>

        <!-- ================= EMPTY ================= -->
        <div
          v-else
          class="flex min-h-[290px] flex-col items-center justify-center bg-white px-8 text-center"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-r from-[#061A40] to-[#145DA0] shadow-[0_8px_22px_rgba(6,26,64,0.18)]"
          >
            <UIcon name="i-heroicons-cube" class="h-7 w-7 text-white" />
          </div>

          <p class="mt-5 text-[14px] font-extrabold text-slate-800">
            {{ t("noProduct") }}
          </p>

          <p class="mt-1.5 text-[12px] leading-5 text-slate-400">
            No available product at the moment
          </p>
        </div>
      </template>
    </UModal>
    <UModal
      v-model:open="modal.gift"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-[360px] overflow-hidden rounded-[26px] border border-white/10 bg-transparent shadow-[0_24px_70px_rgba(6,26,64,0.30)]',
      }"
    >
      <template #content>
        <div
          class="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#061A40] to-[#145DA0] p-5 text-center"
        >
          <!-- BACKGROUND -->
          <div
            class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.10] blur-3xl"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-[#8CC8FF]/10 blur-3xl"
          ></div>

          <!-- DECORATION -->
          <div
            class="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-white/[0.04] blur-2xl"
          ></div>

          <div class="relative">
            <!-- BADGE -->
            <span
              class="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.10] px-3 py-1.5 text-[10px] font-bold text-blue-100 backdrop-blur-md"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-[#8CC8FF]"></span>

              Bonus Gift
            </span>

            <!-- GIFT -->
            <div class="mt-5 flex justify-center">
              <div
                class="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
              >
                <div
                  class="absolute inset-2 rounded-full border border-white/[0.06]"
                ></div>

                <img
                  src="/images/icon/gift-box.gif"
                  alt="Gift"
                  class="relative h-24 w-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,.25)]"
                />
              </div>
            </div>

            <!-- TITLE -->
            <h3 class="mt-5 text-[20px] font-black tracking-tight text-white">
              {{ t("congratulations") }}!
            </h3>

            <!-- DESCRIPTION -->
            <p
              class="mx-auto mt-2 max-w-[270px] text-[12px] leading-5 text-blue-100/70"
            >
              {{ t("youJustReceived") }}

              <span class="font-bold text-white">
                {{ t("highValueOrder") }}
              </span>
            </p>

            <!-- CLAIM -->
            <button
              class="mt-6 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-white text-[13px] font-extrabold text-[#061A40] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all hover:bg-blue-50 active:scale-[0.98]"
              @click="random"
            >
              {{ t("claimNow") }}

              <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
<style>
.stat-card {
  position: relative;

  min-width: 0;

  overflow: hidden;

  border: 1px solid #e7eef5;
  border-radius: 19px;

  background: #ffffff;

  padding: 14px;

  box-shadow: 0 5px 18px rgba(15, 23, 42, 0.045);

  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.stat-card::after {
  content: "";

  position: absolute;

  right: -22px;
  bottom: -22px;

  width: 70px;
  height: 70px;

  border-radius: 50%;

  background: #eaf3fb;

  opacity: 0.45;

  pointer-events: none;
}

.stat-card:active {
  transform: scale(0.985);
}

.stat-top {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-icon {
  display: flex;

  width: 36px;
  height: 36px;

  align-items: center;
  justify-content: center;

  border-radius: 12px;
}

.stat-title {
  font-size: 9px;
  line-height: 1;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.06em;

  color: #94a3b8;
}

.stat-value {
  position: relative;
  z-index: 1;

  margin-top: 13px;

  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 22px;
  line-height: 1;

  font-weight: 900;

  letter-spacing: -0.04em;

  color: #0f172a;
}

.stat-description {
  position: relative;
  z-index: 1;

  margin-top: 7px;

  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 10px;
  line-height: 1.3;

  color: #94a3b8;
}
</style>
