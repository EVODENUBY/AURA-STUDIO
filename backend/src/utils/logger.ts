import { Request, Response, NextFunction } from 'express';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const COLORS: Record<LogLevel, string> = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[36m',
  debug: '\x1b[90m',
};

const LABELS: Record<LogLevel, string> = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
  debug: 'DEBUG',
};

const RESET = '\x1b[0m';

function formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const color = COLORS[level];
  const label = LABELS[level];
  const prefix = `[${timestamp}] ${color}${label}${RESET}`;

  if (meta && Object.keys(meta).length > 0) {
    const metaStr = JSON.stringify(meta, null, 2);
    return `${prefix} ${message}\n${metaStr}`;
  }
  return `${prefix} ${message}`;
}

class Logger {
  static error(message: string, meta?: Record<string, unknown>): void {
    console.error(formatMessage('error', message, meta));
  }

  static warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(formatMessage('warn', message, meta));
  }

  static info(message: string, meta?: Record<string, unknown>): void {
    console.log(formatMessage('info', message, meta));
  }

  static debug(message: string, meta?: Record<string, unknown>): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage('debug', message, meta));
    }
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  const body = req.body && Object.keys(req.body).length > 0 ? req.body : undefined;
  const query = req.query && Object.keys(req.query).length > 0 ? req.query : undefined;

  Logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    ...(body && { body }),
    ...(query && { query }),
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    if (status >= 500) {
      Logger.error(`${req.method} ${req.path} ${status} - ${duration}ms`, {
        statusCode: status,
        durationMs: duration,
      });
    } else if (status >= 400) {
      Logger.warn(`${req.method} ${req.path} ${status} - ${duration}ms`, {
        statusCode: status,
        durationMs: duration,
      });
    } else {
      Logger.info(`${req.method} ${req.path} ${status} - ${duration}ms`, {
        statusCode: status,
        durationMs: duration,
      });
    }
  });

  next();
}

export default Logger;
