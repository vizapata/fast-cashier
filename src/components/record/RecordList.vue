<template>
  <div class="listed-products-list">
    <ListedProduct v-for="(product, index) in cartStore.products.slice().reverse()" :key="index" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import ListedProduct from './ListedProduct.vue';

const cartStore = useCartStore()

</script>

<style lang="scss" scoped>
.listed-products-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
