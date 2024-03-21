import { useEffect } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import useStorage from '@src/shared/hooks/useStorage';
import configStorage from '@src/shared/storages/configStorage';

function App() {
  const { isActivated, victim, target } = useStorage(configStorage);

  useEffect(() => {
    if (!isActivated) return;

    setInterval(() => {
      (async function () {
        try {
          const res = await fetch('http://localhost:3333/api/check-current-status');
          const current = await res.json();
          window.postMessage(
            {
              type: 'UPDATE_STATUS',
              victim: current.victim,
              target: current.target,
            } satisfies UpdateMessage,
            '*',
          );
        } catch (e) {}
      })();
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isActivated) return;

    // 최초 1회 서버와 싱크
    void fetch('http://localhost:3333/api/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ victim, target }),
    }).catch(() => {});

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
