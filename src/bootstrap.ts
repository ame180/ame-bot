import { config, AppConfig } from './config/configLoader';
import './models';

export type AppContext = {
  config: AppConfig;
};

export function bootstrap(): AppContext {
  return { config };
}
