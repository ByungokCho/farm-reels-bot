import React, { useState, useRef } from 'react';
import {
  Sprout,
  Sparkles,
  Copy,
  Check,
  Video,
  FileText,
  ChevronRight,
  RefreshCw,
  Send,
  UserCheck,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Calendar,
  Scissors,
  Bot,
  Share2,
  Layers,
  Clock,
  Sliders,
  ShieldCheck,
  BarChart3,
  Eye,
  Volume2,
  Camera
} from 'lucide-react';

// 1월 ~ 12월 계절·날씨·농촌 시기별 컨텍스트 데이터
const MONTH_DATA = [
  { month: 1, label: '1월', seasonTag: '한겨울 · 혹한기', weatherHook: '영하 10도 한파 속 하우스·축사 보온 관리와 겨울 간식·설 명절 선물세트 준비' },
  { month: 2, label: '2월', seasonTag: '늦겨울 · 해동·봄준비', weatherHook: '얼었던 땅이 녹기 시작하는 시기, 과수 전정(가지치기)과 봄 파종·육묘 준비' },
  { month: 3, label: '3월', seasonTag: '초봄 · 파종·모종식재', weatherHook: '봄바람 불기 시작하는 3월, 거름 주기와 로터리 작업, 봄 묘목·조경수 식재 적기' },
  { month: 4, label: '4월', seasonTag: '완연한 봄 · 개화·생육기', weatherHook: '꽃피고 새순 돋는 4월, 수정벌 방사·꽃솎기(적화)와 봄 제철 수확 시작' },
  { month: 5, label: '5월', seasonTag: '늦봄 · 가정의달·열매맺기', weatherHook: '가정의 달 선물 수요와 초여름 햇살 아래 알맹이가 굵어지는 열매솎기(적과) 현장' },
  { month: 6, label: '6월', seasonTag: '초여름 · 하지·초여름수확', weatherHook: '블루베리·매실·햇감자·보리 수확이 한창인 초여름 새벽 작업과 장마 사전 대비' },
  { month: 7, label: '7월', seasonTag: '한여름 · 장마·폭염기', weatherHook: '쏟아지는 장맛비 배수로 정비와 35도 폭염 속 새벽 5시 수확·생육 관리 사투' },
  { month: 8, label: '8월', seasonTag: '늦여름 · 태풍대비·가을파종', weatherHook: '뜨거운 땡볕 아래 당도가 차오르는 과일과 김장 작물 파종, 추석 선물 사전예약' },
  { month: 9, label: '9월', seasonTag: '초가을 · 추석대목·가을수확', weatherHook: '선선한 가을바람과 큰 일교차로 맛과 색이 깊어지는 시기, 명절 선물 택배 전쟁' },
  { month: 10, label: '10월', seasonTag: '가을 · 황금들녘·대풍수확', weatherHook: '황금빛 벼 수확·신선한 햅쌀 도정과 가을 과수·구황작물 수확이 절정에 달하는 달' },
  { month: 11, label: '11월', seasonTag: '늦가을 · 김장철·첫서리', weatherHook: '첫서리 맞고 속이 단단하게 꽉 찬 김장 배추·무·고추 직거래와 겨울 월동 준비' },
  { month: 12, label: '12월', seasonTag: '초겨울 · 연말결산·월동', weatherHook: '하얀 입김 나는 추위 속 올해 마지막 물량 마감과 하우스 겨울 작물·내년 농사 준비' }
];

// 농장 시즌 상태 3가지 모드 정의
const SEASON_MODES = [
  {
    id: 'peak',
    badge: '🔥 극성수기 (본격 수확·직판 중)',
    shortLabel: '🔥 극성수기 (수확·판매 모드)',
    desc: '지금 당장 주문·DM 문의와 완판을 만드는 30일 실전 판매 달력 (새벽 수확, 속살 단면, 산더미 택배, 마감 임박)',
    defaultKeywordSuffix: '주문',
    ctaGoal: '즉시 직거래 주문 & 당일 발송 연결'
  },
  {
    id: 'preorder',
    badge: '⏳ 수확 임박·사전예약기 (2~4주 전)',
    shortLabel: '⏳ 수확 임박 (사전예약 모드)',
    desc: '첫 수확 기대감을 높여 공판장 가기 전 사전예약(농켓팅)을 꽉 채우는 30일 달력 (익어가는 과정, 당도 체크, 박스 입고)',
    defaultKeywordSuffix: '예약',
    ctaGoal: '첫 수확분 사전예약 & 얼리버드 혜택 안내'
  },
  {
    id: 'offseason',
    badge: '🌱 비수기·생육/밭 준비기 (팔 물건 없을 때)',
    shortLabel: '🌱 비수기 (생육관리·팬덤 구축 모드)',
    desc: '당장 팔 작물이 없어도 농부의 정직한 땀방울을 보여줘 수확 전에 미리 찐단골(알림 대기자)을 모으는 30일 달력',
    defaultKeywordSuffix: '알림',
    ctaGoal: '수확 오픈 알림 대기 신청 & 단골 신뢰 적립'
  }
];

// ★ [신규 탑재] 《BRACKET HOOK 100》 전자책 기반 10대 후킹 유형 데이터베이스 ★
const HOOK_TYPES = [
  {
    id: 'type01',
    code: 'TYPE 01 (001-010)',
    name: '손실·경고형',
    principle: '막연한 공포 대신 구매·작업 전 실제로 놓치기 쉬운 항목과 확인 기준을 제시합니다.',
    questionLeft: '지금 확인하지 않으면 무엇을 놓칠까?',
    template: '[작물 구매/보관] 하기 전, 이것부터 확인하세요. 여기서 실패하기 쉽습니다.',
    shortSubFn: (shortCrop) => `${shortCrop} 고를 때,\n이것만은 꼭 보세요`
  },
  {
    id: 'type02',
    code: 'TYPE 02 (011-020)',
    name: '상식·반전형',
    principle: '사람들이 당연하게 예상하는 선택을 뒤집고, 농부가 다른 선택을 한 구체적 이유를 보여줍니다.',
    questionLeft: '당연한 선택을 왜 하지 않았을까?',
    template: '[익숙한 방식] 대신, 저는 [농부의 반대 행동]부터 합니다.',
    shortSubFn: (shortCrop) => `수확량 절반 포기하고\n이걸 선택했습니다`
  },
  {
    id: 'type03',
    code: 'TYPE 03 (021-030)',
    name: '억울함·존중형',
    principle: '화려한 포장보다 보이지 않는 새벽 준비와 농부의 정직한 원칙, 일의 가치를 행동으로 증명합니다.',
    questionLeft: '사람들이 보는 짧은 결과 전에 어떤 시간이 있었을까?',
    template: '"[쉽게 보는 말]" 그 한 박스에 [실제로 든 시간과 노력]이 들어갔습니다.',
    shortSubFn: (shortCrop) => `택배 한 박스 뒤,\n새벽 4시의 기록`
  },
  {
    id: 'type04',
    code: 'TYPE 04 (031-040)',
    name: '현장·비하인드형',
    principle: '완성된 박스보다 예상 밖의 선별 과정, 과감히 뺀 파품, 지우지 않는 영농 기록을 먼저 보여줍니다.',
    questionLeft: '평소에는 볼 수 없던 농장 뒤편에 무슨 일이 있을까?',
    template: '[거의 다 싼 박스]를, 저는 제 손으로 다시 풀었습니다.',
    shortSubFn: (shortCrop) => `다 포장한 박스를\n다시 뜯었습니다`
  },
  {
    id: 'type05',
    code: 'TYPE 05 (041-050)',
    name: '실패·고백형',
    principle: '자랑보다 과거의 시행착오를 꺼내고, 그 계기 뒤에 세운 깐깐한 농장 기준 한 가지를 보여줍니다.',
    questionLeft: '왜 생각이 바뀌었고, 지금은 어떤 기준을 지킬까?',
    template: '[오래 해온 농사]를 하면서, 이 선별 기준은 [계기] 뒤에야 세웠습니다.',
    shortSubFn: (shortCrop) => `시행착오 끝에 만든\n우리 농장 1번 기준`
  },
  {
    id: 'type06',
    code: 'TYPE 06 (051-060)',
    name: '전후·비교형',
    principle: '차이는 말로 설명하지 않고 같은 조명과 각도에서 두 대상을 나란히 놓아 눈으로 확인시킵니다.',
    questionLeft: '같아 보이는데 무엇이 맛과 신선도를 갈랐을까?',
    template: '겉보기에는 같은 두 [작물], 반으로 갈라보니 속은 달랐습니다.',
    shortSubFn: (shortCrop) => `겉은 같아 보여도,\n속살은 달랐습니다`
  },
  {
    id: 'type07',
    code: 'TYPE 07 (061-070)',
    name: '질문·선택형',
    principle: '고객이 겪는 선택 상황을 제시해 판단 조건을 주고, 농부의 솔직한 추천 이유를 공개합니다.',
    questionLeft: '우리 집 식탁에는 어느 쪽이 맞을까?',
    template: '[작물] 고를 때, 아직도 [익숙한 겉모양]부터 보세요?',
    shortSubFn: (shortCrop) => `${shortCrop} 고를 때\n어디부터 보세요?`
  },
  {
    id: 'type08',
    code: 'TYPE 08 (071-080)',
    name: '실험·검증형',
    principle: '남의 확신보다 당도계, 저울, 보관 일수별 상태 등 직접 확인하고 기록한 조건과 결과를 보여줍니다.',
    questionLeft: '직접 재보고 갈라보면 정말 그렇게 나올까?',
    template: '[조건 하나]만 바꾸고, [작물 상태]를 직접 비교해 봤습니다.',
    shortSubFn: (shortCrop) => `직접 반으로 갈라\n확인해 봤습니다`
  },
  {
    id: 'type09',
    code: 'TYPE 09 (081-090)',
    name: '배려·감동형',
    principle: '감정을 강요하지 않고 손님에게 받은 짧은 문자, 메모, 덤 한 줌의 행동을 담담히 전합니다.',
    questionLeft: '작은 메모와 재주문 문자에는 어떤 사연이 있었을까?',
    template: '[작은 문자] 하나 때문에, 새벽 작업 중에 잠시 멈춰 섰습니다.',
    shortSubFn: (shortCrop) => `작업 중 멈춰 서게 한\n단골 문자 한 통`
  },
  {
    id: 'type10',
    code: 'TYPE 10 (091-100)',
    name: '타깃·공감형',
    principle: '모두가 아니라 지금 아이 간식·김장·부모님 선물을 고민하는 바로 그 사람의 순간을 정확히 호명합니다.',
    questionLeft: '이거 지금 우리 집 이야기 아닌가?',
    template: '[구체적 상황의 고객]이라면, 이 장면은 그냥 못 지나치실 겁니다.',
    shortSubFn: (shortCrop) => `아이 간식 고민 중이면\n이 장면만 보세요`
  }
];

// 강의 시연 및 농업인 실습을 위한 7대 품목별 원클릭 프리셋 데이터
const PRESETS = [
  {
    id: 'blueberry',
    badge: '🫐 블루베리·딸기',
    region: '충북 증평',
    crop: '블루베리·딸기 농장',
    years: '15년',
    phone: '010-1234-5678',
    dmKeyword: '주문',
    peakMonths: [6, 7, 12, 1, 2, 3],
    preorderMonths: [5, 11],
    seasonInfo: '성수기: 6~7월(블루베리), 12~3월(딸기) / 비수기: 8~10월(전정·화분관리·묘종준비)',
    card1: '아이들 먹일 건강한 간식을 찾는 3040 엄마',
    card2: '마트에서 산 과일이 무르고 신맛만 날까 봐 걱정함',
    card3: '오늘 새벽에 바로 딴 탱글탱글한 과육과 하얀 과분(신선도)',
    card4: '공판장 가기 전 새벽 수확 특대과만 선별해 당일 발송한다는 약속',
    rawStory: '충북 증평에서 15년째 블루베리와 딸기를 키우고 있습니다. 마트에서 사면 무르고 시다는 어머님들 말씀을 듣고, 새벽 5시에 하얀 과분이 살아있는 완숙 특대과만 골라 당일 발송하기 시작했습니다. 아기들이 먼저 알아보고 한 통을 다 비운다는 문자를 받을 때 가장 보람찹니다.'
  },
  {
    id: 'cabbage',
    badge: '🥬 배추·절임배추',
    region: '전북 익산',
    crop: '해풍 배추 & 황토 절임배추 농장',
    years: '15년',
    phone: '010-2345-6789',
    dmKeyword: '김장',
    peakMonths: [11, 12],
    preorderMonths: [9, 10],
    seasonInfo: '극성수기: 11~12월(김장철) / 사전예약기: 9~10월 / 비수기: 6~8월(밭갈이·파종·폭염관리)',
    card1: '가족 김장김치를 담글 싱싱한 배추를 찾는 3060 주부·엄마',
    card2: '속이 덜 차거나 무른 배추가 와서 1년 김장을 망칠까 봐 걱정함',
    card3: '반으로 쫙 갈랐을 때 노랗고 꽉 찬 배추 속살과 아삭한 소리',
    card4: '중국산과 달리 속이 단단하게 꽉 찬 국산 특품 배추만 산지 직송 보장',
    rawStory: '전북 익산 황토밭에서 15년째 배추 농사를 짓습니다. 1년 먹을 김장인데 속이 빈 배추가 올까 봐 걱정하시는 주부님들을 위해, 출하 전 반드시 밭에서 직접 반으로 갈라 노란 속살과 아삭한 두께를 확인한 특품만 박스에 담습니다.'
  },
  {
    id: 'rice',
    badge: '🌾 벼(수도작)·들깨',
    region: '전남 해남',
    crop: '벼(수도작) 쌀 & 생들기름 직거래 농가',
    years: '2대째 25년',
    phone: '010-3456-7890',
    dmKeyword: '햅쌀',
    peakMonths: [9, 10, 11],
    preorderMonths: [8],
    seasonInfo: '극성수기: 9~11월(추수·햅쌀·햇들깨) / 연중상시: 당일도정 쌀 / 비수기: 5~7월(모내기·논물관리)',
    card1: '가족 집밥을 챙기며 밥맛과 식재료 신선도에 민감한 4060 주부',
    card2: '도정한 지 오래된 묵은쌀이거나 중국산이 섞였을까 봐 불신함',
    card3: '주문 즉시 당일 도정하는 정미 현장의 쌀눈과 갓 짜낸 맑은 들기름',
    card4: '도정한 지 24시간 이내 발송, 밥맛 없으면 100% 환불 보장',
    rawStory: '전남 해남에서 2대째 25년 동안 벼농사와 들깨 농사를 짓고 있습니다. 쌀은 도정한 순간부터 산패가 시작되기 때문에 미리 찧어두지 않고 주문이 들어온 날 당일 도정해서 쌀눈이 살아있는 상태로 보내드립니다.'
  },
  {
    id: 'pumpkin',
    badge: '🎃 밤호박·감자·고추',
    region: '강원 홍천',
    crop: '미니 밤호박·두백감자·태양초 고추 재배',
    years: '12년',
    phone: '010-4567-8901',
    dmKeyword: '농장',
    peakMonths: [6, 7, 8, 9],
    preorderMonths: [5],
    seasonInfo: '극성수기: 6~9월(햇감자·밤호박·건고추) / 비수기: 11~4월(종자선별·퇴비주기·파종)',
    card1: '다이어트 식단과 부모님 건강 간식을 함께 챙기는 3050 여성',
    card2: '인터넷으로 박스로 샀는데 속이 맹탕이거나 썩은 게 올까 봐 걱정함',
    card3: '밭에서 갓 캔 뽀얀 흙감자와 반으로 쪼갰을 때 포슬포슬한 밤호박 단면',
    card4: '농부가 직접 쪄서 당도 확인 후 파품 없이 정품만 골라 산지 직송',
    rawStory: '강원 홍천에서 12년째 미니 밤호박과 두백감자를 키웁니다. 인터넷으로 박스로 샀다가 맹탕이라 버렸다는 분들이 많아서, 저희는 후숙 창고에서 매일 샘플을 직접 쪄보고 밤처럼 포슬포슬한 분질도가 올라온 날에만 발송을 시작합니다.'
  },
  {
    id: 'persimmon',
    badge: '🍊 감나무·매실 과수원',
    region: '경북 상주',
    crop: '감나무(단감·곶감) & 황매실 과수원',
    years: '20년',
    phone: '010-5678-9012',
    dmKeyword: '특대과',
    peakMonths: [6, 10, 11, 12, 1],
    preorderMonths: [5, 9],
    seasonInfo: '극성수기: 6월(매실), 10~1월(단감·곶감) / 비수기: 2~4월, 7~8월(전정·적과·여름방제)',
    card1: '제철 매실청을 담그거나 명절·부모님 선물을 준비하는 4060 고객',
    card2: '크기가 들쭉날쭉하거나 배송 중 상처가 나서 선물하기 민망할까 봐 걱정',
    card3: '나무에서 바로 따는 아삭한 소리와 흠집 하나 없이 꼼꼼히 포장하는 손길',
    card4: '백화점 납품 등급의 특대과를 산지 직거래 가격으로 안전 포장 발송',
    rawStory: '경북 상주에서 20년째 감나무와 매실 과수원을 일구고 있습니다. 부모님 선물용으로 보내시는 분들이 많아, 미세한 나뭇가지 스침 자국만 있어도 직거래 선물 박스에서는 과감히 빼고 특대과만 3중 완충 포장해 보냅니다.'
  },
  {
    id: 'tree',
    badge: '🌲 조경수·묘목 농장',
    region: '전북 완주',
    crop: '조경수·정원수·유실수 직접 재배 농장',
    years: '30년',
    phone: '010-6789-0123',
    dmKeyword: '견적',
    peakMonths: [3, 4, 5, 10, 11],
    preorderMonths: [2, 9],
    seasonInfo: '극성수기: 3~5월(봄 식재), 10~11월(가을 식재) / 비수기: 6~8월, 12~2월(전정·수형관리·월동)',
    card1: '전원주택 정원을 꾸미거나 카페 조경을 준비하는 4060 건축주·사장님',
    card2: '비싸게 나무를 심었는데 뿌리가 제대로 안 붙어 죽을까 봐 두려움',
    card3: '30년 농부가 전지가위로 멋지게 수형을 잡는 모습과 튼튼한 분 작업(뿌리)',
    card4: '중간 유통 거품 없는 농장 직거래가 및 심는 법·사후 관리까지 친절 상담',
    rawStory: '전북 완주에서 30년째 조경수와 묘목을 키웁니다. 나무는 겉모양보다 땅속 잔뿌리(분 작업)가 생명을 결정합니다. 비싸게 심고 죽이는 일이 없도록 굴취할 때 뿌리 분을 꼼꼼히 감싸고 식재 후 물주기까지 끝까지 안내해 드립니다.'
  },
  {
    id: 'livestock',
    badge: '🐄 축사·양봉 농가',
    region: '경남 거창',
    crop: '청정 한우 축사 & 천연 숙성꿀 농가',
    years: '18년',
    phone: '010-7890-1234',
    dmKeyword: '예약',
    peakMonths: [1, 2, 5, 6, 7, 9, 10],
    preorderMonths: [4, 8, 12],
    seasonInfo: '극성수기: 5~7월(채밀·여름보양), 1·9월(명절) / 비수기: 11~12월, 3월(월동사양·축사방역)',
    card1: '부모님 보양식이나 아이들 먹일 진짜 믿을 수 있는 먹거리를 찾는 4050 가장',
    card2: '위생이 불결한 곳에서 키웠거나 설탕 섞인 가짜 꿀일까 봐 걱정함',
    card3: '깨끗하게 관리된 축사 바닥에서 여물 먹는 건강한 소와 걸쭉하게 떨어지는 진짜 꿀',
    card4: '내 가족이 먹는다는 소신으로 항생제·첨가물 없이 정직하게 키워 직판',
    rawStory: '경남 거창에서 18년째 축사와 양봉을 하고 있습니다. 설탕 타지 않은 진짜 천연 숙성꿀을 얻기 위해 수확량을 절반으로 줄이더라도 벌들이 날개짓으로 수분을 다 날릴 때까지 기다렸다가 채밀합니다.'
  }
];

