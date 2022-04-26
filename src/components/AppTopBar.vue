<script setup>
import Toolbar from 'primevue/toolbar';
import Image from 'primevue/image';
</script>

<template>
  <Toolbar>
    <template #start>
      <Image class="app-logo" src="/img/cashier.png" alt="Fast cashier" />
      <span class="app-title">Fast cashier App</span>
    </template>
  </Toolbar>
</template>
<style lang="scss">
.app-logo {
  margin-right: 10px;
  max-height: 50px;
  img {
    max-height: 50px;
  }
}
.app-title {
  color: #fff;
}
</style>