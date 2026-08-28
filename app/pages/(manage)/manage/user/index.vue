<script setup>
const router = useRouter();
const openAddMoneyModal = ref(false);
const openUpgradeVipModal = ref(false);
const list = ref([]);
const plans = ref([]);
const status = ref(null);
const formAddMoney = ref({
  user: null,
  id: null,
  type: "deposit",
  amount: 0,
});

const loading = ref({
  load: true,
  addMoney: false,
});
const columns = [
  {
    accessorKey: "user",
    header: "Người dùng",
  },
  {
    accessorKey: "coin",
    header: "Số dư",
  },
  {
    accessorKey: "role",
    header: "Quyền",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
  },
  {
    accessorKey: "action",
    header: "Chức năng",
  },
];

const openAddMoney = (user) => {
  formAddMoney.value = {
    user: user,
    id: user._id,
    type: "deposit",
    amount: null,
  };

  openAddMoneyModal.value = true;
};
const currentBalance = computed(() => {
  return Number(formAddMoney.value?.user?.coin || 0);
});

const amountValue = computed(() => {
  return Number(formAddMoney.value.amount || 0);
});

const totalAfter = computed(() => {
  const balance = currentBalance.value || 0;
  const amount = Number(formAddMoney.value.amount || 0);

  if (formAddMoney.value.type === "subtract") {
    return balance - amount;
  }

  return balance + amount;
});
const goDetail = (id) => {
  router.push(`/manage/user/${id}`);
};
const copyReferralCode = async (code) => {
  if (!code) return;
  await navigator.clipboard.writeText(code);
  useToast().add({
    title: "Đã sao chép",
    description: `Mã giới thiệu ${code} đã được sao chép`,
    icon: "i-lucide-check",
    color: "success",
  });
};
const ROLE_MAP = {
  3: {
    label: "ADMIN",
    icon: "i-lucide-shield",
    class: "bg-error/10 text-error border border-error/20",
  },
  2: {
    label: "CSKH",
    icon: "i-lucide-headset",
    class: "bg-warning/10 text-warning border border-warning/20",
  },
  0: {
    label: "USER",
    icon: "i-lucide-user",
    class: "bg-primary/10 text-primary border border-primary/20",
  },
};

const formUpgradeVip = ref({
  user: null,
  userId: null,
  planId: null,
});
const selectedPlan = computed(() => {
  return plans.value.find((item) => item._id === formUpgradeVip.value.planId);
});
const openUpgradeVip = (user) => {
  formUpgradeVip.value = {
    user,
    userId: user._id,
    planId: null,
  };

  openUpgradeVipModal.value = true;
};

const handleUpgradeVip = async () => {
  try {
    await useAPI("plan/manage/upgrade", {
      userId: formUpgradeVip.value.userId,
      planId: formUpgradeVip.value.planId,
    });
    openUpgradeVipModal.value = false;
    getList();
  } catch (err) {
    console.error(err);
  }
};
const KYC_MAP = {
  0: {
    label: "Chưa KYC",
    dot: "bg-gray-500",
    class: "border-muted bg-muted/40 text-muted",
  },
  1: {
    label: "Chờ KYC",
    dot: "bg-warning",
    class: "border-warning/20 bg-warning/10 text-warning",
  },
  2: {
    label: "Đã KYC",
    dot: "bg-success",
    class: "border-success/20 bg-success/10 text-success",
  },
  3: {
    label: "Từ chối KYC",
    dot: "bg-error",
    class: "border-error/20 bg-error/10 text-error",
  },
};

