<template>
  <div
    v-if="counters.length === 0"
    class="text-xl text-neutral-600 flex flex-col items-center justify-center h-full p-20 pb-40 text-center"
  >
    <img 
      src="/android-chrome-192x192.png" 
      class="grayscale w-20 h-20 mb-10"
    />
    Add your first Counter to get started!
  </div>

  <swiper-container
    v-if="counters.length > 0"
    @swiper="console.log('swiper')"
    ref="swiperRef" 
    class="h-full"
    :effect="'coverflow'" 
    :pagination="true"
  >
    <swiper-slide
      v-for="counter in sortedCounters" 
      :key="counter.id" 
      class="flex p-5"
    >
    <CounterItem 
      v-if="counter"
      @delete="deleteCounter"
      :key="counter.id" 
      :counter="counter" 
    /> 
    </swiper-slide>
  </swiper-container>
  
</template>

<script setup lang="ts">
  import { ref, computed, nextTick } from 'vue';
  import { useCounterStore } from '@/stores/counter';
  import { register as registerSwiper } from 'swiper/element/bundle';
  import CounterItem from '@/components/CounterItem.vue';
  import type { Counter } from '@/types';

  registerSwiper();

  defineProps<{
    title?: string;
  }>();

  const store = useCounterStore();
  const counters = ref<Counter[]>(store.counters);
  
  const sortedCounters = computed(() => {
    return [...counters.value].sort((a: any, b: any) => b.id - a.id);
  });
  
  const deleteCounter = async (id: string) => {
    const wantsToDelete = confirm('Are you sure you want to delete this counter?');
    if (wantsToDelete) {
      store.deleteCounter(id);
      counters.value = store.counters;
      await nextTick();
      const swiperEl = document.querySelector('swiper-container');
      swiperEl?.swiper.update();
    }
  };
</script>