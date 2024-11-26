import express from "express";
import { PrismaClient } from "@prisma/client";

//try {} catch(err) {console.error(err);}

// npx prisma migrate dev
// npx prisma studio
const router = express.Router();
const prisma = new PrismaClient();

//전체 조회
router.get("/", async (req, res) => {
  try {
    const { limit = 5, offset = 0, keyword = "" } = req.query;
    // console.log(limit, offset);
    // console.log(keyword);
    const getCompanies = await prisma.startUp.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      skip: Number(offset) * Number(limit),
      take: Number(limit),
      include: {
        category: true,
      },
    });
    const allData = await prisma.startUp.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    });
    console.log(allData);

    console.log(getCompanies);
    res.send({ data: getCompanies, totalCount: allData.length });
  } catch (err) {
    console.error(err);
  }
});


// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const company = await prisma.startUp.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         category: true,
//       },
//     });
//     if (!company) {
//       return res.status(404).json({ error: "Company not found" });
//     }
//     res.json(company);
//   } catch (error) {
//     console.error("Error fetching company:", error);
//     res.status(500).json({ error: "Failed to fetch company" });
//   }
// });

export default router;


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.startUp.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});



