/* Three-video YouTube IFrame API jukebox. Playback state always comes from the player. */
(() => {
  'use strict';
  if (document.getElementById('tripJukebox')) return;
  const assetRoot = new URL('.', document.currentScript?.src || location.href);
  const tracks = [
    { id: 'l482T0yNkeo', title: 'Highway to Hell', artist: 'AC/DC', cover: 'jukebox-highway.jpg' },
    { id: '0zUJd-o0yMw', title: "Don’t Look Back Into the Sun", artist: 'The Libertines', cover: 'jukebox-libertines.jpg' },
    { id: 'QH6Xrtxi4N0', title: 'Late ’90s Britpop & Alternative Rock', artist: 'moumouplaylist · 믹스', cover: 'jukebox-britpop.jpg' }
  ];
  let trackIndex = 0;
  const VIDEO = tracks[0].id;
  const icons = {
    play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    next: '<path d="m6 5 10 7-10 7Z" fill="currentColor" stroke="none"/><path d="M19 5v14" stroke-width="2"/>',
    restart: '<path d="M4 10a8 8 0 1 1 1 7M4 4v6h6"/>',
    repeat: '<path d="m16 3 4 4-4 4M4 11V9a2 2 0 0 1 2-2h14M8 21l-4-4 4-4m12 0v2a2 2 0 0 1-2 2H4"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    external: '<path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7"/>'
  };
  const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
  const bar = document.createElement('section');
  bar.id = 'tripJukebox';
  bar.className = 'trip-jukebox';
  bar.setAttribute('aria-label', '여행 주크박스');
  bar.innerHTML = `
    <div class="jukebox-track"><img class="jukebox-cover" src="${new URL('decorations/jukebox-highway.jpg', assetRoot)}" width="48" height="48" alt="AC/DC Highway to Hell 영상 썸네일"><div class="jukebox-track-copy"><strong>Highway to Hell</strong><span><span class="jukebox-artist">AC/DC</span><small class="jukebox-order">1 / 3</small> <i class="jukebox-equalizer" aria-hidden="true"><b></b><b></b><b></b></i></span><small class="jukebox-status" role="status" aria-live="polite">음악 연결 중…</small></div></div>
    <div class="jukebox-controls"><button type="button" class="jukebox-button jukebox-restart" aria-label="처음부터 재생" title="처음부터 재생" disabled>${svg('restart')}</button><button type="button" class="jukebox-button jukebox-play" aria-label="음악 연결 중" title="음악 연결 중" disabled>${svg('play')}</button><button type="button" class="jukebox-button jukebox-next" aria-label="다음 곡" title="다음 곡" disabled>${svg('next')}</button><button type="button" class="jukebox-button jukebox-repeat" aria-label="전체 반복" title="전체 반복 켜짐" aria-pressed="true">${svg('repeat')}</button></div>
    <div class="jukebox-progress"><time class="jukebox-current">0:00</time><input class="jukebox-seek" type="range" min="0" max="1" step="1" value="0" aria-label="재생 위치" aria-valuetext="0분 0초" disabled><time class="jukebox-duration">–:––</time></div>
    <label class="jukebox-volume">${svg('volume')}<span class="jukebox-sr">음량</span><input type="range" min="0" max="100" value="35" aria-label="음량" disabled></label>
    <a class="jukebox-external" href="https://www.youtube.com/watch?v=${VIDEO}" target="_blank" rel="noopener noreferrer" aria-label="YouTube에서 Highway to Hell 열기" title="YouTube에서 열기">YouTube ${svg('external')}</a>`;
  const host = document.createElement('div');
  host.className = 'jukebox-video-host';
  host.setAttribute('aria-hidden', 'true');
  host.inert = true;
  document.body.append(host, bar);
  document.body.classList.add('has-jukebox');
  const $ = selector => bar.querySelector(selector);
  const play = $('.jukebox-play'), restart = $('.jukebox-restart'), repeat = $('.jukebox-repeat'), next = $('.jukebox-next');
  const seek = $('.jukebox-seek'), volume = $('.jukebox-volume input'), status = $('.jukebox-status');
  let player, ready = false, failed = false, playing = false, wantsPlay = true, repeating = true;
  let generation = 0, apiPromise, readyTimeout, attemptTimeout, seeking = false;
  let duration = 0, requestFrame = 0;
  let autoStartPending = true;
  const time = seconds => `${Math.floor(Math.max(0, seconds) / 60)}:${String(Math.floor(Math.max(0, seconds) % 60)).padStart(2, '0')}`;
  function setStatus(message) { if (status.textContent !== message) status.textContent = message; }
  function setPlaying(value) {
    playing = value;
    bar.classList.toggle('is-playing', value);
    play.innerHTML = svg(value ? 'pause' : 'play');
    play.setAttribute('aria-label', value ? '음악 일시정지' : failed ? '음악 연결 다시 시도' : '음악 재생');
    play.title = play.getAttribute('aria-label');
  }
  function showTrack() {
    const track = tracks[trackIndex];
    $('.jukebox-track-copy strong').textContent = track.title;
    $('.jukebox-artist').textContent = track.artist;
    $('.jukebox-order').textContent = `${trackIndex + 1} / ${tracks.length}`;
    const cover = $('.jukebox-cover');
    cover.src = new URL(`decorations/${track.cover}`, assetRoot);
    cover.alt = `${track.title} 영상 썸네일`;
    const link = $('.jukebox-external');
    link.href = `https://www.youtube.com/watch?v=${track.id}`;
    link.setAttribute('aria-label', `YouTube에서 ${track.title} 열기`);
    duration = 0; updateProgress(0); seek.disabled = true;
    $('.jukebox-duration').textContent = '–:––';
  }
  function nextTrack(manual = false) {
    if (manual && failed) {
      trackIndex = (trackIndex + 1) % tracks.length;
      showTrack(); connect(); return;
    }
    if (!ready || !player) return;
    if (!manual && trackIndex === tracks.length - 1 && !repeating) {
      wantsPlay = false; setPlaying(false); setStatus('재생목록 끝 · ▶ 다시 듣기'); return;
    }
    trackIndex = (trackIndex + 1) % tracks.length;
    autoStartPending = false; wantsPlay = true; setPlaying(false); showTrack();
    setStatus('다음 곡 연결 중…');
    try { player.loadVideoById(tracks[trackIndex].id); requestPlay(); }
    catch (_) { fail('다음 곡 연결 오류 · 다시 시도 / YouTube ↗'); }
  }
  function fail(message) {
    clearTimeout(readyTimeout); clearTimeout(attemptTimeout);
    failed = true; ready = false; wantsPlay = false; autoStartPending = false;
    setPlaying(false); setStatus(message);
    play.disabled = false; restart.disabled = true; next.disabled = false; seek.disabled = true; volume.disabled = true;
    play.innerHTML = svg('restart');
  }
  function blocked() {
    if (playing) return;
    clearTimeout(attemptTimeout); wantsPlay = false; setPlaying(false);
    setStatus(autoStartPending ? '화면을 터치하면 음악이 시작돼요' : '▶ 눌러 음악 시작');
  }
  function refreshTime() {
    if (!ready || !player) return;
    try {
      duration = Number(player.getDuration()) || 0;
      const current = Number(player.getCurrentTime()) || 0;
      $('.jukebox-duration').textContent = duration ? time(duration) : '–:––';
      seek.max = String(Math.max(1, duration)); seek.disabled = !duration;
      if (!seeking) updateProgress(current);
    } catch (_) { /* Player may be being recreated by retry. */ }
  }
  function updateProgress(current) {
    seek.value = String(current);
    seek.style.setProperty('--seek-progress', `${duration ? Math.min(100, current / duration * 100) : 0}%`);
    seek.setAttribute('aria-valuetext', `${Math.floor(current / 60)}분 ${Math.floor(current % 60)}초`);
    $('.jukebox-current').textContent = time(current);
  }
  function requestPlay() {
    if (!ready || !player) return;
    wantsPlay = true; setStatus('재생 준비 중…');
    try {
      player.playVideo();
      clearTimeout(attemptTimeout);
      attemptTimeout = setTimeout(() => {
        if (!playing && wantsPlay) {
          // Slow buffering is not a rejection: keep the requested playback alive.
          setStatus(autoStartPending ? '화면을 터치해 음악 시작' : '불러오는 중… · 다음 곡 / YouTube ↗');
        }
      }, 10000);
    } catch (_) { fail('연결 오류 · 다시 시도 또는 YouTube ↗'); }
  }
  function loadApi() {
    if (window.YT?.Player) return Promise.resolve();
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      let script, timer;
      const done = () => { clearTimeout(timer); resolve(); };
      window.onYouTubeIframeAPIReady = () => {
        try { if (typeof previous === 'function') previous(); } finally { done(); }
      };
      // A failed tag owned by this component can safely be replaced for retry.
      document.querySelector('script[data-trip-jukebox-api]')?.remove();
      script = document.createElement('script'); script.src = 'https://www.youtube.com/iframe_api';
      script.async = true; script.dataset.tripJukeboxApi = 'true';
      script.onerror = () => { clearTimeout(timer); apiPromise = null; script.remove(); reject(new Error('YouTube API unavailable')); };
      timer = setTimeout(() => { apiPromise = null; script.remove(); reject(new Error('YouTube API timeout')); }, 15000);
      document.head.append(script);
    });
    return apiPromise;
  }
  async function connect() {
    const currentGeneration = ++generation;
    clearTimeout(readyTimeout); clearTimeout(attemptTimeout);
    failed = false; ready = false; wantsPlay = true; autoStartPending = true; setPlaying(false);
    setStatus('음악 연결 중…'); play.disabled = true; restart.disabled = true; next.disabled = true; seek.disabled = true;
    try { player?.destroy(); } catch (_) { /* Already removed. */ }
    player = null; host.replaceChildren();
    try {
      await loadApi();
      if (currentGeneration !== generation) return;
      const mount = document.createElement('div'); host.append(mount);
      readyTimeout = setTimeout(() => { if (currentGeneration === generation && !ready) fail('연결이 지연돼요 · 다시 시도 / YouTube ↗'); }, 15000);
      player = new YT.Player(mount, {
        width: 200, height: 200, videoId: tracks[trackIndex].id,
        playerVars: { autoplay: 1, playsinline: 1, controls: 0, disablekb: 1, fs: 0, origin: location.origin },
        events: {
          onReady(event) {
            if (currentGeneration !== generation || failed) return;
            clearTimeout(readyTimeout); ready = true;
            const iframe = event.target.getIframe(); iframe.tabIndex = -1; iframe.setAttribute('aria-hidden', 'true');
            event.target.setVolume(Number(volume.value));
            play.disabled = false; restart.disabled = false; next.disabled = false; volume.disabled = false;
            refreshTime(); requestPlay();
          },
          onStateChange(event) {
            if (currentGeneration !== generation || failed) return;
            const state = event.data;
            if (state === 1) {
              // A delayed response must not override an explicit pause or blocked playback.
              if (!wantsPlay) { event.target.pauseVideo(); return; }
              autoStartPending = false;
              clearTimeout(attemptTimeout); setPlaying(true); setStatus('재생 중'); refreshTime();
            } else if (state === 2) {
              if (autoStartPending) { blocked(); return; }
              clearTimeout(attemptTimeout); wantsPlay = false; setPlaying(false); setStatus('일시정지'); refreshTime();
            } else if (state === 0) {
              setPlaying(false); refreshTime();
              if (wantsPlay) nextTrack();
            } else if (state === 3) { setPlaying(false); if (wantsPlay) setStatus('버퍼링 중…'); }
            else if (state === 5 && !wantsPlay) { setPlaying(false); setStatus('▶ 눌러 음악 시작'); }
          },
          onAutoplayBlocked() { if (currentGeneration === generation && !failed) blocked(); },
          onError(event) {
            if (currentGeneration !== generation) return;
            const message = [100, 101, 150].includes(event.data) ? '이 영상은 여기서 재생할 수 없어요 · YouTube ↗' : event.data === 153 ? 'YouTube 연결을 확인해 주세요 · 다시 시도 / YouTube ↗' : '음악 연결 오류 · 다시 시도 / YouTube ↗';
            fail(message);
          }
        }
      });
    } catch (_) { if (currentGeneration === generation) fail('음악 연결 실패 · 다시 시도 / YouTube ↗'); }
  }
  play.addEventListener('click', () => {
    if (failed) { connect(); return; }
    if (!ready) return;
    autoStartPending = false;
    if (playing || wantsPlay) { wantsPlay = false; clearTimeout(attemptTimeout); player.pauseVideo(); setPlaying(false); setStatus('일시정지'); }
    else requestPlay();
  });
  restart.addEventListener('click', () => { if (ready) { autoStartPending = false; player.seekTo(0, true); updateProgress(0); requestPlay(); } });
  // Retry blocked startup in a real click/tap or keyboard gesture. Explicit pauses stay paused.
  function startOnInteraction(event) {
    if (!event.isTrusted || !autoStartPending || !ready || failed || playing || bar.contains(event.target)) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    autoStartPending = false;
    requestPlay();
  }
  document.addEventListener('click', startOnInteraction, true);
  document.addEventListener('keydown', startOnInteraction, true);
  next.addEventListener('click', () => nextTrack(true));
  repeat.addEventListener('click', () => {
    repeating = !repeating; repeat.setAttribute('aria-pressed', String(repeating));
    repeat.title = repeating ? '전체 반복 켜짐' : '전체 반복 꺼짐';
  });
  seek.addEventListener('input', () => { seeking = true; updateProgress(Number(seek.value)); });
  seek.addEventListener('change', () => {
    seeking = false;
    if (ready) { const resume = wantsPlay; player.seekTo(Number(seek.value), true); if (!resume) player.pauseVideo(); }
  });
  seek.addEventListener('blur', () => { seeking = false; });
  volume.addEventListener('input', () => { if (ready) player.setVolume(Number(volume.value)); });
  // Nothing here resumes music on scrolling, tab focus, or viewport changes.
  setInterval(refreshTime, 500);
  let lastLayout = '';
  function measure() {
    requestFrame = 0;
    const nav = document.querySelector('.mobile-nav');
    const navVisible = nav && getComputedStyle(nav).display !== 'none';
    const bottom = navVisible ? Math.max(0, Math.ceil(innerHeight - nav.getBoundingClientRect().top)) : 0;
    const height = Math.ceil(bar.getBoundingClientRect().height);
    const signature = `${height}:${bottom}`;
    if (signature === lastLayout) return;
    lastLayout = signature;
    document.documentElement.style.setProperty('--jukebox-height', `${height}px`);
    document.documentElement.style.setProperty('--jukebox-bottom', `${bottom}px`);
    window.dispatchEvent(new CustomEvent('jukeboxlayout', { detail: { height, bottom } }));
  }
  function queueMeasure() { if (!requestFrame) requestFrame = requestAnimationFrame(measure); }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(queueMeasure); observer.observe(bar);
    const nav = document.querySelector('.mobile-nav'); if (nav) observer.observe(nav);
  }
  window.addEventListener('resize', queueMeasure);
  window.visualViewport?.addEventListener('resize', queueMeasure);
  measure(); connect();
})();
