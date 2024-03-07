<template>
  <div class="h-full flex justify-center items-center text-neutral-400">
    <form class="flex flex-col gap-3 w-full max-w-2xl mx-10">
      <label for="title">
        Title
      </label>
      <input 
        id="title" 
        v-model="newCounter.title" 
        type="text" 
        placeholder="New Counter"
        class="bg-neutral-800 p-2 rounded-md"
      />
      <label for="target">Target</label>
      <input id="target" v-model="newCounter.target" type="number" class="bg-neutral-800 p-2 rounded-md"/>
      <label for="targetDate">Target Date</label>
      <input id="targetDate" v-model="newCounter.targetDate" type="date" class="bg-neutral-800 p-2 rounded-md" />
      <label>
        Start Date
      </label>
      <input v-model="newCounter.startDate" type="date" class="bg-neutral-800 p-2 rounded-md"/>
      <button class="bg-neutral-200 text-neutral-900 font-semibold p-2 rounded-md mt-10 relative" @click="addCounter">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 absolute left-3 top-0 bottom-0 m-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>        
        Create Counter
      </button>          
    </form>
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
  targetDate: '',
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