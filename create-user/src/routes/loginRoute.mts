import express from "express";
import { login } from "../controllers/loginController.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).send("Missing login information");
    } else {
      const loggedInUser = await login(email, password);

      if (!loggedInUser) {
        res.status(400).json({ message: "Incorrect email/password" });
      } else {
        res.status(200).json(loggedInUser);
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
