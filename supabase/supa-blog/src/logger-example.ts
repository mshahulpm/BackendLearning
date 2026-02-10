/**
 * Example usage of the Logger class
 * This file demonstrates various ways to use the logger
 */

import { Logger, LogLevel, logger, debug, info, warn, error } from './logger';

// Example 1: Using the singleton logger instance
export function exampleBasicUsage() {
  logger.info('Application started');
  logger.debug('Debug information', { userId: 123, action: 'login' });
  logger.warn('Warning: User session expiring soon');
  logger.error('Error occurred during data fetch', { error: 'Network timeout' });
}

// Example 2: Using convenience functions
export function exampleConvenienceFunctions() {
  info('User logged in successfully');
  debug('Processing user data', { userId: 456, timestamp: Date.now() });
  warn('API rate limit approaching');
  error('Database connection failed', { retryCount: 3 });
}

// Example 3: Creating a logger with context
export function exampleContextLogger() {
  const authLogger = Logger.getInstance('Authentication');
  authLogger.info('User authentication started');
  authLogger.debug('Validating credentials', { username: 'john_doe' });
  authLogger.error('Invalid password attempt', { attempts: 3 });
}

// Example 4: Creating child loggers
export function exampleChildLogger() {
  const mainLogger = Logger.getInstance('MainApp');
  const apiLogger = mainLogger.createChildLogger('API');
  const dbLogger = mainLogger.createChildLogger('Database');

  mainLogger.info('Application initialized');
  apiLogger.info('API endpoint called', { endpoint: '/api/users' });
  dbLogger.debug('Database query executed', { query: 'SELECT * FROM users' });
}

// Example 5: Setting log levels
export function exampleLogLevels() {
  const testLogger = Logger.getInstance('TestModule');
  
  // Set to debug level to see all logs
  testLogger.setLogLevel(LogLevel.DEBUG);
  testLogger.debug('This will be visible');
  testLogger.info('This will be visible');
  
  // Set to error level to see only errors
  testLogger.setLogLevel(LogLevel.ERROR);
  testLogger.debug('This will NOT be visible');
  testLogger.info('This will NOT be visible');
  testLogger.error('This will be visible');
}

// Example 6: Log management
export function exampleLogManagement() {
  const logManager = Logger.getInstance('LogManager');
  
  // Log some events
  logManager.info('Event 1');
  logManager.info('Event 2');
  logManager.error('Error event');
  
  // Get all logs
  const allLogs = logManager.getLogs();
  console.log('All logs:', allLogs);
  
  // Get only error logs
  const errorLogs = logManager.getLogsByLevel(LogLevel.ERROR);
  console.log('Error logs:', errorLogs);
  
  // Export logs as JSON
  const jsonLogs = logManager.exportLogs();
  console.log('JSON logs:', jsonLogs);
  
  // Export logs as text
  const textLogs = logManager.exportLogsAsText();
  console.log('Text logs:', textLogs);
  
  // Clear logs
  logManager.clearLogs();
}

// Example 7: Integration with async operations
export async function exampleAsyncLogging() {
  const asyncLogger = Logger.getInstance('AsyncOperations');
  
  try {
    asyncLogger.info('Starting async operation');
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    asyncLogger.info('Async operation completed successfully');
  } catch (err) {
    asyncLogger.error('Async operation failed', { error: err });
  }
}

// Example 8: Performance logging
export function examplePerformanceLogging() {
  const perfLogger = Logger.getInstance('Performance');
  
  const startTime = performance.now();
  
  // Simulate some work
  for (let i = 0; i < 1000000; i++) {
    Math.random();
  }
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  perfLogger.info('Operation completed', { 
    duration: `${duration.toFixed(2)}ms`,
    operation: 'Math.random loop'
  });
}

// Example 9: Conditional logging
export function exampleConditionalLogging() {
  const conditionalLogger = Logger.getInstance('Conditional');
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    conditionalLogger.setLogLevel(LogLevel.DEBUG);
  } else {
    conditionalLogger.setLogLevel(LogLevel.ERROR);
  }
  
  conditionalLogger.debug('This will only show in development');
  conditionalLogger.info('This will show in development');
  conditionalLogger.error('This will show in all environments');
}

// Example 10: Structured logging
export function exampleStructuredLogging() {
  const structuredLogger = Logger.getInstance('Structured');
  
  // Log user actions
  structuredLogger.info('User action performed', {
    userId: 123,
    action: 'create_post',
    timestamp: new Date().toISOString(),
    metadata: {
      postTitle: 'My First Post',
      category: 'Technology',
      tags: ['typescript', 'logging']
    }
  });
  
  // Log API responses
  structuredLogger.debug('API response received', {
    endpoint: '/api/posts',
    statusCode: 200,
    responseTime: 150,
    responseSize: 2048
  });
} 

// exampleBasicUsage();
// exampleConvenienceFunctions();
// exampleContextLogger();
// exampleChildLogger();
// exampleLogLevels();
// exampleLogManagement();
// exampleAsyncLogging();
// examplePerformanceLogging();
// exampleConditionalLogging();
// exampleStructuredLogging();

console.log(new Date());
