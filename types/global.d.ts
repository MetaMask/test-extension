import type { BaseProvider } from '@metamask/providers';

type Runtime = {
  onStartup: {
    addListener: (callback: () => void | Promise<void>) => void;
  };

  getURL: (url: string) => string;
};

type Tabs = {
  create: (options: { url: string }) => Promise<void>;
};

type Browser = {
  action: {
    onClicked: {
      addListener: (callback: () => void | Promise<void>) => void;
    };
  };

  runtime: Runtime;

  tabs: Tabs;
};

// Global variables must be declared using var
/* eslint-disable no-var */
declare global {
  var browser: Browser;
  var chrome: Browser;
  var ethereum: BaseProvider | undefined;
}
/* eslint-enable no-var */

export {};
