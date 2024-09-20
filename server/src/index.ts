import express from "express";
import cookieParser from "cookie-parser";
import prisma from "./utils/prismaClient";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import stakersRoutes from "./routes/stakersRoutes";
import adminAddressRoutes from "./routes/adminAddressRoutes";
import referralRoutes from "./routes/referralRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: ALLOWED_ORIGIN.split(","),
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGIN.split(",").indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: !!1,
  })
);

app.use("/api/v1", authRoutes);
app.use("/api/v1", protectedRoutes);
app.use("/api/v1", stakersRoutes);
app.use("/api/v1", adminAddressRoutes);
app.use("/api/v1", referralRoutes);

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
