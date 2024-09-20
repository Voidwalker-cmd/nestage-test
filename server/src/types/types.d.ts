import { Admin } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    admin?: Admin;
  }
}
