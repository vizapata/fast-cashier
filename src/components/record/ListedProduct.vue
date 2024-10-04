<template>
  <div class="listed-product">
    <CategoryItem size="small" :category="product.category" :icon-only="false" />
    <span class="current-input">{{ formattedDisplay }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ListedProduct } from '@/domain/listed-product';
import CategoryItem from '../categories/CategoryItem.vue';
import { formatCurrency } from '@/utils/currency';
import { computed, type Ref } from 'vue';


const props = defineProps<{ product: ListedProduct }>()
const formattedDisplay: Ref<string> = computed(() => formatCurrency(props.product.value))
</script>

<style lang="scss" scoped>
.listed-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;

  .current-input {
    justify-self: flex-end;
    align-self: center;
  }
}
</style>
