<template>
  <NavBar />
  <main class="p-5">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>