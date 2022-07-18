import { App } from './classes/App';

interface AppState {
  app: App | null;
}

export const appState: AppState = {
  app: null,
};
