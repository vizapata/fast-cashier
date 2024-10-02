<template>
  <div class="category-display-item" @click="dispatchKeyEvent">
    <img :src="`/img/${category.icon}`" :alt="category.name" />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/domain/category'
import { KEY_TYPES } from '@/domain/config'
import { useKeyboardStore } from '@/stores/keyboard'
import { computed, onBeforeMount, onMounted, type Ref } from 'vue'
import type { KeyMetadata } from '@/domain/key-metadata'

const props = defineProps<{ category: Category }>()

const keyboardStore = useKeyboardStore()
const hasShortcut: Ref<boolean> = computed(() =>
  props.category && props.category.shortcut ? true : false
)
const key: Ref<KeyMetadata> = computed(() => ({
  name: props.category.name,
  value: props.category.id,
  display: props.category.icon,
  type: KEY_TYPES.CATEGORY
}))

const dispatchKeyEvent = () => {
  if (hasShortcut.value) keyboardStore.emitKey(props.category.shortcut)
}

onMounted(() => {
  if (hasShortcut.value) {
    keyboardStore.registerKey(props.category.shortcut, key.value)
  }
})

onBeforeMount(() => {
  if (hasShortcut.value) {
    keyboardStore.unRegisterKey(props.category.shortcut)
  }
})
</script>

<style lang="scss" scoped>
.category-display-item {
  display: flex;
  justify-content: center;
  cursor: pointer;

  img {
    max-width: 150px;
    width: 100%;

    &:hover {
      filter: sepia(0.3);
    }
  }
}
</style>
