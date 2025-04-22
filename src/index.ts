import { Scheduler } from "./core/Scheduler";
import { Task } from "./core/Task";

const scheduler = new Scheduler();

const helloTask = new Task("hello-task", {
  interval: 5000,
  retryLimit: 2,
  execute: async () => {
    console.log("🧠 Executando tarefa: Hello Task!");
  },
  fallback: () => {
    console.log("🔥 Executando fallback da tarefa!");
  },
});

scheduler.registerTask(helloTask);
scheduler.start();
