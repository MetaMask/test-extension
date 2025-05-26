/**
 * The extension API (`chrome` or `browser` for Chrome or Firefox respectively)
 */
const browser = globalThis.chrome ? globalThis.chrome : globalThis.browser;

/**
 * Initialize the background process.
 */
export async function init(): Promise<void> {
  // Open the extension page when the toolbar button is clicked
  browser.action.onClicked.addListener(async () => {
    console.log('Opening new tab');
    const extensionURL = browser.runtime.getURL('index.html');
    await browser.tabs.create({ url: extensionURL });
  });
}
