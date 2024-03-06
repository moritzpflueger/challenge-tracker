<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

defineProps<{
  title: string;
}>();

const count = ref(0);
const goal = ref(1000); // Set your goal here
const daysInAYear = 365;

// Retrieve count value from localStorage on component mount
onMounted(() => {
  const storedCount = localStorage.getItem('count');
  if (storedCount) {
    count.value = parseInt(storedCount);
  }
});

// Update count value in localStorage whenever it changes
watch(count, (newValue: number) => {
  localStorage.setItem('count', newValue.toString());
});

// Calculate the percentage of count reached compared to the goal
const percentage = computed(() => {
  return Math.round((count.value / goal.value) * 100);
});

const percentageOfYear = computed(() => {
  return Math.round((daysPassed.value / daysInAYear) * 100);
});

const daysPassed = computed(() => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor((currentDate.getTime() - startOfYear.getTime()) / millisecondsPerDay);
  return daysPassed;
});
</script>

<template>
  <div class="">
    <h1 class="">
      {{ title }}
    </h1>
    <p>{{ count }}</p>
    <p>Percentage: {{ percentage }}% of goal is reached</p>
    <p>Percentage of year: {{ percentageOfYear }}%</p>
    <button @click="count++">
      Tap me!
    </button>

  </div>
</template>