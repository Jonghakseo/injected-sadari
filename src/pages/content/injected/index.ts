/* eslint-disable @typescript-eslint/ban-ts-comment */
window.addEventListener('message', event => {
  // @ts-ignore
  if (typeof window._nx_js_load !== 'function') {
    return;
  }
  switch (event.data.type) {
    case 'LADDER_URL': {
      const message: InitMessage = event.data;
      // @ts-ignore
      window.__injected_sadari_victim = message.victim;
      // @ts-ignore
      window.__injected_sadari_target = message.target;
      // @ts-ignore
      window._nx_js_load(message.url, function () {});
      break;
    }
    case 'UPDATE_STATUS': {
      const message: UpdateMessage = event.data;
      // @ts-ignore
      window.__injected_sadari_victim = message.victim;
      // @ts-ignore
      window.__injected_sadari_target = message.target;
      break;
    }
  }
});
