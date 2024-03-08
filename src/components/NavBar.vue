<template>
  <header class="flex justify-between items-center p-5 pb-0">
    <router-link 
      to="/new-counter"
      class="bg-neutral-800 text-neutral-400 w-12 h-12 font-semibold rounded-xl flex justify-center items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </router-link>
    <router-link 
      to="/"
      class="text-4xl w-12 h-12 flex justify-center items-center text-neutral-400"
    >
      <img src="/android-chrome-192x192.png" class="w-10 h-10" />
    </router-link>
  </header>
</template>

<script setup lang="ts">

</script>