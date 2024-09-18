<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTopBar from '@/components/AppTopBar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div id="fc-app-container">
    <AppTopBar />
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
      <AppFooter />
    </div>
  </div>
</template>
