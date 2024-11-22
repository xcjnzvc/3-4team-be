import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

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

  try {
    const deletedInvestment = await prisma.mockInvestor.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!deletedInvestment) {
      return res.status(404).json({ error: "삭제할 투자 항목을 찾을 수 없음." });
    }

    // 투자 항목 삭제
    await prisma.mockInvestor.delete({
      where: {
        id: parseInt(id),
      },
    });

    const updatedStartup = await prisma.startUp.update({
      where: {
        id: deletedInvestment.startUpId,
      },
      data: {
        simInvest: {
          decrement: deletedInvestment.investAmount,
        },
      },
    });

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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, investAmount, comment, password } = req.body;

  try {
    const updatedData = await prisma.mockInvestor.update({
      where: { id: parseInt(id) },
      data: {
        name,
        investAmount,
        comment,
        password,
      },
    });

    res.json(updatedData);
  } catch (error) {
    console.error("수정 실패:", error);
    res.status(500).json({ error: "수정 실패" });
  }
});

export default router;
