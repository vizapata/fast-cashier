<template>
  <div class="display">{{ keyboardStore.display }}</div>
</template>

<script setup lang="ts">
import { useKeyboardStore } from '@/stores/keyboard'

const keyboardStore = useKeyboardStore()
</script>

<style scoped lang="scss">
.display {
  color: darkgray;
  text-align: right;
  padding: 30px 0;
  font-size: 2em;
}
</style>
