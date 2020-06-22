import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath: string = __dirname + '/../../.env';
      const existPath: boolean = existsSync(envFilePath);

      if (!existPath) {
        console.log(`.env file does not exist`);
        process.exit(0);
      }

      this.envConfig = parse(readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
