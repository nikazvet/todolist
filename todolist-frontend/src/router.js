import { createWebHistory, createRouter } from "vue-router";
import TaskList from "./components/TaskList.vue"
import Calendar from "./components/Calendar.vue"

const routes =  [
  {
    path: "/",
    alias: "/todos",
    name: "todos",
    component: TaskList,
  },
  {
    path: "/calendar",
    alias: "/calendar",
    name: "calendar",
    component: Calendar,
  },
  /*{
    path: "/todo/:id",
    name: "tutorial-details",
    component: () => import("./components/Tutorial")//tbd
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial")//tbd
  }*/
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
