/* A small, persistent location preview. Queries come from the existing itinerary. */
(() => {
  'use strict';

  const placeSelector = [
    '[data-mini-query]', '[data-minimap-query]', '.store-option-card', '.food-guide-card', '.day-food-pick',
    '.hotel-card', '.overnight-card', '.discovery-card', '.route-point', '.route-leg',
    '.stop[data-stop]', '[data-food-jump]', '[data-shop-activity-jump]', '#tripPlanPanel label'
  ].join(',');
  const desktop = matchMedia('(min-width:761px)');
  let panel, frame, caption, detail, openLink, sidebar;
  let pendingTimer, pendingQuery = '', lastQuery = '', layoutFrame;

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
    detail.textContent = location.note || '카드에 마우스를 올려 위치 확인';
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
    if (!desktop.matches || lastQuery) return;
    const hotel = typeof hotels !== 'undefined' ? hotels[typeof selectedHotel === 'number' ? selectedHotel : 0] : null;
    const note = '장소에 마우스를 올리면 위치가 바뀌어요.';
    const initial = hotel && place(hotel.query || mapLinkQuery({href: hotel.url}), hotel.name, note);
    showPlace(initial || {...place('Tokyo', '도쿄', note), zoom: 11});
  }

  function queuePlace(location, delay = 300) {
    if (!desktop.matches) return;
    if (location && pendingQuery === location.query) return;
    clearTimeout(pendingTimer);
    pendingQuery = location?.query || '';
    if (!location) return;
    pendingTimer = setTimeout(() => {
      pendingQuery = '';
      showPlace(location);
    }, delay);
  }

  function positionPanel() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
      if (!desktop.matches) return;
      const rect = sidebar.getBoundingClientRect();
      panel.style.left = rect.left + 12 + 'px';
      panel.style.width = Math.max(120, rect.width - 24) + 'px';
      panel.style.bottom = Math.max(12, innerHeight - rect.bottom + 12) + 'px';
      sidebar.style.setProperty('--hover-minimap-clearance', panel.getBoundingClientRect().height + 24 + 'px');
    });
  }

  function init() {
    sidebar = document.querySelector('.sidebar');
    if (!sidebar || document.getElementById('hoverMinimap')) return;
    panel = document.createElement('aside');
    panel.id = 'hoverMinimap';
    panel.className = 'hover-minimap';
    panel.setAttribute('aria-label', '가리킨 장소의 미니맵');
    panel.innerHTML = `<div class="hover-minimap-heading"><span aria-hidden="true">⌖</span> 장소 미니맵</div>
      <div class="hover-minimap-map"><div class="hover-minimap-placeholder"><span aria-hidden="true">⌖</span><p>궁금한 장소에<br>마우스를 올려보세요.</p></div><iframe title="장소 지도 미리보기" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1"></iframe></div>
      <div class="hover-minimap-caption"><strong id="hoverMinimapTitle" aria-live="polite" aria-atomic="true">장소를 가리키면 여기에서</strong><small>키보드로 링크를 선택해도 보여요.</small><a target="_blank" rel="noopener noreferrer" hidden>Google 지도에서 열기 ↗</a></div>`;
    document.body.append(panel);
    sidebar.classList.add('has-hover-minimap');
    frame = panel.querySelector('iframe');
    caption = panel.querySelector('strong');
    detail = panel.querySelector('small');
    openLink = panel.querySelector('a');
    document.addEventListener('pointerover', event => {
      if (event.pointerType !== 'touch') queuePlace(resolvePlace(event.target));
    });
    document.addEventListener('pointerout', event => {
      if (event.pointerType !== 'touch') queuePlace(resolvePlace(event.relatedTarget));
    });
    document.addEventListener('focusin', event => queuePlace(resolvePlace(event.target), 0));
    document.addEventListener('focusout', event => {
      if (!event.relatedTarget) queuePlace(null);
    });
    window.addEventListener('resize', positionPanel, {passive: true});
    desktop.addEventListener('change', () => {
      clearTimeout(pendingTimer);
      pendingQuery = '';
      showInitialPlace();
      positionPanel();
    });
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(positionPanel);
      observer.observe(sidebar);
      observer.observe(panel);
    }
    showInitialPlace();
    positionPanel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
