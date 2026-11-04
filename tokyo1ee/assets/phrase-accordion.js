/* Native, keyboard-accessible phrase categories; existing read-aloud cards are preserved. */
(() => {
  'use strict';
  const sources={
    bisexual:{label:'와세다대 · 성적 지향',url:'https://www.waseda.jp/inst/weekly/feature/2023/11/27/114360/'},
    identity:{label:'にじいろ学校 · 정체성 용어',url:'https://www.nijikou.com/%E7%94%A8%E8%AA%9E%E4%B8%80%E8%A6%A7/'},
    queer:{label:'PRIDE JAPAN · 퀴어',url:'https://www.outjapan.co.jp/pride_japan/glossary/ka/9.html'},
    roles:{label:'Bians note · 당사자 설명',url:'https://bians-note.com/column/tachi/'},
    vers:{label:'g-lad xx · 리버시블',url:'https://gladxx.jp/extra/terms/terms_ra/131.html'},
    out:{label:'PRIDE JAPAN · 커밍아웃',url:'https://www.outjapan.co.jp/pride_japan/glossary/ka/2.html'}
  };
  const blocks=[
    {title:'누구에게 끌리는지 · 정체성',note:'바이섹슈얼은 끌림의 방향을, 탑·바텀은 친밀한 관계에서의 역할을 말해요. 서로 다른 축이에요.',sources:['identity','bisexual','queer'],items:[
      ['바이섹슈얼 · 양성애','バイセクシュアル','ばいせくしゅある','바이세쿠슈아루','둘 이상의 성별에 끌릴 수 있는 정체성. 끌림의 정도는 사람마다 다르며, 역할은 별개예요.'],
      ['레즈비언','レズビアン','れずびあん','레즈비안','여성에게 끌리는 여성의 정체성.'],
      ['게이','ゲイ','げい','게이','일본에서는 주로 남성에게 끌리는 남성을 가리켜요.'],
      ['이성애자 · 헤남·헤녀에 가까운 말','ヘテロセクシュアル','へてろせくしゅある','헤테로세쿠슈아루','이성에게 끌리는 사람. 한국어 “일반”을 普通(보통)로 옮기지는 않아요.'],
      ['퀴어 · “이쪽”의 넓은 맥락','クィア','くぃあ','퀴아','성·젠더의 다양성을 포괄하거나 스스로를 표현하는 말. 한국어 “이쪽”과 항상 같은 뉘앙스는 아니에요.']
    ]},
    {title:'역할 · 탑·바텀·깁·텍',note:'아래는 성인 커뮤니티의 역할 표현이에요. 깁·텍은 여성 간 맥락에서 가까운 설명이며, 한국어와 일본어가 완전히 일대일로 대응하지는 않아요.',sources:['roles','vers'],items:[
      ['탑 / 깁에 가까운 역할','タチ','たち','타치','친밀한 접촉에서 상대에게 해 주는 쪽의 역할. 일상에서 주도권을 가진 사람이나 “남자 역할”이라는 뜻은 아니에요.'],
      ['바텀·텀 / 텍에 가까운 역할','ネコ / ウケ','ねこ / うけ','네코 / 우케','친밀한 접촉을 받는 쪽의 역할. ネコ와 ウケ의 사용은 커뮤니티에 따라 달라요.'],
      ['양쪽 역할 · 리버시블','リバ','りば','리바','タチ와 ネコ 양쪽 역할을 하는 표현. 바이라는 정체성과는 별개예요.'],
      ['온깁에 가까운 표현 · 해 주기만','バリタチ','ばりたち','바리타치','タチ 역할만 한다는 뜻. 어떤 접촉까지 편한지는 사람마다 달라서 이 말 하나로 단정하지 않아요.'],
      ['온텍에 가까운 표현 · 받기만','バリネコ','ばりねこ','바리네코','ネコ 역할만 한다는 뜻. 상대에게 기대하는 방식과 경계는 별도로 이야기해요.'],
      ['깁 쪽 / 텍 쪽 리버시블','タチ寄りのリバ / ネコ寄りのリバ','たちよりのりば / ねこよりのりば','타치요리노 리바 / 네코요리노 리바','양쪽 역할 중 タチ 쪽 / ネコ 쪽을 더 선호한다는 표현.']
    ]},
    {title:'스타일·취향 · 오픈·벽장',note:'스타일과 머리 길이는 정체성이나 역할을 알려 주지 않아요. 오픈 여부도 친구·가족·직장처럼 상대에 따라 달라요.',sources:['roles','out'],items:[
      ['페미닌 스타일 / 보이시 스타일','フェム / ボイ','ふぇむ / ぼい','페무 / 보이','일부 여성 퀴어 커뮤니티에서 쓰는 스타일 표현. 긴머부·짧머부를 머리 길이만 보고 이 말에 대응시키지 않아요.'],
      ['긴머 · 긴 머리','ロングヘア','ろんぐへあ','롱구헤아','머리 길이만 말하는 일반 표현이에요.'],
      ['짧머 · 짧은 머리','ショートヘア','しょーとへあ','쇼오토헤아','짧은 헤어스타일을 말하는 일반 표현이에요.'],
      ['오픈 · 커밍아웃한 상태','カミングアウトしている','かみんぐあうとしている','카밍구아우토 시테이루','공개했다는 자연스러운 문장. 줄여 オープン(おーぷん · 오오픈)이라고도 해요. 누구에게 공개했는지에 따라 의미가 달라요.'],
      ['벽장 · 아직 커밍아웃하지 않음','カミングアウトしていない','かみんぐあうとしていない','카밍구아우토 시테이나이','공개하지 않은 상태. クローゼット(くろーぜっと · 쿠로오젯토)도 관련 표현이에요. 벽장을 가구 이름으로 직역하지 않아요.'],
      ['식 / 노식 · 내 취향 / 내 취향 아님','タイプ / タイプではない','たいぷ / たいぷではない','타이푸 / 타이푸데와 나이','일반 일본어로 “내가 좋아하는 타입 / 내 타입은 아님”. 상대를 평가하는 딱지보다 자신의 취향을 설명할 때 써요.']
    ]},
    {title:'쉬는 날 · 대화에 바로 쓰기',note:'평일쉼·주말쉼은 성소수자 전용 은어가 아니라 일반적인 일정 표현이에요.',sources:[],items:[
      ['평일쉼 · 평일에 쉬어요','平日休みです。','へいじつやすみです。','헤이지츠 야스미데스','월–금 중 쉬는 날이 있다는 뜻. 매주 모든 평일에 쉰다는 뜻은 아니에요.'],
      ['주말쉼 · 토·일에 쉬어요','土日休みです。','どにちやすみです。','도니치 야스미데스','토요일과 일요일 휴무라는 구체적인 표현.'],
      ['무슨 뜻으로 쓰는 말이에요?','どういう意味で使っていますか。','どういういみでつかっていますか。','도오 이우 이미데 츠캇테이마스카','같은 용어를 서로 다르게 이해할 때 뜻을 확인해요.'],
      ['바이섹슈얼이에요.','私はバイセクシュアルです。','わたしはばいせくしゅあるです。','와타시와 바이세쿠슈아루데스','자신의 정체성을 직접 소개하고 싶을 때 쓰는 문장이에요.']
    ]}
  ];
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badge=key=>`<a class="phrase-source-badge" href="${esc(sources[key].url)}" target="_blank" rel="noopener noreferrer">${esc(sources[key].label)} ↗</a>`;
  function makeDetails(number,title,note,count){
    const details=document.createElement('details');details.className='phrase-accordion-group';
    const summary=document.createElement('summary');summary.className='phrase-accordion-summary';
    summary.innerHTML=`<span class="phrase-category-number" aria-hidden="true">${esc(number)}</span><span class="phrase-category-label"><strong>${esc(title)}</strong><span>${esc(note)}</span></span><span class="phrase-category-count">${count}개</span><span class="phrase-category-toggle" aria-hidden="true"></span>`;
    details.append(summary);return details;
  }
  function init(){
    const host=document.getElementById('fieldHelp');if(!host||host.dataset.phraseAccordion==='ready')return;
    host.dataset.phraseAccordion='ready';
    const groups=Array.from(host.children).filter(node=>node.matches('section.phrase-group'));
    const originalCards=groups.reduce((total,group)=>total+group.querySelectorAll('.phrase-card').length,0);
    groups.forEach((group,index)=>{
      const heading=group.querySelector('.phrase-group-heading');
      const title=heading?.querySelector('h4');if(!heading||!title)return;
      const details=makeDetails(String(index+1).padStart(2,'0'),title.textContent,heading.querySelector('p')?.textContent||'',group.querySelectorAll('.phrase-card').length);
      const label=details.querySelector('.phrase-category-label > strong');label.id=title.id;
      group.before(details);heading.remove();group.classList.add('phrase-accordion-body');details.append(group);
    });
    const addedCount=blocks.reduce((sum,block)=>sum+block.items.length,0);
    const glossary=makeDetails('09','퀴어·바이섹슈얼 용어','역할·정체성·스타일 · 오픈·벽장 · 쉬는 날',addedCount);
    glossary.id='queerPhraseGuide';glossary.open=true;
    const body=document.createElement('div');body.className='phrase-accordion-body queer-phrase-body';
    body.innerHTML=`<p class="queer-phrase-intro">일본어 표현 → 히라가나 → 한국어 발음 순서로 읽어요. 아래 용어는 스스로 설명하는 말을 이해하기 위한 작은 사전이에요.</p>${blocks.map((block,index)=>`<section class="queer-phrase-block" aria-labelledby="queer-block-${index}"><h4 id="queer-block-${index}">${esc(block.title)}</h4><p class="queer-phrase-note">${esc(block.note)}</p><div class="phrase-grid">${block.items.map(([title,jp,hira,ko,note])=>`<article class="phrase-card queer-phrase-card"><h5>${esc(title)}</h5><p class="phrase-japanese" lang="ja">${esc(jp)}</p><dl class="phrase-readings"><div><dt>히라가나</dt><dd lang="ja">${esc(hira)}</dd></div><div><dt>발음</dt><dd class="phrase-korean">${esc(ko)}</dd></div></dl><p class="queer-term-note">${esc(note)}</p></article>`).join('')}</div>${block.sources.length?`<div class="phrase-source-list">${block.sources.map(badge).join('')}</div>`:''}</section>`).join('')}<p class="queer-translation-note">한국어 ‘일스·일틱·끼·끼순이·기갈·걸커’는 일본어 한 단어와 정확히 맞지 않아 억지로 옮기지 않았어요. 외모나 말투로 정체성·역할을 추측하지 않고, 본인이 쓰는 표현을 따라가요. ‘온깁·온텍’은 위의 バリタチ·バリネコ로 가까운 뜻을 설명했어요.</p>`;
    glossary.append(body);
    const wrapped=host.querySelectorAll(':scope > .phrase-accordion-group');wrapped[wrapped.length-1]?.after(glossary);
    if(!glossary.isConnected)host.append(glossary);
    const count=host.querySelector('.phrase-count');if(count)count.textContent=`${originalCards}가지 여행 표현 + ${addedCount}가지 용어·문장`;
    const intro=host.querySelector('.phrase-intro');if(intro)intro.innerHTML='필요한 카테고리를 펼쳐 <strong>한국어 발음</strong>을 읽어 보세요. 모든 카드에 일본어와 히라가나를 함께 적었어요.';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
