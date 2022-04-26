<template>
  <div class="current-record">
    <img :src="`/img/${category.display}`" :alt="category.name" />
    <span class="current-input">{{ formattedDisplay }}</span>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { keyboardStore } from '../../stores/keyboard'
export default {
  computed: {
    ...mapState(keyboardStore, ['current', 'category']),
    formattedDisplay: function(){
      return `$ 0`
    }
  }
}
</script>

<style lang="scss" scoped>
.current-record {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;

  .current-input {
    justify-self: flex-end;
    align-self: center;
    font-size: 2em;
  }
}


img {
  max-width: 50px;
}
</style>