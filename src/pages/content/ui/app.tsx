import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    window.postMessage({type: "LADDER_URL", url: chrome.runtime.getURL("ladder.js")}, "*")
  }, []);

  return <div className="">content view</div>;
}
