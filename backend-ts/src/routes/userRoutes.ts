import { Router, Request, Response } from "express";

const userRoutes = Router();

userRoutes.get("/", (req: Request, res: Response) => {
  res.send("Hey you AI boy");
});

export default userRoutes;
