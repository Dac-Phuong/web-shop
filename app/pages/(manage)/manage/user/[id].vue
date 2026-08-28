<script setup>
const route = useRoute();
const toast = useToast();
const { t } = useI18n();

const loading = reactive({
  page: true,
  password: false,
  withdraw: false,
  trans: false,
  del: false,
  update: false,
  upload: false,
});

const user = ref({});
const transactions = ref([]);
const bankAccount = ref(null);
const userKYC = ref(null);
const previewImage = ref(null);
const confirmDelete = ref(false);
const imageVersion = Date.now();
const modal = ref({
  upload: false,
  update: false,
  show: false,
});

const openPreview = (img) => {
  previewImage.value = img;
  modal.value.show = true;
};
const openUpdateBank = () => {
  const bank = bankAccount.value?.[0];
  updateBank.bankName = bank?.bankName || "";
  updateBank.accountNumber = bank?.accountNumber || "";
  updateBank.accountName = bank?.accountName || "";
  updateBank.address = bank?.address || "";

  modal.value.update = true;
};
const passwordForm = reactive({
  user: route.params.id,
  newPassword: "",
});

const withdrawPasswordForm = reactive({
  user: route.params.id,
  newPassword: "",
});

const updateCCCDForm = reactive({
  user: route.params.id,
  front: "",
  back: "",
});
const updateBank = reactive({
  user: route.params.id,
  bankName: bankAccount[0]?.bankName || "",
  accountNumber: bankAccount[0]?.accountNumber || "",
  accountName: bankAccount[0]?.accountName || "",
  address: bankAccount[0]?.address || "",
});

const page = ref({
  user: route.params.id,
  type: null,
  current: 1,
  size: 10,
  total: 0,
});

const getTransactions = async () => {
  try {
    loading.trans = true;
    const data = await $fetch("/api/payment/manage/list", {
      method: "POST",
      body: {
        user: page.value.user,
        page: page.value.current,
        limit: page.value.size,
        type: page.value.type,
      },
    });

    transactions.value = data?.result?.items || [];
    page.value.total = data?.result?.total || 0;
    loading.trans = false;
  } catch (error) {
    loading.trans = false;
    console.error(error);
  }
};

watch(
  () => page.value.current,
  () => {
    getTransactions();
  },
);

onMounted(() => {
  getTransactions();
});
const transactionColumns = [
  {
    accessorKey: "type",
    header: "Loại",
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
    accessorKey: "note",
    header: "Nội dung",
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian",
  },
];

const kycStatus = computed(() => {
  if (user.value?.kyc?.status === 2) {
    return {
      label: "Đã xác thực",
      color: "success",
      icon: "i-lucide-badge-check",
      description: "Tài khoản đã hoàn tất xác minh danh tính",
    };
  }

  if (user.value?.kyc?.status === 1) {
    return {
      label: "Chờ xác thực",
      color: "warning",
      icon: "i-lucide-hourglass",
      description: "Đang chờ quản trị viên phê duyệt KYC",
    };
  }

  return {
    label: "Chưa xác thực",
    color: "error",
    icon: "i-lucide-shield-alert",
    description: "Người dùng chưa hoàn tất xác minh danh tính",
  };
});

const accountStatus = computed(() => {
  if (user.block === 1) {
    return {
      label: "Đã khóa",
      color: "error",
      icon: "i-lucide-lock",
    };
  }

  return {
    label: "Hoạt động",
    color: "success",
    icon: "i-lucide-check-check",
  };
});

const getUserDetail = async () => {
  try {
    loading.page = true;
    const data = await $fetch("/api/user/manage/detail", {
      method: "GET",
      query: {
        id: route.params.id,
      },
    });

    user.value = data.result;
    bankAccount.value = data.result.bankAccount;
    userKYC.value = data.result.kyc;
  } catch (e) {
    toast.add({
      title: "Lỗi",
      description: e?.data?.message || "Không thể tải dữ liệu",
      color: "error",
    });
  } finally {
    loading.page = false;
  }
};

