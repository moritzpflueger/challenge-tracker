import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import * as VueRouter from "vue-router";
import App from "./App.vue";
import NewCounter from "./components/NewCounter.vue";
import CounterList from "./components/CounterList.vue";

const routes: VueRouter.RouteRecordRaw[] = [
  { path: "/", component: CounterList },
  { path: "/new-counter", component: NewCounter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");