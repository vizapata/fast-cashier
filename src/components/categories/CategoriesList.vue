<template>
  <div class="categories-list">
    <CategoryItem
      v-for="category in DEFAULT_CATEGORIES"
      :key="category.id"
      :category="category"
      icon-only
    />
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CATEGORIES } from '@/domain/config'
import CategoryItem from '@/components/categories/CategoryItem.vue'
</script>

<style lang="scss" scoped>
.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 20px;
}
</style>
