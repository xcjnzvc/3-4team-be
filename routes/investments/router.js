import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//여기가 작업하는 공간



router.get("/", async (req, res) => {
  try {
    const investments = await prisma.startUp.findMany({
      include: {
        category: true,
      },
    });
    res.json(investments); // 카테고리 정보도 함께 반환
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const Investor = await prisma.mockInvestor.findMany({
      where: {
        startUpId: parseInt(id),
      },
    });

    if (!Investor) {
      return res
        .status(404)
        .json({ error: "해당 startUpId에 대한 투자자가 없습니다." });
    }

    res.json(Investor);
  } catch (error) {
    console.error("Error fetching Investor:", error);
    res.status(500).json({ error: "Failed to fetch Investor" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body; // 클라이언트로부터 전달받은 비밀번호

  try {
    // 삭제하려는 투자 항목 조회
    const investment = await prisma.mockInvestor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // 투자 항목이 존재하지 않으면 404 에러 반환
    if (!investment) {
      return res.status(404).json({ error: "삭제할 투자 항목을 찾을 수 없음." });
    }

    // 비밀번호 검증
    if (investment.password !== password) {
      return res.status(403).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    // 투자 항목 삭제
    await prisma.mockInvestor.delete({
      where: {
        id: parseInt(id),
      },
    });

    // 관련된 StartUp 모델의 투자 금액 감소
    const updatedStartup = await prisma.startUp.update({
      where: {
        id: investment.startUpId,
      },
      data: {
        simInvest: {
          decrement: investment.investAmount, // 투자 금액 만큼 감소
        },
      },
    });

    // 성공 응답 반환
    res.status(200).json({
      message: `MockInvestor의 id ${id} 성공적으로 삭제됨.`,
      updatedStartup,
    });
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
    res.status(500).json({ error: "삭제 실패함" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { startUpId, name, investAmount, comment, password } = req.body;

    const newInvestment = await prisma.mockInvestor.create({
      data: {
        startUpId,
        name,
        investAmount,
        comment,
        password,
      },
    });

    const totalinvest = await prisma.mockInvestor.aggregate({
      _sum: { investAmount: true },
      where: { startUpId },
    });

    await prisma.startUp.update({
      where: { id: startUpId },
      data: { simInvest: totalinvest._sum.investAmount || 0 },
    });

    res.status(201).json(newInvestment);
  } catch (error) {
    console.error("투자 오류 발생: ", error);
    res.status(500).json({ error: "투자 실패함" });
  }
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, investAmount, comment, password } = req.body;

//   try {
//     const updatedData = await prisma.mockInvestor.update({
//       where: { id: parseInt(id) },
//       data: {
//         name,
//         investAmount,
//         comment,
//         password,
//       },
//     });

//     res.json(updatedData);
//   } catch (error) {
//     console.error("수정 실패:", error);
//     res.status(500).json({ error: "수정 실패" });
//   }
// });

router.post("/verify-password", async (req, res) => {
  const { id, password } = req.body; // ID와 비밀번호를 받음

  try {
    const investment = await prisma.mockInvestor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // 투자 항목이 없을 경우 404 반환
    if (!investment) {
      return res.status(404).json({ error: "투자 항목을 찾을 수 없습니다." });
    }

    // 비밀번호 검증
    if (investment.password !== password) {
      return res.status(403).json({ error: "비밀번호가 틀렸습니다." });
    }

    // 비밀번호가 맞을 경우 성공 응답 반환
    res.status(200).json({ message: "비밀번호가 올바릅니다." });
  } catch (error) {
    console.error("비밀번호 검증 실패:", error);
    res.status(500).json({ error: "비밀번호 검증 중 문제가 발생했습니다." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, investAmount, comment } = req.body; // 비밀번호는 받지 않음

  try {
    // 수정된 투자 항목 데이터 업데이트
    const updatedInvestment = await prisma.mockInvestor.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        investAmount,
        comment,
      },
    });

    // StartUp 모델의 simInvest 업데이트
    const totalInvestAmount = await prisma.mockInvestor.aggregate({
      _sum: { investAmount: true },
      where: { startUpId: updatedInvestment.startUpId },
    });

    const updatedStartUp = await prisma.startUp.update({
      where: { id: updatedInvestment.startUpId },
      data: {
        simInvest: totalInvestAmount._sum.investAmount || 0,
      },
    });

    res.json({
      updatedInvestment,
      updatedStartUp,
    });
  } catch (error) {
    console.error("수정 실패:", error);
    res.status(500).json({ error: "수정 실패" });
  }
});
export default router;
