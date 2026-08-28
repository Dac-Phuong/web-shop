<script setup>
const openSearchModal = ref(false);

const searchKeyword = ref("");
const products = ref([]);
const loadingSearch = ref(false);
const stats = ref({
  total: 0,
  frozen: 0,
  completed: 0,
  unfrozen: 0,
});
let searchTimeout = null;

const list = ref([]);
const loading = ref({
  load: true,
  save: false,
});
const search = ref({
  user: null,
  product: null,
});

const formFreeze = ref({
  user: null,
  product: null,
  number: null,
});

const columns = [
  {
    accessorKey: "user",
    header: "Người dùng",
  },
  {
    accessorKey: "product",
    header: "Sản phẩm",
  },
  {
    accessorKey: "number",
    header: "Đơn hàng thứ",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày đóng băng",
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
    value: null,
  },
});

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

const getList = async () => {
  try {
    loading.value.load = true;
    const data = await useAPI("product/manage/review/list", {
      ...JSON.parse(JSON.stringify(page.value)),
    });

    list.value = data.list;
    page.value.total = data.total;
    stats.value = data.stats;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value.load = false;
  }
};

const searchProducts = async () => {
  try {
    loadingSearch.value = true;

    const result = await useAPI("product/manage/search", {
      keyword: searchKeyword.value,
    });

    products.value = result;
  } catch (err) {
    console.error(err);
  } finally {
    loadingSearch.value = false;
  }
};

const freezeProduct = async () => {
  try {
    await useAPI("product/manage/review/freeze", formFreeze.value);
    openSearchModal.value = false;
    getList();
  } catch (err) {
    console.error(err);
  }
};

const unFreezeProduct = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Gỡ sản phẩm khỏi danh sách đóng băng?",
    );
    if (!confirmDelete) return;
    await useAPI("product/manage/review/status", { id });
    getList();
  } catch (err) {
    console.error(err);
  }
};

watch(openSearchModal, async (val) => {
  if (!val) return;

  formFreeze.value = {
    user: null,
    product: null,
  };

  search.value.user = "";
  searchKeyword.value = "";

  products.value = [];

  await Promise.all([searchProducts()]);
});

watch(
  () => searchKeyword.value,
  (value) => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      await searchProducts();
    }, 500);
  },
);

getList();
</script>

