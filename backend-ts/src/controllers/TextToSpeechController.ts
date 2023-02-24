import { Request, Response } from "express";
import measure from "../utils/measure";
import {
  TextToSpeechServiceFactory,
  TTS_AMAZON,
} from "../factories/TextToSpeechServiceFactory";

class TextToSpeechController {
  public static async repeat(req: Request, res: Response): Promise<void> {
    const { text } = req.body;
    try {
      const service = TextToSpeechServiceFactory.createService(TTS_AMAZON);

      const m = measure.getInstance();
      // await measure.start();
      const audioStream = await service.convertTextToSpeech(text);
      //await measure.end();
      await m.save({
        table: "tts_usage",
        params: { service: "Amazon", total_characters: text.length },
      });

      //await measure.average();

      res.set("Content-Type", "audio/mpeg");
      audioStream.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error generating speech from text");
    }
  }
}

export default TextToSpeechController;