// Page
const page = ref({
  size: 10,
  current: 1,
  online: false,
  sort: {
    column: "createdAt",
    direction: "desc",
  },
  search: {
    value: null,
  },
  total: 0,
});
watch(
  () => page.value.size,
  () => getList(),
);
watch(
  () => page.value.current,
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

const handleAddMoney = async () => {
  try {
    loading.value.addMoney = true;
    await useAPI(
      "user/manage/edit/currency",
      JSON.parse(JSON.stringify(formAddMoney.value)),
    );
    openAddMoneyModal.value = false;
    getList();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value.addMoney = false;
  }
};

const getList = async () => {
  try {
    loading.value.load = true;
    const data = await useAPI(
      "user/manage/list",
      JSON.parse(JSON.stringify(page.value)),
    );
    loading.value.load = false;
    list.value = data.list;
    plans.value = data.plans;
    status.value = data.status;
    page.value.total = data.total;
  } catch (e) {
    loading.value.load = false;
  }
};
getList();
</script>

<template>
  <div class="relative space-y-4">
    <!-- PAGE HEADER -->
    <section
      class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-500 to-indigo-600 p-5 shadow-sm dark:border-blue-500/10 dark:from-blue-500/10 dark:via-slate-900 dark:to-indigo-500/10"
    >
      <!-- Decorative -->
      <div
        class="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        class="pointer-events-none absolute -bottom-20 -left-16 size-44 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div class="relative flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div
            class="flex size-12 shrink-0 items-center justify-center rounded-[17px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
          >
            <UIcon name="i-lucide-users-round" class="size-5" />
          </div>

          <div>
            <h1
              class="text-xl font-black tracking-tight text-white sm:text-2xl"
            >
              Quản lý người dùng
            </h1>

            <p class="mt-1 text-xs text-slate-200 dark:text-slate-400">
              Quản lý tài khoản và trạng thái người dùng hệ thống
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATISTICS -->
    <section class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <!-- TOTAL -->
      <div
        class="group relative overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-50 via-white to-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-blue-500/10 dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-900"
      >
        <div
          class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-blue-500/10 blur-2xl"
        />

        <div class="relative flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400"
            >
              Tổng user
            </p>

            <h3
              class="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ status?.totalUser || 0 }}
            </h3>

            <p class="mt-1 text-[10px] text-slate-400">Tài khoản hệ thống</p>
          </div>

          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-[15px] border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/10 dark:bg-blue-500/10 dark:text-blue-400"
          >
            <UIcon name="i-lucide-users-round" class="size-5" />
          </div>
        </div>
      </div>

      <!-- UNVERIFIED -->
      <div
        class="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-50 via-white to-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 dark:border-amber-500/10 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-900"
      >
        <div
          class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-amber-500/10 blur-2xl"
        />

        <div class="relative flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400"
            >
              Chưa xác thực
            </p>

            <h3
              class="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ status?.unverified || 0 }}
            </h3>

            <p class="mt-1 text-[10px] text-slate-400">Chưa hoàn tất KYC</p>
          </div>

          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-[15px] bg-amber-50 text-amber-600 dark:border-amber-500/10 dark:bg-amber-500/10 dark:text-amber-400"
          >
            <UIcon name="i-lucide-shield-alert" class="size-5" />
          </div>
        </div>
      </div>

      <!-- VERIFIED -->
      <div
        class="group relative overflow-hidden rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-emerald-500/10 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-900"
      >
        <div
          class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-emerald-500/10 blur-2xl"
        />

        <div class="relative flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
            >
              Đã xác thực
            </p>

            <h3
              class="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ status?.verified || 0 }}
            </h3>

            <p class="mt-1 text-[10px] text-slate-400">KYC đã được duyệt</p>
          </div>

          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-[15px] border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <UIcon name="i-lucide-badge-check" class="size-5" />
          </div>
        </div>
      </div>

      <!-- BLOCKED -->
      <div
        class="group relative overflow-hidden rounded-[24px] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 dark:border-rose-500/10 dark:from-rose-500/10 dark:via-slate-900 dark:to-slate-900"
      >
        <div
          class="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-rose-500/10 blur-2xl"
        />

        <div class="relative flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="text-[9px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400"
            >
              Bị khóa
            </p>

            <h3
              class="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ status?.blocked || 0 }}
            </h3>

            <p class="mt-1 text-[10px] text-slate-400">Tài khoản bị khóa</p>
          </div>

          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-[15px] border border-rose-100 bg-rose-50 text-rose-600 dark:border-rose-500/10 dark:bg-rose-500/10 dark:text-rose-400"
          >
            <UIcon name="i-lucide-shield-x" class="size-5" />
          </div>
        </div>
      </div>
    </section>

    <!-- USER TABLE -->
    <section
      class="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
    >
      <!-- TABLE HEADER -->
      <div
        class="border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/30 px-4 py-4 dark:border-white/10 dark:from-blue-500/5 dark:via-slate-900 dark:to-indigo-500/5 sm:px-5"
      >
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            >
              <UIcon name="i-lucide-list-filter" class="size-5" />
            </div>

            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                Danh sách người dùng
              </h3>

              <p class="mt-0.5 text-[11px] text-slate-400">
                Tổng {{ page?.total || 0 }} người dùng
              </p>
            </div>
          </div>

          <UForm
            :state="page"
            class="w-full lg:w-auto"
            @submit="((page.current = 1), getList())"
          >
            <UInput
              v-model="page.search.value"
              placeholder="Tìm username, số điện thoại..."
              icon="i-lucide-search"
              class="w-full lg:w-[280px]"
              :ui="{
                base: 'h-10 rounded-xl border-slate-200 bg-slate-50 text-xs focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5',
              }"
            />
          </UForm>
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <UTable :data="list" :columns="columns" :loading="loading.load">
          <!-- USER -->
          <template #user-cell="{ row }">
            <div class="flex items-center gap-3">
              <div class="relative shrink-0">
                <div
                  class="flex size-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
                >
                  <UiImg
                    v-if="row.original.avatar"
                    :src="row.original.avatar"
                    class="h-full w-full object-cover"
                  />

                  <UIcon
                    v-else
                    name="i-lucide-user-round"
                    class="size-5 text-slate-400"
                  />
                </div>

                <span
                  class="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white shadow-sm dark:border-slate-900"
                >
                  VIP {{ row.original.level }}
                </span>
              </div>

              <div class="min-w-0">
                <div class="mt-1 flex items-center gap-1.5">
                  <UIcon
                    name="i-lucide-phone"
                    class="size-3 shrink-0 text-slate-400"
                  />

                  <span
                    class="max-w-[110px] truncate text-[10px] text-slate-400"
                  >
                    {{ row.original.phone || "—" }}
                  </span>
                </div>

                <div class="mt-1 flex items-center gap-1.5 text-[10px]">
                  <UIcon
                    name="i-lucide-ticket"
                    class="size-3 shrink-0 text-amber-500"
                  />

                  <span class="text-slate-400"> Mã giới thiệu: </span>

                  <button
                    type="button"
                    class="group inline-flex cursor-pointer items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 font-bold tracking-wide text-amber-600 transition hover:bg-amber-100 active:scale-95 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
                    :title="`Copy ${row.original.referral?.code || ''}`"
                    @click="copyReferralCode(row.original.referral?.code)"
                  >
                    {{ row.original.referral?.code || "—" }}

                    <UIcon
                      name="i-lucide-copy"
                      class="size-3 opacity-50 transition group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- COIN -->
          <template #coin-cell="{ row }">
            <div>
              <p
                class="font-mono text-sm font-black text-slate-800 dark:text-white"
              >
                ${{ useMoney().toMoney(row.original.coin) }}
              </p>

              <p class="mt-0.5 text-[9px] text-slate-400">Số dư khả dụng</p>
            </div>
          </template>

          <!-- ROLE -->
          <template #role-cell="{ row }">
            <div
              class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold"
              :class="ROLE_MAP[row.original.type]?.class"
            >
              <UIcon
                :name="ROLE_MAP[row.original.type]?.icon"
                class="size-3.5"
              />

              <span>
                {{ ROLE_MAP[row.original.type]?.label }}
              </span>
            </div>
          </template>

          <!-- STATUS -->
          <template #status-cell="{ row }">
            <div
              class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold"
              :class="KYC_MAP[row.original.kyc?.status]?.class"
            >
              <span
                class="size-1.5 rounded-full"
                :class="KYC_MAP[row.original.kyc?.status]?.dot"
              />

              {{ KYC_MAP[row.original.kyc?.status]?.label }}
            </div>
          </template>

          <!-- CREATED -->
          <template #createdAt-cell="{ row }">
            <div>
              <p
                class="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {{ useDayJs().displayFull(row.original.createdAt) }}
              </p>

              <p class="mt-0.5 text-[9px] text-slate-400">Ngày đăng ký</p>
            </div>
          </template>

          <!-- ACTION -->
          <template #action-cell="{ row }">
            <div class="flex items-center gap-1.5">
              <UTooltip text="Xem chi tiết">
                <UButton
                  color="primary"
                  variant="soft"
                  icon="i-lucide-eye"
                  class="size-9 cursor-pointer rounded-xl"
                  @click="goDetail(row.original._id)"
                />
              </UTooltip>

              <UTooltip text="Cộng / Trừ tiền">
                <UButton
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-wallet"
                  class="size-9 cursor-pointer rounded-xl text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  @click="openAddMoney(row.original)"
                />
              </UTooltip>

              <UTooltip text="Nâng VIP">
                <UButton
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-crown"
                  class="size-9 cursor-pointer rounded-xl text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                  @click="openUpgradeVip(row.original)"
                />
              </UTooltip>
            </div>
          </template>
        </UTable>
      </div>

      <!-- PAGINATION -->
      <div
        class="flex items-center justify-center border-t border-slate-100 px-4 py-4 dark:border-white/10"
      >
        <UPagination
          :page="page.current"
          @update:page="page.current = $event"
          :items-per-page="page.size"
          :total="page.total"
        />
      </div>
    </section>

    <!-- ADD MONEY MODAL -->
    <UModal
      v-model:open="openAddMoneyModal"
      :ui="{
        content: 'max-w-md overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="overflow-hidden bg-white dark:bg-slate-900">
          <!-- HEADER -->
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-white/10 blur-xl"
            />

            <div
              class="pointer-events-none absolute -bottom-10 -left-10 size-24 rounded-full bg-indigo-300/20 blur-2xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] border border-white/20 bg-white/10"
              >
                <UiImg
                  v-if="formAddMoney?.user?.avatar"
                  :src="formAddMoney?.user?.avatar"
                  class="h-full w-full object-cover"
                />

                <UIcon v-else name="i-lucide-user-round" class="size-5" />
              </div>

              <div class="min-w-0">
                <p class="text-sm font-bold">
                  {{ formAddMoney?.user?.username }}
                </p>

                <p class="mt-0.5 text-[10px] text-blue-100">
                  VIP {{ formAddMoney?.user?.level || 0 }}
                  <span class="mx-1">•</span>
                  {{ formAddMoney?.user?.phone }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-5">
            <!-- CURRENT BALANCE -->
            <div
              class="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg shadow-blue-500/20"
            >
              <div
                class="pointer-events-none absolute -right-5 -top-5 size-20 rounded-full bg-white/10"
              />

              <p class="text-[10px] font-medium text-white/70">
                Số dư hiện tại
              </p>

              <p class="mt-1 text-xl font-black">
                ${{ useMoney().toMoney(currentBalance) }}
              </p>
            </div>

            <!-- TYPE -->
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Loại giao dịch
              </label>

              <USelect
                v-model="formAddMoney.type"
                :items="[
                  {
                    label: 'Nạp tiền (Deposit)',
                    value: 'deposit',
                  },
                  {
                    label: 'Tiền thưởng (Bonus)',
                    value: 'bonus',
                  },
                  {
                    label: 'Trừ tiền (Withdraw)',
                    value: 'subtract',
                  },
                ]"
                placeholder="Chọn loại giao dịch"
                class="w-full"
              />
            </div>

            <!-- AMOUNT -->
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                {{
                  formAddMoney.type === "subtract"
                    ? "Số tiền trừ"
                    : "Số tiền cộng"
                }}
              </label>

              <UInput
                v-model="formAddMoney.amount"
                type="number"
                min="0"
                placeholder="Nhập số tiền"
                class="w-full"
              />
            </div>

            <!-- TOTAL -->
            <div
              class="rounded-[22px] border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-500/10 dark:from-blue-500/10 dark:to-indigo-500/10"
            >
              <p class="text-[10px] font-medium text-slate-400">
                Số dư sau khi
                {{ formAddMoney.type === "subtract" ? "trừ" : "cộng" }}
              </p>

              <p
                class="mt-1 text-xl font-black text-blue-600 dark:text-blue-400"
              >
                ${{ useMoney().toMoney(totalAfter) }}
              </p>
            </div>

            <!-- ACTIONS -->
            <div class="grid grid-cols-2 gap-3">
              <UButton
                variant="soft"
                color="neutral"
                class="h-11 rounded-xl font-semibold"
                @click="openAddMoneyModal = false"
              >
                Đóng
              </UButton>

              <UButton
                color="primary"
                class="h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
                :loading="loading.addMoney"
                @click="handleAddMoney"
              >
                <UIcon
                  v-if="!loading.addMoney"
                  name="i-lucide-check"
                  class="mr-1.5 size-4"
                />

                Xác nhận
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <!-- UPGRADE VIP MODAL -->
    <UModal
      v-model:open="openUpgradeVipModal"
      :ui="{
        content: 'max-w-xl overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="overflow-hidden bg-white dark:bg-slate-900">
          <!-- HEADER -->
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/10 blur-xl"
            />

            <div
              class="pointer-events-none absolute -bottom-12 -left-8 size-28 rounded-full bg-indigo-300/20 blur-2xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] border border-white/20 bg-white/10"
              >
                <UiImg
                  v-if="formUpgradeVip?.user?.avatar"
                  :src="formUpgradeVip?.user?.avatar"
                  class="h-full w-full object-cover"
                />

                <UIcon v-else name="i-lucide-user-round" class="size-5" />
              </div>

              <div>
                <h2 class="text-base font-bold">
                  {{ formUpgradeVip?.user?.username }}
                </h2>

                <p class="mt-0.5 text-[10px] text-blue-100">
                  VIP {{ formUpgradeVip?.user?.level || 0 }}
                  <span class="mx-1">•</span>
                  {{ formUpgradeVip?.user?.phone }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-5">
            <!-- SELECT PLAN -->
            <div class="space-y-2">
              <label
                class="text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Chọn gói VIP
              </label>

              <USelectMenu
                v-model="formUpgradeVip.planId"
                :items="plans"
                value-key="_id"
                label-key="name"
                class="w-full"
                placeholder="Chọn gói VIP"
              />
            </div>

            <!-- PLAN INFO -->
            <div
              v-if="selectedPlan"
              class="overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-500/10 dark:from-blue-500/10 dark:to-indigo-500/10"
            >
              <div class="flex items-center justify-between p-4">
                <div>
                  <p
                    class="text-[9px] font-bold uppercase tracking-wider text-blue-500"
                  >
                    Gói thành viên
                  </p>

                  <h3
                    class="mt-1 text-lg font-black text-slate-900 dark:text-white"
                  >
                    {{ selectedPlan.name }}
                  </h3>
                </div>

                <div
                  class="flex size-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                >
                  <UIcon name="i-lucide-crown" class="size-5" />
                </div>
              </div>

              <div
                class="grid grid-cols-3 gap-px border-t border-blue-100/70 bg-blue-100/70 dark:border-white/5 dark:bg-white/5"
              >
                <div class="bg-white/70 p-4 dark:bg-slate-900/60">
                  <p class="text-[9px] text-slate-400">Giá gói</p>

                  <p
                    class="mt-1 text-sm font-black text-blue-600 dark:text-blue-400"
                  >
                    ${{ useMoney().toMoney(selectedPlan.price) }}
                  </p>
                </div>

                <div class="bg-white/70 p-4 dark:bg-slate-900/60">
                  <p class="text-[9px] text-slate-400">Hoa hồng</p>

                  <p
                    class="mt-1 text-sm font-black text-slate-800 dark:text-white"
                  >
                    {{ selectedPlan.commission }}%
                  </p>
                </div>

                <div class="bg-white/70 p-4 dark:bg-slate-900/60">
                  <p class="text-[9px] text-slate-400">Đơn/ngày</p>

                  <p
                    class="mt-1 text-sm font-black text-slate-800 dark:text-white"
                  >
                    {{ selectedPlan.maxOrders }}
                  </p>
                </div>
              </div>
            </div>

            <!-- ACTION -->
            <div class="grid grid-cols-2 gap-3">
              <UButton
                color="neutral"
                variant="soft"
                class="h-11 rounded-xl font-semibold"
                @click="openUpgradeVipModal = false"
              >
                Đóng
              </UButton>

              <UButton
                color="primary"
                class="h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
                @click="handleUpgradeVip"
              >
                <UIcon name="i-lucide-crown" class="mr-1.5 size-4" />

                Xác nhận
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
