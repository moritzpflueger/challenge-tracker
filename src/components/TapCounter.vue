<template>
  <div class="flex flex-col">
    <label>
      Title:
      <input v-model="newCounter.title" type="text" placeholder="New Counter" />
    </label>
    <label>Target:
      <input v-model="newCounter.target" type="number" />
    </label>
    <label>
      Target Date:
      <input v-model="newCounter.targetDate" type="date" />
    </label>
    <label>
      Start Date:
      <input v-model="newCounter.startDate" type="date" />
    </label>
    <button className="bg-pink-300 p-2 rounded-md m-1" @click="addCounter">add counter</button>    
  </div>
  <div 
    v-for="counter in sortedCounters" 
    :key="counter.id" 
    class="flex flex-col bg-neutral-100 my-5 p-10"
    :class="{ 'bg-green-500 text-white': isFinished(counter) }"
  >
    <h1 class="text-xl mb-5">
      {{ counter.title }}
    </h1>
    <p className="flex text-3xl justify-center">
      <span className="font-bold mr-2">{{ counter.count }}</span>
      of {{ counter.target }}
    </p>
    <div class="bg-neutral-300 h-2 mb-5">
      <div class="bg-green-500 h-full" :style="{ width: percentageOfCount(counter) + '%' }"></div>
    </div>
    <p>{{ getDaysPassed(counter) }} of {{ getDurationInDays(counter)}} days passed</p>
    <div class="bg-neutral-300 h-2">
      <div class="bg-green-500 h-full" :style="{ width: percentageOfDaysPassed(counter) + '%' }"></div>
    </div>
    <button className="bg-teal-300 p-2 rounded-md mt-5" @click="increment(counter)">increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/counter';

defineProps<{
  title?: string;
}>();

const store = useCounterStore();
const counters = computed(() => store.counters);

const getDefaultNewCounterValues = () => ({
  id: '', // Since ID is now generated in addCounter, this can be initially empty or removed
  title: '',
  count: 0,
  target: 0,
  targetDate: new Date().toISOString().slice(0, 10),
  startDate: new Date().toISOString().slice(0, 10),
  finishingDate: null,
});

console.log(getDefaultNewCounterValues());

const newCounter = ref(getDefaultNewCounterValues());

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

const isFinished = (counter: any) => counter.count >= counter.target;

const addCounter = () => {
  const uniqueId = Date.now().toString();
  store.addCounter({
    id: uniqueId,
    title: newCounter.value.title,
    count: newCounter.value.count,
    target: newCounter.value.target,
    targetDate: newCounter.value.targetDate,
    startDate: newCounter.value.startDate,
    finishingDate: isFinished(newCounter.value) ? new Date().toISOString() : null,
  });
  
  // Reset newCounter to its default values
  newCounter.value = getDefaultNewCounterValues();  
};

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