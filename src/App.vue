<script setup>
import { RouterView } from "vue-router";
import AppTopBar from "./components/AppTopBar.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div>
    <AppTopBar />
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss">
@import "primevue/resources/themes/md-dark-deeppurple/theme.css";
@import "primevue/resources/primevue.min.css";
@import "primeicons/primeicons.css";
</style>
