import { Logger } from "../utils/Logger";
import { Task } from "./Task";

export class Scheduler {
  private tasks: Task[] = [];

  registerTask(task: Task) {
    this.tasks.push(task);
  }

  start() {
    this.tasks.forEach((task) => {
      if (task.interval) {
        setInterval(() => this.runTask(task), task.interval);
      }

      if (task.fixedTime) {
        this.scheduleTask(task);
      }
    });
  }

  private async runTask(task: Task) {
    Logger.logStart(task.id);
    let attempts = 0;

    while (attempts <= task.retryLimit) {
      try {
        await task.execute();
        Logger.logSuccess(task.id);
        return;
      } catch (error) {
        Logger.logError(task.id, error);
        attempts++;

        if (attempts <= task.retryLimit) {
          Logger.logRetry(task.id, attempts);
        } else if (task.fallback) {
          Logger.logFallback(task.id);
          task.fallback();
        }
      }
    }
  }

  private scheduleTask(task: Task) {
    const [hour, minute] = task
      .fixedTime!.split(":")
      .map((digits) => Number(digits));

    const checkTime = () => {
      const now = new Date();

      if (now.getHours() === hour && now.getMinutes() === minute) {
        this.runTask(task);
      }
    };

    // Faz a verificação a cada minuto
    setInterval(checkTime, 60 * 1000);
  }
}
