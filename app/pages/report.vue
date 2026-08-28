<template>
  <div class="min-h-screen bg-[#F4F7FB]">
    <!-- HEADER -->
    <LayoutPublicHeader
      :title="t('financialReport')"
      icon="i-heroicons-chart-bar-square"
    />
    <div class="px-2 pt-[65px] pb-4">
      <div
        class="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#061A40] to-[#145DA0] px-4 py-4 text-white shadow-[0_12px_30px_rgba(6,26,64,0.20)]"
      >
        <div
          class="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-white/[0.07]"
        />

        <div
          class="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full border-[14px] border-white/[0.04]"
        />

        <div class="relative">
          <!-- TOP -->
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-[10px] font-bold uppercase tracking-[1.5px] text-blue-200/80"
              >
                {{ t("financialReport") }}
              </p>

              <p class="mt-1 text-[11px] font-medium text-white/60">
                {{ t("availablebalance") }}
              </p>
            </div>

            <div
              class="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-white/10"
            >
              <UIcon
                name="i-heroicons-chart-bar-square"
                class="h-[18px] w-[18px] text-white"
              />
            </div>
          </div>

          <!-- BALANCE -->
          <div class="mt-2">
            <span class="text-[28px] font-black leading-none tracking-[-0.8px]">
              ${{ useMoney().toMoney(authStore.profile?.coin || 0) }}
            </span>
          </div>

          <!-- BOTTOM -->
          <div
            class="mt-4 flex items-center justify-between border-t border-white/10 pt-3"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
              >
                <UIcon
                  name="i-heroicons-arrow-trending-up"
                  class="h-3.5 w-3.5 text-white"
                />
              </div>

              <span class="text-[10px] font-semibold text-white/75">
                {{ state.transactions?.length || 0 }}
                {{ t("transactions") }}
              </span>
            </div>

            <span class="text-[10px] font-medium text-white/45">
              {{ t("financialTransaction") }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-2">
        <div
          class="flex gap-1 rounded-[16px] border border-slate-200 bg-white p-1.5 shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
        >
          <button
            v-for="item in tabs"
            :key="item.value"
            @click="changeTab(item.value)"
            class="min-w-[85px] flex-1 rounded-[11px] px-3 py-2.5 text-[11px] font-black transition-all duration-200 active:scale-[0.97]"
            :class="
              tab === item.value
                ? 'bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_4px_10px_rgba(6,26,64,0.18)]'
                : 'text-slate-500 hover:bg-slate-50'
            "
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- ================= SECTION TITLE ================= -->
      <div class="mt-2 mb-2 flex items-end justify-between">
        <div>
          <h2 class="text-[17px] font-black tracking-[-0.3px] text-slate-900">
            {{ t("financialReport") }}
          </h2>

          <p class="mt-1 text-[10px] font-medium text-slate-400">
            {{ state.transactions?.length || 0 }}
            {{ t("transactions") }}
          </p>
        </div>

        <!-- GRADIENT BADGE -->
        <div
          class="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] px-2.5 py-1.5 text-white"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-white" />

          <span class="text-[9px] font-bold"> ACTIVITY </span>
        </div>
      </div>

      <!-- ================= LOADING ================= -->
      <div
        v-if="state.loading"
        class="overflow-hidden rounded-[22px] border border-slate-200 bg-white px-5 py-14 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
      >
        <div
          class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0]"
        >
          <UIcon name="i-svg-spinners-ring-resize" class="h-6 w-6 text-white" />
        </div>

        <p class="mt-3 text-[11px] font-bold text-slate-500">
          {{ t("loadingData") }}
        </p>
      </div>

      <!-- ================= EMPTY ================= -->
      <div
        v-else-if="!state.transactions?.length"
        class="overflow-hidden rounded-[22px] border border-slate-200 bg-white px-5 py-14 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] shadow-[0_8px_18px_rgba(6,26,64,0.18)]"
        >
          <UIcon
            name="i-heroicons-document-chart-bar"
            class="h-7 w-7 text-white"
          />
        </div>

        <p class="mt-4 text-[15px] font-black text-slate-900">
          {{ t("noTransactions") }}
        </p>

        <p
          class="mx-auto mt-1.5 max-w-[260px] text-[10px] leading-5 text-slate-400"
        >
          {{ t("financialTransaction") }}
        </p>
      </div>

      <!-- ================= TRANSACTION LIST ================= -->
      <div
        v-else
        class="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)]"
      >
        <div
          v-for="(item, index) in state.transactions"
          :key="item._id"
          class="relative px-3.5 py-3.5 transition-all active:bg-slate-50"
          :class="
            index !== state.transactions.length - 1
              ? 'border-b border-slate-100'
              : ''
          "
        >
          <div class="flex gap-3">
            <!-- TIMELINE -->
            <div class="relative flex w-9 shrink-0 justify-center">
              <!-- LINE -->
              <div
                v-if="index !== state.transactions.length - 1"
                class="absolute left-1/2 top-9 bottom-[-20px] w-px bg-slate-200"
              />

              <!-- ICON -->
              <div
                class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-sm"
                :class="
                  item.type === 'deposit'
                    ? 'bg-gradient-to-r from-[#061A40] to-[#145DA0]'
                    : 'bg-slate-800'
                "
              >
                <UIcon
                  :name="
                    item.type === 'deposit'
                      ? 'i-heroicons-arrow-down-left'
                      : 'i-heroicons-arrow-up-right'
                  "
                  class="h-4 w-4 text-white"
                />
              </div>
            </div>

            <!-- CONTENT -->
            <div class="min-w-0 flex-1">
              <!-- TOP -->
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="truncate text-[14px] font-black text-slate-900">
                    {{ item.type === "deposit" ? t("deposit") : t("withdraw") }}
                  </h3>

                  <p
                    class="mt-0.5 truncate text-[10px] font-medium text-slate-400"
                  >
                    {{
                      t(item.note, {
                        amount: `${item.amount}`,
                      }) || t("financialTransaction")
                    }}
                  </p>
                </div>

                <!-- AMOUNT -->
                <div class="shrink-0 text-right">
                  <p
                    class="text-[15px] font-black tracking-tight"
                    :class="
                      item.type === 'deposit'
                        ? 'text-[#145DA0]'
                        : 'text-slate-800'
                    "
                  >
                    {{ item.type === "deposit" ? "+" : "-" }}
                    ${{ useMoney().toMoney(item.amount) }}
                  </p>

                  <UBadge
                    :color="getStatusColor(item.status)"
                    variant="soft"
                    class="mt-1 rounded-full px-2 py-0.5 text-[8px] font-bold"
                  >
                    {{ getStatusText(item.status) }}
                  </UBadge>
                </div>
              </div>

              <!-- DATE -->
              <div class="mt-2.5 flex items-center gap-1.5">
                <UIcon
                  name="i-heroicons-clock"
                  class="h-3 w-3 text-[#145DA0]"
                />

                <span class="text-[10px] font-medium text-slate-400">
                  {{ dayjs(item.createdAt).format("DD/MM/YYYY HH:mm") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <div
          v-if="page.total > page.limit"
          class="border-t border-slate-100 bg-[#F8FAFC] px-3 py-3"
        >
          <div class="flex justify-center">
            <UPagination
              v-model:page="page.current"
              :items-per-page="page.limit"
              :total="page.total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const { t } = useI18n();
const authStore = useAuthStore();

const tab = ref("all");

const page = reactive({
  current: 1,
  limit: 15,
  total: 0,
});

const tabs = computed(() => [
  {
    label: t("all"),
    value: "all",
  },
  {
    label: t("deposit"),
    value: "deposit",
  },
  {
    label: t("withdraw"),
    value: "withdraw",
  },
]);

const state = reactive({
  transactions: [],
  loading: false,
  firstLoading: true,
});

const getStatusColor = (status) => {
  switch (status) {
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "gray";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "success":
      return t("success");
    case "pending":
      return t("pending");
    case "failed":
      return t("failed");
    default:
      return status;
  }
};

let requestId = 0;

const getTransactions = async (showFirstLoading = false) => {
  const currentRequest = ++requestId;

  try {
    if (showFirstLoading) {
      state.firstLoading = true;
    } else {
      state.loading = true;
    }

    const response = await useAPI("payment/public/report", {
      type: tab.value,
      current: page.current,
      limit: page.limit,
    });

    // Nếu request này đã cũ thì bỏ qua
    if (currentRequest !== requestId) return;

    state.transactions = response.items || [];
    page.total = response.total || 0;
  } catch (e) {
    // Không xoá dữ liệu cũ nếu request cũ bị lỗi
    if (currentRequest !== requestId) return;

    console.log(e);

    state.transactions = [];
    page.total = 0;
  } finally {
    if (currentRequest !== requestId) return;

    state.loading = false;
    state.firstLoading = false;
  }
};

const changeTab = (value) => {
  if (tab.value === value) return;
  tab.value = value;
  page.current = 1;
  getTransactions();
};

watch(
  () => page.current,
  (newPage, oldPage) => {
    if (newPage === oldPage) return;
    getTransactions();
  },
);

onMounted(() => {
  getTransactions(true);
});
</script>
