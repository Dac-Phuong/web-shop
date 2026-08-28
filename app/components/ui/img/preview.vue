<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  src: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const open = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <UModal v-model:open="open">
    <template #content>
      <div class="flex items-center justify-center">
        <img
          :src="src"
          class="w-full object-contain"
        />
      </div>
    </template>
  </UModal>
</template>
