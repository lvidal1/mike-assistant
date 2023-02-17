import { Request, Response } from "express";
import {
  TextToSpeechServiceFactory,
  TTS_AMAZON,
} from "../factories/TextToSpeechServiceFactory";

class TextToSpeechController {
  public static async repeat(req: Request, res: Response): Promise<void> {
    const { text } = req.body;
    try {
      const service = TextToSpeechServiceFactory.createService(TTS_AMAZON);
      const audioStream = await service.convertTextToSpeech(text);
      res.set("Content-Type", "audio/mpeg");
      audioStream.pipe(res);
    } catch (error) {
      res.status(500).send("Error generating speech from text");
    }
  }
}

export default TextToSpeechController;
