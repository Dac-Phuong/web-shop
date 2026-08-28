<script setup>
const openPlanModal = ref(false);

const list = ref([]);

const loading = ref({
  load: true,
  save: false,
});

const columns = [
  {
    accessorKey: "name",
    header: "Gói VIP",
  },
  {
    accessorKey: "price",
    header: "Giá",
  },
  {
    accessorKey: "commission",
    header: "Hoa hồng",
  },
  {
    accessorKey: "maxOrders",
    header: "Đơn/ngày",
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

const formPlan = ref({
  id: null,
  name: "",
  level: 1,
  description: "",
  price: 0,
  limit: 0,
  commission: 0,
  maxOrders: 1,
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

// OPEN CREATE / EDIT
const openEditPlan = (plan = null) => {
  formPlan.value = {
    id: plan?._id || null,
    name: plan?.name || "",
    level: plan?.level || 1,
    description: plan?.description || "",
    price: plan?.price || 0,
    limit: plan?.limit || 0,
    commission: plan?.commission || 0,
    maxOrders: plan?.maxOrders || 1,
  };

  openPlanModal.value = true;
};

// SAVE
const handleSavePlan = async () => {
  try {
    loading.value.save = true;
    await useAPI(
      formPlan.value.id ? "plan/manage/update" : "plan/manage/create",
      JSON.parse(JSON.stringify(formPlan.value)),
    );
    openPlanModal.value = false;

    getList();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value.save = false;
  }
};

// DELETE
const handleDeletePlan = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa gói VIP này không?",
    );
    if (!confirmDelete) return;
    await useAPI("plan/manage/delete", { id });
    getList();
  } catch (err) {
    console.error(err);

    alert("Xóa gói VIP thất bại");
  }
};
// GET LIST
const getList = async () => {
  try {
    loading.value.load = true;

    const data = await useAPI(
      "plan/manage/list",
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
            <UIcon name="i-lucide-crown" class="size-6" />
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">
              Quản lý gói VIP
            </h1>
            <p class="mt-1 text-sm text-blue-100">
              Quản lý danh sách gói VIP của hệ thống
            </p>
          </div>
        </div>

        <UButton
          icon="i-lucide-plus"
          size="lg"
          color="neutral"
          variant="solid"
          class="rounded-xl bg-white font-semibold text-blue-600 shadow-lg shadow-black/10 hover:bg-blue-50"
          @click="openEditPlan()"
        >
          Thêm gói VIP
        </UButton>
      </div>
    </div>
    <UCard
      class="overflow-hidden rounded-[28px]"
      :ui="{
        root: 'overflow-hidden',
        body: 'p-0 sm:p-0',
        header: '!p-0',
      }"
    >
      <template #header>
        <div
          class="flex flex-col gap-4 p-4 mb-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500"
            >
              <UIcon name="i-lucide-layers-3" class="size-5" />
            </div>

            <div>
              <h3 class="font-semibold">Danh sách gói VIP</h3>

              <p class="text-sm text-muted">
                Tổng {{ page.total || 0 }} gói VIP
              </p>
            </div>
          </div>

          <UForm
            :state="page"
            class="w-full sm:w-auto"
            @submit="((page.current = 1), getList())"
          >
            <UInput
              v-model="page.search.value"
              icon="i-lucide-search"
              placeholder="Tìm kiếm gói VIP..."
              size="lg"
              class="w-full sm:w-72"
              :ui="{
                base: 'rounded-2xl',
              }"
            />
          </UForm>
        </div>
      </template>

      <!-- TABLE -->
      <UTable :data="list" :columns="columns" :loading="loading.load">
        <!-- NAME -->
        <template #name-cell="{ row }">
          <div class="flex min-w-0 items-center gap-3">
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/15"
            >
              <UIcon name="i-lucide-crown" class="size-5" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="truncate font-semibold">
                  {{ row.original.name }}
                </p>

                <UBadge
                  color="primary"
                  variant="soft"
                  class="shrink-0 rounded-full px-2"
                >
                  VIP
                </UBadge>
              </div>

              <p
                class="mt-1 max-w-md text-xs leading-5 text-muted line-clamp-2"
              >
                {{ row.original.description || "Chưa có mô tả" }}
              </p>
            </div>
          </div>
        </template>

        <!-- PRICE -->
        <template #price-cell="{ row }">
          <div>
            <p class="font-bold text-blue-500">
              ${{ useMoney().toMoney(row.original.price) }}
            </p>

            <p class="mt-0.5 text-xs text-muted">Giá gói</p>
          </div>
        </template>

        <!-- COMMISSION -->
        <template #commission-cell="{ row }">
          <div
            class="inline-flex items-center gap-2 rounded-xl bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-500"
          >
            <UIcon name="i-lucide-percent" class="size-3.5" />

            {{ row.original.commission }}%
          </div>
        </template>

        <!-- ORDER -->
        <template #maxOrders-cell="{ row }">
          <div class="flex items-center gap-2">
            <div
              class="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
            >
              <UIcon name="i-lucide-shopping-cart" class="size-4" />
            </div>

            <div>
              <p class="font-semibold">
                {{ row.original.maxOrders }}
              </p>

              <p class="text-xs text-muted">đơn/ngày</p>
            </div>
          </div>
        </template>

        <!-- CREATED -->
        <template #createdAt-cell="{ row }">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-calendar-days" class="size-4 text-muted" />

            <p class="text-sm">
              {{ useDayJs().displayFull(row.original.createdAt) }}
            </p>
          </div>
        </template>

        <!-- ACTION -->
        <template #action-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="soft"
              icon="i-lucide-pencil"
              label="Sửa"
              class="cursor-pointer rounded-xl font-medium"
              @click="openEditPlan(row.original)"
            />

            <UButton
              color="error"
              variant="soft"
              icon="i-lucide-trash-2"
              label="Xóa"
              class="cursor-pointer rounded-xl font-medium"
              @click="handleDeletePlan(row.original._id)"
            />
          </div>
        </template>
      </UTable>

      <!-- PAGINATION -->
      <div
        class="flex items-center justify-center border-t border-default/70 px-5 py-4"
      >
        <UPagination
          :page="page.current"
          @update:page="page.current = $event"
          :items-per-page="page.size"
          :total="page.total"
        />
      </div>
    </UCard>

    <!-- MODAL -->
    <UModal
      v-model:open="openPlanModal"
      :ui="{
        content: 'max-w-xl rounded-2xl overflow-hidden',
      }"
    >
      <template #content>
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- MODAL HEADER -->
          <div class="border-b border-default px-5 py-4">
            <div class="flex items-center gap-3">
              <div
                class="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm"
              >
                <UIcon name="i-lucide-crown" class="size-4" />
              </div>

              <div>
                <h2 class="text-base font-bold">
                  {{ formPlan.id ? "Cập nhật gói VIP" : "Tạo gói VIP mới" }}
                </h2>

                <p class="text-xs text-muted">
                  Thiết lập thông tin và quyền lợi gói VIP
                </p>
              </div>
            </div>
          </div>

          <!-- FORM -->
          <div class="space-y-4 p-5">
            <!-- NAME -->
            <div class="space-y-1.5">
              <label class="text-xs font-medium"> Tên gói VIP </label>

              <UInput
                v-model="formPlan.name"
                size="md"
                placeholder="Ví dụ: VIP 1, VIP Kim Cương..."
                :ui="{
                  base: 'rounded-xl',
                }"
              />
            </div>

            <!-- INFO -->
            <div class="grid grid-cols-2 gap-3">
              <!-- PRICE -->
              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Giá gói VIP </label>

                <UInput
                  v-model="formPlan.price"
                  type="number"
                  size="md"
                  placeholder="0"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                >
                  <template #leading>
                    <span class="text-xs text-muted">$</span>
                  </template>
                </UInput>
              </div>

              <!-- COMMISSION -->
              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Hoa hồng </label>

                <UInput
                  v-model="formPlan.commission"
                  type="number"
                  size="md"
                  placeholder="0"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                >
                  <template #trailing>
                    <span class="text-xs text-muted">%</span>
                  </template>
                </UInput>
              </div>

              <!-- MAX ORDERS -->
              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Đơn hàng/ngày </label>

                <UInput
                  v-model="formPlan.maxOrders"
                  type="number"
                  size="md"
                  placeholder="20"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                />
              </div>

              <!-- LEVEL -->
              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Cấp độ </label>

                <UInput
                  v-model="formPlan.level"
                  type="number"
                  size="md"
                  placeholder="1"
                  :ui="{
                    base: 'rounded-xl',
                  }"
                />
              </div>
            </div>

            <!-- DESCRIPTION -->
            <div class="space-y-1.5">
              <label class="text-xs font-medium"> Mô tả quyền lợi </label>

              <UTextarea
                v-model="formPlan.description"
                :rows="3"
                placeholder="Mô tả quyền lợi của gói VIP..."
                :ui="{
                  base: 'rounded-xl resize-none',
                }"
              />
            </div>

            <!-- PREVIEW -->
            <div
              class="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-md"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div
                    class="flex size-8 items-center justify-center rounded-lg bg-white/15"
                  >
                    <UIcon name="i-lucide-crown" class="size-4" />
                  </div>

                  <div>
                    <p
                      class="text-[10px] uppercase tracking-wider text-white/60"
                    >
                      Gói thành viên
                    </p>

                    <p class="text-sm font-bold">
                      {{ formPlan.name || "VIP Package" }}
                    </p>
                  </div>
                </div>

                <span
                  class="rounded-lg bg-white/15 px-2 py-1 text-xs font-semibold"
                >
                  Lv.{{ formPlan.level || 0 }}
                </span>
              </div>

              <div class="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p class="text-[10px] text-white/60">Giá</p>

                  <p class="mt-0.5 text-lg font-bold">
                    ${{ useMoney().toMoney(formPlan.price || 0) }}
                  </p>
                </div>

                <div>
                  <p class="text-[10px] text-white/60">Hoa hồng</p>

                  <p class="mt-0.5 text-lg font-bold">
                    {{ formPlan.commission || 0 }}%
                  </p>
                </div>

                <div>
                  <p class="text-[10px] text-white/60">Đơn/ngày</p>

                  <p class="mt-0.5 text-lg font-bold">
                    {{ formPlan.maxOrders || 0 }}
                  </p>
                </div>
              </div>

              <div
                v-if="formPlan.description"
                class="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-white/70"
              >
                {{ formPlan.description }}
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="flex justify-end gap-2 border-t border-default px-5 py-3">
            <UButton
              color="neutral"
              variant="soft"
              size="sm"
              class="rounded-xl"
              @click="openPlanModal = false"
            >
              Đóng
            </UButton>

            <UButton
              size="sm"
              class="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 px-4"
              :loading="loading.save"
              @click="handleSavePlan"
            >
              {{ formPlan.id ? "Cập nhật" : "Tạo gói VIP" }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
