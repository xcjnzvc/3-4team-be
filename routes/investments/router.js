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

export default router;
