import fs from "fs";
import path from "path";

type ExecutionLog = {
  taskId: string;
  status: "success" | "error";
  timestamp: string;
  errorMessage?: string;
};

export class ExecutionReport {
  private logs: ExecutionLog[] = [];
  private filePath = path.join(__dirname, "../../reports/executions.json");

  logSuccess(taskId: string) {
    const log: ExecutionLog = {
      taskId,
      status: "success",
      timestamp: new Date().toISOString(),
    };

    this.logs.push(log);
    this.saveToFile();
  }

  logError(taskId: string, error: unknown) {
    const log: ExecutionLog = {
      taskId,
      status: "error",
      timestamp: new Date().toISOString(),
      errorMessage: (error as Error).message,
    };

    this.logs.push(log);
    this.saveToFile();
  }

  private saveToFile() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.logs, null, 2));
  }
}
