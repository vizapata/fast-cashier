<template>
  <div
    :class="{ pressing }"
    class="cashier-button"
    @click="$emit('keyup', value)"
    @mousedown="pressing = true"
  >{{ display }}</div>
</template>

<script setup>
defineProps({
  display: String,
  value: String
})
defineEmits(['keyup'])
</script>
<script>
export default {
  name: 'SimpleButton',
  data() {
    return {
      pressing: false
    }
  },
  methods: {

  }
}</script>