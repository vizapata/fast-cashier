<template>
  <div class="current-record">
    <img :src="`/img/${keyboardStore.category.display}`" :alt="keyboardStore.category.name" />
    <span class="current-input">{{ formattedDisplay }}</span>
  </div>
</template>

<script setup lang="ts">
import { useKeyboardStore } from '@/stores/keyboard'
import { computed, type Ref } from 'vue'

const keyboardStore = useKeyboardStore()
const formattedDisplay: Ref<string> = computed(() => {
  const n = keyboardStore.current.toLocaleString('es-CO')
  return `$ ${n}`
})
</script>

<style lang="scss" scoped>
.current-record {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;

  .current-input {
    justify-self: flex-end;
    align-self: center;
    font-size: 2em;
  }
}

img {
  max-width: 50px;
}
</style>
