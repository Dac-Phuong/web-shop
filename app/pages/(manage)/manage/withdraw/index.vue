<script setup>
import { debounce } from "lodash-es";
const { $socket } = useNuxtApp();
const list = ref([]);
const openCancelModal = ref(false);
const payment = ref(null);
const stats = ref(null);
const openPaymentModal = ref(false);

const { t } = useI18n();

const loading = ref({
  load: false,
  action: false,
});
const columns = [
  {
    accessorKey: "user",
    header: "Người dùng",
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
  },

  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "method",
    header: "Thông tin nhận tiền",
  },
  {
    accessorKey: "note",
    header: "Nội dung",
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
const page = ref({
  size: 10,
  current: 1,
  total: 0,

  sort: {
    column: "createdAt",
    direction: "desc",
  },

  search: {
    value: "",
    status: null,
  },
});
const openModalPayment = (data) => {
  payment.value = data;
  openPaymentModal.value = true;
};

const formCancel = ref({
  id: null,
  reason: "",
});

const getList = async () => {
  try {
    loading.value.load = true;
    const res = await useAPI("payment/manage/withdraw", {...JSON.parse(JSON.stringify(page.value))});
    list.value = res.list;
    stats.value = res.stats;
    page.value.total = res.total;
  } finally {
    loading.value.load = false;
  }
};

// debounce search
const debouncedSearch = debounce(() => {
  page.value.current = 1;
  getList();
}, 400);

watch(
  () => [
    page.value.current,
    page.value.size,
    page.value.sort.column,
    page.value.sort.direction,
    page.value.search.status,
  ],
  () => getList(),
);

watch(
  () => page.value.search.value,
  () => debouncedSearch(),
);

const handleApprove = async (id) => {
  const ok = confirm("Bạn có chắc muốn duyệt lệnh rút tiền này không?");
  if (!ok) return;

  try {
    loading.value.action = true;

    await useAPI("payment/manage/approve", { id });

    getList();
  } finally {
    loading.value.action = false;
  }
};

const openCancel = (row) => {
  formCancel.value = {
    id: row._id,
    reason: "",
  };
  openCancelModal.value = true;
};

const handleCancel = async () => {
  try {
    loading.value.action = true;

    await useAPI("payment/manage/cancel", {
      id: formCancel.value.id,
      reason: formCancel.value.reason,
    });

    openCancelModal.value = false;
    getList();
  } finally {
    loading.value.action = false;
  }
};
onMounted(() => {
  $socket.on("notification", async () => {
    await getList();
  });
});
onUnmounted(() => {
  $socket.off("notification");
});
getList();
</script>
<template>
  <div class="space-y-4">
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-xl shadow-blue-500/20 sm:p-6"
    >
      <div
        class="absolute -right-16 -top-20 size-56 rounded-full bg-white/10 blur-3xl"
      />
      <div
        class="absolute -bottom-24 left-1/3 size-64 rounded-full bg-indigo-400/20 blur-3xl"
      />

      <div
        class="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
          >
            <UIcon name="i-lucide-wallet-cards" class="size-6" />
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
              Quản lý rút tiền
            </h1>

            <p class="mt-1 text-sm text-blue-100">
              Duyệt và xử lý các lệnh rút tiền của người dùng
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:gap-4 gap-3 sm:grid-cols-4">
      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Tổng lệnh rút</p>
            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats?.total || 0 }}
            </p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
          >
            <UIcon name="i-lucide-wallet" class="size-5" />
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đang chờ duyệt</p>
            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats?.pending || 0}}
            </p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"
          >
            <UIcon name="i-lucide-clock-3" class="size-5" />
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Thành công</p>
            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats?.success || 0}}
            </p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          >
            <UIcon name="i-lucide-list-checks" class="size-5" />
          </div>
        </div>
      </div>
      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Từ chối</p>
            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats?.failed || 0 }}
            </p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          >
            <UIcon name="i-lucide-list-checks" class="size-5" />
          </div>
        </div>
      </div>
    </div>

    <UCard
      class="overflow-hidden rounded-3xl border-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      :ui="{
        body: 'p-0',
        header: 'border-b border-default p-0',
      }"
    >
      <template #header>
        <div
          class="flex flex-col gap-4 p-4 md:py-4 md:px-0 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
            >
              <UIcon name="i-lucide-arrow-down-to-line" class="size-5" />
            </div>

            <div>
              <h3 class="text-sm font-bold sm:text-base">
                Danh sách rút tiền
              </h3>

              <p class="mt-0.5 text-xs text-muted">
                Tổng cộng {{ page.total }} lệnh rút
              </p>
            </div>
          </div>

          <div class="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto">
            <UInput
              v-model="page.search.value"
              icon="i-lucide-search"
              placeholder="Tìm kiếm người dùng..."
              size="lg"
              class="w-full sm:w-64"
              :ui="{
                base: 'rounded-xl bg-white dark:bg-gray-950',
              }"
              @keyup.enter="
                page.current = 1;
                getList();
              "
            />

            <USelect
              v-model="page.search.status"
              default-value="null"
              size="lg"
              class="w-full sm:w-48"
              :items="[
                {
                  label: 'Tất cả trạng thái',
                  value: null,
                },
                {
                  label: 'Chờ duyệt',
                  value: 'pending',
                },
                {
                  label: 'Đã duyệt',
                  value: 'success',
                },
                {
                  label: 'Từ chối',
                  value: 'failed',
                },
              ]"
              :ui="{
                base: 'rounded-xl bg-white dark:bg-gray-950',
              }"
            />
          </div>
        </div>
      </template>

      <div class="overflow-x-auto">
        <UTable
          :data="list"
          :columns="columns"
          :loading="loading.load"
        >
          <template #user-cell="{ row }">
            <div class="flex min-w-[190px] items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm"
              >
                {{
                  row.original.user?.username
                    ?.charAt(0)
                    ?.toUpperCase() || "U"
                }}
              </div>

              <div class="min-w-0">
                <p class="truncate text-sm font-bold">
                  {{ row.original.user?.username || "Không xác định" }}
                </p>

                <p class="mt-0.5 truncate text-xs text-muted">
                  {{ row.original.user?.phone || "Chưa cập nhật" }}
                </p>
              </div>
            </div>
          </template>

          <template #amount-cell="{ row }">
            <div class="min-w-[120px]">
              <p
                class="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-base font-extrabold text-transparent"
              >
                ${{ useMoney().toMoney(row.original.amount || 0) }}
              </p>

              <p class="mt-0.5 text-[10px] text-muted">
                Số tiền rút
              </p>
            </div>
          </template>

          <template #method-cell="{ row }">
            <UButton
              v-if="row.original.payment"
              color="primary"
              variant="soft"
              icon="i-lucide-eye"
              size="sm"
              class="rounded-xl font-semibold"
              @click="openModalPayment(row.original.payment)"
            >
              Xem thông tin
            </UButton>

            <span v-else class="text-xs text-muted">
              Chưa có
            </span>
          </template>

          <template #status-cell="{ row }">
            <UBadge
              :color="
                row.original.status === 'pending'
                  ? 'warning'
                  : row.original.status === 'success'
                    ? 'success'
                    : 'error'
              "
              variant="soft"
              class="rounded-xl px-2.5 py-1.5"
            >
              <div class="flex items-center gap-1.5">
                <span
                  class="size-1.5 rounded-full"
                  :class="
                    row.original.status === 'pending'
                      ? 'bg-amber-500'
                      : row.original.status === 'success'
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                  "
                />

                {{
                  row.original.status === "pending"
                    ? "Chờ duyệt"
                    : row.original.status === "success"
                      ? "Đã duyệt"
                      : "Từ chối"
                }}
              </div>
            </UBadge>
          </template>

          <template #note-cell="{ row }">
            <div class="max-w-[220px]">
              <p class="truncate text-xs font-medium">
                {{
                  t(row.original.note, {
                    amount: `${row.original.amount}`,
                  }) || t("financialTransaction")
                }}
              </p>
            </div>
          </template>

          <template #createdAt-cell="{ row }">
            <div class="flex min-w-[150px] items-center gap-2">
              <div
                class="flex size-8 items-center justify-center rounded-lg bg-elevated"
              >
                <UIcon
                  name="i-lucide-calendar-days"
                  class="size-3.5 text-muted"
                />
              </div>

              <div>
                <p class="text-xs font-medium">
                  {{ useDayJs().displayFull(row.original.createdAt) }}
                </p>

                <p class="mt-0.5 text-[10px] text-muted">
                  Ngày tạo
                </p>
              </div>
            </div>
          </template>

          <template #action-cell="{ row }">
            <div
              v-if="row.original.status === 'pending'"
              class="flex items-center gap-2"
            >
              <UButton
                color="primary"
                variant="soft"
                icon="i-lucide-check"
                size="sm"
                class="rounded-xl font-semibold"
                :loading="loading.action"
                @click="handleApprove(row.original._id)"
              >
                Duyệt
              </UButton>

              <UButton
                color="error"
                variant="soft"
                icon="i-lucide-x"
                size="sm"
                square
                class="rounded-xl"
                @click="openCancel(row.original)"
              />
            </div>

            <div v-else>
              <span
                class="inline-flex size-8 items-center justify-center rounded-lg bg-elevated text-muted"
              >
                <UIcon
                  :name="
                    row.original.status === 'success'
                      ? 'i-lucide-check'
                      : 'i-lucide-ban'
                  "
                  class="size-4"
                />
              </span>
            </div>
          </template>
        </UTable>
      </div>

      <div
        class="flex flex-col gap-3 border-t border-default bg-elevated/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-muted">
          Hiển thị
          <span class="font-semibold text-highlighted">
            {{ list.length }}
          </span>
          / {{ page.total }} lệnh rút
        </p>

        <UPagination
          :page="page.current"
          @update:page="page.current = $event"
          :items-per-page="page.size"
          :total="page.total"
        />
      </div>
    </UCard>

    <UModal
      v-model:open="openCancelModal"
      :ui="{
        content: 'w-[calc(100vw-2rem)] max-w-lg overflow-hidden rounded-3xl',
      }"
    >
      <template #content>
        <div>
          <div
            class="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 px-5 py-5 text-white sm:px-6"
          >
            <div
              class="absolute -right-10 -top-16 size-40 rounded-full bg-white/10 blur-2xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20"
              >
                <UIcon name="i-lucide-circle-x" class="size-5" />
              </div>

              <div>
                <h2 class="text-lg font-bold">
                  Hủy lệnh rút tiền
                </h2>

                <p class="mt-0.5 text-xs text-red-100">
                  Thao tác này sẽ gửi thông báo cho người dùng
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-5 sm:p-6">
            <div
              class="rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-4"
            >
              <div class="flex gap-3">
                <UIcon
                  name="i-lucide-info"
                  class="mt-0.5 size-4 shrink-0 text-red-500"
                />

                <p class="text-xs leading-5 text-muted">
                  Vui lòng nhập lý do cụ thể để người dùng biết tại sao
                  yêu cầu rút tiền của họ bị từ chối.
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold">
                Lý do hủy
              </label>

              <UTextarea
                v-model="formCancel.reason"
                placeholder="Nhập lý do hủy..."
                :rows="5"
                size="lg"
                class="w-full"
                :ui="{
                  base: 'rounded-xl',
                }"
              />
            </div>
          </div>

          <div
            class="flex flex-col-reverse gap-2 border-t border-default bg-elevated/30 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"
          >
            <UButton
              variant="soft"
              color="neutral"
              size="lg"
              class="rounded-xl"
              @click="openCancelModal = false"
            >
              Đóng
            </UButton>

            <UButton
              color="error"
              icon="i-lucide-x"
              size="lg"
              class="rounded-xl font-semibold"
              :loading="loading.action"
              @click="handleCancel"
            >
              Xác nhận hủy
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="openPaymentModal"
      :ui="{
        content:
          'w-[calc(100vw-2rem)] max-w-xl overflow-hidden rounded-3xl',
      }"
    >
      <template #content>
        <div>
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 px-5 py-5 text-white sm:px-6"
          >
            <div
              class="absolute -right-12 -top-16 size-48 rounded-full bg-white/10 blur-3xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
              >
                <UIcon
                  :name="
                    payment?.bank
                      ? 'i-lucide-building-2'
                      : 'i-lucide-wallet'
                  "
                  class="size-6"
                />
              </div>

              <div>
                <h2 class="text-lg font-bold sm:text-xl">
                  Thông tin nhận tiền
                </h2>

                <p class="mt-0.5 text-xs text-blue-100">
                  Kiểm tra thông tin trước khi xử lý giao dịch
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-5 sm:p-6">
            <div
              v-if="payment?.bank"
              class="overflow-hidden rounded-2xl border border-default bg-elevated/30"
            >
              <div
                class="flex items-center gap-3 border-b border-default p-4"
              >
                <div
                  class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                >
                  <UIcon name="i-lucide-landmark" class="size-4" />
                </div>

                <div>
                  <p class="text-sm font-bold">
                    Tài khoản ngân hàng
                  </p>

                  <p class="text-[10px] text-muted">
                    Thông tin tài khoản nhận tiền
                  </p>
                </div>
              </div>

              <div class="divide-y divide-default">
                <div
                  class="flex items-center justify-between gap-4 px-4 py-3.5"
                >
                  <span class="text-xs text-muted">
                    Ngân hàng
                  </span>

                  <span class="text-right text-sm font-bold">
                    {{ payment.bank.bankName }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between gap-4 px-4 py-3.5"
                >
                  <span class="text-xs text-muted">
                    Số tài khoản
                  </span>

                  <span class="text-right font-mono text-sm font-bold">
                    {{ payment.bank.accountNumber }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between gap-4 px-4 py-3.5"
                >
                  <span class="text-xs text-muted">
                    Chủ tài khoản
                  </span>

                  <span class="text-right text-sm font-bold">
                    {{ payment.bank.accountName }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between gap-4 px-4 py-3.5"
                >
                  <span class="text-xs text-muted">
                    Chi nhánh
                  </span>

                  <span class="text-right text-sm font-medium">
                    {{ payment.bank.address || "Chưa có" }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-else-if="payment?.usdt"
              class="overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]"
            >
              <div
                class="flex items-center gap-3 border-b border-emerald-500/10 p-4"
              >
                <div
                  class="flex size-9 items-center justify-center rounded-xl bg-emerald-500 text-white"
                >
                  <UIcon name="i-lucide-wallet" class="size-4" />
                </div>

                <div>
                  <p class="text-sm font-bold">
                    Ví USDT
                  </p>

                  <p class="text-[10px] text-muted">
                    Thông tin ví nhận tiền
                  </p>
                </div>
              </div>

              <div class="p-4">
                <div
                  class="flex items-center justify-between gap-4 border-b border-emerald-500/10 pb-3"
                >
                  <span class="text-xs text-muted">
                    Mạng
                  </span>

                  <UBadge
                    color="success"
                    variant="soft"
                    class="rounded-lg"
                  >
                    {{ payment.usdt.wallet }}
                  </UBadge>
                </div>

                <div class="mt-4 space-y-2">
                  <p class="text-xs font-semibold">
                    Địa chỉ ví
                  </p>

                  <div
                    class="rounded-xl border border-default bg-default p-3 font-mono text-xs leading-5 break-all"
                  >
                    {{ payment.usdt.address }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default p-8 text-center"
            >
              <div
                class="flex size-12 items-center justify-center rounded-2xl bg-elevated"
              >
                <UIcon
                  name="i-lucide-wallet-minimal"
                  class="size-5 text-muted"
                />
              </div>

              <p class="mt-3 text-sm font-semibold">
                Chưa có thông tin thanh toán
              </p>

              <p class="mt-1 text-xs text-muted">
                Người dùng chưa thiết lập phương thức nhận tiền.
              </p>
            </div>
          </div>

          <div
            class="flex justify-end border-t border-default bg-elevated/30 px-5 py-4 sm:px-6"
          >
            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              class="rounded-xl"
              @click="openPaymentModal = false"
            >
              Đóng
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
