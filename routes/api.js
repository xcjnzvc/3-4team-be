import express from "express";
import selections from "./selections/router.js";
import companies from "./companies/router.js";
import investments from "./investments/router.js";

const router = express.Router();

router.use("/companies", companies);
router.use("/selections", selections);
router.use("/investments", investments);

export default router;
