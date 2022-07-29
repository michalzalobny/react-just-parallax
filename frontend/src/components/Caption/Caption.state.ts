import { App } from './classes/App';
import * as Background from './backgroundClasses/App';

interface AppState {
  app: App | null;
  background: Background.App | null;
}

export const appState: AppState = {
  app: null,
  background: null,
};
