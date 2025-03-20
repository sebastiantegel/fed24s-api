import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import express from "express";

const router = express.Router();

const authMiddleware = ExpressAuth({
  providers: [Google],
});

router.use("/auth/*", authMiddleware);

export { router };
