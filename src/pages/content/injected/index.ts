/* eslint-disable @typescript-eslint/ban-ts-comment */
window.addEventListener('message', event => {
  if (event.data.type === 'LADDER_URL') {
    const message: InitMessage = event.data;
    // @ts-ignore
    window.__injected_sadari_victim = message.victim;
    // @ts-ignore
    window.__injected_sadari_target = message.target;
    // @ts-ignore
    window._nx_js_load(message.url, function () {});
  }
});
