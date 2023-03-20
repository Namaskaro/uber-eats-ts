<template>
  <div class="h-screen w-screen grid grid-cols-12">
    <div class="col-start-1 col-end-3">
      <OwnerDashboardSidebar />
    </div>
    <div class="col-start-3 col-end-13">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import OwnerDashboardSidebar from '@/components/OwnerDashboardSidebar.vue';
</script>
