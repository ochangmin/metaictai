
import { HistoryItem, ServiceModel, CertifiedTech, HomepageService, Employee, ResourceItem } from '../types';

export const initialHomepageServices: HomepageService[] = [
  {
    icon: "consulting",
    title: "AI 컨설팅",
    description: "비즈니스에 최적화된 AI 도입 전략과 로드맵을 제공하여 성공적인 디지털 전환을 지원합니다."
  },
  {
    icon: "data-analysis",
    title: "데이터 분석 및 시각화",
    description: "방대한 데이터 속에서 유의미한 인사이트를 발굴하고, 직관적인 시각화로 의사결정을 돕습니다."
  },
  {
    icon: "machine-learning",
    title: "머신러닝 모델 개발",
    description: "최신 머신러닝 알고리즘을 활용하여 예측, 분류, 추천 등 맞춤형 AI 모델을 개발합니다."
  },
  {
    icon: "chatbot",
    title: "AI 챗봇 및 비서",
    description: "자연어 처리(NLP) 기술을 기반으로 고객 응대 및 업무 자동화를 위한 지능형 챗봇을 구축합니다."
  }
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp_ceo',
    name: 'YU JEONG - LEE',
    role: 'CEO / FOUNDER',
    idLabel: 'ID: ICT_LEADER_001',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: '안녕하십니까, (주)메타아이씨티 대표이사 이유정입니다. 우리는 인공지능이 가진 무한한 잠재력을 현실의 비즈니스 가치로 변환하는 가장 신뢰할 수 있는 파트너가 될 것입니다. 단순한 기술 구현을 넘어, 인류의 삶을 풍요롭게 만드는 지능형 생태계를 구축하는 것이 우리의 사명입니다.'
  },
  {
    id: 'emp_cto',
    name: 'CHANG MIN - OH',
    role: 'CTO / TECHNICAL DIRECTOR',
    idLabel: 'ID: ICT_TECH_001',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    description: 'CTO 오창민입니다. 메타아이씨티의 기술팀은 복잡한 데이터를 비즈니스 통찰력으로 바꾸는 최적의 아키텍처를 설계합니다. 우리는 데이터의 근본적인 질서를 탐구하며, 가장 정교한 알고리즘으로 비즈니스의 난제들을 해결해 나가고 있습니다.'
  },
  {
    id: 'emp_tl',
    name: 'YOUNG HUN - GO',
    role: 'TL / PROJECT LEADER',
    idLabel: 'ID: ICT_LEAD_001',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    description: '팀 리더 고영훈입니다. 기술이 현장에 녹아들기 위해서는 정교한 엔지니어링과 집요한 최적화가 필요합니다. 우리는 고객사의 성공적인 디지털 전환을 위해 끝까지 책임지는 기술 서비스를 제공하며, 실질적인 가치를 창출하는 데 집중합니다.'
  }
];

