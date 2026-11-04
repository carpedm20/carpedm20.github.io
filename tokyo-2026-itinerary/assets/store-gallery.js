const storePhotoEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shoppingStores=Object.fromEntries(Object.values(shopClusters).flatMap(c=>c.stores).map(s=>[s.id,s]));
function renderStoreGallery(store){
 const photos=storePhotos[store.id]||[],esc=storePhotoEscape;if(!photos.length)return '';
 return `<section class="store-gallery" data-store-gallery="${esc(store.id)}" aria-label="${esc(store.name)} 매장 사진"><div class="store-photo-track" tabindex="0" role="region" aria-label="${esc(store.name)} 사진 ${photos.length}장 · 좌우로 넘기기">${photos.map((p,i)=>`<button class="store-photo-open" type="button" data-store-photo="${esc(store.id)}" data-photo-index="${i}" aria-label="${esc(p.alt)} · ${i+1}/${photos.length} 크게 보기"><img src="${esc(p.src)}" alt="${esc(p.alt)}" style="object-fit:${p.fit==='contain'?'contain':'cover'}" width="${p.width||960}" height="${p.height||720}" loading="lazy" decoding="async"><span class="store-photo-expand" aria-hidden="true">⤢</span></button>`).join('')}</div><div class="store-gallery-tools"><span class="store-photo-count" aria-live="polite" aria-atomic="true">사진 1 / ${photos.length}</span><span class="store-gallery-nav"><button type="button" data-store-step="-1" aria-label="${esc(store.name)} 이전 사진" disabled>←</button><button type="button" data-store-step="1" aria-label="${esc(store.name)} 다음 사진" ${photos.length<2?'disabled':''}>→</button></span></div></section>`;
}
function updateStoreGallery(gallery){
 const track=gallery.querySelector('.store-photo-track'),items=[...track.children];
 const index=items.reduce((best,item,i)=>Math.abs(item.offsetLeft-track.scrollLeft)<Math.abs(items[best].offsetLeft-track.scrollLeft)?i:best,0);
 gallery.dataset.photoIndex=index;
 gallery.querySelector('.store-photo-count').textContent=`사진 ${index+1} / ${items.length}`;
 gallery.querySelector('[data-store-step="-1"]').disabled=index===0;
 gallery.querySelector('[data-store-step="1"]').disabled=index===items.length-1;
}
function stepStoreGallery(gallery,step){
 const track=gallery.querySelector('.store-photo-track');
 updateStoreGallery(gallery);
 const index=Math.max(0,Math.min(track.children.length-1,Number(gallery.dataset.photoIndex)+step));
 track.scrollTo({left:track.children[index].offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function showStorePhoto(id,index=0){
 const photos=storePhotos[id],store=shoppingStores[id];if(!store||!photos?.length)return;
 index=Math.max(0,Math.min(photos.length-1,index));const p=photos[index],esc=storePhotoEscape;
 let dialog=document.getElementById('storePhotoDialog');
 if(!dialog){
  dialog=document.createElement('dialog');dialog.id='storePhotoDialog';dialog.className='store-photo-dialog';dialog.setAttribute('aria-labelledby','storePhotoTitle');
  dialog.innerHTML='<div class="store-dialog-top"><strong id="storePhotoTitle"></strong><button type="button" data-store-close aria-label="매장 사진 닫기">닫기 ×</button></div><img class="store-dialog-image" alt=""><div class="store-dialog-controls"><button type="button" data-store-dialog-step="-1" aria-label="이전 매장 사진">←</button><span aria-live="polite" class="store-dialog-count"></span><button type="button" data-store-dialog-step="1" aria-label="다음 매장 사진">→</button></div><p class="store-dialog-caption"></p><div class="store-dialog-sources"></div>';
  document.body.append(dialog);
  dialog.querySelector('[data-store-close]').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();const button=e.target.closest('[data-store-dialog-step]');if(button)showStorePhoto(dialog.dataset.storeId,Number(dialog.dataset.photoIndex)+Number(button.dataset.storeDialogStep))});
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showStorePhoto(dialog.dataset.storeId,Number(dialog.dataset.photoIndex)+(e.key==='ArrowRight'?1:-1))}});
 }
 dialog.dataset.storeId=id;dialog.dataset.photoIndex=index;
 dialog.querySelector('#storePhotoTitle').textContent=store.name;
 const img=dialog.querySelector('img');img.src=p.src;img.alt=p.alt;
 dialog.querySelector('.store-dialog-count').textContent=`${index+1} / ${photos.length}`;
 dialog.querySelector('.store-dialog-caption').textContent=p.alt;
 dialog.querySelector('[data-store-dialog-step="-1"]').disabled=index===0;
 dialog.querySelector('[data-store-dialog-step="1"]').disabled=index===photos.length-1;
 dialog.querySelector('.store-dialog-sources').innerHTML=`<a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">${esc(p.credit||'사진 출처')} ↗</a>${p.licenseUrl?`<a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.license||'라이선스')} ↗</a>`:''}`;
 if(!dialog.open)dialog.showModal();
}
document.addEventListener('click',e=>{
 const photo=e.target.closest('[data-store-photo]');if(photo)showStorePhoto(photo.dataset.storePhoto,Number(photo.dataset.photoIndex));
 const step=e.target.closest('[data-store-step]');if(step)stepStoreGallery(step.closest('.store-gallery'),Number(step.dataset.storeStep));
});
document.addEventListener('scroll',e=>{if(e.target.classList?.contains('store-photo-track'))updateStoreGallery(e.target.closest('.store-gallery'))},true);
document.addEventListener('keydown',e=>{const track=e.target.closest('.store-photo-track');if(track&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();stepStoreGallery(track.closest('.store-gallery'),e.key==='ArrowRight'?1:-1)}});
