import { Router, Request, Response } from "express";
import TextToSpeechController from "../controllers/TextToSpeechController";

const ttsRouter = Router();

ttsRouter.post("/repeat", TextToSpeechController.repeat);

export default ttsRouter;