// ★ 선택한 [월(1~12월)] + [시즌 상태] + [BRACKET HOOK 100 유형]이 결합된 30일 컨텐츠 달력 생성기 ★
const buildInstant30DayCalendar = (
  region,
  crop,
  years,
  card1,
  card2,
  card3,
  card4,
  dmKeyword,
  selectedMonth = 11,
  seasonMode = 'peak'
) => {
  const shortCrop = crop.split(' ')[0] || '농산물';
  const monthObj = MONTH_DATA.find((m) => m.month === Number(selectedMonth)) || MONTH_DATA[10];
  const mLabel = monthObj.label;
  const sTag = monthObj.seasonTag;
  const cleanKeyword = dmKeyword?.trim() || (seasonMode === 'offseason' ? '알림' : seasonMode === 'preorder' ? '예약' : '주문');

  let rawList = [];

  if (seasonMode === 'offseason') {
    rawList = [
      { day: 1, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `${mLabel}(${sTag}) 남들 쉴 때 ${region} 농부가 밭에 나온 이유`, sceneSummary: `수확이 끝난(또는 파종 전인) ${crop} 밭을 걸으며 장갑을 고쳐 끼고 흙 상태를 살피는 손`, soundPoint: '흙 밟는 소리와 계절 바람 소리', whyItSells: '팔 물건이 없는 달에도 묵묵히 밭을 가꾸는 모습으로 진성 단골 신뢰 적립', hookPreview: `지금은 팔 ${shortCrop}도 없는데 왜 매일 밭에 나오냐고요?` },
      { day: 2, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `다음 수확 ${shortCrop} 맛을 좌우하는 보약(퇴비·거름) 주기`, sceneSummary: `잘 부숙된 퇴비나 친환경 영양제를 포대에서 쏟아 밭에 골고루 뿌려주는 손`, soundPoint: '포대 뜯는 소리와 흙에 촤르르 뿌려지는 소리', whyItSells: `"${card2}"라는 고객 불신을 비수기 토양 관리 과정으로 원천 해소`, hookPreview: `${shortCrop} 맛의 80%는 ${mLabel} 이 땅심에서 결정됩니다` },
      { day: 3, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `전지가위(또는 작업 도구) 날 갈고 정비하는 날`, sceneSummary: `${years} 동안 손때 묻은 전지가위나 호미, 농기구를 숫돌에 갈고 기름칠하는 손 클로즈업`, soundPoint: '스윽스윽 쇠 갈리는 리얼 ASMR 소리', whyItSells: '장인의 도구 관리 영상을 통해 꼼꼼하고 정직한 농장 이미지 각인', hookPreview: `${years}째 제 손발이 되어준 보물 1호입니다` },
      { day: 4, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `건강한 뿌리를 위한 과감한 가지치기(전정)·고랑 정비`, sceneSummary: `불필요한 가지나 잡초를 가위로 톡톡 잘라내어 햇빛과 바람 길을 터주는 작업 전후`, soundPoint: '가위로 톡! 톡! 경쾌하게 자르는 소리', whyItSells: '비수기 최고의 ASMR 소재로 시청 지속시간(체류시간) 폭발 유도', hookPreview: `아까워 보여도 지금 과감히 잘라내야 특대과가 열립니다` },
      { day: 5, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `${mLabel} 날씨(${sTag})와의 사투! 농장 배수로·보온 점검`, sceneSummary: `${monthObj.weatherHook} 현장에서 비닐이나 배수로, 축사/하우스를 단단히 고정하는 손`, soundPoint: '비닐 팽팽하게 당기는 소리와 현장 작업음', whyItSells: '기후 변화를 이겨내며 작물을 지키는 농부의 땀방울에 응원 댓글 집중', hookPreview: `${mLabel} 날씨 예보 보고 새벽부터 달려 나왔습니다` },
      { day: 6, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `흙 한 줌 쥐어보면 아는 우리 농장 땅의 힘`, sceneSummary: `촉촉하고 부드러운 밭흙을 손바닥 가득 쥐었다가 스르르 놓으며 토질을 보여주는 초근접 샷`, soundPoint: '부드러운 흙이 부서지는 바스락 소리', whyItSells: '화학비료 범벅이 아닌 살아있는 땅에서 키운다는 시각적 증명', hookPreview: `스펀지처럼 폭신한 이 흙에서 ${shortCrop}이 자랍니다` },
      { day: 7, week: 1, category: `${mLabel} 비수기 · 기본기`, title: `비수기에도 매일 들어오는 "언제 나와요?" 문의 답장하기`, sceneSummary: `작업장 의자에 앉아 작업복 차림으로 휴대폰 문자/DM에 답장하는 손`, soundPoint: '차분한 농장 일상 소리와 자판 터치음', whyItSells: '비수기에도 찾는 단골이 많다는 것을 자연스럽게 보여주며 대기 수요 자극', hookPreview: `벌써 ${shortCrop} 언제 나오냐고 물어보시는 단골분들께` },
      { day: 8, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `작은 씨앗·모종(또는 겨울눈)이 기특하게 자리 잡는 모습`, sceneSummary: `손가락 마디만 한 어린 새순이나 겨울눈, 뿌리 상태를 조심스럽게 가리키는 손`, soundPoint: '살랑이는 바람 소리와 새소리', whyItSells: '작물이 자라나는 성장 일기를 공유해 소비자가 함께 키우는 듯한 팬덤 형성', hookPreview: `요랬던 녀석이 몇 달 뒤면 식탁 위 특대과가 됩니다` },
      { day: 9, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `농약 덜 치고 몸이 고생하는 친환경 벌레·잡초 관리법`, sceneSummary: `손으로 직접 풀을 뽑거나 친환경 자재를 희석해 살포 준비하는 과정`, soundPoint: '물 섞는 소리와 풀 뽑는 소리', whyItSells: `${card1} 고객이 가장 안심하고 팔로우하게 만드는 핵심 콘텐츠`, hookPreview: `제 몸이 조금 더 힘들면 드시는 분은 100% 안심하시니까요` },
      { day: 10, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `남들은 몰라도 농부 눈에만 보이는 ${mLabel} 생육 체크 포인트`, sceneSummary: `잎사귀 뒷면이나 줄기 굵기, 흙의 수분 상태를 손가락으로 짚어 확인하는 장면`, soundPoint: '잎사귀 스치는 사각사각 소리', whyItSells: `${years} 베테랑 농부의 전문성을 보여주어 깊은 신뢰 확보`, hookPreview: `잎사귀 색깔만 봐도 지금 뭐가 부족한지 다 보입니다` },
      { day: 11, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `트랙터·관리기(또는 작업 장비) 시동 걸고 밭 가는 날`, sceneSummary: `농기계 레버를 조작하는 손과 뒤집어지는 신선한 흙고랑 클로즈업`, soundPoint: '부르릉 경쾌한 엔진음과 흙 뒤집히는 소리', whyItSells: '역동적인 농촌 현장감으로 남녀노소 높은 조회수를 기록하는 단골 소재', hookPreview: `일 년 농사 밑그림 그리는 날! 속이 다 시원합니다` },
      { day: 12, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `수확량을 절반 포기하더라도 솎아내기(적화·적과) 하는 이유`, sceneSummary: `작은 열매나 꽃봉오리, 솎음 채소를 과감히 떼어내어 바닥에 떨어뜨리는 손`, soundPoint: '톡톡 떼어내는 소리', whyItSells: '양보다 품질(특품)을 선택하는 농장의 철학을 가장 극적으로 보여줌', hookPreview: `욕심부려 다 키우면 맛이 없거든요. 과감히 비워냅니다` },
      { day: 13, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `${region}의 낮과 밤 일교차가 ${shortCrop}을 맛있게 만드는 비밀`, sceneSummary: `해 질 녘 노을이 지는 농장 풍경과 온도계를 확인하는 농부의 손`, soundPoint: '저녁 풀벌레 소리와 고요한 바람 소리', whyItSells: `왜 다른 지역이 아니라 '${region} ${shortCrop}'이어야 하는지 지리적 명분 제공`, hookPreview: `${region} ${shortCrop}이 유독 달고 단단한 이유가 바로 이겁니다` },
      { day: 14, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `비수기 농부의 점심 새참과 소박한 시골 일상`, sceneSummary: `작업장 한켠에서 보온병 커피나 고구마·국수를 나누어 먹는 정겨운 손`, soundPoint: '따뜻한 차 따르는 소리와 담소 소리', whyItSells: '인간적인 매력과 정감을 주어 팔로워와의 심리적 거리감을 좁힘', hookPreview: `${mLabel} 밭일하다 마시는 커피 한 잔이 보약입니다` },
      { day: 15, week: 2, category: `${mLabel} 비수기 · 생육ASMR`, title: `작년 수확 때 호평받았던 영상 다시 보며 올해 다짐하기`, sceneSummary: `작년 최상품 수확 장면을 짧게 보여준 뒤 현재 무럭무럭 자라는 밭을 비추는 구성`, soundPoint: '활기찬 현장 작업음', whyItSells: '비수기 유입 시청자에게 "수확 때 이런 최상품이 나오는 곳"임을 미리 각인', hookPreview: `작년에 보내주신 성원, 올해는 더 단단한 품질로 보답하겠습니다` },
      { day: 16, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `${years} 농부가 알려주는 마트에서 실패 없는 농산물 고르는 법`, sceneSummary: `시중에서 볼 수 있는 작물(또는 저장분) 2개를 들고 꼭지·무게·표면 비교 시연`, soundPoint: '통통 두드리는 소리', whyItSells: '비수기에도 주부 타겟이 계정을 팔로우하고 영상을 "저장"하게 만드는 정보성 릴스', hookPreview: `우리 농장 수확 전이라도 마트에서 이거 보고 고르세요!` },
      { day: 17, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `남은 ${shortCrop}(또는 저장 식재료) 끝까지 아삭하게 보관하는 법`, sceneSummary: `키친타월이나 밀폐용기, 신문지로 감싸 냉장고에 넣는 손동작 3컷`, soundPoint: '바스락거리는 포장 소리', whyItSells: '정보성 릴스로 알고리즘 추천을 타서 잠재 고객 풀을 넓히는 전략', hookPreview: `아직도 그냥 비닐봉지째 냉장고에 넣으시나요? (저장 필수)` },
      { day: 18, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `비수기에만 맛볼 수 있는 농가 비법 요리·활용 레시피`, sceneSummary: `저장해 둔 작물이나 말린 나물, 청·즙 등을 활용해 뚝딱 요리해 내는 손`, soundPoint: '지글지글 또는 보글보글 요리 ASMR', whyItSells: '식욕을 자극하며 작물의 다양한 활용 가치를 알려줌', hookPreview: `${mLabel}에 이렇게 해 드시면 밥 한 공기 뚝딱입니다` },
      { day: 19, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `수입산과 국산 ${shortCrop} 구별하는 핵심 기준`, sceneSummary: `뿌리 모양이나 속살 결, 색깔 차이를 손가락으로 명확히 짚어주는 비교 영상`, soundPoint: '선명한 현장 설명 또는 효과음', whyItSells: `"${card4}"라는 국산 정품의 가치를 소비자에게 교육`, hookPreview: `딱 이 부분만 보면 국산인지 바로 구별할 수 있습니다` },
      { day: 20, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `농부네 가족이 1년 내내 챙겨 먹는 식탁 기록`, sceneSummary: `아침 식탁에 올라온 농산물 요리와 건강하게 차려낸 한 상 클로즈업`, soundPoint: '그릇 놓는 정겨운 식탁 소리', whyItSells: `핵심 고객(${card1})의 가족 식단 니즈와 깊이 공감`, hookPreview: `${years}째 농사지으면서 저희 가족이 매일 먹는 방법입니다` },
      { day: 21, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `소비자분들이 가장 많이 오해하시는 ${shortCrop} 표면의 비밀`, sceneSummary: `하얀 분(과분)이나 자연스러운 표면을 손으로 보여주며 설명하는 장면`, soundPoint: '부드럽게 문지르는 소리', whyItSells: '품질 관련 오해를 미리 풀어주어 향후 배송 후 클레임을 예방', hookPreview: `혹시 이물질인 줄 알고 박박 씻으셨나요? 신선함의 증거입니다!` },
      { day: 22, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `영양제를 직접 계량해 주는 깐깐한 영농 기록장`, sceneSummary: `농장 달력이나 영농일지에 날짜와 작업 내역을 꼼꼼히 적는 농부의 손`, soundPoint: '종이 넘기는 소리와 펜 사각거리는 소리', whyItSells: '체계적이고 정직하게 관리되는 농장이라는 백 마디 말보다 강한 증거', hookPreview: `언제 무슨 작업을 했는지 하루도 빠짐없이 기록합니다` },
      { day: 23, week: 3, category: `${mLabel} 비수기 · 정보·꿀팁`, title: `동료 농부님도 인정한 올해 우리 밭 생육 상태`, sceneSummary: `푸릇푸릇하거나 정갈하게 관리된 밭고랑을 쭉 훑어 보여주는 뿌듯한 시점`, soundPoint: '현장 바람 소리와 발걸음 소리', whyItSells: '다가올 수확 시즌의 품질에 대한 기대감을 최고조로 끌어올림', hookPreview: `지나가시는 어르신들이 올해 우리 밭 상태가 제일 좋다고 하시네요` },
      { day: 24, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `작년 구매 고객님들의 재문의 문자 다시 꺼내 보기`, sceneSummary: `정성껏 일하는 손 위로 작년 단골 고객들의 재구매 문의 자막 배치(개인정보 가림)`, soundPoint: '잔잔한 농장 작업 ASMR', whyItSells: '신규 방문자에게 "여긴 단골이 먼저 찾는 농장이구나"라는 확신 부여', hookPreview: `비수기에 힘들다가도 이 문자 보면 다시 힘이 납니다` },
      { day: 25, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `올해 새로 바꾼 더 튼튼한 직거래 택배 박스 강도 테스트`, sceneSummary: `새로 맞춘 두꺼운 박스를 손으로 눌러보며 완충 구조를 점검하는 장면`, soundPoint: '통통 단단한 박스 두드리는 소리', whyItSells: '수확 전부터 배송 안전성까지 준비하는 프로 농부 이미지', hookPreview: `올해는 단 한 알도 상하지 않게 박스부터 바꿨습니다` },
      { day: 26, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `도매 납품 외에 직거래 단골 물량을 따로 남겨두는 이유`, sceneSummary: `밭 한가운데서 잘 자라는 작물을 쓰다듬으며 직거래 고객을 향한 약속 전달`, soundPoint: '진솔한 현장 작업음', whyItSells: '직거래 단골 고객들에게 대접받는 느낌과 소속감을 선물', hookPreview: `공판장 출하 전 단골분들 몫부터 가장 먼저 챙겨둡니다` },
      { day: 27, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `첫 수확까지 앞으로 O개월! 현재 생육 상태 중간 보고`, sceneSummary: `부쩍 자란 작물의 크기나 상태를 손바닥과 비교해 보여주는 근접 촬영`, soundPoint: '싱그러운 잎사귀 스치는 소리', whyItSells: '기다리는 고객들에게 진행 상황을 투명하게 공유해 이탈 방지', hookPreview: `기다려 주시는 분들께 보고드립니다! 이렇게 잘 크고 있어요` },
      { day: 28, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `프로필 하이라이트에 [수확일정·농장일기] 정리해 두었습니다`, sceneSummary: `농장 전경과 함께 스마트폰 화면의 프로필 하이라이트 버튼을 가리키는 손`, soundPoint: '경쾌한 현장음', whyItSells: '프로필 방문 및 팔로우 전환율을 높이는 동선 안내', hookPreview: `저희 농장 수확 시기와 소식, 프로필에 다 정리해 뒀어요` },
      { day: 29, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `수확 시작할 때 1등으로 연락받을 [우선 알림 명단] 신청받습니다`, sceneSummary: `수확 예정인 밭을 배경으로 장갑 낀 손으로 댓글창 방향을 가리키는 동작`, soundPoint: '활기찬 현장 소리', whyItSells: `비수기 매니챗 핵심 전략: 미리 [${cleanKeyword}] 댓글로 잠재고객 DB 확보`, hookPreview: `수확 시작하면 제일 먼저 DM 드릴게요! 댓글에 [${cleanKeyword}] 남겨주세요` },
      { day: 30, week: 4, category: `${mLabel} 비수기 · 팬덤·알림모집`, title: `${mLabel} 한 달간 땀 흘린 농장 총정리 & 다음 달 예고`, sceneSummary: `한 달 동안 달라진 밭의 전후 모습(Before & After)을 같은 구도로 연결`, soundPoint: '기분 좋은 작업 마무리 소리', whyItSells: '꾸준함과 성실함을 증명하며 다음 달 컨텐츠까지 기대하게 만듦', hookPreview: `${mLabel} 한 달도 정직하게 키웠습니다. 댓글에 [${cleanKeyword}] 남기시고 소식 받으세요!` }
    ];
  } else if (seasonMode === 'preorder') {
    rawList = [
      { day: 1, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `드디어 D-14! ${region} ${shortCrop} 수확 카운트다운 시작`, sceneSummary: `탐스럽게 익어가는(또는 속이 차오르는) ${shortCrop} 밭 고랑을 걸으며 상태를 살피는 손`, soundPoint: '설레는 발걸음 소리와 잎사귀 스치는 소리', whyItSells: '1년을 기다린 제철 농산물이 곧 나온다는 신호탄으로 기존 단골 결집', hookPreview: `1년을 기다리셨습니다! ${region} ${shortCrop} 첫 수확 임박!` },
      { day: 2, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `${mLabel} 일교차 덕분에 하루가 다르게 차오르는 빛깔과 크기`, sceneSummary: `햇빛을 받아 윤기가 흐르는 작물을 손바닥 위에 올려 크기를 가늠해 보는 장면`, soundPoint: '통통! 단단하게 여문 소리', whyItSells: `"${card3}"가 완성되어 가는 모습을 실시간으로 중계`, hookPreview: `${mLabel} 햇살 받고 매일매일 속이 꽉 차오르고 있습니다` },
      { day: 3, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `농부가 제일 먼저 하나 따서 해보는 첫 속살 테스트!`, sceneSummary: `수확 직전 샘플로 하나를 수확해 그 자리에서 반으로 쪼개 단면을 확인하는 손`, soundPoint: '쩍! 아삭! 갈라지는 리얼 사운드', whyItSells: '농부도 감탄하는 올해 첫 속살 공개로 사전예약 욕구 자극', hookPreview: `아직 정식 수확 전인데 하나만 먼저 갈라보겠습니다!` },
      { day: 4, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `마지막까지 맛을 끌어올리는 수확 직전 특별 관리`, sceneSummary: `수분 조절이나 햇빛 받기 작업을 위해 잎을 정리해 주거나 밭을 살피는 손`, soundPoint: '바스락거리는 현장 작업음', whyItSells: '마지막 순간까지 품질에 타협하지 않는 장인정신 어필', hookPreview: `수확 전 딱 일주일, 이때 관리가 맛의 차이를 만듭니다` },
      { day: 5, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `올해 작황 보고: 왜 올해 우리 농장 ${shortCrop}을 주목해야 할까?`, sceneSummary: `가장 잘 자란 구역의 작물들을 연달아 클로즈업하며 엄지척을 들어 보이는 손`, soundPoint: '싱그러운 농장 현장음', whyItSells: `${years} 농부가 보증하는 올해 품질 자신감 전달`, hookPreview: `${years} 농사지으면서 올해처럼 잘 여문 해가 드뭅니다` },
      { day: 6, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `공판장 경매사님도 탐내는 우리 밭 특품 라인업`, sceneSummary: `크기와 모양이 균일하게 잘 빠진 최상품들을 줄지어 비추는 화면`, soundPoint: '현장 바람 소리와 작업음', whyItSells: '도매상에게 넘어가기 전에 먼저 선점해야 한다는 심리 자극', hookPreview: `공판장 가져가면 상위 등급 받을 특품들입니다` },
      { day: 7, week: 1, category: `${mLabel} 사전예약 · 기대감`, title: `사전예약 오픈 예고! 댓글에 [${cleanKeyword}] 남기시면 링크 발송`, sceneSummary: `탐스러운 작물 앞에서 스마트폰 주문서 화면을 잠시 보여주고 손짓하는 장면`, soundPoint: '경쾌한 현장음', whyItSells: '정식 수확 전 매니챗으로 첫 사전예약 주문 전환 시작', hookPreview: `내일부터 첫 수확 사전예약 받습니다! 댓글에 [${cleanKeyword}] 남겨주세요` },
      { day: 8, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `당도계(또는 무게·속살) 사전 측정 기록 공개`, sceneSummary: `실제 측정기나 저울 위에 올려 숫자를 카메라 정면에 선명하게 인증하는 손`, soundPoint: '삑! 측정 완료 소리와 과즙/아삭 소리', whyItSells: `"${card2}"라는 고객의 의심을 객관적 기록으로 해소`, hookPreview: `수확 일주일 전 샘플 측정 기록을 그대로 공개합니다` },
      { day: 9, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `작업장에 도착한 올해 새 택배 박스 언박싱!`, sceneSummary: `묶음으로 도착한 새 박스를 풀고 하나를 뚝딱 접어 보여주는 손`, soundPoint: '박스 접는 경쾌한 각 잡히는 소리', whyItSells: '본격적인 시즌이 시작되었다는 현장감과 출하 준비 완료 증명', hookPreview: `오늘 작업장에 새 택배 박스가 들어왔습니다! 준비 완료!` },
      { day: 10, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `배송 중 흔들리지 않게! 올해 업그레이드된 완충 포장 시연`, sceneSummary: `그물망·에어캡·아이스팩·간지 등을 넣고 흔들림 없는지 테스트하는 손`, soundPoint: '테이프 쫙 붙이는 소리', whyItSells: '사전예약 결제 전 가장 망설이는 배송 파손 걱정을 덜어줌', hookPreview: `흔들려도 안심하도록 올해는 포장재를 한 단계 더 높였습니다` },
      { day: 11, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `선별기 가동 테스트 & 작업장 대청소 완료`, sceneSummary: `선별기나 세척기, 포장 작업대를 깨끗하게 닦고 시험 가동하는 모습`, soundPoint: '웅~ 힘차게 돌아가는 선별기 소리', whyItSells: '위생적이고 깨끗한 작업 환경을 보여주어 주부 고객 안심 유도', hookPreview: `첫 수확 맞이 작업장 대청소와 선별기 점검을 마쳤습니다` },
      { day: 12, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `특대과 vs 대과 vs 실속형, 우리 집엔 어떤 사이즈가 맞을까?`, sceneSummary: `크기별 샘플 2~3가지를 나란히 놓고 종이컵이나 손바닥과 직관적으로 비교`, soundPoint: '테이블 위에 나란히 놓는 소리', whyItSells: '고객이 주문서에서 고민하지 않고 바로 선택할 수 있게 돕는 친절 가이드', hookPreview: `선물용이세요, 집에서 드실 건가요? 기준을 딱 잡아드립니다!` },
      { day: 13, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `사전예약 고객님께만 드리는 농부의 혜택 안내`, sceneSummary: `기본 박스에 정량보다 넉넉하게 더 얹어 넣는 인심 좋은 손`, soundPoint: '묵직하게 더 채워 넣는 소리', whyItSells: '나중에 사지 않고 지금 바로 사전예약해야 할 이유 제공', hookPreview: `미리 믿고 예약해 주신 분들께는 섭섭지 않게 챙겨드립니다` },
      { day: 14, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `작년에 늦어서 못 드셨던 단골분들의 사전예약 접수 중`, sceneSummary: `개인정보를 가린 사전예약 주문 장부를 체크하는 손`, soundPoint: '종이 넘기는 소리와 펜 체크 소리', whyItSells: '품절 우려 심리를 자극해 빠른 예약 참여 유도', hookPreview: `작년에 조기 마감돼서 아쉬웠던 단골분들이 먼저 찾아주시네요` },
      { day: 15, week: 2, category: `${mLabel} 사전예약 · 품질검증`, title: `밭에서 바로 해 먹는 첫 시식! 아삭함·달콤함 리얼 사운드`, sceneSummary: `갓 수확한 샘플을 현장에서 크게 한 입 베어 물거나 조리해 먹는 손`, soundPoint: '침 고이는 리얼 먹방 ASMR 소리', whyItSells: '시청자의 미각을 자극해 즉시 댓글로 예약 문의를 남기게 만듦', hookPreview: `소리가 설명해 줍니다! 올해 첫 샘플 시식 현장입니다` },
      { day: 16, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `첫 수확 D-5! 올해 첫물 ${shortCrop} 예약 마감 임박`, sceneSummary: `출하 직전 잘 익은 작물 클로즈업과 수확 바구니 준비 장면`, soundPoint: '바구니 부딪히는 경쾌한 소리', whyItSells: '"첫물"이 주는 특별함과 한정 수량 마감 효과 결합', hookPreview: `영양분 가득 머금은 올해 첫물, 이제 예약 마감 코앞입니다` },
      { day: 17, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `받으시면 바로 이렇게 해 드세요! 농부 추천 1등 활용법`, sceneSummary: `가장 맛있게 먹는 손질법이나 조리 과정을 3컷으로 빠르게 시연`, soundPoint: '도마 칼질 소리와 요리 소리', whyItSells: '구매 후 식탁의 모습을 구체적으로 그려주어 전환 유도', hookPreview: `다음 주에 택배 받으시면 제일 먼저 이렇게 드셔보세요!` },
      { day: 18, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `부모님·지인 선물용으로도 사전예약이 많은 이유`, sceneSummary: `깔끔한 포장 박스와 안내장, 정갈하게 담긴 내부 구성을 여닫는 손`, soundPoint: '단정한 박스 여닫는 소리', whyItSells: '선물용 복수 주문으로 연결하는 전략', hookPreview: `보내시는 분 마음까지 전해지도록 제일 좋은 걸로 채웁니다` },
      { day: 19, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `"언제 발송되나요?" 사전예약 순차 발송 일정 안내`, sceneSummary: `달력에 첫 수확 및 발송 시작 날짜를 동그라미 치며 안내하는 손`, soundPoint: '매직으로 동그라미 그리는 소리', whyItSells: '예약 구매자의 가장 큰 궁금증인 배송 일정을 명확히 공지해 신뢰 상승', hookPreview: `예약하신 순서대로 가장 싱싱한 날 수확해 바로 출발합니다` },
      { day: 20, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `새벽 이슬 머금은 수확 직전 ${region} 농장 한 바퀴`, sceneSummary: `아침 햇살이 비치는 농장 전체 풍경에서 탐스러운 작물로 다가가는 샷`, soundPoint: '상쾌한 아침 새소리와 바람 소리', whyItSells: '산지 직송의 청정함과 신선함을 시각적으로 극대화', hookPreview: `이 맑은 공기와 햇살 먹고 자란 아이들이 곧 찾아갑니다` },
      { day: 21, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `못난이·파품은 아예 처음부터 걸러내는 농부의 기준`, sceneSummary: `기준에 살짝 못 미치는 작물을 과감히 옆으로 빼놓는 단호한 손동작`, soundPoint: '바구니에 분류해 담는 소리', whyItSells: `"${card4}" 약속을 눈으로 재확인시켜 마지막 망설임 제거`, hookPreview: `예약 주문은 특품 중에서도 상위 등급만 골라 보냅니다` },
      { day: 22, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `어머님들을 위한 전화·문자 간편 예약 안내`, sceneSummary: `큼직하게 적은 농장 직통 전화번호 종이와 싱싱한 작물을 함께 비추는 화면`, soundPoint: '친절하고 또렷한 안내 음향', whyItSells: '중장년층 및 유튜브 쇼츠 시청자의 전화·문자 주문을 흡수', hookPreview: `링크 누르기 어려우신 분들은 댓글에 [${cleanKeyword}] 또는 문자 주세요!` },
      { day: 23, week: 3, category: `${mLabel} 사전예약 · 예약집중`, title: `1차 사전예약 마감 임박! 감사 인사와 잔여 수량 공지`, sceneSummary: `예약 송장 묶음을 손으로 정리하며 인사하는 농부의 손과 작업장`, soundPoint: '송장 종이 넘기는 소리', whyItSells: '실제 예약 진행 상황을 공유해 잠재고객의 행동 유도', hookPreview: `믿고 예약해 주셔서 감사합니다! 1차분 얼마 남지 않았어요` },
      { day: 24, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `드디어 오늘 새벽 5시! 올해 첫 정식 수확을 시작합니다`, sceneSummary: `아침 햇살 아래 첫 수확의 가위질/수확을 시작하는 역사적인 첫 컷`, soundPoint: '톡! 사각! 감격스러운 첫 수확 ASMR', whyItSells: '기다려온 팬덤에게 첫 수확의 현장감을 전달하며 반응 유도', hookPreview: `드디어 오늘 새벽, 올해 첫 수확을 시작했습니다!` },
      { day: 25, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `갓 수확해 작업장으로 들어오는 싱싱한 첫물!`, sceneSummary: `수확 바구니와 콘티 박스에 가득 담긴 작물들이 작업장으로 들어오는 현장`, soundPoint: '바구니 내려놓는 묵직하고 활기찬 소리', whyItSells: '생동감 넘치는 수확 현장으로 구매 전환 연결', hookPreview: `방금 밭에서 들어온 싱싱함 그대로! 윤기가 다릅니다` },
      { day: 26, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `사전예약 1차분 오늘 안전 포장해 첫 출발합니다!`, sceneSummary: `줄지어 포장된 첫 출하 택배 박스들 위에 테이핑하는 빠른 손놀림`, soundPoint: '테이핑 소리와 박스 정리 소리', whyItSells: '약속을 정확히 지키는 신뢰도와 함께 2차 주문 유도', hookPreview: `오래 기다리셨습니다! 예약하신 순서대로 오늘 첫차로 출발!` },
      { day: 27, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `첫 택배 받아보신 예약 고객님들의 실제 답장 소개`, sceneSummary: `오늘도 바쁘게 포장하는 손을 배경으로 동의받은 고객 후기 요약 자막 노출`, soundPoint: '분주한 작업장 포장 ASMR', whyItSells: '첫 수확 물량의 만족도를 공유해 관망하던 고객까지 흡수', hookPreview: `어제 첫 택배 받으신 고객님들 답장에 피로가 싹 풀립니다` },
      { day: 28, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `사전예약 혜택 종료 안내! 정식 판매 전환 전 마지막 기회`, sceneSummary: `특품 작물을 박스에 가득 채우고 뚜껑을 덮는 손 클로즈업`, soundPoint: '박스 닫는 소리', whyItSells: '혜택 마감 기한을 제시하여 전환율 향상', hookPreview: `사전예약 혜택은 이번 주까지만 진행합니다!` },
      { day: 29, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `오늘 수확분 중 예약 외 여유 수량 현장 직판!`, sceneSummary: `예약 발송분 옆에 따로 챙겨둔 여유분 박스를 손으로 짚으며 안내하는 장면`, soundPoint: '박스 두드리는 경쾌한 소리', whyItSells: '기다리지 않고 바로 받을 수 있는 당일 발송 여유분 안내', hookPreview: `오늘 수확 상태가 좋아 예약분 외 여유 수량 바로 보내드립니다!` },
      { day: 30, week: 4, category: `${mLabel} 사전예약 · 첫수확개시`, title: `본격 수확 시즌 돌입! 댓글에 [${cleanKeyword}] 남기시면 주문서 발송`, sceneSummary: `풍성한 수확물과 활기찬 택배 상차 현장을 3컷으로 압축해 보여주기`, soundPoint: '활기찬 농장 수확·상차 사운드', whyItSells: `매니챗 [${cleanKeyword}] 키워드 자동화로 주문 접수 연결`, hookPreview: `이제 매일 새벽 수확해 당일 발송합니다! 댓글에 [${cleanKeyword}] 남겨주세요` }
    ];
  } else {
    rawList = [
      { day: 1, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `${mLabel}(${sTag}) 새벽 5시반, ${region} 농장 수확 시작하는 소리`, sceneSummary: `${monthObj.weatherHook} 속에서도 새벽 이슬 맞으며 ${crop} 수확을 시작하는 장갑 낀 손`, soundPoint: '자갈 밟는 소리 + 첫 수확 가위질/수확음', whyItSells: `${years} 경력 농부의 당일 새벽 수확 원칙을 보여주어 첫 신뢰 형성`, hookPreview: `남들 자는 ${mLabel} 새벽 5시, 오늘 보낼 ${shortCrop} 수확합니다` },
      { day: 2, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `공판장 상위 등급 특품을 직거래로 보내드리는 이유`, sceneSummary: `최상품 ${shortCrop}을 손바닥 위에 올려두고 쓰다듬으며 선별하는 손 클로즈업`, soundPoint: '작물 만지는 사각사각 현장 소리', whyItSells: '유통 단계를 줄여 산지 직송으로 드린다는 진심 전달', hookPreview: `경매장 가기 전 빼둔 특품, 오늘 산지 직거래로 보냅니다` },
      { day: 3, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `${years} 베테랑 농부의 손길! 정품·파품 가려내는 기준`, sceneSummary: `수확한 작물을 양손으로 빠르게 만져보며 최상품만 출하 바구니에 담는 숙련된 손`, soundPoint: '바구니에 묵직하게 담기는 경쾌한 소리', whyItSells: '화려한 광고가 아닌 진짜 농사짓는 생산자임을 3초 만에 증명', hookPreview: `${years}째 ${shortCrop}만 만져봐서 손끝만 닿아도 속이 보입니다` },
      { day: 4, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `중간 유통 없이 농장에서 식탁까지 당일 발송 과정`, sceneSummary: `밭에서 바로 수확(1컷) ➔ 선별·포장(2컷) ➔ 택배차 상차(3컷)로 이어지는 구성`, soundPoint: '수확 소리에서 테이핑 소리로 이어지는 현장음', whyItSells: `"${card2}"라는 신선도 걱정을 당일 수확·당일 발송 과정으로 해소`, hookPreview: `창고에서 묵힌 게 아닙니다! 오늘 아침 밭에서 바로 출발!` },
      { day: 5, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `${mLabel} 날씨를 이겨내고 단단하게 여문 올해 ${shortCrop}`, sceneSummary: `${monthObj.weatherHook} 환경을 이겨낸 단단하고 싱싱한 작물 표면을 가까이 비추는 샷`, soundPoint: '통통! 단단하게 여문 소리', whyItSells: '계절감을 살린 스토리텔링으로 지금이 제철임을 강조', hookPreview: `${mLabel} 일교차 덕에 올해 ${region} ${shortCrop} 맛이 깊어졌습니다` },
      { day: 6, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `작은 흠집만 있어도 직거래 박스엔 넣지 않습니다`, sceneSummary: `미세한 흠집이 있는 작물을 과감히 옆(식구들 먹을 바구니)으로 빼놓는 손`, soundPoint: '툭 골라내는 현장 소리', whyItSells: '고객에게는 정품·특품만 보낸다는 선별 원칙 제시', hookPreview: `맛은 같아도 상처 난 건 저희가 먹고 정품만 보냅니다` },
      { day: 7, week: 1, category: `${mLabel} 성수기 · 새벽수확`, title: `수확하다 말고 밭둑에서 바로 맛보는 산지 새참 타임!`, sceneSummary: `일하다 말고 밭에서 갓 딴(또는 갓 찐/절인) ${shortCrop}을 한 입 크게 맛보는 손`, soundPoint: '아삭! 침 고이는 리얼 먹방 ASMR', whyItSells: '산지에서만 느낄 수 있는 신선함과 시각 자극', hookPreview: `밭에서 일하다 바로 먹으면 얼마나 신선한지 소리 들어보세요!` },
      { day: 8, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `볼륨을 높여보세요! ${shortCrop} 수확하는 리얼 ASMR`, sceneSummary: `마이크를 작물 가까이 대고 가위로 톡 자르거나 반으로 가르는 초근접 클로즈업`, soundPoint: '톡! 사각! 쩍! 묵직한 수확 ASMR', whyItSells: '시각과 청각을 동시에 자극해 초반 스크롤 정지 유도', hookPreview: `소리 켜고 들어보세요! 싱싱함이 귀로 먼저 들립니다` },
      { day: 9, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `보정 없는 오늘 아침 ${region} ${shortCrop} 초근접 상태`, sceneSummary: `자연광 햇살을 받아 하얀 과분이나 선명한 빛깔이 반짝이는 표면을 천천히 훑는 샷`, soundPoint: '상쾌한 아침 농장 자연음과 작업 소리', whyItSells: `"${card3}"를 눈앞에서 생생하게 확인시켜 구매 욕구 자극`, hookPreview: `카메라 필터 안 켰습니다! 방금 수확한 실제 빛깔 보세요` },
      { day: 10, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `일반 상품 vs 우리 농장 산지직송 특품 같은 각도 비교`, sceneSummary: `왼손엔 작거나 무른 샘플, 오른손엔 묵직하고 꽉 찬 우리 농장 특품을 같은 조명에서 비교`, soundPoint: '손바닥으로 통통 두드리는 소리 차이', whyItSells: '같은 조건 비교(TYPE 06)로 차이를 눈으로 납득시킴', hookPreview: `겉보기엔 비슷해 보여도 나란히 놓고 보면 차이가 보입니다` },
      { day: 11, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `선별대(작업대)에서 쏟아지는 풍성한 수확 현장`, sceneSummary: `방금 수확한 ${shortCrop}이 선별대나 바구니에 가득 담기는 역동적인 장면`, soundPoint: '차르르르 굴러가는 경쾌한 현장음', whyItSells: '풍성한 수확량과 활기찬 작업 현장으로 신뢰 구축', hookPreview: `오늘 아침 수확한 물량 중 가장 좋은 걸로 골라 담습니다` },
      { day: 12, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `성인 손바닥과 나란히 대어 본 특대과 사이즈 실물 인증`, sceneSummary: `농부의 손바닥이나 종이컵 옆에 작물을 나란히 대어 크기를 비교하는 손`, soundPoint: '묵직하게 저울에 올려놓는 소리', whyItSells: '크기에 대한 궁금증을 직관적인 비교로 해결', hookPreview: `제 손바닥과 나란히 대어 보면 크기가 바로 가늠됩니다` },
      { day: 13, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `겉흙(또는 겉잎) 털어내는 순간 드러나는 뽀얀 자태`, sceneSummary: `장갑 낀 손으로 겉흙이나 겉잎을 툭툭 정리하자 깨끗한 속 자태가 드러나는 전후 과정`, soundPoint: '스윽스윽 털어내는 리얼 소리', whyItSells: 'Before & After 효과로 짧은 시간 안에 시각적 만족 제공', hookPreview: `겉흙만 살짝 털어내도 이렇게 뽀얗고 단단합니다` },
      { day: 14, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `전자저울 눈금 확인! 정량보다 넉넉히 담는 농부의 마음`, sceneSummary: `저울 숫자가 기준 무게를 넘기도록 한 줌 더 얹어주는 농부의 손`, soundPoint: '저울 삑 소리와 덤으로 더 얹는 소리', whyItSells: '배송 중 수분 감량까지 고려해 넉넉히 담아준다는 신뢰 제공', hookPreview: `택배 가면서 수분 빠질까 봐 아예 넉넉하게 더 담았습니다` },
      { day: 15, week: 2, category: `${mLabel} 성수기 · 현장ASMR`, title: `그늘에서 자연광 햇빛으로 들었을 때 보이는 진짜 색감`, sceneSummary: `작업장 그늘에서 밝은 햇살 아래로 작물을 들어 올려 선명한 색감을 보여주는 손`, soundPoint: '현장 바람 소리와 작업음', whyItSells: '신선도를 가장 직관적으로 보여주는 자연광 촬영', hookPreview: `자연광 햇빛 아래서 보면 얼마나 싱싱한지 바로 보입니다` },
      { day: 16, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `반으로 쫙! 빈틈없이 꽉 찬 속살 단면 공개`, sceneSummary: `칼이나 손으로 ${shortCrop}을 반으로 쪼개어 카메라 렌즈 앞에 단면을 보여주는 장면`, soundPoint: '쩍! 또는 사각! 갈라지는 시원한 소리', whyItSells: `고객이 가장 보고 싶어 하는 "${card3}"를 충족시키는 핵심 콘텐츠`, hookPreview: `속이 비었을까 봐 걱정되시죠? 지금 바로 반 갈라봅니다!` },
      { day: 17, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `택배 받으시면 딱 이렇게 보관하세요 (오래오래 싱싱!)`, sceneSummary: `신문지나 키친타월, 지퍼백을 활용해 보관하는 과정을 3컷으로 빠르게 보여주는 손`, soundPoint: '바스락거리는 포장지 소리', whyItSells: `주부 타겟(${card1})이 가장 많이 저장하고 공유하는 실용 정보`, hookPreview: `박스째 그냥 두지 마시고 이렇게 보관하세요! (저장해 두세요)` },
      { day: 18, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `산지 농부네가 ${mLabel}에 가장 맛있게 해 먹는 조리법`, sceneSummary: `갓 수확한 ${shortCrop}을 찌거나 절이거나 무쳐내어 김이 모락모락 나는 단면 공개`, soundPoint: '보글보글 또는 아삭아삭 맛있는 소리', whyItSells: '받아서 식탁에 올렸을 때의 결과를 미리 보여줌', hookPreview: `복잡한 양념 필요 없습니다! 산지에서는 이렇게 해 먹습니다` },
      { day: 19, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `당도·식감·신선도 직접 확인! 과즙과 결을 보세요`, sceneSummary: `속살을 직접 눌러 수분감·단단함을 보여주거나 당도계를 대어 확인시켜 주는 장면`, soundPoint: '과즙 터지는 소리 / 아삭한 식감 소리', whyItSells: '말로만 설명하는 대신 눈으로 식감과 수분을 증명', hookPreview: `갈라지는 이 결이랑 촉촉한 수분감 보이시나요?` },
      { day: 20, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `번거로운 세척·손질 쉽게 끝내는 농부의 손질 순서`, sceneSummary: `대야에 담가 씻거나 꼭지·뿌리·껍질을 쉽게 손질하는 노하우 시연`, soundPoint: '시원한 물소리와 칼질 소리', whyItSells: '손질이 번거로울까 봐 망설이는 고객의 진입장벽을 낮춤', hookPreview: `${shortCrop} 손질 힘드시다고요? 이 순서대로만 해보세요!` },
      { day: 21, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `우리 아이·부모님 입에 들어갈 먹거리라 지키는 원칙`, sceneSummary: `먹기 좋은 크기로 정갈하게 담아 접시에 내어놓는 따뜻한 손길`, soundPoint: '접시에 담기는 정겨운 소리', whyItSells: `핵심 타겟(${card1})의 가족 건강 챙기기 마음과 공감`, hookPreview: `내 자식, 내 부모님이 드신다는 생각으로 키우고 골랐습니다` },
      { day: 22, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `"어떤 구성이 맞나요?" 우리 집 식구 수별 추천 구성`, sceneSummary: `소포장 박스와 대용량(가족·나눔용) 박스를 나란히 놓고 구성을 비교해 주는 손`, soundPoint: '박스 패킹하는 경쾌한 소리', whyItSells: '고객 상황에 맞는 구성을 명확히 안내해 선택을 도움', hookPreview: `두 분이 드실 건가요, 온 가족이 나누실 건가요?` },
      { day: 23, week: 3, category: `${mLabel} 성수기 · 속살검증`, title: `오늘 수확분 중에서도 가장 잘 여문 특품 선별 기준`, sceneSummary: `수확물 중 가장 빛깔 좋고 큼직한 특품을 골라 박스에 담는 손`, soundPoint: '하나씩 정성껏 담는 소리', whyItSells: '선별 기준을 명확히 보여주어 품질 신뢰 확보', hookPreview: `오늘 나온 물량 중에서도 이 기준을 통과한 것만 담습니다` },
      { day: 24, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `배송 중 흔들림을 줄이는 3중 안전 포장 과정 공개`, sceneSummary: `완충재·그물망·아이스팩·두꺼운 박스를 꼼꼼하게 채워 넣고 점검하는 손`, soundPoint: '테이프 쫙! 붙이는 경쾌한 포장 소리', whyItSells: `"배송 중 상할까 봐 걱정"하는 고객의 불안 요소를 해소`, hookPreview: `택배 오다가 다칠까 봐 걱정되시죠? 이렇게 3중 포장합니다` },
      { day: 25, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `작업장에 쌓인 오늘 출고분 택배 포장 현장 (송장 비식별)`, sceneSummary: `쌓인 택배 박스 더미를 비추며 테이핑하는 바쁜 손 (고객 이름·주소 가림 필수)`, soundPoint: '박스테이프 테이핑 소리와 분주한 작업장 소리', whyItSells: '활기찬 출고 현장으로 신뢰감 부여', hookPreview: `오늘도 잊지 않고 찾아주셔서 아침부터 포장 손길이 바쁩니다` },
      { day: 26, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `드셔보신 단골분께서 부모님 댁까지 추가 주문하신 사연`, sceneSummary: `신선한 작물 포장 현장을 배경으로 동의받은 단골 고객의 후기 요약을 자막으로 소개`, soundPoint: '현장 포장 작업 ASMR', whyItSells: '실제 재주문 사례 공유로 신뢰 강화', hookPreview: `"지난번에 먹어보고 좋아서 부모님 댁에도 보내드려요"` },
      { day: 27, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `오후 택배 상차 완료! 오늘 출발해 식탁으로 갑니다`, sceneSummary: `택배 차량에 오늘 새벽 수확해 포장한 박스들이 실리는 현장`, soundPoint: '택배 상차하는 활기찬 현장음', whyItSells: '당일 수확·당일 발송 약속 이행을 눈으로 증명', hookPreview: `오늘 아침에 수확해서 지금 출발합니다! 맛있게 드세요` },
      { day: 28, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `받으시는 분이 박스 열었을 때 보게 될 실제 내부 모습`, sceneSummary: `고객 입장에서 박스를 개봉했을 때 꽉 차고 깔끔한 내부 모습을 그대로 시연`, soundPoint: '박스 개봉하는 설레는 소리', whyItSells: '선물용 주문 및 구매 전 불안 해소', hookPreview: `집에서 박스를 여시는 순간 이 모습 그대로 받아보시게 됩니다` },
      { day: 29, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `공판장 출하 전 오늘 수확 특품 직거래 물량 안내`, sceneSummary: `오늘 갓 작업해 쌓아둔 직거래 박스 앞에서 마지막 테이핑을 마치는 손`, soundPoint: '테이프 커팅 소리', whyItSells: '산지 직판 물량 안내로 주문 행동 유도', hookPreview: `공판장 가기 전 따로 챙겨둔 오늘치 직거래 물량입니다` },
      { day: 30, week: 4, category: `${mLabel} 성수기 · 주문폭발`, title: `${mLabel} 수확분 주문 안내! 댓글에 [${cleanKeyword}] 남기시면 DM 발송`, sceneSummary: `수확이 한창인 밭 풍경과 특품 박스를 들어 올리는 농부의 손`, soundPoint: '현장 바람 소리와 포장 마무리 소리', whyItSells: `댓글 [${cleanKeyword}] 키워드로 자연스럽게 문의 연결`, hookPreview: `${mLabel} 제철 수확 중입니다! 댓글에 [${cleanKeyword}] 남겨주세요` }
    ];
  }

  // 각 Day에 BRACKET HOOK 100의 10대 유형과 압축 자막(2줄 이하)을 매핑
  return rawList.map((item, idx) => {
    const hookTypeObj = HOOK_TYPES[idx % HOOK_TYPES.length];
    return {
      ...item,
      hookTypeId: hookTypeObj.id,
      hookTypeCode: hookTypeObj.code,
      hookTypeName: hookTypeObj.name,
      shortFirstFrameSub: hookTypeObj.shortSubFn(shortCrop)
    };
  });
};

