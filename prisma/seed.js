import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const mockStartups = [
  {
    name: "소프트비전",
    categoryId: 1,
    actualInvest: 1000000,
    simInvest: 500000,
    revenue: 300000,
    employees: 50,
    description: "소프트웨어 개발과 AI 솔루션을 제공하는 스타트업",
    count: 5,
  },
  {
    name: "청정에너지",
    categoryId: 2,
    actualInvest: 5000000,
    simInvest: 3000000,
    revenue: 1000000,
    employees: 30,
    description: "친환경 에너지 생산과 관련된 기술을 개발하는 스타트업",
    count: 3,
  },
  {
    name: "헬로디지털",
    categoryId: 3,
    actualInvest: 2000000,
    simInvest: 1500000,
    revenue: 1200000,
    employees: 40,
    description: "디지털 마케팅과 소셜 미디어 관리 서비스 제공",
    count: 8,
  },
  {
    name: "테크브릿지",
    categoryId: 1,
    actualInvest: 3000000,
    simInvest: 2000000,
    revenue: 1500000,
    employees: 60,
    description: "기술 기반의 브릿지 솔루션을 제공하는 스타트업",
    count: 10,
  },
  {
    name: "누리플래닛",
    categoryId: 4,
    actualInvest: 4000000,
    simInvest: 2500000,
    revenue: 900000,
    employees: 25,
    description: "우주 탐사를 위한 기술을 연구하는 스타트업",
    count: 2,
  },
  {
    name: "오르비트클라우드",
    categoryId: 5,
    actualInvest: 5000000,
    simInvest: 4000000,
    revenue: 1800000,
    employees: 70,
    description: "클라우드 기반의 데이터 관리 서비스 제공",
    count: 12,
  },
  {
    name: "심플모빌리티",
    categoryId: 2,
    actualInvest: 1500000,
    simInvest: 1200000,
    revenue: 700000,
    employees: 20,
    description: "스마트 이동수단을 제공하는 혁신적인 스타트업",
    count: 4,
  },
  {
    name: "빅데이터랩",
    categoryId: 1,
    actualInvest: 3500000,
    simInvest: 2500000,
    revenue: 1100000,
    employees: 55,
    description: "빅데이터 분석 및 AI 기반 예측 솔루션을 제공",
    count: 7,
  },
  {
    name: "위드헬스",
    categoryId: 3,
    actualInvest: 2200000,
    simInvest: 1600000,
    revenue: 1000000,
    employees: 35,
    description: "헬스케어 데이터 관리 및 분석 플랫폼 개발",
    count: 6,
  },
  {
    name: "에코파워",
    categoryId: 2,
    actualInvest: 7000000,
    simInvest: 6000000,
    revenue: 5000000,
    employees: 80,
    description: "태양광 및 풍력 발전 솔루션을 제공하는 스타트업",
    count: 3,
  },
  {
    name: "스마트팜넷",
    categoryId: 2,
    actualInvest: 2500000,
    simInvest: 2000000,
    revenue: 1300000,
    employees: 30,
    description: "스마트 농업 기술을 활용한 농업 혁신 스타트업",
    count: 4,
  },
  {
    name: "플렉시블로직",
    categoryId: 1,
    actualInvest: 1200000,
    simInvest: 1000000,
    revenue: 500000,
    employees: 18,
    description: "융합 기술 기반의 IT 솔루션을 제공하는 스타트업",
    count: 2,
  },
  {
    name: "디지털헬스케어",
    categoryId: 3,
    actualInvest: 6000000,
    simInvest: 5000000,
    revenue: 3000000,
    employees: 65,
    description: "디지털 건강 관리 플랫폼을 제공하는 스타트업",
    count: 9,
  },
  {
    name: "테크파워",
    categoryId: 1,
    actualInvest: 4000000,
    simInvest: 3000000,
    revenue: 2000000,
    employees: 50,
    description: "IT 기반의 혁신적인 기술 서비스를 제공하는 스타트업",
    count: 10,
  },
  {
    name: "하이웨이브",
    categoryId: 2,
    actualInvest: 1500000,
    simInvest: 1000000,
    revenue: 800000,
    employees: 22,
    description: "스마트 차량 및 교통 관리 솔루션을 제공하는 스타트업",
    count: 3,
  },
  {
    name: "빅아이디어",
    categoryId: 5,
    actualInvest: 3000000,
    simInvest: 2500000,
    revenue: 1500000,
    employees: 40,
    description: "AI 기반의 창의적 문제 해결 솔루션을 제공",
    count: 7,
  },
  {
    name: "플라즈마파워",
    categoryId: 2,
    actualInvest: 10000000,
    simInvest: 8000000,
    revenue: 6000000,
    employees: 90,
    description: "전력 에너지 효율성을 개선하는 플라즈마 기술 스타트업",
    count: 2,
  },
  {
    name: "크리에이티브랩",
    categoryId: 3,
    actualInvest: 4500000,
    simInvest: 3500000,
    revenue: 2000000,
    employees: 50,
    description: "창의적인 미디어 콘텐츠 제작 및 마케팅 스타트업",
    count: 11,
  },
  {
    name: "해양디자인",
    categoryId: 4,
    actualInvest: 7000000,
    simInvest: 6000000,
    revenue: 4000000,
    employees: 60,
    description: "해양 산업 관련 디자인 및 기술 혁신 스타트업",
    count: 2,
  },
];

async function main() {
  try {
    const categories = await prisma.category.createMany({
      data: [
        { category: "소프트웨어" },
        { category: "친환경 에너지" },
        { category: "디지털 마케팅" },
        { category: "우주 탐사" },
        { category: "클라우드 & AI" },
      ],
    });

    await prisma.startUp.deleteMany();
    await prisma.startUp.createMany({
      data: mockStartups,
    });

    console.log("Mock 데이터 삽입 완료");
  } catch (error) {
    console.error("삽입 실패:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
