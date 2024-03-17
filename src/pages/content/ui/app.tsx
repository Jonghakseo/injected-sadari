import { useEffect } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import useStorage from '@src/shared/hooks/useStorage';
import configStorage from '@src/shared/storages/configStorage';

function App() {
  const { isActivated, victim, target } = useStorage(configStorage);

  useEffect(() => {
    if (!isActivated) return;

    window.postMessage(
      {
        type: 'LADDER_URL',
        url: chrome.runtime.getURL('ladder.js'),
        victim,
        target,
      } satisfies InitMessage,
      '*',
    );
  }, []);

  return null;
}

export default withSuspense(App, <></>);
