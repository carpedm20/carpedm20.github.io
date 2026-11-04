# Jukebox playback

Updated 2026-11-04. User-selected video order:

1. https://www.youtube.com/watch?v=l482T0yNkeo — AC/DC, Highway to Hell
2. https://www.youtube.com/watch?v=0zUJd-o0yMw — The Libertines, Don't Look Back Into the Sun (translated upload by ToBe 카인드)
3. https://www.youtube.com/watch?v=QH6Xrtxi4N0 — Late '90s Britpop & Alternative Rock (moumouplaylist, a full mix video)

Titles, upload identities and thumbnail URLs verified using YouTube's public oEmbed responses. Thumbnails are stored locally; playback remains with YouTube's IFrame API. No audio is extracted.

The three-video queue repeats by default. Next wraps to the first entry; disabling repeat stops automatic progression after the third video. Controls and title/thumbnail/source URL follow the current video.

Startup requests audible autoplay (`autoplay: 1` and `playVideo` on ready). If browser policy blocks it, the first real page click/tap or Enter/Space retries once, or the play button starts it. Scrolling and synthetic events do not unlock playback. Explicit pause cancels pending automatic startup; later interactions do not resume it. Slow buffering keeps playback intent alive; only an explicit browser rejection or user pause cancels it.

Primary technical references:
- https://developers.google.com/youtube/iframe_api_reference
- https://developer.chrome.com/blog/autoplay/

Live browser checks: second video playback, second-to-third progression, third-to-first wrap after seeking near the actual end, next button, explicit pause persisting across page interaction, 320/390px controls and minimap/mobile-navigation bounds. Full uninterrupted playback of the 67-minute mix was not run.
