<script setup>
const notify = useNotify();
const { $socket } = useNuxtApp();

const list = ref([]);

const stats = ref({
  pending: 0,
  today: 0,
  overtime: 0,
});

const loading = ref({
  load: false,
  approve: false,
  reject: false,
});

const page = ref({
  size: 10,
  current: 1,

  sort: {
    column: "createdAt",
    direction: "desc",
  },

  search: {
    key: "",
    by: "USER",
  },

  total: 0,
});

const columns = [
  {
    accessorKey: "user",
    header: "Người dùng",
  },
  {
    accessorKey: "kyc",
    header: "KYC",
  },
  {
    accessorKey: "time",
    header: "Thời gian",
  },
  {
    accessorKey: "action",
    header: "",
  },
];

const openView = ref(false);
const openReject = ref(false);

const selectedKyc = ref(null);
const rejectReason = ref("");

const openImage = ref(false);
const previewImage = ref("");

const openPreview = (img) => {
  previewImage.value = img;
  openImage.value = true;
};
const getList = async () => {
  try {
    loading.value.load = true;

    const res = await useAPI(
      "user/manage/kyc/list",
      JSON.parse(JSON.stringify(page.value)),
    );

    list.value = res.list || [];
    page.value.total = res.total || 0;

    stats.value = res.stats || {
      pending: 0,
      today: 0,
      overtime: 0,
    };
  } catch (e) {
    notify.error(e?.message || "Không thể tải danh sách");
  } finally {
    loading.value.load = false;
  }
};

watch(
  () => [
    page.value.current,
    page.value.size,
    page.value.sort.column,
    page.value.sort.direction,
  ],
  () => getList(),
);

watch(
  () => page.value.search.key,
  (v) => {
    if (!v) getList();
  },
);

const handleView = (item) => {
  selectedKyc.value = item;
  openView.value = true;
};

const handleApprove = async () => {
  try {
    loading.value.approve = true;

    await useAPI("user/manage/kyc/approve", {
      user: selectedKyc.value._id,
    });
    openView.value = false;
    getList();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value.approve = false;
  }
};

const handleReject = async () => {
  try {
    if (!rejectReason.value) {
      return notify.error("Vui lòng nhập lý do");
    }

    loading.value.reject = true;

    await useAPI("user/manage/kyc/reject", {
      user: selectedKyc.value._id,
      reason: rejectReason.value,
    });

    openReject.value = false;
    openView.value = false;

    rejectReason.value = "";
    getList();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value.reject = false;
  }
};
onMounted(() => {
  $socket.on("user-kyc", async () => {
    await getList();
  });
});
onUnmounted(() => {
  $socket.off("user-kyc");
});
getList();
</script>

