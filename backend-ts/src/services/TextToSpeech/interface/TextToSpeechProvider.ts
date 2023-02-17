import { Readable } from "stream";

export interface TextToSpeechProvider {
  convertTextToSpeech(text: string, language?: string): Promise<Readable>;
}
