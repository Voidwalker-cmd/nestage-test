import { Router } from "express";
import validateAuthToken from "../middlewares/validateAuthToken";
import authenticateToken from "../middlewares/authenticateToken";
import {
  addAdminAddress,
  getAdminAddress,
  updateAdminAddress,
} from "../controllers/adminAddressController";
import {
  addReferral,
  deleteReferral,
  getReferral,
} from "../controllers/referralController";

const router = Router();

router.post("/referral", validateAuthToken, addReferral);
router.get("/g-referral", validateAuthToken, getReferral);
router.delete("/referral", validateAuthToken, deleteReferral);
// for admin
router.get("/all-referral", authenticateToken, getAdminAddress);

export default router;
