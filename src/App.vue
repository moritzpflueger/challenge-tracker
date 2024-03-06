
<template>
  <header>
    <img
      alt="App logo"
      class="mx-auto my-4"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <div class="bg-red-500 text-3xl">
      <TapCounter title="1000 Pushups in 2024" />
    </div>
  </main>
</template>
    
<script setup lang="ts">
  import TapCounter from './components/TapCounter.vue';
</script>