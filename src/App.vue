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

  <main class="m-10">
    <div class="">
      <TapCounter />
    </div>
  </main>
</template>
    
<script setup lang="ts">
  import TapCounter from './components/TapCounter.vue';
</script>