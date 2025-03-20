import { getSession } from "@auth/express";
import Google from "@auth/express/providers/google";
import { NextFunction, Response, Request } from "express";

export const authSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.session = await getSession(req, { providers: [Google] });
  console.log(res.locals.session);

  next();
};
