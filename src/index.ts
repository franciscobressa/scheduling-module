import { Scheduler } from "./core/Scheduler";
import { Task } from "./core/Task";

const scheduler = new Scheduler();

const helloTask = new Task("hello-task", {
  interval: 5000,
  retryLimit: 2,
  execute: async () => {
    console.log("👋 Olá! Executando a tarefa hello.");
  },
  fallback: () => {
    console.log("⚠️ Fallback da tarefa hello.");
  },
});

const fixedTimeTask = new Task("daily-task", {
  fixedTime: "14:00", // executa todos os dias às 14:00
  execute: async () => {
    console.log("🕑 Executando tarefa diária às 14h!");
  },
});

const riskyTask = new Task("unstable-task", {
  interval: 10000,
  retryLimit: 3,
  execute: async () => {
    if (Math.random() < 0.5) {
      throw new Error("Erro aleatório na unstable-task");
    }
    console.log("✅ Tarefa instável executou com sucesso!");
  },
  fallback: () => {
    console.log("🧯 Fallback da tarefa instável.");
  },
});

// Registra todas as tasks
scheduler.registerTask(helloTask);
scheduler.registerTask(fixedTimeTask);
scheduler.registerTask(riskyTask);

scheduler.start();
