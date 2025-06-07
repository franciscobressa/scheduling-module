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

  constructor() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(this.filePath)) {
      try {
        const data = fs.readFileSync(this.filePath, "utf8");
        this.logs = JSON.parse(data);
      } catch {
        this.logs = [];
      }
    }
  }

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
