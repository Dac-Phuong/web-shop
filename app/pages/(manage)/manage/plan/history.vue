<script setup>
const list = ref([]);

const loading = ref({
  load: true,
});

const columns = [
  {
    accessorKey: "user",
    header: "Người dùng",
  },
  {
    accessorKey: "plan",
    header: "Gói VIP",
  },
  {
    accessorKey: "price",
    header: "Giá gói",
  },
  {
    accessorKey: "commission",
    header: "Hoa hồng",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian",
  },
];

// PAGE
const page = ref({
  size: 10,
  current: 1,
  total: 0,

  sort: {
    column: "createdAt",
    direction: "desc",
  },

  search: {
    value: null,
  },
});

// WATCH
watch(
  () => page.value.current,
  () => getList(),
);

watch(
  () => page.value.size,
  () => getList(),
);

watch(
  () => page.value.sort.column,
  () => getList(),
);

watch(
  () => page.value.sort.direction,
  () => getList(),
);

watch(
  () => page.value.search.value,
  (val) => !val && getList(),
);

// STATUS
const getStatus = (status) => {
  switch (status) {
    case "active":
      return {
        label: "Đang hoạt động",
        color: "success",
        icon: "i-lucide-badge-check",
      };

    case "pending":
      return {
        label: "Đang xử lý",
        color: "warning",
        icon: "i-lucide-loader-circle",
      };

    case "expired":
      return {
        label: "Hết hạn",
        color: "neutral",
        icon: "i-lucide-clock-3",
      };

    case "cancelled":
      return {
        label: "Đã hủy",
        color: "error",
        icon: "i-lucide-x-circle",
      };

    default:
      return {
        label: "Không xác định",
        color: "neutral",
        icon: "i-lucide-help-circle",
      };
  }
};

// GET LIST
const getList = async () => {
  try {
    loading.value.load = true;

    const data = await useAPI(
      "plan/manage/history",
      JSON.parse(JSON.stringify(page.value)),
    );
    list.value = data.list;

    page.value.total = data.total;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value.load = false;
  }
};

getList();
</script>