// ★ 핵심 업그레이드: 3권의 전자책(BRACKET HOOK 100 + BRACKET 30 + CapCut 실전가이드)을 모두 반영한 올인원 패키지 생성기 ★
const buildInstantDetailGuide = (
  topic,
  region,
  crop,
  years,
  phone,
  dmKeyword,
  card1,
  card2,
  card3,
  card4,
  selectedMonth = 11,
  seasonMode = 'peak',
  hookTypeId = 'type01',
  rawStory = ''
) => {
  const shortCrop = crop.split(' ')[0] || '농산물';
  const monthObj = MONTH_DATA.find((m) => m.month === Number(selectedMonth)) || MONTH_DATA[10];
  const mLabel = monthObj.label;
  const cleanKeyword =
    dmKeyword?.trim() ||
    (seasonMode === 'offseason' ? '알림' : seasonMode === 'preorder' ? '예약' : '주문');
  const cleanPhone = phone.trim() || '010-XXXX-XXXX';
  const selectedHookObj = HOOK_TYPES.find((h) => h.id === hookTypeId) || HOOK_TYPES[0];

  // 1) 《BRACKET HOOK 100》 유형별 맞춤 괄호 치환 문구 & 2줄 이하 압축 자막 생성
  const hookVariantsByType = {
    type01: {
      fullHook: `${shortCrop} 주문하기 전, 이 단면부터 확인하세요. 여기서 실패하기 쉽습니다.`,
      shortSub: `${shortCrop} 고르기 전,\n이것부터 보세요`,
      firstFrameScene: `손으로 ${shortCrop}의 꼭지·단면·상태를 가리키며 점검하는 초근접 샷`,
      questionLeft: `지금 확인하지 않으면 어떤 ${shortCrop}을 고르게 될까?`
    },
    type02: {
      fullHook: `수확량을 늘리는 대신, 저는 과감히 솎아내는 쪽을 택했습니다.`,
      shortSub: `수확량 대신\n품질을 택한 이유`,
      firstFrameScene: `기준에 못 미치는 열매/작물을 과감히 옆 바구니로 빼놓는 장갑 낀 손`,
      questionLeft: `농부가 당연한 수확량을 포기한 이유는 무엇일까?`
    },
    type03: {
      fullHook: `"그냥 따서 보내면 되잖아요." 그 한 박스에 ${years}의 새벽이 들어갔습니다.`,
      shortSub: `택배 한 박스 뒤,\n새벽 5시의 기록`,
      firstFrameScene: `어두운 새벽 작업장 조명이 켜지고 장갑을 끼는 농부의 손 클로즈업`,
      questionLeft: `한 박스가 출발하기 전에 어떤 준비 시간이 있었을까?`
    },
    type04: {
      fullHook: `거의 다 포장한 ${shortCrop} 박스를, 저는 제 손으로 다시 뜯었습니다.`,
      shortSub: `다 싼 박스를\n다시 뜯었습니다`,
      firstFrameScene: `테이핑 직전의 박스를 멈추고 안쪽 작물 상태를 다시 살피는 손`,
      questionLeft: `왜 다 끝낸 포장을 스스로 다시 열었을까?`
    },
    type05: {
      fullHook: `${years} 농사를 지으면서, 이 선별 기준은 수많은 시행착오 뒤에야 세웠습니다.`,
      shortSub: `${years} 만에 세운\n우리 농장 1번 기준`,
      firstFrameScene: `농장 기록장(체크리스트) 옆에 선별된 최상품 ${shortCrop}을 놓는 장면`,
      questionLeft: `시행착오를 막기 위해 세운 농부의 기준은 무엇일까?`
    },
    type06: {
      fullHook: `겉보기에는 같은 두 ${shortCrop}, 반으로 갈라보니 속은 달랐습니다.`,
      shortSub: `겉은 같아 보여도,\n속살은 달랐습니다`,
      firstFrameScene: `같은 자연광 조명에서 두 ${shortCrop}의 단면을 나란히 펼쳐 비교하는 손`,
      questionLeft: `같아 보이는데 무엇이 속살의 차이를 만들었을까?`
    },
    type07: {
      fullHook: `${shortCrop} 고를 때, 아직도 겉모양 크기부터 보세요?`,
      shortSub: `${shortCrop} 고를 때\n어디부터 보세요?`,
      firstFrameScene: `크기만 큰 샘플과 속이 단단하게 찬 특품을 양손에 들고 비교하는 장면`,
      questionLeft: `크기 말고 놓치기 쉬운 진짜 기준은 무엇일까?`
    },
    type08: {
      fullHook: `보관 방법 하나만 바꾸고, 일주일 뒤 ${shortCrop} 상태를 직접 비교해 봤습니다.`,
      shortSub: `보관법 하나만\n바꿔봤습니다`,
      firstFrameScene: `날짜가 적힌 메모와 함께 두 가지 보관 상태를 나란히 여는 손`,
      questionLeft: `직접 해보면 정말 신선도 차이가 날까?`
    },
    type09: {
      fullHook: `단골 손님의 짧은 문자 하나 때문에, 새벽 작업 중에 잠시 멈춰 섰습니다.`,
      shortSub: `새벽 작업 중 멈춘\n단골 문자 한 통`,
      firstFrameScene: `장갑을 잠시 벗고 익명 처리된 감사 문자를 바라보는 손과 따뜻한 농장 풍경`,
      questionLeft: `문자 안에는 어떤 마음이 담겨 있었을까?`
    },
    type10: {
      fullHook: `${card1}이라면, 이 ${shortCrop} 단면은 그냥 못 지나치실 겁니다.`,
      shortSub: `${card1.split(' ')[0]}이라면\n이 장면만 보세요`,
      firstFrameScene: `반으로 쫙 갈라진 ${card3}을 카메라 정면에 선명하게 보여주는 샷`,
      questionLeft: `우리 집 식탁에 올릴 때 왜 이 기준이 중요할까?`
    }
  };

  const activeHook = hookVariantsByType[hookTypeId] || hookVariantsByType.type01;

  // 시즌 모드별 CTA 문구
  const subtitleCta =
    seasonMode === 'offseason'
      ? `수확 오픈 알림은 댓글에 [${cleanKeyword}] 남겨주세요!`
      : seasonMode === 'preorder'
      ? `첫물 사전예약은 댓글에 [${cleanKeyword}] 남겨주세요!`
      : `산지직송 가격·주문서는 댓글에 [${cleanKeyword}] 남겨주세요!`;

  // 2) 《BRACKET 30》 스토리 파서 (12개 요소 중 핵심 6개 자동 해체)
  const storyParser = {
    who: `${region}에서 ${years}째 ${crop}을(를) 일구는 생산자`,
    audience: `${card1} (핵심 고민: ${card2})`,
    trigger: `${mLabel}(${monthObj.seasonTag}) 현장 작업 중 마주한 품질 기준과 선택의 순간`,
    friction: `겉모양만 보고 고르거나 유통 과정에서 신선도가 떨어지는 문제 (${card2})`,
    proof: `${card3} (${topic.soundPoint})`,
    shiftAndAction: `${card4} ➔ 댓글 [${cleanKeyword}] 단일 행동 유도`
  };

  // 3) 《BRACKET HOOK 100 (73p)》 & 《BRACKET 30 (9p)》 기반 7초 / 15초 / 30초 멀티 타임라인 설계
  const scriptsByDuration = {
    '7s': {
      badge: '⚡ 7초 초압축 (한 장면으로 즉답하기 — BRACKET HOOK 100 p.73)',
      targetReadTime: '약 6~7초 (현장음 ASMR 중심 + 짧은 3문장)',
      fullScriptWithBreaths: `"${activeHook.shortSub.replace('\n', ' ')}" / ${card3}까지 직접 확인합니다. / ${subtitleCta}`,
      beats: [
        {
          time: '0.0~2.0초',
          role: 'STOP (첫 장면)',
          screen: activeHook.firstFrameScene,
          narration: `"${activeHook.shortSub.replace('\n', ' ')}"`,
          subtitle: activeHook.shortSub,
          soundAndEdit: `🔊 ${topic.soundPoint} 120% 강조 / 상하단 비우고 정중앙 2줄 자막`
        },
        {
          time: '2.0~5.0초',
          role: 'PROOF (즉시 증거)',
          screen: `${topic.sceneSummary} (초근접 클로즈업)`,
          narration: `"${card3}만 골라냅니다."`,
          subtitle: `눈으로 확인하는\n${shortCrop} 속살·신선도`,
          soundAndEdit: `✂️ 0초 100% ➔ 2초 108% 키프레임 천천히 확대`
        },
        {
          time: '5.0~7.0초',
          role: 'ACTION (단일 행동)',
          screen: `완성된 특품 박스 또는 동일 각도 완료 장면`,
          narration: `"${subtitleCta}"`,
          subtitle: `댓글에 [${cleanKeyword}]\n➔ 1초 만에 DM 안내`,
          soundAndEdit: `📌 마지막 1초 정지(Freeze) 또는 여유 핸들 유지`
        }
      ]
    },
    '15s': {
      badge: '🎯 15초 표준형 (볼 이유·과정 증거·기준 결합 — CapCut 실전과제 p.56)',
      targetReadTime: '약 13~15초 (5컷 구성: 2초+3초+3초+3초+4초)',
      fullScriptWithBreaths: `${activeHook.fullHook} / 많은 분들이 "${card2}" 걱정하시는데요. / 그래서 저희 ${region} 농장은 ${card3}을 하나하나 직접 확인합니다. / ${card4}. / ${subtitleCta}`,
      beats: [
        {
          time: '0.0~2.0초',
          role: '01 볼 이유 (완성/단면)',
          screen: activeHook.firstFrameScene,
          narration: `"${activeHook.fullHook}"`,
          subtitle: activeHook.shortSub,
          soundAndEdit: `🔊 첫 1.5초 안에 현장음(${topic.soundPoint})으로 스크롤 정지`
        },
        {
          time: '2.0~5.0초',
          role: '02 고객 고민 공감',
          screen: `작업대에서 선별 준비하는 손 (넓게 ➔ 중간 샷 전환)`,
          narration: `"${card2} 걱정 많으시죠?"`,
          subtitle: `혹시 실패할까 봐\n망설이셨다면`,
          soundAndEdit: `✂️ 앞 장면과 구도 크기를 다르게 연결`
        },
        {
          time: '5.0~8.0초',
          role: '03 핵심 작업 디테일',
          screen: topic.sceneSummary,
          narration: `"그래서 아침마다 직접 확인합니다."`,
          subtitle: `직접 갈라보고\n선별하는 손길`,
          soundAndEdit: `⚡ 속도 곡선: 준비 동작 2x ➔ 핵심 단면 공개 0.5x 슬로모션`
        },
        {
          time: '8.0~11.0초',
          role: '04 차별점의 증거',
          screen: `${card3}을 자연광 아래서 선명하게 비추기`,
          narration: `"${card4} 원칙을 지킵니다."`,
          subtitle: `${years} 농부의\n산지직송 기준`,
          soundAndEdit: `🎨 색보정: 노출 정리 ➔ 화이트밸런스(자연광 본연의 색)`
        },
        {
          time: '11.0~15.0초',
          role: '05 단일 CTA 안내',
          screen: `안내 자막을 넣을 여백이 있는 완성 박스 컷`,
          narration: `"${subtitleCta}"`,
          subtitle: `댓글에 [${cleanKeyword}] 남기면\n안내 DM 바로 발송!`,
          soundAndEdit: `🎵 배경음악 페이드 아웃 & 마지막 읽을 시간 4초 확보`
        }
      ]
    },
    '30s': {
      badge: '🎬 30초 스토리텔링 (STOP-SETUP-PULL-PAYOFF-ACTION — BRACKET 30 p.9)',
      targetReadTime: '실제 낭독 23~28초 (30초를 억지로 꽉 채우지 말고 호흡 유지)',
      fullScriptWithBreaths: `${activeHook.fullHook} / ${region}에서 ${years}째 ${crop}을 키우며 가장 많이 듣는 말씀이 / "${card2}"라는 걱정이었습니다. / ${rawStory ? rawStory : `그래서 저희는 수확량이 줄더라도 ${card3}이 확인된 특품만 골라냅니다.`} / 잠깐의 수고를 아끼지 않는 건 / 식탁에서 여셨을 때 실망하시지 않게 하려는 제 기준입니다. / ${subtitleCta}`,
      beats: [
        {
          time: '0.0~1.5초',
          role: 'STOP (스크롤 정지)',
          screen: activeHook.firstFrameScene,
          narration: `"${activeHook.fullHook}"`,
          subtitle: activeHook.shortSub,
          soundAndEdit: `🚫 인사·로고 금지! 첫 프레임부터 갈등/단면 증거 제시`
        },
        {
          time: '1.5~5.0초',
          role: 'SETUP (상황·문제)',
          screen: `${region} 농장 전경(1초 와이드) ➔ 농부의 일하는 손`,
          narration: `"${years}째 농사지으며 가장 많이 들은 걱정이 있습니다."`,
          subtitle: `${region} ${years} 농부가\n가장 많이 들은 말`,
          soundAndEdit: `✂️ 1.5~3초 간격으로 와이드 ➔ 클로즈업 화면 크기 변환`
        },
        {
          time: '5.0~18.0초',
          role: 'PULL (약속·증거·과정)',
          screen: `${topic.sceneSummary} + ${card3} 연속 3컷 제시`,
          narration: `"바로 ${card2}는 점인데요. / 그래서 저희는 직접 눈으로 확인한 것만 담습니다."`,
          subtitle: `직접 확인한\n${shortCrop} 실제 상태`,
          soundAndEdit: `🎞️ L컷 적용: 내레이션은 계속 흐르고 위 트랙(오버레이)에 작업 B-roll 배치`
        },
        {
          time: '18.0~26.0초',
          role: 'PAYOFF (해결·철학)',
          screen: `전후 비교 또는 꼼꼼하게 3중 포장된 완성 박스`,
          narration: `"당장 손이 더 가도 / 식탁에 올라갈 때까지 싱싱해야 하니까요."`,
          subtitle: `시간이 더 걸려도\n타협하지 않는 기준`,
          soundAndEdit: `🔉 수동 덕킹: 말할 때 음악 볼륨 8%로 낮추고, 현장음 포인트 살리기`
        },
        {
          time: '26.0~30.0초',
          role: 'ACTION (단일 요청)',
          screen: `첫 장면의 ${shortCrop}을 다시 비추며 루프(Loop) 연결`,
          narration: `"${subtitleCta}"`,
          subtitle: `댓글에 [${cleanKeyword}]\n남겨주세요!`,
          soundAndEdit: `🔄 마지막 화면이 첫 장면과 자연스럽게 이어지도록 루프 설계`
        }
      ]
    }
  };

  // 4) 《BRACKET HOOK 100 (p.72)》 Rewrite Clinic — 과장·낚시 표현 제거 비교
  const rewriteClinic = [
    {
      bad: `"충격! 안 사면 무조건 후회하는 역대급 대박 ${shortCrop}!"`,
      good: `"${activeHook.fullHook}"`,
      reason: '추상적 감탄사("충격·대박·무조건") 대신 실제 행동·시간·확인 기준을 넣어야 신뢰가 생깁니다.'
    },
    {
      bad: `"안녕하세요, 오늘은 ${region}에서 ${shortCrop} 수확을 해봤습니다."`,
      good: `"포장 마감 20분 전, 이 상자는 다시 뜯었습니다."`,
      reason: '평범한 일상 보고와 인사를 지우고, 예상 밖의 선별 행동부터 첫 1.5초에 보여줍니다.'
    },
    {
      bad: `"우리 농장 ${shortCrop}이 대한민국 1등으로 제일 맛있습니다!"`,
      good: `"겉보기엔 같은 두 ${shortCrop}을 같은 조명에서 반으로 갈라봤습니다."`,
      reason: '근거 없는 최고 단정 대신 비교 조건과 눈으로 보이는 단면 증거를 나란히 제시합니다.'
    }
  ];

  // 5) 《CapCut 활용법: 촬영과 편집》 기반 농산물 8컷 촬영표 & 정밀 편집 워크플로우
  const capcutMasterGuide = {
    cameraSetup: [
      `📐 기본 설정 (p.6): 세로 9:16 / 1080p(FHD) / 30fps로 시작하세요. 과즙이 튀거나 반으로 가르는 0.5배속 슬로모션 컷만 밝은 낮에 60fps로 촬영합니다. (색보정 일관성을 위해 SDR 통일 권장)`,
      `☀️ 빛과 조명 (p.7): 비싼 조명 대신 햇빛(또는 작업장 창문)을 정면이나 옆 45도에 두세요. 해를 등지는 역광을 피하고, 반대편에 흰 스티로폼 박스 뚜껑을 세워두면 그림자가 부드럽게 정돈됩니다.`,
      `⏱️ 편집 여유 '핸들(Handle)' 법칙 (p.9): 2~3초만 쓸 장면도 녹화 버튼을 누른 뒤 '속으로 1초 멈추고' 동작을 시작하고, 동작이 끝난 뒤에도 '1초 더 유지'한 채 정지(총 4~6초 촬영)해야 앞뒤 흔들림 없이 깔끔하게 트리밍됩니다.`
    ],
    eightShotChecklist: [
      { cut: '01 완성 대표 장면', desc: `첫 1.5초 후킹 후보. 가장 빛깔 좋은 ${shortCrop} 또는 단면을 고정 촬영` },
      { cut: '02 재료·밭 환경', desc: `${region} 농장의 건강한 흙이나 작업대 준비 상태 (와이드 1~2초)` },
      { cut: '03 핵심 작업 시작', desc: `장갑 낀 손이 화면에 들어오기 1초 전부터 녹화 시작` },
      { cut: '04 작업 디테일', desc: `가위로 따기·반 가르기·저울 달기 등 핵심 동작을 20cm 초근접 촬영` },
      { cut: '05 완성되는 순간', desc: `박스에 담기·완충재 넣기·테이핑 마무리까지 끊지 않고 촬영` },
      { cut: '06 시식·활용 장면', desc: `밭에서 바로 한 입 베어 물거나 조리된 먹음직스러운 한 접시` },
      { cut: '07 차별점의 증거', desc: `손바닥 크기 비교, 당도계 수치, 일반 상품과의 동일 조건 비교` },
      { cut: '08 마지막 안내 화면', desc: `댓글 [${cleanKeyword}] 자막을 얹을 여백이 있는 정돈된 완성 컷` }
    ],
    editingWorkflow: [
      `STEP 1 [트리밍 vs 분할·삭제 구분 (p.17)]: 캡컷 [새 프로젝트] ➔ 비율 [9:16] 확인. 클립 양끝의 하얀 기둥(핸들)을 안으로 밀어 앞뒤 1초 흔들림을 줄이는 것은 '트리밍'이고, 중간 실수 구간 앞뒤에 재생헤드를 놓고 [분할]을 두 번 눌러 가운데 조각을 지우는 것은 '분할·삭제'입니다.`,
      `STEP 2 [L컷과 B-roll 오버레이 (p.21~22)]: 농부님의 설명(내레이션) 음성은 끊기지 않게 아래에 두고, "직접 확인합니다"라는 말이 나오는 구간 위에만 [오버레이(추가)]로 속살 단면·포장 B-roll 영상을 얹으세요. (보조 영상의 불필요한 잡음은 낮추고 핵심 작업음만 살립니다)`,
      `STEP 3 [2줄 이하 정중앙 자막 & 안전영역 (p.8, p.28)]: 상단(앱 메뉴), 우측(좋아요·댓글 버튼), 하단(계정명·캡션 설명)을 피해 화면 안쪽 중앙에 1~2줄 고딕체로 크게 배치합니다. 본문 1색(흰색/노란색) + 핵심 숫자·단어 1곳만 강조 색상을 쓰세요.`,
      `STEP 4 [음량 균형과 수동 덕킹 (p.33)]: 목소리(또는 핵심 수확 ASMR)를 먼저 100~120%로 또렷하게 맞춘 뒤, 배경음악은 8% 수준으로 아주 작게 시작하세요. 말할 때는 음악을 낮추고 말이 끝날 때 부드럽게 올라오도록 조절하며, [소음 감소]는 목소리가 금속처럼 울리지 않는 약한 강도로만 켭니다.`,
      `STEP 5 [키프레임 확대 & 속도 곡선 (p.35, p.39)]: 정지된 완성 컷에는 시작점(0초, 크기 100%)과 끝점(2초, 크기 108%)에 다이아몬드 [키프레임]을 찍어 시선을 집중시키고, 작업 장면은 [속도 ➔ 곡선]에서 준비(2배속) ➔ 핵심 단면(0.5배속) ➔ 마무리(1배속)로 리듬을 줍니다.`,
      `STEP 6 [색 보정 4단계 & 개인정보 가림 (p.44, p.46)]: 필터를 겹치기보다 [조정]에서 ①노출(밝기) ➔ ②화이트밸런스(색온도) ➔ ③대비 ➔ ④채도 순으로 자연스러운 식재료 색을 살리세요. 택배 상자에 찍힌 고객 성함·전화번호·주소는 반드시 불투명 스티커/모자이크로 가리고 처음부터 끝까지 따라가는지 확인합니다.`,
      `STEP 7 [Pro 유료 요소 점검 & 1080p 30fps 출력 (p.51, p.54)]: 타임라인 맨 끝의 독립된 [엔딩 클립]을 삭제하고, 만약 내보내기 시 Pro 가입 창이 뜨면 사용한 폰트·효과 중 Pro 표시가 붙은 것만 기본 무료 고딕/단순 컷으로 교체한 뒤 1080p·30fps로 저장해 앨범에서 끝까지 재생해 봅니다.`
    ]
  };

  // 6) 《BRACKET HOOK 100 (p.78)》 & 《BRACKET 30 (p.100)》 A/B 테스트 시트 & 이탈 진단
  const abTestAndAnalytics = {
    question: `같은 ${shortCrop} 소재에서 '사건·경고형 첫 문장(A)'과 '질문·비교형 첫 문장(B)', '초근접 단면 첫 화면(C)' 중 어느 쪽이 초기 시청 선택(계속 시청 비율)과 [${cleanKeyword}] 댓글 전환이 높은가?`,
    candidates: [
      {
        version: '후보 A (현재안 · 사건/원칙형)',
        changedVar: `첫 문장: "${activeHook.fullHook}"`,
        keptVar: '본문 증거 컷 · 영상 길이 · 마지막 CTA 동일 유지',
        metric: '초기 시청 선택 (계속 시청 비율)'
      },
      {
        version: '후보 B (질문/선택형 후킹 변형)',
        changedVar: `첫 문장: "${shortCrop} 고를 때 아직도 크기부터 보세요?"`,
        keptVar: '본문 증거 컷 · 영상 길이 · 마지막 CTA 동일 유지',
        metric: '초기 시청 선택 & 댓글 참여율'
      },
      {
        version: '후보 C (첫 화면 시각 자극 변형)',
        changedVar: `첫 1.5초 화면: 말보다 '${card3}' 소리 나는 단면 초근접 클로즈업 선배치`,
        keptVar: '전체 대본 · 자막 크기 · 마지막 CTA 동일 유지',
        metric: '3초 이후 시청 유지율 (평균 시청 시간)'
      }
    ],
    diagnostics: [
      { symptom: '초반 시청 선택(계속 시청 비율)이 낮음', action: '인사말을 완전히 빼고, 첫 1.5초 화면을 더 가까운 단면 클로즈업과 2줄 압축 자막으로 교체하세요.' },
      { symptom: '초반은 보는데 중간(5~10초)에 이탈함', action: '밭 배경 설명을 절반으로 줄이고, 1.5~3초마다 손동작·저울·단면 B-roll로 화면을 전환하세요.' },
      { symptom: '끝까지 보는데 댓글/문의가 적음', action: '좋아요·팔로우·공유를 동시에 요구하지 말고, 오직 댓글 [' + cleanKeyword + '] 한 가지 행동만 명확히 안내하세요.' }
    ]
  };

  const captionHeaderCta =
    seasonMode === 'offseason'
      ? `👇 지금 댓글에 [${cleanKeyword}]이라고 남겨두시면, ${crop} 첫 수확 오픈 날 제일 먼저 메시지(DM)로 소식을 보내드립니다!`
      : seasonMode === 'preorder'
      ? `👇 댓글에 [${cleanKeyword}]이라고 남겨주시면 1초 만에 올해 첫물 사전예약 혜택과 신청서를 메시지(DM)로 보내드립니다!`
      : `👇 댓글에 [${cleanKeyword}]이라고 남겨주시면 1초 만에 산지직송 가격표와 주문서를 메시지(DM)로 보내드립니다!`;

  const captionBodyBySeason = `${captionHeaderCta}\n\n"${activeHook.fullHook}"\n\n안녕하세요, ${region}에서 ${years}째 ${crop}을(를) 일구고 있는 농부입니다. 🌱\n\n${card1} 고객님들께서 가장 많이 걱정하시는 "${card2}", 현장에서 일하는 저 역시 가장 신경 쓰는 부분입니다.\n\n✅ 눈으로 직접 증명하는 기준: ${card3}\n✅ 농부의 약속: ${card4}\n\n📦 [안내 및 신청 방법]\n1️⃣ 지금 이 영상 댓글에 [${cleanKeyword}] 두 글자만 남겨주세요! (DM으로 안내 링크가 자동 발송됩니다)\n2️⃣ 프로필 하단 링크 또는 전화·문자(${cleanPhone})로도 편하게 문의하실 수 있습니다.`;

  const manychatBySeason =
    seasonMode === 'offseason'
      ? {
          keywords: `${cleanKeyword}, 알림, 예약, 언제, 농장`,
          autoReplies: [
            `선생님~ 메시지(DM)함으로 첫 수확 1순위 알림 신청 링크 보내드렸습니다! 🌱`,
            `비수기에도 잊지 않고 찾아주셔서 감사합니다! DM 확인해 주세요 😊`,
            `수확 시작하면 제일 먼저 연락드리겠습니다! 방금 보내드린 DM을 확인해 주세요 🚜`
          ],
          dmMessage: `안녕하세요! ${region} ${years} 경력 ${crop}입니다 🌱\n\n지금(${mLabel})은 맛있는 수확을 위해 열심히 밭을 가꾸는 시기입니다.\n잊지 않고 댓글 남겨주셔서 정말 감사드립니다!\n\n아래 버튼을 눌러 [첫 수확 오픈 알림 대기 명단]을 남겨주시면, 수확 시작 날 가장 먼저 안내해 드리겠습니다! 👇`,
          buttonText: `🔔 첫 수확 1순위 알림 신청하기`
        }
      : seasonMode === 'preorder'
      ? {
          keywords: `${cleanKeyword}, 사전예약, 가격, 첫물, 농장`,
          autoReplies: [
            `선생님~ 메시지(DM)함으로 올해 첫 수확 사전예약 신청서 바로 보내드렸습니다! 😊`,
            `기다려 주셔서 감사합니다! DM(메시지함)에서 사전예약 안내를 확인해 주세요 🌱`,
            `방금 메시지(DM)로 1차 사전예약 전용 주문 링크 보내드렸습니다! 🚜`
          ],
          dmMessage: `안녕하세요! ${region} ${years} 경력 ${crop}입니다 🌱\n\n드디어 기다리시던 첫 수확이 코앞으로 다가왔습니다!\n댓글 남겨주셔서 진심으로 감사드리며, 사전예약 발송 일정 및 신청서는 아래 버튼을 누르시면 바로 확인하실 수 있습니다! 👇`,
          buttonText: `⏳ 올해 첫물 사전예약 신청서 열기`
        }
      : {
          keywords: `${cleanKeyword}, 가격, 구매, 농장, 얼마`,
          autoReplies: [
            `선생님~ 메시지(DM)함으로 산지직송 가격표와 주문서 바로 보내드렸습니다! 😊`,
            `믿고 찾아주셔서 감사합니다! DM(메시지 요청함) 확인해 주세요 🌱`,
            `방금 메시지(DM)로 오늘 수확분 주문 링크 보내드렸습니다! 🚜`
          ],
          dmMessage: `안녕하세요! ${region} ${years} 경력 ${crop}입니다 🌱\n\n영상 보고 댓글 남겨주셔서 진심으로 감사합니다.\n오늘 새벽 수확한 직거래 가격표와 주문서는 아래 버튼을 누르시면 바로 확인 및 신청하실 수 있습니다! 👇`,
          buttonText: `👉 산지직송 가격표 & 주문서 열기`
        };

  return {
    selectedHookObj,
    activeHook,
    storyParser,
    scriptsByDuration,
    rewriteClinic,
    capcutMasterGuide,
    abTestAndAnalytics,
    fullSubtitleTextToCopy: `[0~2초 첫 화면 압축 자막]\n${activeHook.shortSub}\n\n[중간 핵심 증거 자막]\n${card3}\n\n[마지막 행동 유도 자막]\n${subtitleCta}`,
    captionText: captionBodyBySeason,
    hashtags: [
      `#${region.replace(/\s+/g, '')}`,
      `#${shortCrop.replace(/[^가-힣a-zA-Z0-9]/g, '')}`,
      `#${mLabel}농장일기`,
      seasonMode === 'offseason' ? `#농사일기` : seasonMode === 'preorder' ? `#사전예약` : `#산지직송`,
      `#농산물직거래`,
      `#농부직거래`,
      `#제철농산물`,
      `#농장직송`
    ],
    manychatTemplate: manychatBySeason,
    osmuGuide: {
      coverTitles: [
        `${shortCrop}, 이것부터 보세요`,
        `다 싼 박스를 다시 뜯은 이유`,
        `${years} 농부의 1번 기준`,
        `겉은 같아도 속은 다릅니다`,
        `${region} ${shortCrop} 산지직송`
      ],
      youtubeShortsTitle:
        seasonMode === 'offseason'
          ? `[${region} ${mLabel} 농장] ${activeHook.fullHook} (문의: ${cleanPhone}) #쇼츠 #농부일기`
          : seasonMode === 'preorder'
          ? `[${region} 사전예약] ${activeHook.fullHook} (문자·전화 예약: ${cleanPhone}) #쇼츠 #산지직송`
          : `[${region} 산지직송] ${activeHook.fullHook} (문자·전화 주문: ${cleanPhone}) #쇼츠 #농산물직거래`,
      storyStickerText:
        seasonMode === 'offseason'
          ? `🔔 첫 수확 오픈 알림 신청하기 (터치)`
          : seasonMode === 'preorder'
          ? `⏳ 올해 첫물 사전예약 신청하기 (터치)`
          : `🌟 오늘 수확분 산지직송 주문하기 (터치)`,
      storyGuide: `릴스 업로드 직후 [공유 ➔ 스토리에 추가]를 누르고 [링크 스티커]에 주문서 주소와 위 문구를 화면 중앙에 붙여주세요. 그다음 프로필 [하이라이트]에 고정하면 24시간 안내 창구가 됩니다.`
    }
  };
};

