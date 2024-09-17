<script>
import { mapState } from 'pinia'
import { keyboardStore } from '../../stores/keyboard'
export default {
  name: 'KeyboardDisplay',
  computed: {
    ...mapState(keyboardStore, ['display'])
  }
}
</script>
<template>
  <div class="display">{{ display }}</div>
</template>

<style scoped lang="scss">
.display {
  color: darkgray;
  text-align: right;
  padding: 30px 0;
  font-size: 2em;
}
</style>
