/**
 * Logger class for handling application logging
 * Supports different log levels and browser console integration
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  private context?: string;

  private constructor(context?: string) {
    this.context = context;
  }

  /**
   * Get singleton instance of Logger
   */
  public static getInstance(context?: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(context);
    }
    return Logger.instance;
  }

  /**
   * Set the minimum log level
   */
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Get current log level
   */
  public getLogLevel(): LogLevel {
    return this.logLevel;
  }

  /**
   * Set maximum number of logs to keep in memory
   */
  public setMaxLogs(max: number): void {
    this.maxLogs = max;
    this.trimLogs();
  }

  /**
   * Debug level logging
   */
  public debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Info level logging
   */
  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Warning level logging
   */
  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Error level logging
   */
  public error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * Log with custom level
   */
  private log(level: LogLevel, message: string, data?: any): void {
    if (level < this.logLevel) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context: this.context
    };

    this.logs.push(entry);
    this.trimLogs();
    this.outputToConsole(entry);
  }

  /**
   * Output log entry to browser console
   */
  private outputToConsole(entry: LogEntry): void {
    const prefix = this.context ? `[${this.context}]` : '';
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const logMessage = `${prefix} ${entry.message}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(`[DEBUG] ${timestamp} ${logMessage}`, entry.data || '');
        break;
      case LogLevel.INFO:
        console.info(`[INFO] ${timestamp} ${logMessage}`, entry.data || '');
        break;
      case LogLevel.WARN:
        console.warn(`[WARN] ${timestamp} ${logMessage}`, entry.data || '');
        break;
      case LogLevel.ERROR:
        console.error(`[ERROR] ${timestamp} ${logMessage}`, entry.data || '');
        break;
    }
  }

  /**
   * Trim logs to keep only the most recent entries
   */
  private trimLogs(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Get all logs
   */
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs filtered by level
   */
  public getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level >= level);
  }

  /**
   * Get logs filtered by context
   */
  public getLogsByContext(context: string): LogEntry[] {
    return this.logs.filter(log => log.context === context);
  }

  /**
   * Clear all logs
   */
  public clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Export logs as formatted text
   */
  public exportLogsAsText(): string {
    return this.logs
      .map(log => {
        const timestamp = new Date(log.timestamp).toLocaleString();
        const level = LogLevel[log.level];
        const context = log.context ? `[${log.context}]` : '';
        const data = log.data ? ` | Data: ${JSON.stringify(log.data)}` : '';
        return `[${timestamp}] [${level}] ${context} ${log.message}${data}`;
      })
      .join('\n');
  }

  /**
   * Create a child logger with additional context
   */
  public createChildLogger(childContext: string): Logger {
    const childLogger = new Logger(childContext);
    childLogger.setLogLevel(this.logLevel);
    childLogger.setMaxLogs(this.maxLogs);
    return childLogger;
  }
}

// Convenience functions for quick logging
export const logger = Logger.getInstance();

export const debug = (message: string, data?: any) => logger.debug(message, data);
export const info = (message: string, data?: any) => logger.info(message, data);
export const warn = (message: string, data?: any) => logger.warn(message, data);
export const error = (message: string, data?: any) => logger.error(message, data); 