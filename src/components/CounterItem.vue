<template>
  <div
    ref="counterRef"
    class="flex w-full flex-col items-center justify-between text-neutral-200 p-4 pb-14 lg:p-64 relative rounded-xl"
    :class="[isFinished(counter) ? 'bg-green-800 ' : '']"
  >
    <ButtonDelete
      @delete="$emit('delete', counter.id)"
      :isFinished="isFinished(counter)"
    />
    <h1 class="text-xl mb-5">
      {{ isFinished(counter) ? "🎉🎉🎉" : counter.title }}
    </h1>
    <p
      class="flex flex-col font-bold text-white text-8xl justify-center items-center my-10"
    >
      {{ counter.count }}
    </p>
    <ProgressBar v-if="!isFinished(counter)" :counter="counter" />
    <div class="flex flex-wrap gap-3 mt-8 text-xl font-normal text-neutral-300">
      <span
        v-if="!isFinished(counter)"
        class="bg-neutral-800 p-2 rounded-full px-4"
      >
        🎯
        <span class="font-semibold">{{ counter.target }}</span>
      </span>

      <span
        v-if="!isFinished(counter)"
        class="bg-neutral-800 p-2 rounded-full px-4"
      >
        ⛳️
        <span class="font-semibold">{{ getDaysLeft(counter) }}d</span> left
      </span>

      <span
        v-if="!isFinished(counter)"
        class="bg-neutral-800 p-2 rounded-full px-4"
      >
        <span v-html="getDelta(counter)"></span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Counter } from "@/types";
import Hammer, { DIRECTION_ALL } from "hammerjs";
import { useCounterStore } from "@/stores/counter";
import ProgressBar from "@/components/ProgressBar.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";

const props = defineProps<{
  counter: Counter;
}>();

const store = useCounterStore();
const hammerInstances = ref<HammerManager[]>([]);
const counterRef = ref(null);

const isFinished = (counter: Counter) => counter.count >= (counter.target ?? 0);

const getDaysLeft = (counter: Counter) => {
  const targetDate = new Date(counter.targetDate);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((targetDate.getTime() - Date.now()) / millisecondsPerDay);
};

const getDelta = (counter: Counter) => {
  const totalDays = getDurationInDays(counter);
  const daysPassed = getDaysPassed(counter);
  const expectedProgress = ((counter.target ?? 0) * daysPassed) / totalDays;
  const delta = counter.count - expectedProgress;

  if (Math.abs(delta) < 10) {
    return `<span class="font-semibold text-neutral-500">✅ on track</span>`;
  } else if (delta > 0) {
    return `<span class="font-semibold text-green-500">▲ ${Math.abs(Math.round(delta))}</span> above goal`;
  } else {
    return `<span class="font-semibold text-red-500">▼ ${Math.abs(Math.round(delta))}</span> behind goal`;
  }
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

onMounted(() => {
  let element = counterRef.value;
  if (element) {
    let hammertime = new Hammer(element);
    hammertime.get("swipe").set({ direction: DIRECTION_ALL });
    hammertime.get("press").set({ time: 350 });

    hammertime.on("tap", (event: any) => {
      if (event.target.closest(".delete-button")) return;
      event.preventDefault();
      store.increment(props.counter);
    });
    hammertime.on("press", (event) => {
      event.preventDefault();
      store.increment(props.counter, true);
    });
    hammertime.on("swipedown", () => store.decrement(props.counter));
    hammertime.on("swipeup", () => store.increment(props.counter));
    hammerInstances.value.push(hammertime);
  }
});

onUnmounted(() => {
  hammerInstances.value.forEach((instance: any) => instance.destroy());
  hammerInstances.value = [];
});
</script>