<template>
  <div class="sm:space-y-6 space-y-4">
    <!-- HERO -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-xl shadow-blue-500/20 sm:p-6"
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
            <UIcon name="i-lucide-snowflake" class="size-6" />
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
              Đóng băng sản phẩm
            </h1>

            <p class="mt-1 text-sm text-blue-100">
              Quản lý danh sách sản phẩm đang được đóng băng
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- STATISTICS -->
    <div class="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4 ">
      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Tổng sản phẩm</p>

            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats.total }}
            </p>

            <p class="mt-1 text-[10px] text-muted">Danh sách hiện tại</p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
          >
            <UIcon name="i-lucide-package" class="size-5" />
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đang đóng băng</p>

            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats.frozen }}
            </p>

            <p class="mt-1 text-[10px] text-muted">Cần được theo dõi</p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500"
          >
            <UIcon name="i-lucide-lock" class="size-5" />
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đã hoàn thành</p>

            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats.completed }}
            </p>

            <p class="mt-1 text-[10px] text-muted">Đã xử lý</p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500"
          >
            <UIcon name="i-lucide-circle-check" class="size-5" />
          </div>
        </div>
      </div>
      <div
        class="rounded-2xl border border-default bg-default p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-muted">Đã gỡ đóng băng</p>

            <p class="mt-1 text-2xl font-bold tracking-tight">
              {{ stats.unfrozen }}
            </p>

            <p class="mt-1 text-[10px] text-muted">Đã mở khóa</p>
          </div>

          <div
            class="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
          >
            <UIcon name="i-lucide-lock-open" class="size-5" />
          </div>
        </div>
      </div>
    </div>

    <!-- TABLE -->
    <UCard
      class="overflow-hidden rounded-3xl border-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      :ui="{
        body: 'p-0',
        header: 'border-b border-default p-0',
      }"
    >
      <template #header>
        <div
          class="flex flex-col gap-4 p-4 md:py-4 md:px-0  lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20"
            >
              <UIcon name="i-lucide-lock-keyhole" class="size-5" />
            </div>

            <div>
              <h3 class="text-sm font-bold sm:text-base">
                Danh sách sản phẩm đóng băng
              </h3>

              <p class="mt-0.5 text-xs text-muted">
                Tổng {{ page.total }} sản phẩm
              </p>
            </div>
          </div>

          <div class="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto">
            <UForm
              :state="page"
              class="w-full sm:w-72"
              @submit="((page.current = 1), getList())"
            >
              <UInput
                v-model="page.search.value"
                icon="i-lucide-search"
                placeholder="Tìm kiếm sản phẩm..."
                size="lg"
                class="w-full"
                :ui="{
                  base: 'rounded-xl bg-white dark:bg-gray-950',
                }"
              />
            </UForm>

            <UButton
              icon="i-lucide-plus"
              size="lg"
              class="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
              @click="openSearchModal = true"
            >
              Đóng băng
            </UButton>
          </div>
        </div>
      </template>

      <div class="overflow-x-auto">
        <UTable :data="list" :columns="columns" :loading="loading.load">
          <!-- USER -->
          <template #user-cell="{ row }">
            <div class="flex min-w-[190px] items-center gap-3">
              <div class="relative shrink-0">
                <UiImg
                  :src="row.original.user?.avatar"
                  class="size-11 rounded-2xl border border-default object-cover shadow-sm"
                />

                <div
                  class="absolute -bottom-1.5 -right-1.5 flex items-center gap-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm ring-2 ring-default"
                >
                  <UIcon name="i-lucide-crown" class="size-2.5" />
                  VIP {{ row.original.user?.level || 0 }}
                </div>
              </div>

              <div class="min-w-0">
                <p class="truncate text-sm font-bold">
                  {{ row.original.user?.username || "Chưa cập nhật" }}
                </p>

                <p class="mt-0.5 truncate text-xs text-muted">
                  {{ row.original.user?.phone || "Chưa cập nhật" }}
                </p>
              </div>
            </div>
          </template>

          <!-- PRODUCT -->
          <template #product-cell="{ row }">
            <div class="flex min-w-[270px] items-center gap-3">
              <div
                class="group relative size-14 shrink-0 overflow-hidden rounded-2xl border border-default bg-elevated shadow-sm"
              >
                <UiImg
                  :src="row.original.product?.image"
                  class="size-full object-cover transition duration-300 group-hover:scale-110"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"
                />
              </div>

              <div class="min-w-0">
                <p class="line-clamp-2 text-sm font-bold">
                  {{ row.original.product?.name || "Sản phẩm" }}
                </p>

                <p
                  class="mt-1 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-sm font-extrabold text-transparent"
                >
                  ${{ useMoney().toMoney(row.original.product?.price || 0) }}
                </p>
              </div>
            </div>
          </template>

          <!-- ORDER NUMBER -->
          <template #number-cell="{ row }">
            <div class="flex items-center gap-2">
              <div
                class="flex size-8 items-center justify-center rounded-lg bg-elevated"
              >
                <UIcon name="i-lucide-hash" class="size-3.5 text-muted" />
              </div>

              <UBadge
                size="lg"
                variant="soft"
                color="primary"
                class="rounded-xl font-mono font-bold"
              >
                {{ row.original.number || "0" }}
              </UBadge>
            </div>
          </template>

          <!-- STATUS -->
          <template #status-cell="{ row }">
            <UBadge
              :color="
                row.original.status === 0
                  ? 'warning'
                  : row.original.status === 3
                    ? 'success'
                    : 'info'
              "
              variant="soft"
              size="lg"
              class="rounded-xl px-2.5 py-1.5"
            >
              <div class="flex items-center gap-1.5">
                <span
                  class="size-1.5 rounded-full"
                  :class="
                    row.original.status === 0
                      ? 'bg-amber-500'
                      : row.original.status === 3
                        ? 'bg-emerald-500'
                        : 'bg-blue-500'
                  "
                />

                <UIcon
                  :name="
                    row.original.status === 0
                      ? 'i-lucide-lock'
                      : row.original.status === 3
                        ? 'i-lucide-check-circle-2'
                        : 'i-lucide-lock-open'
                  "
                  class="size-3.5"
                />

                {{
                  row.original.status === 0
                    ? "Đang đóng băng"
                    : row.original.status === 3
                      ? "Đã hoàn thành"
                      : "Đã gỡ đóng băng"
                }}
              </div>
            </UBadge>
          </template>

          <!-- DATE -->
          <template #createdAt-cell="{ row }">
            <div class="flex min-w-[160px] items-center gap-2">
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

                <p class="mt-0.5 text-[10px] text-muted">Ngày tạo</p>
              </div>
            </div>
          </template>
        </UTable>
      </div>

      <!-- PAGINATION -->
      <div
        class="flex flex-col gap-3 border-t border-default bg-elevated/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      >
        <p class="text-xs text-muted">
          Hiển thị

          <span class="font-semibold text-highlighted">
            {{ page.total ? (page.current - 1) * page.size + 1 : 0 }}
          </span>

          -

          <span class="font-semibold text-highlighted">
            {{ Math.min(page.current * page.size, page.total) }}
          </span>

          / {{ page.total }} sản phẩm
        </p>

        <UPagination
          :page="page.current"
          @update:page="page.current = $event"
          :items-per-page="page.size"
          :total="page.total"
        />
      </div>
    </UCard>

    <!-- ADD FREEZE MODAL -->
    <UModal
      v-model:open="openSearchModal"
      :ui="{
        content: 'w-[calc(100vw-2rem)] max-w-2xl overflow-hidden rounded-3xl',
      }"
    >
      <template #content>
        <div class="flex max-h-[90vh] flex-col">
          <!-- MODAL HEADER -->
          <div
            class="relative shrink-0 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 px-5 py-5 text-white sm:px-6"
          >
            <div
              class="absolute -right-12 -top-16 size-48 rounded-full bg-white/10 blur-3xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
              >
                <UIcon name="i-lucide-snowflake" class="size-5" />
              </div>

              <div>
                <h2 class="text-lg font-bold sm:text-xl">Đóng băng sản phẩm</h2>

                <p class="mt-0.5 text-xs text-blue-100">
                  Chọn người dùng và sản phẩm cần đóng băng
                </p>
              </div>
            </div>
          </div>

          <!-- BODY -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-6">
            <div class="space-y-5">
              <!-- STEP USER -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span
                    class="flex size-6 items-center justify-center rounded-lg bg-blue-500 text-[10px] font-bold text-white"
                  >
                    1
                  </span>

                  <label class="text-xs font-bold"> Người dùng </label>
                </div>

                <SelectUser
                  v-model="formFreeze.user"
                  :loading="loading.user"
                  placeholder="Tìm kiếm người dùng..."
                />
              </div>

              <!-- ORDER -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span
                    class="flex size-6 items-center justify-center rounded-lg bg-indigo-500 text-[10px] font-bold text-white"
                  >
                    2
                  </span>

                  <label class="text-xs font-bold"> Số thứ tự đơn hàng </label>
                </div>

                <UInput
                  v-model="formFreeze.number"
                  icon="i-lucide-hash"
                  size="lg"
                  placeholder="Ví dụ: 1000"
                  class="w-full"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                />
              </div>

              <!-- PRODUCT -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span
                    class="flex size-6 items-center justify-center rounded-lg bg-blue-500 text-[10px] font-bold text-white"
                  >
                    3
                  </span>

                  <label class="text-xs font-bold"> Chọn sản phẩm </label>
                </div>

                <UInput
                  v-model="searchKeyword"
                  icon="i-lucide-search"
                  size="lg"
                  placeholder="Tìm sản phẩm..."
                  :loading="loadingSearch"
                  class="w-full"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                />
              </div>

              <!-- LOADING -->
              <div
                v-if="loadingSearch"
                class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default py-12"
              >
                <div
                  class="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10"
                >
                  <UIcon
                    name="i-lucide-loader-circle"
                    class="size-6 animate-spin text-blue-500"
                  />
                </div>

                <p class="mt-3 text-sm font-medium">Đang tìm sản phẩm...</p>

                <p class="mt-1 text-xs text-muted">
                  Vui lòng chờ trong giây lát
                </p>
              </div>

              <!-- PRODUCTS -->
              <div v-else class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold">Danh sách sản phẩm</p>

                    <p class="mt-0.5 text-[10px] text-muted">
                      Ưu tiên sản phẩm giá cao
                    </p>
                  </div>

                  <UBadge color="primary" variant="soft" class="rounded-lg">
                    {{ products.length }} sản phẩm
                  </UBadge>
                </div>

                <div
                  v-if="products.length"
                  class="max-h-72 space-y-2 overflow-y-auto pr-1"
                >
                  <div
                    v-for="item in products"
                    :key="item._id"
                    class="group flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 transition-all duration-200"
                    :class="
                      formFreeze.product === item._id
                        ? 'border-blue-500 bg-gradient-to-r from-blue-500/[0.08] to-indigo-500/[0.08] shadow-sm'
                        : 'border-default hover:border-blue-500/40 hover:bg-elevated/50'
                    "
                    @click="formFreeze.product = item._id"
                  >
                    <div
                      class="size-12 shrink-0 overflow-hidden rounded-xl border border-default bg-elevated"
                    >
                      <UiImg
                        :src="item.image"
                        class="size-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div class="min-w-0 flex-1">
                      <p
                        class="truncate text-sm font-semibold"
                        :class="
                          formFreeze.product === item._id ? 'text-blue-500' : ''
                        "
                      >
                        {{ item.name }}
                      </p>

                      <p
                        class="mt-1 text-xs font-bold"
                        :class="
                          formFreeze.product === item._id
                            ? 'text-indigo-500'
                            : 'text-primary'
                        "
                      >
                        ${{ useMoney().toMoney(item.price || 0) }}
                      </p>
                    </div>

                    <div
                      class="flex size-8 shrink-0 items-center justify-center rounded-lg"
                      :class="
                        formFreeze.product === item._id
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                          : 'bg-elevated text-muted'
                      "
                    >
                      <UIcon
                        :name="
                          formFreeze.product === item._id
                            ? 'i-lucide-check'
                            : 'i-lucide-circle'
                        "
                        class="size-4"
                      />
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default py-10 text-center"
                >
                  <div
                    class="flex size-12 items-center justify-center rounded-2xl bg-elevated"
                  >
                    <UIcon
                      name="i-lucide-package-search"
                      class="size-6 text-muted"
                    />
                  </div>

                  <p class="mt-3 text-sm font-semibold">
                    Không tìm thấy sản phẩm
                  </p>

                  <p class="mt-1 text-xs text-muted">
                    Thử thay đổi từ khóa tìm kiếm
                  </p>
                </div>
              </div>

              <!-- SELECTED PREVIEW -->
              <div
                v-if="formFreeze.product"
                class="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.06] p-4"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="size-4 text-blue-500"
                  />

                  <p class="text-xs font-bold text-blue-500">
                    Đã chọn sản phẩm
                  </p>
                </div>

                <p class="mt-2 text-xs text-muted">
                  Sản phẩm được chọn sẽ được đóng băng cho người dùng ở trên.
                </p>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div
            class="flex shrink-0 flex-col-reverse gap-2 border-t border-default bg-elevated/30 px-5 py-4 sm:flex-row sm:justify-end sm:px-6"
          >
            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              class="rounded-xl"
              @click="openSearchModal = false"
            >
              Đóng
            </UButton>

            <UButton
              size="lg"
              icon="i-lucide-lock"
              class="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
              :disabled="!formFreeze.user || !formFreeze.product"
              :loading="loading.save"
              @click="freezeProduct"
            >
              Đóng băng sản phẩm
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
