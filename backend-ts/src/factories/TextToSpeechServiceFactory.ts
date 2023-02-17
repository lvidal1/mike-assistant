import { TextToSpeechProvider } from "../services/TextToSpeech/interface/TextToSpeechProvider";
import AmazonPolly from "../services/TextToSpeech/providers/AmazonPolly";

export const TTS_AMAZON = "AmazonPolly";

export class TextToSpeechServiceFactory {
  public static createService(serviceName: string): TextToSpeechProvider {
    switch (serviceName) {
      case TTS_AMAZON:
        return AmazonPolly.getInstance();
      default:
        throw new Error(`Unsupported service name: ${serviceName}`);
    }
  }
}
