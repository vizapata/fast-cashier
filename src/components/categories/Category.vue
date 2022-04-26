<template>
  <div class="category-display-item" @click="keyPressed(key)">
    <img :src="`/img/${category.icon}`" :alt="category.name" />
  </div>
</template>
<script>
import { mapActions } from 'pinia'
import { KEY_TYPES } from '../../config'
import { keyboardStore } from '../../stores/keyboard'
export default {
  props: {
    category: {
      type: Object,
      default: () => { },
      required: true
    }
  },
  computed: {
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
    ...mapActions(keyboardStore, ['keyPressed']),
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