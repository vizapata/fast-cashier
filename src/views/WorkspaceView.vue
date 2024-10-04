<template>
  <main>
    <div class="workspace">
      <div class="categories-component">
        <CategoriesList />
      </div>
      <div class="keyboard-component">
        <KeyboardDisplay />
        <MainKeyboard />
      </div>
      <div class="record-list-component">
        <CurrentRecord />
        <RecordList />
      </div>
      <div class="total-info-component">
        <div>Total: </div>
        <div class="current-input">{{ formattedTotal }}</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CategoriesList from '@/components/categories/CategoriesList.vue'
import MainKeyboard from '@/components/keyboard/MainKeyboard.vue'
import RecordList from '@/components/record/RecordList.vue'
import KeyboardDisplay from '@/components/keyboard/KeyboardDisplay.vue'
import { useKeyboardStore } from '@/stores/keyboard'
import { onMounted, onBeforeUnmount, type Ref, computed } from 'vue'
import CurrentRecord from '@/components/record/CurrentRecord.vue'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/utils/currency'

const keyboardStore = useKeyboardStore()
const cartStore = useCartStore()
const formattedTotal: Ref<string> = computed(() => formatCurrency(cartStore.total))

const dispatchKeyEvent = (event: KeyboardEvent) => {
  keyboardStore.emitKey(event.key)
}

onMounted(() => {
  window.addEventListener('keyup', dispatchKeyEvent)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', dispatchKeyEvent)
})
</script>

<style lang="scss">
.workspace {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  >div {
    padding: 10px;
    border: solid red 1px;
  }

  .record-list-component {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

@media all and (min-width: 800px) {
  .workspace {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    .categories-component,
    .keyboard-component {
      grid-row: 1 / span 2;
    }

    .keyboard-component {
      grid-column-start: 3;
    }

    >div {
      padding: 10px;
      border: solid red 1px;
    }

    .total-info-component {
      display: grid;
      grid-template-columns: 100px 1fr;
      font-weight: bold;
      font-size: 1.5em;

      .current-input {
        justify-self: flex-end;
        justify-self: flex-end;
      }
    }
  }
}
</style>
