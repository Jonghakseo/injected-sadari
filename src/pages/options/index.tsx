import React from 'react';
import { createRoot } from 'react-dom/client';
import Options from '@pages/options/Options';
import '@pages/options/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import withSuspense from '@src/shared/hoc/withSuspense';

const SuspenseOptions = withSuspense(Options, <>loading...</>);

refreshOnUpdate('pages/options');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<SuspenseOptions />);
}

init();
