<template>
  <div
    class="bg-neutral-800 h-8 mb-5 w-full relative rounded-md overflow-hidden"
  >
    <div
      class="bg-neutral-200 rounded-md z-10 absolute h-full"
      :style="{ width: percentageOfCount(counter) + '%' }"
    ></div>
    <div
      class="bg-red-500 h-full z-0 absolute rounded-md"
      :style="{
        width: percentageOfDaysPassed(counter) + '%',
        left: 0,
      }"
    ></div>
    <div
      class="bg-green-500 h-full z-20 absolute rounded-r-md"
      :style="{
        width:
          percentageOfCount(counter) - percentageOfDaysPassed(counter) + '%',
        left: percentageOfDaysPassed(counter) + '%',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { Counter } from "@/types";

defineProps<{
  counter: Counter;
}>();

const percentageOfCount = (counter: Counter) => {
  return (counter.count / (counter.target ?? 0)) * 100;
};

const percentageOfDaysPassed = (counter: Counter) => {
  return (getDaysPassed(counter) / getDurationInDays(counter)) * 100;
};

const getDurationInDays = (counter: Counter) => {
  const startDate = new Date(counter.startDate);
  const targetDate = new Date(counter.targetDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor(
    (targetDate.getTime() - startDate.getTime()) / millisecondsPerDay
  );
};

const getDaysPassed = (counter: Counter) => {
  const currentDate = new Date();
  const startOfChallenge = new Date(counter.startDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor(
    (currentDate.getTime() - startOfChallenge.getTime()) / millisecondsPerDay
  );
  return daysPassed;
};

const getStatus = (counter: Counter) => {
  // If the counter's start date is today
  if (counter.startDate === new Date().toISOString().slice(0, 10)) {
    return {
      text: "Enjoy the Journey 🚀",
    };
  }
  if (percentageOfCount(counter) >= percentageOfDaysPassed(counter)) {
    return {
      text: "You're on Track ✓",
      class: "text-green-700",
    };
  } else {
    return {
      text: "⌁ You're Falling Behind ⌁",
      class: "text-red-800",
    };
  }
};
</script>
