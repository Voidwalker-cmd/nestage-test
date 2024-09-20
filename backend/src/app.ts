import express from "express";
import bodyParser from "body-parser";
import { authRoutes } from "./routes/authRoutes";

export const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
