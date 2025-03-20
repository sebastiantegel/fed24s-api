import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDto } from "../models/userDto.mjs";
import User from "../models/userSchema.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // loginCookie innehåller krypterad användarinformation
  const loginCookie = req.cookies["login"];

  // om cookien in finns
  if (!loginCookie) {
    // Skicka tillbaka Unauthorized
    res.status(401).end();
  } else {
    // Om cookien finns, avkoda den
    // result = { name: "....", email: "...."}
    const result = jwt.decode(loginCookie);

    // Om result inte finns
    if (!result) {
      // Skicka tillbaka Unauthorized
      res.status(401).end();
    } else {
      // Om result finns, hitta användaren i databasen
      const theUser: UserDto = result as UserDto;
      const userFromDb = await User.findOne({ email: theUser.email });

      // Om användaren finns
      if (userFromDb) {
        // Gå till nästa middleware
        next();
      } else {
        // Annars skicka tillbaka Forbidden
        res.status(403).send("Faking a user are we???");
      }
    }
  }
};
