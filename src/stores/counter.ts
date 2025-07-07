import { ref } from "vue";
import { defineStore } from "pinia";
import type { Counter } from "@/types";

export const useCounterStore = defineStore("counter", () => {
  const counters = ref([] as Counter[]);
  try {
    counters.value = JSON.parse(localStorage.getItem("counters") || "[]");
  } catch (error) {
    console.error("Error parsing counters from localStorage:", error);
    counters.value = []; // Default to an empty array if parsing fails
  }

  const increment = (counter: Counter, customStep = false) => {
    if (!counter.target) counter.target = 0;
    if (counter.count >= counter.target) return;
    customStep ? (counter.count += 5) : counter.count++;
    persistToLocalStorage();
  };

  const decrement = (counter: Counter, customStep = false) => {
    if (counter.count <= 0) return;
    customStep ? (counter.count -= 5) : counter.count--;
    persistToLocalStorage();
  };

  const updateCount = (counter: Counter, newCount: number) => {
    counter.count = newCount;
    persistToLocalStorage();
  };

  const addCounter = (counter: Counter) => {
    counters.value.push(counter);
    persistToLocalStorage();
  };

  const deleteCounter = (id: string) => {
    counters.value = counters.value.filter((counter) => counter.id !== id);
    persistToLocalStorage();
  };

  const persistToLocalStorage = () => {
    localStorage.setItem("counters", JSON.stringify(counters.value));
  };

  return {
    counters,
    increment,
    decrement,
    updateCount,
    addCounter,
    deleteCounter,
  };
});
