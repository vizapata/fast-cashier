<template>
  <div :class="`category-display-item ${iconOnly ? '' : 'with-text'}`" @click="dispatchKeyEvent">
    <img :src="`/img/${category.icon}`" :class="`${size}`" :alt="category.name" />
    <div v-if="!iconOnly" class="category-display-label">
      {{ category.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/domain/category'
import { KEY_TYPES } from '@/domain/config'
import { useKeyboardStore } from '@/stores/keyboard'
import { computed, onBeforeMount, onMounted, type Ref } from 'vue'
import type { KeyMetadata } from '@/domain/key-metadata'

const props = defineProps<{ category: Category; iconOnly: boolean, size?: string }>()

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

  &.with-text {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    gap: 10px
  }

  img {
    max-width: 150px;
    width: 100%;

    &.small {
      max-width: 30px;
    }

    &:hover {
      filter: sepia(0.3);
    }
  }

}
</style>
