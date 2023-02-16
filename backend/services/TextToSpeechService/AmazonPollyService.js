const TextToSpeechService = require("./TextToSpeechService");
const AWS = require('aws-sdk');

class AmazonPollyService extends TextToSpeechService {
    static instance;

    static getInstance() {
        if (!AmazonPollyService.instance) {
            AmazonPollyService.instance = new AmazonPollyService();
        }
        return AmazonPollyService.instance;
    }

    async convertTextToSpeech(text, language = 'es-ES') {
        try {
            AWS.config.update({
                region: 'us-east-1',
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            });

            const polly = new AWS.Polly({
                apiVersion: '2016-06-10'
            });

            const params = {
                OutputFormat: 'mp3',
                Text: text,
                TextType: 'text',
                VoiceId: 'Mia',
                LanguageCode: 'es-MX'
            };

            const data = await polly.synthesizeSpeech(params).promise();

            return data.AudioStream;
        } catch (error) {
            throw new Error(`Error al convertir texto a voz: ${error.message}`);
        }
    }
}


module.exports = AmazonPollyService