import { Router } from "express";
import { register, login, checkAuth } from "../controllers/authController";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/authValidators";

const router = Router();

router.post("/swipe", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/check-auth", checkAuth);

export default router;
