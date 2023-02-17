import { Readable } from "stream";
import AWS from "aws-sdk";
import { TextToSpeechProvider } from "../interface/TextToSpeechProvider";

class AmazonPolly implements TextToSpeechProvider {
  private static instance: AmazonPolly;
  private readonly polly: AWS.Polly;

  private constructor() {
    this.polly = new AWS.Polly({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public static getInstance(): AmazonPolly {
    if (!AmazonPolly.instance) {
      AmazonPolly.instance = new AmazonPolly();
    }
    return AmazonPolly.instance;
  }

  async convertTextToSpeech(
    text: string,
    language: string = "es-MX"
  ): Promise<Readable> {
    const params: AWS.Polly.Types.SynthesizeSpeechInput = {
      Text: text,
      OutputFormat: "mp3",
      TextType: "text",
      VoiceId: "Mia",
      LanguageCode: language,
    };

    const data = await this.polly.synthesizeSpeech(params).promise();

    return new Readable({
      read() {
        this.push(data.AudioStream);
        this.push(null);
      },
    });
  }
}

export default AmazonPolly;
