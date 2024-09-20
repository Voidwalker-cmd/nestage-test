import { Router } from "express";
import { addNewRef, addStaker, getRef } from "../controllers/stakerController";
import validateAuthToken from "../middlewares/validateAuthToken";

const router = Router();

router.post("/add-staker", validateAuthToken, addStaker);
router.post("/add-new-ref", validateAuthToken, addNewRef);
router.get("/get-ref", validateAuthToken, getRef);

export default router;
