import { createExternalExtensionProvider } from '@metamask/providers';

/**
 * Get an HTML element from the DOM.
 *
 * @param id - The element ID.
 * @returns - The element.
 * @throws Throws if the element cannot be found.
 */
function getElement(id: string): HTMLElement {
  const element = window.document.getElementById(id);
  if (!element) {
    throw new Error(`Missing element with ID '${id}'`);
  }
  return element;
}

/**
 * Get an input element from the DOM.
 *
 * @param id - The element ID.
 * @returns - The input element.
 * @throws Throws if the element cannot be found.
 * @throws Throws if the element is not an input element.
 */
function getInputElement(id: string): HTMLInputElement {
  const element = getElement(id);

  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`Unexpected non-input element with ID '${id}'`);
  }

  return element;
}

window.addEventListener('DOMContentLoaded', () => {
  let useDefaultId = true;
  let extensionId = '';

  const extensionIdInput = getInputElement('extension-id');
  const useDefaultIdCheckbox = getInputElement('use-default-id');
  const initializeButton = getElement('initialize');
  const connectButton = getElement('connect-accounts');

  if (
    !extensionIdInput ||
    !useDefaultIdCheckbox ||
    !initializeButton ||
    !connectButton
  ) {
    throw new Error('Missing expected DOM element');
  }

  extensionIdInput.addEventListener('change', () => {
    extensionId = extensionIdInput.value;
  });

  useDefaultIdCheckbox.addEventListener('change', () => {
    useDefaultId = useDefaultIdCheckbox.checked;
    if (useDefaultId) {
      extensionIdInput.disabled = true;
    } else {
      extensionIdInput.disabled = false;
    }
  });

  initializeButton.onclick = (): void => {
    if (useDefaultId) {
      window.ethereum = createExternalExtensionProvider();
      console.log(`Initialized with default extension ID`);
    } else {
      window.ethereum = createExternalExtensionProvider(extensionId);
      console.log(`Initialized with extension ID '${extensionId}'`);
    }
  };

  connectButton.onclick = async (): Promise<void> => {
    if (!window.ethereum) {
      throw new Error('Provider not defined');
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };
});
