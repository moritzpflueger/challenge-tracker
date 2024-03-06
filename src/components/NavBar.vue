<template>
  <header class="flex justify-between items-center p-5">
    <router-link 
      to="/new-counter"
      class="bg-pink-500 text-white w-10 h-10 font-semibold rounded-full relative after:absolute after:content-['+'] after:text-xl after:flex after:w-10 after:h-10 after:items-center after:justify-center"
    ></router-link>
    <router-link 
      to="/"
      class="text-5xl"
    >
      💪
    </router-link>
  </header>
</template>

<script setup lang="ts">

</script>