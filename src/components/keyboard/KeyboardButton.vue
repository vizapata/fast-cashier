<template>
  <div class="keyboard-button">
    <span>{{ button.display }}</span>
  </div>
</template>

<script setup lang="ts">
import type { KeyMetadata } from '@/domain/key-metadata'

defineProps<{ button: KeyMetadata }>()
</script>

<style scoped lang="scss">
.keyboard-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  font-size: 1.5rem;
  border: solid 1px #333333aa;
  border-radius: 5px;
  background: #abc;
  user-select: none;

  &:hover {
    background: rgb(128, 170, 211);
    border: solid 1px #35343aaa;
  }
}
</style>