export const initialResourceData: ResourceItem[] = [
  {
    id: 'res_1',
    title: 'Meta-Alpha LLM Technical Whitepaper',
    description: '메타아이씨티의 독자적인 거대언어모델 META-Alpha의 아키텍처와 성능 벤치마크 결과를 담은 기술 백서입니다.',
    category: 'Whitepaper',
    date: '2024-12-20',
    fileUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'res_2',
    title: 'MTD Platform User Manual v2.0',
    description: 'MTD 헬스케어 플랫폼의 주요 기능 및 기기 연동 방법에 대한 상세 사용자 매뉴얼입니다.',
    category: 'Manual',
    date: '2025-01-15',
    fileUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'res_3',
    title: 'AI Smart Farm Control Specification',
    description: '지능형 스마트팜 관제 시스템의 하드웨어 요구사항 및 소프트웨어 인터페이스 사양서입니다.',
    category: 'Technical',
    date: '2025-02-10',
    fileUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595113316349-9fa404641847?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialHistoryData: HistoryItem[] = [
    {
        id: 'hist_2026',
        year: '2026년',
        title: '산학협력 고도화 및 원천기술 IP 경쟁력 강화',
        details: [
            '한국기술대학교 라이즈(RISE) 사업 최종 선정',
            '핵심 AI 알고리즘 관련 특허 및 상표권 다수 등록 완료',
            '한국기술대학교 기술이전 2건 실행 및 사업화 착수',
            '글로벌 지식재산권(IP) 포트폴리오 확장'
        ]
    },
    {
        id: 'hist_2025',
        year: '2025년',
        title: '차세대 AI 생태계 구축 및 글로벌 리더십 확보',
        details: [
            '자체 LLM ‘META-Alpha’ 공개 및 API 서비스 출시',
            '유럽 시장 진출 및 현지 법인 설립',
            '전국 스마트시티 통합 AI 플랫폼 구축 사업 주관',
            '의료 AI 분야 진출: AI 기반 영상 진단 보조 시스템 개발',
            '대한민국 AI 기술대상 수상'
        ]
    },
    {
        id: 'hist_2024_h2',
        year: '2024년 하반기',
        title: '글로벌 AI 시장 진출 및 기술 고도화',
        details: [
            '북미 시장 타겟 AI SaaS 솔루션 출시',
            '국제 AI 컨퍼런스(NeurIPS) 기술 논문 발표',
            '자체 거대언어모델(LLM) ‘META-Alpha’ 개발 착수'
        ]
    },
    {
        id: 'hist_2024_h1',
        year: '2024년 상반기',
        title: '공공 AI 혁신 선도 및 사업 다각화',
        details: [
            '서울특별시와 빅데이터 기반 지능형 교통 시스템(ITS) 구축',
            '부산광역시 스마트 해양물류 플랫폼 AI 관제 시스템 개발',
            '차세대 생성형 AI 기반 공공 민원 챗봇 전국 5대 광역시 확대 적용',
            '국내 주요 금융사와 AI 기반 신용평가 시스템 고도화 프로젝트 수주',
            '제조업 분야 AI 비전 검사 솔루션 상용화 성공'
        ]
    },
];

export const initialAiModels: ServiceModel[] = [
    {
        id: 'model_nlp',
        icon: "nlp",
        title: "Natural Language AI",
        description: "문맥 이해, 감성 분석, 언어 생성을 위한 최첨단 자연어 처리 모델입니다.",
        path: "/dev/nlp-engine"
    },
    {
        id: 'model_vision',
        icon: "vision",
        title: "Computer Vision",
        description: "이미지 및 비디오 내 객체 탐지, 분류, 분석을 수행하는 시각 지능 솔루션입니다.",
        path: "/dev/vision-core"
    },
    {
        id: 'model_predictive',
        icon: "predictive",
        title: "Predictive Analytics",
        description: "과거 데이터 패턴을 학습하여 미래 수요, 트렌드, 리스크를 예측합니다.",
        path: "/dev/predictive-mod"
    },
    {
        id: 'model_gen_ai',
        icon: "generative-ai",
        title: "Generative AI",
        description: "텍스트, 이미지, 코드 등 새로운 콘텐츠를 창의적으로 생성하는 모델입니다.",
        path: "/dev/gen-ai-suite"
    },
    {
        id: 'model_rl',
        icon: "reinforcement",
        title: "Reinforcement Learning",
        description: "자율 시스템이 최적의 의사결정을 내리도록 훈련하는 강화학습 에이전트입니다.",
        path: "/dev/rl-agent"
    },
    {
        id: 'model_speech',
        icon: "speech",
        title: "Speech Processing",
        description: "음성을 텍스트로 변환하고, 텍스트를 자연스러운 음성으로 합성합니다.",
        path: "/dev/speech-api"
    },
    {
        id: 'model_anomaly',
        icon: "anomaly",
        title: "Anomaly Detection",
        description: "실시간 데이터 스트림에서 이상 패턴 및 사기 행위를 자동으로 탐지합니다.",
        path: "/dev/anomaly-guard"
    },
    {
        id: 'model_recommender',
        icon: "recommender",
        title: "Recommender Systems",
        description: "사용자 행동 데이터를 분석하여 개인화된 상품, 콘텐츠, 서비스를 추천합니다.",
        path: "/dev/recommender-kit"
    },
];

export const initialCertifiedTechs: CertifiedTech[] = [
  {
    id: 'tech_mtd_platform',
    title: 'MTD PLATFORM: Health Ecosystem',
    description: 'iPhone, Apple Watch, Mac에서 실시간으로 건강 데이터를 공유하는 통합 에코시스템. MetaICT의 독자적인 플랫폼 동기화 기술로 심박수, 칼로리, 활동량을 정밀 분석합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    tags: ['Health-Tech', 'Unified Ecosystem', 'Multi-Device Sync', 'AI Analytics'],
    features: [
        '실시간 멀티 디바이스 데이터 동기화 (iOS/macOS/watchOS)',
        'AI 기반 칼로리 소모 및 활동량 예측 분석',
        '심박수 변이도(HRV) 분석을 통한 건강 위험 조기 경보',
        '사용자 맞춤형 주간 건강 리포트 자동 생성'
    ]
  },
  {
    id: 'tech_metamusic',
    title: 'METAMUSIC: AI Synthesis',
    description: '초거대 AI 기술로 완성하는 프로페셔널 작곡 플랫폼. 단 한 줄의 프롬프트로 완벽한 곡의 구성을 설계하고 생성하는 차세대 음악 합성 엔진입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&w=800&q=80',
    tags: ['Music AI', 'Generative Audio', 'Hyper-scale AI', 'Next-Gen Synthesis'],
    features: [
        '텍스트 기반 감성 음악 생성 엔진',
        '프로페셔널 오디오 워크스테이션(DAW) 연동 API',
        '장르별 고정밀 멀티트랙 스템 추출 기술',
        '실시간 오디오 합성 및 레이턴시 제로 엔진'
    ]
  },
  {
    id: 'tech_visionary_fashion',
    title: 'METACORSET: Visionary Fashion',
    description: '당신의 사진 한 장으로 시작되는 차세대 가상 피팅. 의상의 디테일과 당신의 스타일을 100% 보존합니다. Gemini AI Studio 기술을 활용한 고정밀 패션 생성 엔진.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    tags: ['Virtual Fitting', 'Generative AI', 'Gemini Studio'],
    features: [
        '체형 분석을 통한 개인화 가상 모델링',
        '텍스처 및 질감 보존 알고리즘 기반 피팅 생성',
        '고해상도 패션 이미지 인페인팅 기술',
        '실시간 3D 의류 드레이핑 시뮬레이션'
    ]
  },
  {
    id: 'tech_sim',
    title: '3차원 작물 생육 시뮬레이터',
    description: '다축 평면형 광원 기술을 적용, 작물의 생육 환경을 3D로 정밀하게 시뮬레이션하고 최적의 성장 조건을 예측합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1530836361253-9d55a71f4df0?auto=format&fit=crop&w=800&q=80',
    tags: ['3D Simulation', 'Agri-Tech', 'Optimization'],
    features: [
        '디지털 트윈 기반 가상 농장 환경 구축',
        '광원 및 습도 변화에 따른 실시간 생육 변화 예측',
        '수확 시기 최적화 머신러닝 모델 적용'
    ]
  },
  {
    id: 'tech_farm',
    title: 'AI 스마트팜 관제 대시보드',
    description: '실시간 센서 데이터와 AI 분석을 통해 농장 환경을 원격 모니터링하고, 병해충 및 생육 이상을 조기에 감지하는 지능형 관제 시스템입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1595113316349-9fa404641847?auto=format&fit=crop&w=800&q=80',
    tags: ['Dashboard', 'Smart Farm', 'AI Analysis'],
    features: [
        '센서 데이터 시각화 및 위험 알림 시스템',
        '객체 탐지(Object Detection) 기반 병해충 분석',
        '최적 관수 및 방제 시나리오 자동 제안'
    ]
  },
  {
    id: 'tech_logistics',
    title: '통합 물류 배송 관리 시스템',
    description: 'AI 기반 수요 예측 및 최적 경로 분석을 통해 배송 기사의 운행을 효율화하고 물류 센터의 운영을 자동화하는 솔루션입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-0690475b47e5?auto=format&fit=crop&w=800&q=80',
    tags: ['Logistics', 'AI Prediction', 'Automation'],
    features: [
        '다중 경유지 최적 경로 탐색 알고리즘',
        '물동량 데이터 기반 거점 운영 효율 분석',
        '실시간 차량 관제 및 배차 자동화 시스템'
    ]
  },
];
