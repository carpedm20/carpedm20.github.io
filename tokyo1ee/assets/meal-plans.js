/* Lunch and dinner choices shared by the daily cards and timeline. */
const mealPlans = [
  {
    lunch: {time:'14:00', end:'14:50', ids:['tamagoken-akihabara','nakau-akihabara'], note:'도착 후 아키하바라에서 늦은 점심. 오므라이스 또는 오야코동 중 한 곳을 고르고 쇼핑을 시작해요.'},
    dinner: {time:'18:00', end:'19:30', ids:['spice-palette','ichimi-reirei'], note:'아키하바라 카레 또는 숙소로 돌아오는 신바시 교자. 스파이스 팔레트는 연말연시 휴무 안내가 있어 12/30 영업 확인 후에만 선택해요.'}
  },
  {
    lunch: {time:'10:30', end:'11:10', ids:['shinpachi-daimon','butadaigaku-shimbashi'], note:'코미케 출발 전에 이른 점심을 먹어요. 다이몬 생선구이 정식 또는 신바시 돼지고기 덮밥 중 한 곳. 대기가 길면 포장 식사로 바꾸고 11:30 이동을 지켜요.'},
    dinner: {time:'18:30', end:'20:00', ids:['kushikatsu-tanaka-shimbashi','lion-ginza-seven'], note:'행사 후 신바시 쿠시카츠 또는 긴자 7초메 라이온의 식사 메뉴. 라이온은 신바시에서 추가 도보 이동이 필요해요.'}
  },
  {
    lunch: {time:'14:00', end:'15:30', ids:['harmony','bubbys-shiodome'], note:'시오도메에서 HARMONY 뷔페 또는 Bubby’s 브런치. HARMONY는 2027년 신년 회차와 예약을 확인하고, Bubby’s는 시설의 1/1 영업을 확인해요.'},
    dinner: {time:'18:30', end:'19:45', ids:['ootoya-fresa-shimbashi','kisoji-shimbashi'], note:'호텔 휴식 후 신바시에서 오오토야 정식 또는 기소지 샤부샤부. 기소지는 신년 특별시간·서비스료와 예약을 확인해요.'}
  },
  {
    lunch: {time:'점심', ids:['harakado','ohno-harajuku'], note:'하라주쿠에서 돈카츠 또는 로스트비프 덮밥. 쇼핑 전에 한 곳을 고르고, 줄이 길면 다른 후보로 바꿔요.'},
    dinner: {time:'18:30', end:'20:00', ids:['kirin-shibuya','soffitta-shibuya'], note:'시부야에서 기린 시티 소시지 또는 라 소피타 피자·파스타. 점심과 다른 메뉴를 골라요.'}
  },
  {
    lunch: {time:'14:10', end:'15:00', ids:['ariso-haneda','tsurutontan-haneda'], note:'고탄다에서는 가볍게 쉬고 하네다 T3 도착 후 늦은 점심. 보안검색 전 4층에서 초밥 또는 우동 중 한 곳을 골라요.'},
    dinner: {time:'16:45', end:'17:30', ids:['hyakuzen-haneda','nanrinka-haneda'], note:'19:30 T3 출발을 가정한 이른 저녁. 보안검색 전 4층의 햐쿠젠 정식 또는 난린카 중화요리. 항공사 수속·보안검색 마감을 먼저 확인하고, 시간이 빠듯하면 식당 대기 대신 포장·출국장 식사로 바꿔요.'}
  }
];
const mealLabels = {lunch:'점심', dinner:'저녁'};
function mealsForDay(di) {
  const plan = Object.fromEntries(Object.entries(mealPlans[di]).map(([key,meal])=>[key,{...meal,ids:[...meal.ids]}]));
  if(di===3 && !['base','fashion'].includes(planChoices.shops)) {
    plan.lunch.ids = planChoices.shops==='local' ? ['lug-hatagaya','soffitta-shibuya'] : ['soffitta-shibuya','kabenoana-shibuya'];
    plan.lunch.note = planChoices.shops==='local'
      ? '하타가야 LUG에서 식사 메뉴를 고르거나, 시부야 라 소피타에서 먼저 점심 후 하타가야로 이동해요. 라 소피타는 탐방 구역 밖의 대안이에요.'
      : '시부야 라 소피타 또는 벽의 구멍에서 먼저 점심 후 선택한 탐방 동네로 이동해요. 에비스·나카메구로·동쪽 도쿄 안의 식당은 아니므로 추가 이동 시간을 남겨요.';
    // Keep lunch and dinner as separate meals even when Shibuya is the lunch starting point.
    plan.dinner.ids = ['kirin-shibuya','roven-shibakoen'];
    plan.dinner.note = '시부야 기린 시티에서 저녁 또는 숙소 쪽 시바코엔 로벤에서 함박스테이크. 로벤은 연말연시 휴무 안내가 있어 영업 확인 후 선택해요.';
  }
  if(di===4 && planChoices.night!=='base') {
    plan.lunch.time='15:10'; plan.lunch.end='15:50';
    plan.lunch.note='테마룸 퇴실·짐 찾기 후 약 15시 하네다 T3 도착 기준의 늦은 점심. 아리소 초밥 또는 츠루톤탄 우동을 가볍게 먹고, 저녁 양은 배고픔에 맞춰 조절해요.';
  }
  return plan;
}
function mealStop(di,key,previous={}) {
  const meal=mealsForDay(di)[key], food=foods.find(f=>f.id===meal.ids[0]);
  return {...previous,t:meal.time,end:meal.end,title:mealLabels[key]+' 후보 · '+food.name.split(' · ')[0],cat:'식사',desc:meal.note,place:food.query,book:previous.foodId===food.id&&previous.book?previous.book:food.menu,foodId:food.id,meal:key,mealCandidates:meal.ids,checkId:previous.checkId||'meal-'+key,hideScenePhoto:false};
}
function applyDailyMeals(di,d) {
  const replace=(id,key)=>{const i=d.stops.findIndex(s=>s.foodId===id);if(i>=0)d.stops[i]=mealStop(di,key,d.stops[i]);};
  if(di===0) {d.stops.splice(4,0,mealStop(di,'lunch'));replace('spice-palette','dinner');}
  if(di===1) {d.stops[0].end='10:00';d.stops.splice(1,0,mealStop(di,'lunch'));replace('kushikatsu-tanaka-shimbashi','dinner');}
  if(di===2) {
    replace('harmony','lunch');
    const rest=d.stops.find(s=>s.title==='호텔 휴식·저녁 자유식');
    if(rest){rest.title='호텔 휴식';rest.desc='점심 후 숙소에서 쉬고 18:30 신바시 저녁 식사로 나가요.';rest.end='18:00';}
    d.stops.push(mealStop(di,'dinner'));
  }
  if(di===3) {
    if(['books','east'].includes(planChoices.shops)) {
      d.stops[0].title='점심을 먹으러 시부야로 이동';
      d.stops[0].desc='시부야에서 점심 후 선택한 탐방 동네로 이동해요. 동쪽 도쿄를 고르면 이동이 길어지므로 오후에는 한 구역만 방문해요.';
    }
    const i=d.stops.findIndex(s=>s.t==='점심');
    if(i>=0)d.stops[i]=mealStop(di,'lunch',d.stops[i]);
    replace('kirin-shibuya','dinner');
  }
  if(di===4) {
    replace('ariso-haneda','lunch');
    const snack=d.stops.find(s=>s.title==='고탄다에서 가벼운 간식');
    if(snack){snack.cat='휴식';snack.desc='공항에서 늦은 점심을 먹기 전 가볍게 쉬어요. 배고프면 작은 간식을 곁들여요.';}
    d.stops.splice(d.stops.findIndex(s=>s.cat==='항공'),0,mealStop(di,'dinner'));
  }
  return d;
}
function renderMealCandidateLinks(stop) {
  return `<nav class="meal-candidate-links" aria-label="${mealLabels[stop.meal]} 식당 후보">${stop.mealCandidates.map(id=>{const f=foods.find(x=>x.id===id);return `<a href="#food-${f.id}" data-food-jump="${f.id}">${photoEscape(f.name)} · 메뉴 보기 ↗</a>`;}).join('')}</nav>`;
}
