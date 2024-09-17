<script setup>
import Image from 'primevue/image'
</script>
<template>
  <div class="layout-footer">
    <Image class="app-logo" src="/img/cashier.png" alt="Fast cashier" height="20" />by
    <span class="font-medium ml-2">Victor Zapata</span>
  </div>
</template>
<style scoped>
.layout-footer {
  position: fixed;
  bottom: 0;
  font-size: 0.9rem;
}
</style>
