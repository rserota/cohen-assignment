import { createWebHistory, createRouter } from "vue-router";
import ToDoPage from "./components/ToDoPage.vue";
import TaskListPage from "./components/TaskListPage.vue";

const routes = [
  {
    path: "/",
    name: "ToDo",
    component: ToDoPage,
  },
  {
    path: "/task-list",
    name: "TaskList",
    component: TaskListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;