export default function App() {
  // 1단계: 사용자 입력 상태
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[1].id);
  const [region, setRegion] = useState(PRESETS[1].region);
  const [crop, setCrop] = useState(PRESETS[1].crop);
  const [years, setYears] = useState(PRESETS[1].years);
  const [phone, setPhone] = useState(PRESETS[1].phone);
  const [dmKeyword, setDmKeyword] = useState(PRESETS[1].dmKeyword);
  const [card1, setCard1] = useState(PRESETS[1].card1);
  const [card2, setCard1_2] = useState(PRESETS[1].card2);
  const [card3, setCard3] = useState(PRESETS[1].card3);
  const [card4, setCard4] = useState(PRESETS[1].card4);

  // ★ 신규 상태 1: 《BRACKET 30》 단일 [괄호] 원문 입력 스토리
  const [rawStory, setRawStory] = useState(PRESETS[1].rawStory);

  // 촬영 기준 월(1~12) & 시즌 상태('peak' | 'preorder' | 'offseason')
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [seasonMode, setSeasonMode] = useState('peak');

  // ★ 신규 상태 2: 《BRACKET HOOK 100》 10대 후킹 유형 & 7초/15초/30초 길이 모드
  const [selectedHookTypeId, setSelectedHookTypeId] = useState('type01');
  const [durationMode, setDurationMode] = useState('15s'); // '7s' | '15s' | '30s'
  const [qualityChecks, setQualityChecks] = useState({
    q1: true,
    q2: true,
    q3: true,
    q4: true,
    q5: true,
    q6: true
  });

  // 프롬프트 미리보기 탭 ('30' | '10' | 'bracket30')
  const [promptMode, setPromptMode] = useState('bracket30');

  // 2단계: 추천 소재 10개 & 월별 컨텐츠 달력 30일 상태
  const [activeTab, setActiveTab] = useState('calendar30');
  const [topics, setTopics] = useState([]);
  const [calendar30, setCalendar30] = useState(() =>
    buildInstant30DayCalendar(
      PRESETS[1].region,
      PRESETS[1].crop,
      PRESETS[1].years,
      PRESETS[1].card1,
      PRESETS[1].card2,
      PRESETS[1].card3,
      PRESETS[1].card4,
      PRESETS[1].dmKeyword,
      11,
      'peak'
    )
  );
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);

  // 3단계: 선택한 소재의 상세 가이드
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [detailGuide, setDetailGuide] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // 4단계: 추가 대화형 수정 챗봇
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // UI 상태
  const [copiedId, setCopiedId] = useState(null);
  const [showSystemPromptModal, setShowSystemPromptModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 스크롤 이동용 Ref
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const chatEndRef = useRef(null);

  const currentMonthObj = MONTH_DATA.find((m) => m.month === Number(selectedMonth)) || MONTH_DATA[10];
  const currentSeasonObj = SEASON_MODES.find((s) => s.id === seasonMode) || SEASON_MODES[0];
  const currentPresetObj = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const detectRecommendedSeasonMode = (preset, monthNum) => {
    if (!preset) return 'peak';
    if (preset.peakMonths?.includes(monthNum)) return 'peak';
    if (preset.preorderMonths?.includes(monthNum)) return 'preorder';
    return 'offseason';
  };

  // 월 변경 핸들러
  const handleMonthChange = (monthNum) => {
    setSelectedMonth(monthNum);
    const matchedPreset = PRESETS.find((p) => p.id === selectedPresetId);
    const autoMode = detectRecommendedSeasonMode(matchedPreset, monthNum);
    setSeasonMode(autoMode);

    const nextKeyword =
      autoMode === 'offseason' ? '알림' : autoMode === 'preorder' ? '예약' : matchedPreset?.dmKeyword || '주문';
    setDmKeyword(nextKeyword);

    const updatedCal = buildInstant30DayCalendar(
      region,
      crop,
      years,
      card1,
      card2,
      card3,
      card4,
      nextKeyword,
      monthNum,
      autoMode
    );
    setCalendar30(updatedCal);

    if (selectedTopic) {
      const matchedDay = updatedCal.find((d) => d.day === selectedTopic.number) || updatedCal[0];
      setSelectedTopic({ ...matchedDay, number: matchedDay.day });
      setDetailGuide(
        buildInstantDetailGuide(
          matchedDay,
          region,
          crop,
          years,
          phone,
          nextKeyword,
          card1,
          card2,
          card3,
          card4,
          monthNum,
          autoMode,
          selectedHookTypeId,
          rawStory
        )
      );
    }
  };

  // 시즌 모드 수동 전환 핸들러
  const handleSeasonModeChange = (newMode) => {
    setSeasonMode(newMode);
    const matchedPreset = PRESETS.find((p) => p.id === selectedPresetId);
    const nextKeyword =
      newMode === 'offseason' ? '알림' : newMode === 'preorder' ? '예약' : matchedPreset?.dmKeyword || '주문';
    setDmKeyword(nextKeyword);

    const updatedCal = buildInstant30DayCalendar(
      region,
      crop,
      years,
      card1,
      card2,
      card3,
      card4,
      nextKeyword,
      selectedMonth,
      newMode
    );
    setCalendar30(updatedCal);

    if (selectedTopic) {
      const matchedDay = updatedCal.find((d) => d.day === selectedTopic.number) || updatedCal[0];
      setSelectedTopic({ ...matchedDay, number: matchedDay.day });
      setDetailGuide(
        buildInstantDetailGuide(
          matchedDay,
          region,
          crop,
          years,
          phone,
          nextKeyword,
          card1,
          card2,
          card3,
          card4,
          selectedMonth,
          newMode,
          selectedHookTypeId,
          rawStory
        )
      );
    }
  };

  // 후킹 유형 변경 핸들러 (Step 3에서 즉시 반영)
  const handleHookTypeChange = (newHookTypeId) => {
    setSelectedHookTypeId(newHookTypeId);
    if (selectedTopic) {
      setDetailGuide(
        buildInstantDetailGuide(
          selectedTopic,
          region,
          crop,
          years,
          phone,
          dmKeyword,
          card1,
          card2,
          card3,
          card4,
          selectedMonth,
          seasonMode,
          newHookTypeId,
          rawStory
        )
      );
    }
  };

  // 조합된 마스터 프롬프트 문장
  const customerSummary = `[① 누구인가: ${card1} / ② 가장 큰 걱정·고민: ${card2} / ③ 사기 전에 눈으로 확인하고 싶은 것: ${card3} / ④ 지갑을 여는 결정적 약속: ${card4}]`;
  const seasonPromptContext = `현재 촬영 시기는 [${currentMonthObj.label} (${currentMonthObj.seasonTag})]이고, 내 농장의 현재 시즌 상태는 [${currentSeasonObj.badge} — 목표: ${currentSeasonObj.ctaGoal}]야.`;
  const assembledPrompt10 = `나는 ${region}에서 ${crop}을(를) ${years}째 하고 있어. ${seasonPromptContext} 내 고객은 ${customerSummary}이야. 《BRACKET HOOK 100》의 10대 후킹 유형(손실경고/상식반전/억울함존중/현장비하인드/실패고백/전후비교/질문선택/실험검증/배려감동/타깃공감)을 골고루 적용해, 얼굴 노출 없이 스마트폰으로 찍을 수 있는 릴스 소재 10개를 제안해줘.`;
  const assembledPrompt30 = `나는 ${region}에서 ${crop}을(를) ${years}째 하고 있어. ${seasonPromptContext} 내 고객은 ${customerSummary}이야. 지금 이 시기(${currentMonthObj.label})와 농장 시즌 상태(${currentSeasonObj.shortLabel})에 맞춰 1주차~4주차 흐름으로 구성된 '월별 30일 컨텐츠 달력(Day 1~Day 30)' 릴스 소재 30개를 《BRACKET HOOK 100》의 2줄 압축 자막과 함께 제안해줘.`;
  const assembledBracket30Prompt = `당신은 30초 이내 세로형 숏폼을 설계하는 "BRACKET 30 자동 기획 엔진"입니다. 확인되지 않은 사실·숫자·성과를 창작하지 말고, 상투적 인사("안녕하세요", "오늘은") 없이 첫 1.5초 안에 갈등·대사·결과 단면 중 하나를 제시하세요. 1.5~3초마다 화면 변화, 한 화면 자막 2줄 이하, 단일 CTA([${dmKeyword}]) 원칙을 지켜 아래 [괄호] 원문을 7초/15초/30초 대본과 CapCut 편집표로 기획해 주세요.\n\n[${rawStory}]`;

  // 프리셋 선택 핸들러
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setRegion(preset.region);
    setCrop(preset.crop);
    setYears(preset.years);
    setPhone(preset.phone);
    setCard1(preset.card1);
    setCard1_2(preset.card2);
    setCard3(preset.card3);
    setCard4(preset.card4);
    setRawStory(preset.rawStory);
    setErrorMessage('');

    const autoMode = detectRecommendedSeasonMode(preset, selectedMonth);
    setSeasonMode(autoMode);
    const nextKeyword =
      autoMode === 'offseason' ? '알림' : autoMode === 'preorder' ? '예약' : preset.dmKeyword;
    setDmKeyword(nextKeyword);

    const updatedCal = buildInstant30DayCalendar(
      preset.region,
      preset.crop,
      preset.years,
      preset.card1,
      preset.card2,
      preset.card3,
      preset.card4,
      nextKeyword,
      selectedMonth,
      autoMode
    );
    setCalendar30(updatedCal);
    setSelectedTopic(null);
    setDetailGuide(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const callGeminiAPI = async (payload) => {
    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`API 오류 (${response.status})`);
    }
    return await response.json();
  };

  // [버튼 1] 핵심 릴스 소재 10개 생성 요청
  const handleGenerateTopics10 = async () => {
    if (!region.trim() || !crop.trim() || !card1.trim()) {
      setErrorMessage('지역, 재배 품목(업종), 고객 카드 내용을 입력해 주세요.');
      return;
    }
    setErrorMessage('');
    setActiveTab('topics10');
    setIsLoadingTopics(true);
    setSelectedTopic(null);
    setDetailGuide(null);

    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const base30 = buildInstant30DayCalendar(
      region,
      crop,
      years,
      card1,
      card2,
      card3,
      card4,
      dmKeyword,
      selectedMonth,
      seasonMode
    );
    const instant10 = [
      base30[0],
      base30[1],
      base30[3],
      base30[7],
      base30[9],
      base30[15],
      base30[16],
      base30[23],
      base30[24],
      base30[29]
    ].map((item, idx) => ({
      ...item,
      number: idx + 1,
      hookTypeId: HOOK_TYPES[idx % HOOK_TYPES.length].id,
      hookTypeCode: HOOK_TYPES[idx % HOOK_TYPES.length].code,
      hookTypeName: HOOK_TYPES[idx % HOOK_TYPES.length].name
    }));

    try {
      const systemInstruction = `당신은 대한민국 농가 및 소상공인을 위한 'BRACKET HOOK 100 & BRACKET 30 숏폼 기획 코치'입니다. 사용자가 선택한 촬영 월(${currentMonthObj.label})과 농장 시즌 상태(${currentSeasonObj.badge})에 맞춰 얼굴 노출 없이 찍을 수 있는 소재 10가지를 JSON 배열로 제안하세요. 거짓 낚시("충격, 대박, 무조건")는 절대 금지합니다.`;
      const payload = {
        contents: [{ role: 'user', parts: [{ text: assembledPrompt10 }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                number: { type: 'INTEGER' },
                title: { type: 'STRING' },
                sceneSummary: { type: 'STRING' },
                soundPoint: { type: 'STRING' },
                whyItSells: { type: 'STRING' },
                hookPreview: { type: 'STRING' }
              },
              propertyOrdering: ['number', 'title', 'sceneSummary', 'soundPoint', 'whyItSells', 'hookPreview']
            }
          }
        }
      };
      const result = await callGeminiAPI(payload);
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText).map((item, idx) => ({
          ...item,
          hookTypeId: HOOK_TYPES[idx % HOOK_TYPES.length].id,
          hookTypeCode: HOOK_TYPES[idx % HOOK_TYPES.length].code,
          hookTypeName: HOOK_TYPES[idx % HOOK_TYPES.length].name
        }));
        setTopics(parsed);
      } else {
        setTopics(instant10);
      }
    } catch {
      setTopics(instant10);
    } finally {
      setIsLoadingTopics(false);
    }
  };

  // [버튼 2] 월별 컨텐츠 달력 30개 한 번에 뽑기
  const handleGenerateCalendar30 = async () => {
    if (!region.trim() || !crop.trim() || !card1.trim()) {
      setErrorMessage('지역, 재배 품목(업종), 고객 카드 내용을 입력해 주세요.');
      return;
    }
    setErrorMessage('');
    setActiveTab('calendar30');
    setSelectedWeek('all');
    setIsLoadingCalendar(true);
    setSelectedTopic(null);
    setDetailGuide(null);

    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const instant30 = buildInstant30DayCalendar(
      region,
      crop,
      years,
      card1,
      card2,
      card3,
      card4,
      dmKeyword,
      selectedMonth,
      seasonMode
    );

    try {
      const systemInstruction = `당신은 대한민국 농가 및 소상공인을 위한 '월별 30일 숏폼 컨텐츠 캘린더 기획 코치'입니다. 사용자가 선택한 월(${currentMonthObj.label})과 농장 시즌 상태(${currentSeasonObj.badge})에 맞춰 30일 컨텐츠 달력을 JSON 배열(30개)로 생성하세요.`;
      const payload = {
        contents: [{ role: 'user', parts: [{ text: assembledPrompt30 }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                day: { type: 'INTEGER' },
                week: { type: 'INTEGER' },
                category: { type: 'STRING' },
                title: { type: 'STRING' },
                sceneSummary: { type: 'STRING' },
                soundPoint: { type: 'STRING' },
                whyItSells: { type: 'STRING' },
                hookPreview: { type: 'STRING' }
              },
              propertyOrdering: ['day', 'week', 'category', 'title', 'sceneSummary', 'soundPoint', 'whyItSells', 'hookPreview']
            }
          }
        }
      };
      const result = await callGeminiAPI(payload);
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          setCalendar30(
            parsed.map((item, idx) => ({
              ...item,
              hookTypeId: HOOK_TYPES[idx % HOOK_TYPES.length].id,
              hookTypeCode: HOOK_TYPES[idx % HOOK_TYPES.length].code,
              hookTypeName: HOOK_TYPES[idx % HOOK_TYPES.length].name,
              shortFirstFrameSub: HOOK_TYPES[idx % HOOK_TYPES.length].shortSubFn(crop.split(' ')[0] || '농산물')
            }))
          );
        } else {
          setCalendar30(instant30);
        }
      } else {
        setCalendar30(instant30);
      }
    } catch {
      setCalendar30(instant30);
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  // [Step 2 -> Step 3] 소재 카드 클릭 시 상세 가이드 생성
  const handleSelectTopic = async (item) => {
    const dayNum = item.day || item.number || 1;
    const defaultHookType = item.hookTypeId || HOOK_TYPES[(dayNum - 1) % HOOK_TYPES.length].id;
    setSelectedHookTypeId(defaultHookType);

    const normalizedItem = {
      ...item,
      number: dayNum
    };
    setSelectedTopic(normalizedItem);
    setIsLoadingDetail(true);
    setChatHistory([]);
    setErrorMessage('');

    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    const instantPackage = buildInstantDetailGuide(
      normalizedItem,
      region,
      crop,
      years,
      phone,
      dmKeyword,
      card1,
      card2,
      card3,
      card4,
      selectedMonth,
      seasonMode,
      defaultHookType,
      rawStory
    );

    setDetailGuide(instantPackage);
    setIsLoadingDetail(false);
  };

  // [단일 괄호 원문]으로 즉시 Step 3 기획안 열기
  const handleRunSingleBracketEngine = () => {
    const customItem = {
      day: 1,
      number: 1,
      category: `${currentMonthObj.label} BRACKET 30 직통 기획`,
      title: `${region} ${crop} — 내 농장 실제 이야기 기반 숏폼 기획`,
      sceneSummary: `${card3}을(를) 현장에서 직접 확인하고 정성껏 준비하는 손길`,
      soundPoint: '현장 수확·선별 소리와 담백한 내레이션',
      whyItSells: '과장 없는 농부의 실제 경험과 눈으로 보이는 증거 결합',
      hookPreview: `${crop.split(' ')[0]}, 겉모양만 보고 고르면 놓치기 쉽습니다`,
      hookTypeId: selectedHookTypeId
    };
    handleSelectTopic(customItem);
  };

  const formatAll30CalendarText = () => {
    const header = `=== [${region} ${crop}] ${currentMonthObj.label}(${currentMonthObj.seasonTag}) × ${currentSeasonObj.shortLabel} 30일 컨텐츠 달력 ===\n\n`;
    const body = calendar30
      .map(
        (c) =>
          `[Day ${c.day} | ${c.category} | ${c.hookTypeName}] ${c.title}\n- 10초 장면: ${c.sceneSummary}\n- 현장 소리(ASMR): ${c.soundPoint}\n- 2줄 압축 첫 자막: "${c.shortFirstFrameSub?.replace('\n', ' / ')}"\n- 후킹 대사: "${c.hookPreview}"\n`
      )
      .join('\n');
    return header + body;
  };

  const handleSendFollowUp = async (customQuestion) => {
    const questionText = customQuestion || chatInput;
    if (!questionText.trim() || !selectedTopic || !detailGuide) return;

    const newUserMessage = { role: 'user', text: questionText };
    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);
    setChatInput('');
    setIsLoadingChat(true);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const contextPrompt = `농가 정보: ${region} ${crop} (${years})\n촬영 시기 및 시즌: ${currentMonthObj.label} / ${currentSeasonObj.badge}\n선택 소재: ${selectedTopic.title}\n현재 후킹(${detailGuide.selectedHookObj.name}): ${detailGuide.activeHook.fullHook}\n현재 대본: ${detailGuide.scriptsByDuration[durationMode].fullScriptWithBreaths}\n\n요청사항: "${questionText}"\n《BRACKET HOOK 100》 및 《BRACKET 30》 원칙(거짓 낚시 금지, 2줄 이하 압축 자막, 단일 CTA)을 지켜 수정본을 작성해 주세요.`;
      const result = await callGeminiAPI({
        contents: [{ role: 'user', parts: [{ text: contextPrompt }] }]
      });
      const replyText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        `[맞춤 수정안]\n\n1. 2줄 이하 첫 화면 압축 자막:\n"${detailGuide.activeHook.shortSub}"\n\n2. 수정된 낭독 대본:\n"${detailGuide.activeHook.fullHook} / ${card3}만 골라 담았습니다. / 댓글에 [${dmKeyword}] 남기시면 안내 DM 보내드려요!"`;
      setChatHistory([...updatedHistory, { role: 'assistant', text: replyText }]);
    } catch {
      const fallbackReply = `✅ 요청하신 내용("${questionText}")을 반영한 《BRACKET HOOK 100 & BRACKET 30》 기준 맞춤 수정본입니다:\n\n[첫 화면 2줄 이하 압축 자막]\n"${detailGuide.activeHook.shortSub}"\n\n[과장 없는 진정성 대본 (낭독 15초 내외)]\n"${detailGuide.activeHook.fullHook} / ${region}에서 ${years}째 ${crop}을 키우며 제 손으로 직접 ${card3}을 확인한 것만 보내드립니다. / 댓글에 [${dmKeyword}] 남기시거나 ${phone}으로 문자 주시면 안내 보내드릴게요!"`;
      setChatHistory([...updatedHistory, { role: 'assistant', text: fallbackReply }]);
    } finally {
      setIsLoadingChat(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const filteredCalendar =
    selectedWeek === 'all'
      ? calendar30
      : calendar30.filter((item) => item.week === selectedWeek);

  const getWeekTabLabels = () => {
    if (seasonMode === 'offseason') {
      return [
        { id: 'all', label: '전체 보기 (Day 1~30)' },
        { id: 1, label: '1주차: 밭·토양·시설 기본기 (Day 1~7)' },
        { id: 2, label: '2주차: 생육 과정·농부 ASMR (Day 8~15)' },
        { id: 3, label: '3주차: 식재료 꿀팁·정보 저장 (Day 16~23)' },
        { id: 4, label: '4주차: 단골 팬덤·수확알림 모집 (Day 24~30)' }
      ];
    }
    if (seasonMode === 'preorder') {
      return [
        { id: 'all', label: '전체 보기 (Day 1~30)' },
        { id: 1, label: '1주차: 수확 카운트다운·기대감 (Day 1~7)' },
        { id: 2, label: '2주차: 당도·속살 사전검증·박스입고 (Day 8~15)' },
        { id: 3, label: '3주차: 사전예약 혜택·마감임박 (Day 16~23)' },
        { id: 4, label: '4주차: 첫 수확 개시·첫 출하 (Day 24~30)' }
      ];
    }
    return [
      { id: 'all', label: '전체 보기 (Day 1~30)' },
      { id: 1, label: '1주차: 새벽 수확·농장 신뢰 (Day 1~7)' },
      { id: 2, label: '2주차: 수확 ASMR·사이즈 비교 (Day 8~15)' },
      { id: 3, label: '3주차: 반 갈라 속살·보관법 (Day 16~23)' },
      { id: 4, label: '4주차: 안전포장·택배전쟁·마감 (Day 24~30)' }
    ];
  };

  const universalChatbotSystemPrompt = `[역할 부여: BRACKET HOOK 100 × BRACKET 30 × CapCut 마스터 코치]
당신은 대한민국 농가와 소상공인을 위한 '숏폼 자동 기획 & 캡컷 실전 편집 코치'입니다.

[절대 규칙 (BRACKET 30 & BRACKET HOOK 100 기준)]
1. 입력에 없는 구체적 숫자, 실명, 매출, 효능을 허위로 창작하지 마세요.
2. "안녕하세요", "오늘은 ~을 알아보겠습니다", "충격·대박·무조건·끝까지 보세요" 같은 상투어와 거짓 낚시를 절대 쓰지 마세요.
3. 첫 1.5초(STOP) 안에 실제 대사, 갈등, 비정상적 장면, 속살 단면 결과 중 하나를 제시하세요.
4. 첫 화면 자막은 반드시 '2줄 이하 짧은 압축 자막'으로 설계하고, 9:16 화면의 상단·하단·우측 UI 영역을 비워 정중앙에 배치하세요.
5. 1.5~3초마다 화면 크기(와이드➔중간➔클로즈업)나 정보 변화를 주고, 한 영상의 핵심 메시지는 하나, CTA도 하나(예: 댓글 [${dmKeyword}])만 요청하세요.

[패키지 출력 구성]
① 10대 후킹 유형별 괄호 원문 & 2줄 압축 자막 & Rewrite Clinic
② 7초(즉답형) / 15초(5컷 표준형) / 30초(STOP-SETUP-PULL-PAYOFF-ACTION) 타임라인 및 호흡 표시(/) 낭독 대본
③ CapCut 촬영 기초(1080p 30fps, 자연광 45도, 앞뒤 1초 핸들 여유) & 농산물 8컷 촬영 리스트
④ CapCut 정밀 편집(트리밍 vs 분할·삭제, L컷 오버레이 B-roll, 0초 100%➔2초 108% 키프레임, 2x➔0.5x➔1x 속도 곡선, 음성 100%:음악 8% 덕킹, 노출➔화이트밸런스➔대비➔채도 색보정, 송장 개인정보 가림)
⑤ 6대 Quality Gate 검수표 및 A/B 테스트 기록 시트`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans pb-24">
      {/* 상단 헤더 */}
      <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white shadow-lg sticky top-0 z-30 border-b border-emerald-700">
        <div className="max-w-6xl mx-auto px-4 py-3.5 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="bg-amber-400 text-emerald-950 p-2.5 rounded-2xl shadow-md shrink-0">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-emerald-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  Ver 4.0 마스터 에디션: 📘 후킹 100종 × ⚡ 30초 자동기획 × ✂️ 캡컷 촬영·편집 전자책 통합
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight mt-1">
                🌾 농가 AI 숏폼 자동기획 & 후킹 100 · 캡컷 실전 마스터 챗봇
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowSystemPromptModal(true)}
            className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-white/20 transition cursor-pointer shrink-0"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>전자책 통합 마스터 프롬프트 보기</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* ================= STEP 1: 농장 정보 & 월별(성수기·비수기) & [단일 괄호 스토리] 설정 ================= */}
        <section className="bg-white rounded-3xl border-2 border-emerald-800/15 shadow-md overflow-hidden">
          <div className="bg-emerald-50/90 border-b border-emerald-100 px-5 py-4 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="bg-emerald-800 text-white text-sm font-extrabold px-3 py-1 rounded-full">
                1단계
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                품목 · 시기 설정 & [단일 괄호 스토리] 입력하기
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-emerald-800 font-bold">
              💡 품목 프리셋을 누르거나 [내 농장 실제 이야기] 한 칸만 고쳐도 전체 기획이 자동 완성됩니다!
            </span>
          </div>

          <div className="p-5 sm:p-7 space-y-6">
            {/* 품목별 원클릭 프리셋 버튼 */}
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                🌱 1) 재배 품목별 예시 원클릭 불러오기
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-bold transition cursor-pointer border ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                          : 'bg-stone-50 hover:bg-emerald-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {preset.badge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 촬영 기준 월(1월~12월) & 성수기/사전예약기/비수기 선택 */}
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50/60 to-emerald-50/50 p-5 rounded-2xl border-2 border-indigo-200 space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 border-b border-indigo-200/80 pb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-indigo-700 text-white text-xs font-extrabold px-2.5 py-1 rounded-full mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    시기별 · 시즌별 맞춤 달력 & 후킹 변환
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-indigo-950">
                    🗓️ 2) 몇 월에 찍으시나요? 지금 성수기인가요, 비수기인가요?
                  </h3>
                </div>
                <div className="text-xs font-bold text-indigo-900 bg-white px-3.5 py-2 rounded-xl border border-indigo-200 shadow-2xs">
                  💡 {currentPresetObj.badge} 참고: {currentPresetObj.seasonInfo}
                </div>
              </div>

              {/* 1월 ~ 12월 선택 버튼 그리드 */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-extrabold text-stone-800">
                  ① 촬영 기준 월 선택 (월을 누르면 해당 품목의 성수기·비수기가 자동 추천됩니다)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                  {MONTH_DATA.map((m) => {
                    const isSelected = selectedMonth === m.month;
                    const isPeakForPreset = currentPresetObj.peakMonths?.includes(m.month);
                    const isPreorderForPreset = currentPresetObj.preorderMonths?.includes(m.month);

                    return (
                      <button
                        key={m.month}
                        type="button"
                        onClick={() => handleMonthChange(m.month)}
                        className={`relative py-2.5 px-2 rounded-xl text-center transition cursor-pointer border-2 flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-indigo-800 text-white border-indigo-900 shadow-md scale-105 z-10'
                            : 'bg-white hover:bg-indigo-50 text-stone-800 border-stone-200'
                        }`}
                      >
                        <span className="text-sm font-extrabold">{m.label}</span>
                        <span
                          className={`text-[10px] font-bold mt-0.5 px-1.5 py-0.2 rounded-full ${
                            isSelected
                              ? 'bg-amber-400 text-indigo-950'
                              : isPeakForPreset
                              ? 'bg-rose-100 text-rose-800'
                              : isPreorderForPreset
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {isPeakForPreset ? '성수기' : isPreorderForPreset ? '예약기' : '비수기'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="bg-white/90 px-4 py-2.5 rounded-xl border border-indigo-200/80 text-xs sm:text-sm font-bold text-indigo-950 flex items-center justify-between flex-wrap gap-2">
                  <span>
                    🌤️ 선택한 <strong>{currentMonthObj.label}({currentMonthObj.seasonTag})</strong> 현장 포인트: {currentMonthObj.weatherHook}
                  </span>
                </div>
              </div>

              {/* 농장 시즌 상태 3가지 선택 탭 */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-extrabold text-stone-800">
                  ② 내 농장 시즌 모드 선택 (단일 CTA 목표 자동 설정)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SEASON_MODES.map((mode) => {
                    const isSelected = seasonMode === mode.id;
                    const activeColor =
                      mode.id === 'peak'
                        ? 'border-rose-600 bg-rose-600 text-white shadow-md'
                        : mode.id === 'preorder'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-md'
                        : 'border-emerald-700 bg-emerald-700 text-white shadow-md';

                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleSeasonModeChange(mode.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? activeColor
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm sm:text-base font-extrabold">{mode.badge}</span>
                          {isSelected && (
                            <span className="bg-white/25 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                              선택됨 ✓
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? 'text-white/95 font-medium' : 'text-stone-600'
                          }`}
                        >
                          {mode.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 기본 정보 5칸 */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-3">
              <h3 className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-700" />
                3) 기본 농장 정보 & 단일 CTA(매니챗·쇼츠) 설정
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">① [지역]</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="예: 전북 익산, 충북 증평"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ② [재배 작물 / 업종]
                  </label>
                  <input
                    type="text"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    placeholder="예: 배추, 블루베리, 벼"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ③ [경력(N년)]
                  </label>
                  <input
                    type="text"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="예: 15년"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-teal-800 mb-1">
                    ④ [매니챗 단일 댓글 키워드]
                  </label>
                  <input
                    type="text"
                    value={dmKeyword}
                    onChange={(e) => setDmKeyword(e.target.value)}
                    placeholder="예: 주문, 예약, 알림"
                    className="w-full px-3 py-2 bg-teal-50/60 border border-teal-300 rounded-xl text-sm font-bold text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-800 mb-1">
                    ⑤ [전화번호 (유튜브 쇼츠용)]
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-3 py-2 bg-indigo-50/60 border border-indigo-300 rounded-xl text-sm font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* ★ 신규 추가: 《BRACKET 30》 단 하나의 [대괄호] 스토리 파서 입력칸 ★ */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 p-5 rounded-2xl border-2 border-amber-300 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="inline-block bg-amber-900 text-amber-300 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                    《BRACKET 30》 자동 기획 엔진 (p.3, p.17)
                  </span>
                  <h3 className="text-base font-extrabold text-amber-950">
                    ✍️ 4) 단 하나의 [괄호] 안에 내 농장의 진짜 이야기를 적어보세요
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    "나는 누구인가 + 어떤 일이 있었나 + 그래서 어떤 기준을 지키나"만 적으면 7초·15초·30초 대본과 촬영표로 자동 변환됩니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRunSingleBracketEngine}
                  className="bg-amber-900 hover:bg-stone-950 text-amber-300 text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>이 [괄호] 이야기로 즉시 기획안 열기</span>
                </button>
              </div>
              <div className="relative">
                <textarea
                  rows={3}
                  value={rawStory}
                  onChange={(e) => setRawStory(e.target.value)}
                  placeholder="[여기에 농장 이야기나 오늘 겪은 일을 적어보세요]"
                  className="w-full p-3.5 bg-white border-2 border-amber-400 rounded-xl text-sm sm:text-base font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* 고객 한 명 카드 4칸 */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                5) [고객 한 명 카드 4칸] 내 농산물을 사줄 단 한 명의 손님 (WHO & PROOF)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
                  <label className="block text-sm font-extrabold text-amber-950 mb-1">
                    칸 1. 내 고객은 누구인가요? (연령·상황 — TYPE 10 호명 기준)
                  </label>
                  <input
                    type="text"
                    value={card1}
                    onChange={(e) => setCard1(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
                  <label className="block text-sm font-extrabold text-amber-950 mb-1">
                    칸 2. 사기 전에 무엇을 가장 걱정·의심하나요? (TYPE 01 손실·경고 기준)
                  </label>
                  <input
                    type="text"
                    value={card2}
                    onChange={(e) => setCard1_2(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
                  <label className="block text-sm font-extrabold text-amber-950 mb-1">
                    칸 3. 사기 전에 눈으로 꼭 확인하고 싶은 증거 장면은? (PROOF)
                  </label>
                  <input
                    type="text"
                    value={card3}
                    onChange={(e) => setCard3(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
                  <label className="block text-sm font-extrabold text-amber-950 mb-1">
                    칸 4. 농부의 어떤 기준과 약속에 신뢰를 얻나요? (PAYOFF)
                  </label>
                  <input
                    type="text"
                    value={card4}
                    onChange={(e) => setCard4(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* 자동 완성된 질문(프롬프트) 미리보기 박스 */}
            <div className="bg-emerald-950 text-emerald-50 p-5 rounded-2xl shadow-inner space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    자동 완성된 나의 마스터 프롬프트
                  </span>
                  <div className="flex bg-black/30 rounded-lg p-0.5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPromptMode('bracket30')}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        promptMode === 'bracket30' ? 'bg-amber-400 text-emerald-950' : 'text-stone-300'
                      }`}
                    >
                      📘 BRACKET 30 단일괄호용
                    </button>
                    <button
                      type="button"
                      onClick={() => setPromptMode('30')}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        promptMode === '30' ? 'bg-amber-400 text-emerald-950' : 'text-stone-300'
                      }`}
                    >
                      📅 30일 달력용
                    </button>
                    <button
                      type="button"
                      onClick={() => setPromptMode('10')}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        promptMode === '10' ? 'bg-amber-400 text-emerald-950' : 'text-stone-300'
                      }`}
                    >
                      ✨ 10대 후킹 소재용
                    </button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      promptMode === 'bracket30'
                        ? assembledBracket30Prompt
                        : promptMode === '30'
                        ? assembledPrompt30
                        : assembledPrompt10,
                      'masterPrompt'
                    )
                  }
                  className="flex items-center justify-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {copiedId === 'masterPrompt' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-amber-300 font-bold">질문 복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>프롬프트 복사하기</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium text-stone-100 bg-black/25 p-4 rounded-xl border border-white/10 whitespace-pre-line">
                {promptMode === 'bracket30'
                  ? assembledBracket30Prompt
                  : promptMode === '30'
                  ? assembledPrompt30
                  : assembledPrompt10}
              </p>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 2개의 대형 실행 버튼 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <button
                onClick={handleGenerateCalendar30}
                disabled={isLoadingCalendar}
                className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 hover:from-indigo-800 hover:to-blue-900 disabled:opacity-60 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2.5 cursor-pointer border-2 border-indigo-400/30"
              >
                {isLoadingCalendar ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-300" />
                    <span>{currentMonthObj.label} 맞춤 30일 달력 생성 중...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-6 h-6 text-amber-300 shrink-0" />
                    <span>
                      📅 [{currentMonthObj.label} · {currentSeasonObj.shortLabel}] 30일 달력 뽑기
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={handleGenerateTopics10}
                disabled={isLoadingTopics}
                className="bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 disabled:opacity-60 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isLoadingTopics ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-300" />
                    <span>10대 후킹 소재 기획 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
                    <span>✨ 《BRACKET HOOK 100》 유형별 소재 10개 추천받기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ================= STEP 2: 월별 30일 컨텐츠 달력 & 10개 추천 소재 ================= */}
        <div ref={step2Ref}>
          <section className="bg-white rounded-3xl border-2 border-indigo-900/15 shadow-md overflow-hidden">
            <div
              className={`px-5 py-4 sm:px-7 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 ${
                seasonMode === 'peak'
                  ? 'bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900'
                  : seasonMode === 'preorder'
                  ? 'bg-gradient-to-r from-amber-900 via-amber-800 to-emerald-900'
                  : 'bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-400 text-stone-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    현재 30일 달력 기준
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-amber-200">
                    🗓️ {currentMonthObj.label} ({currentMonthObj.seasonTag}) × {currentSeasonObj.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/90">
                  🎯 단일 행동 요청(ACT): <strong>{currentSeasonObj.ctaGoal}</strong> (댓글 키워드:{' '}
                  <strong className="text-amber-300">[{dmKeyword}]</strong>)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-black/25 p-2 rounded-2xl border border-white/15">
                <span className="text-xs font-bold text-amber-300 px-1">⚡ 즉시 비교:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMonth(7);
                    handleSeasonModeChange('offseason');
                  }}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    seasonMode === 'offseason'
                      ? 'bg-emerald-400 text-emerald-950 shadow-xs'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  🌱 7월 비수기 달력
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMonth(10);
                    handleSeasonModeChange('preorder');
                  }}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    seasonMode === 'preorder'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  ⏳ 10월 사전예약 달력
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMonth(11);
                    handleSeasonModeChange('peak');
                  }}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    seasonMode === 'peak'
                      ? 'bg-rose-400 text-stone-950 shadow-xs'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  🔥 11월 극성수기 달력
                </button>
              </div>
            </div>

            {/* 상단 탭 전환 바 */}
            <div className="bg-stone-100 border-b border-stone-200 px-4 pt-4 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('calendar30')}
                  className={`px-5 py-3 rounded-t-2xl font-extrabold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'calendar30'
                      ? 'bg-white text-indigo-900 border-t-2 border-x-2 border-indigo-600 shadow-xs'
                      : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span>
                    📅 {currentMonthObj.label} 컨텐츠 달력 30일 ({currentSeasonObj.shortLabel})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (topics.length === 0) {
                      handleGenerateTopics10();
                    } else {
                      setActiveTab('topics10');
                    }
                  }}
                  className={`px-5 py-3 rounded-t-2xl font-extrabold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'topics10'
                      ? 'bg-white text-emerald-900 border-t-2 border-x-2 border-emerald-700 shadow-xs'
                      : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>🔥 10대 후킹 유형별 추천 10선</span>
                </button>
              </div>

              <div className="pb-3 sm:pb-2 text-xs sm:text-sm font-bold text-indigo-950 bg-amber-100 px-3.5 py-1.5 rounded-xl border border-amber-300">
                👇 카드를 클릭하면 [후킹 100종 × 7·15·30초 대본 × 캡컷 실전 편집표]가 열립니다!
              </div>
            </div>

            {/* 탭 1: 월별 30일 컨텐츠 달력 화면 */}
            {activeTab === 'calendar30' && (
              <div className="p-5 sm:p-7 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                  <div className="flex flex-wrap gap-2">
                    {getWeekTabLabels().map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedWeek(tab.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                          selectedWeek === tab.id
                            ? 'bg-indigo-700 text-white shadow-xs'
                            : 'bg-white text-stone-700 hover:bg-indigo-100 border border-indigo-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(formatAll30CalendarText(), 'copyAll30')}
                    className="flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-950 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition cursor-pointer shrink-0"
                  >
                    {copiedId === 'copyAll30' ? (
                      <>
                        <Check className="w-4 h-4 text-amber-300" />
                        <span className="text-amber-300">30일 달력 전체 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>📋 {currentMonthObj.label} 30일 달력 전체 복사</span>
                      </>
                    )}
                  </button>
                </div>

                {isLoadingCalendar ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                    <RefreshCw className="w-10 h-10 animate-spin text-indigo-700" />
                    <p className="text-lg font-extrabold text-stone-800">
                      {region} {crop} [{currentMonthObj.label} · {currentSeasonObj.shortLabel}] 30일 달력을 구성하고 있습니다...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCalendar.map((item) => {
                      const isSelected = selectedTopic?.number === item.day;
                      return (
                        <div
                          key={item.day}
                          onClick={() => handleSelectTopic(item)}
                          className={`group rounded-2xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-indigo-700 bg-indigo-50/60 shadow-md ring-2 ring-indigo-600/20'
                              : 'border-stone-200 hover:border-indigo-600 bg-white hover:bg-stone-50/70 shadow-2xs'
                          }`}
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-900 text-amber-300">
                                📅 Day {item.day}
                              </span>
                              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-950 border border-amber-300">
                                🪝 {item.hookTypeName}
                              </span>
                            </div>

                            <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                              {item.title}
                            </h3>

                            <div className="space-y-1.5 text-xs sm:text-sm bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                              <p className="text-stone-800">
                                <span className="font-bold text-indigo-800">📷 핵심 장면: </span>
                                {item.sceneSummary}
                              </p>
                              <p className="text-stone-700">
                                <span className="font-bold text-amber-800">🔊 현장음: </span>
                                {item.soundPoint}
                              </p>
                            </div>

                            <div className="bg-stone-900 text-white text-xs font-bold px-3 py-2.5 rounded-xl space-y-1">
                              <div className="text-[10px] text-amber-300 font-extrabold">
                                [첫 화면 2줄 압축 자막] “{item.shortFirstFrameSub?.replace('\n', ' / ')}”
                              </div>
                              <div className="text-stone-200">
                                💬 대사: “{item.hookPreview}”
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className={`mt-3 w-full py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition ${
                              isSelected
                                ? 'bg-indigo-700 text-white'
                                : 'bg-indigo-50 text-indigo-900 group-hover:bg-indigo-700 group-hover:text-white'
                            }`}
                          >
                            <Video className="w-4 h-4" />
                            <span>
                              {isSelected
                                ? '선택됨 (아래에서 7·15·30초 기획안 확인)'
                                : '후킹100 · 30초기획 · 캡컷 가이드 열기'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 탭 2: 핵심 추천 소재 10선 화면 */}
            {activeTab === 'topics10' && (
              <div className="p-5 sm:p-7">
                {isLoadingTopics ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                    <RefreshCw className="w-10 h-10 animate-spin text-emerald-700" />
                    <p className="text-lg font-extrabold text-stone-800">
                      {region} {crop} 맞춤형 10대 후킹 소재를 선별하고 있습니다...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topics.map((item) => {
                      const isSelected = selectedTopic?.number === item.number;
                      return (
                        <div
                          key={item.number}
                          onClick={() => handleSelectTopic(item)}
                          className={`group rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-700 bg-emerald-50/60 shadow-md'
                              : 'border-stone-200 hover:border-emerald-600 bg-white'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-800 text-white">
                                핵심 소재 #{item.number}
                              </span>
                              <span className="text-xs font-extrabold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg">
                                🪝 {item.hookTypeCode} · {item.hookTypeName}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                              {item.title}
                            </h3>
                            <div className="space-y-1.5 text-sm bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                              <p>
                                <span className="font-bold text-emerald-800">📷 무엇을 찍나요: </span>
                                {item.sceneSummary}
                              </p>
                              <p>
                                <span className="font-bold text-amber-800">🔊 현장 소리: </span>
                                {item.soundPoint}
                              </p>
                              <p>
                                <span className="font-bold text-teal-800">💰 작동 원리: </span>
                                {item.whyItSells}
                              </p>
                            </div>
                            <div className="bg-stone-900 text-amber-300 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl">
                              💬 첫 문장: “{item.hookPreview}”
                            </div>
                          </div>
                          <button
                            type="button"
                            className="mt-4 w-full py-3 px-4 rounded-xl font-extrabold text-sm bg-emerald-100 text-emerald-900 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center gap-2 transition"
                          >
                            <span>7·15·30초 대본 & 캡컷 편집 패키지 열기</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* ================= STEP 3: 전자책 3권 통합 올인원 디테일 패키지 ================= */}
        <div ref={step3Ref}>
          {(isLoadingDetail || detailGuide) && selectedTopic && (
            <section className="bg-white rounded-3xl border-2 border-emerald-700 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white px-5 py-5 sm:px-7">
                <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    3단계: 《BRACKET HOOK 100》 × 《BRACKET 30》 × 《CapCut 실전가이드》 통합 패키지
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold">
                  [Day {selectedTopic.number}] {selectedTopic.title}
                </h2>
              </div>

              {detailGuide && (
                <div className="p-5 sm:p-7 space-y-10">
                  {/* ===== 섹션 ①: 《BRACKET HOOK 100》 10대 후킹 엔진 & 2줄 압축 자막 & Rewrite Clinic ===== */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-amber-500 text-stone-950 p-2 rounded-xl font-extrabold">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                            ① 《BRACKET HOOK 100》 10대 후킹 유형 선택기 & 2줄 압축 첫 자막
                          </h3>
                          <p className="text-xs text-stone-500">
                            버튼을 눌러 10가지 후킹 공식 중 내 농장 상황에 가장 잘 맞는 첫 문장과 압축 자막을 골라보세요.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 10대 후킹 유형 선택 버튼 그리드 */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {HOOK_TYPES.map((ht) => {
                        const isSelected = selectedHookTypeId === ht.id;
                        return (
                          <button
                            key={ht.id}
                            type="button"
                            onClick={() => handleHookTypeChange(ht.id)}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-sm'
                                : 'bg-stone-50 hover:bg-amber-50/70 text-stone-700 border-stone-200 font-semibold'
                            }`}
                          >
                            <div className="text-[10px] opacity-80">{ht.code}</div>
                            <div className="text-xs sm:text-sm font-extrabold mt-0.5">{ht.name}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* 선택된 후킹 유형의 3단 설계 (괄호 원문 vs 2줄 압축 자막 vs 첫 장면) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-stone-900 text-white p-5 rounded-2xl">
                      <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-2">
                        <span className="text-xs font-extrabold text-amber-300 bg-stone-950 px-2.5 py-1 rounded-md inline-block">
                          1. 첫 화면 2줄 이하 압축 자막 (p.10)
                        </span>
                        <div className="text-lg sm:text-xl font-extrabold text-amber-300 whitespace-pre-line leading-snug py-2 border-y border-stone-700">
                          {detailGuide.activeHook.shortSub}
                        </div>
                        <p className="text-xs text-stone-300">
                          ※ 첫 자막은 두 줄 이하로 시작하며, 작물과 손을 글씨로 덮지 않게 정중앙에 배치합니다.
                        </p>
                      </div>

                      <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-2">
                        <span className="text-xs font-extrabold text-emerald-300 bg-stone-950 px-2.5 py-1 rounded-md inline-block">
                          2. 후킹 대사 원문 ({detailGuide.selectedHookObj.name})
                        </span>
                        <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                          “{detailGuide.activeHook.fullHook}”
                        </p>
                        <p className="text-xs text-stone-400">
                          💡 작동 원리: {detailGuide.selectedHookObj.principle}
                        </p>
                      </div>

                      <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-2">
                        <span className="text-xs font-extrabold text-sky-300 bg-stone-950 px-2.5 py-1 rounded-md inline-block">
                          3. 시청자에게 남길 질문 & 첫 1.5초 장면
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-sky-200">
                          ❓ 남는 질문: “{detailGuide.activeHook.questionLeft}”
                        </p>
                        <p className="text-xs text-stone-200 leading-relaxed">
                          🎬 첫 장면: {detailGuide.activeHook.firstFrameScene}
                        </p>
                      </div>
                    </div>

                    {/* Rewrite Clinic (과장·낚시 제거 클리닉) */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2.5">
                      <div className="text-xs sm:text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>《BRACKET HOOK 100》 REWRITE CLINIC (p.72): “충격·대박·무조건”을 빼도 더 강해집니다</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {detailGuide.rewriteClinic.map((item, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-200 text-xs space-y-1.5">
                            <div className="text-rose-700 font-bold line-through">{item.bad}</div>
                            <div className="text-emerald-900 font-extrabold">➔ 수정: {item.good}</div>
                            <div className="text-stone-500">{item.reason}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===== 섹션 ②: 《BRACKET 30》 스토리 파서 & 7초·15초·30초 시간 엔진 ===== */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-emerald-700 text-white p-2 rounded-xl">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                            ② 《BRACKET 30》 7초 · 15초 · 30초 멀티 타임라인 & 낭독 대본
                          </h3>
                          <p className="text-xs text-stone-500">
                            같은 소재를 7초(한 장면 즉답) · 15초(5컷 표준) · 30초(스토리텔링)로 즉시 전환해 촬영할 수 있습니다.
                          </p>
                        </div>
                      </div>

                      {/* 7초 / 15초 / 30초 선택 탭 */}
                      <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-300">
                        {[
                          { id: '7s', label: '⚡ 7초 (즉답형)' },
                          { id: '15s', label: '🎯 15초 (5컷 표준)' },
                          { id: '30s', label: '🎬 30초 (스토리형)' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setDurationMode(tab.id)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                              durationMode === tab.id
                                ? 'bg-emerald-800 text-white shadow-xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 스토리 파서 6요소 요약 바 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs">
                      <div>
                        <span className="font-extrabold text-emerald-800 block">WHO (화자)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.who}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800 block">AUDIENCE (타깃)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.audience}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800 block">TRIGGER (계기)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.trigger}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800 block">FRICTION (갈등)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.friction}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800 block">PROOF (증거)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.proof}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800 block">ACTION (단일행동)</span>
                        <span className="text-stone-700">{detailGuide.storyParser.shiftAndAction}</span>
                      </div>
                    </div>

                    {/* 선택된 길이의 호흡 표시(/) 낭독 대본 박스 */}
                    <div className="bg-emerald-950 text-white p-5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-400 text-emerald-950 text-xs font-extrabold px-2.5 py-1 rounded-md">
                            {detailGuide.scriptsByDuration[durationMode].badge}
                          </span>
                          <span className="text-xs text-emerald-200 font-semibold">
                            ⏱️ {detailGuide.scriptsByDuration[durationMode].targetReadTime}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              detailGuide.scriptsByDuration[durationMode].fullScriptWithBreaths,
                              'scriptCopy'
                            )
                          }
                          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          {copiedId === 'scriptCopy' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-amber-300" />
                              <span>낭독 대본 복사 완료!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>낭독 대본 복사하기</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-amber-100 bg-black/25 p-4 rounded-xl border border-white/10 leading-relaxed">
                        {detailGuide.scriptsByDuration[durationMode].fullScriptWithBreaths}
                      </p>
                      <p className="text-xs text-emerald-200">
                        💡 낭독 테스트 (BRACKET 30 p.9): 슬래시( / ) 표시는 호흡을 잠깐 쉬거나 화면 컷이 바뀌는 지점입니다. 실제 목소리로 읽어보고 시간이 넘으면 빠르게 말하지 말고 수식어를 덜어내세요.
                      </p>
                    </div>

                    {/* 타임라인 테이블 */}
                    <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-stone-100 text-stone-800 border-b border-stone-200">
                            <th className="p-3 font-extrabold whitespace-nowrap">구간 (시간)</th>
                            <th className="p-3 font-extrabold whitespace-nowrap">역할</th>
                            <th className="p-3 font-extrabold">보여줄 화면 (증거·행동)</th>
                            <th className="p-3 font-extrabold">대사 / 내레이션</th>
                            <th className="p-3 font-extrabold">화면 중앙 자막 (2줄 이하)</th>
                            <th className="p-3 font-extrabold">편집 · 음향 지시</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {detailGuide.scriptsByDuration[durationMode].beats.map((beat, idx) => (
                            <tr key={idx} className="hover:bg-stone-50/80">
                              <td className="p-3 font-extrabold text-indigo-900 whitespace-nowrap">
                                {beat.time}
                              </td>
                              <td className="p-3 font-bold text-emerald-800 whitespace-nowrap">
                                {beat.role}
                              </td>
                              <td className="p-3 text-stone-800">{beat.screen}</td>
                              <td className="p-3 text-stone-700 font-medium">{beat.narration}</td>
                              <td className="p-3 font-extrabold text-amber-950 bg-amber-50/60 whitespace-pre-line">
                                {beat.subtitle}
                              </td>
                              <td className="p-3 text-stone-600 text-xs">{beat.soundAndEdit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ===== 섹션 ③: 《CapCut 활용법: 촬영과 편집》 실전 촬영 8컷 & 정밀 편집 가이드 ===== */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-rose-600 text-white p-2 rounded-xl">
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                            ③ 《CapCut 촬영과 편집》 농산물 8컷 촬영 기초 & 7단계 정밀 편집법
                          </h3>
                          <p className="text-xs text-stone-500">
                            카메라 설정·빛·핸들(Handle) 여유 촬영부터 L컷·키프레임·속도곡선·수동 덕킹·색보정까지 전자책 핵심을 담았습니다.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            detailGuide.capcutMasterGuide.editingWorkflow.join('\n\n'),
                            'capcutMaster'
                          )
                        }
                        className="flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        {copiedId === 'capcutMaster' ? (
                          <>
                            <Check className="w-4 h-4 text-amber-300" />
                            <span>캡컷 가이드 복사 완료!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>캡컷 편집 가이드 전체 복사</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* 촬영 기초 3원칙 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {detailGuide.capcutMasterGuide.cameraSetup.map((tip, i) => (
                        <div
                          key={i}
                          className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium"
                        >
                          {tip}
                        </div>
                      ))}
                    </div>

                    {/* 농산물·제품 필수 8컷 리스트 (CapCut 전자책 p.12) */}
                    <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-3">
                      <div className="text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-emerald-700" />
                        <span>농산물·가공품 촬영 필수 8컷 리스트 (CapCut 전자책 p.12 — 4~6초씩 여유 있게 촬영 후 선택)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {detailGuide.capcutMasterGuide.eightShotChecklist.map((shot, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1">
                            <span className="font-extrabold text-emerald-800 block">{shot.cut}</span>
                            <p className="text-stone-700">{shot.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 캡컷 7단계 실전 편집 워크플로우 */}
                    <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-2.5">
                      {detailGuide.capcutMasterGuide.editingWorkflow.map((stepText, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-3.5 rounded-xl border border-rose-100 text-xs sm:text-sm font-medium text-stone-800 leading-relaxed shadow-2xs"
                        >
                          {stepText}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ===== 섹션 ④: 게시 전 6대 Quality Gate 검수 & A/B 테스트 기록 시트 ===== */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-stone-200 pb-3">
                      <div className="bg-indigo-700 text-white p-2 rounded-xl">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                          ④ 게시 전 6대 Quality Gate 검수 (p.76) & A/B 테스트 설계 (p.78)
                        </h3>
                        <p className="text-xs text-stone-500">
                          하나라도 "아니오"라면 그 부분부터 수정한 뒤 게시하고, 한 번에 한 가지 변수만 바꿔 비교 기록합니다.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* 6대 Quality Gate 체크리스트 */}
                      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                        <h4 className="text-sm font-extrabold text-stone-900">
                          ✅ QUALITY GATE: 세게 쓰기 전에 통과해야 할 여섯 가지
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          {[
                            { key: 'q1', label: '01 실제성: 후킹의 사건·수치·발언이 내 농장 실제 자료와 맞는가? (과장·창작 없음)' },
                            { key: 'q2', label: '02 구체성: 어디서 무엇을 어떻게 키우고 선별하는지 구체적으로 보이는가?' },
                            { key: 'q3', label: '03 질문의 선명함: 시청자가 궁금해할 핵심 질문이 하나로 정리되는가?' },
                            { key: 'q4', label: '04 촬영 가능성: 첫 장면과 속살/단면 증거를 실제로 보여줄 수 있는가?' },
                            { key: 'q5', label: '05 약속의 이행: 첫 문장의 질문에 본문이 정직하게 답하는가? (낚시 금지)' },
                            { key: 'q6', label: '06 존중과 동의: 송장 주소·전화번호·타인 얼굴·고객 문자 동의를 확인했는가?' }
                          ].map((item) => (
                            <label
                              key={item.key}
                              className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-stone-200 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={qualityChecks[item.key]}
                                onChange={(e) =>
                                  setQualityChecks({ ...qualityChecks, [item.key]: e.target.checked })
                                }
                                className="mt-1 accent-emerald-700"
                              />
                              <span className="font-medium text-stone-800">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* A/B 테스트 & 이탈 구간 진단 */}
                      <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-200 space-y-3">
                        <h4 className="text-sm font-extrabold text-indigo-950 flex items-center gap-1.5">
                          <BarChart3 className="w-4 h-4 text-indigo-700" />
                          <span>TEST SHEET: 한 번에 하나씩 바꾸는 A/B 비교 설계</span>
                        </h4>
                        <p className="text-xs text-indigo-900 font-semibold bg-white p-3 rounded-xl border border-indigo-100">
                          🎯 이번 비교 질문: {detailGuide.abTestAndAnalytics.question}
                        </p>
                        <div className="space-y-2">
                          {detailGuide.abTestAndAnalytics.candidates.map((cand, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100 text-xs space-y-1">
                              <div className="font-extrabold text-indigo-900">{cand.version}</div>
                              <div className="text-stone-800">• 바꾼 변수: {cand.changedVar}</div>
                              <div className="text-stone-500">• 고정 조건: {cand.keptVar} | 핵심 지표: {cand.metric}</div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-indigo-200/80 space-y-1">
                          <span className="text-xs font-extrabold text-indigo-950 block">
                            📊 업로드 후 이탈 구간별 처방 (BRACKET 30 p.99)
                          </span>
                          {detailGuide.abTestAndAnalytics.diagnostics.map((d, i) => (
                            <p key={i} className="text-xs text-stone-700">
                              • <strong>{d.symptom}</strong> ➔ {d.action}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== 섹션 ⑤: 인스타그램 캡션(본문) & 해시태그 & 커버 문구 ===== */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="bg-teal-700 text-white p-2 rounded-xl">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                            ⑤ 패키징: 커버 문구 5선(4~12자) & 인스타그램 캡션 · 해시태그
                          </h3>
                          <p className="text-xs text-stone-500">
                            모바일 격자에서 1초 만에 읽히는 4~12자 커버 문구와 단일 CTA 캡션입니다.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${detailGuide.captionText}\n\n${(detailGuide.hashtags || []).join(' ')}`,
                            'captionAndTags'
                          )
                        }
                        className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        {copiedId === 'captionAndTags' ? (
                          <>
                            <Check className="w-4 h-4 text-amber-300" />
                            <span>본문+해시태그 복사 완료!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>본문 + 해시태그 한 번에 복사</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* 커버 문구 5개 */}
                    <div className="flex flex-wrap items-center gap-2 bg-stone-100 p-3.5 rounded-2xl border border-stone-200">
                      <span className="text-xs font-extrabold text-stone-700 px-1">
                        🖼️ 커버(썸네일) 2줄 문구 후보:
                      </span>
                      {detailGuide.osmuGuide.coverTitles.map((ct, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-900 text-amber-300 text-xs font-extrabold px-3 py-1.5 rounded-xl"
                        >
                          {ct}
                        </span>
                      ))}
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 whitespace-pre-line text-sm sm:text-base leading-relaxed text-stone-800 font-medium">
                      {detailGuide.captionText}
                    </div>

                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-wrap gap-2">
                      {detailGuide.hashtags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl text-sm font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ===== 섹션 ⑥: 매니챗(ManyChat) 자동 DM & 유튜브 쇼츠 OSMU ===== */}
                  {detailGuide.manychatTemplate && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-200 pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="bg-indigo-700 text-white p-2 rounded-xl">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-extrabold text-stone-900">
                              ⑥ 🤖 매니챗(ManyChat) 자동 DM & 유튜브 쇼츠 동시 배포(OSMU)
                            </h3>
                            <p className="text-xs text-stone-500">
                              밭일하는 동안 댓글이 달리면 1초 만에 발송되는 DM 문구와 유튜브 쇼츠용 제목입니다.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `[매니챗 인식 키워드]\n${detailGuide.manychatTemplate.keywords}\n\n[자동 대댓글 3종]\n${detailGuide.manychatTemplate.autoReplies.join('\n')}\n\n[자동 발송 DM 본문]\n${detailGuide.manychatTemplate.dmMessage}\n\n[DM 버튼 이름]\n${detailGuide.manychatTemplate.buttonText}`,
                              'manychatCopy'
                            )
                          }
                          className="flex items-center gap-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                        >
                          {copiedId === 'manychatCopy' ? (
                            <>
                              <Check className="w-4 h-4 text-amber-300" />
                              <span>매니챗 세팅 문구 복사 완료!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>매니챗 문구 전체 복사</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/60 p-5 rounded-2xl border border-indigo-200">
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-xl border border-indigo-100">
                            <span className="text-xs font-extrabold text-indigo-800 block mb-1">
                              STEP 1. 등록할 댓글 키워드 (쉼표로 구분)
                            </span>
                            <p className="text-base font-extrabold text-stone-900">
                              {detailGuide.manychatTemplate.keywords}
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-indigo-100">
                            <span className="text-xs font-extrabold text-indigo-800 block mb-1.5">
                              STEP 2. 자동 대댓글 문구 (3개 등록)
                            </span>
                            <ul className="space-y-1.5 text-sm text-stone-700 font-medium">
                              {detailGuide.manychatTemplate.autoReplies.map((rep, i) => (
                                <li key={i}>• {rep}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-indigo-100 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-xs font-extrabold text-indigo-800 block mb-1.5">
                              STEP 3. 고객에게 1초 만에 날아갈 자동 DM 본문
                            </span>
                            <p className="text-sm text-stone-800 whitespace-pre-line leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                              {detailGuide.manychatTemplate.dmMessage}
                            </p>
                          </div>
                          <div className="bg-indigo-900 text-amber-300 p-3 rounded-xl text-center font-extrabold text-sm">
                            버튼 문구: {detailGuide.manychatTemplate.buttonText}
                          </div>
                        </div>
                      </div>

                      {/* 유튜브 쇼츠 & 스토리 링크 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="bg-stone-100 p-4 rounded-2xl border border-stone-300 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-red-700 bg-red-100 px-2.5 py-1 rounded-md">
                              ▶ 유튜브 쇼츠(Shorts) 전용 제목 (전화번호 노출)
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  detailGuide.osmuGuide.youtubeShortsTitle,
                                  'shortsTitle'
                                )
                              }
                              className="text-xs font-bold text-stone-700 hover:text-stone-950 underline cursor-pointer"
                            >
                              {copiedId === 'shortsTitle' ? '복사됨 ✓' : '제목 복사'}
                            </button>
                          </div>
                          <p className="text-sm font-extrabold text-stone-900 bg-white p-3.5 rounded-xl border border-stone-200">
                            {detailGuide.osmuGuide.youtubeShortsTitle}
                          </p>
                        </div>

                        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
                          <span className="text-xs font-extrabold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-md inline-block">
                            🔗 인스타 스토리 [링크 스티커] & 하이라이트 고정
                          </span>
                          <p className="text-sm font-extrabold text-emerald-900 bg-white p-2.5 rounded-xl border border-amber-200">
                            스티커 문구: {detailGuide.osmuGuide.storyStickerText}
                          </p>
                          <p className="text-xs text-stone-700 leading-relaxed">
                            {detailGuide.osmuGuide.storyGuide}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== 섹션 ⑦: 추가 대화형 AI 코치 ===== */}
                  <div className="pt-4 border-t-2 border-stone-200 space-y-4">
                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-700" />
                      AI 코치에게 대본·자막 다듬기 요청 (추가 채팅)
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {[
                        '어르신들도 한눈에 읽으실 수 있게 첫 자막을 1줄 왕글씨용으로 더 줄여줘',
                        '얼굴 노출 없이 오직 손과 수확 소리(ASMR)만으로 찍는 무음 자막 버전으로 바꿔줘',
                        '사투리를 살짝 섞어서 정감 가면서도 신뢰감 있는 농부님 말투로 대본을 고쳐줘'
                      ].map((quickPrompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendFollowUp(quickPrompt)}
                          disabled={isLoadingChat}
                          className="text-xs sm:text-sm bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-stone-700 font-semibold px-3.5 py-2 rounded-xl border border-stone-200 transition cursor-pointer"
                        >
                          💬 {quickPrompt}
                        </button>
                      ))}
                    </div>

                    {chatHistory.length > 0 && (
                      <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 max-h-96 overflow-y-auto">
                        {chatHistory.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl p-4 text-sm sm:text-base whitespace-pre-line leading-relaxed ${
                                msg.role === 'user'
                                  ? 'bg-emerald-800 text-white font-semibold'
                                  : 'bg-white border border-stone-200 text-stone-800'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendFollowUp();
                          }
                        }}
                        placeholder="예: 오늘 우체국 택배 마감 시간이 오후 2시라는 내용을 넣어서 15초 대본으로 다시 써줘"
                        className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                      <button
                        onClick={() => handleSendFollowUp()}
                        disabled={isLoadingChat || !chatInput.trim()}
                        className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition cursor-pointer shrink-0"
                      >
                        <Send className="w-4 h-4" />
                        <span>전송</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* 전자책 통합 마스터 프롬프트 원문 모달 */}
      {showSystemPromptModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-1 rounded-full">
                  강사 & 수강생 배포용 (Ver 4.0 전자책 3권 통합본)
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-1">
                  📋 BRACKET HOOK 100 × BRACKET 30 × CapCut 통합 프롬프트
                </h3>
              </div>
              <button
                onClick={() => setShowSystemPromptModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-900 text-stone-100 p-4 rounded-2xl text-xs sm:text-sm whitespace-pre-line leading-relaxed font-mono">
              {universalChatbotSystemPrompt}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={() => copyToClipboard(universalChatbotSystemPrompt, 'systemModal')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-3 rounded-xl transition cursor-pointer"
              >
                {copiedId === 'systemModal' ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>프롬프트 전체 복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>시스템 프롬프트 복사하기</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowSystemPromptModal(false)}
                className="w-full sm:w-auto bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold px-5 py-3 rounded-xl transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}