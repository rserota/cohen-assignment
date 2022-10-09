import { createRouter, createWebHashHistory } from "vue-router";
import ToDoPage from "./components/ToDoPage.vue";
import TaskListPage from "./components/TaskListPage.vue";

const routes = [
  {
    path: "/",
    name: "ToDo",
    component: ToDoPage,
  },
  {
    path: "/task-list/:todoID",
    name: "TaskList",
    component: TaskListPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;