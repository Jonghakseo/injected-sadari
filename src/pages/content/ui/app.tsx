import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    window.postMessage(
      {
        type: 'LADDER_URL',
        url: chrome.runtime.getURL('ladder.js'),
        victim: '목표',
        target: '당첨',
      },
      '*',
    );
  }, []);

  return <div className="">content view</div>;
}