<template>
  <div class="space-y-4">
    
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-xl shadow-blue-500/20 sm:p-6"
    >
      <div
        class="absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-2xl"
      />
      <div
        class="absolute -bottom-20 left-1/3 size-56 rounded-full bg-indigo-400/20 blur-3xl"
      />

      <div
        class="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
          >
            <UIcon name="i-lucide-crown" class="size-6" />
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
              Lịch sử nâng cấp VIP
            </h1>
            <p class="mt-1 text-sm text-blue-100">
              Theo dõi toàn bộ lịch sử nâng cấp gói VIP của người dùng
            </p>
          </div>
        </div>

       
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <!-- TOTAL -->
      <div
        class="group relative overflow-hidden rounded-[22px] bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/15"
      >
        <!-- Background -->
        <div
          class="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-white/10"
        />

        <div
          class="pointer-events-none absolute -bottom-16 -right-4 size-32 rounded-full bg-white/5"
        />

        <div class="relative flex items-start justify-between">
          <div>
            <p class="text-xs font-medium text-white/70">Tổng giao dịch</p>

            <h3 class="mt-2 text-3xl font-black tracking-tight">
              {{ page.total }}
            </h3>

            <div class="mt-2 flex items-center gap-1.5">
              <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />

              <span class="text-[11px] text-white/70">
                Tổng lịch sử nâng cấp
              </span>
            </div>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
          >
            <UIcon name="i-lucide-receipt-text" class="size-5" />
          </div>
        </div>
      </div>

      <!-- ACTIVE -->
      <div
        class="group relative overflow-hidden rounded-[22px] border border-emerald-500/15 bg-emerald-500/[0.04] p-5"
      >
        <div
          class="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-emerald-500/5 blur-2xl"
        />

        <div class="relative flex items-start justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đang hoạt động</p>

            <h3
              class="mt-2 text-3xl font-black tracking-tight text-emerald-500"
            >
              {{ list.filter((item) => item.status === "active").length }}
            </h3>

            <div class="mt-2 flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-emerald-500" />

              <span class="text-[11px] text-muted">
                Gói VIP đang hiệu lực
              </span>
            </div>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-110"
          >
            <UIcon name="i-lucide-badge-check" class="size-5" />
          </div>
        </div>
      </div>

      <!-- PENDING -->
      <div
        class="group relative overflow-hidden rounded-[22px] border border-amber-500/15 bg-amber-500/[0.04] p-5 sm:col-span-2 xl:col-span-1"
      >
        <div
          class="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-amber-500/5 blur-2xl"
        />

        <div class="relative flex items-start justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đang xử lý</p>

            <h3 class="mt-2 text-3xl font-black tracking-tight text-amber-500">
              {{ list.filter((item) => item.status === "pending").length }}
            </h3>

            <div class="mt-2 flex items-center gap-1.5">
              <span class="size-1.5 animate-pulse rounded-full bg-amber-500" />

              <span class="text-[11px] text-muted"> Chờ hệ thống xử lý </span>
            </div>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-transform duration-300 group-hover:scale-110"
          >
            <UIcon name="i-lucide-loader-circle" class="size-5" />
          </div>
        </div>
      </div>
    </div>

    <!-- TABLE -->
    <UCard
      class="overflow-hidden rounded-[30px] shadow-sm"
      :ui="{
        body: 'p-0 sm:p-0',
        header: 'border-b border-default',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between px-1">
          <div>
            <h3 class="text-lg font-semibold">Danh sách lịch sử nâng VIP</h3>

            <p class="text-sm text-muted">
              Hiển thị toàn bộ giao dịch nâng cấp VIP hệ thống
            </p>
          </div>

          <UForm
            :state="page"
            class="w-full lg:w-[250px]"
            @submit="((page.current = 1), getList())"
          >
            <UInput
              v-model="page.search.value"
              icon="i-lucide-search"
              placeholder="Tìm kiếm..."
              class="w-full"
            />
          </UForm>
        </div>
      </template>

      <!-- TABLE -->
      <UTable
        :data="list"
        :columns="columns"
        :loading="loading.load"
        :ui="{
          base: 'min-w-full',
          thead: 'bg-elevated/40',
          tbody: 'divide-y divide-default',
          tr: 'hover:bg-elevated/40 transition-all duration-200',
          th: 'py-4 font-semibold text-muted',
          td: 'py-4',
        }"
      >
        <!-- USER -->
        <template #user-cell="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="row.original.user?.avatar"
              size="lg"
              class="ring-2 ring-primary/10"
            />

            <div class="space-y-1">
              <p class="font-semibold leading-none">
                {{ row.original.user?.username || "Người dùng" }}
              </p>

              <p class="text-xs text-muted">
                {{ row.original.user?.phone || "unknown" }}
              </p>
            </div>
          </div>
        </template>

        <!-- PLAN -->
        <template #plan-cell="{ row }">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UBadge color="primary" variant="soft" class="rounded-full">
                {{ row.original.plan?.name || "VIP" }}
              </UBadge>
            </div>

            <p class="text-xs text-muted">
              {{ row.original.plan?.maxOrders || 0 }} đơn / ngày
            </p>
          </div>
        </template>

        <!-- PRICE -->
        <template #price-cell="{ row }">
          <div class="space-y-1">
            <p class="text-lg font-bold text-primary">
              ${{ useMoney().toMoney(row.original.plan?.price || 0) }}
            </p>

            <p class="text-xs text-muted">Thanh toán nâng cấp</p>
          </div>
        </template>

        <!-- COMMISSION -->
        <template #commission-cell="{ row }">
          <div
            class="inline-flex items-center gap-2 rounded-2xl bg-primary/5 px-3 py-2"
          >
            <span class="font-semibold">
              {{ row.original.plan?.commission || 0 }}%
            </span>
          </div>
        </template>

        <!-- STATUS -->
        <template #status-cell="{ row }">
          <UBadge
            :color="getStatus(row.original.status).color"
            variant="soft"
            class="rounded-full px-3 py-1.5"
          >
            <div class="flex items-center gap-1.5">
              <UIcon
                :name="getStatus(row.original.status).icon"
                class="size-4"
              />

              <span>
                {{ getStatus(row.original.status).label }}
              </span>
            </div>
          </UBadge>
        </template>

        <!-- CREATED -->
        <template #createdAt-cell="{ row }">
          <div class="space-y-1">
            <p class="font-medium">
              {{ useDayJs().displayFull(row.original.createdAt) }}
            </p>
          </div>
        </template>
      </UTable>

      <!-- PAGINATION -->
      <div class="flex justify-center border-t border-default py-5">
        <UPagination
          :page="page.current"
          @update:page="page.current = $event"
          :items-per-page="page.size"
          :total="page.total"
        />
      </div>
    </UCard>
  </div>
</template>
