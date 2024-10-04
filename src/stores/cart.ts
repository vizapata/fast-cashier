import type { ListedProduct } from '@/domain/listed-product'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('useCartStore', {
  state: () => ({
    products: [] as Array<ListedProduct>
  }),
  getters: {
    total: (state) => state.products.map((p) => p.value).reduce((a, b) => a + b, 0)
  },
  actions: {
    addProduct(product: ListedProduct) {
      this.products.push(product)
    }
  }
})
