type TaskOptions = {
  interval?: number; // miliseconds
  fixedTime?: string; // HH:mm
  retryLimit?: number;
  fallback?: () => void;
  execute: () => Promise<void>;
};

export class Task {
  id: string;
  interval?: number;
  fixedTime?: string;
  retryLimit?: number;
  fallback?: () => void;
  execute: () => Promise<void>;

  constructor(id: string, options: TaskOptions) {
    this.id = id;
    this.interval = options.interval;
    this.fixedTime = options.fixedTime;
    this.retryLimit = options.retryLimit ?? 0;
    this.fallback = options.fallback;
    this.execute = options.execute;
  }
}
