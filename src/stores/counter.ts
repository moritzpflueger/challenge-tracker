import { ref } from "vue";
import { defineStore } from "pinia";

export interface Counter {
  id: string,
  title: string,
  count: number,
  target: number,
  targetDate: string,
  startDate: string,
  finishingDate: string | null,
}

export const useCounterStore = defineStore('counter', () => {
  const counters = ref([] as Counter[])
  try {
    counters.value = JSON.parse(localStorage.getItem('counters') || '[]')
  } catch (error) {
    console.error('Error parsing counters from localStorage:', error);
    counters.value = []; // Default to an empty array if parsing fails    
  }
  
  console.log('counters', counters.value)
  
  const increment = (counter: Counter) => {
    if (counter.count >= counter.target) return
    counter.count++
    persistToLocalStorage()
  }
  
  const updateCount = (counter: Counter, newCount: number) => {
    counter.count = newCount
    persistToLocalStorage()
  }

  const addCounter = (counter: Counter) => {
    counters.value.push(counter)
    persistToLocalStorage()
  }

  const persistToLocalStorage = () => {
    localStorage.setItem('counters', JSON.stringify(counters.value))
  }

  return { counters, increment, updateCount, addCounter }
})