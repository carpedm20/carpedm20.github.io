const shoppingPicks=[...Object.values(venueGuides).flatMap(v=>v.items),...shopMoodExtraItems,...Object.values(storeShoppingItems).flat()];
const shoppingEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clothingGuideKeys=new Set(['kindal','ragtag','jinnan','yoke','niceness','cc','salt','catstreet']);
const shopMoodGuideKeys={
 'harajuku-vintage':['kindal','catstreet'],
 'shibuya-vintage':[],
 'aoyama-design':['yoke'],
 'ebisu-books':['niceness','salt'],
 'hatagaya-local':['bullpen','ella'],
 'akiba-culture':['radio','mandarake'],
 'akiba-adult':['ms'],
 'east-art':['skac']
};
function shoppingIdsForStore(store){return (venueGuides[store]?.items||[]).map(x=>x.id)}
function clothingMoodItems(key){const items=venueGuides[key]?.items||[];return items.filter(item=>item.src&&(key==='cc'?/티셔츠|벨트|키홀더/.test(item.title):key==='salt'?/데님|셔츠|양말|토트/.test(item.title):true))}
function shopMoodItemsForCluster(id){
 if(id==='shibuya-vintage')return shopMoodExtraItems;
 const items=(shopMoodGuideKeys[id]||[]).flatMap(key=>{
  if(id==='harajuku-vintage'&&key==='cc')return clothingMoodItems(key).filter(x=>/티셔츠/.test(x.title));
  if(id==='ebisu-books'&&key==='salt')return clothingMoodItems(key).filter(x=>/데님|셔츠|양말/.test(x.title));
  return venueGuides[key]?.items||[];
 });
 return items.filter((item,i)=>item.src&&items.findIndex(x=>x.id===item.id)===i);
}
function renderShoppingMood(items,label='옷 분위기'){
 const esc=shoppingEscape;const visible=items.filter(x=>x.src);if(!visible.length)return '';
 return `<section class="shopping-mood" aria-label="${esc(label)}"><div class="shopping-mood-heading"><strong>${esc(label)}</strong><span>가로로 넘겨보기 · 사진을 누르면 출처</span></div><div class="shop-mood-strip" tabindex="0" role="region" aria-label="${esc(label)} 사진 한 줄">${visible.map(x=>`<button class="shop-mood-photo" type="button" data-shopping-photo="${esc(x.id)}" data-mood-photo aria-label="${esc(x.title)} 사진 크게 보기"><img src="${esc(x.src)}" width="${x.width}" height="${x.height}" alt="${esc((x.sampleTitle||x.title)+' · '+x.credit)}" loading="lazy" decoding="async"><span aria-hidden="true">⤢</span></button>`).join('')}</div></section>`;
}
function renderShopItemTips(keys){
 const esc=shoppingEscape;const guides=keys.map(key=>venueGuides[key]).filter(Boolean);if(!guides.length)return '';
 return `<details class="shop-item-tips"><summary>물건을 고를 때 참고할 가이드</summary>${guides.map(guide=>`<section><h4>${esc(guide.where||guide.title)}</h4><ul>${guide.items.map(x=>`<li><strong>${esc(x.title)}</strong>${x.where?`<small>${esc(x.where)}</small>`:''}<p>${esc(x.desc)}</p><a href="${esc(x.source)}" target="_blank" rel="noopener noreferrer">상품·취급 출처 ↗</a></li>`).join('')}</ul></section>`).join('')}</details>`;
}
function renderStoreShopping(store,isClothing){
 const items=(storeShoppingItems[store.id]||[]).filter(item=>item.src);
 if(!items.length)return '';
 const esc=shoppingEscape;
 return `<div class="store-shopping-row">${renderShoppingMood(items,isClothing?'이 매장에서 볼 옷·소품':'이 매장에서 찾아볼 것')}<p class="store-shopping-note">사진은 상품·종류 예시 · 이 지점 취급·재고는 확인 필요</p>${isClothing?'':`<details class="shop-item-tips"><summary>이 매장 품목 가이드</summary><ul>${items.map(item=>`<li><strong>${esc(item.title)}</strong>${item.where?`<small>${esc(item.where)}</small>`:''}${item.desc?`<p>${esc(item.desc)}</p>`:''}<a href="${esc(item.source)}" target="_blank" rel="noopener noreferrer">상품·취급 출처 ↗</a></li>`).join('')}</ul></details>`}</div>`;
}
function renderShoppingActivity(clusterId){
 const c=shopClusters[clusterId];if(!c)return '';const esc=shoppingEscape;
 const isClothing=['harajuku-vintage','shibuya-vintage','aoyama-design','ebisu-books'].includes(clusterId);

 return `<section class="stop-shopping shop-activity" data-shop-cluster="${esc(clusterId)}"><div class="stop-shopping-heading"><strong>고를 수 있는 매장·공간 ${c.stores.length}곳</strong><span>${esc(c.area)}</span></div><p class="shop-activity-note">${esc(c.note)}</p><p class="store-gallery-help">매장 사진은 좌우로 넘겨 보고, 누르면 크게 볼 수 있어요.</p><div class="store-option-grid">${c.stores.map(store=>`<article class="store-option-card" data-store-id="${esc(store.id)}">${renderStoreGallery(store)}<div class="store-option-copy"><span class="store-option-tag">${esc(store.tag)}</span><h4>${esc(store.name)}</h4><p class="store-option-area">${esc(store.area)}</p>${renderStoreShopping(store,isClothing)}${store.sourceBadge?`<a class="source-badge ${/hype\s?maps/i.test(store.sourceBadge.label)?'hypemaps':''}" href="${esc(store.sourceBadge.url)}" target="_blank" rel="noopener noreferrer">${esc(store.sourceBadge.label)} ↗</a>`:''}<div class="store-option-links"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.query)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(store.name)} 위치 보기">위치 ↗</a><a href="${esc(store.source)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(store.name)} 공식 매장 안내">매장 안내 ↗</a></div></div></article>`).join('')}</div></section>`;
}
function renderStopShopping(stop){
 if(stop.shopCluster)return renderShoppingActivity(stop.shopCluster);
 const guide=venueGuides[stop.guideKey];if(!guide)return '';const esc=shoppingEscape;
 if(clothingGuideKeys.has(stop.guideKey))return `<div class="stop-shopping">${renderShoppingMood(clothingMoodItems(stop.guideKey))}</div>`;
 return `<div class="stop-shopping"><div class="stop-shopping-heading"><strong>여기서 찾아볼 것 · ${guide.items.length}가지</strong><span>${esc(guide.where||guide.title)}</span></div><p class="stop-shopping-note">${esc(guide.intro)}</p><a class="venue-guide-source" href="${esc(guide.source)}" target="_blank" rel="noopener noreferrer">매장·취급 안내 ↗</a><div class="shopping-grid">${guide.items.map((x,i)=>`<article class="shopping-card ${x.src?'':'category-guide-card'}">${x.src?`<button class="shopping-photo" type="button" data-shopping-photo="${esc(x.id)}" aria-label="${esc(x.title)} 사진 확대"><img src="${esc(x.src)}" width="${x.width}" height="${x.height}" alt="${esc((x.sampleTitle||x.title)+' · '+x.credit)}" loading="lazy" decoding="async"><span aria-hidden="true">⤢</span></button>`:`<div class="category-guide-label"><b>${String(i+1).padStart(2,'0')}</b><span>현장에서 찾을 종류</span></div>`}<div class="shopping-copy">${x.where?`<small class="item-location">📍 ${esc(x.where)}</small>`:''}${x.photoType?`<small class="guide-image-note">${esc(x.photoType)}</small>`:''}<h4>${esc(x.title)}</h4><p>${esc(x.desc)}</p><p class="shopping-status">${esc(x.check)}</p><a href="${esc(x.source)}" target="_blank" rel="noopener noreferrer">${x.kind==='category'?'탐색 기준 출처':x.src?'상품·취급 출처':'탐색 기준 출처'} ↗</a>${x.photoSource?` <a href="${esc(x.photoSource)}" target="_blank" rel="noopener noreferrer">사진 출처 ↗</a>`:''}</div></article>`).join('')}</div></div>`;
}
function openShoppingPhoto(id,mood=false){
 const item=shoppingPicks.find(x=>x.id===id);if(!item?.src)return;const esc=shoppingEscape;
 let dialog=document.getElementById('shoppingPhotoDialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='shoppingPhotoDialog';dialog.className='shopping-dialog';dialog.setAttribute('aria-labelledby','shoppingDialogTitle');document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
 dialog.classList.toggle('shopping-dialog-mood',mood);
 dialog.innerHTML=`<button type="button" aria-label="상품 사진 닫기">닫기 ×</button><img src="${esc(item.src)}" alt="${esc(item.sampleTitle||item.title)}"><h3 id="shoppingDialogTitle" ${mood?'class="mood-dialog-title"':''}>${esc(item.title)}</h3>${item.photoType?`<p class="shopping-photo-kind">${esc(item.photoType)}</p>`:''}${item.sampleTitle&&!mood?`<p class="shopping-sample-title">사진 예시 · ${esc(item.sampleTitle)}</p>`:''}${item.check?`<p>${esc(item.check)}</p>`:''}<a href="${esc(item.photoSource||item.source)}" target="_blank" rel="noopener noreferrer">${esc(item.credit||'사진 출처')} ↗</a>${item.licenseUrl?` <a href="${esc(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.license||'라이선스')} ↗</a>`:''}`;
 dialog.querySelector('button').onclick=()=>dialog.close();dialog.showModal();
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-shopping-photo]');if(button)openShoppingPhoto(button.dataset.shoppingPhoto,button.hasAttribute('data-mood-photo'))});
