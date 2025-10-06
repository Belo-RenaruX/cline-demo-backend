
import { LogLevels } from 'src/entities/enums/logLevels.enum';

export class EnvHelper {
  static get(key: keyof NodeJS.ProcessEnv): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Env variable '${key}' not found`);
    }
    return value;
  }

  static getOptional(key: keyof NodeJS.ProcessEnv): string | undefined {
    const value = process.env[key];
    return value;
  }

  static getCurrentLogLevel(): LogLevels {
    const rawValue = process.env.LOG_LEVEL;

    if (!rawValue) {
      return LogLevels.INFO;
    }

    const value = rawValue.toLowerCase();

    if (!Object.values(LogLevels).includes(value as LogLevels)) {
      throw new Error(`LOG_LEVEL value '${value}' is invalid`);
    }

    return value as LogLevels;
  }
}
