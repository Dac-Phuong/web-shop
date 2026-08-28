<script setup>
const openProductModal = ref(false);

const list = ref([]);

const loading = ref({
  load: true,
  save: false,
});

const columns = [
  {
    accessorKey: "product",
    header: "Sản phẩm",
  },


  {
    accessorKey: "price",
    header: "Giá bán",
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

// FORM
const formProduct = ref({
  id: null,
  name: "",
  image: "",
  type: 0,
  price: 0,
});

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

// OPEN MODAL
const openEditProduct = (product) => {
  formProduct.value = {
    id: product?._id || null,
    name: product?.name || "",
    image: product?.image || "",
    price: product?.price || 0,
    type: product?.type || 0,
  };

  openProductModal.value = true;
};

// SAVE
const handleSaveProduct = async () => {
  try {
    loading.value.save = true;

    await useAPI(
      formProduct.value.id ? "product/manage/update" : "product/manage/create",
      JSON.parse(JSON.stringify(formProduct.value)),
    );
    openProductModal.value = false;

    getList();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value.save = false;
  }
};

// DELETE
const handleDeleteProduct = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
    );

    if (!confirmDelete) return;

    await useAPI("product/manage/delete", {
      id,
    });

    getList();
  } catch (err) {
    console.error(err);

    alert("Xóa sản phẩm thất bại");
  }
};

