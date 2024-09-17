<template>
  <div class="category-display-item" @click="dispatchKeyEvent">
    <img :src="`/img/${category.icon}`" :alt="category.name" />
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import { KEY_TYPES } from '../../domain/config'
import { keyboardStore } from '../../stores/keyboard'
export default {
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  mounted() {
    if (this.hasShortcut) this.registerKey(this.category.shortcut, this.key)
  },
  beforeUnmount() {
    if (this.hasShortcut) this.unRegisterKey(this.category.shortcut)
  },
  computed: {
    hasShortcut: function () {
      return this.category && this.category.shortcut
    },
    key: function () {
      return {
        name: this.category.name,
        value: this.category.id,
        display: this.category.icon,
        type: KEY_TYPES.CATEGORY
      }
    }
  },
  methods: {
    ...mapActions(keyboardStore, ['emitKey', 'registerKey', 'unRegisterKey']),
    dispatchKeyEvent: function () {
      if (this.hasShortcut) this.emitKey(this.category.shortcut)
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  max-width: 150px;

  &:hover {
    filter: sepia(0.5);
  }
}
</style>
