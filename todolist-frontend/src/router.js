import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/todos",
    name: "todos",
    component: () => import("./components/TaskList")
  },
  {
    path: "/todo/:id",
    name: "tutorial-details",
    component: () => import("./components/Tutorial")//tbd
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial")//tbd
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
