<template>
  <NavBar />
  <main class="flex-1">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>