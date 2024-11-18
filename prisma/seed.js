import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const mockStartups = [
  {
    name: "소프트비전",
    categoryId: 1,
    actualInvest: 1200000000,
    simInvest: 850000000,
    revenue: 230000000,
    employees: 50,
    description: "소프트웨어 개발과 AI 솔루션을 제공하는 스타트업",
    myCount: 3623,
    compareCount: 5352,
  },
  {
    name: "청정에너지",
    categoryId: 2,
    actualInvest: 430000000,
    simInvest: 300000000,
    revenue: 1200000000,
    employees: 30,
    description: "친환경 에너지 생산과 관련된 기술을 개발하는 스타트업",
    myCount: 3235,
    compareCount: 3253,
  },
  {
    name: "헬로디지털",
    categoryId: 3,
    actualInvest: 200000000,
    simInvest: 150000000,
    revenue: 120000000,
    employees: 40,
    description: "디지털 마케팅과 소셜 미디어 관리 서비스 제공",
    myCount: 3162,
    compareCount: 2351,
  },
  {
    name: "테크브릿지",
    categoryId: 1,
    actualInvest: 380000000,
    simInvest: 200000000,
    revenue: 150000000,
    employees: 60,
    description: "기술 기반의 브릿지 솔루션을 제공하는 스타트업",
    myCount: 1623,
    compareCount: 1026,
  },
  {
    name: "누리플래닛",
    categoryId: 4,
    actualInvest: 270000000,
    simInvest: 250000000,
    revenue: 90000000,
    employees: 25,
    description: "우주 탐사를 위한 기술을 연구하는 스타트업",
    myCount: 3216,
    compareCount: 2236,
  },
  {
    name: "오르비트클라우드",
    categoryId: 5,
    actualInvest: 430000000,
    simInvest: 270000000,
    revenue: 180000000,
    employees: 70,
    description: "클라우드 기반의 데이터 관리 서비스 제공",
    myCount: 3126,
    compareCount: 1242,
  },
  {
    name: "심플모빌리티",
    categoryId: 2,
    actualInvest: 1500000000,
    simInvest: 1200000000,
    revenue: 70000000,
    employees: 20,
    description: "스마트 이동수단을 제공하는 혁신적인 스타트업",
    myCount: 3214,
    compareCount: 4145,
  },
  {
    name: "빅데이터랩",
    categoryId: 1,
    actualInvest: 350000000,
    simInvest: 250000000,
    revenue: 110000000,
    employees: 55,
    description: "빅데이터 분석 및 AI 기반 예측 솔루션을 제공",
    myCount: 3451,
    compareCount: 7354,
  },
  {
    name: "위드헬스",
    categoryId: 3,
    actualInvest: 220000000,
    simInvest: 160000000,
    revenue: 1200000000,
    employees: 35,
    description: "헬스케어 데이터 관리 및 분석 플랫폼 개발",
    myCount: 3248,
    compareCount: 6457,
  },
  {
    name: "에코파워",
    categoryId: 2,
    actualInvest: 480000000,
    simInvest: 320000000,
    revenue: 430000000,
    employees: 80,
    description: "태양광 및 풍력 발전 솔루션을 제공하는 스타트업",
    myCount: 3685,
    compareCount: 3163,
  },
  {
    name: "스마트팜넷",
    categoryId: 2,
    actualInvest: 250000000,
    simInvest: 200000000,
    revenue: 130000000,
    employees: 30,
    description: "스마트 농업 기술을 활용한 농업 혁신 스타트업",
    myCount: 3982,
    compareCount: 4126,
  },
  {
    name: "플렉시블로직",
    categoryId: 1,
    actualInvest: 210000000,
    simInvest: 120000000,
    revenue: 850000000,
    employees: 18,
    description: "융합 기술 기반의 IT 솔루션을 제공하는 스타트업",
    myCount: 3213,
    compareCount: 2152,
  },
  {
    name: "디지털헬스케어",
    categoryId: 3,
    actualInvest: 540000000,
    simInvest: 430000000,
    revenue: 85000000,
    employees: 65,
    description: "디지털 건강 관리 플랫폼을 제공하는 스타트업",
    myCount: 3231,
    compareCount: 918,
  },
  {
    name: "테크파워",
    categoryId: 1,
    actualInvest: 470000000,
    simInvest: 310000000,
    revenue: 200000000,
    employees: 50,
    description: "IT 기반의 혁신적인 기술 서비스를 제공하는 스타트업",
    myCount: 3234,
    compareCount: 1012,
  },
  {
    name: "하이웨이브",
    categoryId: 2,
    actualInvest: 1500000000,
    simInvest: 1200000000,
    revenue: 80000000,
    employees: 22,
    description: "스마트 차량 및 교통 관리 솔루션을 제공하는 스타트업",
    myCount: 3187,
    compareCount: 3234,
  },
  {
    name: "빅아이디어",
    categoryId: 5,
    actualInvest: 300000000,
    simInvest: 250000000,
    revenue: 150000000,
    employees: 40,
    description: "AI 기반의 창의적 문제 해결 솔루션을 제공",
    myCount: 3123,
    compareCount: 7658,
  },
  {
    name: "플라즈마파워",
    categoryId: 2,
    actualInvest: 195000000,
    simInvest: 130000000,
    revenue: 120000000,
    employees: 90,
    description: "전력 에너지 효율성을 개선하는 플라즈마 기술 스타트업",
    myCount: 3124,
    compareCount: 2234,
  },
  {
    name: "크리에이티브랩",
    categoryId: 3,
    actualInvest: 450000000,
    simInvest: 350000000,
    revenue: 200000000,
    employees: 50,
    description: "창의적인 미디어 콘텐츠 제작 및 마케팅 스타트업",
    myCount: 3234,
    compareCount: 1112,
  },
  {
    name: "해양디자인",
    categoryId: 4,
    actualInvest: 480000000,
    simInvest: 360000000,
    revenue: 270000000,
    employees: 60,
    description: "해양 산업 관련 디자인 및 기술 혁신 스타트업",
    myCount: 1734,
    compareCount: 2231,
  },
];

const mockCategories = [
  { category: "소프트웨어" },
  { category: "친환경 에너지" },
  { category: "디지털 마케팅" },
  { category: "우주 탐사" },
  { category: "클라우드 & AI" },
];

async function main() {
  try {
    // 기존 데이터 삭제
    console.log("기존 데이터 삭제 시작...");
    await prisma.startUp.deleteMany();
    console.log("스타트업 데이터 삭제 완료.");
    await prisma.category.deleteMany();
    console.log("카테고리 데이터 삭제 완료.");

    // 새로운 스타트업 데이터 삽입
    console.log("새로운 스타트업 데이터 삽입 중...");
    await prisma.startUp.createMany({
      data: mockStartups,
    });
    console.log("스타트업 데이터 삽입 완료.");

    // 새로운 카테고리 데이터 삽입
    console.log("새로운 카테고리 데이터 삽입 중...");
    await prisma.category.createMany({
      data: mockCategories,
    });
    console.log("카테고리 데이터 삽입 완료.");
    
  } catch (error) {
    console.error("초기화 및 데이터 삽입 중 오류 발생:", error);
  } finally {
    // Prisma 연결 해제
    await prisma.$disconnect();
  }
}

// main 함수 실행
main();
