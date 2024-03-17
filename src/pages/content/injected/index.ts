/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */
window.addEventListener('message', event => {
  if (event.data.type === 'LADDER_URL') {
    // @ts-ignore
    window.__injected_sadari_victim = event.data.victim;
    // @ts-ignore
    window.__injected_sadari_target = event.data.target;
    // @ts-ignore
    window._nx_js_load(event.data.url, function () {});
  }
});
