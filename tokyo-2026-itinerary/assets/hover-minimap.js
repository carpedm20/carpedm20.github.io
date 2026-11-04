/* A small, persistent location preview. Queries come from the existing itinerary. */
(() => {
  'use strict';

  const placeSelector = [
    '[data-mini-query]', '[data-minimap-query]', '.store-option-card', '.food-guide-card', '.day-food-pick',
    '.hotel-card', '.overnight-card', '.discovery-card', '.route-point', '.route-leg',
    '.stop[data-stop]', '[data-food-jump]', '[data-shop-activity-jump]', '#tripPlanPanel label'
  ].join(',');
  const desktop = matchMedia('(min-width:761px)');
  const storageKey = 'tokyo-hover-minimap-geometry-v1';
  let panel, frame, caption, detail, openLink, shield;
  let pendingTimer, pendingQuery = '', lastQuery = '', layoutFrame;
  let geometry, customGeometry = false, gesture = null, minimized = false;

  function place(query, title, note = '') {
    return typeof query === 'string' && query.trim()
      ? {query: query.trim(), title: title || query, note}
      : null;
  }

  function mapLinkQuery(link) {
    if (!link) return '';
    try {
      const url = new URL(link.href, location.href);
      if (!/(^|\.)google\.(com|co\.jp)$/.test(url.hostname) || !url.pathname.startsWith('/maps')) return '';
      return url.searchParams.get('query') || url.searchParams.get('q') || url.searchParams.get('destination') || '';
    } catch { return ''; }
  }

  function linkedPlace(node) {
    const link = [...node.querySelectorAll('a[href]')].find(a => mapLinkQuery(a));
    const heading = node.querySelector('h3,h4') || node.querySelector('strong');
    return place(mapLinkQuery(link), heading?.textContent.trim());
  }

  function foodPlace(id) {
    const food = typeof foods !== 'undefined' && foods.find(f => f.id === id);
    return food ? place(food.query, food.name, food.area) : null;
  }

  function clusterPlace(id) {
    const cluster = typeof shopClusters !== 'undefined' && shopClusters[id];
    const first = cluster?.stores.find(store => store.query);
    // A cluster covers multiple shops; clearly identify the candidate being previewed.
    return first ? place(first.query, first.name, cluster.title + ' · 첫 후보') : null;
  }

  function routePlace(di, pi, note) {
    if (typeof getMapRoute !== 'function' || !Number.isInteger(di) || di < 0) return null;
    const point = getMapRoute(di)?.points[pi];
    return point ? place(point[4], point[0], note || point[5]) : null;
  }

  function resolvePlace(target) {
    if (!(target instanceof Element) || target.closest('#hoverMinimap')) return null;
    const node = target.closest(placeSelector);
    if (!node) {
      const link = target.closest('a[href]');
      return place(mapLinkQuery(link), link?.textContent.trim(), '지도 링크의 장소');
    }
    if (node.dataset.miniQuery) return place(node.dataset.miniQuery, node.dataset.miniName || node.textContent.trim(), node.dataset.miniNote);
    if (node.dataset.minimapQuery) return place(node.dataset.minimapQuery, node.dataset.minimapTitle || node.textContent.trim());
    if (node.matches('.store-option-card')) {
      const store = typeof shopClusters !== 'undefined' && Object.values(shopClusters)
        .flatMap(cluster => cluster.stores).find(item => item.id === node.dataset.storeId);
      return store ? place(store.query, store.name, store.area) : linkedPlace(node);
    }
    if (node.matches('.food-guide-card')) return foodPlace(node.id.replace(/^food-/, '')) || linkedPlace(node);
    if (node.matches('.day-food-pick,[data-food-jump]')) {
      const jump = node.matches('[data-food-jump]') ? node : node.querySelector('[data-food-jump]');
      return foodPlace(jump?.dataset.foodJump);
    }
    if (node.matches('.hotel-card')) return linkedPlace(node);
    if (node.matches('.overnight-card')) {
      const option = typeof shortStayOptions !== 'undefined' && shortStayOptions.find(o => 'room-' + o.id === node.id);
      return option ? place(option.query, option.hotel, option.name) : null;
    }
    if (node.matches('.discovery-card,[data-shop-activity-jump]')) {
      const jump = node.matches('[data-shop-activity-jump]') ? node : node.querySelector('[data-shop-activity-jump]');
      return clusterPlace(jump?.dataset.shopActivityJump);
    }
    if (node.matches('.route-point')) {
      return node.hasAttribute('data-option-point')
        ? routePlace(typeof mapDay === 'number' ? mapDay : -1, Number(node.dataset.optionPoint))
        : routePlace(Number(node.dataset.zoomday), Number(node.dataset.zoompoint));
    }
    if (node.matches('.route-leg')) {
      const [di, pi] = (node.dataset.routeleg || '').split('-').map(Number);
      return routePlace(di, pi + 1, '이동 구간의 도착지') || linkedPlace(node);
    }
    if (node.matches('.stop[data-stop]')) {
      const stop = typeof plannedDay === 'function' && typeof day === 'number'
        ? plannedDay(day).stops[Number(node.dataset.stop)] : null;
      if (!stop) return null;
      if (stop.foodId) return foodPlace(stop.foodId) || place(stop.place, stop.title);
      if (stop.shopCluster) return clusterPlace(stop.shopCluster);
      return place(stop.place || stop.leg?.to, stop.title, !stop.place && stop.leg ? '이동 구간의 도착지' : '선택한 날짜의 일정');
    }
    if (node.matches('#tripPlanPanel label')) {
      const input = node.querySelector('input');
      if (input?.name === 'plan-night') {
        const option = typeof shortStayOptions !== 'undefined' && shortStayOptions.find(o => o.id === input.value);
        return option ? place(option.query, option.hotel, option.name) : null;
      }
      if (input?.name === 'plan-hotel') {
        const hotel = typeof hotels !== 'undefined' && hotels[Number(input.value)];
        return hotel ? place(mapLinkQuery({href: hotel.url}), hotel.name, hotel.area) : null;
      }
      if (input?.name === 'plan-shops' && typeof shopClustersForPlan === 'function') {
        return clusterPlace(shopClustersForPlan(input.value)[0]);
      }
    }
    return null;
  }

  function showPlace(location) {
    caption.textContent = location.title;
    caption.title = location.title;
    detail.textContent = location.note || '카드를 가리키거나 터치해 위치 확인';
    openLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(location.query);
    openLink.hidden = false;
    panel.classList.add('has-location');
    if (lastQuery !== location.query) {
      frame.title = location.title + ' · Google 지도 미리보기';
      frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(location.query) + '&z=' + (location.zoom || 16) + '&hl=ko&output=embed';
      lastQuery = location.query;
    }
  }

  function showInitialPlace() {
    if (lastQuery) return;
    const hotel = typeof hotels !== 'undefined' ? hotels[typeof selectedHotel === 'number' ? selectedHotel : 0] : null;
    const note = '장소를 가리키거나 터치하면 위치가 바뀌어요.';
    const initial = hotel && place(hotel.query || mapLinkQuery({href: hotel.url}), hotel.name, note);
    showPlace(initial || {...place('Tokyo', '도쿄', note), zoom: 11});
  }

  function queuePlace(location, delay = 300) {
    if (location && pendingQuery === location.query) return;
    clearTimeout(pendingTimer);
    pendingQuery = location?.query || '';
    if (!location) return;
    pendingTimer = setTimeout(() => {
      pendingQuery = '';
      showPlace(location);
    }, delay);
  }

  // Geometry never depends on the sidebar or changes the map iframe's source.
  function bounds() {
    const viewport = window.visualViewport;
    const left = (viewport?.offsetLeft || 0) + 8;
    const top = (viewport?.offsetTop || 0) + 8;
    const right = left + (viewport?.width || innerWidth) - 16;
    let bottom = top + (viewport?.height || innerHeight) - 16;
    const nav = document.querySelector('.mobile-nav');
    if (nav && getComputedStyle(nav).display !== 'none') {
      const rect = nav.getBoundingClientRect();
      if (rect.top > top && rect.top < bottom && rect.bottom > top) bottom = rect.top - 8;
    }
    return {left, top, right, bottom, width: Math.max(1, right - left), height: Math.max(1, bottom - top)};
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

  function clampGeometry(value) {
    const area = bounds();
    const maxWidth = Math.min(area.width, desktop.matches ? 520 : Math.max(220, area.width * .85));
    const maxHeight = Math.min(area.height, desktop.matches ? 520 : Math.max(230, area.height * .65));
    const width = clamp(value.width, Math.min(200, maxWidth), maxWidth);
    const height = clamp(value.height, Math.min(190, maxHeight), maxHeight);
    return {
      width, height,
      x: clamp(value.x, area.left, area.right - width),
      y: clamp(value.y, area.top, area.bottom - (minimized ? Math.min(44, height) : height))
    };
  }

  function defaultGeometry() {
    const area = bounds();
    const width = desktop.matches ? 320 : 220;
    const height = desktop.matches ? 310 : 230;
    const gap = desktop.matches ? 16 : 4;
    return clampGeometry({x: area.right - width - gap, y: area.bottom - height - gap, width, height});
  }

  function renderGeometry() {
    geometry = clampGeometry(geometry);
    Object.assign(panel.style, {
      left: geometry.x + 'px', top: geometry.y + 'px',
      width: geometry.width + 'px', height: (minimized ? Math.min(44, geometry.height) : geometry.height) + 'px'
    });
  }

  function saveGeometry() {
    try { localStorage.setItem(storageKey, JSON.stringify(geometry)); } catch { /* Private browsing may disable storage. */ }
  }

  function positionPanel() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
      if (gesture) finishGesture();
      geometry = customGeometry ? clampGeometry(geometry) : defaultGeometry();
      renderGeometry();
    });
  }

  function finishGesture() {
    if (!gesture) return;
    const previous = gesture;
    gesture = null;
    if (previous.handle.hasPointerCapture(previous.id)) previous.handle.releasePointerCapture(previous.id);
    shield.hidden = true;
    panel.classList.remove('is-manipulating');
    saveGeometry();
  }

  function resizeGeometry(start, dx, dy, corner) {
    const area = bounds();
    if (corner === 'resize-nw') {
      const right = start.x + start.width, bottom = start.y + start.height;
      const size = clampGeometry({...start,
        width: Math.min(start.width - dx, right - area.left),
        height: Math.min(start.height - dy, bottom - area.top)
      });
      return {...size, x: right - size.width, y: bottom - size.height};
    }
    return {...start,
      width: Math.min(start.width + dx, area.right - start.x),
      height: Math.min(start.height + dy, area.bottom - start.y)
    };
  }

  function installHandle(handle, mode) {
    handle.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || gesture) return;
      event.preventDefault();
      handle.focus({preventScroll: true});
      gesture = {id: event.pointerId, handle, mode, x: event.clientX, y: event.clientY, initial: {...geometry}};
      handle.setPointerCapture(event.pointerId);
      shield.hidden = false;
      shield.style.cursor = mode === 'move' ? 'grabbing' : 'nwse-resize';
      panel.classList.add('is-manipulating');
    });
    handle.addEventListener('pointermove', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
      const start = gesture.initial;
      geometry = mode === 'move'
        ? {...start, x: start.x + dx, y: start.y + dy}
        : resizeGeometry(start, dx, dy, mode);
      customGeometry = true;
      renderGeometry();
    });
    for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      handle.addEventListener(eventName, finishGesture);
    }
    handle.addEventListener('keydown', event => {
      const direction = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]}[event.key];
      if (!direction) return;
      event.preventDefault();
      const step = event.shiftKey ? 40 : 10;
      const [dx, dy] = direction.map(value => value * step);
      if (mode === 'move') geometry = {...geometry, x: geometry.x + dx, y: geometry.y + dy};
      else geometry = resizeGeometry(geometry, dx, dy, mode);
      customGeometry = true;
      renderGeometry();
      saveGeometry();
    });
  }

  function init() {
    if (document.getElementById('hoverMinimap')) return;
    panel = document.createElement('aside');
    panel.id = 'hoverMinimap';
    panel.className = 'hover-minimap';
    panel.setAttribute('aria-label', '이동과 크기 조절이 가능한 장소 미니맵');
    panel.innerHTML = `<div class="hover-minimap-heading">
        <button type="button" class="hover-minimap-resize-nw" aria-label="미니맵 왼쪽 위 모서리 크기 조절" aria-describedby="hoverMinimapResizeNWHint" title="왼쪽 위로 드래그해 확대 · 왼쪽/위쪽 방향키: 확대"><span aria-hidden="true">◤</span></button>
        <button type="button" class="hover-minimap-drag" aria-label="미니맵 이동" aria-describedby="hoverMinimapMoveHint" title="드래그 또는 방향키로 이동 · Shift: 크게 이동">미니맵</button>
        <button type="button" class="hover-minimap-reset" aria-label="미니맵 위치와 크기 초기화" title="위치와 크기 초기화">↺</button>
        <button type="button" class="hover-minimap-toggle" aria-label="미니맵 접기" aria-expanded="true" aria-controls="hoverMinimapContent" title="미니맵 접기">−</button>
      </div>
      <div id="hoverMinimapContent" class="hover-minimap-content">
        <div class="hover-minimap-map"><div class="hover-minimap-placeholder"><span aria-hidden="true">⌖</span><p>궁금한 장소를 가리키거나 터치해보세요.</p></div><iframe title="장소 지도 미리보기" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1"></iframe></div>
        <div class="hover-minimap-caption"><strong id="hoverMinimapTitle" aria-live="polite" aria-atomic="true">장소를 가리키면 여기에서</strong><small>키보드로 링크를 선택해도 보여요.</small><a target="_blank" rel="noopener noreferrer" hidden>Google 지도에서 열기 ↗</a></div>
        <button type="button" class="hover-minimap-resize" aria-label="미니맵 크기 조절" aria-describedby="hoverMinimapResizeHint" title="모서리를 드래그하거나 방향키로 크기 조절 · Shift: 크게 조절"><span aria-hidden="true">◢</span></button>
      </div>
      <span class="hover-minimap-sr" id="hoverMinimapMoveHint">드래그하거나 방향키로 이동합니다. Shift와 방향키로 크게 이동합니다.</span>
      <span class="hover-minimap-sr" id="hoverMinimapResizeNWHint">왼쪽 위 모서리를 드래그합니다. 왼쪽과 위쪽 방향키로 확대하고 오른쪽과 아래쪽 방향키로 축소합니다. Shift와 방향키로 크게 조절합니다.</span>
      <span class="hover-minimap-sr" id="hoverMinimapResizeHint">드래그하거나 방향키로 너비와 높이를 조절합니다. Shift와 방향키로 크게 조절합니다.</span>`;
    shield = document.createElement('div');
    shield.className = 'hover-minimap-shield';
    shield.hidden = true;
    shield.setAttribute('aria-hidden', 'true');
    document.body.append(panel, shield);
    frame = panel.querySelector('iframe');
    caption = panel.querySelector('strong');
    detail = panel.querySelector('small');
    openLink = panel.querySelector('a');
    geometry = defaultGeometry();
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && ['x', 'y', 'width', 'height'].every(key => typeof saved[key] === 'number' && Number.isFinite(saved[key]))) {
        geometry = clampGeometry(saved);
        customGeometry = true;
      }
    } catch { /* Invalid or unavailable storage falls back to the default. */ }
    renderGeometry();
    installHandle(panel.querySelector('.hover-minimap-drag'), 'move');
    installHandle(panel.querySelector('.hover-minimap-resize'), 'resize');
    installHandle(panel.querySelector('.hover-minimap-resize-nw'), 'resize-nw');
    const toggle = panel.querySelector('.hover-minimap-toggle');
    function setMinimized(value) {
      minimized = value;
      panel.classList.toggle('is-minimized', value);
      panel.querySelector('.hover-minimap-content').hidden = value;
      toggle.setAttribute('aria-expanded', String(!value));
      toggle.setAttribute('aria-label', value ? '미니맵 펼치기' : '미니맵 접기');
      toggle.title = value ? '미니맵 펼치기' : '미니맵 접기';
      toggle.textContent = value ? '+' : '−';
      renderGeometry();
    }
    toggle.addEventListener('click', () => setMinimized(!minimized));
    panel.querySelector('.hover-minimap-reset').addEventListener('click', () => {
      customGeometry = false;
      minimized = false;
      geometry = defaultGeometry();
      setMinimized(false);
      try { localStorage.removeItem(storageKey); } catch { /* Optional persistence. */ }
    });
    document.addEventListener('pointerover', event => {
      if (event.pointerType !== 'touch' && !gesture) queuePlace(resolvePlace(event.target));
    });
    document.addEventListener('pointerout', event => {
      if (event.pointerType !== 'touch' && !gesture) queuePlace(resolvePlace(event.relatedTarget));
    });
    // Passive preview updates preserve links, photo buttons, and native scrolling.
    document.addEventListener('pointerup', event => {
      if (event.pointerType === 'touch' && !gesture) queuePlace(resolvePlace(event.target), 0);
    }, {passive: true});
    document.addEventListener('focusin', event => queuePlace(resolvePlace(event.target), 0));
    document.addEventListener('focusout', event => {
      if (!event.relatedTarget) queuePlace(null);
    });
    window.addEventListener('resize', positionPanel, {passive: true});
    window.addEventListener('orientationchange', positionPanel, {passive: true});
    window.visualViewport?.addEventListener('resize', positionPanel, {passive: true});
    window.visualViewport?.addEventListener('scroll', positionPanel, {passive: true});
    window.addEventListener('blur', finishGesture);
    desktop.addEventListener('change', positionPanel);
    showInitialPlace();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
