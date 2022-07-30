import { App } from './classes/App';
import * as Background from './backgroundClasses/App';
import * as CoverBackground from './coverBackgroundClasses/App';

interface AppState {
  app: App | null;
  background: Background.App | null;
  coverBackground: CoverBackground.App | null;
}

export const appState: AppState = {
  app: null,
  background: null,
  coverBackground: null,
};
