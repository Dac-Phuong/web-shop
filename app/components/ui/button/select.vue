<template>
  <UiFlex 
    justify="center" class="relative inline-flex">
    <UiFlex justify="center z-[1] cursor-pointer rounded-xl btn-payment"
      :class="active ? 'btn-payment--Active' : ''">
      <slot></slot>
    </UiFlex>
  </UiFlex>
</template>

<script setup>
const props = defineProps({
  active: { type: Boolean, default: false }
})
</script>