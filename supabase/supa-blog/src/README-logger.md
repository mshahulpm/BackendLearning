# Logger Class Documentation

A comprehensive TypeScript logger class designed for browser-based applications with support for different log levels, context-aware logging, and log management.

## Features

- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR
- **Singleton Pattern**: Global logger instance
- **Context Support**: Add context to log messages
- **Child Loggers**: Create hierarchical loggers
- **Log Management**: Store, filter, and export logs
- **Browser Console Integration**: Automatic console output
- **Performance Optimized**: Configurable log limits
- **TypeScript Support**: Full type safety

## Quick Start

### Basic Usage

```typescript
import { logger, debug, info, warn, error } from './logger';

// Using the singleton logger
logger.info('Application started');
logger.debug('Debug information', { userId: 123 });
logger.warn('Warning message');
logger.error('Error occurred', { error: 'Network timeout' });

// Using convenience functions
info('User logged in');
debug('Processing data', { data: 'some data' });
warn('API rate limit approaching');
error('Database connection failed');
```

### Creating Contextual Loggers

```typescript
import { Logger } from './logger';

// Create a logger with context
const authLogger = Logger.getInstance('Authentication');
authLogger.info('User authentication started');
authLogger.error('Login failed', { username: 'john_doe' });

// Create child loggers
const mainLogger = Logger.getInstance('MainApp');
const apiLogger = mainLogger.createChildLogger('API');
const dbLogger = mainLogger.createChildLogger('Database');

apiLogger.info('API endpoint called', { endpoint: '/api/users' });
dbLogger.debug('Database query executed', { query: 'SELECT * FROM users' });
```

## API Reference

### LogLevel Enum

```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}
```

### Logger Class Methods

#### Constructor and Instance Management
- `Logger.getInstance(context?: string)`: Get singleton instance
- `createChildLogger(childContext: string)`: Create child logger

#### Logging Methods
- `debug(message: string, data?: any)`: Log debug message
- `info(message: string, data?: any)`: Log info message
- `warn(message: string, data?: any)`: Log warning message
- `error(message: string, data?: any)`: Log error message

#### Configuration Methods
- `setLogLevel(level: LogLevel)`: Set minimum log level
- `getLogLevel()`: Get current log level
- `setMaxLogs(max: number)`: Set maximum logs to keep in memory

#### Log Management Methods
- `getLogs()`: Get all stored logs
- `getLogsByLevel(level: LogLevel)`: Get logs filtered by level
- `getLogsByContext(context: string)`: Get logs filtered by context
- `clearLogs()`: Clear all stored logs
- `exportLogs()`: Export logs as JSON string
- `exportLogsAsText()`: Export logs as formatted text

### Convenience Functions

- `debug(message: string, data?: any)`: Quick debug logging
- `info(message: string, data?: any)`: Quick info logging
- `warn(message: string, data?: any)`: Quick warning logging
- `error(message: string, data?: any)`: Quick error logging

## Examples

### Setting Log Levels

```typescript
import { Logger, LogLevel } from './logger';

const logger = Logger.getInstance('MyApp');

// Show all logs (debug and above)
logger.setLogLevel(LogLevel.DEBUG);

// Show only warnings and errors
logger.setLogLevel(LogLevel.WARN);

// Show only errors
logger.setLogLevel(LogLevel.ERROR);

// Disable all logging
logger.setLogLevel(LogLevel.NONE);
```

### Structured Logging

```typescript
const logger = Logger.getInstance('API');

logger.info('API request received', {
  method: 'POST',
  endpoint: '/api/users',
  userId: 123,
  timestamp: new Date().toISOString()
});

logger.error('API request failed', {
  method: 'POST',
  endpoint: '/api/users',
  statusCode: 500,
  error: 'Internal server error',
  retryCount: 3
});
```

### Performance Logging

```typescript
const logger = Logger.getInstance('Performance');

const startTime = performance.now();

// Perform some operation
const result = expensiveOperation();

const endTime = performance.now();
const duration = endTime - startTime;

logger.info('Operation completed', {
  operation: 'expensiveOperation',
  duration: `${duration.toFixed(2)}ms`,
  result: result
});
```

### Async Operation Logging

```typescript
const logger = Logger.getInstance('AsyncOperations');

async function fetchUserData(userId: number) {
  try {
    logger.info('Starting user data fetch', { userId });
    
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    
    logger.info('User data fetched successfully', { 
      userId, 
      dataSize: JSON.stringify(userData).length 
    });
    
    return userData;
  } catch (error) {
    logger.error('Failed to fetch user data', { 
      userId, 
      error: error.message 
    });
    throw error;
  }
}
```

### Log Export and Analysis

```typescript
const logger = Logger.getInstance('LogAnalysis');

// Log some events
logger.info('Event 1');
logger.error('Error event');
logger.info('Event 2');

// Export logs for analysis
const allLogs = logger.getLogs();
const errorLogs = logger.getLogsByLevel(LogLevel.ERROR);
const jsonExport = logger.exportLogs();
const textExport = logger.exportLogsAsText();

console.log('All logs:', allLogs);
console.log('Error logs:', errorLogs);
console.log('JSON export:', jsonExport);
console.log('Text export:', textExport);
```

## Best Practices

1. **Use Context**: Always provide meaningful context when creating loggers
2. **Structured Data**: Pass objects as second parameter for better debugging
3. **Appropriate Levels**: Use the right log level for each message
4. **Performance**: Set appropriate max log limits for production
5. **Environment Awareness**: Adjust log levels based on environment

## Configuration

### Default Settings

- **Default Log Level**: INFO
- **Max Logs**: 1000
- **Console Output**: Enabled for all levels
- **Timestamp Format**: ISO string for storage, locale string for console

### Environment-Specific Configuration

```typescript
// In your app initialization
const logger = Logger.getInstance('App');

if (process.env.NODE_ENV === 'development') {
  logger.setLogLevel(LogLevel.DEBUG);
  logger.setMaxLogs(5000);
} else {
  logger.setLogLevel(LogLevel.ERROR);
  logger.setMaxLogs(100);
}
```

## Browser Console Output

The logger automatically outputs to the browser console with the following format:

- **DEBUG**: `console.debug()` with blue styling
- **INFO**: `console.info()` with green styling  
- **WARN**: `console.warn()` with yellow styling
- **ERROR**: `console.error()` with red styling

Each log includes:
- Timestamp
- Log level
- Context (if provided)
- Message
- Additional data (if provided)

## TypeScript Support

The logger is fully typed with TypeScript interfaces:

```typescript
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
}
```

This ensures type safety and provides excellent IDE support with autocomplete and error checking. 