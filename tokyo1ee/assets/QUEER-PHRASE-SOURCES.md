# Japanese phrase accordion and queer vocabulary

Checked 2026-11-04. Educational, non-graphic vocabulary with Japanese spelling, hiragana readings and approximate Korean pronunciation. Added 21 cards in category 09; the original 42 travel phrase cards are moved intact into native disclosure groups.

## Primary/community sources

- [Waseda University, ジェンダーについて丸分かり！](https://www.waseda.jp/inst/weekly/feature/2023/11/27/114360/) — university LGBTQ+ center-backed terminology explicitly defines bisexual attraction as encompassing two or more gender identities; used for the inclusive Korean definition.

- [NPO にじいろ学校, 用語一覧](https://www.nijikou.com/%E7%94%A8%E8%AA%9E%E4%B8%80%E8%A6%A7/) — identity, attraction and coming-out vocabulary; explicitly acknowledges varying individual usage. Used for バイセクシュアル, レズビアン, ゲイ and ヘテロセクシュアル.
- [PRIDE JAPAN / OUT JAPAN, クィア](https://www.outjapan.co.jp/pride_japan/glossary/ka/9.html) — queer as identity/umbrella vocabulary.
- [Bians note, レズビアンのタチって？当事者が解説します](https://bians-note.com/column/tachi/) — a lesbian writer’s explanation of タチ, ネコ, バリタチ, leaning roles, フェム and ボイ. Only lexical distinctions are used; dating, appearance and payment stereotypes in the source are not reproduced.
- [g-lad xx, リバ](https://gladxx.jp/extra/terms/terms_ra/131.html) — リバ, バリタチ, バリネコ and leaning-role terms. No prevalence claims or assumptions about any person are reproduced.
- [PRIDE JAPAN / OUT JAPAN, カミングアウト](https://www.outjapan.co.jp/pride_japan/glossary/ka/2.html) — voluntary disclosure, open and closet context. Japanese full-sentence descriptions are provided because disclosure differs by audience.
- [PRIDE JAPAN / OUT JAPAN, バイセクシュアル](https://www.outjapan.co.jp/pride_japan/glossary/ha/5.html) — bisexuality as its own identity rather than a transitional identity or sexual role.

## Translation choices

- Korean 탑/깁 → タチ and 바텀/텀/텍 → ネコ/ウケ are contextual approximations, not universal one-to-one translations. Give/take in the lesbian context and top/bottom in other communities can refer to different practices; the page says so without graphic descriptions.
- 온깁 / 온텍 use verified バリタチ / バリネコ. Searches did not substantiate オンタチ / オンネコ as general Japanese equivalents, so those were not invented.
- リバ describes roles, not bisexual identity. Femininity, masculinity and hair length do not establish a person’s orientation or role.
- 긴머 / 짧머 use ordinary ロングヘア / ショートヘア. 긴머부 / 짧머부 are not assumed to equal フェム / ボイ.
- 오픈 / 벽장 use カミングアウトしている / カミングアウトしていない, with オープン / クローゼット visible and separately read out in the notes.
- 식 / 노식 are conveyed through ordinary タイプ / タイプではない. 일스·일틱·끼·끼순이·기갈·걸커 are explicitly not forced into invented Japanese slurs or stereotypes.
- 平日休みです and 土日休みです are ordinary scheduling phrases, not queer jargon. Hair, preferences, scheduling and clarification sentences are editorial translations, not quotations from community glossaries.
- Source badges open the supporting pages in new tabs. No copy-to-clipboard handlers, external trackers or storage are added.

## Implementation and validation

- Files: `phrase-accordion.js` and `phrase-accordion.css`; parent adds references to the page.
- Progressive enhancement with idempotent initialization: the original eight groups start closed; category 09 starts open on each page load. Each can be independently expanded using native details/summary keyboard behavior.
- Original phrase cards retained as DOM nodes with their content unchanged; original category IDs retained on summary labels. Total label updated to 42 travel phrases + 21 vocabulary/sentence cards.
- `node --check` passed.
- Agent-browser fixture built from the actual `#fieldHelp` markup and both phrase stylesheets. Verified all nine initial states, original 42-card count, Enter-key expansion, source-link targets/rel attributes and readings on all 21 new cards.
- At 390 px viewport: no horizontal overflow; category summary minimum height 67 px and source badges 44 px. Desktop fixture also showed no overflow.
