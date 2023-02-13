const TextToSpeechService = require("./TextToSpeechService");
const textToSpeech = require('@google-cloud/text-to-speech');

class GoogleSpeechToTextService extends TextToSpeechService {

    // API key de Google
    apiKey = "AIzaSyAJryFsJnk9_YtBaiN7iZSRGA-gZfgbliQ";

    // URL de la API de Google
    apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';

    constructor() {
        super();
    }

    async convertTextToSpeech(text, language = 'es-ES') {
        try {
            const client = new textToSpeech.TextToSpeechClient({
                keyFilename: './data/mike-assistant-377704-12242e8aa224.json'
            });
            const request = {
                input: {
                    text: text
                },
                voice: {
                    languageCode: language,
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'MP3'
                }
            };
            const [response] = await client.synthesizeSpeech(request);
            return response.audioContent;
        } catch (error) {
            throw new Error(`Error al convertir texto a voz: ${error}`);
        }
    }

    async convertTextToSpeech2(text, language = 'es-ES') {
        super.convertTextToSpeech()
        try {
            const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, {
                input: {
                    text: text
                },
                voice: {
                    languageCode: language,
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'MP3'
                }
            });

            if (response.status === 200) {
                return response.data.audioContent;
            } else {
                throw new Error(`Error en la respuesta del servidor con status code: ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Error al convertir texto a voz: ${error.message}`);
        }
    }

}

module.exports = GoogleSpeechToTextService;