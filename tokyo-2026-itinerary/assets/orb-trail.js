/* Small, hand-drawn interpretation of the Westwood orb for Donggyeong's trip.
   Visual reference: https://www.viviennewestwood.com/en-jp/westwood-world/heritage/the-orb/ */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const layer = document.createElement('div');
  layer.className = 'orb-trail';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  const colors = ['#a86b88', '#9680ae', '#6c9990'];
  let last = null;
  let count = 0;
  function clear() { layer.replaceChildren(); last = null; }
  function move(event) {
    if (motion.matches || !mouse.matches || document.hidden || event.pointerType !== 'mouse' || event.buttons) return;
    const {clientX: x, clientY: y} = event;
    const now = performance.now();
    if (last && (now - last.time < 75 || Math.hypot(x - last.x, y - last.y) < 34)) return;
    last = {x, y, time: now};
    const stamp = document.createElement('span');
    stamp.className = 'orb-trail-stamp';
    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;
    stamp.style.color = colors[count % colors.length];
    stamp.style.setProperty('--orb-turn', `${(count % 5 - 2) * 7}deg`);
    stamp.style.setProperty('--orb-size', `${32 + count % 3 * 3}px`);
    // A crown, cross, globe and tilted Saturn ring, with a tiny companion star.
    stamp.innerHTML = `<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M39 5v12m-5-7h10M31 20l-4-5 8 3 4-4 4 4 8-3-4 5v4H31z"/><circle cx="39" cy="40" r="17"/><path d="M34 24c-7 11-7 22 0 32m10-32c7 11 7 22 0 32M23 35h31M23 45h31"/><path d="M23 33C4 37 2 43 5 46c5 5 25 4 44-2s29-13 25-17c-3-3-11-3-20-1" stroke-width="2.7"/><path d="M6 45c12 2 49-8 65-16" stroke-width="1.1"/></g>${count % 2 === 0 ? '<path class="orb-trail-star" d="M67 49l1.8 5.2L74 56l-5.2 1.8L67 63l-1.8-5.2L60 56l5.2-1.8z" fill="currentColor"/><circle class="orb-trail-dot" cx="13" cy="19" r="1.6" fill="currentColor"/>' : ''}</svg>`;
    layer.append(stamp);
    count++;
    while (layer.childElementCount > 28) layer.firstElementChild.remove();
    stamp.addEventListener('animationend', event => {
      if (event.target === stamp) stamp.remove();
    });
  }
  document.addEventListener('pointermove', move, {passive: true});
  document.documentElement.addEventListener('pointerleave', () => { last = null; });
  document.addEventListener('pointerdown', clear, {passive: true});
  document.addEventListener('scroll', clear, {passive: true, capture: true});
  document.addEventListener('visibilitychange', clear);
  window.addEventListener('blur', clear);
  motion.addEventListener('change', clear);
  mouse.addEventListener('change', clear);
})();
