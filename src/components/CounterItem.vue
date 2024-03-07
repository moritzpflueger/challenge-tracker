<template>
  <div 
    ref="counterRef"
    class="flex w-full flex-col items-center justify-center text-neutral-200 p-10 relative rounded-xl"
    :class="[isFinished(counter) ? 'bg-green-800 ': 'bg-neutral-900']"
  >
    <ButtonDelete 
      @delete="$emit('delete', counter.id)"
      :isFinished="isFinished(counter)"
    />
    <h1 class="text-xl mb-5">
      {{ isFinished(counter) ? '🎉🎉🎉' : counter.title }}
    </h1>
    <p class="flex flex-col font-bold text-white text-8xl justify-center items-center my-10">
      {{ counter.count }}
      <span 
        v-if="!isFinished(counter)"
        class="text-2xl font-normal text-neutral-500"
      >
        {{ counter.target }}
      </span>
    </p>
    <ProgressBar 
      v-if="!isFinished(counter)"
      :counter="counter" 
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import type { Counter } from '@/types';
  import Hammer, { DIRECTION_ALL } from 'hammerjs';
  import { useCounterStore } from '@/stores/counter';
  import ProgressBar from '@/components/ProgressBar.vue';
  import ButtonDelete from '@/components/ButtonDelete.vue';

  const props = defineProps<{
    counter: Counter;
  }>();

  const store = useCounterStore();
  const hammerInstances = ref<HammerManager[]>([]);
  const counterRef = ref(null)

  const isFinished = (counter: Counter) => counter.count >= counter.target;

  onMounted(() => {
    let element = counterRef.value;
    if (element) {
      let hammertime = new Hammer(element);
      hammertime.get('swipe').set({ direction: DIRECTION_ALL });

      hammertime.on('tap', (event: any) => {
        if (event.target.closest('.delete-button')) return
        store.increment(props.counter)
      });
      hammertime.on('press', () => store.increment(props.counter, true));
      hammertime.on('swipedown', () => store.decrement(props.counter));
      hammertime.on('swipeup', () => store.increment(props.counter));
      hammerInstances.value.push(hammertime);
    }
  });

  onUnmounted(() => {
    hammerInstances.value.forEach((instance: any) => instance.destroy());
    hammerInstances.value = [];
  });
</script>