<template>
  <div class="space-y-4">
    <div
      class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-xl shadow-blue-500/15"
    >
      <!-- Decorative -->
      <div
        class="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full bg-white/10 blur-xl"
      ></div>

      <div
        class="pointer-events-none absolute -bottom-20 -left-10 size-44 rounded-full bg-indigo-300/10 blur-2xl"
      ></div>

      <div class="relative flex items-center gap-4">
        <div
          class="flex size-12 shrink-0 items-center justify-center rounded-[17px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
        >
          <UIcon name="i-lucide-shield-check" class="size-6" />
        </div>

        <div class="min-w-0 flex-1">
          <h1 class="text-xl font-black tracking-tight text-white sm:text-2xl">
            Quản lý KYC
          </h1>

          <p class="mt-1 text-xs leading-5 text-blue-100">
            Danh sách xác minh CCCD người dùng
          </p>
        </div>
      </div>
    </div>
    <UCard
      class="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/5 dark:bg-gray-900"
      :ui="{
        body: 'p-0 sm:p-0',
      }"
    >
      <!-- TABLE HEADER -->
      <div
        class="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/5"
      >
        <div>
          <div class="flex items-center gap-2">
            <div
              class="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            >
              <UIcon name="i-lucide-users" class="size-4" />
            </div>

            <h3 class="text-sm font-bold text-gray-900 dark:text-white">
              Danh sách xác minh
            </h3>
          </div>

          <p class="mt-1 pl-10 text-xs text-muted">
            Các tài khoản đang chờ kiểm tra KYC
          </p>
        </div>

        <div
          class="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 dark:bg-white/5"
        >
          <span class="size-2 rounded-full bg-amber-400"></span>

          <span class="text-xs font-semibold text-muted">
            Đang chờ xác minh
          </span>
        </div>
      </div>

      <!-- TABLE -->
      <UTable
        :loading="loading.load"
        :columns="columns"
        :data="list"
        class="flex-1"
     
      >
        <template #user-cell="{ row }">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="relative shrink-0">
              <div
                class="flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] shadow-sm"
              >
                <div
                  class="flex size-full items-center justify-center overflow-hidden rounded-[14px] bg-white dark:bg-gray-900"
                >
                  <UAvatar
                    :src="row.original.avatar"
                    size="md"
                    class="rounded-xl"
                  />
                </div>
              </div>

              <!-- Status -->
              <span
                class="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-amber-400 dark:border-gray-900"
              ></span>
            </div>

            <!-- Info -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p
                  class="max-w-[180px] truncate text-sm font-bold text-gray-900 dark:text-white"
                >
                  {{ row.original.username }}
                </p>

                <span
                  class="hidden rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-600 sm:inline-flex dark:bg-blue-500/10 dark:text-blue-400"
                >
                  VIP {{ row.original.level || 0 }}
                </span>
              </div>

              <div
                class="mt-1 flex max-w-[240px] flex-col gap-0.5 text-xs text-muted sm:flex-row sm:items-center sm:gap-2"
              >
                <span class="truncate">
                  {{ row.original.phone }}
                </span>

                <span class="hidden text-gray-300 sm:block dark:text-white/10">
                  •
                </span>

                <span class="truncate">
                  {{ row.original.email || "Chưa cập nhật email" }}
                </span>
              </div>
            </div>
          </div>
        </template>
        <template #kyc-cell="{ row }">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 dark:border-amber-500/20 dark:bg-amber-500/10"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-50"
              ></span>

              <span
                class="relative inline-flex size-2 rounded-full bg-amber-500"
              ></span>
            </span>

            <span
              class="text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400"
            >
              Chờ xác minh
            </span>
          </div>
        </template>
        <template #time-cell="{ row }">
          <div class="flex items-center gap-2">
            <div
              class="flex size-8 items-center justify-center rounded-xl bg-gray-50 text-gray-400 dark:bg-white/5"
            >
              <UIcon name="i-lucide-calendar-clock" class="size-4" />
            </div>

            <div>
              <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {{ useDayJs().displayFull(row.original.createdAt) }}
              </p>

              <p class="mt-0.5 text-[10px] text-muted">Thời gian gửi</p>
            </div>
          </div>
        </template>
        <template #action-cell="{ row }">
          <UButton
            color="primary"
            variant="soft"
            size="sm"
            icon="i-lucide-scan-eye"
            label="Kiểm tra"
            class="cursor-pointer rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/10"
            @click="handleView(row.original)"
          />
        </template>
      </UTable>

      <!-- PAGINATION -->
      <div
        class="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/5"
      >
        <p class="text-xs text-muted">
          Hiển thị
          <span class="font-semibold text-gray-700 dark:text-gray-200">
            {{ list?.length || 0 }}
          </span>
          / {{ page?.total || 0 }} hồ sơ
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
      v-model:open="openView"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-2xl max-h-[90dvh] overflow-hidden rounded-[24px] sm:w-full sm:rounded-[32px]',
      }"
    >
      <template #content>
        <div
          class="flex max-h-[90dvh] flex-col overflow-hidden bg-white dark:bg-gray-950"
        >
          <div
            class="relative shrink-0 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-4 text-white sm:px-6 sm:py-5"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-14 size-36 rounded-full bg-white/10 blur-xl"
            ></div>

            <div
              class="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-indigo-300/10 blur-2xl"
            ></div>

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 sm:size-12 sm:rounded-2xl"
              >
                <UIcon name="i-lucide-shield-check" class="size-5 sm:size-6" />
              </div>

              <div class="min-w-0 flex-1">
                <h2 class="truncate text-base font-bold sm:text-lg">
                  Kiểm tra KYC
                </h2>

                <p class="mt-0.5 truncate text-[11px] text-blue-100 sm:text-xs">
                  Xác minh thông tin và giấy tờ người dùng
                </p>
              </div>

              <div
                class="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider sm:px-3 sm:py-1.5 sm:text-[9px]"
              >
                Pending
              </div>
            </div>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto">
            <div class="space-y-4 p-3 sm:space-y-5 sm:p-6">
              <div
                class="rounded-[18px] border border-gray-100 bg-gray-50 p-3 sm:rounded-[22px] sm:p-4 dark:border-white/5 dark:bg-white/[0.03]"
              >
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="selectedKyc?.avatar"
                    size="lg"
                    class="shrink-0 rounded-xl sm:rounded-2xl"
                  />

                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <p
                        class="truncate text-sm font-bold text-gray-900 dark:text-white"
                      >
                        {{ selectedKyc?.username }}
                      </p>

                      <UBadge
                        color="primary"
                        variant="soft"
                        size="xs"
                        class="shrink-0 rounded-full"
                      >
                        VIP {{ selectedKyc?.level || 0 }}
                      </UBadge>
                    </div>

                    <p class="mt-1 truncate text-xs text-muted">
                      {{ selectedKyc?.phone }}
                    </p>
                  </div>

                  <div
                    class="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 sm:flex dark:border-amber-500/20 dark:bg-amber-500/10"
                  >
                    <span
                      class="text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400"
                    >
                      Chờ duyệt
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                      Giấy tờ tùy thân
                    </h3>

                    <p class="mt-1 text-[11px] text-muted sm:text-xs">
                      Nhấn vào hình ảnh để xem chi tiết
                    </p>
                  </div>

                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                  >
                    <UIcon name="i-lucide-id-card" class="size-4" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div
                  class="group cursor-zoom-in overflow-hidden rounded-[18px] border border-gray-100 bg-gray-50 p-2 transition-all active:scale-[0.99] sm:rounded-[22px] hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/5 dark:bg-white/[0.03]"
                  @click="openPreview(selectedKyc?.kyc?.frontImage)"
                >
                  <div
                    class="relative overflow-hidden rounded-[14px] bg-gray-100 sm:rounded-[17px] dark:bg-gray-900"
                  >
                    <img :src="selectedKyc.kyc?.frontImage" alt="" srcset="" class="aspect-[16/10] w-full object-cover transition duration-300 sm:aspect-[4/3] group-hover:scale-[1.03]">
                    <div
                      class="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20"
                    >
                      <div
                        class="flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-100 shadow-lg sm:size-10 sm:scale-75 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
                      >
                        <UIcon
                          name="i-lucide-zoom-in"
                          class="size-4 sm:size-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-center gap-2 px-1 pb-1 pt-2.5 sm:px-2 sm:pt-3"
                  >
                    <div
                      class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                      <UIcon name="i-lucide-credit-card" class="size-3.5" />
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-xs font-bold">CCCD mặt trước</p>

                      <p class="text-[10px] text-muted">Front side</p>
                    </div>
                  </div>
                </div>

                <div
                  class="group cursor-zoom-in overflow-hidden rounded-[18px] border border-gray-100 bg-gray-50 p-2 transition-all active:scale-[0.99] sm:rounded-[22px] hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/5 dark:bg-white/[0.03]"
                  @click="openPreview(selectedKyc?.kyc?.backImage)"
                >
                  <div
                    class="relative overflow-hidden rounded-[14px] bg-gray-100 sm:rounded-[17px] dark:bg-gray-900"
                  >
                    <img :src="selectedKyc.kyc?.backImage" alt="" srcset="" class="aspect-[16/10] w-full object-cover transition duration-300 sm:aspect-[4/3] group-hover:scale-[1.03]">
                    <div
                      class="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20"
                    >
                      <div
                        class="flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-800 opacity-100 shadow-lg sm:size-10 sm:scale-75 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
                      >
                        <UIcon
                          name="i-lucide-zoom-in"
                          class="size-4 sm:size-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-center gap-2 px-1 pb-1 pt-2.5 sm:px-2 sm:pt-3"
                  >
                    <div
                      class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    >
                      <UIcon name="i-lucide-credit-card" class="size-3.5" />
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-xs font-bold">CCCD mặt sau</p>

                      <p class="text-[10px] text-muted">Back side</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="sticky bottom-0 -mx-3 border-t border-gray-100 bg-white px-3 pt-3 pb-1 dark:border-white/5 dark:bg-gray-950 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pt-4 sm:pb-0"
              >
                <div
                  class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
                >
                  <UButton
                    color="error"
                    variant="soft"
                    icon="i-lucide-x"
                    class="h-11 w-full justify-center rounded-xl px-5 font-semibold sm:w-auto"
                    @click="openReject = true"
                  >
                    Từ chối
                  </UButton>

                  <UButton
                    color="primary"
                    icon="i-lucide-check"
                    class="h-11 w-full justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 px-6 font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700 sm:w-auto"
                    :loading="loading.approve"
                    @click="handleApprove"
                  >
                    Duyệt KYC
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>
    <UModal
      v-model:open="openReject"
      :ui="{
        content: 'w-full max-w-md overflow-hidden rounded-[32px]',
      }"
    >
      <template #content>
        <div class="overflow-hidden bg-white dark:bg-gray-950">
          <!-- HEADER -->
          <div
            class="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 px-6 py-5 text-white"
          >
            <div
              class="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/10"
            ></div>

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10"
              >
                <UIcon name="i-lucide-shield-x" class="size-6" />
              </div>

              <div>
                <h2 class="text-lg font-bold">Từ chối KYC</h2>

                <p class="mt-0.5 text-xs text-red-100">
                  Nhập lý do để người dùng biết cần chỉnh sửa
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-6">
            <!-- NOTE -->
            <div
              class="flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-500/10 dark:bg-red-500/5"
            >
              <UIcon
                name="i-lucide-info"
                class="mt-0.5 size-4 shrink-0 text-red-500"
              />

              <p class="text-xs leading-5 text-red-600 dark:text-red-400">
                Vui lòng cung cấp lý do cụ thể để người dùng có thể bổ sung hoặc
                cập nhật lại hồ sơ KYC.
              </p>
            </div>

            <!-- REASON -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-gray-700 dark:text-gray-200">
                Lý do từ chối
              </label>

              <UTextarea
                v-model="rejectReason"
                :rows="5"
                placeholder="Ví dụ: Hình ảnh CCCD bị mờ, thông tin không trùng khớp..."
                :ui="{
                  base: 'rounded-2xl resize-none',
                }"
              />
            </div>

            <!-- ACTION -->
            <div
              class="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end dark:border-white/5"
            >
              <UButton
                color="neutral"
                variant="soft"
                icon="i-lucide-arrow-left"
                class="rounded-xl"
                @click="openReject = false"
              >
                Hủy
              </UButton>

              <UButton
                color="error"
                icon="i-lucide-shield-x"
                class="rounded-xl font-bold"
                :loading="loading.reject"
                @click="handleReject"
              >
                Xác nhận từ chối
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <!-- IMAGE PREVIEW -->
    <UiImgPreview v-model="openImage" :src="previewImage" />
  </div>
</template>
