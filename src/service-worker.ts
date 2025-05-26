import { init } from './lib/background';

/**
 * Entrypoint for Chrome MV3 extension service worker.
 */

init().catch((error) => {
  console.error(error);
});

// Startup listener added to ensure service worker activates
globalThis.chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});
