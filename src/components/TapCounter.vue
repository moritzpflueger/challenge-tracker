<template>
  <div
    v-if="counters.length === 0"
    class="text-2xl flex items-center justify-center h-96"
  >
    Add a Counter to get started
  </div>
  <button 
    v-for="counter in sortedCounters" 
    :key="counter.id" 
    @click="increment(counter)"
    class="flex w-full flex-col items-center bg-neutral-900 text-neutral-200 my-5 p-10 relative"
    :class="{ 'bg-green-500 text-white': isFinished(counter) }"
  >
    <button className="absolute right-0 top-0 p-5 rounded-md text-2xl" @click="deleteCounter(counter.id)">x</button>
    <h1 class="text-xl mb-5">
      {{ counter.title }}
    </h1>
    <p className="flex flex-col text-2xl text-neutral-500 justify-center items-center my-20">
      <span className="font-bold text-white text-8xl mr-2">
        {{ counter.count }}
      </span>
      of {{ counter.target }}
    </p>
    <div class="bg-neutral-800 h-2 mb-5 w-full">
      <div class="bg-green-500 h-full" :style="{ width: percentageOfCount(counter) + '%' }"></div>
    </div>
    <p class="self-start">{{ getDaysPassed(counter) }} of {{ getDurationInDays(counter)}} days passed</p>
    <div class="bg-neutral-800 h-2 w-full">
      <div class="bg-green-500 h-full" :style="{ width: percentageOfDaysPassed(counter) + '%' }"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCounterStore } from '@/stores/counter';

defineProps<{
  title?: string;
}>();

const store = useCounterStore();
const counters = computed(() => store.counters);

const sortedCounters = computed(() => {
  return [...counters.value].sort((a: any, b: any) => b.id - a.id);
});

const percentageOfCount = (counter: any) => {
  return (counter.count / counter.target) * 100;
};

const percentageOfDaysPassed = (counter: any) => {
  return (getDaysPassed(counter) / getDurationInDays(counter)) * 100;
};

const increment = (counter: any) => {
  store.increment(counter);
};

const deleteCounter = (id: string) => {
  store.deleteCounter(id);
};

const isFinished = (counter: any) => counter.count >= counter.target;

const getDurationInDays = (counter: any) => {
  const startDate = new Date(counter.startDate);
  const targetDate = new Date(counter.targetDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((targetDate.getTime() - startDate.getTime()) / millisecondsPerDay);
}

const getDaysPassed = (counter: any) => {
  const currentDate = new Date();
  const startOfChallenge = new Date(counter.startDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor((currentDate.getTime() - startOfChallenge.getTime()) / millisecondsPerDay);
  return daysPassed;
};
</script>