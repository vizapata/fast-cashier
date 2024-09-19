<template>
  <div class="keyboard">
    <div class="actions">
      <KeyboardButton
        v-for="key in actions"
        :key="key.name"
        :class="`p-button-outlined p-button-secondary ${key.name}`"
        :label="key.display"
        :button="key"
        @click="keyboardStore.keyPressed(key)"
      />
    </div>
    <div class="numbers">
      <KeyboardButton
        v-for="key in keys"
        :key="key.name"
        :class="`p-button-outlined p-button-secondary ${key.name}`"
        :label="key.display"
        :button="key"
        @click="keyboardStore.keyPressed(key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ALLOWED_ACTIONS, KEY_TYPES } from '@/domain/config'
import { useKeyboardStore } from '@/stores/keyboard'
import KeyboardButton from '@/components/keyboard/KeyboardButton.vue'
import { onBeforeMount, onMounted } from 'vue'
import type { KeyMetadata } from '@/domain/key-metadata'

const keyboardStore = useKeyboardStore()

const actions: Array<KeyMetadata> = [
  {
    name: 'key-clear',
    value: ALLOWED_ACTIONS.DELETE,
    display: 'C',
    type: KEY_TYPES.ACTION
  },
  {
    name: 'key-return',
    value: ALLOWED_ACTIONS.BACKSPACE,
    display: '<-',
    type: KEY_TYPES.ACTION
  },
  {
    name: 'key-equals',
    value: ALLOWED_ACTIONS.ENTER,
    display: '=',
    type: KEY_TYPES.ACTION
  }
]
const keys: Array<KeyMetadata> = [
  { name: 'key-1', value: '1', display: '1', type: KEY_TYPES.DIGIT },
  { name: 'key-2', value: '2', display: '2', type: KEY_TYPES.DIGIT },
  { name: 'key-3', value: '3', display: '3', type: KEY_TYPES.DIGIT },
  { name: 'key-4', value: '4', display: '4', type: KEY_TYPES.DIGIT },
  { name: 'key-5', value: '5', display: '5', type: KEY_TYPES.DIGIT },
  { name: 'key-6', value: '6', display: '6', type: KEY_TYPES.DIGIT },
  { name: 'key-7', value: '7', display: '7', type: KEY_TYPES.DIGIT },
  { name: 'key-8', value: '8', display: '8', type: KEY_TYPES.DIGIT },
  { name: 'key-9', value: '9', display: '9', type: KEY_TYPES.DIGIT },
  { name: 'key-0', value: '0', display: '0', type: KEY_TYPES.DIGIT },
  {
    name: 'key-00',
    value: ALLOWED_ACTIONS.HUNDRED,
    display: ALLOWED_ACTIONS.HUNDRED,
    type: KEY_TYPES.ACTION
  },
  {
    name: 'key-000',
    value: ALLOWED_ACTIONS.THOUSAND,
    display: ALLOWED_ACTIONS.THOUSAND,
    type: KEY_TYPES.ACTION
  },
  {
    name: 'key-multiply',
    value: '*',
    display: '*',
    type: KEY_TYPES.OPERATION
  },
  {
    name: 'key-plus',
    value: '+',
    display: '+',
    type: KEY_TYPES.OPERATION
  }
]

onMounted(() => {
  ;[...actions, ...keys].forEach((key) => keyboardStore.registerKey(key.value, key))
})
onBeforeMount(() => {
  ;[...actions, ...keys].forEach((key) => keyboardStore.unRegisterKey(key.value))
})
</script>

<style scoped lang="scss">
.display {
  color: darkgray;
  text-align: right;
  padding: 30px 0;
  font-size: 2em;
}

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .key {
    padding: 10px;
    text-align: center;
    border: solid 1px darkgray;
    border-radius: 3px;
    display: block;
    cursor: pointer;
    font-size: large;
    color: darkgray;
    background-color: #000;
    font-weight: bolder;

    &:hover {
      color: darkgray;
    }
  }

  .numbers {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);

    .key-7,
    .key-8,
    .key-9,
    .key-multiply {
      grid-row-start: 1;
    }

    .key-4,
    .key-5,
    .key-6,
    .key-divide {
      grid-row-start: 2;
    }

    .key-1,
    .key-2,
    .key-3,
    .key-plus {
      grid-row-start: 3;
    }

    .key-0,
    .key-00,
    .key-000,
    .key-minus {
      grid-row-start: 4;
    }

    .key-multiply,
    .key-plus {
      grid-row-end: span 2;
    }
  }

  .actions {
    @extend .numbers;
    grid-template-rows: 1fr;
  }
}
</style>
