import { Router } from "express";
import validateAuthToken from "../middlewares/validateAuthToken";
import authenticateToken from "../middlewares/authenticateToken";
import {
  addAdminAddress,
  getAdminAddress,
  updateAdminAddress,
} from "../controllers/adminAddressController";

const router = Router();

router.post("/admin-address", addAdminAddress);
router.get("/admin-address", validateAuthToken, getAdminAddress);
router.put("/update-admin-address", authenticateToken, updateAdminAddress);

export default router;