// GET LIST
const getList = async () => {
  try {
    loading.value.load = true;
    const data = await useAPI(
      "product/manage/list",
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
  <div class="space-y-4 ">
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-xl shadow-blue-500/20 sm:p-6"
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
            <UIcon name="i-lucide-package-2" class="size-6" />
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
              Quản lý sản phẩm
            </h1>
            <p class="mt-1 text-sm text-blue-100">
              Quản lý, cập nhật và theo dõi danh sách sản phẩm hệ thống
            </p>
          </div>
        </div>

        <UButton
          icon="i-lucide-plus"
          size="lg"
          color="neutral"
          variant="solid"
          class="rounded-xl bg-white font-semibold text-blue-600 shadow-lg shadow-black/10 hover:bg-blue-50"
          @click="openEditProduct()"
        >
          Thêm sản phẩm
        </UButton>
      </div>
    </div>

  
    <UCard
      class="overflow-hidden rounded-3xl border-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10 w-full overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]"
      :ui="{
        body: 'p-0 sm:p-0',
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
              <UIcon name="i-lucide-box" class="size-5" />
            </div>

            <div>
              <h3 class="text-sm font-bold sm:text-base">Danh sách sản phẩm</h3>
              <p class="mt-0.5 text-xs text-muted">
                {{ page.total }} sản phẩm trong hệ thống
              </p>
            </div>
          </div>

          <UForm
            :state="page"
            class="w-full lg:w-80"
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
        </div>
      </template>

      <div class="overflow-x-auto">
        <UTable
          :data="list"
          :columns="columns"
          :loading="loading.load"
        >
          <template #product-cell="{ row }">
            <div class="flex min-w-[240px] items-center gap-3">
              <div
                class="group/image relative size-12 shrink-0 overflow-hidden rounded-2xl border border-default bg-elevated shadow-sm"
              >
                <UiImg
                  :src="row.original.image"
                  class="size-full object-cover transition duration-300 group-hover/image:scale-110"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"
                />
              </div>

              <div class="min-w-0">
                <p class="max-w-[280px] truncate text-sm font-bold">
                  {{ row.original.name }}
                </p>

                <div class="mt-1 flex items-center gap-1.5">
                  <span
                    class="rounded-md bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {{ row.original._id }}
                  </span>
                </div>
              </div>
            </div>
          </template>

          <template #price-cell="{ row }">
            <div class="min-w-[120px]">
              <p
                class="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-sm font-extrabold text-transparent"
              >
                ${{ useMoney().toMoney(row.original.price || 0) }}
              </p>

              <p class="mt-1 text-[10px] font-medium text-muted">
                Giá sản phẩm
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
                <p class="mt-0.5 text-[10px] text-muted">Ngày tạo</p>
              </div>
            </div>
          </template>

          <template #action-cell="{ row }">
            <div class="flex items-center justify-end gap-2">
              <UButton
                color="primary"
                variant="soft"
                icon="i-lucide-pencil"
                size="sm"
                square
                class="rounded-xl transition-all hover:scale-105"
                @click="openEditProduct(row.original)"
              />

              <UButton
                color="error"
                variant="soft"
                icon="i-lucide-trash-2"
                size="sm"
                square
                class="rounded-xl transition-all hover:scale-105"
                @click="handleDeleteProduct(row.original._id)"
              />
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

    <UModal
      v-model:open="openProductModal"
      :ui="{
        content: 'w-[calc(100vw-2rem)] max-w-2xl overflow-hidden rounded-3xl',
      }"
    >
      <template #content>
        <div class="max-h-[90vh] overflow-y-auto">
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 px-5 py-5 text-white"
          >
            <div
              class="absolute -right-10 -top-16 size-40 rounded-full bg-white/10 blur-2xl"
            />

            <div class="relative flex items-center gap-3">
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
              >
                <UIcon name="i-lucide-package-plus" class="size-5" />
              </div>

              <div class="min-w-0">
                <h2 class="text-lg font-bold">
                  {{
                    formProduct.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"
                  }}
                </h2>

                <p class="mt-0.5 text-xs text-blue-100">
                  Thiết lập thông tin sản phẩm
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-5 p-5 sm:p-6">
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-bold">
                <UIcon name="i-lucide-image" class="size-3.5 text-blue-500" />
                Hình ảnh sản phẩm
              </label>

              <UiUploadImage v-model="formProduct.image" :isUrl="true">
                <template #default="{ select, loading }">
                  <UInput
                    icon="i-bxs-image"
                    placeholder="Chọn hình ảnh sản phẩm"
                    :model-value="formProduct.image"
                    :loading="loading"
                    :disabled="updating"
                    readonly
                    size="lg"
                    class="w-full"
                    :ui="{
                      base: 'rounded-xl',
                    }"
                    @click="select"
                  />
                </template>
              </UiUploadImage>
            </div>

            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-bold">
                <UIcon name="i-lucide-tag" class="size-3.5 text-blue-500" />
                Tên sản phẩm
              </label>

              <UInput
                v-model="formProduct.name"
                size="lg"
                icon="i-lucide-tag"
                placeholder="Nhập tên sản phẩm..."
                class="w-full"
                :ui="{
                  base: 'rounded-xl',
                }"
              />
            </div>

            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-bold">
                <UIcon
                  name="i-lucide-dollar-sign"
                  class="size-3.5 text-blue-500"
                />
                Giá sản phẩm
              </label>

              <UInput
                v-model="formProduct.price"
                type="number"
                size="lg"
                icon="i-lucide-dollar-sign"
                placeholder="Nhập giá..."
                class="w-full"
                :ui="{
                  base: 'rounded-xl',
                }"
              />
            </div>

            <div
              class="overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.06] to-indigo-600/[0.06]"
            >
              <div
                class="flex items-center justify-between border-b border-blue-500/10 px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                  >
                    <UIcon name="i-lucide-eye" class="size-3.5" />
                  </div>

                  <div>
                    <p class="text-xs font-bold">Xem trước sản phẩm</p>
                    <p class="text-[10px] text-muted">
                      Hiển thị thực tế trong hệ thống
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex gap-4 p-4 sm:p-5">
                <div
                  class="size-24 shrink-0 overflow-hidden rounded-2xl border border-default bg-default shadow-sm"
                >
                  <UiImg
                    :src="
                      formProduct.image ||
                      'https://placehold.co/300x300?text=Product'
                    "
                    class="size-full object-cover"
                  />
                </div>

                <div class="min-w-0 flex-1 self-center">
                  <p class="truncate text-sm font-bold">
                    {{ formProduct.name || "Tên sản phẩm" }}
                  </p>

                  <div class="mt-2 flex items-center gap-2">
                    <p
                      class="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-xl font-extrabold text-transparent"
                    >
                      ${{ useMoney().toMoney(formProduct.price || 0) }}
                    </p>
                  </div>

                  <p class="mt-1 text-[10px] text-muted">Giá bán hiện tại</p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col-reverse gap-2 border-t border-default bg-elevated/30 px-5 py-4 sm:flex-row sm:justify-end"
          >
            <UButton
              color="neutral"
              variant="soft"
              size="lg"
              class="rounded-xl"
              @click="openProductModal = false"
            >
              Hủy bỏ
            </UButton>

            <UButton
              size="lg"
              icon="i-lucide-check"
              class="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-indigo-700"
              :loading="loading.save"
              @click="handleSaveProduct"
            >
              {{ formProduct.id ? "Lưu thay đổi" : "Tạo sản phẩm" }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
