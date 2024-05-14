import { Router } from "express";
import auth from "../middleware/auth";
import { createJourney, deleteJourney, getAllJourney, getJourney, getUserJourney } from "../controller/journey";
import uploadMiddleware from "../middleware/upload";

const journeyRouter = Router();

journeyRouter.post("/journey", auth, uploadMiddleware("image"), createJourney);
journeyRouter.get("/journey", getAllJourney);
journeyRouter.get("/journey/:id", getJourney);
journeyRouter.get("/journeys/:userId", getUserJourney)
journeyRouter.delete("/journey/:id", auth, deleteJourney);

export default journeyRouter;
