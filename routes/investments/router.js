import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params; // URL에서 id 값을 가져옵니다.

  try {
    // Prisma를 사용하여 id에 해당하는 항목 삭제
    await prisma.startUp.delete({
      where: {
        id: parseInt(id), // id를 정수로 변환하여 사용
      },
    });
    res.status(200).json({ message: `StartUp의 id ${id} 성공적으로 삭제됨.` });
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
    res.status(500).json({ error: "삭제 실패함" });
  }
});

router.post('/', async(req, res) => {
    try {
      const { startUpId, name, investAmount, comment, password } = req.body;

      const newInvestment = await prisma.mockInvestor.create({
        data : {
          startUpId,
          name,
          investAmount,
          comment,
          password,
        }
      });

      res.status(201).json(newInvestment);

    } catch(error) {
      console.error('투자 오류 발생: ', error);
      res.status(500).json({ error: "투자 실패함" });
    }
});

router.put('/:id', async(req,res) => {
  const {id} = req.params;
  const {  name, investAmount, comment, password } = req.body;


  try {
    const updatedData = await prisma.mockInvestor.update({
      where: {id: parseInt(id)},
      data: {
        name,
        investAmount,
        comment,
        password,
      },
    });

    res.json(updatedData);

  } catch(error) {
    console.error('수정 실패:', error);
    res.status(500).json({error:'수정 실패'});
  }
});

export default router;