const submitPassword = async () => {
  try {
    loading.password = true;
    await useAPI("user/manage/password/update", passwordForm);

    passwordForm.newPassword = "";
  } catch (e) {
    console.log(e);
  } finally {
    loading.password = false;
  }
};

const submitWithdrawPassword = async () => {
  try {
    loading.withdraw = true;

    await useAPI("user/manage/password/withdraw", withdrawPasswordForm);

    withdrawPasswordForm.newPassword = "";
  } catch (e) {
    console.log(e);
  } finally {
    loading.withdraw = false;
  }
};
const submitUpdateCCCD = async () => {
  try {
    loading.upload = true;
    const res = await useAPI("user/manage/edit/update-cccd", updateCCCDForm);
    if (res?.kyc) {
      userKYC.value = res?.kyc;
    }
    modal.value.upload = false;
  } catch (e) {
    console.log(e);
  } finally {
    loading.upload = false;
  }
};
const submitUpdate = async () => {
  try {
    loading.update = true;
    const res = await useAPI("user/manage/edit/bank", updateBank);
    bankAccount.value = res.bankAccount;
    modal.value.update = false;
  } catch (e) {
    console.log(e);
  } finally {
    loading.update = false;
  }
};
// client
const handleDelete = async () => {
  try {
    loading.del = true;
    await useAPI("user/manage/del", { user: route.params.id });
    navigateTo("/manage/user");
  } catch (e) {
    console.log(e);
  } finally {
    loading.del = false;
  }
};

getUserDetail();
</script>

