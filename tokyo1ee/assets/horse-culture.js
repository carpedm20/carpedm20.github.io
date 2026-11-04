/* User-suggested horse culture stops. Sources checked 2026-11-04. */
const horseCafe = {
  id: 'bafunyasai-omotesando', day: 3, slot: 'harajuku', planAreas: ['base', 'fashion'],
  name: 'BAFUNYASAI TCC CAFE · 말 콘셉트 카페',
  query: 'BafunYasai TCC CAFE 東京都渋谷区神宮前5-12-8 神宮前HAMAYAビル 2F',
  area: '하라주쿠·오모테산도 · 진구마에 5-12-8 · 2층', category: '앉아서 · 말 문화 · 30–45분',
  menu: [
    {ko: '말 쿠키 커피 플로트 또는 멜론 크림소다', jp: 'コーヒーフロート / メロンクリームソーダ'},
    {ko: '직접 만든 당근 케이크 + 따뜻한 카페라테', jp: '自家製にんじんケーキ + カフェラテ（HOT）'},
    {ko: '안주가 당기면 통양송이 아히요 + 에비스 생맥주', jp: 'まるごとマッシュルームのアヒージョ + エビス生ビール'},
    {ko: '식사를 겸하면 버섯·닭고기 페페론치노', jp: 'キノコと鶏ひき肉のペペロンチーノ'},
    {ko: '둘이 나눌 허브 감자 샐러드', jp: '大人のハーブポテトサラダ'}
  ],
  why: '은퇴 경주마 지원과 연결된 카페. 말 퇴비로 기른 채소를 식재료로 쓰고, 말 관련 책·오리지널 굿즈와 실내 디자인을 둘러볼 수 있어요. 실제 말을 만나는 체험은 아니에요. 둘이 플로트와 크림소다를 하나씩 고르거나, 따뜻한 라테와 케이크로 쉬어가요. 굿즈 재고·말 쿠키 제공 여부는 당일 확인. 캐시리스 결제만 가능해요.',
  placementKo: '1/2 하라주쿠 빈티지 숍 → 이 카페에서 휴식 → 캣스트리트·시부야. 아오야마 디자인 코스에서는 오모테산도 구경 중 선택해요. CHAVATY 등 기존 카페와 모두 돌기보다 한 곳을 골라요.',
  walkKo: '메이지진구마에역 도보 약 5분 · 하라주쿠·오모테산도역 약 7–8분. 쇼핑 동선 중 휴식 후보.',
  source: 'https://www.instagram.com/bafunyasai_tcc_cafe/',
  menuSource: 'https://tabelog.com/tokyo/A1306/A130601/13284573/dtlmenu/',
  holidayNote: '2027.1.2 영업 미확인. 평소 토요일 11:30–21:00, 16–17시는 음료·디저트만 제공(매장 등록 정보). 연초 특별영업·메뉴는 공식 Instagram에서 확인한 뒤 방문해요.',
  photo: {
    src: 'assets/photos/horse-bafun-interior.webp', width: 736, height: 552,
    url: 'https://prcdn.freetls.fastly.net/release_image/116137/3/116137-3-85d5e1768df1114875a99219ed5dd5de-736x552.jpg',
    source: 'https://prtimes.jp/main/html/rd/p/000000003.000116137.html',
    credit: 'TCC Japan · 2023년 공식 개점 자료', alt: 'BAFUNYASAI의 목재 테이블과 식물이 보이는 실내 · 2023년 공식 사진'
  }
};
streetSnackStops.push(horseCafe);
tripPhotos['street-' + horseCafe.id] = {...horseCafe.photo, title: horseCafe.name, caption: horseCafe.photo.alt};
const horseCafeMenuPhoto = {
  key: 'cafe-menu-bafun-ajillo', title: '통양송이 아히요와 바게트', jp: 'まるごとマッシュルームのアヒージョ', menuIndexes: [2],
  src: 'assets/photos/horse-bafun-ajillo.webp', width: 850, height: 638,
  url: 'https://prcdn.freetls.fastly.net/release_image/116137/3/116137-3-ae6cbc0e9101f5d5c24563da42572b56-1280x960.jpg',
  source: 'https://prtimes.jp/main/html/rd/p/000000003.000116137.html', credit: 'TCC Japan · 2023년 공식 음식 사진',
  caption: '2023년 공식 사진 · 현재 메뉴에도 통양송이 아히요가 있으나 구성·그릇은 달라질 수 있어요.'
};
const horseCafeExtraPhotos = [
  {key:'cafe-menu-bafun-pasta',title:'버섯 파스타 · 플레이팅 참고',jp:'キノコのパスタ',menuIndexes:[3],src:'assets/photos/horse-bafun-pasta.webp',width:850,height:638,url:'https://prcdn.freetls.fastly.net/release_image/116137/3/116137-3-85a42a4e95ea01ae3214b4dfa2d48c8b-3024x2268.jpg',source:'https://prtimes.jp/main/html/rd/p/000000003.000116137.html',credit:'TCC Japan · 2023년 공식 음식 사진',caption:'2023년 개점 자료의 버섯 파스타. 현재 메뉴는 버섯·닭고기 페페론치노이며 당시 사진과 구성·곁들임이 다를 수 있어요.'},
  {key:'cafe-menu-bafun-potato',title:'감자 샐러드 · 플레이팅 참고',jp:'ポテトサラダ',menuIndexes:[4],src:'assets/photos/horse-bafun-potato.webp',width:850,height:638,url:'https://prcdn.freetls.fastly.net/release_image/116137/3/116137-3-2d325658a0f1eeebd0b7422cef4a9987-1109x832.jpg',source:'https://prtimes.jp/main/html/rd/p/000000003.000116137.html',credit:'TCC Japan · 2023년 공식 음식 사진',caption:'2023년 개점 자료의 감자 샐러드. 현재 허브 감자 샐러드와 토핑·양이 다를 수 있어요.'}
];
cafeMenuPhotos[horseCafe.id] = [horseCafeMenuPhoto,...horseCafeExtraPhotos];
for(const photo of horseCafeExtraPhotos)tripPhotos[photo.key]={...photo};
tripPhotos[horseCafeMenuPhoto.key] = {...horseCafeMenuPhoto};
tripPhotos['horse-gatej'] = {
  title: 'Gate J. Tokyo · 말 로봇과 자료 공간', src: 'assets/photos/horse-gatej.jpg', width: 520, height: 270,
  url: 'https://hibiya-fort-tower.com/lib/img/pages/gatej-tokyo/img01.jpg', source: 'https://hibiya-fort-tower.com/gatej-tokyo/',
  credit: 'Hibiya Fort Tower · 공식 시설 사진', caption: '등신대 말 로봇과 자료 공간. 실제 말이 아닌 전시물이에요.'
};
function renderNearbyHorseStop(stop) {
  if (day !== 1 || stop.foodId !== 'kushikatsu-tanaka-shimbashi') return '';
  return `<section class="street-snack-options horse-culture-options" aria-label="신바시 근처 말 문화 공간">
    <header class="street-snack-heading"><h4>지나가는 길 · 말 문화 공간</h4><p>12/31 신바시 동선 근처지만, 연말연시 휴관으로 이번 방문은 보류해요.</p></header>
    <article class="street-snack-card horse-culture-card" data-mini-query="Gate J. Tokyo 日比谷フォートタワー 地下1階 西新橋1-1-1" data-mini-name="Gate J. Tokyo · 연말연시 휴관" data-mini-note="신바시역 도보 약 7분 · 이번 여행 방문 보류">
      <button type="button" class="street-snack-photo" data-photo="horse-gatej" aria-label="Gate J. 내부 사진 크게 보기"><img src="assets/photos/horse-gatej.jpg" width="520" height="270" loading="lazy" alt="Gate J.의 등신대 말 로봇과 자료 공간"><span aria-hidden="true">⤢</span></button>
      <div class="street-snack-copy"><span class="street-snack-mode">무료 · 전시·책·굿즈 · 방문 보류</span><h5>Gate J. Tokyo</h5>
      <p class="street-snack-placement">신바시역 → 도보 약 7분 → 히비야 포트 타워 B1. 도라노몬역에서는 약 3분이에요. 이전 신바시 시설 대신 2021년 이전한 현재 주소로 안내해요.</p>
      <p>등신대 말 로봇, 말·경마 관련 도서와 자료, 굿즈 코너를 둘러보는 작은 무료 공간. 평일에 다시 온다면 20–30분 들르기 좋아요.</p>
      <ul><li><strong>유도마의 매력</strong><span>공식 전시: 2026.10.26–2027.1월 하순 예정</span></li><li><strong>내가 사랑하는 최강 마일러</strong><span>공식 전시: 2026.10.26–2027.2월 하순 예정</span></li></ul>
      <p class="street-snack-holiday"><strong>연말연시 휴관 · 경로와 방문 체크리스트에는 포함하지 않았어요.</strong> 평소 평일 11–19시, 토·일·공휴일·연말연시 휴관. 2026–27 상세 휴관일은 아직 확인되지 않았고, 전시 기간 안이라도 휴관일에는 볼 수 없어요. 개관이 별도로 확인되는 경우에만 들러요.</p>
      <div class="street-snack-links"><a href="https://www.gatej.jp/tokyo/" target="_blank" rel="noopener noreferrer">공식 전시·휴관 안내 ↗</a><a href="${maps('Gate J. Tokyo 日比谷フォートタワー 地下1階 西新橋1-1-1')}" target="_blank" rel="noopener noreferrer">현재 위치 ↗</a><a href="https://hibiya-fort-tower.com/gatej-tokyo/" target="_blank" rel="noopener noreferrer">시설·사진 출처 ↗</a></div></div>
    </article></section>`;
}
