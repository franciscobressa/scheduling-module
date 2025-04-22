export class Logger {
  static logStart(taskId: string) {
    console.log(`[${new Date().toISOString()}] ▶️ Start Task: ${taskId}`);
  }

  static logSuccess(taskId: string) {
    console.log(`[${new Date().toISOString()}] ✅ Success Task: ${taskId}`);
  }

  static logError(taskId: string, error: unknown) {
    console.error(
      `[${new Date().toISOString()}] ❌ Error in Task ${taskId}:`,
      error
    );
  }

  static logRetry(taskId: string, attempt: number) {
    console.log(
      `[${new Date().toISOString()}] 🔁 Retry #${attempt} for Task: ${taskId}`
    );
  }

  static logFallback(taskId: string) {
    console.warn(
      `[${new Date().toISOString()}] 🧯 Fallback executed for Task: ${taskId}`
    );
  }
}
