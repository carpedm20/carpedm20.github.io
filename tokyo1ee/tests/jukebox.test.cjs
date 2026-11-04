// Run with: node --test tokyo1ee/tests/jukebox.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync(new URL('../assets/jukebox.js', `file://${__filename}`), 'utf8');

// A small DOM/player double lets us deliver YouTube callbacks in race-prone order.
async function setup({ delayedApi = false } = {}) {
  class Element {
    constructor(tag = '') {
      this.tagName = tag; this.children = []; this.listeners = {}; this.attributes = {}; this.dataset = {};
      this.value = '35'; this.textContent = ''; this.style = { setProperty() {} };
      const classes = new Set();
      this.classList = { add: x => classes.add(x), toggle: (x, on) => {
        on ??= !classes.has(x); if (on) classes.add(x); else classes.delete(x); return on;
      }, contains: x => classes.has(x) };
    }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this.children = children; }
    setAttribute(k, v) { this.attributes[k] = v; }
    getAttribute(k) { return this.attributes[k]; }
    addEventListener(k, fn) { this.listeners[k] = fn; }
    emit(k, args = {}) { this.listeners[k]?.({ target: this, ...args }); }
    querySelector(k) { return controls[k] ||= new Element(); }
    contains(el) { return Object.values(controls).includes(el); }
    getBoundingClientRect() { return { height: 70 }; }
    remove() {}
  }
  const controls = {}, timers = new Map(), calls = [], instances = [];
  const document = new Element();
  document.body = new Element(); document.head = new Element(); document.documentElement = new Element();
  document.currentScript = { src: 'https://example.com/assets/jukebox.js' };
  document.createElement = tag => new Element(tag);
  document.getElementById = () => null; document.querySelector = () => null;
  const YT = { Player: function (mount, options) {
    const player = { getIframe: () => mount, setVolume: v => calls.push(['volume', v]),
      playVideo: () => calls.push(['play']), pauseVideo: () => calls.push(['pause']),
      getDuration: () => 207, getCurrentTime: () => 0, destroy() {},
      loadVideoById: id => calls.push(['load', id]), seekTo() {} };
    instances.push({ player, events: options.events }); return player;
  } };
  const context = { document, URL, URLSearchParams, location: new URL('https://example.com/trip/'),
    setTimeout: (fn, ms) => { const id = {}; timers.set(id, { fn, ms }); return id; },
    clearTimeout: id => timers.delete(id), setInterval() {}, requestAnimationFrame() { return 1; },
    innerHeight: 900, CustomEvent: class {}, addEventListener() {}, dispatchEvent() {} };
  context.window = context;
  if (!delayedApi) context.YT = YT;
  vm.runInNewContext(source, context);
  await Promise.resolve();
  const emit = (name, data, index = instances.length - 1) => {
    const instance = instances[index]; instance.events[name]({ target: instance.player, data });
  };
  return { controls, calls, document, timers, emit, instances,
    async loadApi() { context.YT = YT; context.onYouTubeIframeAPIReady(); await new Promise(setImmediate); },
    clickPage() { document.emit('click', { isTrusted: true }); },
    clickPlay() { controls['.jukebox-play'].emit('click'); },
    status() { return controls['.jukebox-status'].textContent; } };
}

test('embed begins loading before the API is ready; volume precedes the single play request', async () => {
  const app = await setup({ delayedApi: true });
  const iframe = app.document.body.children[0].children[0];
  assert.equal(iframe.tagName, 'iframe');
  assert.match(iframe.src, /enablejsapi=1&autoplay=0/);
  assert.match(iframe.allow, /autoplay/);
  assert.equal(app.instances.length, 0);
  await app.loadApi(); app.emit('onReady');
  assert.deepEqual(app.calls, [['volume', 35], ['play']]);
});

test('play during slow startup retries instead of cancelling playback', async () => {
  const app = await setup(); app.emit('onReady'); app.emit('onStateChange', 3);
  app.clickPlay();
  assert.equal(app.calls.filter(c => c[0] === 'play').length, 2);
  assert.equal(app.calls.filter(c => c[0] === 'pause').length, 0);
  app.emit('onStateChange', 1);
  assert.equal(app.status(), '재생 중');
});

test('blocked startup keeps accepting gestures until playback succeeds', async () => {
  const app = await setup(); app.emit('onReady'); app.emit('onAutoplayBlocked');
  app.clickPage(); app.emit('onAutoplayBlocked'); app.clickPage();
  assert.equal(app.calls.filter(c => c[0] === 'play').length, 3);
  // A late rejection from the previous attempt must not cancel a successful retry.
  app.emit('onAutoplayBlocked'); app.emit('onStateChange', 1);
  assert.equal(app.status(), '재생 중');
  assert.equal(app.calls.filter(c => c[0] === 'pause').length, 0);
});

test('explicit pause survives page gestures and delayed PLAYING callbacks', async () => {
  const app = await setup(); app.emit('onReady'); app.emit('onStateChange', 1);
  app.clickPlay(); app.emit('onStateChange', 2); app.clickPage(); app.emit('onStateChange', 1);
  assert.equal(app.status(), '일시정지');
  assert.equal(app.calls.filter(c => c[0] === 'play').length, 1);
  assert.equal(app.calls.filter(c => c[0] === 'pause').length, 2);
  app.clickPlay(); app.emit('onStateChange', 1);
  assert.equal(app.status(), '재생 중');
});

test('slow buffering stays pending and does not claim autoplay was blocked', async () => {
  const app = await setup(); app.emit('onReady'); app.emit('onStateChange', 3);
  [...app.timers.values()].find(t => t.ms === 10000).fn();
  assert.match(app.status(), /불러오는 중/);
  app.emit('onStateChange', 1); assert.equal(app.status(), '재생 중');
});

test('ended tracks advance and repeat can be disabled', async () => {
  const app = await setup(); app.emit('onReady');
  for (let i = 0; i < 3; i++) { app.emit('onStateChange', 1); app.emit('onStateChange', 0); }
  assert.deepEqual(app.calls.filter(c => c[0] === 'load').map(c => c[1]),
    ['0zUJd-o0yMw', 'QH6Xrtxi4N0', 'l482T0yNkeo']);
  app.controls['.jukebox-repeat'].emit('click');
  for (let i = 0; i < 3; i++) { app.emit('onStateChange', 1); app.emit('onStateChange', 0); }
  assert.equal(app.calls.filter(c => c[0] === 'load').length, 5);
  assert.match(app.status(), /재생목록 끝/);
});