<template>
  <div class="min-h-screen space-y-4">
    <!-- BACK -->
    <UButton
      color="neutral"
      variant="soft"
      icon="i-lucide-arrow-left"
      class="mb-1 rounded-2xl px-4"
      @click="$router.back()"
    >
      Quay lại
    </UButton>

    <div class="space-y-4 lg:p-1">
      <div class="grid gap-4 xl:grid-cols-3">
        <div class="space-y-4 xl:col-span-2">
          <UCard
            :ui="{
              root: 'overflow-hidden rounded-[28px]  bg-default shadow-sm dark:border-white/10',
              body: '!p-0',
            }"
          >
            <!-- HEADER -->
            <div
              class="border-b border-default px-5 py-5 dark:border-white/10"
            >
              <div
                class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div class="flex items-center gap-4">
                  <!-- ICON -->
                  <div
                    class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-600/15 text-blue-500 ring-1 ring-blue-500/10 dark:from-blue-500/10 dark:to-indigo-600/10"
                  >
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-6"
                    />
                  </div>

                  <div>
                    <h3 class="text-base font-bold">
                      Thông tin xác minh tài khoản
                    </h3>

                    <p class="mt-0.5 text-sm text-muted">
                      Hồ sơ cá nhân & định danh người dùng
                    </p>
                  </div>
                </div>

                <!-- STATUS -->
                <div class="flex flex-wrap items-center gap-2">
                  <UBadge
                    :color="kycStatus.color"
                    variant="soft"
                    class="rounded-xl px-3 py-1.5"
                  >
                    <div class="flex items-center gap-1.5">
                      <UIcon
                        :name="kycStatus.icon"
                        class="size-4"
                      />
                      <span>{{ kycStatus.label }}</span>
                    </div>
                  </UBadge>

                  <UBadge
                    :color="accountStatus.color"
                    variant="soft"
                    class="rounded-xl px-3 py-1.5"
                  >
                    {{ accountStatus.label }}
                  </UBadge>
                </div>
              </div>
            </div>

            <!-- BODY -->
            <div class="space-y-4 p-5">
              <div
                class="flex flex-col gap-4 rounded-3xl bg-elevated/30 p-4 sm:flex-row sm:items-center dark:border-white/10"
              >
                <!-- AVATAR -->
                <div
                  class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                >
                  <UiImg
                    v-if="user.avatar"
                    :src="user.avatar"
                    class="h-full w-full object-cover"
                  />

                  <UIcon
                    v-else
                    name="i-lucide-user"
                    class="size-7"
                  />
                </div>

                <!-- INFO -->
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="truncate text-lg font-bold">
                      {{ user.username || "---" }}
                    </h3>

                    <UBadge
                      color="primary"
                      variant="soft"
                      class="rounded-lg"
                    >
                      Lv.{{ user.level || 0 }}
                    </UBadge>
                  </div>

                  <div
                    class="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
                  >
                    <div class="flex items-center gap-1.5">
                      <UIcon
                        name="i-lucide-phone"
                        class="size-4 text-blue-500"
                      />

                      <span>
                        {{ user.phone || "---" }}
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <UIcon
                        name="i-lucide-calendar-days"
                        class="size-4 text-blue-500"
                      />

                      <span>
                        {{ useDayJs().displayFull(user.createdAt) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ================================================= -->
              <!-- STATS -->
              <!-- ================================================= -->
              <div class="grid gap-4 lg:grid-cols-3">
                <!-- LEFT -->
                <div class="space-y-4">
                  <!-- BALANCE -->
                  <div
                    class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/15"
                  >
                    <!-- decorative -->
                    <div
                      class="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl"
                    />

                    <div
                      class="absolute -bottom-10 -left-8 size-28 rounded-full bg-indigo-300/20 blur-2xl"
                    />

                    <div class="relative">
                      <div
                        class="flex items-center gap-2 text-sm text-white/75"
                      >
                        <UIcon
                          name="i-lucide-wallet"
                          class="size-4"
                        />

                        <span>Số dư khả dụng</span>
                      </div>

                      <h3 class="mt-3 text-2xl font-black tracking-tight">
                        ${{ useMoney().toMoney(user.coin || 0) }}
                      </h3>

                      <div
                        class="mt-4 flex items-center gap-1.5 text-xs text-white/65"
                      >
                        <UIcon
                          name="i-lucide-circle-check"
                          class="size-3.5"
                        />

                        <span>Số dư hiện tại</span>
                      </div>
                    </div>
                  </div>

                  <!-- KYC -->
                  <div
                    class="rounded-3xl bg-default p-5 shadow-sm dark:border-white/10"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex size-10 shrink-0 items-center justify-center rounded-2xl"
                        :class="
                          user?.kyc?.status === 2
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-blue-500/10 text-blue-500'
                        "
                      >
                        <UIcon
                          name="i-lucide-shield-check"
                          class="size-5"
                        />
                      </div>

                      <div>
                        <h3 class="font-bold">
                          Xác thực KYC
                        </h3>

                        <p class="text-xs text-muted">
                          Trạng thái tài khoản
                        </p>
                      </div>
                    </div>

                    <div class="mt-4">
                      <h4
                        class="text-lg font-bold"
                        :class="
                          user?.kyc?.status === 2
                            ? 'text-emerald-500'
                            : 'text-blue-500'
                        "
                      >
                        {{
                          user?.kyc?.status === 2
                            ? "Đã xác thực"
                            : "Chưa xác thực"
                        }}
                      </h4>

                      <p class="mt-1 text-xs text-muted">
                        {{
                          user?.kyc?.status === 2
                            ? "Danh tính đã được xác minh"
                            : "Người dùng chưa hoàn tất xác minh"
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- BANK -->
                <div
                  class="rounded-3xl bg-default p-5 shadow-sm lg:col-span-2 dark:border-white/10"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div
                        class="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
                      >
                        <UIcon
                          name="i-lucide-credit-card"
                          class="size-5"
                        />
                      </div>

                      <div>
                        <h3 class="font-bold">
                          Ngân hàng
                        </h3>

                        <p class="text-xs text-muted">
                          Thông tin liên kết
                        </p>
                      </div>
                    </div>

                    <UButton
                      icon="i-lucide-pencil"
                      color="primary"
                      variant="soft"
                      label="Sửa"
                      size="sm"
                      class="rounded-xl"
                      @click="openUpdateBank()"
                    />
                  </div>

                  <!-- BANK EXISTS -->
                  <template v-if="bankAccount?.[0]">
                    <div
                      class="mt-4 overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 dark:from-blue-500/[0.06] dark:to-indigo-600/[0.06]"
                    >
                      <div
                        class="flex items-center gap-2 border-b border-blue-500/10 px-4 py-3"
                      >
                        <UIcon
                          name="i-lucide-badge-check"
                          class="size-4 text-blue-500"
                        />

                        <span class="text-xs font-medium text-blue-500">
                          Tài khoản ngân hàng đã liên kết
                        </span>
                      </div>

                      <div class="grid gap-4 p-4 md:grid-cols-3">
                        <div>
                          <p class="text-xs text-muted">
                            Ngân hàng
                          </p>

                          <h4 class="mt-1 font-semibold">
                            {{ bankAccount[0].bankName }}
                          </h4>
                        </div>

                        <div>
                          <p class="text-xs text-muted">
                            Chủ tài khoản
                          </p>

                          <h4 class="mt-1 font-semibold uppercase">
                            {{ bankAccount[0].accountName }}
                          </h4>
                        </div>

                        <div>
                          <p class="text-xs text-muted">
                            Số tài khoản
                          </p>

                          <h4 class="mt-1 font-bold tracking-wider">
                            {{ bankAccount[0].accountNumber }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- NO BANK -->
                  <div
                    v-else
                    class="mt-4 rounded-2xl border border-dashed border-blue-500/25 bg-blue-500/[0.03] py-10 text-center"
                  >
                    <div
                      class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
                    >
                      <UIcon
                        name="i-lucide-wallet-cards"
                        class="size-6"
                      />
                    </div>

                    <p class="mt-3 text-sm font-semibold text-blue-500">
                      Chưa liên kết ngân hàng
                    </p>

                    <p class="mt-1 text-xs text-muted">
                      Người dùng chưa thêm tài khoản ngân hàng
                    </p>
                  </div>
                </div>
              </div>

              <!-- ================================================= -->
              <!-- DANGER ACTION -->
              <!-- ================================================= -->
              <div
                class="flex flex-col gap-4 rounded-3xl border border-red-500/15 bg-red-500/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <div
                      class="flex size-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500"
                    >
                      <UIcon
                        name="i-lucide-trash-2"
                        class="size-4"
                      />
                    </div>

                    <h4 class="font-semibold text-red-500">
                      Xóa vĩnh viễn tài khoản
                    </h4>
                  </div>

                  <p class="mt-2 max-w-2xl text-sm text-muted">
                    Hành động này không thể hoàn tác. Toàn bộ dữ liệu người
                    dùng sẽ bị xóa khỏi hệ thống.
                  </p>
                </div>

                <UButton
                  color="error"
                  variant="soft"
                  icon="i-lucide-trash-2"
                  class="shrink-0 rounded-2xl"
                  @click="confirmDelete = true"
                >
                  Xóa tài khoản
                </UButton>
              </div>

              <!-- ================================================= -->
              <!-- KYC IMAGE -->
              <!-- ================================================= -->
              <div class="space-y-4">
                <div
                  class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 class="font-semibold">
                      Ảnh xác minh CCCD/CMND
                    </h4>

                    <p class="text-sm text-muted">
                      Kiểm tra giấy tờ người dùng đã tải lên
                    </p>
                  </div>

                  <UButton
                    icon="i-lucide-pencil"
                    color="primary"
                    variant="soft"
                    label="Sửa ảnh CCCD"
                    size="sm"
                    class="rounded-xl"
                    @click="modal.upload = true"
                  />
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <!-- FRONT -->
                  <div
                    class="group overflow-hidden rounded-3xl bg-default shadow-sm dark:border-white/10"
                  >
                    <div
                      class="flex items-center justify-between border-b border-default px-4 py-3 dark:border-white/10"
                    >
                      <div class="flex items-center gap-2">
                        <span class="font-medium">
                          Mặt trước CCCD
                        </span>

                        <UBadge
                          color="primary"
                          variant="soft"
                          class="rounded-lg"
                        >
                          Front
                        </UBadge>
                      </div>

                      <UIcon
                        name="i-lucide-zoom-in"
                        class="size-4 text-muted transition group-hover:text-blue-500"
                      />
                    </div>

                    <div class="bg-elevated/30">
                      <UiImg
                        v-if="userKYC?.frontImage"
                        :src="`${userKYC.frontImage}?v=${imageVersion}`"
                        @click="openPreview(userKYC.frontImage)"
                        class="h-56 w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.01]"
                      />

                      <div
                        v-else
                        class="flex h-56 flex-col items-center justify-center"
                      >
                        <div
                          class="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
                        >
                          <UIcon
                            name="i-lucide-image-off"
                            class="size-6"
                          />
                        </div>

                        <span class="mt-2 text-sm text-muted">
                          Chưa tải ảnh CCCD
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- BACK -->
                  <div
                    class="group overflow-hidden rounded-3xl bg-default shadow-sm dark:border-white/10"
                  >
                    <div
                      class="flex items-center justify-between border-b border-default px-4 py-3 dark:border-white/10"
                    >
                      <div class="flex items-center gap-2">
                        <span class="font-medium">
                          Mặt sau CCCD
                        </span>

                        <UBadge
                          color="neutral"
                          variant="soft"
                          class="rounded-lg"
                        >
                          Back
                        </UBadge>
                      </div>

                      <UIcon
                        name="i-lucide-zoom-in"
                        class="size-4 text-muted transition group-hover:text-blue-500"
                      />
                    </div>

                    <div class="bg-elevated/30">
                      <UiImg
                        v-if="userKYC?.backImage"
                        :src="`${userKYC.backImage}?v=${imageVersion}`"
                        @click="openPreview(userKYC.backImage)"
                        class="h-56 w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.01]"
                      />

                      <div
                        v-else
                        class="flex h-56 flex-col items-center justify-center"
                      >
                        <div
                          class="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
                        >
                          <UIcon
                            name="i-lucide-image-off"
                            class="size-6"
                          />
                        </div>

                        <span class="mt-2 text-sm text-muted">
                          Chưa tải ảnh CCCD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- ==================================================== -->
          <!-- TRANSACTION -->
          <!-- ==================================================== -->
          <UCard
            :ui="{
              root: 'overflow-hidden rounded-[28px] bg-default shadow-sm dark:border-white/10',
            }"
          >
            <template #header>
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <div
                      class="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
                    >
                      <UIcon
                        name="i-lucide-arrow-left-right"
                        class="size-4"
                      />
                    </div>

                    <h3 class="font-semibold">
                      Lịch sử giao dịch
                    </h3>
                  </div>

                  <p class="mt-1 text-sm text-muted">
                    Theo dõi nạp tiền & rút tiền
                  </p>
                </div>

                <UDropdownMenu
                  :items="[
                    {
                      label: 'Tất cả',
                      icon: 'i-lucide-list',
                      onSelect: () => {
                        page.type = null;
                        page.current = 1;
                        getTransactions();
                      },
                    },
                    {
                      label: 'Nạp tiền',
                      icon: 'i-lucide-arrow-down-circle',
                      onSelect: () => {
                        page.type = 'deposit';
                        page.current = 1;
                        getTransactions();
                      },
                    },
                    {
                      label: 'Rút tiền',
                      icon: 'i-lucide-arrow-up-circle',
                      onSelect: () => {
                        page.type = 'withdraw';
                        page.current = 1;
                        getTransactions();
                      },
                    },
                  ]"
                >
                  <UButton
                    icon="i-lucide-filter"
                    color="neutral"
                    variant="soft"
                    class="rounded-2xl"
                  >
                    Lọc giao dịch
                  </UButton>
                </UDropdownMenu>
              </div>
            </template>

            <UTable
              :data="transactions"
              :columns="transactionColumns"
              :loading="loading.trans"
              class="rounded-2xl"
              :ui="{
                base: 'min-w-full',
                thead: 'bg-elevated/50',
                tbody: 'divide-y divide-default',
                tr: 'transition-colors hover:bg-elevated/40',
                th: 'py-4 text-muted font-medium',
                td: 'py-3',
              }"
            >
              <!-- TYPE -->
              <template #type-cell="{ row }">
                <UBadge
                  :color="
                    row.original.type === 'deposit'
                      ? 'success'
                      : 'warning'
                  "
                  variant="soft"
                  class="rounded-lg"
                >
                  {{
                    row.original.type === "deposit"
                      ? "Nạp tiền"
                      : "Rút tiền"
                  }}
                </UBadge>
              </template>

              <!-- NOTE -->
              <template #note-cell="{ row }">
                <span class="text-sm">
                  {{
                    t(row.original.note, {
                      amount: `${row.original.amount}`,
                    }) || t("financialTransaction")
                  }}
                </span>
              </template>

              <!-- AMOUNT -->
              <template #amount-cell="{ row }">
                <span
                  class="font-semibold"
                  :class="
                    row.original.type === 'deposit'
                      ? 'text-emerald-500'
                      : 'text-red-500'
                  "
                >
                  {{
                    row.original.type === "deposit" ? "+" : "-"
                  }}${{ useMoney().toMoney(row.original.amount) }}
                </span>
              </template>

              <!-- STATUS -->
              <template #status-cell="{ row }">
                <UBadge
                  :color="
                    row.original.status === 'success'
                      ? 'success'
                      : row.original.status === 'pending'
                        ? 'warning'
                        : 'error'
                  "
                  variant="soft"
                  class="rounded-lg"
                >
                  {{
                    row.original.status === "success"
                      ? "Thành công"
                      : row.original.status === "pending"
                        ? "Đang xử lý"
                        : "Thất bại"
                  }}
                </UBadge>
              </template>

              <!-- DATE -->
              <template #createdAt-cell="{ row }">
                <span class="text-sm text-muted">
                  {{ useDayJs().displayFull(row.original.createdAt) }}
                </span>
              </template>
            </UTable>

            <div
              class="flex items-center justify-center border-t border-default pt-4 dark:border-white/10"
            >
              <UPagination
                :page="page.current"
                @update:page="page.current = $event"
                :items-per-page="page.size"
                :total="page.total"
              />
            </div>
          </UCard>
        </div>

        <!-- ====================================================== -->
        <!-- RIGHT -->
        <!-- ====================================================== -->
        <div class="space-y-4">
          <!-- ==================================================== -->
          <!-- SECURITY -->
          <!-- ==================================================== -->
          <UCard
            :ui="{
              root: 'rounded-[28px] bg-default shadow-sm dark:border-white/10',
            }"
          >
            <template #header>
              <div class="flex items-center gap-3">
                <div
                  class="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-600/15 text-blue-500"
                >
                  <UIcon
                    name="i-lucide-lock"
                    class="size-6"
                  />
                </div>

                <div>
                  <h3 class="font-semibold">
                    Mật khẩu đăng nhập
                  </h3>

                  <p class="text-sm text-muted">
                    Cập nhật bảo mật tài khoản
                  </p>
                </div>
              </div>
            </template>

            <form
              class="space-y-4"
              @submit.prevent="submitPassword"
            >
              <div
                class="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-4 text-sm leading-6 text-muted dark:bg-blue-500/[0.04]"
              >
                Thay đổi mật khẩu đăng nhập cho người dùng. Sau khi cập nhật,
                mật khẩu cũ sẽ không còn hiệu lực.
              </div>

              <UInput
                v-model="passwordForm.newPassword"
                type="text"
                placeholder="Nhập mật khẩu mới"
                size="xl"
                icon="i-lucide-key-round"
                class="w-full"
              />

              <UButton
                type="submit"
                block
                size="xl"
                color="primary"
                :loading="loading.password"
                class="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/15 hover:from-blue-600 hover:to-indigo-700"
              >
                Cập nhật mật khẩu
              </UButton>
            </form>
          </UCard>

          <!-- ==================================================== -->
          <!-- WITHDRAW -->
          <!-- ==================================================== -->
          <UCard
            :ui="{
              root: 'rounded-[28px] bg-default shadow-sm dark:border-white/10',
            }"
          >
            <template #header>
              <div class="flex items-center gap-3">
                <div
                  class="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-600/15 text-blue-500"
                >
                  <UIcon
                    name="i-lucide-wallet-cards"
                    class="size-6"
                  />
                </div>

                <div>
                  <h3 class="font-semibold">
                    Mật khẩu rút tiền
                  </h3>

                  <p class="text-sm text-muted">
                    Xác thực giao dịch tài chính
                  </p>
                </div>
              </div>
            </template>

            <form
              class="space-y-4"
              @submit.prevent="submitWithdrawPassword"
            >
              <div
                class="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-4 text-sm leading-6 text-muted dark:bg-blue-500/[0.04]"
              >
                Mật khẩu này được sử dụng khi người dùng thực hiện lệnh rút
                tiền hoặc giao dịch quan trọng.
              </div>

              <UInput
                v-model="withdrawPasswordForm.newPassword"
                type="text"
                placeholder="Nhập mật khẩu rút tiền"
                size="xl"
                icon="i-lucide-shield-check"
                class="w-full"
              />

              <UButton
                type="submit"
                block
                size="xl"
                color="primary"
                :loading="loading.withdraw"
                class="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/15 hover:from-blue-600 hover:to-indigo-700"
              >
                Cập nhật mật khẩu rút tiền
              </UButton>
            </form>
          </UCard>

          <!-- SECURITY NOTE -->
          <div
            class="rounded-[28px] border border-blue-500/10 bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.06] p-5"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
              >
                <UIcon
                  name="i-lucide-info"
                  class="size-5"
                />
              </div>

              <div>
                <h4 class="font-semibold">
                  Lưu ý bảo mật
                </h4>

                <p class="mt-1 text-sm leading-6 text-muted">
                  Hãy đảm bảo mật khẩu mới đủ mạnh và không chia sẻ thông tin
                  bảo mật của tài khoản cho người khác.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- DELETE MODAL -->
    <!-- ======================================================== -->
    <UModal
      v-model:open="confirmDelete"
      :ui="{
        content: 'overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="space-y-4 bg-default p-6">
          <!-- HEADER -->
          <div class="flex items-start gap-3">
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-500"
            >
              <UIcon
                name="i-lucide-alert-triangle"
                class="size-5"
              />
            </div>

            <div>
              <h3 class="text-lg font-bold">
                Xác nhận xóa người dùng
              </h3>

              <p class="mt-1 text-sm text-muted">
                Hành động này không thể hoàn tác.
              </p>
            </div>
          </div>

          <!-- WARNING -->
          <div
            class="rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-4 text-sm leading-6 text-muted"
          >
            Toàn bộ dữ liệu tài khoản, giao dịch và thông tin liên quan sẽ bị
            xóa khỏi hệ thống.
          </div>

          <!-- ACTION -->
          <div class="flex justify-end gap-2 pt-1">
            <UButton
              color="neutral"
              variant="soft"
              class="rounded-2xl"
              @click="confirmDelete = false"
            >
              Hủy
            </UButton>

            <UButton
              color="error"
              class="rounded-2xl"
              :loading="loading.del"
              @click="handleDelete"
            >
              <UIcon
                name="i-lucide-trash-2"
                class="size-4"
              />

              Xóa tài khoản
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- ======================================================== -->
    <!-- UPDATE CCCD -->
    <!-- ======================================================== -->
    <UModal
      v-model:open="modal.upload"
      :ui="{
        content: 'overflow-hidden rounded-[28px]',
      }"
      title="Cập nhật thông tin căn cước"
    >
      <template #body>
        <div class="space-y-4">
          <!-- HEADER -->
          <div
            class="rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.06] p-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
              >
                <UIcon
                  name="i-lucide-id-card"
                  class="size-5"
                />
              </div>

              <div>
                <h4 class="font-semibold">
                  Cập nhật ảnh CCCD
                </h4>

                <p class="text-xs text-muted">
                  Thay đổi ảnh giấy tờ xác minh của người dùng
                </p>
              </div>
            </div>
          </div>

          <!-- FRONT -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              Ảnh mặt trước
            </label>

            <UiUploadImage
              v-model="updateCCCDForm.front"
              :isUrl="true"
            >
              <template #default="{ select, loading }">
                <UInput
                  icon="i-bxs-image"
                  placeholder="Bấm vào đây để tải ảnh"
                  :model-value="updateCCCDForm.front"
                  :loading="loading.update"
                  readonly
                  class="w-full"
                  @click="select"
                />
              </template>
            </UiUploadImage>
          </div>

          <!-- BACK -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              Ảnh mặt sau
            </label>

            <UiUploadImage
              v-model="updateCCCDForm.back"
              :isUrl="true"
            >
              <template #default="{ select, loading }">
                <UInput
                  icon="i-bxs-image"
                  placeholder="Bấm vào đây để tải ảnh"
                  :model-value="updateCCCDForm.back"
                  :loading="loading.update"
                  readonly
                  class="w-full"
                  @click="select"
                />
              </template>
            </UiUploadImage>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-3">
          <UButton
            color="neutral"
            variant="soft"
            class="rounded-2xl"
            @click="modal.upload = false"
          >
            Hủy
          </UButton>

          <UButton
            icon="i-heroicons-check"
            color="primary"
            :loading="loading.upload"
            class="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600"
            @click="submitUpdateCCCD"
          >
            Cập nhật ảnh
          </UButton>
        </div>
      </template>
    </UModal>

    <!-- ======================================================== -->
    <!-- UPDATE BANK -->
    <!-- ======================================================== -->
    <UModal
      v-model:open="modal.update"
      :ui="{
        content: 'overflow-hidden rounded-[28px]',
      }"
      title="Cập nhật thông tin ngân hàng"
    >
      <template #body>
        <div class="space-y-4">
          <!-- HEADER -->
          <div
            class="rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.06] p-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
              >
                <UIcon
                  name="i-lucide-building-2"
                  class="size-5"
                />
              </div>

              <div>
                <h4 class="font-semibold">
                  Thông tin ngân hàng
                </h4>

                <p class="text-xs text-muted">
                  Cập nhật tài khoản nhận tiền của người dùng
                </p>
              </div>
            </div>
          </div>

          <!-- BANK NAME -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              Tên ngân hàng
            </label>

            <UInput
              v-model="updateBank.bankName"
              type="text"
              placeholder="Nhập tên ngân hàng"
              size="xl"
              icon="i-lucide-building-2"
              class="w-full"
            />
          </div>

          <!-- ACCOUNT NAME -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              Chủ tài khoản
            </label>

            <UInput
              v-model="updateBank.accountName"
              type="text"
              placeholder="Nhập tên chủ tài khoản"
              size="xl"
              icon="i-lucide-user"
              class="w-full"
            />
          </div>

          <!-- ACCOUNT NUMBER -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              Số tài khoản
            </label>

            <UInput
              v-model="updateBank.accountNumber"
              type="text"
              placeholder="Nhập số tài khoản"
              size="xl"
              icon="i-lucide-credit-card"
              class="w-full"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-3">
          <UButton
            color="neutral"
            variant="soft"
            class="rounded-2xl"
            @click="modal.update = false"
          >
            Hủy
          </UButton>

          <UButton
            icon="i-heroicons-check"
            color="primary"
            :loading="loading.update"
            class="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md shadow-blue-500/15"
            @click="submitUpdate"
          >
            Cập nhật
          </UButton>
        </div>
      </template>
    </UModal>

    <!-- IMAGE PREVIEW -->
    <UiImgPreview
      v-model="modal.show"
      :src="previewImage"
    />
  </div>
</template>
