/* Flexible shopping choices; primary sources are in SHOP-OPTIONS-*-SOURCES.md. */
const shopClusters={
  "harajuku-vintage": {
    "id": "harajuku-vintage",
    "title": "하라주쿠·캣스트리트 빈티지 고르기",
    "area": "우라하라 · 오모테산도 · 캣스트리트",
    "note": "8곳은 모두 들르는 순서가 아니라 선택지예요. 북쪽 우라하라·캣스트리트 또는 남쪽 RAGTAG·DAMMIT 중 가까운 곳 2–3개를 골라 느슨하게 걸어요. 1/2 특별영업은 확인 필요하며 RAGTAG은 연말연시 휴무 안내가 있어요.",
    "stores": [
      {
        "id": "kindal-harajuku",
        "name": "Kindal 하라주쿠",
        "area": "오모테산도 · 로손 위 3층",
        "tag": "디자이너 중고",
        "address": "東京都渋谷区神宮前4-29-3 表参道ビル3F",
        "query": "Kindal 하라주쿠 東京都渋谷区神宮前4-29-3 表参道ビル3F",
        "source": "https://www.kind.co.jp/harajuku/",
        "guideKey": "kindal",
        "photo": "kindal"
      },
      {
        "id": "ragtag-harajuku",
        "name": "RAGTAG 하라주쿠",
        "area": "캣스트리트 남쪽 · 1·2층",
        "tag": "디자이너·셀렉트 중고",
        "address": "東京都渋谷区神宮前5-17-9 ヒューリック神宮前1F・2F",
        "query": "RAGTAG 하라주쿠 東京都渋谷区神宮前5-17-9 ヒューリック神宮前1F・2F",
        "source": "https://www.ragtag.jp/shop/?link_id=shopinfo",
        "guideKey": "ragtag",
        "photo": "ragtag"
      },
      {
        "id": "berberjin-harajuku",
        "name": "BerBerJin",
        "area": "우라하라 · 진구마에 3초메",
        "tag": "데님·아메리칸 빈티지",
        "address": "東京都渋谷区神宮前3-26-11 原宿SHビル1F",
        "query": "BerBerJin 東京都渋谷区神宮前3-26-11 原宿SHビル1F",
        "source": "https://berberjin.theshop.jp/about"
      },
      {
        "id": "berberjin-collective",
        "name": "BerBerJin COLLECTIVE",
        "area": "우라하라 · 지하 1층",
        "tag": "2026 오픈 · 믹스 빈티지",
        "address": "東京都渋谷区神宮前3-27-17 B1F",
        "query": "BerBerJin COLLECTIVE 東京都渋谷区神宮前3-27-17 B1F",
        "source": "https://berberjin.com/",
        "sourceBadge": {
          "label": "2026.4 오픈",
          "url": "https://berberjin.com/index.php/info/"
        }
      },
      {
        "id": "chicago-jingumae",
        "name": "CHICAGO 진구마에점",
        "area": "캣스트리트 북쪽 · 1·2층",
        "tag": "아메리칸·캐주얼 빈티지",
        "address": "東京都渋谷区神宮前4-26-26 第一谷村ビル1F・2F",
        "query": "CHICAGO 진구마에점 東京都渋谷区神宮前4-26-26 第一谷村ビル1F・2F",
        "source": "https://www.chicago.jp/company.html",
        "guideKey": "catstreet"
      },
      {
        "id": "flamingo-harajuku",
        "name": "FLAMINGO 하라주쿠",
        "area": "캣스트리트 북쪽 · 1층",
        "tag": "미국 빈티지·컬러",
        "address": "東京都渋谷区神宮前4-26-28 ジャンクヤード1F",
        "query": "FLAMINGO 하라주쿠 東京都渋谷区神宮前4-26-28 ジャンクヤード1F",
        "source": "https://www.flamingo-online.jp/f/shoplist"
      },
      {
        "id": "weekend-tokyo",
        "name": "weekend tokyo",
        "area": "오모테산도 골목 · 206호",
        "tag": "디자이너 아카이브",
        "address": "東京都渋谷区神宮前4-15-16 206",
        "query": "weekend tokyo 東京都渋谷区神宮前4-15-16 206",
        "source": "https://weekendtokyo.com/"
      },
      {
        "id": "dammit-tokyo",
        "name": "DAMMIT",
        "area": "진구마에 5초메 · 101호",
        "tag": "장르 혼합 빈티지",
        "address": "東京都渋谷区神宮前5-41-10 101",
        "query": "DAMMIT 東京都渋谷区神宮前5-41-10 101",
        "source": "https://dammit.fashionstore.jp/about"
      }
    ]
  },
  "shibuya-vintage": {
    "id": "shibuya-vintage",
    "title": "시부야 신난, 아카이브와 작은 매장",
    "area": "신난 골목 · 시부야 PARCO",
    "note": "같은 골목의 8곳 중 취향에 맞는 2–3곳만 골라요. Kindal 3층과 KLD 4층은 같은 건물이라 묶기 좋아요. 1/2 특별영업은 확인 필요하며 RAGTAG·Archive Store는 연말연시 휴무 안내가 있어요.",
    "stores": [
      {
        "id": "kindal-jinnan",
        "name": "Kindal 시부야 신난",
        "area": "쿠라빌딩 3층 · 엘리베이터 입장",
        "tag": "디자이너 중고",
        "address": "東京都渋谷区神南1-17-5 クーラビル3F",
        "query": "Kindal 시부야 신난 東京都渋谷区神南1-17-5 クーラビル3F",
        "source": "https://www.kind.co.jp/shibuyajinnan/",
        "guideKey": "jinnan"
      },
      {
        "id": "kld-tokyo",
        "name": "KLD TOKYO",
        "area": "Kindal과 같은 건물 · 4층",
        "tag": "일본·유럽 아카이브",
        "address": "東京都渋谷区神南1-17-5 クーラビル4F",
        "query": "KLD TOKYO 東京都渋谷区神南1-17-5 クーラビル4F",
        "source": "https://store.kld-c.jp/pages/kld-tokyo"
      },
      {
        "id": "ragtag-shibuya",
        "name": "RAGTAG 시부야",
        "area": "신난 · 1-17-7",
        "tag": "디자이너·셀렉트 중고",
        "address": "東京都渋谷区神南1-17-7",
        "query": "RAGTAG 시부야 東京都渋谷区神南1-17-7",
        "source": "https://www.ragtag.jp/shop/?link_id=shopinfo"
      },
      {
        "id": "archive-store-jinnan",
        "name": "Archive Store",
        "area": "신난 · 와코빌딩 지하 1층",
        "tag": "마르지엘라·일본 모드",
        "address": "東京都渋谷区神南1-12-16 和光ビルB1F",
        "query": "Archive Store 東京都渋谷区神南1-12-16 和光ビルB1F",
        "source": "https://archivestore-official-ec.myshopify.com/",
        "sourceBadge": {
          "label": "공식 위치·휴무",
          "url": "https://archivestore-official-ec.myshopify.com/pages/特定商取引法に基づく表記"
        }
      },
      {
        "id": "sullen-tokyo",
        "name": "SULLEN TOKYO",
        "area": "신난 하우스 · 2층",
        "tag": "모드·디자이너 아카이브",
        "address": "東京都渋谷区神南1-13-12 神南ハウス2F",
        "query": "SULLEN TOKYO 東京都渋谷区神南1-13-12 神南ハウス2F",
        "source": "https://sullentokyo.com/en/pages/contact"
      },
      {
        "id": "jam-shibuya",
        "name": "JAM VINTAGE&SELECT 시부야",
        "area": "신난 오이빌딩 · 지하 1층",
        "tag": "해외 빈티지·캐주얼",
        "address": "東京都渋谷区神南1-12-17 神南大井ビルB1F",
        "query": "JAM VINTAGE&SELECT 시부야 東京都渋谷区神南1-12-17 神南大井ビルB1F",
        "source": "https://jamtrading.jp/f/shop-list/shop-38"
      },
      {
        "id": "2ndstreet-jinnan",
        "name": "2nd STREET 시부야 신난",
        "area": "역 북쪽 · 1·2층",
        "tag": "일상 브랜드·중고 패션",
        "address": "東京都渋谷区神南1-22-9 サンクスビル1F・2F",
        "query": "2nd STREET 시부야 신난 東京都渋谷区神南1-22-9 サンクスビル1F・2F",
        "source": "https://www.2ndstreet.jp/shop/details?shopsId=30630"
      },
      {
        "id": "archives-skwat-parco",
        "name": "Archives（SKWAT）",
        "area": "시부야 PARCO · 4층",
        "tag": "빈티지·오브제·액세서리",
        "address": "東京都渋谷区宇田川町15-1 渋谷PARCO4F",
        "query": "Archives（SKWAT） 東京都渋谷区宇田川町15-1 渋谷PARCO4F",
        "source": "https://shibuya.parco.jp/shop/detail/?cd=028101"
      }
    ]
  },
  "aoyama-design": {
    "id": "aoyama-design",
    "title": "아오야마 디자이너 숍 · 하라주쿠 확장",
    "area": "아오야마 · 오모테산도 / 하라주쿠 선택",
    "note": "6곳 중 아오야마·오모테산도에서 2–3곳만 골라요. CC STORE는 북쪽 하라주쿠로 더 가는 선택지이며 평소 15시에 열어요. 전부 도는 코스가 아니며 1/2 특별영업은 확인 필요해요.",
    "stores": [
      {
        "id": "yoke-aoyama",
        "name": "YOKE AOYAMA",
        "area": "기타아오야마 · 2층",
        "tag": "니트 · 색감 · 일본 디자이너",
        "address": "東京都港区北青山2-11-15 町田ビル2F",
        "query": "YOKE AOYAMA 東京都港区北青山2-11-15 町田ビル2F",
        "source": "https://yoketokyooo.com/pages/stockists",
        "photo": "discover-yoke",
        "guideKey": "yoke",
        "sourceBadge": {
          "label": "Hype Maps 추천",
          "url": "https://hypemaps.com/cities/tokyo/poggy-guide-new-tokyo-hot-spots"
        }
      },
      {
        "id": "auralee-tokyo",
        "name": "AURALEE TOKYO",
        "area": "미나미아오야마",
        "tag": "미니멀 · 소재·색감",
        "address": "東京都港区南青山6-3-2 QC cube南青山63 1F",
        "query": "AURALEE TOKYO 東京都港区南青山6-3-2 QC cube南青山63 1F",
        "source": "https://auralee.jp/store"
      },
      {
        "id": "aton-aoyama",
        "name": "ATON AOYAMA",
        "area": "기타아오야마 · 오모테산도역",
        "tag": "유니섹스 · 정돈된 실루엣",
        "address": "東京都港区北青山3-6-27",
        "query": "ATON AOYAMA 東京都港区北青山3-6-27",
        "source": "https://aton-tokyo.com/pages/store-stockist"
      },
      {
        "id": "graphpaper-aoyama",
        "name": "Graphpaper AOYAMA",
        "area": "진구마에 남쪽 · 아오야마",
        "tag": "여유 있는 핏 · 디자인 오브제",
        "address": "東京都渋谷区神宮前5-36-6 ケーリーマンション1A・2D",
        "query": "Graphpaper AOYAMA 東京都渋谷区神宮前5-36-6 ケーリーマンション1A・2D",
        "source": "https://graphpaper-tokyo.com/pages/concept"
      },
      {
        "id": "nepenthes-tokyo",
        "name": "NEPENTHES TOKYO",
        "area": "진구마에 남쪽 · 아오야마",
        "tag": "워크웨어 · Needles·패턴",
        "address": "東京都渋谷区神宮前5-44-1",
        "query": "NEPENTHES TOKYO 東京都渋谷区神宮前5-44-1",
        "source": "https://nepenthes.co.jp/stores/"
      },
      {
        "id": "cc-store-harajuku",
        "name": "CC STORE©",
        "area": "하라주쿠 북쪽 · 별도 확장",
        "tag": "90–00년대 빈티지 · 스트리트",
        "address": "東京都渋谷区神宮前1-2-1 タートル原宿2F",
        "query": "CC STORE© 東京都渋谷区神宮前1-2-1 タートル原宿2F",
        "source": "https://www.instagram.com/ccstore_tokyo/",
        "photo": "discover-cc",
        "guideKey": "cc",
        "sourceBadge": {
          "label": "Time Out 추천",
          "url": "https://www.timeout.com/tokyo/shopping/cc-store"
        }
      }
    ]
  },
  "hatagaya-local": {
    "id": "hatagaya-local",
    "title": "하타가야·우에하라 작은 디자인 숍",
    "area": "하타가야 · 니시하라 · 요요기우에하라",
    "note": "6곳 중 하타가야·니시하라에서 2곳, 우에하라에서 1곳 정도 골라 걸어요. SO BOOKS는 요요기하치만 방향으로 더 걷는 선택지예요. 전부 도는 코스가 아니며 1/2 특별영업은 확인 필요해요.",
    "stores": [
      {
        "id": "bullpen-nishihara",
        "name": "BULLPEN",
        "area": "하타가야 · 니시하라",
        "tag": "리빙 · 생활 도구",
        "address": "東京都渋谷区西原1-18-7",
        "query": "BULLPEN 東京都渋谷区西原1-18-7",
        "source": "https://bullpen-shop.com/pages/about",
        "photo": "discover-bullpen",
        "guideKey": "bullpen",
        "sourceBadge": {
          "label": "Views from Japan 추천",
          "url": "https://www.viewsfromjapan.com/guides/hatagaya-neighbourhood-design-guide-tokyo-japan"
        }
      },
      {
        "id": "ella-records",
        "name": "ELLA RECORDS",
        "area": "하타가야 · 니시하라",
        "tag": "재즈·소울 · 중고 LP",
        "address": "東京都渋谷区西原1-14-10",
        "query": "ELLA RECORDS 東京都渋谷区西原1-14-10",
        "source": "https://ellarecords.jp/pages/ella-records",
        "photo": "discover-ella",
        "guideKey": "ella",
        "sourceBadge": {
          "label": "Views from Japan 추천",
          "url": "https://www.viewsfromjapan.com/guides/hatagaya-neighbourhood-design-guide-tokyo-japan"
        }
      },
      {
        "id": "aelu-gallery",
        "name": "AELU GALLERY",
        "area": "요요기우에하라 · 4층",
        "tag": "작가 도자기 · 작은 전시",
        "address": "東京都渋谷区西原3-12-14 西原ビル4F",
        "query": "AELU GALLERY 東京都渋谷区西原3-12-14 西原ビル4F",
        "source": "https://www.aelu.jp/"
      },
      {
        "id": "roundabout-uehara",
        "name": "Roundabout",
        "area": "요요기우에하라 · 지하",
        "tag": "공예 · 생활 도구",
        "address": "東京都渋谷区上原3-7-12 B1",
        "query": "Roundabout 東京都渋谷区上原3-7-12 B1",
        "source": "https://roundabout.to/access/"
      },
      {
        "id": "so-books",
        "name": "SO BOOKS",
        "area": "요요기하치만 방향 · 동쪽 확장",
        "tag": "사진집 · 패션·아트 헌책",
        "address": "東京都渋谷区上原1-47-5",
        "query": "SO BOOKS 東京都渋谷区上原1-47-5",
        "source": "https://sobooks.jp/%E5%BA%97%E8%88%97%E6%83%85%E5%A0%B1"
      },
      {
        "id": "iegnim-uehara",
        "name": "IEGNIM",
        "area": "요요기우에하라 · 니시하라",
        "tag": "민예 · 손으로 만든 그릇",
        "address": "東京都渋谷区西原3-11-5 1F",
        "query": "IEGNIM 東京都渋谷区西原3-11-5 1F",
        "source": "https://iegnim.com/"
      }
    ]
  },
  "ebisu-books": {
    "id": "ebisu-books",
    "title": "에비스·나카메구로 책과 디자인 숍",
    "area": "에비스 / 나카메구로 강변·골목",
    "note": "6곳 중 에비스에서 2곳 또는 나카메구로에서 2곳을 먼저 골라요. 두 동네를 모두 돌려면 이동 여유를 두세요. NICENESS는 에비스역 동쪽에 있어 서쪽 서점들과 한 골목은 아니에요. 1/2 특별영업은 확인 필요해요.",
    "stores": [
      {
        "id": "niceness-ebisu",
        "name": "NICENESS EBISU",
        "area": "에비스역 동쪽",
        "tag": "일본 디자이너 · 소재·가죽",
        "address": "東京都渋谷区恵比寿3-3-8",
        "query": "NICENESS EBISU 東京都渋谷区恵比寿3-3-8",
        "source": "https://www.niceness.jp/en/ebisu-store/",
        "photo": "discover-niceness",
        "guideKey": "niceness",
        "sourceBadge": {
          "label": "Hype Maps 추천",
          "url": "https://hypemaps.com/cities/tokyo/poggy-guide-new-tokyo-hot-spots"
        }
      },
      {
        "id": "salt-and-pepper",
        "name": "SALT AND PEPPER",
        "area": "에비스 서쪽 · 2층",
        "tag": "진 · 그래픽·스트리트",
        "address": "東京都渋谷区恵比寿西2-5-2 今村ビル2F",
        "query": "SALT AND PEPPER 東京都渋谷区恵比寿西2-5-2 今村ビル2F",
        "source": "https://sandp.stores.jp/about",
        "photo": "discover-salt",
        "guideKey": "salt",
        "sourceBadge": {
          "label": "Hype Maps 추천",
          "url": "https://hypemaps.com/cities/tokyo/best-bookstores-comics-manga-print-shop-tokyo"
        }
      },
      {
        "id": "post-ebisu",
        "name": "POST",
        "area": "에비스 남쪽",
        "tag": "아트북 · 독립 출판",
        "address": "東京都渋谷区恵比寿南2-10-3 1F",
        "query": "POST 東京都渋谷区恵比寿南2-10-3 1F",
        "source": "https://post-books.info/"
      },
      {
        "id": "cow-books",
        "name": "COW BOOKS",
        "area": "나카메구로 · 강변",
        "tag": "헌책 · 오리지널 굿즈",
        "address": "東京都目黒区青葉台1-14-11 コーポ青葉台103",
        "query": "COW BOOKS 東京都目黒区青葉台1-14-11 コーポ青葉台103",
        "source": "https://cowbooks.stores.jp/about",
        "photo": "discover-cow",
        "guideKey": "cow",
        "sourceBadge": {
          "label": "Hype Maps 추천",
          "url": "https://hypemaps.com/cities/tokyo/best-bookstores-comics-manga-print-shop-tokyo"
        }
      },
      {
        "id": "dessin-nakameguro",
        "name": "dessin",
        "area": "나카메구로 · 가미메구로",
        "tag": "그림책 · 사진집·전시",
        "address": "東京都目黒区上目黒2-11-1",
        "query": "dessin 東京都目黒区上目黒2-11-1",
        "source": "https://dessinweb.jp/hpgen/HPB/entries/1.html"
      },
      {
        "id": "travelers-nakameguro",
        "name": "TRAVELER’S FACTORY NAKAMEGURO",
        "area": "나카메구로 · 가미메구로",
        "tag": "노트 · 스탬프·문구",
        "address": "東京都目黒区上目黒3-13-10",
        "query": "TRAVELER’S FACTORY NAKAMEGURO 東京都目黒区上目黒3-13-10",
        "source": "https://www.travelers-company.com/about"
      }
    ]
  },
  "akiba-culture": {
    "id": "akiba-culture",
    "title": "아키하바라 · 게임, 책, 음악 중 골라 걷기",
    "area": "아키하바라 · 스에히로초 · SEEKBASE",
    "note": "라디오회관·만다라케를 한 시간씩 고정하지 않고, 이 구역에서 끌리는 2–3곳만 골라요. 피규어보다 게임·보드게임·책·레코드 중심. 만다라케 두 곳은 서로 다른 건물이며, SEEKBASE 두 곳은 같은 고가 아래 상점가예요. 12/30 특별영업은 출발 전 확인해요.",
    "stores": [
      {
        "id": "akiba-radio-kaikan",
        "name": "아키하바라 라디오회관",
        "area": "소토칸다 1-15-16 · 여러 매장이 든 건물",
        "tag": "보드게임·카드·오디오 소품",
        "query": "秋葉原ラジオ会館 東京都千代田区外神田1-15-16",
        "source": "https://akihabara-radiokaikan.co.jp/floor-guide/",
        "guideKey": "radio",
        "photo": "radio"
      },
      {
        "id": "akiba-mandarake-complex",
        "name": "만다라케 컴플렉스",
        "area": "소토칸다 3-11-12",
        "tag": "중고 만화·잡지·서브컬처",
        "query": "まんだらけ コンプレックス 東京都千代田区外神田3-11-12",
        "source": "https://www.mandarake.co.jp/dir/cmp/",
        "photo": "mandarake",
        "guideKey": "mandarake"
      },
      {
        "id": "akiba-mandarake-complex2",
        "name": "만다라케 컴플렉스2",
        "area": "소토칸다 3-12-2 · 본관과 별도 건물",
        "tag": "카드·게임·음반 · 2025 개점",
        "query": "まんだらけ コンプレックス2 東京都千代田区外神田3-12-2",
        "source": "https://www.mandarake.co.jp/dir/cmp2/index-en.html"
      },
      {
        "id": "akiba-surugaya-games",
        "name": "스루가야 아키하바라 게임관",
        "area": "소토칸다 3-15-4 · 2F",
        "tag": "레트로 게임·공략집·게임 잡지",
        "query": "駿河屋 秋葉原ゲーム館 東京都千代田区外神田3-15-4 2F",
        "source": "https://www.suruga-ya.com/en/shoplist"
      },
      {
        "id": "akiba-recofan",
        "name": "RECOfan 아키하바라 SEEKBASE",
        "area": "간다네리베이초 13-1 · SEEKBASE",
        "tag": "중고 LP·CD·음악 서적",
        "query": "RECOfan 秋葉原 SEEKBASE 東京都千代田区神田練塀町13-1",
        "source": "https://www.recofan.co.jp/map/SEEKBASE.html"
      },
      {
        "id": "akiba-yellow-submarine-rpg",
        "name": "옐로 서브마린 아키하바라 RPG숍",
        "area": "소토칸다 4-6-1 · 6F",
        "tag": "보드게임·TRPG·주사위",
        "query": "イエローサブマリン 秋葉原RPGショップ 東京都千代田区外神田4-6-1 塩田トゥール秋葉原6F",
        "source": "https://yellowsubmarine.co.jp/company/"
      },
      {
        "id": "akiba-shosen-base-lab",
        "name": "SHOSEN BASE LAB",
        "area": "SEEKBASE 01동 1-2구획",
        "tag": "취향 서적·잡화 · 2026.10 프리오픈",
        "query": "SHOSEN BASE LAB 東京都千代田区神田練塀町13-1 SEEKBASE01棟1-2区画",
        "source": "https://www.jrtk.jp/seekbase/info/detail_00179/"
      }
    ]
  },
  "akiba-adult": {
    "id": "akiba-adult",
    "title": "커플 소품 또는 코스튬 · 관심에 따라 고르기",
    "area": "아키하바라역 · 주오도리",
    "note": "M’s·러브메르시는 성인용품점, 나머지 세 곳은 일반 코스튬·의류·잡화 대안이에요. 성인 매장이 부담스러우면 일반 매장만 골라도 돼요. 러브메르시와 지스토어는 같은 주소의 별도 매장이에요. 코스튬·상품 재고와 연말 영업은 현장·공식 공지를 확인해요.",
    "stores": [
      {
        "id": "akiba-ms",
        "name": "M’s 아키하바라",
        "area": "소토칸다 1-15-13 · B1–6F",
        "tag": "18+ · 커플 소품·란제리·코스튬",
        "query": "大人のデパート エムズ 秋葉原 東京都千代田区外神田1-15-13",
        "source": "https://www.ms-online.co.jp/page/akihabara-store",
        "guideKey": "ms"
      },
      {
        "id": "akiba-love-merci",
        "name": "러브메르시 아키하바라",
        "area": "소토칸다 1-2-7",
        "tag": "18+ · 커플 소품·의상",
        "query": "ラブメルシー 秋葉原 東京都千代田区外神田1-2-7",
        "source": "https://x.com/akibalovemerci"
      },
      {
        "id": "akiba-geestore",
        "name": "지스토어 아키바 · COSPATIO",
        "area": "소토칸다 1-2-7 · 오노덴 빌딩 4F",
        "tag": "일반 매장 · 코스튬·캐릭터 옷",
        "query": "ジーストア アキバ 東京都千代田区外神田1-2-7 オノデンビル4F",
        "source": "https://www.geestore.com/geenet/geestore/akiba"
      },
      {
        "id": "akiba-cospa-atre",
        "name": "COSPA 오피셜 스토어 아트레",
        "area": "아트레 아키하바라1 · 3F",
        "tag": "일반 매장 · 그래픽 티셔츠·소품",
        "query": "コスパ オフィシャルストア アトレ秋葉原1 3F",
        "source": "https://www.atre.co.jp/akihabara/shop/9311/"
      },
      {
        "id": "akiba-donki",
        "name": "돈키호테 아키하바라점",
        "area": "소토칸다 4-3-3",
        "tag": "일반 매장 · 패션 소품·잡화",
        "query": "ドン キホーテ 秋葉原店 東京都千代田区外神田4-3-3",
        "source": "https://www.donki.com/store/shop_detail.php?add=1&shop_id=98"
      }
    ]
  },
  "east-art": {
    "id": "east-art",
    "title": "동쪽 도쿄 · 아트북, 레코드, 디자인 소품",
    "area": "가메아리 / 요시와라·쿠라마에 확장",
    "note": "twelvebooks와 VDS는 SKAC 한 건물 안의 두 매장, 에이신도는 가메아리역 북쪽이에요. 아래 요시와라·쿠라마에는 다른 동네라 전철·버스로 이동하는 확장 후보예요. 전부 도보로 이어지는 코스가 아니며, 한 구역을 골라 둘러봐요. 1/2 특별영업을 확인한 뒤 선택해요.",
    "stores": [
      {
        "id": "east-twelvebooks",
        "name": "twelvebooks · SKAC 입점",
        "area": "가메아리 · 니시카메아리 3-26-4",
        "tag": "아트북·사진집·인디 출판",
        "query": "twelvebooks SKAC 東京都葛飾区西亀有3-26-4",
        "source": "https://twelve-books.com/pages/about",
        "photo": "discover-skac",
        "guideKey": "skac"
      },
      {
        "id": "east-vds",
        "name": "VDS · SKAC 입점",
        "area": "가메아리 · twelvebooks와 같은 건물",
        "tag": "레코드·음악 듣기",
        "query": "Vinyl Delivery Service SKAC 東京都葛飾区西亀有3-26-4",
        "source": "https://vinyldeliveryservice.com/"
      },
      {
        "id": "east-eishindo",
        "name": "에이신도 서점 · 栄眞堂書店",
        "area": "가메아리역 북쪽 · 가메아리 5-32-11",
        "tag": "헌책·레코드·옛 잡화",
        "query": "栄眞堂書店 東京都葛飾区亀有5-32-11",
        "source": "https://www.katsushika-kushouren.jp/store/s35025/"
      },
      {
        "id": "east-kastori",
        "name": "카스토리 서점",
        "area": "요시와라 · 전철·버스 이동 옵션",
        "tag": "독립 출판·성문화 역사·희귀 서적",
        "query": "カストリ書房 東京都台東区千束3-21-14",
        "source": "https://kastoribookstore.blogspot.com/",
        "photo": "discover-kastori",
        "sourceBadge": {
          "label": "Hypemaps 추천",
          "url": "https://hypemaps.com/cities/tokyo/best-bookstores-comics-manga-print-shop-tokyo"
        }
      },
      {
        "id": "east-kakimori",
        "name": "카키모리 · Kakimori",
        "area": "쿠라마에 · 미스지 1-6-2 · 별도 이동",
        "tag": "디자인 문구·노트·잉크",
        "query": "カキモリ 東京都台東区三筋1-6-2",
        "source": "https://kakimori.com/pages/stores"
      },
      {
        "id": "east-douguya-nobori",
        "name": "도구야 노보리 · 道具屋nobori",
        "area": "쿠라마에 · 고토부키 3-7-1",
        "tag": "그릇·유리·생활 소품",
        "query": "道具屋nobori 東京都台東区寿3-7-1 寿町フラワーホーム1F",
        "source": "https://fromafar.stores.jp/about"
      }
    ]
  }
};
const shopMoodExtraItems=[
  {
    "id": "shop-mood-shibuya-sullen-prada",
    "title": "SULLEN TOKYO · \"PRADA SPORT\" PARACHUTE JACKET",
    "src": "assets/photos/shop-mood-shibuya-sullen-prada.webp",
    "width": 595,
    "height": 800,
    "source": "https://sullentokyo.com/products/prada-sport-parachute-jacket",
    "credit": "SULLEN TOKYO 공식 상품 사진",
    "check": "공식 온라인/룩북 사진 · 시부야 매장 재고 미확인"
  },
  {
    "id": "shop-mood-shibuya-sullen-gucci",
    "title": "SULLEN TOKYO · \"GUCCI\" CABLE TURTLE KNIT SWEATER",
    "src": "assets/photos/shop-mood-shibuya-sullen-gucci.webp",
    "width": 551,
    "height": 800,
    "source": "https://sullentokyo.com/products/gucci-cable-turtle-knit-sweater",
    "credit": "SULLEN TOKYO 공식 상품 사진",
    "check": "공식 온라인/룩북 사진 · 시부야 매장 재고 미확인"
  },
  {
    "id": "shop-mood-shibuya-sullen-cargo",
    "title": "SULLEN TOKYO · CARGO FLARE TROUSERS",
    "src": "assets/photos/shop-mood-shibuya-sullen-cargo.webp",
    "width": 492,
    "height": 800,
    "source": "https://sullentokyo.com/products/cargo-flare-trousers",
    "credit": "SULLEN TOKYO 공식 상품 사진",
    "check": "공식 온라인/룩북 사진 · 시부야 매장 재고 미확인"
  },
  {
    "id": "shop-mood-shibuya-archive-margiela",
    "title": "Archive Store · Maison Martin Margiela ⑭ 2008 A/W",
    "src": "assets/photos/shop-mood-shibuya-archive-margiela.webp",
    "width": 640,
    "height": 640,
    "source": "https://archivestore-official-ec.myshopify.com/products/maison-martin-margiela-2008-a-w-14",
    "credit": "Archive Store 공식 상품 사진",
    "check": "공식 온라인/룩북 사진 · 시부야 매장 재고 미확인"
  },
  {
    "id": "shop-mood-shibuya-archive-cdg",
    "title": "Archive Store · COMME des GARCONS HOMME PLUS 2002 A/W",
    "src": "assets/photos/shop-mood-shibuya-archive-cdg.webp",
    "width": 640,
    "height": 640,
    "source": "https://archivestore-official-ec.myshopify.com/products/comme-des-garcons-homme-plus-2002-a-w",
    "credit": "Archive Store 공식 상품 사진",
    "check": "공식 온라인/룩북 사진 · 시부야 매장 재고 미확인"
  }
];
function shopClustersForPlan(id){return ({base:['harajuku-vintage','shibuya-vintage'],fashion:['aoyama-design'],local:['hatagaya-local'],books:['ebisu-books'],east:['east-art']})[id]||['harajuku-vintage','shibuya-vintage']}
