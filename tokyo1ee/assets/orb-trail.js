/* User-supplied transparent character, faded with opacity without color filters. */
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const layer = document.createElement('div');
  layer.className = 'orb-trail';
  layer.setAttribute('aria-hidden', 'true');
  // Keep stamps in document coordinates inside a clipped viewport overlay.
  // Scrolling moves the plane without restarting any stamp's animation.
  const page = document.createElement('div');
  page.className = 'orb-trail-page';
  layer.append(page);
  document.body.append(layer);
  function syncScroll() {
    page.style.transform = `translate(${-scrollX}px, ${-scrollY}px)`;
  }
  syncScroll();
  const colors = ['#a86b88', '#9680ae', '#6c9990'];
  const characterUrl = new URL('decorations/cursor-character.png', document.currentScript.src).href;
  const preload = new Image();
  preload.src = characterUrl;
  let last = null;
  let count = 0;
  function clear() { page.replaceChildren(); last = null; }
  function move(event) {
    if (motion.matches || !mouse.matches || document.hidden || event.pointerType !== 'mouse' || event.buttons) return;
    const x = event.clientX + scrollX, y = event.clientY + scrollY;
    syncScroll();
    const now = performance.now();
    if (last && (now - last.time < 75 || Math.hypot(x - last.x, y - last.y) < 44)) return;
    last = {x, y, time: now};
    const stamp = document.createElement('span');
    stamp.className = 'orb-trail-stamp';
    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;
    stamp.style.color = colors[count % colors.length];
    stamp.style.setProperty('--orb-turn', `${(count % 5 - 2) * 7}deg`);
    stamp.style.setProperty('--orb-size', `${38 + count % 3 * 4}px`);
    const character = document.createElement('img');
    character.src = characterUrl;
    character.alt = '';
    character.draggable = false;
    stamp.append(character);
    if (count % 2 === 0) {
      stamp.insertAdjacentHTML('beforeend', '<svg class="orb-trail-sparkles" viewBox="0 0 80 80" aria-hidden="true"><path class="orb-trail-star" d="M70 50l1.8 5.2L77 57l-5.2 1.8L70 64l-1.8-5.2L63 57l5.2-1.8z" fill="currentColor"/><circle class="orb-trail-dot" cx="9" cy="15" r="1.6" fill="currentColor"/></svg>');
    }
    page.append(stamp);
    count++;
    while (page.childElementCount > 28) page.firstElementChild.remove();
    stamp.addEventListener('animationend', event => {
      if (event.target === stamp) stamp.remove();
    });
  }
  document.addEventListener('pointermove', move, {passive: true});
  document.documentElement.addEventListener('pointerleave', () => { last = null; });
  window.addEventListener('scroll', syncScroll, {passive: true});
  document.addEventListener('visibilitychange', clear);
  window.addEventListener('blur', clear);
  motion.addEventListener('change', clear);
  mouse.addEventListener('change', clear);
})();
