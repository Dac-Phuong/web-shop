<template>
  <div class="min-h-screen bg-[#F5F8FC]">
    <!-- HEADER -->
    <LayoutPublicHeader
      :title="t('orderHis')"
      :description="t('manageOrder')"
      icon="i-heroicons-shopping-bag"
    />

    <!-- CONTENT -->
    <div class="px-2 pt-[65px] pb-6">
      <!-- ================= SUMMARY ================= -->
      <div
        class="relative overflow-hidden rounded-[24px] border border-[#0A326B] bg-gradient-to-br from-[#031735] via-[#082F63] to-[#145DA0] p-4 text-white shadow-[0_12px_30px_rgba(3,23,53,0.28)]"
      >
        <div
          class="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border-[20px] border-white/[0.05]"
        />

        <div
          class="pointer-events-none absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-[#1B8FE5]/15 blur-2xl"
        />

        <div
          class="pointer-events-none absolute right-16 bottom-0 h-20 w-20 rounded-full bg-white/[0.03] blur-xl"
        />

        <div class="relative">
          <!-- TITLE -->
          <div class="flex items-center gap-2.5">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner"
            >
              <UIcon
                name="i-heroicons-chart-bar"
                class="h-[18px] w-[18px] text-white"
              />
            </div>

            <div>
              <p class="text-[13px] font-black text-white">
                {{ t("orderHis") }}
              </p>

              <p class="mt-0.5 text-[9px] font-medium text-blue-200/70">
                {{ t("totalOrder") }}
              </p>
            </div>
          </div>

          <!-- STATS -->
          <div class="mt-4 grid grid-cols-2 divide-x divide-white/15">
            <!-- TOTAL ORDER -->
            <div class="pr-4">
              <p
                class="text-[10px] font-semibold uppercase tracking-[0.5px] text-blue-200/70"
              >
                {{ t("totalOrder") }}
              </p>

              <div class="mt-1.5 flex items-end gap-2">
                <span
                  class="text-[28px] font-black leading-none tracking-tight"
                >
                  {{ overview.totalOrders || 0 }}
                </span>

                <UIcon
                  name="i-heroicons-shopping-bag"
                  class="mb-0.5 h-[17px] w-[17px] text-blue-200"
                />
              </div>
            </div>

            <!-- PROFIT -->
            <div class="pl-4">
              <p
                class="text-[10px] font-semibold uppercase tracking-[0.5px] text-blue-200/70"
              >
                {{ t("totalProfit") }}
              </p>

              <div class="mt-1.5 flex items-end gap-1">
                <span
                  class="text-[28px] font-black leading-none tracking-tight"
                >
                  ${{ useMoney().toMoney(overview.totalProfit || 0) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3 flex items-center justify-between">
        <div>
          <h2 class="text-[17px] font-black tracking-[-0.2px] text-slate-900">
            {{ t("orderHis") }}
          </h2>

          <p class="mt-1 text-[11px] font-medium text-slate-500">
            <span class="font-bold text-[#145DA0]">
              {{ overview.totalOrders || 0 }}
            </span>
            {{ t("totalOrder") }}
          </p>
        </div>

        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#061A40] shadow-[0_5px_12px_rgba(6,26,64,0.18)]"
        >
          <UIcon
            name="i-heroicons-clipboard-document-list"
            class="h-[18px] w-[18px] text-white"
          />
        </div>
      </div>

      <div v-if="loading" class="space-y-3">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
        >
          <div class="flex gap-3">
            <USkeleton class="h-12 w-12 shrink-0 rounded-xl" />

            <div class="flex-1 space-y-2">
              <USkeleton class="h-4 w-36 rounded-md" />
              <USkeleton class="h-3 w-28 rounded-md" />
              <USkeleton class="h-3 w-24 rounded-md" />
            </div>

            <USkeleton class="h-6 w-20 rounded-full" />
          </div>

          <div class="mt-3 grid grid-cols-2 gap-2">
            <USkeleton class="h-14 rounded-xl" />
            <USkeleton class="h-14 rounded-xl" />
          </div>
        </div>
      </div>

      <!-- ================= ORDERS ================= -->
      <div v-else-if="orders.length" class="space-y-3">
        <div
          v-for="item in orders"
          :key="item._id"
          class="group relative overflow-hidden rounded-[21px] border border-slate-200 bg-white p-3.5 shadow-[0_7px_22px_rgba(15,23,42,0.07)] transition-all duration-200 active:scale-[0.99]"
        >
          <!-- LEFT ACCENT -->
          <div class="absolute bottom-0 left-0 top-0 w-[3px] bg-[#145DA0]" />

          <!-- TOP -->
          <div class="flex items-start gap-3">
            <!-- PRODUCT IMAGE -->
            <div
              class="relative h-12 w-12 shrink-0 overflow-hidden rounded-[13px] border border-slate-200 bg-slate-100 shadow-sm"
            >
              <UiImg
                v-if="item.product?.image"
                :src="item.product.image"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-[#061A40]"
              >
                <UIcon
                  name="i-heroicons-shopping-bag"
                  class="h-5 w-5 text-white"
                />
              </div>
            </div>

            <!-- INFO -->
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="truncate text-[14px] font-black text-slate-900">
                    {{ item.product?.name || "—" }}
                  </h3>

                  <p class="mt-1 text-[10px] font-medium text-slate-400">
                    {{ t("orderCode") }}

                    <span class="font-bold text-[#145DA0]">
                      #{{ item.code }}
                    </span>
                  </p>
                </div>

                <!-- STATUS -->
                <UBadge
                  :color="item.status == 1 ? 'success' : 'warning'"
                  variant="soft"
                  size="sm"
                  class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold"
                >
                  {{ item.status == 1 ? t("success") : t("pendding") }}
                </UBadge>
              </div>

              <!-- DATE -->
              <div class="mt-2 flex items-center gap-1.5">
                <UIcon
                  name="i-heroicons-clock"
                  class="h-3.5 w-3.5 text-[#145DA0]"
                />

                <span class="text-[10px] font-medium text-slate-400">
                  {{ dayjs(item.createdAt).format("DD/MM/YYYY HH:mm") }}
                </span>
              </div>
            </div>
          </div>

          <!-- VALUES -->
          <div class="mt-3 grid grid-cols-2 gap-2">
            <!-- ORDER VALUE -->
            <div
              class="rounded-[13px] border border-slate-200 bg-[#F5F7FA] px-3 py-2.5"
            >
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-semibold text-slate-500">
                  {{ t("orderValue") }}
                </p>

                <div
                  class="flex h-6 w-6 items-center justify-center rounded-lg bg-[#061A40]"
                >
                  <UIcon
                    name="i-heroicons-currency-dollar"
                    class="h-3.5 w-3.5 text-white"
                  />
                </div>
              </div>

              <p
                class="mt-1 text-[15px] font-black tracking-tight text-slate-900"
              >
                ${{ useMoney().toMoney(item.product?.price || 0) }}
              </p>
            </div>

            <!-- PROFIT -->
            <div
              class="rounded-[13px] border border-emerald-200 bg-emerald-50 px-3 py-2.5"
            >
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-bold text-emerald-700">
                  {{ t("profitReceived") }}
                </p>

                <div
                  class="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600"
                >
                  <UIcon
                    name="i-heroicons-arrow-trending-up"
                    class="h-3.5 w-3.5 text-white"
                  />
                </div>
              </div>

              <p
                class="mt-1 text-[15px] font-black tracking-tight text-emerald-700"
              >
                +${{ useMoney().toMoney(item.profit || 0) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= EMPTY ================= -->
      <div
        v-else
        class="mt-2 overflow-hidden rounded-[22px] border border-slate-200 bg-white px-5 py-12 text-center shadow-[0_7px_22px_rgba(15,23,42,0.05)]"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#061A40] shadow-[0_8px_20px_rgba(6,26,64,0.20)]"
        >
          <UIcon name="i-heroicons-shopping-bag" class="h-8 w-8 text-white" />
        </div>

        <h3 class="mt-4 text-[16px] font-black text-slate-900">
          {{ t("noOrders") }}
        </h3>

        <p
          class="mx-auto mt-2 max-w-[270px] text-[11px] leading-5 text-slate-500"
        >
          {{ t("completeTaskToCreateFirstOrder") }}
        </p>
      </div>

      <!-- ================= PAGINATION ================= -->
      <div v-if="page.total > page.limit" class="flex justify-center pt-5">
        <UPagination
          v-model:page="page.current"
          :items-per-page="page.limit"
          :total="page.total"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
const { t } = useI18n();

const loading = ref(false);

const orders = ref([]);

const overview = ref({
  totalOrders: 0,
  totalProfit: 0,
});

const page = ref({
  current: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
});

const getOrders = async () => {
  try {
    loading.value = true;

    const res = await useAPI("product/public/history", {
      page: page.value.current,
      limit: page.value.limit,
    });
    const data = res.result || res;

    overview.value = {
      totalOrders: data.totalOrders || 0,
      totalProfit: data.totalProfit || 0,
    };

    orders.value = data.orders || [];

    page.value.total = data.pagination?.total || 0;
    page.value.totalPages = data.pagination?.totalPages || 0;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

watch(
  () => page.value.current,
  () => {
    getOrders();
  },
);

onMounted(() => {
  getOrders();
});
</script>
