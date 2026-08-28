<template>
  <UiFlex>
    <USelectMenu
      v-model="userSelect"
      v-model:search-term="searchKeyword"
      :items="users"
      :multiple="props.multiple"
      by="_id"
      label-key="label"
      :loading="loading"
      size="lg"
      class="grow w-full border-none "
      placeholder="Tìm kiếm tài khoản"
    >
      <template #label>
        <div v-if="props.multiple">
          <span v-if="userSelect?.length" class="truncate">
            {{ userSelect.map((i) => i.username).join(", ") }}
          </span>

          <span v-else> Tìm kiếm tài khoản </span>
        </div>

        <div v-else-if="userSelect" class="flex items-center gap-2">
          <UAvatar
            :src="userSelect.avatar"
            :alt="userSelect.username"
            size="xs"
          />
          <span class="text-muted"> ({{ userSelect.phone }}) </span>
        </div>

        <span v-else> Tìm kiếm tài khoản </span>
      </template>

      <template #item="{ item }">
        <div class="flex w-full items-center gap-3">
          <UAvatar :src="item.avatar" :alt="item.username" size="md" />

          <div class="min-w-0 flex-1">
            <div class="truncate font-medium">
              {{ item.username }}
            </div>

            <div class="text-xs text-muted">
              {{ item.phone }}
            </div>
          </div>

          <UBadge color="primary" variant="soft">
            VIP {{ item.level || 0 }}
          </UBadge>
        </div>
      </template>
    </USelectMenu>

    <UButton
      v-if="
        (!props.multiple && userSelect) ||
        (props.multiple && userSelect?.length)
      "
      icon="i-bx-x"
      color="neutral"
      size="lg"
      class="ml-1"
      @click="reset"
    />
  </UiFlex>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Array],
  userData: Object,
  multiple: Boolean,
});

const emit = defineEmits(["update:modelValue", "update:userData"]);

const loading = ref(false);
const users = ref([]);
const searchKeyword = ref("");
const userSelect = ref(props.multiple ? [] : null);

let searchTimeout = null;

// load mặc định
const getUsers = async (key = "") => {
  try {
    loading.value = true;
    const result = await useAPI("user/public/search", {key});

    users.value = result.map((user) => ({
      _id: user._id,
      username: user.username,
      phone: user.phone,
      avatar: user.avatar,
      level: user.level,
      label: `${user.phone} (VIP ${user.level})`,
    }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// debounce search
watch(searchKeyword, (value) => {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    getUsers(value);
  }, 500);
});

// emit value
watch(
  userSelect,
  (val) => {
    if (props.multiple) {
      emit(
        "update:modelValue",
        (val || []).map((i) => i._id),
      );
      emit("update:userData", val || []);
      return;
    }

    emit("update:modelValue", val?._id || null);
    emit("update:userData", val || null);
  },
  {
    deep: true,
  },
);

// reset
const reset = () => {
  userSelect.value = props.multiple ? [] : null;
};

// load lần đầu
onMounted(() => {
  getUsers();
});
</script>
