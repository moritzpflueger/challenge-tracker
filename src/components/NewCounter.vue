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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';

const store = useCounterStore();
const router = useRouter();

const getDefaultNewCounterValues = () => ({
  id: '', // Since ID is now generated in addCounter, this can be initially empty or removed
  title: '',
  count: 0,
  target: 0,
  targetDate: new Date().toISOString().slice(0, 10),
  startDate: new Date().toISOString().slice(0, 10),
  finishingDate: null,
});

const newCounter = ref(getDefaultNewCounterValues());

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
  router.push('/');
};

</script>