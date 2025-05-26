import { init } from './lib/background';

/**
 * Entrypoint for Firefox MV3 background script.
 */
init().catch((error) => {
  console.error(error);
});
