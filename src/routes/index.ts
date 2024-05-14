import { Router } from "express";
import userRouter from "./userRouter";
import journeyRouter from "./journeyRouter";
import bookmarkRouter from "./bookmarkRouter";

const router = Router();

router.use("/", userRouter);
router.use("/", journeyRouter);
router.use("/", bookmarkRouter)

export default router;