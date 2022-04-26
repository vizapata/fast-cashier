<template>
  <div class="categories-list">
    <Category v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>
<script>
import { DEFAULT_CATEGORIES } from '../../config'
import Category from './Category.vue'
export default {
  components: { Category },
  data: function () {
    return {
      categories: DEFAULT_CATEGORIES
    }
  },
}
</script>
<style lang="scss" scoped>
.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 20px;
}
</style>
